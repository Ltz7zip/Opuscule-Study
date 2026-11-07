#!/usr/bin/env python3
"""Scanned PDF -> Markdown with pixel-exact formula / figure crops."""
import argparse
import json
import os
import re
import shutil
import statistics
import subprocess
import tempfile
from pathlib import Path
from urllib.parse import quote, unquote

HERE = Path(__file__).resolve().parent
OCR = HERE / "ocr"
CROP = HERE / "crop"
DPI = 150

MATH_CHARS = set("=+−-×÷±∓≤≥<>≈≡∝∞∫∬∮∑∏√∂∇→←↔⇒⇔∈∉⊂⊃∪∩∀∃"
                 "αβγδεζηθικλμνξοπρστυφχψωΓΔΘΛΞΠΣΦΨΩ")
CJK = re.compile(r"[\u4e00-\u9fff]")
CAPTION = re.compile(r"^\s*(图|表)\s*[0-9一二三四五六七八九十]+\s*([.\-－—–]\s*[0-9]+)?")
HEAD_CHAPTER = re.compile(r"^\s*第\s*[一二三四五六七八九十百零〇0-9]+\s*章")
HEAD_SECTION = re.compile(r"^\s*(第\s*[一二三四五六七八九十百零〇0-9]+\s*节|§\s*[0-9]+)")
HEAD_NUMBERED = re.compile(r"^\s*[0-9]+(\.[0-9]+){1,3}\s*\S")
EQ_NUMBER = re.compile(r"^\s*[（(]\s*[0-9]{1,3}(\s*[.\-]\s*[0-9]{1,3})*\s*[）)]\s*$")
NUM_ONLY = re.compile(r"^\s*[0-9]{1,3}(\s*[.\-]\s*[0-9]{1,3})*\s*$")
PAGE_NO = re.compile(r"^\s*[·•\-—]?\s*[0-9]{1,4}\s*[·•\-—]?\s*$")


def pdf_pages(pdf):
    out = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True).stdout
    for line in out.splitlines():
        if line.startswith("Pages:"):
            return int(line.split()[1])
    return 0


def render(pdf, outdir, first, last, workers=4):
    total = last - first + 1
    chunk = max(1, total // workers)
    procs = []
    for i in range(workers):
        a = first + i * chunk
        b = last if i == workers - 1 else min(last, a + chunk - 1)
        if a > b:
            continue
        procs.append(subprocess.Popen(
            ["pdftoppm", "-r", str(DPI), "-gray", "-png", "-f", str(a), "-l", str(b),
             str(pdf), os.path.join(outdir, "p")],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
    for p in procs:
        p.wait()


def ocr_pages(images, out_jsonl):
    B = 100
    with open(out_jsonl, "w") as fh:
        for i in range(0, len(images), B):
            subprocess.run([str(OCR), "--json", "/tmp/_ocr_part.jsonl", *images[i:i + B]], check=True)
            with open("/tmp/_ocr_part.jsonl") as part:
                fh.write(part.read())


def cjk_ratio(s):
    return len(CJK.findall(s)) / len(s) if s else 0.0


def math_ratio(s):
    return sum(1 for ch in s if ch in MATH_CHARS) / len(s) if s else 0.0


def norm(s):
    return s.replace("\u3000", " ").replace("\xa0", " ").strip()


def join_lines(lines):
    parts = []
    for ln in lines:
        t = norm(ln["t"])
        if not t:
            continue
        if parts and re.match(r"[A-Za-z0-9)\]}$]", parts[-1][-1:]) and re.match(r"[A-Za-z0-9(\[{]", t[0]):
            parts.append(" " + t)
        else:
            parts.append(t)
    return "".join(parts)


def group_blocks(lines, med):
    blocks = []
    for ln in sorted(lines, key=lambda l: (l["y"], l["x"])):
        if blocks:
            b = blocks[-1]
            gap = ln["y"] - b["bottom"]
            same_col = abs(ln["x"] - b["x0"]) < 3.5 * med
            if -0.35 * med <= gap <= 0.62 * med and same_col:
                b["lines"].append(ln)
                b["bottom"] = max(b["bottom"], ln["y"] + ln["h"])
                b["x0"] = min(b["x0"], ln["x"])
                b["x1"] = max(b["x1"], ln["x"] + ln["w"])
                continue
        blocks.append({"lines": [ln], "y": ln["y"], "bottom": ln["y"] + ln["h"],
                       "x0": ln["x"], "x1": ln["x"] + ln["w"]})
    for b in blocks:
        b["text"] = join_lines(b["lines"])
        b["height_med"] = statistics.median([l["h"] for l in b["lines"]])
    return blocks


def is_mathy(ln, W):
    t = norm(ln["t"])
    if not t or len(t) > 70:
        return False
    if CAPTION.match(t) or EQ_NUMBER.match(t) or NUM_ONLY.match(t):
        return False
    if cjk_ratio(t) > 0.22:
        return False
    if re.search(r"[=∫∑∏√∂∇±≈≤≥→⇔]", t):
        return True
    if math_ratio(t) >= 0.06 and len(t) <= 45:
        return True
    if len(t) <= 30 and re.search(r"[A-Za-z]", t) and re.search(r"[\[\]{}^_/|]", t):
        return True
    return False


def is_heading(b, med):
    t = b["text"].strip()
    if not t or len(t) > 45:
        return 0
    if HEAD_CHAPTER.match(t):
        return 2
    if HEAD_SECTION.match(t):
        return 3
    if b["height_med"] >= 1.4 * med and cjk_ratio(t) > 0.25 and not is_mathy(b["lines"][0], 1e9):
        return 3
    if HEAD_NUMBERED.match(t) and len(t) <= 30 and cjk_ratio(t) > 0.3:
        return 3
    return 0


def build_rows(lines, med):
    """Cluster OCR lines sharing a baseline into rows."""
    lines = sorted(lines, key=lambda l: (l["y"] + l["h"] / 2, l["x"]))
    rows = []
    for l in lines:
        cy = l["y"] + l["h"] / 2
        if rows and abs(cy - rows[-1]["cy"]) <= 0.8 * med:
            r = rows[-1]
            r["items"].append(l)
            r["y"] = min(r["y"], l["y"])
            r["bottom"] = max(r["bottom"], l["y"] + l["h"])
            r["x0"] = min(r["x0"], l["x"])
            r["x1"] = max(r["x1"], l["x"] + l["w"])
            ys = [i["y"] + i["h"] / 2 for i in r["items"]]
            r["cy"] = sum(ys) / len(ys)
        else:
            rows.append({"items": [l], "y": l["y"], "bottom": l["y"] + l["h"],
                         "x0": l["x"], "x1": l["x"] + l["w"], "cy": cy})
    for r in rows:
        r["items"].sort(key=lambda i: i["x"])
        parts = []
        for i, it in enumerate(r["items"]):
            t = norm(it["t"])
            if not t:
                continue
            if parts:
                gap = it["x"] - (r["items"][i - 1]["x"] + r["items"][i - 1]["w"])
                prev = parts[-1]
                sep = " " if (gap > 1.2 * med or (prev[-1:].isdigit() and CJK.match(t[0] or " "))) else ""
                parts.append(sep + t)
            else:
                parts.append(t)
        r["text"] = "".join(parts)
        r["h"] = statistics.median([i["h"] for i in r["items"]])
    return rows


def row_is_math(r):
    t = r["text"].strip()
    if not t or len(t) > 80:
        return False
    if CAPTION.match(t) or EQ_NUMBER.match(t) or NUM_ONLY.match(t):
        return False
    if cjk_ratio(t) > 0.20:
        return False
    if re.search(r"[=∫∑∏√∂∇±≈≤≥→⇔]", t):
        return True
    if math_ratio(t) >= 0.05 and len(t) <= 45 and cjk_ratio(t) == 0:
        return True
    if len(t) <= 30 and re.search(r"[A-Za-z]", t) and re.search(r"[\[\]{}^_/|]", t):
        return True
    return False


def process_page(page, W, H, page_index, assets, ops, stats):
    raw = [l for l in page["lines"] if norm(l["t"])]
    lines = []
    for l in raw:
        t = norm(l["t"])
        bottom = l["y"] + l["h"]
        if PAGE_NO.match(t) and (l["y"] > 0.86 * H or bottom < 0.10 * H):
            continue
        if l["y"] < 0.03 * H and len(t) < 3:
            continue
        if bottom > 0.975 * H and len(t) < 10:
            continue
        lines.append(l)
    if not lines:
        return "", 0
    heights = [l["h"] for l in lines if l["h"] > 4]
    med = statistics.median(heights) if heights else 20

    rows = build_rows(lines, med)
    x0col = min(r["x0"] for r in rows)
    x1col = max(r["x1"] for r in rows)

    consumed = set()
    # equation groups: consecutive math rows
    eq_groups = []
    for r in rows:
        if row_is_math(r):
            if eq_groups and r["y"] - eq_groups[-1]["bottom"] <= 0.9 * med:
                g = eq_groups[-1]
                g["rows"].append(r)
                g["bottom"] = max(g["bottom"], r["bottom"])
                g["x0"] = min(g["x0"], r["x0"])
                g["x1"] = max(g["x1"], r["x1"])
            else:
                eq_groups.append({"rows": [r], "y": r["y"], "bottom": r["bottom"],
                                  "x0": r["x0"], "x1": r["x1"]})
    # absorb short non-CJK fragments adjacent to an equation group
    for g in eq_groups:
        for r in rows:
            if id(r) in consumed or r in g["rows"]:
                continue
            t = r["text"].strip()
            if not t or len(t) > 40 or cjk_ratio(t) > 0:
                continue
            if len(re.findall(r"[A-Za-z]{3,}", t)) > 4:
                continue
            if g["y"] - 0.9 * med <= r["y"] and r["bottom"] <= g["bottom"] + 0.9 * med:
                g["rows"].append(r)
                consumed.add(id(r))
                g["y"] = min(g["y"], r["y"])
                g["bottom"] = max(g["bottom"], r["bottom"])
                g["x0"] = min(g["x0"], r["x0"])
                g["x1"] = max(g["x1"], r["x1"])

    for g in eq_groups:
        for r in rows:
            t = r["text"].strip()
            if id(r) in consumed:
                continue
            if not (EQ_NUMBER.match(t) or (NUM_ONLY.match(t) and r["x0"] > 0.75 * W)):
                continue
            cy = (r["y"] + r["bottom"]) / 2
            if g["y"] - 0.6 * med <= cy <= g["bottom"] + 0.6 * med:
                consumed.add(id(r))
                g["x1"] = max(g["x1"], r["x1"])
                g["y"] = min(g["y"], r["y"])
                g["bottom"] = max(g["bottom"], r["bottom"])

    # captions
    captions = [r for r in rows if CAPTION.match(r["text"].strip()) and r["text"].strip().startswith(("图", "表"))]
    dedup = []
    for c in captions:
        if any(abs(c["y"] - d["y"]) < 2.0 * med for d in dedup):
            continue
        dedup.append(c)
    captions = dedup
    regions = []
    for c in captions:
        is_table = c["text"].strip().startswith("表")
        if is_table:
            bottom = None
            for r in rows:
                if r["y"] <= c["y"] + 2:
                    continue
                t = r["text"]
                if len(CJK.findall(t)) >= 6 and r["x1"] - r["x0"] >= 0.30 * W and not row_is_math(r):
                    bottom = r["y"] - 4
                    break
            if bottom is None:
                bottom = min(0.95 * H, c["y"] + 0.40 * H)
            bottom = max(bottom, c["bottom"] + 0.02 * H)
            top = c["bottom"] + 4
            if bottom - top < 0.02 * H:
                continue
            regions.append({"top": top, "bottom": bottom, "caption": c})
        else:
            top = None
            for r in rows:
                if r["y"] + r["h"] >= c["y"]:
                    continue
                t = r["text"]
                if len(CJK.findall(t)) >= 6 and r["x1"] - r["x0"] >= 0.30 * W and not row_is_math(r):
                    top = r["bottom"] + 4
                elif HEAD_CHAPTER.match(t) and len(t) < 40:
                    top = r["bottom"] + 4
            if top is None:
                top = 0.05 * H
            top = max(top, c["y"] - 0.46 * H)
            top = min(top, c["y"] - 0.06 * H)
            if c["y"] - top < 0.03 * H:
                continue
            regions.append({"top": top, "bottom": c["y"] - 3, "caption": c})

    for r in rows:
        for reg in regions:
            if reg["top"] - 2 <= (r["y"] + r["bottom"]) / 2 <= reg["bottom"] + 2 and r is not reg["caption"]:
                consumed.add(id(r))

    # prose paragraphs from remaining non-math rows
    items = []
    for g in eq_groups:
        items.append((g["y"], "eq", g))
        for r in g["rows"]:
            consumed.add(id(r))
    for reg in regions:
        items.append((reg["caption"]["y"], "fig", reg))
    caption_ids = {id(c) for c in captions}
    prose_rows = [r for r in rows if id(r) not in consumed and id(r) not in caption_ids and not row_is_math(r)]
    para = None
    for r in prose_rows:
        if para and r["y"] - para["bottom"] <= 0.55 * med and abs(r["x0"] - para["x0"]) < 2.2 * med:
            para["rows"].append(r)
            para["bottom"] = max(para["bottom"], r["bottom"])
        else:
            para = {"rows": [r], "y": r["y"], "bottom": r["bottom"], "x0": r["x0"]}
            items.append((r["y"], "para", para))
    items.sort(key=lambda x: x[0])

    out = []
    fig_no = eq_no = 0
    for y, kind, obj in items:
        if kind == "eq":
            eq_no += 1
            x0 = max(0, obj["x0"] - 6)
            x1 = min(W, obj["x1"] + 8)
            y0 = max(0, obj["y"] - 5)
            y1 = min(H, obj["bottom"] + 6)
            name = f"p{page_index:04d}-eq{eq_no:02d}.png"
            ops.append({"src": page["image"], "x": int(x0), "y": int(y0),
                        "w": int(x1 - x0), "h": int(y1 - y0),
                        "out": str(assets / name), "trim": True})
            out.append(f"![公式]({quote(assets.name + '/' + name)})")
            stats["equations"] += 1
        elif kind == "fig":
            fig_no += 1
            reg = obj
            t = reg["caption"]["text"].strip()
            name = f"p{page_index:04d}-fig{fig_no:02d}.png"
            ops.append({"src": page["image"], "x": int(max(0, x0col - 6)), "y": int(reg["top"]),
                        "w": int(min(W, x1col + 6) - max(0, x0col - 6)),
                        "h": int(reg["bottom"] - reg["top"]),
                        "out": str(assets / name), "trim": True})
            if t.strip().startswith("表"):
                out.append(f"**{t}**\n\n![{t}]({quote(assets.name + '/' + name)})")
            else:
                out.append(f"![{t}]({quote(assets.name + '/' + name)})\n\n**{t}**")
            stats["figures"] += 1
        else:
            rows_p = obj["rows"]
            text = "".join((norm(r["text"]) for r in rows_p))
            text = re.sub(r"\s+", " ", text).strip()
            if not text:
                continue
            hmed = statistics.median([r["h"] for r in rows_p])
            t0 = rows_p[0]["text"].strip()
            if HEAD_CHAPTER.match(t0) and len(text) <= 45:
                out.append("## " + text)
            elif HEAD_SECTION.match(t0) and len(text) <= 45:
                out.append("### " + text)
            elif hmed >= 1.45 * med and cjk_ratio(text) > 0.25 and len(text) <= 45:
                out.append("### " + text)
            elif HEAD_NUMBERED.match(t0) and len(text) <= 40:
                out.append("### " + text)
            else:
                out.append(text.replace("|", "\\|"))
    if not out:
        return "", 0
    return "\n\n".join(out), len(out)


def build(pdf, max_pages=None, force=False):
    pdf = Path(pdf)
    stem = pdf.stem
    md_path = pdf.with_suffix(".md")
    assets = pdf.parent / (stem + ".assets")
    if md_path.exists() and not force:
        print("skip (exists):", md_path)
        return
    total = pdf_pages(pdf)
    last = min(total, max_pages) if max_pages else total
    tmp = Path(tempfile.mkdtemp(prefix="pdf2md-"))
    try:
        print(f"[{stem}] {total} pages, converting 1-{last}", flush=True)
        render(pdf, tmp, 1, last)
        images = sorted(tmp.glob("p-*.png"))
        if not images:
            raise RuntimeError("render produced no pages")
        ocr_json = tmp / "ocr.jsonl"
        ocr_pages([str(p) for p in images], ocr_json)
        pages = {}
        for line in open(ocr_json):
            pg = json.loads(line)
            pages[int(Path(pg["image"]).stem.split("-")[-1])] = pg
        assets.mkdir(exist_ok=True)
        ops, sections = [], []
        stats = {"figures": 0, "equations": 0}
        for idx in sorted(pages):
            pg = pages[idx]
            md, n = process_page(pg, pg["width"], pg["height"], idx, assets, ops, stats)
            if md:
                sections.append(f"<!-- page {idx} -->\n\n{md}")
        if ops:
            opsfile = tmp / "ops.json"
            opsfile.write_text(json.dumps(ops, ensure_ascii=False))
            subprocess.run([str(CROP), str(opsfile)], check=True)
        title = re.sub(r"\.pdf$", "", stem, flags=re.I).strip(" .")
        header = f"# {title}\n\n> 来源：`{pdf.name}` · 共 {total} 页 · 扫描件 OCR 生成；" \
                 f"公式、插图和表格按原书页面像素裁切，公式与图形未经重排。\n\n"
        body = "\n\n".join(sections)
        def _drop_missing(m):
            rel = unquote(m.group(1))
            if os.path.exists(pdf.parent / rel):
                return m.group(0)
            return ""
        body = re.sub(r"!\[[^\]]*\]\(([^)]+)\)\n?", _drop_missing, body)
        body = re.sub(r"\n{3,}", "\n\n", body)
        md_path.write_text(header + body + "\n", encoding="utf-8")
        print(f"[{stem}] done: {stats['equations']} eq, {stats['figures']} fig")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("pdfs", nargs="+")
    ap.add_argument("--max-pages", type=int, default=None)
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    for p in a.pdfs:
        build(p, a.max_pages, a.force)

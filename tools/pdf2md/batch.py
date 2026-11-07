#!/usr/bin/env python3
"""Select main textbooks from 主教材绑定表.md and convert them in batches."""
import argparse
import re
import time
from pathlib import Path

import build

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "资料"
TABLE = ROOT / "主教材绑定表.md"


def parse_table():
    rows = []
    for line in TABLE.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 4 or not re.fullmatch(r"\d{3,4}", cells[0]):
            continue
        rows.append({"id": cells[0], "subject": cells[1], "main": cells[2]})
    return rows


def tokens(text):
    text = re.sub(r"第[一二三四五六七八九十0-9]+版", " ", text)
    text = re.sub(r"[（(].*?[）)]", " ", text)
    parts = re.split(r"[\s·、，,]+", text)
    out = []
    for p in parts:
        p = p.strip("《》.。—-")
        if len(p) >= 2 and not re.fullmatch(r"[0-9A-Za-z.]+", p):
            out.append(p)
    return out


def score(pdf_name, main):
    name = pdf_name.replace(" ", "")
    s = 0
    for t in tokens(main):
        if t in name:
            s += len(t)
    return s


def pick(folder, main):
    pdfs = [p for p in folder.rglob("*") if p.suffix.lower() == ".pdf"]
    if not pdfs:
        return None, 0
    ranked = sorted(((score(p.name, main), p) for p in pdfs), key=lambda x: -x[0])
    return ranked[0][1], ranked[0][0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--minutes", type=int, default=25)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()

    plan = []
    for row in parse_table():
        folder = DATA / f"{row['id']}.{row['subject']}"
        if not folder.is_dir():
            for d in DATA.iterdir():
                if d.is_dir() and d.name.startswith(row["id"] + "."):
                    folder = d
                    break
        if not folder.is_dir():
            continue
        pdf, sc = pick(folder, row["main"])
        if not pdf or sc == 0 or build.pdf_pages(pdf) == 0:
            plan.append((row, None, 0, 0))
            continue
        plan.append((row, pdf, sc, build.pdf_pages(pdf)))

    if a.dry_run:
        for row, pdf, sc, pages in plan:
            print(f"{row['id']} {row['subject']:<12} score={sc:<3} pages={pages:<5} {pdf.name if pdf else '— 未匹配'}")
        print("total:", len(plan), "matched:", sum(1 for p in plan if p[1]),
              "pages:", sum(p[3] for p in plan))
        return

    t0 = time.time()
    done = 0
    for row, pdf, sc, pages in plan:
        if not pdf:
            continue
        md = pdf.with_suffix(".md")
        if md.exists() and not a.force:
            continue
        if (time.time() - t0) / 60 > a.minutes:
            print("time budget reached")
            break
        build.build(pdf, None, a.force)
        done += 1
        if a.limit and done >= a.limit:
            break


if __name__ == "__main__":
    main()

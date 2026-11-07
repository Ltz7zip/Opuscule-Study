"""把 content/ 下的 Markdown 导入数据库。

content/ 是内容的唯一真相，数据库只保存导入后的结构化副本。
命令可重复执行：相同自然键会被覆盖，不会产生重复数据。

正文写法约定：
- 一级结构用 `## 小节标题`，序号由导入器自动生成；
- 普通 Markdown（段落、列表、表格、公式）直接交给渲染器；
- 需要卡片式排版时用 GitHub 风格的提示块，标题写在方括号后面：

      > [!MYTH] 反向传播是一种新的学习算法。
      > 它只是求梯度的方法，不是新的学习规则。

  支持的提示块：NOTE / MYTH / PRACTICE / ANSWER / FORMAL，
  ANSWER、FORMAL 会折叠成 <details>，PRACTICE 里可以再嵌一层 ANSWER。
"""
from __future__ import annotations

import html
import re
from pathlib import Path

import yaml
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from markdown_it import MarkdownIt

from catalog.models import (
    Concept,
    ConceptEdge,
    Lesson,
    LessonDoc,
    LessonSection,
    Subject,
    Unit,
)

FRONTMATTER_RE = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.S)
HEADING_RE = re.compile(r'^##\s+(.+?)\s*$', re.M)
# $$...$$ 优先于 $...$；反斜杠转义的 \$ 不参与匹配
MATH_RE = re.compile(r'\$\$(.+?)\$\$|(?<![\\$])\$(?!\$)(.+?)(?<![\\$])\$', re.S)
MATH_TOKEN = 'OPUSMATH{}X'
ALERT_RE = re.compile(r'^>\s*\[!(NOTE|MYTH|PRACTICE|ANSWER|FORMAL)\]\s*(.*)$')

ALERT_TEMPLATES = {
    'NOTE': '<aside class="callout">{body}</aside>',
    'MYTH': '<div class="myth"><b>{title}</b><div class="myth-body">{body}</div></div>',
    'PRACTICE': '<div class="ex"><b>{title}</b><div class="ex-body">{body}</div></div>',
    'ANSWER': '<details class="answer"><summary>{title}</summary>{body}</details>',
    'FORMAL': '<details class="formal"><summary>{title}</summary>{body}</details>',
}


def protect_math(raw: str) -> tuple[str, list[tuple[bool, str]]]:
    """把公式换成占位符，避免 markdown 把公式里的 _ * 当成强调标记。"""
    formulas: list[tuple[bool, str]] = []

    def replace(match: re.Match) -> str:
        display = match.group(1) is not None
        tex = (match.group(1) if display else match.group(2)).strip()
        formulas.append((display, tex))
        return MATH_TOKEN.format(len(formulas) - 1)

    return MATH_RE.sub(replace, raw), formulas


def restore_math(markup: str, formulas: list[tuple[bool, str]]) -> str:
    """把占位符换回带 data-tex 的节点，由前端 KaTeX 渲染。"""
    for index, (display, tex) in enumerate(formulas):
        attr = html.escape(tex, quote=True)
        token = MATH_TOKEN.format(index)
        if display:
            node = f'<div class="math-display" data-tex="{attr}">{attr}</div>'
            # 独占一行的公式会被 markdown 包进 <p>，整段替换掉，避免块级元素嵌在段落里
            markup = markup.replace(f'<p>{token}</p>', node)
        else:
            node = f'<span class="math-inline" data-tex="{attr}">{attr}</span>'
        markup = markup.replace(token, node)
    return markup


def wrap_tables(markup: str) -> str:
    """表格统一套一层可横向滚动的容器，作者只写标准 Markdown 表格。"""
    return markup.replace('<table>', '<div class="table-wrap"><table>').replace('</table>', '</table></div>')


def render_fragment(text: str, renderer: MarkdownIt) -> str:
    return wrap_tables(renderer.render(text).strip())


def render_markup(text: str, renderer: MarkdownIt) -> str:
    """先取出提示块，其余文本按 Markdown 渲染；提示块内部递归处理。"""
    lines = text.splitlines()
    parts: list[str] = []
    buffer: list[str] = []
    index = 0

    while index < len(lines):
        match = ALERT_RE.match(lines[index])
        if not match:
            buffer.append(lines[index])
            index += 1
            continue

        if buffer:
            parts.append(render_fragment('\n'.join(buffer).strip(), renderer))
            buffer = []

        kind, title = match.group(1), match.group(2).strip()
        index += 1
        inner: list[str] = []
        while index < len(lines) and lines[index].lstrip().startswith('>'):
            line = lines[index].lstrip()[1:]
            inner.append(line[1:] if line.startswith(' ') else line)
            index += 1

        body = render_markup('\n'.join(inner).strip(), renderer)
        parts.append(ALERT_TEMPLATES[kind].format(title=title, body=body))

    if buffer:
        parts.append(render_fragment('\n'.join(buffer).strip(), renderer))
    return '\n'.join(part for part in parts if part)


def parse_markdown(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding='utf-8')
    match = FRONTMATTER_RE.match(text)
    if not match:
        raise CommandError(f'{path} 缺少 frontmatter')
    return yaml.safe_load(match.group(1)) or {}, text[match.end():]


def parse_sections(body: str, renderer: MarkdownIt) -> list[dict]:
    matches = list(HEADING_RE.finditer(body))
    if not matches:
        raise CommandError('正文至少需要一个 `## 小节标题`')
    sections = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(body)
        raw = body[match.end():end].strip()
        protected, formulas = protect_math(raw)
        sections.append({
            'ordinal': index + 1,
            'anchor': f'sec-{index + 1}',
            'label': f'{index + 1:02d}',
            'title': match.group(1).strip(),
            'html': restore_math(render_markup(protected, renderer), formulas),
        })
    return sections


def lesson_path(lesson: Lesson) -> str:
    """讲次地址只由学科 / 单元 / 序号决定，改名不会换链接。"""
    return f'/read/{lesson.unit.subject.slug}/{lesson.unit.slug}/{lesson.ordinal}'


class Command(BaseCommand):
    help = '把 content/ 目录导入数据库'

    def add_arguments(self, parser):
        parser.add_argument(
            '--content-dir',
            default=str(Path(settings.BASE_DIR).parent / 'content'),
        )

    @transaction.atomic
    def handle(self, *args, **options):
        content_dir = Path(options['content_dir'])
        if not content_dir.is_dir():
            raise CommandError(f'找不到内容目录：{content_dir}')

        renderer = MarkdownIt('gfm-like', {'html': True, 'linkify': False, 'typographer': False})
        stats = self._import_concepts(content_dir / 'concepts.yaml')
        subject_count = self._import_subjects(content_dir / 'subjects.yaml')
        lesson_stats = self._import_lessons(content_dir, renderer)
        self._link_neighbours()

        self.stdout.write(self.style.SUCCESS(
            f'导入完成：{subject_count} 个科目，{lesson_stats["lessons"]} 讲，'
            f'{lesson_stats["docs"]} 份正文，{lesson_stats["sections"]} 个小节，'
            f'{stats["nodes"]} 个概念 / {stats["edges"]} 条依赖'
        ))

    def _import_concepts(self, path: Path) -> dict:
        if not path.exists():
            return {'nodes': 0, 'edges': 0}
        data = yaml.safe_load(path.read_text(encoding='utf-8')) or {}
        nodes = {}
        for row in data.get('concepts', []):
            concept, _ = Concept.objects.update_or_create(
                slug=row['slug'],
                defaults={
                    'title_zh': row.get('title_zh', row['slug']),
                    'title_en': row.get('title_en', ''),
                    'def_zh': row.get('def_zh', ''),
                    'def_en': row.get('def_en', ''),
                    'field': row.get('field', ''),
                    'x': row.get('x', 0),
                    'y': row.get('y', 0),
                },
            )
            nodes[row['slug']] = concept

        edges = set()
        for row in data.get('concepts', []):
            target = nodes[row['slug']]
            for source_slug in row.get('prereq', []):
                edges.add((source_slug, target.slug, ConceptEdge.Kind.PREREQ))
            for used_slug in row.get('used_by', []):
                edges.add((row['slug'], used_slug, ConceptEdge.Kind.USED_BY))

        missing = {slug for edge in edges for slug in edge[:2] if slug not in nodes}
        if missing:
            raise CommandError(f'概念依赖引用了未定义的节点：{", ".join(sorted(missing))}')

        for source_slug, target_slug, kind in edges:
            ConceptEdge.objects.get_or_create(
                source=nodes[source_slug],
                target=nodes[target_slug],
                kind=kind,
            )
        return {'nodes': len(nodes), 'edges': len(edges)}

    def _import_subjects(self, path: Path) -> int:
        if not path.exists():
            return 0
        data = yaml.safe_load(path.read_text(encoding='utf-8')) or {}
        for ordinal, row in enumerate(data.get('subjects', []), start=1):
            subject, _ = Subject.objects.update_or_create(
                slug=row['slug'],
                defaults={
                    'code': row['code'],
                    'title_zh': row.get('title_zh', row['slug']),
                    'title_en': row.get('title_en', ''),
                    'tag': row.get('tag', ''),
                    'desc_zh': row.get('desc_zh', ''),
                    'desc_en': row.get('desc_en', ''),
                    'textbook': row.get('textbook', ''),
                    'status': row.get('status', Subject.Status.OUTLINE),
                    'modes': row.get('modes', []),
                    'ordinal': ordinal,
                },
            )
            for unit_row in row.get('units', []):
                Unit.objects.update_or_create(
                    subject=subject,
                    slug=unit_row['slug'],
                    defaults={
                        'ordinal': unit_row.get('ordinal', 0),
                        'title_zh': unit_row.get('title_zh', unit_row['slug']),
                        'title_en': unit_row.get('title_en', ''),
                    },
                )
        return len(data.get('subjects', []))

    def _import_lessons(self, content_dir: Path, renderer: MarkdownIt) -> dict:
        counters = {'lessons': 0, 'docs': 0, 'sections': 0}
        seen_lessons = set()

        for path in sorted((content_dir / 'lessons').rglob('*.md')):
            meta, body = parse_markdown(path)
            for key in ('slug', 'subject', 'unit', 'mode', 'lang', 'title'):
                if key not in meta:
                    raise CommandError(f'{path} 的 frontmatter 缺少 {key}')

            try:
                unit = Unit.objects.get(subject__slug=meta['subject'], slug=meta['unit'])
            except Unit.DoesNotExist:
                raise CommandError(f'{path} 指向了不存在的单元 {meta["subject"]}/{meta["unit"]}')

            lesson, created = Lesson.objects.update_or_create(
                slug=meta['slug'],
                defaults={'unit': unit, 'ordinal': meta.get('order', 0)},
            )
            if created:
                counters['lessons'] += 1
            seen_lessons.add(lesson.slug)

            for field_name in ('concepts', 'prereq', 'related'):
                slugs = meta.get(field_name) or []
                concepts = list(Concept.objects.filter(slug__in=slugs))
                missing = set(slugs) - {c.slug for c in concepts}
                if missing:
                    raise CommandError(f'{path} 引用了未定义的概念：{", ".join(sorted(missing))}')
                getattr(lesson, field_name).set(concepts)

            doc, _ = LessonDoc.objects.update_or_create(
                lesson=lesson,
                mode=meta['mode'],
                lang=meta['lang'],
                defaults={
                    'kicker': meta.get('kicker', ''),
                    'title': meta['title'],
                    'subtitle': meta.get('subtitle', ''),
                    'minutes': meta.get('minutes', 0) or 0,
                    'meta': meta.get('meta', []),
                    'body_md': body.strip(),
                },
            )
            counters['docs'] += 1

            doc.sections.all().delete()
            for section in parse_sections(body, renderer):
                LessonSection.objects.create(doc=doc, **section)
                counters['sections'] += 1

        if not seen_lessons:
            raise CommandError('没有找到任何讲次文件')
        return counters

    def _link_neighbours(self) -> None:
        """上一讲 / 下一讲按学科内的顺序自动推导，作者不用手写链接。"""
        groups: dict[tuple[str, str, str], list[LessonDoc]] = {}
        docs = LessonDoc.objects.select_related('lesson__unit__subject')
        for doc in docs:
            key = (doc.lesson.unit.subject.slug, doc.mode, doc.lang)
            groups.setdefault(key, []).append(doc)

        for (subject_slug, mode, lang), items in groups.items():
            items.sort(key=lambda item: (item.lesson.unit.ordinal, item.lesson.ordinal))
            course_title = '课程路线' if lang == 'zh' else 'Course path'
            course_href = f'/path/{subject_slug}/{mode}'
            for index, doc in enumerate(items):
                prev = items[index - 1] if index > 0 else None
                nxt = items[index + 1] if index + 1 < len(items) else None
                doc.prev_title = prev.title if prev else course_title
                doc.prev_href = lesson_path(prev.lesson) if prev else course_href
                doc.next_title = nxt.title if nxt else course_title
                doc.next_href = lesson_path(nxt.lesson) if nxt else course_href
                doc.save(update_fields=['prev_title', 'prev_href', 'next_title', 'next_href'])

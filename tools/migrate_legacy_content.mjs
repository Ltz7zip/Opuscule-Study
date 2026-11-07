/**
 * 把 site/src/data.js 里硬编码的两讲内容迁出为 content/ 下的 Markdown 文件。
 * 一次性脚本，迁移完成后仅作为历史记录保留。
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONCEPTS, LECTURES, SUBJECTS } from '../site/src/data.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');

const SUBJECT_META = {
  dl: { code: 'D01', textbook: '示例讲次，不对应教材', status: 'demo', units: [
    { slug: 'u01', ordinal: 1, title_zh: '神经网络基础', title_en: 'Neural network basics' }
  ] },
  analysis: { code: '036', textbook: '《数学分析 第三版（上下册）》陈纪修 於崇华', status: 'active', units: [
    { slug: 'u01', ordinal: 1, title_zh: '第一章 集合与映射', title_en: 'Chapter 1 — Sets and maps' }
  ] }
};

const LESSON_LOCATION = {
  backprop: { subject: 'dl', unit: 'u01', order: 12 },
  'analysis-set': { subject: 'analysis', unit: 'u01', order: 1 }
};

const q = (value) => JSON.stringify(value);

function frontmatter(fields) {
  const lines = Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${q(value)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

function sectionsToMarkdown(sections) {
  return sections
    .map((section) => `<!-- section: ${section.id} | ${section.label} | ${section.title.replace(/\|/g, '｜')} -->\n\n${section.html.trim()}\n`)
    .join('\n');
}

function lessonMarkdown(entry, lang) {
  const { subject, unit, order } = LESSON_LOCATION[entry.slug];
  const doc = LECTURES[entry.slug][lang];
  const head = frontmatter({
    slug: entry.slug,
    subject,
    unit,
    order,
    mode: entry.mode || 'mastery',
    lang,
    kicker: doc.kicker,
    title: doc.title,
    subtitle: doc.sub,
    minutes: Number((doc.meta?.[0] || '').match(/\d+/)?.[0] || 0),
    meta: doc.meta,
    concepts: entry.concepts,
    prereq: entry.prereq,
    related: entry.related,
    prev_title: doc.prev?.title,
    prev_href: doc.prev?.href,
    next_title: doc.next?.title,
    next_href: doc.next?.href
  });
  return `${head}\n${sectionsToMarkdown(doc.sections)}`;
}

function subjectsYaml() {
  const rows = Object.keys(SUBJECT_META).map((id) => {
    const subject = SUBJECTS.find((s) => s.id === id);
    const meta = SUBJECT_META[id];
    return [
      `  - code: ${q(meta.code)}`,
      `    slug: ${q(id)}`,
      `    title_zh: ${q(subject.zh)}`,
      `    title_en: ${q(subject.en)}`,
      `    tag: ${q(subject.tag)}`,
      `    desc_zh: ${q(subject.desc)}`,
      `    desc_en: ${q(subject.descEn)}`,
      `    textbook: ${q(meta.textbook)}`,
      `    status: ${q(meta.status)}`,
      `    modes: ${q(subject.modes)}`,
      `    units:`,
      ...meta.units.flatMap((unit) => [
        `      - slug: ${q(unit.slug)}`,
        `        ordinal: ${unit.ordinal}`,
        `        title_zh: ${q(unit.title_zh)}`,
        `        title_en: ${q(unit.title_en)}`
      ])
    ].join('\n');
  });
  return `# 科目骨架：第一批只包含两讲所在的科目，全量 110 科在 P4 导入\nsubjects:\n${rows.join('\n')}\n`;
}

function conceptsYaml() {
  const nodes = Object.entries(CONCEPTS).map(([id, c]) => [
    `  - slug: ${q(id)}`,
    `    title_zh: ${q(c.zh)}`,
    `    title_en: ${q(c.en)}`,
    `    def_zh: ${q(c.def)}`,
    `    def_en: ${q(c.defEn)}`,
    `    field: ${q(c.field || '')}`,
    `    x: ${Number(c.x) || 0}`,
    `    y: ${Number(c.y) || 0}`,
    `    prereq: ${q(c.pre || [])}`,
    `    used_by: ${q(c.usedBy || [])}`
  ].join('\n'));
  return `# 概念节点与依赖边；坐标用于知识图初始布局\nconcepts:\n${nodes.join('\n')}\n`;
}

async function main() {
  await mkdir(path.join(contentDir, 'lessons'), { recursive: true });
  await writeFile(path.join(contentDir, 'subjects.yaml'), subjectsYaml(), 'utf8');
  await writeFile(path.join(contentDir, 'concepts.yaml'), conceptsYaml(), 'utf8');

  for (const slug of Object.keys(LECTURES)) {
    const entry = { ...LECTURES[slug], slug };
    const { subject, unit, order } = LESSON_LOCATION[slug];
    const dir = path.join(contentDir, 'lessons', subject, unit);
    await mkdir(dir, { recursive: true });
    for (const lang of ['zh', 'en']) {
      const file = path.join(dir, `${String(order).padStart(2, '0')}-${slug}.${lang}.md`);
      await writeFile(file, lessonMarkdown(entry, lang), 'utf8');
      console.log('written', path.relative(root, file));
    }
  }
}

main();

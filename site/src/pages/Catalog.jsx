import React, { useMemo, useState } from 'react';
import { useApp } from '../App';
import { Reveal, SplitLine } from '../ui';

const FILTERS = [
  { key: 'all', zh: '全部', en: 'All' },
  { key: 'full', zh: '已开讲', en: 'With lectures' },
  { key: 'outline', zh: '仅目录', en: 'Outline only' }
];

export default function Catalog() {
  const { lang, navigate, href, catalog } = useApp();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [tag, setTag] = useState('all');

  const tags = useMemo(() => {
    const counts = new Map();
    catalog.subjects.forEach((s) => {
      if (!s.tag) return;
      counts.set(s.tag, (counts.get(s.tag) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [catalog]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return catalog.subjects.filter((s) => {
      if (filter === 'full' && s.lessons === 0) return false;
      if (filter === 'outline' && s.lessons > 0) return false;
      if (tag !== 'all' && s.tag !== tag) return false;
      if (!needle) return true;
      return [s.zh, s.en, s.code, s.desc, s.descEn, s.textbook, s.tag]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [catalog, q, filter, tag]);

  const live = catalog.subjects.filter((s) => s.lessons > 0).length;
  const units = catalog.subjects.reduce((sum, s) => sum + s.units, 0);
  const lessons = catalog.subjects.reduce((sum, s) => sum + s.lessons, 0);

  if (catalog.status === 'loading') {
    return (
      <div className="wrap path-loading">
        <div className="loader" aria-hidden="true"><i /><i /><i /></div>
        <p>{lang === 'zh' ? '正在读取科目目录…' : 'Loading the catalogue…'}</p>
      </div>
    );
  }

  return (
    <div className="wrap catalog">
      <header className="page-head cat-head">
        <div>
          <Reveal className="section-kick" y={10}>
            <span className="section-index">03</span>
            {lang === 'zh' ? '科目目录' : 'Catalogue'}
          </Reveal>
          <h1 className="cat-title">
            <SplitLine>{lang === 'zh' ? '一一二门学科，先看全貌。' : 'One hundred and twelve subjects, at a glance.'}</SplitLine>
          </h1>
          <p className="cat-note">
            {lang === 'zh'
              ? '目录先全部公开：能搜、能筛、能点进去。只有首批三科写了精讲讲次，其余陆续补。'
              : 'The whole catalogue is public: searchable, filterable, clickable. Only the first three subjects have written lectures for now.'}
          </p>
        </div>
        <div className="map-counts cat-counts">
          <div><b>{catalog.subjects.length}</b><span>{lang === 'zh' ? '科目' : 'subjects'}</span></div>
          <div><b>{live}</b><span>{lang === 'zh' ? '已开讲' : 'live'}</span></div>
          <div><b>{units}</b><span>{lang === 'zh' ? '单元' : 'units'}</span></div>
          <div><b>{lessons}</b><span>{lang === 'zh' ? '讲次' : 'lectures'}</span></div>
        </div>
      </header>

      <div className="cat-tools">
        <label className="cat-search">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <circle cx="7" cy="7" r="4.6" />
            <path d="M10.4 10.4 14 14" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === 'zh' ? '搜索科目、教材、编号…' : 'Search subjects, textbooks, codes…'}
            aria-label={lang === 'zh' ? '搜索科目' : 'Search subjects'}
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label={lang === 'zh' ? '清空' : 'Clear'}>×</button>
          )}
        </label>

        <div className="seg cat-seg" role="tablist" aria-label={lang === 'zh' ? '状态筛选' : 'Status filter'}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={`seg-btn ${filter === f.key ? 'on' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {lang === 'zh' ? f.zh : f.en}
            </button>
          ))}
        </div>

        <div className="cat-tags">
          <button
            type="button"
            className={`cat-tag ${tag === 'all' ? 'on' : ''}`}
            onClick={() => setTag('all')}
          >
            {lang === 'zh' ? '全部领域' : 'All fields'}
          </button>
          {tags.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={`cat-tag ${tag === name ? 'on' : ''}`}
              onClick={() => setTag(tag === name ? 'all' : name)}
            >
              {name}<i>{count}</i>
            </button>
          ))}
        </div>
      </div>

      <div className="cat-result">
        {lang === 'zh' ? `匹配 ${rows.length} 门` : `${rows.length} subjects`}
      </div>

      {rows.length === 0 ? (
        <div className="cat-empty">
          {lang === 'zh' ? '没有匹配的科目，换个关键词试试。' : 'No subjects match. Try another keyword.'}
        </div>
      ) : (
        <div className="cat-grid">
          {rows.map((s, i) => {
            const open = s.lessons > 0;
            const first = s.unitList?.flatMap((u) => u.lessons)[0];
            return (
              <Reveal key={s.slug} delay={Math.min(i, 18) * 0.012} y={12}>
                <article className={`cat-card ${open ? 'is-live' : ''}`}>
                  <div className="cat-card-top">
                    <span className="cat-code">{s.code}</span>
                    <span className={`cat-status ${open ? 'live' : ''}`}>
                      {open
                        ? (lang === 'zh' ? `精讲中 · ${s.lessons} 讲` : `${s.lessons} lectures`)
                        : (lang === 'zh' ? '目录待补' : 'Outline')}
                    </span>
                  </div>
                  <h3 className="cat-name">
                    {lang === 'zh' ? s.zh : s.en}
                    <small>{lang === 'zh' ? s.en : s.zh}</small>
                  </h3>
                  <p className="cat-desc">{lang === 'zh' ? s.desc : s.descEn}</p>
                  <div className="cat-meta">
                    <span className="cat-field">{s.tag}</span>
                    <span className="cat-book" title={s.textbook}>{s.textbook || '—'}</span>
                  </div>
                  <div className="cat-nums">
                    <span><b>{s.units}</b> {lang === 'zh' ? '单元' : 'units'}</span>
                    <span><b>{s.lessons}</b> {lang === 'zh' ? '讲' : 'lectures'}</span>
                    <span><b>{s.concepts}</b> {lang === 'zh' ? '概念' : 'concepts'}</span>
                  </div>
                  <div className="cat-actions">
                    <button type="button" data-cursor="open" onClick={() => navigate(`/path/${s.slug}/${s.modes[0] || 'mastery'}`)}>
                      {lang === 'zh' ? '看路线' : 'Route'}
                    </button>
                    {first && (
                      <a href={href(first.path)} data-cursor="read">
                        {lang === 'zh' ? '读第一讲' : 'Read lesson 1'}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}

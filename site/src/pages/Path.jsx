import React, { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../App';
import { MODES } from '../data';
import { ActivityTerrain, EASE, Reveal, Ring, SplitLine } from '../ui';
import { readSet } from '../progress';

const MODE_KEYS = ['mastery', 'applied', 'literacy'];

export default function PathPage({ subjectId, mode }) {
  const { lang, t, navigate, openConcept, href, catalog, learning } = useApp();
  const subject = catalog.subjects.find((s) => s.slug === subjectId) || catalog.subjects[0];
  const m = MODES[mode] || MODES.mastery;
  const routeRef = useRef(null);
  const reduce = useReducedMotion();
  const done = useMemo(() => readSet(mode), [learning, mode]);
  const terrainSeed = useMemo(
    () => (subjectId + mode).split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 97,
    [subjectId, mode]
  );

  const stages = useMemo(() => {
    if (!subject) return null;
    let currentTaken = false;
    const rows = subject.unitList
      .map((unit) => ({
        stage: { zh: unit.zh, en: unit.en },
        units: unit.lessons.map((lesson) => {
          const isDone = done.has(lesson.slug);
          let status = 'next';
          if (isDone) status = 'done';
          else if (!currentTaken) {
            status = 'current';
            currentTaken = true;
          }
          return {
            n: lesson.ordinal,
            zh: lesson.zh,
            en: lesson.en,
            note: lesson.concepts
              .map((cid) => catalog.concepts[cid]?.[lang === 'zh' ? 'zh' : 'en'])
              .filter(Boolean)
              .join(' · '),
            concepts: lesson.concepts,
            level: Math.min(3, lesson.concepts.length || 1),
            status,
            lesson: lesson.slug,
            path: lesson.path,
            modes: lesson.modes
          };
        })
      }))
      .filter((stage) => stage.units.length);
    return rows.length ? rows : null;
  }, [subject, lang, catalog, done]);

  /* Target the route only once it is actually in the DOM; framer warns (and
     silently tracks the window) when the ref is not hydrated at mount. */
  const scrollTarget = useMemo(() => (stages ? routeRef : null), [stages]);
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ['start 68%', 'end 72%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const units = useMemo(() => (stages || []).flatMap((s) => s.units), [stages]);
  const doneCount = units.filter((u) => u.status === 'done').length;
  const progress = units.length ? Math.round((doneCount / units.length) * 100) : 0;

  const conceptIds = useMemo(() => {
    const set = new Set();
    units.forEach((u) => u.concepts.forEach((c) => set.add(c)));
    return [...set];
  }, [units]);

  const fallback = catalog.subjects.find((s) => s.slug === 'dl') || catalog.subjects[0];

  if (catalog.status === 'loading') {
    return (
      <div className="wrap path-loading">
        <div className="loader" aria-hidden="true"><i /><i /><i /></div>
        <p>{lang === 'zh' ? '正在读取目录…' : 'Loading the catalogue…'}</p>
      </div>
    );
  }

  return (
    <div className="path-page">
      <div className="wrap">
        <div className="crumb">
          <a href={href('/')}>← {t('nav.library')}</a>
          <span>/</span>
          <span>{subject ? (lang === 'zh' ? subject.zh : subject.en) : t('path.kick')}</span>
        </div>

        <header className="path-head">
          <div className="path-head-main">
            <div className="page-kick">{t('path.kick')}</div>
            <h1 className="page-title path-title">
              <SplitLine>{subject ? (lang === 'zh' ? subject.zh : subject.en) : t('path.kick')}</SplitLine>
              <span className="path-title-mode">{lang === 'zh' ? m.zh : m.en}</span>
            </h1>
            <p className="page-sub">{t('path.sub')}</p>
          </div>

          <div className="path-switch">
            <div className="modes" role="tablist" aria-label="mode">
              {MODE_KEYS.map((key) => {
                const mm = MODES[key];
                const available = subject ? subject.modes.includes(key) : false;
                const on = key === mode;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={on}
                    disabled={!available}
                    className={`mode-btn ${on ? 'on' : ''} ${!available ? 'is-off' : ''}`}
                    onClick={() => {
                      if (!available || !subject) return;
                      navigate(`/path/${subject.slug}/${key}`);
                    }}
                  >
                    {on && <motion.span className="mode-pill" layoutId="mode-pill" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                    <span className="mode-name">{lang === 'zh' ? mm.zh : mm.en}</span>
                    <span className="mode-num">{mm.num}</span>
                  </button>
                );
              })}
            </div>
            <div className="mode-desc">
              <p>{lang === 'zh' ? m.desc : m.descEn}</p>
              <ul>
                {(lang === 'zh' ? m.points : m.pointsEn).map((p) => (
                  <li key={p}><i aria-hidden="true" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </header>
      </div>

      {!stages ? (
        <div className="wrap">
          <EmptyState
            onGo={() => navigate(`/path/${fallback?.slug || 'dl'}/${fallback?.modes[0] || 'mastery'}`)}
            lang={lang}
            title={t('path.empty.title')}
            text={t('path.empty.text')}
            btn={t('path.empty.btn')}
          />
        </div>
      ) : (
        <>
        <div className="wrap path-grid">
          <div className="route" ref={routeRef}>
            <div className="route-rail" aria-hidden="true">
              <svg width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none">
                <line x1="1" y1="0" x2="1" y2="100" stroke="var(--line)" strokeWidth="1" />
                {!reduce && (
                  <motion.line
                    x1="1" y1="0" x2="1" y2="100" stroke="var(--accent)" strokeWidth="1.5"
                    pathLength="1" strokeDasharray="1 1"
                    style={{ scaleY: lineScale, transformOrigin: 'top' }}
                  />
                )}
              </svg>
            </div>

            {stages.map((stage, si) => (
              <section className="stage" key={stage.stage.zh + si}>
                <Reveal className="stage-head" y={14}>
                  <span className="stage-idx">S{si + 1}</span>
                  <h2>{lang === 'zh' ? stage.stage.zh : stage.stage.en}</h2>
                  <span className="stage-count">{stage.units.length} {t('path.summary')}</span>
                </Reveal>

                <div className="units">
                  {stage.units.map((u, ui) => (
                    <motion.article
                      className={`unit ${u.status}`}
                      key={u.lesson}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-8% 0px' }}
                      transition={{ duration: 0.62, ease: EASE, delay: Math.min(ui * 0.055, 0.28) }}
                    >
                      <span className="u-dot" aria-hidden="true">
                        {u.status === 'done' ? (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M1 4.2 3 6.2 7 1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : null}
                      </span>
                      <span className="u-num">{String(u.n).padStart(2, '0')}</span>

                      <div className="u-main">
                        <button
                          className="u-title"
                          data-cursor="read"
                          onClick={() => navigate(u.path)}
                        >
                          {lang === 'zh' ? u.zh : u.en}
                          {u.status === 'current' && (
                            <span className="u-now">
                              <i aria-hidden="true" />
                              {lang === 'zh' ? '在读' : 'Now'}
                            </span>
                          )}
                        </button>
                        {u.note && <p className="u-note">{u.note}</p>}
                        {u.concepts.length > 0 && (
                          <div className="u-concepts">
                            {u.concepts.map((cid) => (
                              <button key={cid} data-cursor="open" onClick={() => openConcept(cid)}>
                                <span aria-hidden="true">◈</span>
                                {catalog.concepts[cid]?.[lang === 'zh' ? 'zh' : 'en'] || cid}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="u-side">
                        <span className="u-level" title="depth">
                          {[1, 2, 3].map((l) => <i key={l} className={l <= u.level ? 'on' : ''} />)}
                        </span>
                        <span className="u-status-label">
                          {u.status === 'done'
                            ? (lang === 'zh' ? '完成' : 'Done')
                            : u.status === 'current'
                              ? (lang === 'zh' ? '进行中' : 'Active')
                              : (lang === 'zh' ? '待读' : 'Open')}
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="rail">
            <Reveal className="rail-card rail-progress" y={18}>
              <div className="rail-kick">{t('path.progress')}</div>
              <div className="rail-progress-row">
                <Ring value={progress} size={70} stroke={1.5} label={`${progress}%`} />
                <div>
                  <b>{doneCount} / {units.length}</b>
                  <span>{lang === 'zh' ? '讲已完成' : 'lectures done'}</span>
                </div>
              </div>
              <div className="rail-bar"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: progress / 100 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }} /></div>
              <p className="rail-note">{t('path.progress.text')}</p>
              <div className="rail-stats">
                <span><b>{units.length}</b>{t('path.summary')}</span>
                <span><b>{conceptIds.length}</b>{t('path.concepts')}</span>
                <span><b>{progress}%</b>{lang === 'zh' ? '完成' : 'done'}</span>
              </div>
            </Reveal>

            <Reveal className="rail-card" delay={0.06} y={18}>
              <div className="rail-kick">{t('path.why')}</div>
              <p className="rail-note">{t('path.why.text')}</p>
              <div className="mini-graph" aria-hidden="true">
                <span className="mg-node" data-k="root" />
                <span className="mg-line l1" />
                <span className="mg-node n1" />
                <span className="mg-node n2" />
                <span className="mg-line l2" />
                <span className="mg-node n3" />
              </div>
            </Reveal>

            <Reveal className="rail-card" delay={0.12} y={18}>
              <div className="rail-kick">{t('path.free')}</div>
              <p className="rail-note">{t('path.free.text')}</p>
            </Reveal>

            <Reveal className="rail-card" delay={0.18} y={18}>
              <div className="rail-kick">{lang === 'zh' ? '本路线概念' : 'Concepts on this route'}</div>
              <div className="rail-chips">
                {conceptIds.map((cid) => (
                  <button key={cid} data-cursor="open" onClick={() => openConcept(cid)}>
                    {catalog.concepts[cid]?.[lang === 'zh' ? 'zh' : 'en'] || cid}
                  </button>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="wrap">
          <Reveal className="route-traces" y={22}>
            <div className="route-traces-copy">
              <div className="rail-kick">{lang === 'zh' ? '复习痕迹' : 'Review traces'}</div>
              <h2>{lang === 'zh' ? '这条路线的高峰在哪里' : 'Where this route peaks'}</h2>
              <p>
                {lang === 'zh'
                  ? '七天二十四小时，每小时在这条路线上的复习次数。拖动转一圈，点一根柱子看那个时段。'
                  : 'Seven days by twenty-four hours. Drag to turn it, click a bar to look at that hour.'}
              </p>
              <div className="route-traces-stats">
                <span><b>{units.length}</b>{lang === 'zh' ? '讲' : 'lectures'}</span>
                <span><b>{conceptIds.length}</b>{lang === 'zh' ? '个概念' : 'concepts'}</span>
                <span><b>{progress}%</b>{lang === 'zh' ? '完成' : 'done'}</span>
              </div>
            </div>
            <div className="route-traces-wall">
              <ActivityTerrain
                lang={lang}
                seed={terrainSeed}
                title={lang === 'zh' ? '这条路线的一周' : 'One week on this route'}
              />
            </div>
          </Reveal>
        </div>
        </>
      )}
    </div>
  );
}

function EmptyState({ lang, title, text, btn, onGo }) {
  return (
    <div className="empty">
      <div className="empty-art" aria-hidden="true">
        <motion.span
          className="empty-node"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="empty-line" />
        <motion.span
          className="empty-node ghost"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="btn btn-primary" onClick={onGo}>{btn}</button>
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform
} from 'framer-motion';
import { useApp } from '../App';
import { fetchLesson } from '../api';
import { renderMath } from '../math';
import { markRead, readSet } from '../progress';
import { EASE, HoldToConfirm, Reveal, Ring, SplitLine } from '../ui';

export default function Reader() {
  const { lang, t, openConcept, showToast, navigate, route, href } = useApp();
  const [lesson, setLesson] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLesson(null);
    setLoadError(null);
    if (!route.subject || !route.unit || !route.order) {
      setLoadError(Object.assign(new Error(lang === 'zh' ? '讲次地址不完整' : 'Incomplete lecture URL'), { status: 404 }));
      return () => { alive = false; };
    }
    fetchLesson({ subject: route.subject, unit: route.unit, order: route.order, lang })
      .then((data) => { if (alive) setLesson(data); })
      .catch((error) => { if (alive) setLoadError(error); });
    return () => { alive = false; };
  }, [route.subject, route.unit, route.order, lang]);

  const L = useMemo(() => (lesson ? {
    kicker: lesson.kicker,
    title: lesson.title,
    sub: lesson.subtitle,
    meta: lesson.meta,
    sections: lesson.sections,
    prev: lesson.prev,
    next: lesson.next
  } : null), [lesson]);

  const prereq = useMemo(() => (lesson?.prereq || []).map((c) => ({
    id: c.slug, zh: c.title.zh, en: c.title.en,
    def: c.definition.zh, defEn: c.definition.en
  })), [lesson]);

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('');
  const [size, setSize] = useState(() => Number(localStorage.getItem('opus.size')) || 17);
  const [flash, setFlash] = useState(0);
  const [readDone, setReadDone] = useState(false);
  const artRef = useRef(null);
  const reduce = useReducedMotion();
  /* The article only exists once the lesson resolves; hand framer a target
     after that so it measures the real element instead of the window. */
  const scrollTarget = useMemo(() => (L ? artRef : null), [L]);
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ['start 88%', 'end 92%'] });
  const raw = useSpring(scrollYProgress, { stiffness: 160, damping: 28 });
  const readPct = useTransform(raw, (v) => `${Math.round(v * 100)}%`);

  useEffect(() => { localStorage.setItem('opus.size', size); }, [size]);

  useEffect(() => {
    setActive(L?.sections[0]?.id || '');
    setReadDone(lesson ? readSet(lesson.mode).has(lesson.slug) : false);
  }, [L, lang, lesson]);

  useEffect(() => {
    if (!lesson) return;
    document.title = `${lesson.title} · Opuscule`;
  }, [lesson, lang]);

  useEffect(() => {
    renderMath(artRef.current);
  }, [L]);

  const linkTo = (path) => {
    if (!path) return '#';
    if (path.startsWith('#/')) return href(path.slice(1));
    return href(path);
  };

  useEffect(() => {
    if (!L) return;
    const nodes = L.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActive(top.target.id);
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [L]);

  useEffect(() => {
    if (!L) return undefined;
    const nodes = L.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodes.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-seen');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    nodes.forEach((n) => io.observe(n));
    nodes[0].parentElement?.classList.add('is-armed');
    return () => io.disconnect();
  }, [L]);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  };

  if (loadError) {
    const missing = loadError.status === 404;
    return (
      <div className="wrap reader">
        <div className="reader-state" role="alert">
          <div className="toc-kick">{lang === 'zh' ? '讲次读取失败' : 'Could not load this lecture'}</div>
          <h1>{missing
            ? (lang === 'zh' ? '这一讲还没有这个版本' : 'This version does not exist yet')
            : (lang === 'zh' ? '后端没有响应' : 'The API is not responding')}</h1>
          <p>{loadError.message}</p>
          <button className="mini-btn" onClick={() => navigate(`/path/${route.subject || 'dl'}/${lesson?.mode || 'mastery'}`)}>
            {lang === 'zh' ? '返回课程路线' : 'Back to the path'}
          </button>
        </div>
      </div>
    );
  }

  if (!L) {
    return (
      <div className="wrap reader">
        <div className="reader-state" aria-busy="true">
          <div className="toc-kick">{lang === 'zh' ? '正在读取讲次' : 'Loading lecture'}</div>
          <p>{lang === 'zh' ? '从内容库取回正文…' : 'Fetching the text from the catalog…'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reader-page">
      <div className="readbar" aria-hidden="true">
        <motion.i style={{ scaleX: reduce ? scrollYProgress : raw }} />
        <motion.span className="readbar-head" style={{ left: readPct }} />
      </div>

      <div className="wrap reader">
        <aside className="toc">
          <div className="toc-inner">
            <div className="toc-kick">{t('reader.toc')}</div>
            <nav aria-label="toc">
              {L.sections.map((s) => {
                const on = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => { e.preventDefault(); jump(s.id); }}
                    className={on ? 'on' : ''}
                  >
                    <span className="toc-num">{s.label}</span>
                    <span>{s.title}</span>
                    {on && <motion.span className="toc-line" layoutId="toc-line" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  </a>
                );
              })}
            </nav>
            <div className="toc-foot">
              <span>{t('reader.size')}</span>
              <div className="size-tools">
                <button onClick={() => setSize((s) => Math.max(15, s - 1))} aria-label="smaller">A−</button>
                <span>{size}</span>
                <button onClick={() => setSize((s) => Math.min(21, s + 1))} aria-label="larger">A+</button>
              </div>
            </div>
            <div className="toc-read">
              <span>{lang === 'zh' ? '本页进度' : 'Progress'}</span>
              <motion.b>{readPct}</motion.b>
            </div>
          </div>
        </aside>

        <article className="art" ref={artRef}>
          <header className="art-head">
            <div className="art-kicker">{L.kicker}</div>
            <h1>
              <SplitLine>{L.title}</SplitLine>
            </h1>
            <p className="art-sub">{L.sub}</p>
            <div className="art-meta">
              {L.meta.map((x) => <span key={x}>{x}</span>)}
            </div>
            <div className="art-actions">
              <a className="chip chip-accent" href={href(`/path/${lesson.subject.slug}/${lesson.mode}`)}>
                {lang === 'zh' ? '返回路线' : 'Back to path'}
              </a>
            </div>
          </header>

          <div className={`prereq ${open ? 'is-open' : ''} ${flash ? 'is-flash' : ''}`}>
            <button
              className="prereq-head"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="prereq-body"
            >
              <span className="prereq-label">
                <i aria-hidden="true" />
                {t('reader.prereq')}
              </span>
              <span className="prereq-count">{prereq.length} {lang === 'zh' ? '个概念' : 'concepts'}</span>
              <motion.span className="prereq-caret" animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.3, ease: EASE }}>
                ▾
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id="prereq-body"
                  className="prereq-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  <div className="prereq-inner">
                    {prereq.map((p, i) => (
                      <motion.div
                        className={`prereq-item ${flash ? 'flash' : ''}`}
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: open ? 0.06 + i * 0.05 : 0, duration: 0.4, ease: EASE }}
                        style={{ animationDelay: `${i * 90}ms` }}
                      >
                        <div className="pi-top">
                          <b>{lang === 'zh' ? p.zh : p.en}</b>
                          <span className="pi-tag">{lang === 'zh' ? p.en : p.zh}</span>
                        </div>
                        <p>{lang === 'zh' ? p.def : p.defEn}</p>
                        <button onClick={() => openConcept(p.id)}>
                          {t('reader.openconcept')} <span aria-hidden="true">↗</span>
                        </button>
                      </motion.div>
                    ))}
                    <div className="prereq-tools">
                      <button
                        className="mini-btn"
                        onClick={() => {
                          setFlash(Date.now());
                          showToast(lang === 'zh' ? '已把两讲加入待读' : 'Added both lectures to your queue');
                          setTimeout(() => setFlash(0), 1100);
                        }}
                      >
                        {t('reader.gap')}
                      </button>
                      <button className="mini-btn" onClick={() => setOpen(false)}>
                        {lang === 'zh' ? '跳过，直接读' : 'Skip for now'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="art-body" style={{ fontSize: size }}>
            {L.sections.map((s) => (
              <Reveal as="section" key={s.id} id={s.id} className="art-sec" y={20}>
                <div className="sec-label">
                  <span>{s.label}</span>
                  <i aria-hidden="true" />
                </div>
                <h2>{s.title}</h2>
                <div className="sec-body" dangerouslySetInnerHTML={{ __html: s.html }} />
              </Reveal>
            ))}
          </div>

          <div className="art-end">
            <div className="art-end-line" aria-hidden="true" />
            <HoldToConfirm
              className="read-done"
              done={readDone}
              label={lang === 'zh' ? '按住标记这一讲为已读' : 'Hold to mark this lecture as read'}
              holdingLabel={lang === 'zh' ? '继续按住…' : 'Keep holding…'}
              doneLabel={lang === 'zh' ? '这一讲已读完' : 'Marked as read'}
              onConfirm={() => {
                setReadDone(true);
                markRead(lesson.slug, lesson.mode, true);
                showToast(lang === 'zh' ? '标记完成 · 已加入复习队列' : 'Marked done · added to the review queue');
              }}
              onUndo={() => {
                setReadDone(false);
                markRead(lesson.slug, lesson.mode, false);
                showToast(lang === 'zh' ? '已取消标记' : 'Mark removed');
              }}
            />
            <span className="art-end-note">{lang === 'zh' ? '读完不等于掌握。' : 'Read is not mastered.'}</span>
          </div>

          <nav className="artnav">
            {L.prev.href ? (
              <a href={linkTo(L.prev.href)}>
                <small>{t('reader.pre')}</small>
                <b>← {L.prev.title}</b>
              </a>
            ) : <span />}
            {L.next.href ? (
              <a className="rt" href={linkTo(L.next.href)}>
                <small>{t('reader.next')}</small>
                <b>{L.next.title} →</b>
              </a>
            ) : <span />}
          </nav>
        </article>

        <aside className="rrail">
          <Reveal className="mcard" y={18}>
            <div className="mcard-kick">{t('reader.concepts')}</div>
            <ul className="mcard-list">
              {(lesson.concepts || []).map((c) => (
                <li key={c.slug}>
                  <button onClick={() => openConcept(c.slug)}>
                    {lang === 'zh' ? c.title.zh : c.title.en}
                    <span className="tag">{lang === 'zh' ? c.title.en : c.title.zh}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mcard" delay={0.06} y={18}>
            <div className="mcard-kick">{t('reader.mastery')}</div>
            <div className="mastery-row">
              <Ring value={12} size={58} stroke={1.5} label="12%" />
              <div>
                <b>{lang === 'zh' ? '新学' : 'New'}</b>
                <span>{t('reader.nextdue')} · {lang === 'zh' ? '明天' : 'Tomorrow'}</span>
              </div>
            </div>
            <div className="bar"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 0.12 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }} /></div>
            <p className="mnote">
              {lang === 'zh'
                ? '掌握度是一个概率，不是一个勾选框。它会衰减，并按计划被重新验证。'
                : 'Mastery is a probability, not a checkbox. It decays, and is re-verified on schedule.'}
            </p>
          </Reveal>

          <Reveal className="mcard" delay={0.12} y={18}>
            <div className="mcard-kick">{t('reader.pre')} / {t('reader.next')}</div>
            <ul className="mcard-list plain">
              {(lesson.related || []).map((c) => (
                <li key={c.slug}>
                  <button onClick={() => openConcept(c.slug)}>
                    {lang === 'zh' ? c.title.zh : c.title.en}
                    <span className="tag">{lang === 'zh' ? c.title.en : c.title.zh}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mcard mcard-quiet" delay={0.18} y={18}>
            <div className="mcard-kick">i18n</div>
            <p className="mnote" style={{ marginTop: 0 }}>{t('reader.langnote')}</p>
            <button className="text-link" onClick={() => navigate('/map')}>
              {lang === 'zh' ? '去看依赖图' : 'Open the graph'} <span aria-hidden="true">↗</span>
            </button>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}

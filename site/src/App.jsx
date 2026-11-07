import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState
} from 'react';

import {
  AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring
} from 'framer-motion';
import { T } from './data';
import { useFinePointer, useScrollLock, EASE, SPRING, ThemeIcon, RollLabel } from './ui';
import {
  parseRoute, initialRoute, routeHref, swapLangPath, navigateTo
} from './router';
import { useCatalogData } from './catalog';
import {
  bootstrapLearning, signIn, signOut, signUp, useLearning
} from './progress';
import Home from './pages/Home';
import PathPage from './pages/Path';
import Reader from './pages/Reader';
import MapPage from './pages/MapPage';
import Review from './pages/Review';
import Catalog from './pages/Catalog';

export const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

/* ------------------------------------------------------------------ route */

const PAGE_TITLE = {
  home: { zh: 'Opuscule · 一个公开的学习工作台', en: 'Opuscule · A public study workspace' },
  path: { zh: '路线 · Opuscule', en: 'Path · Opuscule' },
  read: { zh: '阅读 · Opuscule', en: 'Reading · Opuscule' },
  map: { zh: '知识图 · Opuscule', en: 'Knowledge graph · Opuscule' },
  catalog: { zh: '科目目录 · Opuscule', en: 'Catalogue · Opuscule' },
  review: { zh: '复习 · Opuscule', en: 'Review · Opuscule' }
};

const PAGE_DESC = {
  home: {
    zh: '一个公开的学习工作台：三条轨道、中英双语、依赖图与无门禁的阅读路径。',
    en: 'A public study workspace: three tracks, bilingual texts, a dependency graph, and no gates.'
  },
  path: { zh: '一条从基础到项目的学习路线，每讲都能直接打开。', en: 'A route from foundations to projects. Every lecture opens directly.' },
  read: { zh: '中英双语的讲次正文，带前置概念与知识图。', en: 'Bilingual lecture text with prerequisites and a concept graph.' },
  map: { zh: '概念之间的前置与依赖关系图。', en: 'The prerequisite and dependency graph between concepts.' },
  catalog: {
    zh: '全部科目目录：按领域、状态与关键词检索，再决定从哪一科读起。',
    en: 'The full subject catalogue: filter by field, status, and keyword, then pick where to start.'
  },
  review: { zh: '按遗忘曲线排期的概念复习。', en: 'Concept review scheduled on a forgetting curve.' }
};

/* ------------------------------------------------------------------- app */

/* Page enter animation. Kept as stable objects so a parent re-render cannot
   restart the animation, and rendered without AnimatePresence: framer's
   mode="wait" could leave the incoming page stuck at the exit style
   (opacity 0), which showed up as a completely blank page after switching
   language. */
const MAIN_INITIAL = { opacity: 0, y: 20 };
const MAIN_ANIMATE = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.56, ease: EASE }
};

export default function App() {
  const [route, setRoute] = useState(initialRoute);
  const [theme, setTheme] = useState(() => (
    localStorage.getItem('opus.theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  ));
  const [conceptId, setConceptId] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [wipe, setWipe] = useState(null);
  const [toast, setToast] = useState(null);
  const reduce = useReducedMotion();
  const learning = useLearning();
  const catalog = useCatalogData();
  const lang = route.lang;
  const langs = useMemo(() => T[lang] || T.zh, [lang]);
  const t = useCallback((key) => langs[key] || key, [langs]);

  const href = useCallback((path = '/') => routeHref(lang, path), [lang]);

  useEffect(() => {
    bootstrapLearning();
  }, []);

  useEffect(() => {
    const onRoute = () => {
      setRoute(parseRoute());
      setConceptId(null);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onRoute);
    window.addEventListener('opus:route', onRoute);
    return () => {
      window.removeEventListener('popstate', onRoute);
      window.removeEventListener('opus:route', onRoute);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    localStorage.setItem('opus.lang', lang);
    const meta = route.name === 'read'
      ? { zh: '阅读 · Opuscule', en: 'Reading · Opuscule' }
      : PAGE_TITLE[route.name] || PAGE_TITLE.home;
    document.title = meta[lang] || meta.zh;
    const desc = (PAGE_DESC[route.name] || PAGE_DESC.home)[lang];
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', desc);
  }, [lang, route.key]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('opus.theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#080a0f' : '#eef1f6');
  }, [theme]);

  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setPaletteOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen]);

  useEffect(() => {
    if (!conceptId) return;
    const onKey = (e) => { if (e.key === 'Escape') setConceptId(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [conceptId]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName || '')) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const navigate = useCallback((to) => {
    if (!to) return;
    const clean = to.startsWith('#') ? to.replace(/^#/, '') : to;
    if (/^https?:/i.test(clean)) {
      window.location.href = clean;
      return;
    }
    const target = clean.startsWith('/') ? clean : `/${clean}`;
    const full = routeHref(lang, target);
    if (full === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigateTo(full);
  }, [lang]);

  const openConcept = useCallback((id) => setConceptId(id), []);
  const closeConcept = useCallback(() => setConceptId(null), []);

  const toggleLang = useCallback(() => {
    const next = lang === 'zh' ? 'en' : 'zh';
    navigateTo(swapLangPath(window.location.pathname, next), { replace: true });
  }, [lang]);

  const toggleTheme = useCallback((e) => {
    const next = theme === 'light' ? 'dark' : 'light';
    if (reduce) { setTheme(next); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setWipe({ x, y, next });
    setTimeout(() => setTheme(next), 310);
    setTimeout(() => setWipe(null), 1000);
  }, [theme, reduce]);

  const ctx = useMemo(() => ({
    lang, theme, t, route, navigate, href, openConcept, closeConcept,
    toggleLang, toggleTheme, setPaletteOpen, setAccountOpen, showToast: setToast,
    catalog, learning
  }), [
    lang, theme, t, route, navigate, href, openConcept, closeConcept, toggleLang,
    toggleTheme, catalog, learning
  ]);

  // global language sync for any nested component using route
  const page = (() => {
    switch (route.name) {
      case 'path': return <PathPage key={route.key} subjectId={route.subject} mode={route.mode} />;
      case 'read': return <Reader key={route.key} />;
      case 'map': return <MapPage key={route.key} />;
      case 'catalog': return <Catalog key={route.key} />;
      case 'review': return <Review key={route.key} />;
      default: return <Home key={route.key} />;
    }
  })();

  return (
    <AppCtx.Provider value={ctx}>
      <Prelude />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <RouteSweep key={`sweep-${route.key}`} />
      <Header />
      <motion.main
        id="main"
        key={route.key}
        className="page"
        initial={MAIN_INITIAL}
        animate={MAIN_ANIMATE}
      >
        {page}
      </motion.main>
      <Footer />
      <MobileBar />
      <ConceptSheet id={conceptId} onClose={closeConcept} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AccountDialog open={accountOpen} onClose={() => setAccountOpen(false)} />
      <Cursor />
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {toast}
            <span className="toast-bar" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {wipe && <ThemeWipe key="wipe" {...wipe} />}
      </AnimatePresence>
    </AppCtx.Provider>
  );
}

/* --------------------------------------------------------------- chrome */

/* A letterpress plate that splits open on the first visit of a session. */
function Prelude() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (reduce) return false;
    try { return sessionStorage.getItem('opus.intro') !== '1'; } catch { return false; }
  });

  useEffect(() => {
    if (!show) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    try { sessionStorage.setItem('opus.intro', '1'); } catch { /* private mode */ }
    const timer = setTimeout(() => setShow(false), 1450);
    return () => {
      clearTimeout(timer);
      root.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="prelude" key="prelude" aria-hidden="true">
          <motion.span
            className="prelude-half prelude-half-top"
            initial={{ y: 0 }}
            exit={{ y: '-101%' }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.18 }}
          />
          <motion.span
            className="prelude-half prelude-half-bot"
            initial={{ y: 0 }}
            exit={{ y: '101%' }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.18 }}
          />
          <motion.div
            className="prelude-mark"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <span className="prelude-kick">EST. MMXXV — A PUBLIC STUDY WORKSPACE</span>
            <span className="prelude-word">Opuscule</span>
            <span className="prelude-rule"><i /></span>
            <span className="prelude-folio">001</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* A hairline that snaps across the top of the viewport on every route change. */
function RouteSweep() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.span
      className="route-sweep"
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0.85 }}
      animate={{ scaleX: [0, 0.62, 1], opacity: [0.85, 0.85, 0] }}
      transition={{ duration: 0.95, ease: EASE, times: [0, 0.5, 1] }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.25 });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}

const NAV = [
  { key: 'home', path: '/', id: 'nav.library' },
  { key: 'catalog', path: '/catalog', id: 'nav.catalog' },
  { key: 'path', path: '/path/dl/mastery', id: 'nav.path' },
  { key: 'map', path: '/map', id: 'nav.map' },
  { key: 'review', path: '/review', id: 'nav.review' }
];

function Header() {
  const {
    t, theme, toggleTheme, toggleLang, lang, route, setPaletteOpen, setAccountOpen, learning, href, catalog
  } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12));
  const active = route.name === 'read' ? 'path' : route.name;
  const fallback = catalog.subjects.find((s) => s.slug === 'dl') || catalog.subjects[0];
  const items = NAV.map((item) => (
    item.key === 'path' && fallback
      ? { ...item, path: `/path/${fallback.slug}/${fallback.modes[0] || 'mastery'}` }
      : item
  ));

  return (
    <header className={`top ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap top-in">
        <a className="brand" href={href('/')} aria-label="Opuscule home">
          <motion.span
            className="brand-mark"
            whileHover={{ rotate: 135, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          />
          <span className="brand-name">Opuscule</span>
        </a>

        <nav className="nav" aria-label="primary">
          {items.map((item) => {
            const on = active === item.key;
            return (
              <a key={item.key} href={href(item.path)} className={on ? 'active' : ''} aria-current={on ? 'page' : undefined}>
                <RollLabel>{t(item.id)}</RollLabel>
                {on && <motion.span className="nav-line" layoutId="nav-line" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              </a>
            );
          })}
        </nav>

        <div className="tools">
          <button
            className={`tool account-tool ${learning.user ? 'is-on' : ''}`}
            onClick={() => setAccountOpen(true)}
            aria-label={learning.user ? learning.user.username : (lang === 'zh' ? '登录' : 'Sign in')}
          >
            <span className="acc-avatar" aria-hidden="true">
              {learning.user ? learning.user.username.slice(0, 1).toUpperCase() : '·'}
            </span>
            <span className="acc-label">
              {learning.user ? learning.user.username : (lang === 'zh' ? '登录' : 'Sign in')}
            </span>
          </button>

          <button className="tool tool-search" onClick={() => setPaletteOpen(true)} aria-label={t('ui.search')}>
            <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <kbd>⌘K</kbd>
          </button>

          <button className="tool lang-tool" onClick={toggleLang} aria-label="Switch language">
            <span className={lang === 'zh' ? 'on' : ''}>中</span>
            <i aria-hidden="true" />
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </button>

          <button className="tool theme-tool" onClick={toggleTheme} aria-label={theme === 'light' ? t('ui.dark') : t('ui.light')}>
            <ThemeIcon dark={theme === 'dark'} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t, lang, href } = useApp();
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <span className="brand-mark" />
          <b>Opuscule</b>
          <span>{t('common.demo')}</span>
        </div>
        <div className="foot-mid">
          <span>{lang === 'zh' ? '三轨 · 中英 · 依赖图 · 无门禁' : 'Three tracks · bilingual · dependency graph · no gates'}</span>
        </div>
        <a className="foot-top" href={href('/')} data-cursor="top">
          {lang === 'zh' ? '回到顶部' : 'Back to top'} <span aria-hidden="true">↑</span>
        </a>
      </div>
      <div className="wrap foot-fine">
        <span>React · Framer Motion · {new Date().getFullYear()}</span>
        <span>Built as a motion portfolio piece.</span>
      </div>
    </footer>
  );
}

function MobileBar() {
  const { t, setPaletteOpen, route, lang, href } = useApp();
  const active = route.name === 'read' ? 'path' : route.name;
  const items = [
    { key: 'home', path: '/', label: t('nav.library'), icon: 'M2 7.5 8 2l6 5.5V14H2Z' },
    { key: 'catalog', path: '/catalog', label: t('nav.catalog'), icon: 'M2 2h12v3H2zM2 7h12v3H2zM2 12h12v2H2z' },
    { key: 'map', path: '/map', label: t('nav.map'), icon: 'M2 4l4-2 4 2 4-2v10l-4 2-4-2-4 2Z' },
    { key: 'review', path: '/review', label: t('nav.review'), icon: 'M3 8a5 5 0 1 0 1.6-3.7M3 2v3h3' }
  ];
  return (
    <nav className="mobilebar" aria-label="mobile">
      {items.map((it) => (
        <a key={it.key} href={href(it.path)} className={active === it.key ? 'on' : ''}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
            <path d={it.icon} />
          </svg>
          <span>{it.label}</span>
        </a>
      ))}
      <button type="button" onClick={() => setPaletteOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.35">
          <circle cx="7" cy="7" r="4.6" />
          <path d="M10.4 10.4 14 14" strokeLinecap="round" />
        </svg>
        <span>{lang === 'zh' ? '搜索' : 'Search'}</span>
      </button>
    </nav>
  );
}

/* -------------------------------------------------------------- cursor */

const CURSOR_VERBS = {
  open: { zh: '打开', en: 'OPEN' },
  read: { zh: '阅读', en: 'READ' },
  drag: { zh: '拖拽', en: 'DRAG' },
  zoom: { zh: '缩放', en: 'ZOOM' },
  pick: { zh: '选择', en: 'PICK' },
  review: { zh: '复习', en: 'REVIEW' },
  flip: { zh: '翻面', en: 'FLIP' },
  top: { zh: '置顶', en: 'TOP' }
};

function Cursor() {
  const { lang } = useApp();
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 520, damping: 34, mass: 0.22 });
  const y = useSpring(0, { stiffness: 520, damping: 34, mass: 0.22 });
  const rx = useSpring(0, { stiffness: 190, damping: 24, mass: 0.4 });
  const ry = useSpring(0, { stiffness: 190, damping: 24, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [verb, setVerb] = useState('');
  const [visible, setVisible] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    if (!fine || reduce) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      rx.set(e.clientX); ry.set(e.clientY);
      if (!seen.current) { seen.current = true; setVisible(true); }
      const el = e.target.closest && e.target.closest('[data-cursor],a,button,input,textarea,summary,label,[role="button"]');
      const kind = el?.getAttribute?.('data-cursor') || '';
      setHover(!!el);
      setVerb(kind && CURSOR_VERBS[kind] ? kind : '');
    };
    const leave = () => { seen.current = false; setVisible(false); };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [fine, reduce, x, y, rx, ry]);

  if (!fine || reduce) return null;

  return (
    <div className="cursor-layer" aria-hidden="true" style={{ opacity: visible ? 1 : 0 }}>
      <motion.span className={`cursor-dot ${hover ? 'is-hover' : ''}`} style={{ x, y }} />
      <motion.span className={`cursor-ring ${hover ? 'is-hover' : ''} ${verb ? 'has-verb' : ''}`} style={{ x: rx, y: ry }} />
      <AnimatePresence>
        {verb && (
          <motion.span
            className="cursor-verb"
            style={{ x: rx, y: ry }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={SPRING.snappy}
          >
            {CURSOR_VERBS[verb][lang] || CURSOR_VERBS[verb].en}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------- sheet */

function ConceptSheet({ id, onClose }) {
  const { lang, t, navigate, openConcept, catalog } = useApp();
  const c = id ? catalog.concepts[id] : null;
  const sheetRef = useRef(null);
  useScrollLock(!!id);

  useEffect(() => {
    if (!id) return undefined;
    const prev = document.activeElement;
    const timer = setTimeout(() => sheetRef.current?.focus({ preventScroll: true }), 80);
    return () => {
      clearTimeout(timer);
      if (prev instanceof HTMLElement) prev.focus({ preventScroll: true });
    };
  }, [id]);

  return (
    <AnimatePresence>
      {c && (
        <div className="sheet-wrap">
          <motion.div
            className="sheet-back"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.aside
            ref={sheetRef}
            tabIndex={-1}
            className="sheet"
            role="dialog" aria-modal="true" aria-label={lang === 'zh' ? c.zh : c.en}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="sheet-top">
              <span className={`field-tag ${c.field}`}>{c.field === 'math' ? t('map.legend.math') : c.field === 'ai' ? t('map.legend.ai') : t('map.legend.cs')}</span>
              <button className="icon-btn" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2 2 12" />
                </svg>
              </button>
            </div>

            <motion.div
              className="sheet-body"
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } } }}
            >
              {[
                <h2 key="title">{lang === 'zh' ? c.zh : c.en}</h2>,
                <div className="sheet-sub" key="sub">{lang === 'zh' ? c.en : c.zh}</div>,
                <p className="sheet-def" key="def">{lang === 'zh' ? c.def : c.defEn}</p>,
                <div className="sheet-block" key="pre">
                  <div className="mini-kick">{lang === 'zh' ? '前置' : 'Prerequisites'}</div>
                  {c.pre.length ? (
                    <ul className="sheet-list">
                      {c.pre.map((p) => (
                        <li key={p}>
                          <button onClick={() => openConcept(p)}>
                            {lang === 'zh' ? catalog.concepts[p]?.zh : catalog.concepts[p]?.en}
                            <span aria-hidden="true">↗</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="sheet-none">{lang === 'zh' ? '根节点，没有前置。' : 'A root node. Nothing before it.'}</p>}
                </div>,
                <div className="sheet-block" key="used">
                  <div className="mini-kick">{lang === 'zh' ? '被用于' : 'Leads to'}</div>
                  {c.usedBy.length ? (
                    <ul className="sheet-list">
                      {c.usedBy.map((p) => (
                        <li key={p}>
                          <button onClick={() => openConcept(p)}>
                            {lang === 'zh' ? catalog.concepts[p]?.zh : catalog.concepts[p]?.en}
                            <span aria-hidden="true">↗</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="sheet-none">{lang === 'zh' ? '这是一个终点。' : 'This is an endpoint.'}</p>}
                </div>,
                <div className="sheet-actions" key="actions">
                  <button className="btn btn-primary" onClick={() => { onClose(); navigate('/map'); }}>
                    {lang === 'zh' ? '在知识图中查看' : 'Open in graph'}
                  </button>
                  <button className="btn btn-ghost" onClick={() => { onClose(); navigate(`/path/${catalog.subjects[0]?.slug || 'dl'}/mastery`); }}>
                    {lang === 'zh' ? '看所属路线' : 'See the route'}
                  </button>
                </div>
              ].map((el, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                >
                  {el}
                </motion.div>
              ))}
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------------------- palette */

function CommandPalette({ open, onClose }) {
  const { lang, t, navigate, openConcept, catalog } = useApp();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  useScrollLock(open);

  const items = useMemo(() => {
    const pages = [
      { type: 'page', zh: '书库首页', en: 'Library home', sub: 'Home', path: '/' },
      { type: 'page', zh: '科目目录', en: 'Catalogue', sub: 'Catalogue', path: '/catalog' },
      { type: 'page', zh: '知识图', en: 'Knowledge graph', sub: 'Map', path: '/map' },
      { type: 'page', zh: '复习', en: 'Review', sub: 'Review', path: '/review' }
    ];
    catalog.subjects.forEach((subject) => {
      pages.push({
        type: 'page',
        zh: `${subject.zh} · 路线`,
        en: `${subject.en} · Path`,
        sub: 'Path',
        path: `/path/${subject.slug}/${subject.modes[0] || 'mastery'}`
      });
      subject.unitList.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          pages.push({
            type: 'page',
            zh: `阅读：${lesson.zh}`,
            en: `Read: ${lesson.en}`,
            sub: subject.zh,
            path: lesson.path
          });
        });
      });
    });
    const concepts = catalog.ids.map((id) => ({
      type: 'concept', id,
      zh: catalog.concepts[id].zh, en: catalog.concepts[id].en,
      sub: lang === 'zh' ? '概念' : 'Concept'
    }));
    const all = [...pages, ...concepts];
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter((it) => `${it.zh} ${it.en} ${it.sub}`.toLowerCase().includes(s));
  }, [q, lang, catalog]);

  useEffect(() => { setIdx(0); }, [q, open]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, items.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') {
        e.preventDefault();
        const it = items[idx];
        if (!it) return;
        onClose();
        if (it.type === 'page') navigate(it.path); else openConcept(it.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, items, idx, navigate, openConcept, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="palette-wrap">
          <motion.div
            className="sheet-back"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="palette"
            role="dialog" aria-modal="true" aria-label="Command palette"
            initial={{ opacity: 0, y: -18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
          >
            <div className="palette-input">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="7" cy="7" r="4.6" /><path d="M10.4 10.4 14 14" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === 'zh' ? '搜索页面、概念…' : 'Search pages, concepts…'}
                aria-label="Search"
              />
              <kbd>ESC</kbd>
            </div>
            <div className="palette-list" role="listbox">
              {items.length === 0 && (
                <div className="palette-empty">{lang === 'zh' ? '没有匹配项' : 'No matches'}</div>
              )}
              {items.map((it, i) => (
                <button
                  key={`${it.type}-${it.zh}-${i}`}
                  className={`palette-item ${i === idx ? 'on' : ''}`}
                  style={{ '--i': Math.min(i, 14) }}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => {
                    onClose();
                    if (it.type === 'page') navigate(it.path); else openConcept(it.id);
                  }}
                  role="option" aria-selected={i === idx}
                >
                  <span className="p-type">{it.type === 'concept' ? '◈' : '→'}</span>
                  <span className="p-name">{lang === 'zh' ? it.zh : it.en}</span>
                  <span className="p-sub">{it.sub}</span>
                </button>
              ))}
            </div>
            <div className="palette-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> {lang === 'zh' ? '选择' : 'navigate'}</span>
              <span><kbd>↵</kbd> {lang === 'zh' ? '打开' : 'open'}</span>
              <span className="p-demo">{t('common.demo')}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------------------- account */

function AccountDialog({ open, onClose }) {
  const { lang, showToast, learning } = useApp();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    setError('');
    setBusy(false);
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, [open, mode]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const name = username.trim();
    if (!name || !password) {
      setError(lang === 'zh' ? '用户名和密码都要填。' : 'Both fields are required.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const user = mode === 'login'
        ? await signIn(name, password)
        : await signUp(name, password);
      setPassword('');
      showToast(lang === 'zh' ? `已登录 ${user.username}，进度已同步` : `Signed in as ${user.username}. Progress synced.`);
      onClose();
    } catch (err) {
      setError(err.message || (lang === 'zh' ? '操作失败，请再试一次。' : 'Something went wrong. Try again.'));
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try {
      await signOut();
      showToast(lang === 'zh' ? '已退出，记录暂存本机' : 'Signed out. Records stay on this device.');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const stats = learning.stats || {};

  return (
    <AnimatePresence>
      {open && (
        <div className="account-wrap">
          <motion.div
            className="sheet-back"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="account"
            role="dialog" aria-modal="true" aria-label={lang === 'zh' ? '账号' : 'Account'}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            <div className="account-head">
              <span className="rail-kick">ACCOUNT / SYNC</span>
              <button className="icon-btn" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2 2 12" />
                </svg>
              </button>
            </div>

            {learning.user ? (
              <>
                <div className="acc-user">
                  <span className="acc-big" aria-hidden="true">{learning.user.username.slice(0, 1).toUpperCase()}</span>
                  <div>
                    <b>{learning.user.username}</b>
                    <span>
                      {lang === 'zh'
                        ? '阅读进度与复习排期都已保存到账号'
                        : 'Reading progress and review schedule live on your account'}
                    </span>
                  </div>
                </div>

                <div className="acc-stats">
                  <div><b>{stats.lessons_read ?? 0}</b><span>{lang === 'zh' ? '讲已读' : 'lectures read'}</span></div>
                  <div><b>{stats.due ?? 0}</b><span>{lang === 'zh' ? '今天到期' : 'due today'}</span></div>
                  <div><b>{stats.reviewed ?? 0}</b><span>{lang === 'zh' ? '概念在复习' : 'in review'}</span></div>
                  <div><b>{stats.avg_mastery ?? 0}%</b><span>{lang === 'zh' ? '平均掌握' : 'avg mastery'}</span></div>
                </div>

                <button className="btn btn-ghost acc-wide" onClick={logout} disabled={busy}>
                  {lang === 'zh' ? '退出登录' : 'Sign out'}
                </button>
                <p className="acc-note">
                  {lang === 'zh'
                    ? '退出后仍可继续阅读，记录会暂存在本机；下次登录时自动并入账号。'
                    : 'You can keep reading after signing out — new records stay on this device and merge back on your next sign-in.'}
                </p>
              </>
            ) : (
              <>
                <div className="acc-tabs" role="tablist">
                  <button
                    className={mode === 'login' ? 'on' : ''}
                    onClick={() => { setMode('login'); setError(''); }}
                    role="tab" aria-selected={mode === 'login'}
                  >
                    {lang === 'zh' ? '登录' : 'Sign in'}
                  </button>
                  <button
                    className={mode === 'register' ? 'on' : ''}
                    onClick={() => { setMode('register'); setError(''); }}
                    role="tab" aria-selected={mode === 'register'}
                  >
                    {lang === 'zh' ? '注册' : 'Create account'}
                  </button>
                </div>

                <form className="acc-form" onSubmit={submit}>
                  <label>
                    <span>{lang === 'zh' ? '用户名' : 'Username'}</span>
                    <input
                      ref={inputRef}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      maxLength={30}
                      placeholder={lang === 'zh' ? '2–30 个字符' : '2–30 characters'}
                    />
                  </label>
                  <label>
                    <span>{lang === 'zh' ? '密码' : 'Password'}</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      placeholder={lang === 'zh' ? '至少 8 位' : 'At least 8 characters'}
                    />
                  </label>
                  {error && <p className="acc-err" role="alert">{error}</p>}
                  <button className="btn btn-primary acc-wide" type="submit" disabled={busy}>
                    {busy
                      ? (lang === 'zh' ? '处理中…' : 'Working…')
                      : mode === 'login'
                        ? (lang === 'zh' ? '登录' : 'Sign in')
                        : (lang === 'zh' ? '创建账号' : 'Create account')}
                  </button>
                </form>

                <p className="acc-note">
                  {lang === 'zh'
                    ? '登录后换浏览器也能继续：阅读进度按模式保存，复习由 FSRS 按真实间隔排期。未登录时只存在本机。'
                    : 'Sign in to keep progress across browsers. Reading is saved per mode, reviews are scheduled by FSRS. Without an account everything stays on this device.'}
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------------------------------------------- wipe */

function ThemeWipe({ x, y, next }) {
  const bg = next === 'dark' ? '#080a0f' : '#eef1f6';
  return (
    <motion.div
      className="theme-wipe"
      style={{ background: bg, left: 0, top: 0 }}
      initial={{ clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 }}
      animate={{
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(170vmax at ${x}px ${y}px)`,
          `circle(170vmax at ${x}px ${y}px)`
        ],
        opacity: [1, 1, 0]
      }}
      transition={{ duration: 0.92, times: [0, 0.74, 1], ease: EASE }}
    />
  );
}

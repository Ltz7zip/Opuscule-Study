import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring
} from 'framer-motion';
import { useApp } from '../App';
import { EASE, MorphText, Reveal, SplitLine, SPRING } from '../ui';

const MIN_ZOOM = 0.34;
const MAX_ZOOM = 1.8;
const PAD = 34;
const GUTTER = 78;

const FIELDS = [
  { key: 'all', zh: '全部', en: 'All' },
  { key: 'math', zh: '数学', en: 'Math' },
  { key: 'ai', zh: 'AI', en: 'AI' },
  { key: 'cs', zh: '计算机', en: 'CS' }
];

const FIELD_TAGS = { math: '数学', ai: 'AI', cs: '计算机' };

function edgePath(a, b) {
  const sx = a.x + a.w + 2;
  const sy = a.y + a.h / 2;
  const tx = b.x - 9;
  const ty = b.y + b.h / 2;
  const dx = Math.max(26, (tx - sx) * 0.55);
  return `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
}

function boxOf(ids, concepts) {
  let x1 = Infinity;
  let y1 = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;
  ids.forEach((id) => {
    const n = concepts[id];
    if (!n) return;
    x1 = Math.min(x1, n.x);
    y1 = Math.min(y1, n.y);
    x2 = Math.max(x2, n.x + n.w);
    y2 = Math.max(y2, n.y + n.h);
  });
  if (!Number.isFinite(x1)) return null;
  return { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 };
}

function routeFor(concept, subjects) {
  const tag = FIELD_TAGS[concept.field];
  const subject = subjects.find((s) => s.tag === tag) || subjects[0];
  return subject ? subject.slug : 'dl';
}

export default function MapPage() {
  const { lang, t, navigate, openConcept, catalog } = useApp();
  const { concepts, ids: CONCEPT_IDS, edges: EDGES, subjects } = catalog;
  const stageRef = useRef(null);
  const planeRef = useRef(null);
  const miniRef = useRef(null);
  const miniSvgRef = useRef(null);
  const viewRef = useRef(null);
  const miniDrag = useRef(false);
  const touched = useRef(false);
  const drag = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const zoom = useMotionValue(0.9);
  const x = useSpring(px, { stiffness: 220, damping: 30, mass: 0.35 });
  const y = useSpring(py, { stiffness: 220, damping: 30, mass: 0.35 });
  const scale = useSpring(zoom, { stiffness: 240, damping: 32, mass: 0.35 });
  const [field, setField] = useState('all');
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [pct, setPct] = useState(92);
  const [panning, setPanning] = useState(false);
  const reduce = useReducedMotion();
  const selRef = useRef(sel);
  selRef.current = sel;
  const fieldRef = useRef(field);
  fieldRef.current = field;

  /* The graph runs from the top-left corner, so its extent is data, not a guess:
     157 nodes over 34 layers make a plane far taller than any viewport. */
  const bounds = useMemo(() => {
    let mx = 0;
    let my = 0;
    CONCEPT_IDS.forEach((id) => {
      const n = concepts[id];
      if (!n) return;
      mx = Math.max(mx, n.x + n.w);
      my = Math.max(my, n.y + n.h);
    });
    return { x1: 0, y1: 0, x2: mx + 48, y2: my + 48, w: mx + 48, h: my + 48 };
  }, [CONCEPT_IDS, concepts]);
  const GW = bounds.w;
  const GH = bounds.h;

  /* Six dependency layers, with a tolerance so 370/380 collapse into one column. */
  const columns = useMemo(() => {
    const xs = CONCEPT_IDS.map((id) => concepts[id]?.x ?? 0).sort((a, b) => a - b);
    const out = [];
    xs.forEach((v) => {
      if (!out.length || v - out[out.length - 1] > 40) out.push(v);
    });
    return out;
  }, [CONCEPT_IDS, concepts]);

  const idsOfField = useCallback(
    (key) => (key === 'all' ? CONCEPT_IDS : CONCEPT_IDS.filter((id) => concepts[id]?.field === key)),
    [CONCEPT_IDS, concepts]
  );

  /* A filtered plate is sparse on purpose; the frame keeps the reader oriented
     inside the one field they asked for. */
  const fieldBox = useMemo(
    () => (field === 'all' ? null : boxOf(idsOfField(field), concepts)),
    [field, idsOfField, concepts]
  );

  useEffect(() => {
    if (!sel && CONCEPT_IDS.length) setSel(CONCEPT_IDS[0]);
  }, [CONCEPT_IDS, sel]);

  /* Frame a box of the plane. Wide boxes fit whole; tall ones keep type at a
     readable size and dock to the top, leaving the rest to panning. */
  const viewTo = useCallback((box, focusId = null, target = 1.12) => {
    const el = stageRef.current;
    if (!el || !box) return;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    const narrow = vw < 720;
    let s;
    let cx;
    let cy;
    let dockTop = false;

    if (narrow) {
      const n = focusId ? concepts[focusId] : null;
      s = 0.72;
      cx = n ? n.x + n.w / 2 : (box.x1 + box.x2) / 2;
      cy = n ? n.y + n.h / 2 : (box.y1 + box.y2) / 2;
    } else {
      /* Keep a lane on the right for the overview thumbnail, so it never sits
         on top of the last column. */
      const lane = vw - PAD * 2 - GUTTER;
      const fitW = lane / Math.max(1, box.w);
      const fitH = (vh - PAD * 2) / Math.max(1, box.h);
      s = Math.min(fitW, fitH);
      /* Never shrink the type to fit a tall box: keep the plate readable and
         let the rest of the map continue below the fold. */
      if (s < 0.92) {
        s = Math.min(fitW, target);
        dockTop = box.h * s > vh - PAD * 2;
      }
      s = Math.max(MIN_ZOOM, Math.min(1.14, s));
      cy = (box.y1 + box.y2) / 2;
      /* Centre inside the usable lane, not the raw stage. */
      const free = lane - box.w * s;
      px.set(PAD + free / 2 - box.x1 * s);
      py.set(dockTop ? PAD / 2 - box.y1 * s : vh / 2 - cy * s);
      zoom.set(s);
      setPct(Math.round(s * 100));
      touched.current = false;
      return;
    }

    px.set(vw / 2 - cx * s);
    py.set(dockTop ? PAD / 2 - box.y1 * s : vh / 2 - cy * s);
    zoom.set(s);
    setPct(Math.round(s * 100));
    touched.current = false;
  }, [px, py, zoom, concepts]);

  const refit = useCallback(() => {
    const ids = idsOfField(fieldRef.current);
    const focusId = ids.includes(selRef.current) ? selRef.current : ids[0];
    viewTo(boxOf(ids, concepts), focusId, fieldRef.current === 'all' ? 1.12 : 0.94);
  }, [idsOfField, viewTo, concepts]);

  useEffect(() => {
    if (!CONCEPT_IDS.length) return;
    const id = requestAnimationFrame(refit);
    const onResize = () => { if (!touched.current) refit(); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
    };
  }, [refit, CONCEPT_IDS.length]);

  /* The first frame can be measured before the grid has settled; keep the
     opening view honest until the reader takes over the camera. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { if (!touched.current) refit(); });
    ro.observe(el);
    return () => ro.disconnect();
  }, [refit]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const s = zoom.get();
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s * (1 - e.deltaY * 0.0014)));
      px.set(cx - ((cx - px.get()) / s) * next);
      py.set(cy - ((cy - py.get()) / s) * next);
      zoom.set(next);
      setPct(Math.round(next * 100));
      touched.current = true;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [px, py, zoom]);

  /* Double-click a node: the plane glides until that node sits dead centre. */
  const focusOn = (id) => {
    const el = stageRef.current;
    const n = concepts[id];
    if (!el || !n) return;
    const s = Math.max(zoom.get(), 1.05);
    px.set(el.clientWidth / 2 - (n.x + n.w / 2) * s);
    py.set(el.clientHeight / 2 - (n.y + n.h / 2) * s);
    zoom.set(s);
    setPct(Math.round(s * 100));
    touched.current = true;
  };

  /* Panned off-screen by a neighbour link? Bring it back, but never yank a
     node the reader can already see. */
  const reveal = (id) => {
    const el = stageRef.current;
    const n = concepts[id];
    if (!el || !n) return;
    const s = zoom.get();
    const sx = n.x * s + px.get();
    const sy = n.y * s + py.get();
    const pad = 56;
    const visible =
      sx > pad && sy > pad &&
      sx + n.w * s < el.clientWidth - pad &&
      sy + n.h * s < el.clientHeight - pad;
    if (visible) return;
    px.set(el.clientWidth / 2 - (n.x + n.w / 2) * s);
    py.set(el.clientHeight / 2 - (n.y + n.h / 2) * s);
    touched.current = true;
  };

  const pickField = (key) => {
    if (key === field) return;
    setField(key);
    setHov(null);
    const ids = idsOfField(key);
    if (!ids.length) return;
    if (!ids.includes(selRef.current)) setSel(ids[0]);
    viewTo(boxOf(ids, concepts), ids.includes(selRef.current) ? selRef.current : ids[0], key === 'all' ? 1.12 : 0.94);
  };

  const bump = (dir) => {
    const el = stageRef.current;
    const s = zoom.get();
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s + dir));
    if (el) {
      const cx = el.clientWidth / 2;
      const cy = el.clientHeight / 2;
      px.set(cx - ((cx - px.get()) / s) * next);
      py.set(cy - ((cy - py.get()) / s) * next);
    }
    zoom.set(next);
    setPct(Math.round(next * 100));
    touched.current = true;
  };

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('[data-node]')) return;
    drag.current = { x: e.clientX, y: e.clientY, ox: px.get(), oy: py.get() };
    stageRef.current?.setPointerCapture(e.pointerId);
    setPanning(true);
    touched.current = true;
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    px.set(drag.current.ox + e.clientX - drag.current.x);
    py.set(drag.current.oy + e.clientY - drag.current.y);
  };

  const onPointerUp = (e) => {
    if (drag.current) {
      drag.current = null;
      setPanning(false);
      stageRef.current?.releasePointerCapture(e.pointerId);
    }
  };

  /* Keep the overview thumbnail honest without re-rendering on every frame. */
  useEffect(() => {
    const sync = () => {
      const el = stageRef.current;
      const view = viewRef.current;
      if (!el || !view) return;
      const s = scale.get() || 1;
      let vx = -x.get() / s;
      let vy = -y.get() / s;
      let vw = el.clientWidth / s;
      let vh = el.clientHeight / s;
      if (vx < 0) { vw += vx; vx = 0; }
      if (vy < 0) { vh += vy; vy = 0; }
      vw = Math.min(vw, GW - vx);
      vh = Math.min(vh, GH - vy);
      view.setAttribute('x', Math.max(0, vx));
      view.setAttribute('y', Math.max(0, vy));
      view.setAttribute('width', Math.max(0, vw));
      view.setAttribute('height', Math.max(0, vh));
    };
    sync();
    const stops = [x.on('change', sync), y.on('change', sync), scale.on('change', sync)];
    const ro = new ResizeObserver(sync);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => {
      stops.forEach((stop) => stop());
      ro.disconnect();
    };
  }, [x, y, scale, GW, GH]);

  /* Below ~0.62 the secondary line is illegible anyway; drop it for calm. */
  useEffect(() => {
    const apply = (v) => planeRef.current?.classList.toggle('is-far', v < 0.62);
    apply(scale.get());
    return scale.on('change', apply);
  }, [scale]);

  const jumpTo = (clientX, clientY) => {
    const el = stageRef.current;
    const svg = miniSvgRef.current;
    if (!el || !svg) return;
    const r = svg.getBoundingClientRect();
    const gx = Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * GW;
    const gy = Math.min(1, Math.max(0, (clientY - r.top) / r.height)) * GH;
    const s = zoom.get();
    px.set(el.clientWidth / 2 - gx * s);
    py.set(el.clientHeight / 2 - gy * s);
    touched.current = true;
  };

  const onMiniDown = (e) => {
    e.stopPropagation();
    miniDrag.current = true;
    miniRef.current?.setPointerCapture(e.pointerId);
    jumpTo(e.clientX, e.clientY);
  };

  const onMiniMove = (e) => {
    if (miniDrag.current) jumpTo(e.clientX, e.clientY);
  };

  const onMiniUp = (e) => {
    if (!miniDrag.current) return;
    miniDrag.current = false;
    miniRef.current?.releasePointerCapture(e.pointerId);
  };

  const focus = hov || sel || CONCEPT_IDS[0];
  const related = useMemo(() => {
    const set = new Set();
    if (!concepts[focus]) return set;
    set.add(focus);
    concepts[focus].pre.forEach((p) => set.add(p));
    concepts[focus].usedBy.forEach((p) => set.add(p));
    return set;
  }, [focus, concepts]);

  /* Only a hovered node dims its surroundings — a merely selected one leaves
     the rest of the plate legible, which is the point of a map. */
  const isDim = (id) => !hov ? false : related.size > 0 && !related.has(id) && id !== focus;

  const activeId = sel || CONCEPT_IDS[0];
  const selNode = concepts[activeId];
  const fields = useMemo(() => new Set(CONCEPT_IDS.map((id) => concepts[id]?.field)), [CONCEPT_IDS, concepts]);
  const fieldCount = useMemo(() => {
    const out = { all: CONCEPT_IDS.length };
    CONCEPT_IDS.forEach((id) => {
      const f = concepts[id]?.field;
      if (f) out[f] = (out[f] || 0) + 1;
    });
    return out;
  }, [CONCEPT_IDS, concepts]);

  if (catalog.status === 'loading' || !CONCEPT_IDS.length) {
    return (
      <div className="wrap path-loading">
        <div className="loader" aria-hidden="true"><i /><i /><i /></div>
        <p>{lang === 'zh' ? '正在读取知识图…' : 'Loading the graph…'}</p>
      </div>
    );
  }

  return (
    <div className="map-page">
      <div className="wrap map-wrap">
        <header className="page-head map-head">
          <div>
            <div className="page-kick">{t('map.kick')}</div>
            <h1 className="page-title">
              <SplitLine>{t('map.title')}</SplitLine>
            </h1>
            <p className="page-sub">{t('map.sub')}</p>
          </div>
          <div className="map-counts">
            <div><b>{CONCEPT_IDS.length}</b><span>{lang === 'zh' ? '节点' : 'nodes'}</span></div>
            <div><b>{EDGES.length}</b><span>{lang === 'zh' ? '依赖边' : 'edges'}</span></div>
            <div><b>{String(fields.size).padStart(2, '0')}</b><span>{lang === 'zh' ? '学科域' : 'fields'}</span></div>
          </div>
        </header>
      </div>

      <div className="wrap map-wrap map-grid">
        <div className="map-main">
          <div className="map-tools">
            <div className="chips" role="group" aria-label="filter">
              {FIELDS.map((f) => {
                const on = field === f.key;
                return (
                  <motion.button
                    key={f.key}
                    type="button"
                    layout
                    className={`chip ${on ? 'on' : ''}`}
                    onClick={() => pickField(f.key)}
                    aria-pressed={on}
                    transition={SPRING.morph}
                  >
                    <motion.span
                      className="chip-check"
                      aria-hidden="true"
                      animate={{ width: on ? 15 : 0 }}
                      transition={SPRING.morph}
                    >
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.svg
                            key="check"
                            width="11" height="11" viewBox="0 0 12 12" fill="none"
                            stroke="currentColor" strokeWidth="1.9"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={SPRING.snappy}
                          >
                            <motion.path
                              d="M2 6.3 4.6 8.9 10 3.2"
                              strokeLinecap="round" strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.24, ease: EASE }}
                            />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </motion.span>
                    {f.key !== 'all' && <i className={`chip-dot field-${f.key}`} aria-hidden="true" />}
                    <MorphText text={lang === 'zh' ? f.zh : f.en} />
                    <span className="chip-n" aria-hidden="true">{fieldCount[f.key] || 0}</span>
                  </motion.button>
                );
              })}
            </div>

            <span className="map-hint">
              {lang === 'zh' ? '拖拽平移 · 滚轮缩放 · 双击聚焦 · 小图定位' : 'Drag · scroll · double-click to focus · overview to jump'}
            </span>

            <div className="zoom zoom-ex">
              <button className="zx" data-cursor="zoom" onClick={() => bump(-0.12)} aria-label="zoom out">
                <span className="zx-ico">−</span>
                <span className="zx-label"><span>{lang === 'zh' ? '缩小' : 'Out'}</span></span>
              </button>
              <span className="zoom-val">{pct}%</span>
              <button className="zx" data-cursor="zoom" onClick={() => bump(0.12)} aria-label="zoom in">
                <span className="zx-ico">+</span>
                <span className="zx-label"><span>{lang === 'zh' ? '放大' : 'In'}</span></span>
              </button>
              <button className="zoom-fit" onClick={refit} aria-label="fit">{lang === 'zh' ? '适应' : 'Fit'}</button>
            </div>
          </div>

          <div
            className={`map-stage ${panning ? 'is-panning' : ''}`}
            data-cursor="drag"
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="map-atmo" aria-hidden="true" />
            <motion.div
              ref={planeRef}
              className="graph-plane"
              style={{ width: GW, height: GH, x, y, scale, transformOrigin: '0 0' }}
            >
              <div className="graph-cols" aria-hidden="true">
                {columns.map((cx) => <i key={cx} style={{ left: cx - 26 }} />)}
              </div>

              <svg className="graph-edges" width={GW} height={GH} viewBox={`0 0 ${GW} ${GH}`} aria-hidden="true">
                <defs>
                  <marker id="arrow-off" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" fill="var(--line-2)" />
                  </marker>
                  <marker id="arrow-on" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
                  </marker>
                </defs>

                {EDGES.map((e, i) => {
                  const on = related.has(e.from) && related.has(e.to);
                  const off = field !== 'all' &&
                    (concepts[e.from].field !== field || concepts[e.to].field !== field);
                  return (
                    <motion.path
                      key={e.id}
                      className={`edge ${on ? 'on' : ''}`}
                      d={edgePath(concepts[e.from], concepts[e.to])}
                      fill="none"
                      stroke={on ? 'var(--accent)' : 'var(--line-2)'}
                      strokeWidth={on ? 1.4 : 1}
                      markerEnd={on ? 'url(#arrow-on)' : 'url(#arrow-off)'}
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: off ? 0 : on ? 1 : hov ? 0.13 : 0.36 }}
                      transition={{
                        pathLength: { duration: reduce ? 0 : 1, ease: EASE, delay: reduce ? 0 : 0.1 + Math.min(i, 40) * 0.014 },
                        opacity: { duration: 0.28, ease: EASE }
                      }}
                    />
                  );
                })}
              </svg>

              {fieldBox && (
                <motion.div
                  className={`map-field-frame field-${field}`}
                  aria-hidden="true"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    left: fieldBox.x1 - 16,
                    top: fieldBox.y1 - 16,
                    width: fieldBox.w + 32,
                    height: fieldBox.h + 32
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span>{FIELD_TAGS[field]} · {idsOfField(field).length}</span>
                </motion.div>
              )}

              {CONCEPT_IDS.map((id) => {
                const n = concepts[id];
                const off = field !== 'all' && n.field !== field;
                const dim = !off && isDim(id);
                const on = id === activeId;
                return (
                  <motion.button
                    key={id}
                    data-node={id}
                    type="button"
                    className={`gnode field-${n.field} ${on ? 'is-sel' : ''} ${dim ? 'is-dim' : ''} ${off ? 'is-off' : ''}`}
                    data-cursor="pick"
                    style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: off ? 0.26 : dim ? 0.3 : 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    onClick={() => setSel(id)}
                    onDoubleClick={() => focusOn(id)}
                    onPointerEnter={() => setHov(id)}
                    onPointerLeave={() => setHov(null)}
                    onFocus={() => setHov(id)}
                    onBlur={() => setHov(null)}
                    aria-pressed={on}
                    title={lang === 'zh' ? n.zh : n.en}
                  >
                    <span className="gn-dot" aria-hidden="true" />
                    <span className="gn-label">{lang === 'zh' ? n.zh : n.en}</span>
                    <span className="gn-sub">{lang === 'zh' ? n.en : n.zh}</span>
                    {on && <span className="gn-ring" aria-hidden="true" />}
                  </motion.button>
                );
              })}
            </motion.div>

            <div
              className="map-mini"
              ref={miniRef}
              aria-hidden="true"
              onPointerDown={onMiniDown}
              onPointerMove={onMiniMove}
              onPointerUp={onMiniUp}
              onPointerCancel={onMiniUp}
            >
              <span className="mini-cap">{lang === 'zh' ? '全图' : 'ALL'}</span>
              <svg
                ref={miniSvgRef}
                viewBox={`0 0 ${GW} ${GH}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ aspectRatio: `${GW} / ${GH}` }}
              >
                {CONCEPT_IDS.map((id) => {
                  const n = concepts[id];
                  const off = field !== 'all' && n.field !== field;
                  return (
                    <rect
                      key={id}
                      className={`mm-node field-${n.field} ${off ? 'is-off' : ''}`}
                      x={n.x}
                      y={n.y}
                      width={n.w}
                      height={n.h}
                      rx={10}
                    />
                  );
                })}
                <rect ref={viewRef} className="mini-view" x={0} y={0} width={0} height={0} />
              </svg>
            </div>
          </div>
        </div>

        <aside className="map-aside">
          <motion.div
            className="panel"
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div className="panel-top">
              <span className={`field-tag ${selNode.field}`}>
                {selNode.field === 'math' ? t('map.legend.math') : selNode.field === 'ai' ? t('map.legend.ai') : t('map.legend.cs')}
              </span>
              <span className="panel-count">{CONCEPT_IDS.indexOf(activeId) + 1} / {CONCEPT_IDS.length}</span>
            </div>

            <h2 className="panel-title">{lang === 'zh' ? selNode.zh : selNode.en}</h2>
            <div className="panel-sub">{lang === 'zh' ? selNode.en : selNode.zh}</div>
            <p className="panel-def">{lang === 'zh' ? selNode.def : selNode.defEn}</p>

            <div className="panel-block">
              <div className="mini-kick">{lang === 'zh' ? '前置' : 'Requires'}</div>
              {selNode.pre.length ? (
                <div className="panel-list">
                  {selNode.pre.map((p) => (
                    <button key={p} onClick={() => { setSel(p); reveal(p); }}>
                      <span>{concepts[p][lang === 'zh' ? 'zh' : 'en']}</span>
                      <i aria-hidden="true">→</i>
                    </button>
                  ))}
                </div>
              ) : <p className="panel-none">{lang === 'zh' ? '根节点。' : 'A root node.'}</p>}
            </div>

            <div className="panel-block">
              <div className="mini-kick">{lang === 'zh' ? '被用于' : 'Leads to'}</div>
              {selNode.usedBy.length ? (
                <div className="panel-list">
                  {selNode.usedBy.map((p) => (
                    <button key={p} onClick={() => { setSel(p); reveal(p); }}>
                      <span>{concepts[p][lang === 'zh' ? 'zh' : 'en']}</span>
                      <i aria-hidden="true">→</i>
                    </button>
                  ))}
                </div>
              ) : <p className="panel-none">{lang === 'zh' ? '终点节点。' : 'An endpoint.'}</p>}
            </div>

            <div className="panel-actions">
              <button className="btn btn-primary btn-arrow" onClick={() => openConcept(activeId)}>
                {lang === 'zh' ? '展开概念' : 'Open concept'}
                <svg width="14" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M1 5h13M10 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn btn-ghost" onClick={() => navigate(`/path/${routeFor(selNode, subjects)}/mastery`)}>
                {lang === 'zh' ? '看路线' : 'Route'}
              </button>
            </div>
          </motion.div>

          <Reveal className="map-note" delay={0.08} y={14}>
            <div className="rail-kick">{t('map.side.title')}</div>
            <p>{t('map.side.text')}</p>
            <div className="mini-graph wide" aria-hidden="true">
              <span className="mg-node" data-k="root" />
              <span className="mg-line l1" />
              <span className="mg-node n1" />
              <span className="mg-node n2" />
              <span className="mg-line l2" />
              <span className="mg-node n3" />
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, animate
} from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

/* Arc springs: described by how long the motion looks (visualDuration)
   and how much it overshoots (bounce). Shared by every moving component. */
export const SPRING = {
  smooth: { type: 'spring', visualDuration: 0.4, bounce: 0 },
  snappy: { type: 'spring', visualDuration: 0.26, bounce: 0.12 },
  morph: { type: 'spring', visualDuration: 0.42, bounce: 0.16 },
  responsive: { type: 'spring', stiffness: 520, damping: 38 },
  gentle: { type: 'spring', stiffness: 340, damping: 34 }
};

export const DUR = { instant: 0.12, fast: 0.16, exit: 0.18, standard: 0.24, considered: 0.48 };

/* Springs overshoot; a blur driven by one can dip below zero and log an
   "Invalid keyframe value" warning. Blur gets its own tween. */
const BLUR_FADE = { type: 'tween', duration: 0.4, ease: EASE };

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on);
    };
  }, []);
  return fine;
}

export function Reveal({ children, delay = 0, y = 22, className = '', as = 'div', once = true, ...rest }) {
  const Comp = motion[as] || motion.div;
  const reduce = useReducedMotion();
  if (reduce) {
    return <Comp className={className} {...rest}>{children}</Comp>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-7% 0px -4% 0px' }}
      transition={{ duration: 0.72, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** A hairline that draws itself in from the left when it enters the viewport. */
export function Rule({ className = '', delay = 0, duration = 1.1 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`rule ${className}`}
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    />
  );
}

/** A label that rolls: the copy rises out and an identical copy follows it. */
export function RollLabel({ children, className = '' }) {
  return (
    <span className={`roll-label ${className}`}>
      <span className="rl-a">{children}</span>
      <span className="rl-b" aria-hidden="true">{children}</span>
    </span>
  );
}

export function SplitLine({ children, delay = 0, className = '', duration = 0.95 }) {
  return (
    <span className={`split-line ${className}`}>
      <motion.span
        className="split-inner"
        initial={{ y: '112%' }}
        animate={{ y: '0%' }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Stagger({ children, className = '', delay = 0, gap = 0.07, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-6% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } }
};

export function Magnetic({ children, strength = 14, className = '' }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const ref = useRef(null);
  const active = fine && !reduce;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { x, y } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({ children, className = '', max = 6, glare = true }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 180, damping: 20 });
  const ry = useSpring(0, { stiffness: 180, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const active = fine && !reduce;

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 950 } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set((0.5 - py) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
        ref.current.style.setProperty('--gx', `${px * 100}%`);
        ref.current.style.setProperty('--gy', `${py * 100}%`);
        ref.current.style.setProperty('--mx', `${px * 100}%`);
        ref.current.style.setProperty('--my', `${py * 100}%`);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {glare && <span className="tilt-glare" aria-hidden="true" />}
      {children}
    </motion.div>
  );
}

export function Counter({ value, duration = 1.35, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setShown(value); return; }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return <span ref={ref} className={className}>{shown.toLocaleString()}</span>;
}

export function Ring({ value = 38, size = 64, stroke = 2, label, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduce = useReducedMotion();
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className={`ring ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
        <motion.circle
          className="ring-fill"
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - value / 100) : c }}
          animate={{ strokeDashoffset: inView ? c * (1 - value / 100) : c }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.18 }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-label">{label ?? `${value}%`}</span>
    </div>
  );
}

export function Marquee({ items, speed = 44, reverse = false, className = '' }) {
  const row = (
    <div className="marquee-row" aria-hidden="true">
      {[...items, ...items].map((it, i) => (
        <span className="marquee-item" key={i}>
          {it}
          <i className="marquee-dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`} style={{ '--speed': `${speed}s` }}>
      <div className={reverse ? 'marquee-track rev' : 'marquee-track'}>
        {row}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Arc primitives */

/** Digits roll in place; only the digits that changed move. */
export function RollingNumber({ value, className = '', pad = 0 }) {
  const reduce = useReducedMotion();
  const prev = useRef(value);
  const up = value >= prev.current;
  useEffect(() => { prev.current = value; }, [value]);
  const chars = String(value).padStart(pad, '0').split('');

  return (
    <span className={`roll-num ${className}`} aria-label={String(value)}>
      {chars.map((ch, i) => (
        <span className="rn-slot" key={i} aria-hidden="true">
          {/[0-9]/.test(ch) ? (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${i}-${ch}`}
                className="rn-digit"
                initial={reduce ? { opacity: 0 } : { y: up ? '72%' : '-72%', opacity: 0, filter: 'blur(3px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                exit={reduce ? { opacity: 0 } : { y: up ? '-72%' : '72%', opacity: 0, filter: 'blur(3px)' }}
                transition={reduce ? { duration: DUR.fast } : { ...SPRING.snappy, filter: BLUR_FADE }}
              >
                {ch}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="rn-static">{ch}</span>
          )}
        </span>
      ))}
    </span>
  );
}

/** Headline entrance: characters rise out of a clip, 18ms apart.
    Latin runs stay glued together; CJK breaks per character. */
export function SplitChars({ text, className = '', delay = 0, gap = 0.018, once = true }) {
  const reduce = useReducedMotion();
  const tokens = [];
  let at = 0;
  Array.from(text).forEach((ch) => {
    if (ch === ' ') {
      tokens.push({ space: true, at });
    } else if (/[\u3000-\u9fff\uff00-\uffef]/.test(ch)) {
      tokens.push({ ch, at });
    } else {
      const last = tokens[tokens.length - 1];
      if (last && last.word) last.word.push(ch);
      else tokens.push({ word: [ch], at });
    }
    at += 1;
  });

  const char = (idx, ch) => (
    <motion.span
      className="sc-char"
      key={`${idx}-${ch.space || ch}`}
      initial={reduce ? { opacity: 0 } : { y: '112%', opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={reduce
        ? { duration: DUR.fast, delay: 0 }
        : {
          type: 'spring', stiffness: 300, damping: 30, delay: delay + idx * gap, filter: BLUR_FADE
        }}
    >
      {ch}
    </motion.span>
  );

  return (
    <span className={`split-chars ${className}`} aria-label={text}>
      {tokens.map((t, k) => (
        <span
          className={t.space ? 'sc-space' : t.word ? 'sc-word' : 'sc-clip'}
          key={k}
          aria-hidden="true"
        >
          {t.space ? null : t.word
            ? t.word.map((ch, j) => char(t.at + j, ch))
            : char(t.at, t.ch)}
        </span>
      ))}
    </span>
  );
}

/** Swap a short label; the old text blurs up, the new one arrives, width springs. */
export function MorphText({ text, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <span className={`morph-text ${className}`}>
      <motion.span layout className="mt-inner">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={reduce ? { opacity: 0 } : { y: '58%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { y: '-58%', opacity: 0, filter: 'blur(4px)' }}
            transition={reduce ? { duration: DUR.fast } : { ...SPRING.snappy, filter: BLUR_FADE }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

/** Arc's hold-to-confirm: fill advances only while held; early release rewinds. */
export function HoldToConfirm({
  label, holdingLabel, doneLabel, onConfirm, onUndo, done = false,
  duration = 1100, className = ''
}) {
  const reduce = useReducedMotion();
  const [state, setState] = useState('idle');
  const progress = useMotionValue(0);
  const controls = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => {
    controls.current?.stop?.();
    clearTimeout(timer.current);
  }, []);

  const finish = () => {
    controls.current?.stop?.();
    progress.set(1);
    setState('done');
    onConfirm?.();
    timer.current = setTimeout(() => {
      setState('idle');
      animate(progress, 0, { duration: DUR.standard, ease: EASE });
    }, 1500);
  };

  const start = (e) => {
    if (done) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setState('holding');
    if (reduce) { finish(); return; }
    controls.current?.stop?.();
    controls.current = animate(progress, 1, {
      duration: duration / 1000,
      ease: 'linear',
      onComplete: finish
    });
  };

  const cancel = () => {
    if (state !== 'holding') return;
    controls.current?.stop?.();
    setState('idle');
    animate(progress, 0, { type: 'spring', visualDuration: 0.45, bounce: 0 });
  };

  if (done) {
    return (
      <button className={`hold is-done ${className}`} onClick={onUndo}>
        <motion.span
          className="hold-check"
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING.snappy}
          aria-hidden="true"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
            <motion.path
              d="M2.5 7.4 5.6 10.4 11.5 3.9"
              strokeLinecap="round" strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
            />
          </svg>
        </motion.span>
        <MorphText text={doneLabel || label} />
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      className={`hold ${state === 'holding' ? 'is-holding' : ''} ${className}`}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); }
      }}
      whileTap={reduce ? undefined : { scale: 0.975 }}
      transition={SPRING.snappy}
      aria-label={label}
    >
      <motion.span className="hold-fill" style={{ scaleX: progress }} aria-hidden="true" />
      <span className="hold-label">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={state === 'holding' ? 'holding' : 'idle'}
            initial={reduce ? { opacity: 0 } : { y: '55%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { y: '-55%', opacity: 0, filter: 'blur(4px)' }}
            transition={reduce ? { duration: DUR.fast } : { ...SPRING.snappy, filter: BLUR_FADE }}
          >
            {state === 'holding' ? (holdingLabel || label) : label}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hold-hint" aria-hidden="true">{state === 'holding' ? '●' : '◦'}</span>
    </motion.button>
  );
}

/** Sun and moon turn the same way, then settle one hair off-centre in dark. */
export function ThemeIcon({ dark }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="theme-icon"
      animate={dark ? { x: -2, y: 1 } : { x: 0, y: 0 }}
      transition={SPRING.snappy}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={dark ? 'sun' : 'moon'}
          width="14" height="14" viewBox="0 0 16 16"
          initial={reduce ? { opacity: 0 } : { rotate: -90, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { rotate: 90, scale: 0.6, opacity: 0 }}
          transition={reduce ? { duration: DUR.fast } : SPRING.snappy}
        >
          {dark ? (
            <>
              <circle cx="8" cy="8" r="3" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1" />
              </g>
            </>
          ) : (
            <path d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.9 5.9 0 1 0 6.6 6.6Z" fill="currentColor" />
          )}
        </motion.svg>
      </AnimatePresence>
    </motion.span>
  );
}

/** Arc's elastic slider: thumb swells while dragged, track stretches past the ends,
    the value tag tilts with the drag, and release settles on the nearest detent. */
export function ElasticSlider({
  value, onChange, min = 1, max = 12, step = 1, marks = [],
  label = '', unit = '', className = ''
}) {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const dragging = useRef(null);
  const [active, setActive] = useState(false);
  const stretch = useSpring(0, { stiffness: 380, damping: 26, mass: 0.5 });
  const tilt = useSpring(0, { stiffness: 260, damping: 24 });
  const thumbScale = useSpring(1, { stiffness: 520, damping: 30 });
  const pct = ((value - min) / (max - min)) * 100;

  useEffect(() => { thumbScale.set(active ? 1.32 : 1); }, [active, thumbScale]);

  const commit = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const r = dragging.current?.rect || el.getBoundingClientRect();
    const raw = (clientX - r.left) / r.width;
    const next = clamp(min + clamp(raw, 0, 1) * (max - min), min, max);
    const snapped = clamp(Math.round(next / step) * step, min, max);
    if (snapped !== value) onChange(snapped);
    if (!reduce) {
      const over = raw < 0 ? raw : raw > 1 ? raw - 1 : 0;
      stretch.set(clamp(over * 150, -22, 22));
      tilt.set(clamp(over * 42, -7, 7));
    }
  };

  const down = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    dragging.current = { rect: el.getBoundingClientRect() };
    el.setPointerCapture?.(e.pointerId);
    setActive(true);
    commit(e.clientX);
  };
  const move = (e) => { if (dragging.current) commit(e.clientX); };
  const up = (e) => {
    if (!dragging.current) return;
    dragging.current = null;
    setActive(false);
    trackRef.current?.releasePointerCapture?.(e.pointerId);
    stretch.set(0);
    tilt.set(0);
  };

  const nudge = (dir) => onChange(clamp(value + dir * step, min, max));

  return (
    <div className={`eslider ${active ? 'is-active' : ''} ${className}`}>
      <div className="es-head">
        <span>{label}</span>
        <span className="es-val">
          <RollingNumber value={value} />
          {unit}
        </span>
      </div>

      <div
        className="es-track"
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); nudge(1); }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); nudge(-1); }
        }}
      >
        <span className="es-rail" aria-hidden="true" />
        <motion.span
          className="es-fill"
          aria-hidden="true"
          animate={{ width: `${pct}%` }}
          transition={SPRING.smooth}
        />
        {marks.map((m) => {
          const at = ((m - min) / (max - min)) * 100;
          return (
            <span className="es-tick" key={m} style={{ left: `${at}%` }} aria-hidden="true">
              <i className={m <= value ? 'on' : ''} />
            </span>
          );
        })}
        <motion.span
          className="es-thumb"
          aria-hidden="true"
          style={{ left: `${pct}%`, scale: thumbScale, rotate: tilt, x: stretch }}
        />
        <motion.span className="es-tag" aria-hidden="true" style={{ left: `${pct}%`, rotate: tilt }}>
          {value}{unit}
        </motion.span>
      </div>

      <div className="es-marks">
        {marks.map((m) => (
          <button
            key={m}
            type="button"
            className={m === value ? 'on' : ''}
            onClick={() => onChange(m)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- activity terrain */

/* A faithful web port of TKCode.Arc's ActivityTerrain block: seven days by
   twenty-four hours, 168 bars, an orbitable camera, a hover read-out and a
   press-flat heat map. Values are ordered day × 24 + hour, Monday first. */

const AT_DAYS = [
  ['周一', 'Mon'], ['周二', 'Tue'], ['周三', 'Wed'], ['周四', 'Thu'],
  ['周五', 'Fri'], ['周六', 'Sat'], ['周日', 'Sun']
];
const AT_DAYS_ZH = ['一', '二', '三', '四', '五', '六', '日'];
const AT_RHYTHM = [
  0.20, 0.13, 0.09, 0.07, 0.08, 0.13, 0.28, 0.50, 0.74, 0.90, 0.86, 0.72,
  0.52, 0.58, 0.74, 0.82, 0.76, 0.64, 0.52, 0.58, 0.70, 0.62, 0.44, 0.28
];

const atClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const atRnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const atEase = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function atValues(base, seed, phase = 0) {
  return Array.from({ length: 168 }, (_, i) => {
    const day = Math.floor(i / 24);
    const hour = i % 24;
    const weekend = day >= 5 ? 0.5 : 1;
    const friday = day === 4 ? 0.88 : 1;
    const noise = 0.8 + atRnd(i * 12.9898 + seed * 78.233 + phase * 37.719) * 0.44;
    return Math.max(0, Math.round(base * AT_RHYTHM[hour] * weekend * friday * noise));
  });
}

/** Three metrics, each with this week's 168 hours and last week's, in the
    same Monday-first order the Arc block expects. */
export function buildTerrainMetrics(seed = 0) {
  const mk = (key, zh, en, unitZh, unitEn, base, salt, tone, higherIsBetter) => ({
    key,
    label: { zh, en },
    unit: { zh: unitZh, en: unitEn },
    tone,
    higherIsBetter,
    values: atValues(base, seed + salt, salt),
    previousValues: atValues(base * 0.94, seed + salt, salt + 17)
  });
  return [
    mk('reviews', '复习', 'Reviews', '次', 'reviews', 620, 1.7, 'accent', true),
    mk('drills', '练习', 'Drills', '次', 'drills', 230, 4.3, 'neutral', true),
    mk('mistakes', '错题', 'Mistakes', '道', 'mistakes', 38, 8.1, 'danger', false)
  ];
}

export function summarizeTerrain(metric, peakCount = 3, working = { first: 8, last: 18 }) {
  const values = metric.values || [];
  const total = values.reduce((a, v) => a + v, 0);
  const prev = (metric.previousValues || []).reduce((a, v) => a + v, 0);
  const change = prev > 0 ? ((total - prev) / prev) * 100 : null;
  const dayTotals = Array.from({ length: 7 }, (_, d) =>
    values.slice(d * 24, d * 24 + 24).reduce((a, v) => a + v, 0));
  const peak = values
    .map((v, i) => i)
    .sort((a, b) => values[b] - values[a] || a - b)
    .slice(0, peakCount)
    .map((i) => ({ day: Math.floor(i / 24), hour: i % 24, value: values[i] }));
  let busiest = 0;
  dayTotals.forEach((v, d) => { if (v > dayTotals[busiest]) busiest = d; });
  let workingTotal = 0;
  values.forEach((v, i) => {
    const h = i % 24;
    if (h >= working.first && h <= working.last) workingTotal += v;
  });
  return { total, prev, change, dayTotals, peak, busiest, share: total ? workingTotal / total : 0 };
}

const AT_DEFAULT = buildTerrainMetrics(0);
export const TERRAIN_SUMMARY = summarizeTerrain(AT_DEFAULT[0]);

const atHex = (s) => {
  const v = String(s || '').trim();
  if (v.startsWith('rgb')) {
    const m = v.match(/[\d.]+/g);
    if (m && m.length >= 3) return [Number(m[0]), Number(m[1]), Number(m[2])];
  }
  if (!v.startsWith('#')) return [128, 128, 128];
  const h = v.slice(1);
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const i = parseInt(n, 16);
  return [(i >> 16) & 255, (i >> 8) & 255, i & 255];
};
const atMix = (a, b, t) => {
  const A = atHex(a);
  const B = atHex(b);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)}, ${Math.round(A[1] + (B[1] - A[1]) * t)}, ${Math.round(A[2] + (B[2] - A[2]) * t)})`;
};
const atShade = (rgb, amt) => {
  const m = String(rgb).match(/\d+/g).map(Number);
  const f = (v) => Math.round(atClamp(v * (1 + amt), 0, 255));
  return `rgb(${f(m[0])}, ${f(m[1])}, ${f(m[2])})`;
};
const atPalette = (el) => {
  const root = document.documentElement;
  const dark = root.dataset.theme === 'dark';
  const cs = getComputedStyle(root);
  const g = (n, fb) => {
    const fromRoot = cs.getPropertyValue(n).trim();
    if (fromRoot) return fromRoot;
    const fromEl = el ? getComputedStyle(el).getPropertyValue(n).trim() : '';
    return fromEl || fb;
  };
  return {
    dark,
    surface: g('--paper-2', dark ? '#10141b' : '#ffffff'),
    floor: g('--paper-3', dark ? '#191e28' : '#e2e7f0'),
    ink: g('--ink', dark ? '#edf2fa' : '#0a1020'),
    muted: g('--ink-3', dark ? '#7b879b' : '#5b6779'),
    accent: g('--accent', dark ? '#6ba3ff' : '#0562ef'),
    danger: g('--danger', dark ? '#ff7b72' : '#d92d20'),
    grid: dark ? 'rgba(237,242,250,0.1)' : 'rgba(10,16,32,0.08)'
  };
};
const atWeekRange = (zh) => {
  const now = new Date();
  const dow = (now.getDay() + 6) % 7;
  const mon = new Date(now);
  mon.setDate(now.getDate() - dow);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  if (zh) return `${mon.getMonth() + 1} 月 ${mon.getDate()} 日至 ${sun.getDate()} 日`;
  const mf = new Intl.DateTimeFormat('en', { month: 'short' });
  return `${mf.format(mon)} ${mon.getDate()} to ${sun.getDate()}, ${sun.getFullYear()}`;
};

export function ActivityTerrain({
  lang = 'zh',
  seed = 0,
  compact = false,
  className = '',
  title,
  subtitle,
  metrics: metricsProp,
  peakCount = 3
}) {
  const zh = lang === 'zh';
  const reduce = useReducedMotion();
  const metrics = useMemo(() => metricsProp || buildTerrainMetrics(seed), [metricsProp, seed]);
  const [metricKey, setMetricKey] = useState(metrics[0].key);
  const metric = metrics.find((m) => m.key === metricKey) || metrics[0];
  const [view, setView] = useState('terrain');
  const [hover, setHover] = useState(null);
  const [focus, setFocus] = useState(null);
  const [card, setCard] = useState(null);
  const [moved, setMoved] = useState(false);
  const [plotH, setPlotH] = useState(compact ? 236 : 280);

  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const camRef = useRef({ yaw: 0.36, pitch: 0.38, zoom: 1, tx: 0, tz: 0, flat: 0, touched: false });
  const hoverRef = useRef(null);
  const focusRef = useRef(null);
  const engineRef = useRef(null);

  const nf = useMemo(() => new Intl.NumberFormat(zh ? 'zh-CN' : 'en-US'), [zh]);
  const summary = useMemo(() => summarizeTerrain(metric, peakCount), [metric, peakCount]);
  const range = useMemo(() => atWeekRange(zh), [zh]);
  const active = hover || focus;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      /* the heat map is a 24 × 7 square grid, so it only needs as much height
         as that aspect ratio asks for — no dead bands above and below */
      const h = view === 'top' && !compact
        ? Math.round(atClamp(w / 3.43 + 50, 230, 420))
        : (compact
          ? Math.round(atClamp(w * 0.6, 216, 300))
          : Math.round(atClamp(w * 0.44, 280, 460)));
      setPlotH(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [compact, view]);

  useEffect(() => {
    hoverRef.current = null;
    setHover(null);
    setCard(null);
    setMoved(false);
  }, [metricKey, view]);

  useEffect(() => {
    focusRef.current = null;
    setFocus(null);
  }, [metricKey]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const cam = camRef.current;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let unit = 12;
    let ox = 0;
    let oy = 0;
    let layoutYaw = NaN;
    let layoutPitch = NaN;
    let palette = atPalette(cv);
    let colorCache = new Map();
    let items = [];
    let raf = 0;
    let tween = null;
    let gliding = false;
    let vel = { yaw: 0, pitch: 0 };
    let drag = null;
    let pointers = new Map();
    let pinch = null;
    let movedShown = false;
    let rise = reduce ? -1e9 : performance.now();

    const values = metric.values;
    const maxV = Math.max(1, ...values);
    const narrowNow = () => W < 460;

    const defaults = () => {
      const narrow = narrowNow();
      return { yaw: narrow ? 0.87 : 0.36, pitch: narrow ? 0.62 : 0.38, zoom: 1, tx: 0, tz: 0, flat: 0 };
    };

    const project = (x, y, z) => {
      const dx = x - cam.tx;
      const dz = z - cam.tz;
      const sy = Math.sin(cam.yaw);
      const cy = Math.cos(cam.yaw);
      const sp = Math.sin(cam.pitch);
      const cp = Math.cos(cam.pitch);
      const ry = dx * sy * sp + dz * cy * sp - (y - 1.1) * cp;
      const dist = 40 - (dx * sy * cp + dz * cy * cp + (y - 1.1) * sp);
      const k = 40 / Math.max(18, dist);
      const u = unit * cam.zoom;
      return { x: ox + (dx * cy - dz * sy) * u * k, y: oy + ry * u * k, d: dist };
    };

    /* Projection at unit = 1 and origin (0, 0): every screen coordinate is
       `origin + local * unit`, so the exact framing can be solved from these. */
    const proj1 = (x, y, z) => {
      const dx = x - cam.tx;
      const dz = z - cam.tz;
      const sy = Math.sin(cam.yaw);
      const cy = Math.cos(cam.yaw);
      const sp = Math.sin(cam.pitch);
      const cp = Math.cos(cam.pitch);
      const ry = dx * sy * sp + dz * cy * sp - (y - 1.1) * cp;
      const dist = 40 - (dx * sy * cp + dz * cy * cp + (y - 1.1) * sp);
      const k = 40 / Math.max(18, dist);
      return { x: (dx * cy - dz * sy) * k, y: ry * k };
    };

    const layout = () => {
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      const add = (p) => {
        if (p.x < x0) x0 = p.x;
        if (p.x > x1) x1 = p.x;
        if (p.y < y0) y0 = p.y;
        if (p.y > y1) y1 = p.y;
      };
      [-3.55, 3.55].forEach((z) => [-12.2, 12.2].forEach((x) => add(proj1(x, 0, z))));
      const hw = 0.42;
      for (let day = 0; day < 7; day += 1) {
        for (let hour = 0; hour < 24; hour += 1) {
          const v = values[day * 24 + hour] || 0;
          const top = 0.06 + Math.pow(v / maxV, 0.72) * 4.9;
          const x = hour - 11.5;
          const z = day - 3;
          add(proj1(x - hw, top, z - hw));
          add(proj1(x + hw, top, z + hw));
          add(proj1(x - hw, top, z + hw));
          add(proj1(x + hw, top, z - hw));
        }
      }
      /* gutters leave room for the day column (left) and hour row (bottom) */
      const padL = view === 'top' ? 58 : compact ? 34 : 50;
      const padR = 14;
      const padT = compact ? 10 : 14;
      const padB = compact ? 22 : 28;
      const bw = Math.max(1, x1 - x0);
      const bh = Math.max(1, y1 - y0);
      unit = Math.min((W - padL - padR) / bw, (H - padT - padB) / bh);
      ox = padL + ((W - padL - padR) - bw * unit) / 2 - x0 * unit;
      oy = padT + ((H - padT - padB) - bh * unit) / 2 - y0 * unit;
      layoutYaw = cam.yaw;
      layoutPitch = cam.pitch;
    };

    const toneOf = () => (
      metric.tone === 'danger' ? palette.danger : metric.tone === 'neutral' ? palette.muted : palette.accent
    );
    const barColor = (t) => {
      const tone = toneOf();
      const key = `${Math.round(t * 100)}|${tone}`;
      if (!colorCache.has(key)) {
        const lo = atMix(palette.floor, tone, 0.14);
        const hi = atMix(tone, palette.ink, 0.42);
        colorCache.set(key, atMix(lo, hi, Math.pow(t, 0.7)));
      }
      return colorCache.get(key);
    };

    const face = (pts, fill, stroke) => {
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };
    const quad = (a, b, c, d) => {
      ctx.beginPath();
      [a, b, c, d].forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fill();
    };
    const inPoly = (x, y, pts) => {
      let inside = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const xi = pts[i].x;
        const yi = pts[i].y;
        const xj = pts[j].x;
        const yj = pts[j].y;
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    };
    const boxOf = (faces) => {
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      faces.forEach((f) => f.forEach((p) => {
        x0 = Math.min(x0, p.x);
        y0 = Math.min(y0, p.y);
        x1 = Math.max(x1, p.x);
        y1 = Math.max(y1, p.y);
      }));
      return { x0, y0, x1, y1 };
    };
    const pointOf = (e) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const placeCard = (it) => {
      if (!it) return null;
      const half = 92;
      const below = it.minY < 132;
      return {
        left: Math.round(atClamp(it.cx, half + 6, Math.max(half + 6, W - half - 6))),
        top: Math.round(below ? Math.max(it.maxY, 8) : it.minY),
        below
      };
    };

    const pick = (px, py) => {
      for (let i = items.length - 1; i >= 0; i -= 1) {
        const it = items[i];
        if (px < it.box.x0 || px > it.box.x1 || py < it.box.y0 || py > it.box.y1) continue;
        if (it.rect) return it;
        if (inPoly(px, py, it.top) || inPoly(px, py, it.fx) || inPoly(px, py, it.fz)) return it;
      }
      return null;
    };

    const setHoverCell = (cell, it) => {
      const cur = hoverRef.current;
      if (!cell && !cur) return;
      if (cell && cur && cur.day === cell.day && cur.hour === cell.hour) return;
      hoverRef.current = cell;
      setHover(cell);
      setCard(cell && it ? placeCard(it) : null);
      kick();
    };

    const tweenTo = (to, dur = 640) => {
      tween = {
        from: { yaw: cam.yaw, pitch: cam.pitch, zoom: cam.zoom, tx: cam.tx, tz: cam.tz, flat: cam.flat },
        to,
        start: performance.now(),
        dur
      };
      gliding = false;
      vel = { yaw: 0, pitch: 0 };
      kick();
    };

    const flyTo = (cell) => {
      if (view === 'top') { kick(); return; }
      cam.touched = true;
      tweenTo({
        zoom: Math.max(1.6, cam.zoom),
        tx: cell.hour - 11.5,
        tz: cell.day - 3
      }, 760);
    };

    const showWeek = () => {
      focusRef.current = null;
      setFocus(null);
      setCard(null);
      if (view === 'top') { kick(); return; }
      tweenTo(defaults(), 760);
    };

    const focusCell = (cell) => {
      const it = items.find((x) => x.day === cell.day && x.hour === cell.hour);
      const c = { day: cell.day, hour: cell.hour };
      focusRef.current = c;
      setFocus(c);
      setCard(it ? placeCard(it) : null);
      flyTo(c);
    };

    const roundRect = (x, y, w, h, r) => {
      const rr = Math.max(0, Math.min(r, w / 2, h / 2));
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    /* Heat map: drawn directly in screen space — axis-aligned 24 × 7 squares,
       no camera involved, so the grid can never tilt or overflow. */
    const drawTop = (now) => {
      ctx.clearRect(0, 0, W, H);
      const activeCell = hoverRef.current || focusRef.current;
      const elapsed = reduce ? 1e9 : now - rise;
      const padL = compact ? 30 : 46;
      const padR = compact ? 10 : 16;
      const padT = compact ? 8 : 12;
      const padB = compact ? 22 : 30;
      const gw = Math.max(1, W - padL - padR);
      const gh = Math.max(1, H - padT - padB);
      const cell = Math.min(gw / 24, gh / 7);
      const gridW = cell * 24;
      const gridH = cell * 7;
      const left = padL + (gw - gridW) / 2;
      const top = padT + (gh - gridH) / 2;
      const gap = Math.max(1, cell * 0.1);
      const s = cell - gap;
      const brief = W < 460;

      if (activeCell) {
        const rgb = atHex(toneOf()).join(',');
        ctx.fillStyle = `rgba(${rgb},${palette.dark ? 0.16 : 0.1})`;
        ctx.fillRect(left + activeCell.hour * cell, top, cell, gridH);
        ctx.fillRect(left, top + activeCell.day * cell, gridW, cell);
      }

      const list = [];
      for (let day = 0; day < 7; day += 1) {
        for (let hour = 0; hour < 24; hour += 1) {
          const v = values[day * 24 + hour] || 0;
          const wave = atClamp(elapsed / 900 - (hour / 24) * 0.3 - (day / 7) * 0.12, 0, 1);
          const grow = 1 - Math.pow(1 - wave, 3);
          const x = left + hour * cell + gap / 2;
          const y = top + day * cell + gap / 2;
          const isActive = !!(activeCell && activeCell.day === day && activeCell.hour === hour);
          const isDim = !!activeCell && !isActive;
          ctx.globalAlpha = (isDim ? 0.32 : 1) * grow;
          ctx.fillStyle = barColor(v / maxV);
          const inset = (1 - grow) * s * 0.5;
          roundRect(x + inset, y + inset, s - inset * 2, s - inset * 2, Math.min(3, s * 0.16));
          ctx.fill();
          if (isActive) {
            ctx.globalAlpha = grow;
            ctx.strokeStyle = palette.dark ? 'rgba(255,255,255,0.9)' : atShade(toneOf(), -0.15);
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
          list.push({
            day, hour, value: v,
            rect: true,
            box: { x0: x, y0: y, x1: x + s, y1: y + s },
            cx: x + s / 2, minY: y, maxY: y + s,
            top: [], fx: [], fz: [], dist: 0
          });
        }
      }
      ctx.globalAlpha = 1;
      items = list;

      ctx.fillStyle = palette.muted;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = `500 ${brief ? 9 : 9.5}px ui-monospace, "SF Mono", Menlo, monospace`;
      for (let d = 0; d < 7; d += 1) {
        ctx.fillText(zh ? (brief ? AT_DAYS_ZH[d] : AT_DAYS[d][0]) : AT_DAYS[d][1], left - 8, top + d * cell + cell / 2);
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = `500 ${brief ? 8.5 : 9.5}px ui-monospace, "SF Mono", Menlo, monospace`;
      for (let h = 0; h < 24; h += 3) {
        const label = brief ? String(h).padStart(2, '0') : `${String(h).padStart(2, '0')}:00`;
        ctx.fillText(label, left + h * cell + cell / 2, top + gridH + 8);
      }

      if (movedShown) {
        movedShown = false;
        setMoved(false);
      }
    };

    const draw = (now) => {
      if (!W || !H) return;
      if (view === 'top') { drawTop(now); return; }
      /* the camera can move between layout passes (view switch, fly-in),
         so refit the framing whenever the angles drift */
      if (Math.abs(cam.yaw - layoutYaw) > 1e-4 || Math.abs(cam.pitch - layoutPitch) > 1e-4) layout();
      ctx.clearRect(0, 0, W, H);
      const activeCell = hoverRef.current || focusRef.current;
      const elapsed = reduce ? 1e9 : now - rise;
      const base = defaults();

      const F = [
        project(-12.2, 0, -3.55), project(12.2, 0, -3.55),
        project(12.2, 0, 3.55), project(-12.2, 0, 3.55)
      ];
      ctx.beginPath();
      F.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fillStyle = atMix(palette.surface, palette.floor, 0.88);
      ctx.fill();
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let h = 0; h <= 24; h += 1) {
        const a = project(h - 11.5, 0, -3.55);
        const b = project(h - 11.5, 0, 3.55);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      for (let d = 0; d <= 7; d += 1) {
        const a = project(-12.2, 0, d - 3.55);
        const b = project(12.2, 0, d - 3.55);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      if (activeCell) {
        const rgb = atHex(toneOf()).join(',');
        ctx.fillStyle = `rgba(${rgb},${palette.dark ? 0.18 : 0.11})`;
        quad(
          project(activeCell.hour - 11.96, 0.01, -3.55),
          project(activeCell.hour - 11.04, 0.01, -3.55),
          project(activeCell.hour - 11.04, 0.01, 3.55),
          project(activeCell.hour - 11.96, 0.01, 3.55)
        );
        quad(
          project(-12.2, 0.01, activeCell.day - 3.46),
          project(12.2, 0.01, activeCell.day - 3.46),
          project(12.2, 0.01, activeCell.day - 2.54),
          project(-12.2, 0.01, activeCell.day - 2.54)
        );
      }

      const list = [];
      for (let day = 0; day < 7; day += 1) {
        for (let hour = 0; hour < 24; hour += 1) {
          const idx = day * 24 + hour;
          const v = values[idx] || 0;
          const x = hour - 11.5;
          const z = day - 3;
          const wave = atClamp(elapsed / 1000 - (hour / 24) * 0.36 - (day / 7) * 0.14, 0, 1);
          const grow = 1 - Math.pow(1 - wave, 3);
          const isActive = !!(activeCell && activeCell.day === day && activeCell.hour === hour);
          const isDim = !!activeCell && !isActive;
          let ht = (0.06 + Math.pow(v / maxV, 0.72) * 4.9) * grow;
          ht *= 1 - cam.flat * 0.93;
          if (isActive) ht += 0.55 * (1 - cam.flat * 0.6);
          const hw = 0.42;
          const y0 = 0;
          const y1 = Math.max(ht, 0.06);
          const top = [
            project(x - hw, y1, z - hw), project(x + hw, y1, z - hw),
            project(x + hw, y1, z + hw), project(x - hw, y1, z + hw)
          ];
          const fz = [
            project(x - hw, y0, z + hw), project(x + hw, y0, z + hw),
            project(x + hw, y1, z + hw), project(x - hw, y1, z + hw)
          ];
          const fx = [
            project(x + hw, y0, z - hw), project(x + hw, y0, z + hw),
            project(x + hw, y1, z + hw), project(x + hw, y1, z - hw)
          ];
          const box = boxOf([top, fx, fz]);
          const topYs = top.map((p) => p.y);
          list.push({
            idx, day, hour, value: v, top, fx, fz, box, isActive, isDim,
            dist: project(x, 0, z).d,
            color: barColor(v / maxV),
            cx: (top[0].x + top[2].x) / 2,
            minY: Math.min(...topYs),
            maxY: box.y1
          });
        }
      }
      list.sort((a, b) => b.dist - a.dist);
      items = list;

      for (let i = 0; i < list.length; i += 1) {
        const it = list[i];
        ctx.globalAlpha = it.isDim ? 0.3 : 1;
        if (cam.flat < 0.97) {
          face(it.fx, atShade(it.color, -0.3), null);
          face(it.fz, atShade(it.color, -0.16), null);
        }
        face(it.top, it.color, atShade(it.color, -0.1));
        if (it.isActive) {
          ctx.beginPath();
          it.top.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
          ctx.closePath();
          ctx.strokeStyle = palette.dark ? 'rgba(255,255,255,0.9)' : atShade(toneOf(), -0.15);
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = palette.muted;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const brief = W < 460;
      ctx.font = `500 ${brief ? 9 : 9.5}px ui-monospace, "SF Mono", Menlo, monospace`;
      const dayStep = view === 'top' ? 1 : 3;
      for (let d = 0; d < 7; d += dayStep) {
        const p = project(view === 'top' ? -13 : -14.6, 0, d - 3);
        ctx.fillText(zh ? (brief ? AT_DAYS_ZH[d] : AT_DAYS[d][0]) : AT_DAYS[d][1], p.x, p.y);
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = `500 ${brief ? 8.5 : 9.5}px ui-monospace, "SF Mono", Menlo, monospace`;
      for (let h = 0; h < 24; h += 3) {
        const p = project(h - 11.5, 0, 4.8);
        const label = brief ? String(h).padStart(2, '0') : `${String(h).padStart(2, '0')}:00`;
        ctx.fillText(label, p.x, p.y);
      }

      const isDefault = Math.abs(cam.yaw - base.yaw) < 0.015
        && Math.abs(cam.pitch - base.pitch) < 0.015
        && Math.abs(cam.zoom - 1) < 0.02
        && Math.abs(cam.tx) < 0.05
        && Math.abs(cam.tz) < 0.05;
      const show = !isDefault;
      if (show !== movedShown) {
        movedShown = show;
        setMoved(show);
      }
    };

    const frame = (now) => {
      raf = 0;
      if (tween) {
        const k = atClamp((now - tween.start) / tween.dur, 0, 1);
        const e = atEase(k);
        ['yaw', 'pitch', 'zoom', 'tx', 'tz', 'flat'].forEach((key) => {
          if (tween.to[key] !== undefined) cam[key] = tween.from[key] + (tween.to[key] - tween.from[key]) * e;
        });
        if (k >= 1) tween = null;
      } else if (gliding) {
        cam.yaw += vel.yaw;
        cam.pitch = atClamp(cam.pitch + vel.pitch, 0.1, 1.56);
        vel.yaw *= 0.9;
        vel.pitch *= 0.9;
        if (Math.abs(vel.yaw) < 0.0005 && Math.abs(vel.pitch) < 0.0005) {
          gliding = false;
          const p = atClamp(cam.pitch, 0.18, 1.466);
          if (p !== cam.pitch) tweenTo({ pitch: p }, 360);
        }
      }
      draw(now);
      const busy = tween || gliding
        || (!reduce && now - rise < 1500)
        || Math.abs(vel.yaw) > 0.0005 || Math.abs(vel.pitch) > 0.0005;
      if (busy) kick();
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const resize = () => {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      W = r.width;
      H = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!cam.touched && view !== 'top') {
        const b = defaults();
        cam.yaw = b.yaw;
        cam.pitch = b.pitch;
      }
      layout();
      kick();
    };

    const onDown = (e) => {
      cv.focus({ preventScroll: true });
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, zoom: cam.zoom };
        drag = null;
        return;
      }
      if (pointers.size > 2) return;
      drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false };
      tween = null;
      gliding = false;
      vel = { yaw: 0, pitch: 0 };
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    };

    const onMove = (e) => {
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && pointers.size >= 2) {
        if (view !== 'terrain') return;
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        cam.zoom = atClamp(pinch.zoom * (d / pinch.d), 0.7, 2.8);
        cam.touched = true;
        setHoverCell(null);
        kick();
        return;
      }
      if (drag) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 4) drag.moved = true;
        if (view === 'terrain') {
          cam.yaw += dx * 0.0075;
          cam.pitch = atClamp(cam.pitch + dy * 0.0058, 0.12, 1.55);
          vel.yaw = dx * 0.0075;
          vel.pitch = dy * 0.0058;
          cam.touched = true;
          cam.flat = 0;
        }
        setHoverCell(null);
        kick();
        return;
      }
      const p = pointOf(e);
      const it = pick(p.x, p.y);
      if (it) setHoverCell({ day: it.day, hour: it.hour }, it);
      else setHoverCell(null);
    };

    const onUp = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      const wasDrag = drag && drag.moved;
      drag = null;
      if (!wasDrag) {
        const p = pointOf(e);
        const it = pick(p.x, p.y);
        if (it) {
          focusCell({ day: it.day, hour: it.hour });
        } else if (focusRef.current) {
          showWeek();
        }
        return;
      }
      if (view === 'terrain') gliding = true;
      kick();
    };

    const onLeave = () => {
      if (!drag) setHoverCell(null);
    };

    const onWheel = (e) => {
      if (view !== 'terrain') return;
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      cam.zoom = atClamp(cam.zoom * Math.exp(-e.deltaY * 0.0022), 0.7, 2.8);
      cam.touched = true;
      kick();
    };

    const moveFocus = (day, hour) => {
      const cell = { day: (day + 7) % 7, hour: (hour + 24) % 24 };
      const it = items.find((x) => x.day === cell.day && x.hour === cell.hour);
      hoverRef.current = cell;
      setHover(cell);
      setCard(it ? placeCard(it) : null);
      kick();
    };

    const onKey = (e) => {
      const cur = hoverRef.current || focusRef.current || { day: 0, hour: 0 };
      if (e.key === 'ArrowRight') { e.preventDefault(); moveFocus(cur.day, cur.hour + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); moveFocus(cur.day, cur.hour - 1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(cur.day + 1, cur.hour); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(cur.day - 1, cur.hour); }
      else if (e.key === 'Escape') {
        hoverRef.current = null;
        setHover(null);
        setCard(null);
        showWeek();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (hoverRef.current) focusCell(hoverRef.current);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv.parentElement);
    const refreshPalette = () => {
      palette = atPalette(cv);
      colorCache = new Map();
      kick();
    };
    const mo = new MutationObserver(refreshPalette);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    cv.addEventListener('pointerdown', onDown);
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerup', onUp);
    cv.addEventListener('pointercancel', onUp);
    cv.addEventListener('pointerleave', onLeave);
    cv.addEventListener('wheel', onWheel, { passive: false });
    cv.addEventListener('keydown', onKey);

    engineRef.current = { reset: showWeek, focus: focusCell };

    refreshPalette();
    resize();
    if (view === 'top') cam.flat = 0;
    else if (cam.flat > 0.5) {
      const d = defaults();
      tweenTo({ yaw: d.yaw, pitch: d.pitch, flat: 0 }, 620);
    } else tweenTo({ flat: 0 }, 10);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointercancel', onUp);
      cv.removeEventListener('pointerleave', onLeave);
      cv.removeEventListener('wheel', onWheel);
      cv.removeEventListener('keydown', onKey);
      engineRef.current = null;
    };
  }, [metric, view, lang, reduce, compact]);

  const toneVar = metric.tone === 'danger' ? 'var(--danger)' : metric.tone === 'neutral' ? 'var(--ink-3)' : 'var(--accent)';
  const unit = zh ? metric.unit.zh : metric.unit.en;
  const dayName = (d) => (zh ? AT_DAYS[d][0] : AT_DAYS[d][1]);
  const cell = active;
  const cellValue = cell ? metric.values[cell.day * 24 + cell.hour] : 0;
  const cellPrev = cell && metric.previousValues ? metric.previousValues[cell.day * 24 + cell.hour] : null;
  const dayValues = cell ? metric.values.slice(cell.day * 24, cell.day * 24 + 24) : [];
  const dayTotal = dayValues.reduce((a, v) => a + v, 0);
  const dayMax = Math.max(1, ...dayValues);
  const cellShare = dayTotal ? cellValue / dayTotal : 0;
  const cellChange = cellPrev ? ((cellValue - cellPrev) / cellPrev) * 100 : null;
  const cellGood = cellChange != null && (metric.higherIsBetter ? cellChange >= 0 : cellChange < 0);
  const peakLabel = (p) => `${dayName(p.day)} ${String(p.hour).padStart(2, '0')}:00`;

  return (
    <figure
      ref={wrapRef}
      className={`at ${compact ? 'is-compact' : ''} ${className}`}
      style={{ '--at-tone': toneVar }}
    >
      {!compact && (
        <figcaption className="at-head">
          <h3 className="at-title">{title !== undefined ? title : (zh ? '一周的节奏' : 'Weekly rhythm')}</h3>
          <p className="at-sub">
            {subtitle !== undefined
              ? subtitle
              : (zh
                ? `这一周每小时的学习活动，${range}。`
                : `Hourly reviews, drills and mistakes for ${range}.`)}
          </p>
        </figcaption>
      )}

      <div className="at-tools">
        <div className="at-switch" role="tablist" aria-label={zh ? '指标' : 'Metric'}>
          {metrics.map((m) => (
            <button
              key={m.key}
              type="button"
              role="tab"
              aria-selected={m.key === metric.key}
              className={m.key === metric.key ? 'on' : ''}
              onClick={() => setMetricKey(m.key)}
            >
              {zh ? m.label.zh : m.label.en}
            </button>
          ))}
        </div>
        <div className="at-switch at-views" role="tablist" aria-label={zh ? '视角' : 'View'}>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'terrain'}
            className={view === 'terrain' ? 'on' : ''}
            onClick={() => setView('terrain')}
          >
            {zh ? '地形' : 'Terrain'}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'top'}
            className={view === 'top' ? 'on' : ''}
            onClick={() => setView('top')}
          >
            {zh ? '热力图' : 'Heat map'}
          </button>
        </div>
      </div>

      <div className="at-body">
        <div className="at-plot" style={{ height: plotH }}>
          <canvas
            ref={canvasRef}
            className="at-canvas"
            tabIndex={0}
            role="img"
            aria-label={view === 'top'
              ? (zh
                ? `七天二十四小时的${metric.label.zh}热力图，本周共 ${summary.total} ${unit}`
                : `A seven by twenty-four hour heat map of ${metric.label.en.toLowerCase()}, ${summary.total} this week`)
              : (zh
                ? `七天二十四小时的${metric.label.zh}地形，本周共 ${summary.total} ${unit}`
                : `A seven by twenty-four hour terrain of ${metric.label.en.toLowerCase()}, ${summary.total} this week`)}
          />

          {moved && (
            <button type="button" className="at-reset" onClick={() => engineRef.current && engineRef.current.reset()}>
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M13 8a5 5 0 1 1-1.7-3.8" strokeLinecap="round" />
                <path d="M13 2.6V5h-2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {zh ? '复位视角' : 'Reset view'}
            </button>
          )}

          {cell && card && (
            <div
              className={`at-card${card.below ? ' is-below' : ''}`}
              style={{ left: card.left, top: card.top }}
              aria-hidden="true"
            >
              <div className="at-card-head">
                <span>{dayName(cell.day)}</span>
                <b>{String(cell.hour).padStart(2, '0')}:00</b>
              </div>
              <div className="at-card-val">
                {nf.format(cellValue)}
                <em>{unit}</em>
              </div>
              <div className="at-card-rows">
                <span>
                  {zh ? '上周' : 'Last week'}
                  <b>{cellPrev == null ? '—' : nf.format(cellPrev)}</b>
                </span>
                <span>
                  {zh ? '变化' : 'Change'}
                  <b className={cellGood ? 'up' : 'down'}>
                    {cellChange == null ? '—' : `${cellChange >= 0 ? '+' : ''}${cellChange.toFixed(1)}%`}
                  </b>
                </span>
                <span>
                  {zh ? '占当天' : 'Of the day'}
                  <b>{(cellShare * 100).toFixed(0)}%</b>
                </span>
              </div>
              <div className="at-mini">
                {dayValues.map((v, i) => (
                  <i
                    key={i}
                    className={i === cell.hour ? 'on' : ''}
                    style={{ height: `${Math.max(8, (v / dayMax) * 100)}%` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {!compact && (
          <div className="at-summary">
            <div className="at-sum">
              <span className="at-k">{zh ? `本周${metric.label.zh}` : `${metric.label.en} this week`}</span>
              <b className="at-total">{nf.format(summary.total)}</b>
              <span className={`at-delta ${summary.change != null && (metric.higherIsBetter ? summary.change >= 0 : summary.change < 0) ? 'up' : 'down'}`}>
                {summary.change == null ? '' : `${summary.change >= 0 ? '↗' : '↘'} ${summary.change >= 0 ? '+' : ''}${summary.change.toFixed(1)}%`}
                <em>{zh ? '较上周' : 'from last week'}</em>
              </span>
            </div>
            <div className="at-sum">
              <span className="at-k">{zh ? '高峰时段' : 'Peak hours'}</span>
              <ul className="at-peaks">
                {summary.peak.map((p) => (
                  <li key={`${p.day}-${p.hour}`}>
                    <button type="button" onClick={() => engineRef.current && engineRef.current.focus(p)}>
                      <span>{peakLabel(p)}</span>
                      <b>{nf.format(p.value)}</b>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="at-sum">
              <span className="at-k">{zh ? '最忙的一天' : 'Busiest day'}</span>
              <b className="at-day">{dayName(summary.busiest)}</b>
              <span className="at-note">
                {nf.format(summary.dayTotals[summary.busiest])} {unit}
                {zh ? '，' : ', '}
                {(summary.share * 100).toFixed(1)}%
                {zh ? ' 在工作时段' : ' during working hours'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="at-foot">
        <div className="at-legend" aria-hidden="true">
          <span>{zh ? '少' : 'Less'}</span>
          {[10, 30, 52, 76, 100].map((t) => (
            <i key={t} style={{ background: `color-mix(in srgb, var(--at-tone) ${t}%, var(--paper-3))` }} />
          ))}
          <span>{zh ? '多' : 'More'}</span>
        </div>
        <p className="at-hint">
          {zh ? '拖拽旋转，捏合缩放，点击柱子细看。' : 'Drag to turn, pinch to zoom, click a bar to look closer.'}
        </p>
      </div>
    </figure>
  );
}

/** Page-level empty state: two nodes and a hairline, then a way out. */
export function EmptyState({ title, text, btn, onGo }) {
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

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

import React, { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../App';
import { dueLabel, nextReview, readAll } from '../progress';
import { MODES } from '../data';
import {
  ActivityTerrain, Counter, EASE, ElasticSlider, HoldToConfirm, Magnetic, Marquee, MorphText, Reveal,
  Ring, RollingNumber, Rule, SplitChars, SplitLine, SPRING, Stagger, staggerItem, TERRAIN_SUMMARY,
  ThemeIcon, Tilt
} from '../ui';

const MODE_KEYS = ['mastery', 'applied', 'literacy'];

export default function Home() {
  const { t, lang, navigate, href, catalog } = useApp();
  const subjects = catalog.subjects;
  const defaultSubject = subjects.find((s) => s.slug === 'dl') || subjects[0];
  const firstLesson = defaultSubject?.unitList
    ?.flatMap((u) => u.lessons)
    .find((l) => l.modes?.mastery);
  const readPath = firstLesson?.path || '/map';
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const specimenY = useTransform(scrollYProgress, [0, 1], [0, 46]);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-ghost" style={{ x: ghostX, y: ghostY }} aria-hidden="true">
          OPUSCULE
        </motion.div>
        <div className="hero-rule" aria-hidden="true" />
        <motion.div className="hero-folio" aria-hidden="true"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        >
          <span className="hf-num">001</span>
          <i className="hf-line" />
          <span className="hf-word">OPUSCULE</span>
        </motion.div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <motion.div
              className="kick"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            >
              {t('home.kick')}
            </motion.div>

            <h1 className="hero-title">
              <span className="hero-line"><SplitChars text={t('home.title1')} delay={0.18} /></span>
              <span className="hero-line"><em><SplitChars text={t('home.title2')} delay={0.3} /></em></span>
            </h1>

            <motion.p
              className="lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
            >
              {t('home.lede')}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.52 }}
            >
              <Magnetic strength={9}>
                <a href={href(readPath)} className="btn btn-primary btn-arrow" data-cursor="read">
                  <span>{t('home.start')}</span>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M1 5h13M10 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
              <a href={href('/catalog')} className="btn btn-ghost btn-arrow">
                <span>{t('home.browse')}</span>
                <span className="arrow-line" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              className="hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
            >
              <span><RollingNumber value={3} pad={2} /> {lang === 'zh' ? '种讲法' : 'modes'}</span>
              <span className="dot" aria-hidden="true" />
              <span><RollingNumber value={subjects.length} pad={2} /> {lang === 'zh' ? '门学科' : 'subjects'}</span>
              <span className="dot" aria-hidden="true" />
              <span><RollingNumber value={0} pad={2} /> {lang === 'zh' ? '门禁' : 'gates'}</span>
            </motion.div>
          </div>

          <motion.div className="hero-side" style={{ y: specimenY }}>
            <Specimen />
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          aria-hidden="true"
        >
          <span>{lang === 'zh' ? '向下' : 'Scroll'}</span>
          <i />
        </motion.div>
      </section>

      <Marquee
        items={lang === 'zh'
          ? ['梯度下降', '链式法则', '矩阵乘法', '反向传播', '注意力', '特征值', '极限', '依赖图']
          : ['Gradient descent', 'Chain rule', 'Matrix multiplication', 'Backpropagation', 'Attention', 'Eigenvalues', 'Limits', 'Dependency graph']}
        speed={52}
      />

      <ContinueCard />

      <section className="section">
        <div className="wrap">
          <SectionHead
            kick={t('home.tracks.kick')}
            title={t('home.tracks.title')}
            note={t('home.tracks.note')}
            index="01"
          />
          <Stagger className="tracks" gap={0.1}>
            {MODE_KEYS.map((key) => {
              const m = MODES[key];
              return (
                <motion.div variants={staggerItem} key={key}>
                  <Tilt max={4}>
                    <button
                      className="track"
                      onClick={() => navigate(`/path/${defaultSubject?.slug || 'dl'}/${key}`)}
                      data-cursor="open"
                    >
                      <div className="track-head">
                        <span className="track-num">{m.num}</span>
                        <span className="track-ghost" aria-hidden="true">{m.num}</span>
                      </div>
                      <h3 className="track-title">{lang === 'zh' ? m.zh : m.en}</h3>
                      <div className="track-en">{lang === 'zh' ? m.en : m.zh}</div>
                      <p className="track-desc">{lang === 'zh' ? m.desc : m.descEn}</p>
                      <ul className="track-points">
                        {(lang === 'zh' ? m.points : m.pointsEn).map((p) => <li key={p}>{p}</li>)}
                      </ul>
                      <span className="track-link">
                        {lang === 'zh' ? '看这条路线' : 'See this route'}
                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                          <path d="M0 4h16M12.5 1 16 4l-3.5 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </Tilt>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section section-subjects">
        <div className="wrap">
          <SectionHead
            kick={t('home.subjects.kick')}
            title={t('home.subjects.title')}
            note={t('home.subjects.note')}
            index="02"
          />
          <div className="subjects">
            {subjects.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04} y={14}>
                <a
                  className="subject-row"
                  href={href(`/path/${s.slug}/${s.modes[0] || 'mastery'}`)}
                  data-cursor="open"
                >
                  <span className="s-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="s-name">
                    {lang === 'zh' ? s.zh : s.en}
                    <small>{lang === 'zh' ? s.en : s.zh}</small>
                  </span>
                  <span className="s-desc">{lang === 'zh' ? s.desc : s.descEn}</span>
                  <span className="s-modes">
                    {s.modes.map((m) => (
                      <i key={m} title={MODES[m]?.[lang === 'zh' ? 'zh' : 'en']} />
                    ))}
                    <em>{s.modes.length} {lang === 'zh' ? '轨' : 'tracks'}</em>
                  </span>
                  <span className="s-nums">
                    <b>{s.concepts}</b> {lang === 'zh' ? '概念' : 'concepts'}
                    <i aria-hidden="true" />
                    <b>{s.lessons}</b> {lang === 'zh' ? '讲' : 'lectures'}
                  </span>
                  <span className="s-go" aria-hidden="true">
                    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M0 5h19M15.5 1.5 19 5l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="subjects-more">
            <a href={href('/catalog')} className="btn btn-ghost btn-arrow">
              <span>
                {lang === 'zh'
                  ? `浏览全部 ${subjects.length} 门科目`
                  : `Browse all ${subjects.length} subjects`}
              </span>
              <span className="arrow-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section section-study">
        <div className="wrap">
          <SectionHead
            kick={t('home.study.kick')}
            title={t('home.study.title')}
            note={t('home.study.note')}
            index="03"
          />
          <StudyBoard />
        </div>
      </section>

      <section className="closing">
        <div className="wrap closing-in">
          <Reveal className="closing-kick">{lang === 'zh' ? '没有门禁，也没有正确的入口' : 'No gates. No single correct entrance.'}</Reveal>
          <Reveal delay={0.08}>
            <a href={href('/map')} className="closing-link" data-cursor="open">
              <span>{lang === 'zh' ? '从任意一页开始' : 'Start from any page'}</span>
              <span className="closing-arrow" aria-hidden="true">↗</span>
            </a>
          </Reveal>
          <Reveal delay={0.16} className="closing-note">
            {lang === 'zh'
              ? '依赖图告诉你接下来可以往哪走，但不替你决定。'
              : 'The graph tells you where you could go next. It does not decide for you.'}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- pieces */

function SectionHead({ kick, title, note, index }) {
  return (
    <div className="section-head">
      <div>
        <Reveal className="section-kick" y={10}>
          <span className="section-index">{index}</span>
          {kick}
        </Reveal>
        <Rule className="section-rule" delay={0.08} />
        <Reveal delay={0.05} y={16}>
          <h2 className="section-title">{title}</h2>
        </Reveal>
      </div>
      <Reveal delay={0.12} className="section-note" y={12}>{note}</Reveal>
    </div>
  );
}

function Specimen() {
  const { lang, catalog, learning } = useApp();
  const backprop = catalog.concepts.backprop;
  const subject = catalog.subjects.find((s) => s.slug === 'dl') || catalog.subjects[0];
  const lessons = subject?.unitList?.flatMap((u) => u.lessons) || [];
  const total = lessons.length || 12;
  const done = useMemo(() => readAll(), [learning]);
  const read = lessons.filter((lesson) => done.has(lesson.slug)).length;
  const progress = total ? Math.round((read / total) * 100) : 0;
  const next = nextReview();
  const ticks = Math.round((progress / 100) * 16);
  return (
    <Tilt max={5} className="specimen-wrap">
      <div className="specimen">
        <div className="spec-top">
          <span>SPECIMEN / 012</span>
          <span className="live"><i />REC</span>
        </div>

        <div className="spec-main">
          <div className="spec-num">
            <span><RollingNumber value={total} /></span>
            <small>{lang === 'zh' ? '讲' : 'lecture'}</small>
          </div>
          <div className="spec-title">
            <b>{lang === 'zh' ? '反向传播' : 'Backpropagation'}</b>
            <span>{lang === 'zh' ? 'BACKPROPAGATION' : '反向传播'}</span>
          </div>
        </div>

        <div className="spec-rows">
          <div><span>{lang === 'zh' ? '学科' : 'Subject'}</span><b>{lang === 'zh' ? '深度学习' : 'Deep Learning'}</b></div>
          <div><span>{lang === 'zh' ? '模式' : 'Mode'}</span><b>{lang === 'zh' ? '专业' : 'Mastery'}</b></div>
          <div><span>{lang === 'zh' ? '前置' : 'Requires'}</span><b>{backprop?.pre.length ?? 0} {lang === 'zh' ? '个概念' : 'concepts'}</b></div>
        </div>

        <div className="spec-progress">
          <div className="spec-progress-head">
            <span>{lang === 'zh' ? '阅读进度' : 'Reading'}</span>
            <b>{progress}%</b>
          </div>
          <div className="spec-bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ duration: 1.3, ease: EASE, delay: 0.85 }} /></div>
          <div className="spec-ticks" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => <span key={i} className={i < ticks ? 'on' : ''} />)}
          </div>
        </div>

        <div className="spec-foot">
          <Ring value={progress} size={54} stroke={1.5} label={`${progress}`} />
          <div>
            <b>{lang === 'zh' ? '下次复习' : 'Next review'}</b>
            <span>
              {next
                ? dueLabel(next.due, lang)
                : (lang === 'zh' ? '复习页开始第一张卡' : 'Start your first card')}
            </span>
          </div>
          <span className="spec-mark" aria-hidden="true">◈</span>
        </div>

        <span className="spec-watermark" aria-hidden="true">12</span>
        <span className="spec-scan" aria-hidden="true" />
      </div>
    </Tilt>
  );
}

function ContinueCard() {
  const { t, lang, navigate, catalog, learning } = useApp();
  const subject = catalog.subjects.find((s) => s.slug === 'dl') || catalog.subjects[0];
  const lessons = subject?.unitList?.flatMap((u) => u.lessons) || [];
  const done = useMemo(() => readAll(), [learning]);
  const read = lessons.filter((row) => done.has(row.slug)).length;
  const progress = lessons.length ? Math.round((read / lessons.length) * 100) : 0;
  const lesson = lessons.find((row) => !done.has(row.slug)) || lessons[lessons.length - 1];
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <section className="wrap continue-wrap">
      <Reveal y={18}>
        <div className="continue" ref={ref} onPointerMove={onMove}>
          <div className="continue-art" aria-hidden="true">
            <span className="ca-line" />
            <span className="ca-dot" />
            <span className="ca-label">CURRENT</span>
          </div>
          <div className="continue-copy">
            <div className="continue-kick">{t('home.cont.kick')}</div>
            <h2 className="continue-title">
              {lesson
                ? (lang === 'zh'
                  ? `第 ${lesson.ordinal} 讲 · ${lesson.zh}`
                  : `Lecture ${lesson.ordinal} · ${lesson.en}`)
                : t('home.cont.title')}
            </h2>
            <p className="continue-sub">
              {lang === 'zh'
                ? `${subject?.zh || ''} · ${read} / ${lessons.length} 讲已读`
                : `${subject?.en || ''} · ${read} / ${lessons.length} lectures read`}
            </p>
          </div>
          <div className="continue-right">
            <Ring value={progress} size={58} stroke={1.5} label={`${progress}`} />
            <Magnetic strength={6}>
              <button
                className="btn btn-primary btn-arrow"
                onClick={() => navigate(lesson?.path || '/map')}
              >
                {t('home.cont.btn')}
                <svg width="15" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M1 5h13M10 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------- interaction index */

function StudyHead({ tag, index }) {
  return (
    <div className="study-top">
      <span className="study-tag">{tag}</span>
      <span className="study-idx">{index}</span>
    </div>
  );
}

function StudyBoard() {
  const { lang, theme, toggleTheme } = useApp();
  const zh = lang === 'zh';
  const [quota, setQuota] = useState(6);
  const [score, setScore] = useState(38);
  const [held, setHeld] = useState(0);

  return (
    <div className="study-grid">
      <Reveal className="study-card">
        <StudyHead tag="HOLD" index="01" />
        <h3 className="study-title">{zh ? '按住，才作数' : 'Hold, then it counts'}</h3>
        <p className="study-desc">
          {zh
            ? '松手会倒带。确认动作不该被误触完成。'
            : 'Release early and it rewinds. A confirmation should never happen by accident.'}
        </p>
        <HoldToConfirm
          className="study-hold"
          label={zh ? '按住标记已读' : 'Hold to mark read'}
          holdingLabel={zh ? '继续按住…' : 'Keep holding…'}
          doneLabel={zh ? '已标记' : 'Marked read'}
          onConfirm={() => setHeld((v) => v + 1)}
          duration={1100}
        />
        <div className="study-foot">
          <span>{zh ? '已确认' : 'Confirmed'} <b>{held}</b> {zh ? '次' : 'times'}</span>
          <span className="study-hint">1.1s</span>
        </div>
      </Reveal>

      <Reveal className="study-card" delay={0.06}>
        <StudyHead tag="SLIDE" index="02" />
        <h3 className="study-title">{zh ? '拖到一个具体数字' : 'Drag to a specific number'}</h3>
        <p className="study-desc">
          {zh
            ? '滑块会横向拉伸，标签跟着倾斜，松手吸附到最近的档位。'
            : 'The rail stretches, the tag tilts with the drag, and release settles on the nearest detent.'}
        </p>
        <ElasticSlider
          label={zh ? '每日新卡' : 'New cards / day'}
          value={quota}
          onChange={setQuota}
          min={1}
          max={12}
          step={1}
          marks={[1, 4, 8, 12]}
          unit={zh ? ' 张' : ' cards'}
        />
        <div className="study-foot">
          <span>{zh ? '一周约' : 'About'} <b>{quota * 7}</b> {zh ? '张' : 'cards a week'}</span>
          <span className="study-hint">1–12</span>
        </div>
      </Reveal>

      <Reveal className="study-card" delay={0.12}>
        <StudyHead tag="ROLL" index="03" />
        <h3 className="study-title">{zh ? '只让变的数字动' : 'Only the changed digits move'}</h3>
        <p className="study-desc">
          {zh
            ? '调整数值，十位与个位各自滚动，不重排整块版面。'
            : 'Change the value: each digit rolls on its own instead of re-laying-out the number.'}
        </p>
        <div className="study-count">
          <span className="study-big"><RollingNumber value={score} /><i>%</i></span>
          <div className="study-stepper">
            <button type="button" onClick={() => setScore((s) => Math.max(0, s - 1))} aria-label="minus">−</button>
            <button type="button" onClick={() => setScore((s) => Math.min(100, s + 1))} aria-label="plus">+</button>
          </div>
        </div>
        <div className="study-meter" aria-hidden="true">
          <motion.i animate={{ width: `${score}%` }} transition={SPRING.smooth} />
        </div>
        <div className="study-foot">
          <span>{zh ? '掌握度' : 'Mastery'}</span>
          <span className="study-hint">0–100</span>
        </div>
      </Reveal>

      <Reveal className="study-card" delay={0.18}>
        <StudyHead tag="TURN" index="04" />
        <h3 className="study-title">{zh ? '两个图标，一个方向' : 'Two icons, one direction'}</h3>
        <p className="study-desc">
          {zh
            ? '日月沿同一方向旋转替换，切换后图标偏移一像素，像被留在暗处。'
            : 'Sun and moon turn the same way. After switching, the icon rests one hair off-centre, as if left in the dark.'}
        </p>
        <button type="button" className="study-theme" onClick={toggleTheme}>
          <ThemeIcon dark={theme === 'dark'} />
          <MorphText text={theme === 'dark' ? (zh ? '深色' : 'Dark') : (zh ? '浅色' : 'Light')} />
          <span className="study-theme-hint">{zh ? '点击切换' : 'Click to switch'}</span>
        </button>
        <div className="study-foot">
          <span>{zh ? '当前主题' : 'Current theme'}</span>
          <span className="study-hint">{theme}</span>
        </div>
      </Reveal>

      <Reveal className="study-card is-wide" delay={0.24}>
        <div className="study-wide-copy">
          <StudyHead tag="TERRAIN" index="05" />
          <h3 className="study-title">{zh ? '一周的节奏' : 'A weekly rhythm'}</h3>
          <p className="study-desc">
            {zh
              ? '七天二十四小时，每小时一次复习。柱子越深越高，那天那个时段就读得越多。拖动转一转，悬停一根柱子读出数字。'
              : 'Seven days by twenty-four hours, one bar per hour. Drag to turn it, hover a bar to read its numbers.'}
          </p>
          <div className="terrain-stats">
            <div className="terrain-stat">
              <b><RollingNumber value={TERRAIN_SUMMARY.total} pad={2} /></b>
              <span>{zh ? '本周复习' : 'Reviews'}</span>
            </div>
            <div className="terrain-stat">
              <b><RollingNumber value={TERRAIN_SUMMARY.peak[0].value} pad={2} /></b>
              <span>{zh ? '峰值时段' : 'Peak hour'}</span>
            </div>
            <div className="terrain-stat">
              <b><RollingNumber value={7} pad={2} /></b>
              <span>{zh ? '天窗口' : 'Days'}</span>
            </div>
          </div>
          <div className="study-foot">
            <span>{zh ? '记录只留在这台设备上' : 'Records stay on this device'}</span>
            <span className="study-hint">local</span>
          </div>
        </div>
        <div className="study-wall">
          <ActivityTerrain lang={lang} />
        </div>
      </Reveal>
    </div>
  );
}

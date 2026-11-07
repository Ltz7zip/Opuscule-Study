import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../App';
import { dueLabel, gradeConcept, readAll } from '../progress';
import {
  ActivityTerrain, EASE, EASE_IN_OUT, ElasticSlider, Reveal, Ring, RollingNumber, SplitLine,
  SPRING, useScrollLock
} from '../ui';

const RATES = [
  { key: 1, zh: '忘了', en: 'Forgot', next: '明天', nextEn: 'Tomorrow', tone: 'low' },
  { key: 2, zh: '模糊', en: 'Shaky', next: '3 天后', nextEn: 'In 3 days', tone: 'mid' },
  { key: 3, zh: '记得', en: 'Got it', next: '7 天后', nextEn: 'In 7 days', tone: 'high' }
];

const TONE = (v) => (v >= 75 ? 'high' : v >= 45 ? 'mid' : 'low');

function nextText(rate, card, lang) {
  const days = card?.previews?.[rate.key];
  if (!days) return lang === 'zh' ? rate.next : rate.nextEn;
  return lang === 'zh' ? `${days} 天后` : `In ${days} day${days === 1 ? '' : 's'}`;
}
const BLANK_CARD = { state: 'new', due: null, mastery: 0, due_now: true, previews: null };

function buildRows(ids, cards, readLessons, lang) {
  const rows = ids.map((id, i) => {
    const card = cards[id] || BLANK_CARD;
    const due = card.due || null;
    return {
      id,
      n: i,
      previews: card.previews || null,
      state: card.state || 'new',
      mastery: card.mastery || 0,
      due,
      dueText: due
        ? new Date(due).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })
        : (lang === 'zh' ? '今天' : 'Today'),
      when: card.due_now ? (lang === 'zh' ? '到期' : 'Due') : dueLabel(due, lang),
      overdue: !!card.due_now,
      read: !!readLessons[id]
    };
  });
  return rows.sort((a, b) => {
    if (a.overdue !== b.overdue) return a.overdue ? -1 : 1;
    if (a.due && b.due) return new Date(a.due) - new Date(b.due);
    if (a.due !== b.due) return a.due ? 1 : -1;
    return a.id.localeCompare(b.id);
  });
}

function readLessons(catalog, done) {
  const map = {};
  catalog.subjects.forEach((subject) => {
    subject.unitList?.forEach((unit) => {
      unit.lessons?.forEach((lesson) => {
        lesson.concepts?.forEach((id) => {
          if (done.has(lesson.slug)) map[id] = true;
        });
      });
    });
  });
  return map;
}

export default function Review() {
  const { lang, t, showToast, catalog, learning, setAccountOpen } = useApp();
  const [session, setSession] = useState(null);
  const [size, setSize] = useState(5);

  const rows = useMemo(() => {
    if (catalog.status !== 'ready') return [];
    return buildRows(catalog.ids, learning.cards, readLessons(catalog, readAll()), lang);
  }, [catalog, lang, learning]);

  if (catalog.status !== 'ready') {
    return (
      <div className="wrap path-loading">
        <div className="loader" aria-hidden="true"><i /><i /><i /></div>
        <p>{lang === 'zh' ? '正在读取复习队列…' : 'Loading the review queue…'}</p>
      </div>
    );
  }

  const due = rows.filter((r) => r.overdue).length;
  const reviewed = rows.filter((r) => r.state !== 'new');
  const avg = reviewed.length
    ? Math.round(reviewed.reduce((sum, r) => sum + r.mastery, 0) / reviewed.length)
    : 0;
  const readCount = readAll().size;
  const upcoming = [...rows].sort((a, b) => a.mastery - b.mastery).slice(0, 4);

  return (
    <div className="review-page">
      <div className="wrap">
        <header className="page-head review-head">
          <div>
            <div className="page-kick">{t('review.kick')}</div>
            <h1 className="page-title">
              <SplitLine>{t('review.title')}</SplitLine>
            </h1>
            <p className="page-sub">{t('review.sub')}</p>
          </div>
          <div className="review-head-mark" aria-hidden="true">
            <span>SR</span>
            <i />
            <span>01</span>
          </div>
        </header>

        <section className="review-hero">
          <Reveal className="manifesto" y={18}>
            <div className="manifesto-kick">{t('review.card.title')}</div>
            <p className="manifesto-quote">{t('review.card.text')}</p>
            <div className="manifesto-line" aria-hidden="true" />
            <div className="manifesto-meta">
              <span><b>{due}</b>{lang === 'zh' ? '个概念今天到期' : 'due today'}</span>
              <span><b>{readCount}</b>{lang === 'zh' ? '讲已读' : 'lectures read'}</span>
              <span><b>{avg}%</b>{lang === 'zh' ? '平均掌握' : 'average mastery'}</span>
            </div>
          </Reveal>

          <Reveal className="today" delay={0.08} y={18}>
            <div className="today-top">
              <span className="rail-kick">{lang === 'zh' ? '今天' : 'Today'}</span>
              <span className="today-date">
                {new Date().toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
                  month: 'long', day: 'numeric', weekday: 'short'
                })}
              </span>
            </div>
            <div className="today-ring">
              <Ring value={due ? Math.min(100, (due / rows.length) * 100) : 0} size={96} stroke={1.5} label={`${due}/${rows.length}`} />
              <div>
                <b>{lang === 'zh' ? '张卡到期' : 'cards due'}</b>
                <span>{lang === 'zh' ? `大约 ${Math.max(1, Math.round(due * 0.7))} 分钟` : `about ${Math.max(1, Math.round(due * 0.7))} minutes`}</span>
              </div>
            </div>
            <button className="btn btn-primary btn-arrow today-btn" onClick={() => setSession(0)}>
              {t('review.card.btn')}
              <svg width="15" height="9" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M1 5h13M10 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="today-foot">
              <span><kbd>Space</kbd> {lang === 'zh' ? '翻面' : 'flip'}</span>
              <span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> {lang === 'zh' ? '评分' : 'rate'}</span>
            </div>
            <ElasticSlider
              className="today-slider"
              label={lang === 'zh' ? '本轮题量' : 'Session size'}
              value={size}
              onChange={setSize}
              min={2}
              max={5}
              step={1}
              marks={[2, 4, 5]}
              unit={lang === 'zh' ? ' 张' : ' cards'}
            />
          </Reveal>
        </section>

        <div className="review-grid">
          <Reveal className="review-table-card" y={18}>
            <div className="rt-head">
              <div className="rail-kick">{lang === 'zh' ? '复习队列' : 'Review queue'}</div>
              <span className="rt-count">
                {due} / {rows.length} {lang === 'zh' ? '张到期' : 'due'}
              </span>
            </div>
            <div className="review-table" role="table">
              <div className="rt-row rt-th" role="row">
                <span>{t('review.th.concept')}</span>
                <span>{t('review.th.mastery')}</span>
                <span>{t('review.th.due')}</span>
                <span>{t('review.th.when')}</span>
              </div>
              {rows.map((r, i) => {
                const c = catalog.concepts[r.id];
                return (
                  <motion.button
                    className="rt-row"
                    key={r.id}
                    role="row"
                    data-cursor="review"
                    onClick={() => setSession(i)}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                  >
                    <span className="rt-name">
                      <i className={`rt-dot ${TONE(r.mastery)}`} />
                      {lang === 'zh' ? c.zh : c.en}
                      <em>{lang === 'zh' ? c.en : c.zh}</em>
                    </span>
                    <span className="rt-mastery">
                      <span className="rt-bar">
                        <motion.i
                          className={TONE(r.mastery)}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: r.mastery / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.05 }}
                        />
                      </span>
                      <b>{r.mastery}%</b>
                    </span>
                    <span className="rt-due">{r.dueText}</span>
                    <span className={`rt-when ${r.overdue ? 'is-due' : ''}`}>
                      {r.when}
                      <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                        <path d="M1 5h12M10 1.5 13.5 5 10 8.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <div className="rt-foot">
              {lang === 'zh'
                ? '点任意一行，就从那张卡开始复习。'
                : 'Click a row to start the session from that card.'}
            </div>
          </Reveal>

          <aside className="review-side">
            <Reveal className="heat-card" delay={0.06} y={18}>
              <ActivityTerrain lang={lang} compact />
            </Reveal>

            <Reveal className="heat-card agenda" delay={0.12} y={18}>
              <div className="rail-kick">{lang === 'zh' ? '接下来' : 'Up next'}</div>
              <ul>
                {upcoming.map((r) => (
                  <li key={r.id}>
                    <span className="ag-when">{r.when}</span>
                    <b>{catalog.concepts[r.id]?.[lang === 'zh' ? 'zh' : 'en']}</b>
                  </li>
                ))}
              </ul>
              <button className="text-link" onClick={() => setAccountOpen(true)}>
                {learning.user
                  ? (lang === 'zh' ? `已同步 · ${learning.user.username}` : `Synced · ${learning.user.username}`)
                  : (lang === 'zh' ? '登录后跨设备同步' : 'Sign in to sync')}
                <span aria-hidden="true">↗</span>
              </button>
            </Reveal>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {session !== null && (
          <Session key="session" start={session} size={size} rows={rows} onClose={() => setSession(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------------------------------------- session */

function Session({ start, size, rows, onClose }) {
  const { lang, showToast, catalog } = useApp();
  const reduce = useReducedMotion();
  // 会话开始时冻结队列，评分后卡片改期也不会打乱这一轮的顺序
  const [snapshot, setSnapshot] = useState(rows);
  const deck = useMemo(
    () => [...snapshot.slice(start), ...snapshot.slice(0, start)].slice(0, size),
    [start, size, snapshot]
  );
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [scores, setScores] = useState({});
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  useScrollLock(true);

  const total = deck.length;
  const card = deck[i];
  const c = card ? catalog.concepts[card.id] : null;
  const answered = Object.keys(scores).length;
  const pct = Math.round((answered / total) * 100);

  const rate = useCallback((key) => {
    if (!card || leaving) return;
    gradeConcept(card.id, key).catch(() => {
      showToast(lang === 'zh' ? '评分没有保存，请检查网络后重试。' : 'Rating was not saved. Check your connection.');
    });
    setScores((s) => ({ ...s, [card.id]: key }));
    setLeaving(true);
    const last = i === total - 1;
    const wait = reduce ? 0 : 240;
    setTimeout(() => {
      if (last) {
        setDone(true);
        setLeaving(false);
      } else {
        setI((v) => v + 1);
        setFlip(false);
        setLeaving(false);
      }
    }, wait);
  }, [card, i, total, reduce, leaving, lang, showToast]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (done) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setFlip((f) => !f);
        return;
      }
      if (flip && ['1', '2', '3'].includes(e.key)) {
        e.preventDefault();
        rate(Number(e.key));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, flip, rate, onClose]);

  const reset = () => {
    setScores({});
    setDone(false);
    setI(0);
    setFlip(false);
    setSnapshot(rows);
  };

  const counts = RATES.map((r) => ({
    ...r,
    n: Object.values(scores).filter((v) => v === r.key).length
  }));

  if (!c) return null;

  return createPortal(
    <div className="session">
      <motion.div
        className="session-back"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="session-panel"
        role="dialog" aria-modal="true" aria-label={lang === 'zh' ? '复习会话' : 'Review session'}
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={SPRING.morph}
      >
        <div className="session-top">
          <div className="session-meta">
            <span className="rail-kick">{lang === 'zh' ? '复习会话' : 'Review session'}</span>
            <span className="session-count">
              {done ? total : i + 1} / {total}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 2l10 10M12 2 2 12" />
            </svg>
          </button>
        </div>

        <div className="session-progress" aria-hidden="true">
          <motion.i
            animate={{ scaleX: done ? 1 : answered / total }}
            initial={false}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>

        {done ? (
          <div className="session-done">
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, k) => (
                <span
                  key={k}
                  style={{
                    left: `${8 + ((k * 37) % 84)}%`,
                    '--d': `${(k % 6) * 0.09}s`,
                    '--r': `${(k * 53) % 360}deg`
                  }}
                />
              ))}
            </div>
            <div className="done-mark" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.6">
                <motion.path
                  d="M7 18.5 14 25.5 27 9.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                />
              </svg>
            </div>
            <h2>{lang === 'zh' ? '今天的复习完成了' : 'Today’s review is done'}</h2>
            <p>
              {lang === 'zh'
                ? '这不是“读完了”，是一次成功的提取。下一次到期时间已经重新排好。'
                : 'Not “finished reading” — a successful retrieval. The next due dates have been rescheduled.'}
            </p>
            <div className="done-stats">
              {counts.map((r) => (
                <div key={r.key} className={`done-stat ${r.tone}`}>
                  <b><RollingNumber value={r.n} /></b>
                  <span>{lang === 'zh' ? r.zh : r.en}</span>
                </div>
              ))}
            </div>
            <div className="done-actions">
              <button className="btn btn-primary" onClick={onClose}>{lang === 'zh' ? '结束会话' : 'Close session'}</button>
              <button className="btn btn-ghost" onClick={reset}>{lang === 'zh' ? '再来一轮' : 'Run it again'}</button>
            </div>
          </div>
        ) : (
          <>
            <div className="session-stage">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={card.id}
                  className="card-slot"
                  initial={reduce ? false : { opacity: 0, x: 54, rotate: 1.5 }}
                  animate={{ opacity: leaving ? 0.3 : 1, x: 0, rotate: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -54, rotate: -1.5 }}
                  transition={{ duration: 0.42, ease: EASE }}
                >
                  <motion.div
                    className="flip"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: flip ? 180 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.66, ease: EASE_IN_OUT }}
                    onClick={() => setFlip((f) => !f)}
                    role="button"
                    tabIndex={0}
                    data-cursor="flip"
                    aria-label={lang === 'zh' ? '翻面' : 'Flip card'}
                    onKeyDown={(e) => { if (e.key === 'Enter') setFlip((f) => !f); }}
                  >
                    <div className="flip-face front">
                      <div className="fc-kick">
                        <span className="fc-q">Q</span>
                        {lang === 'zh' ? '用自己的话解释' : 'Explain in your own words'}
                      </div>
                      <h3 className="fc-title">{lang === 'zh' ? c.zh : c.en}</h3>
                      <div className="fc-sub">{lang === 'zh' ? c.en : c.zh}</div>
                      <div className="fc-question">
                        {lang === 'zh'
                          ? '它解决什么问题？如果缺少它，会发生什么？'
                          : 'What problem does it solve? What breaks without it?'}
                      </div>
                      <div className="fc-hint">
                        <kbd>Space</kbd> {lang === 'zh' ? '翻面看定义' : 'flip for the definition'}
                      </div>
                      <span className="fc-mark" aria-hidden="true">◈</span>
                    </div>
                    <div className="flip-face back">
                      <div className="fc-kick">
                        <span className="fc-a">A</span>
                        {lang === 'zh' ? '参考定义' : 'Reference'}
                      </div>
                      <h3 className="fc-title sm">{lang === 'zh' ? c.zh : c.en}</h3>
                      <p className="fc-def">{lang === 'zh' ? c.def : c.defEn}</p>
                      <div className="fc-pre">
                        {c.pre.length > 0 ? (
                          <>
                            <span>{lang === 'zh' ? '前置' : 'Requires'}</span>
                            {c.pre.map((p) => (
                              <i key={p}>{catalog.concepts[p]?.[lang === 'zh' ? 'zh' : 'en']}</i>
                            ))}
                          </>
                        ) : (
                          <span>{lang === 'zh' ? '根概念，没有前置。' : 'A root concept.'}</span>
                        )}
                      </div>
                      <span className="fc-mark" aria-hidden="true">◈</span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={`rating ${flip ? 'is-on' : ''}`} aria-hidden={!flip}>
              <div className="rating-label">
                {lang === 'zh' ? '这次回忆有多清楚？' : 'How clearly did you recall it?'}
              </div>
              <div className="rating-btns">
                {RATES.map((r) => (
                  <motion.button
                    key={r.key}
                    className={`rate-btn ${r.tone}`}
                    onClick={() => rate(r.key)}
                    disabled={!flip}
                    whileHover={reduce || !flip ? undefined : { y: -3 }}
                    whileTap={reduce ? undefined : { scale: 0.96 }}
                    transition={SPRING.snappy}
                  >
                    <kbd>{r.key}</kbd>
                    <span>{lang === 'zh' ? r.zh : r.en}</span>
                    <i>{nextText(r, card, lang)}</i>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="session-foot">
              <span><kbd>Space</kbd> {lang === 'zh' ? '翻面' : 'flip'}</span>
              <span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> {lang === 'zh' ? '评分' : 'rate'}</span>
              <button
                className="text-link"
                onClick={() => showToast(lang === 'zh' ? '已跳过，稍后再来。' : 'Skipped. It will come back.')}
              >
                {lang === 'zh' ? '跳过这张' : 'Skip this card'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
}

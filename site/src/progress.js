import { useSyncExternalStore } from 'react';
import {
  ensureCsrf, fetchMe, fetchProgress, fetchReviewQueue, gradeReview, loginUser,
  logoutUser, mergeProgress, registerUser, saveProgress
} from './api';

const READ_KEY = 'opus.read';
const REVIEW_KEY = 'opus.review';

// 未登录时的简易间隔（天）；登录后由服务端 FSRS 重新排期
const INTERVALS = { 1: 1, 2: 3, 3: 7 };
const LOCAL_MASTERY = { 1: 32, 2: 62, 3: 86 };
const EMPTY_CARD = { state: 'new', due: null, mastery: 0, due_now: true, previews: null };

function readRaw(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeRaw(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* 隐私模式下忽略 */
  }
}

function normalizeLesson(row) {
  if (typeof row === 'string') return { lesson: row, mode: 'mastery', completed: true };
  if (!row || !row.lesson) return null;
  return { lesson: row.lesson, mode: row.mode || 'mastery', completed: row.completed !== false };
}

function localLessons() {
  const rows = readRaw(READ_KEY, []);
  return (Array.isArray(rows) ? rows : []).map(normalizeLesson).filter(Boolean);
}

function localReviews() {
  const rows = readRaw(REVIEW_KEY, {});
  return rows && typeof rows === 'object' && !Array.isArray(rows) ? rows : {};
}

function localCards() {
  const cards = {};
  Object.entries(localReviews()).forEach(([slug, rec]) => {
    const due = rec?.due || null;
    cards[slug] = {
      concept: slug,
      state: rec?.score === 1 ? 'relearning' : 'review',
      due,
      due_now: daysUntil(due) <= 0,
      mastery: LOCAL_MASTERY[rec?.score] ?? 32,
      previews: null
    };
  });
  return cards;
}

function computeStats(lessons, cards) {
  const list = Object.values(cards);
  const reviewed = list.filter((card) => card.state !== 'new');
  const current = list.filter((card) => card.state !== 'new' && card.due_now);
  const average = reviewed.length
    ? Math.round(reviewed.reduce((sum, card) => sum + card.mastery, 0) / reviewed.length)
    : 0;
  return {
    lessons_read: lessons.filter((row) => row.completed).length,
    reviewed: reviewed.length,
    due: current.length,
    avg_mastery: average
  };
}

const initialLessons = localLessons();
const initialCards = localCards();

let state = {
  status: 'idle',
  user: null,
  lessons: initialLessons,
  cards: initialCards,
  stats: computeStats(initialLessons, initialCards),
  queueAt: null,
  error: null
};

const listeners = new Set();

function emit() {
  listeners.forEach((fn) => fn());
}

function commit(patch) {
  state = { ...state, ...patch };
  emit();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLearning() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function learningState() {
  return state;
}

/* ------------------------------------------------------------------ 阅读 */

export function readSet(mode = 'mastery') {
  return new Set(
    state.lessons
      .filter((row) => row.completed && row.mode === mode)
      .map((row) => row.lesson)
  );
}

export function readAll() {
  return new Set(state.lessons.filter((row) => row.completed).map((row) => row.lesson));
}

export function markRead(lesson, mode = 'mastery', done = true) {
  const rows = localLessons().filter((row) => !(row.lesson === lesson && row.mode === mode));
  if (done) rows.push({ lesson, mode, completed: true });
  writeRaw(READ_KEY, rows);

  const lessons = state.lessons.filter((row) => !(row.lesson === lesson && row.mode === mode));
  if (done) lessons.push({ lesson, mode, completed: true });

  commit({
    lessons,
    stats: { ...state.stats, lessons_read: lessons.filter((row) => row.completed).length }
  });

  if (state.user) {
    saveProgress({ lesson, mode, completed: done })
      .then((data) => commit({ stats: data.stats }))
      .catch(() => {});
  }
}

/* ------------------------------------------------------------------ 复习 */

export function getCard(slug) {
  return state.cards[slug] || EMPTY_CARD;
}

export function nextReview() {
  const cards = Object.values(state.cards).filter((card) => card.due && card.state !== 'new');
  if (!cards.length) return null;
  return cards.reduce((soonest, card) => (new Date(card.due) < new Date(soonest.due) ? card : soonest));
}

export async function gradeConcept(slug, score) {
  const map = localReviews();
  const days = INTERVALS[score] || 1;
  const due = new Date();
  due.setDate(due.getDate() + days);
  map[slug] = { score, due: due.toISOString(), at: new Date().toISOString() };
  writeRaw(REVIEW_KEY, map);

  const localCard = {
    concept: slug,
    state: score === 1 ? 'relearning' : 'review',
    due: map[slug].due,
    due_now: false,
    mastery: LOCAL_MASTERY[score] ?? 32,
    previews: null,
    interval_days: days
  };
  const cards = { ...state.cards, [slug]: localCard };
  commit({ cards, stats: state.user ? state.stats : computeStats(state.lessons, cards) });

  if (!state.user) return localCard;

  const payload = await gradeReview(slug, score);
  const { stats, rating, interval_days: interval, ...card } = payload;
  commit({ cards: { ...state.cards, [slug]: card }, stats });
  return card;
}

/* ------------------------------------------------------------------ 账号 */

async function syncFromServer(user, mergeLocal) {
  if (mergeLocal) {
    const reviews = Object.entries(localReviews()).map(([concept, rec]) => ({
      concept, rating: rec?.score || 3, due: rec?.due, at: rec?.at
    }));
    const lessons = localLessons()
      .filter((row) => row.completed)
      .map(({ lesson, mode }) => ({ lesson, mode }));
    if (lessons.length || reviews.length) {
      await mergeProgress({ lessons, reviews }).catch(() => {});
    }
  }

  const [progress, queue] = await Promise.all([fetchProgress(), fetchReviewQueue()]);
  const cards = {};
  queue.cards.forEach((card) => { cards[card.concept] = card; });
  commit({
    status: 'ready',
    user,
    lessons: progress.lessons,
    cards,
    stats: queue.stats,
    queueAt: queue.generated_at,
    error: null
  });
}

export async function bootstrapLearning() {
  if (state.status === 'loading' || state.status === 'ready') return;
  commit({ status: 'loading' });
  try {
    await ensureCsrf();
    const { user } = await fetchMe();
    if (!user) {
      commit({ status: 'ready', user: null });
      return;
    }
    await syncFromServer(user, true);
  } catch (error) {
    commit({ status: 'ready', error });
  }
}

export async function signIn(username, password) {
  const { user } = await loginUser({ username, password });
  await ensureCsrf();
  await syncFromServer(user, true);
  return user;
}

export async function signUp(username, password) {
  const { user } = await registerUser({ username, password });
  await ensureCsrf();
  await syncFromServer(user, true);
  return user;
}

export async function signOut() {
  await logoutUser();
  await ensureCsrf();
  const lessons = localLessons();
  const cards = localCards();
  commit({
    user: null,
    lessons,
    cards,
    stats: computeStats(lessons, cards),
    queueAt: null
  });
}

/* ------------------------------------------------------------------ 时间 */

export function daysUntil(iso) {
  if (!iso) return 0;
  const diff = new Date(iso).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
  return Math.round(diff / 86400000);
}

export function dueLabel(iso, lang) {
  const days = daysUntil(iso);
  if (days <= 0) return lang === 'zh' ? '今天' : 'Today';
  if (days === 1) return lang === 'zh' ? '明天' : 'Tomorrow';
  return lang === 'zh' ? `${days} 天后` : `In ${days} days`;
}

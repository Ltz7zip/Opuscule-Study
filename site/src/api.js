const BASE = '/api/v1';

function readCookie(name) {
  if (typeof document === 'undefined') return '';
  const hit = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : '';
}

async function request(path, options = {}) {
  const { method = 'GET', body, ...rest } = options;
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (method !== 'GET') {
    const token = readCookie('csrftoken');
    if (token) headers['X-CSRFToken'] = token;
  }
  const response = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'same-origin',
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    ...rest
  });
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.detail || `请求失败（${response.status}）`);
    error.status = response.status;
    error.payload = data;
    throw error;
  }
  return data;
}

export function fetchLesson({ subject, unit, order, mode = 'mastery', lang = 'zh' }) {
  const query = new URLSearchParams({ mode, lang });
  const route = [subject, unit, order].map((part) => encodeURIComponent(part)).join('/');
  return request(`/lessons/${route}?${query}`);
}

export function fetchSubjects({ expand = false } = {}) {
  const query = expand ? '?expand=units' : '';
  return request(`/subjects${query}`);
}

export function fetchSubject(slug) {
  return request(`/subjects/${encodeURIComponent(slug)}`);
}

export function fetchGraph() {
  return request('/graph');
}

export function fetchLessonList() {
  return request('/lessons');
}

/* ------------------------------------------------------------------ 账号 */

export function ensureCsrf() {
  return request('/auth/csrf');
}

export function fetchMe() {
  return request('/auth/me');
}

export function registerUser({ username, password }) {
  return request('/auth/register', { method: 'POST', body: { username, password } });
}

export function loginUser({ username, password }) {
  return request('/auth/login', { method: 'POST', body: { username, password } });
}

export function logoutUser() {
  return request('/auth/logout', { method: 'POST' });
}

/* ------------------------------------------------------------------ 进度 */

export function fetchProgress() {
  return request('/progress');
}

export function saveProgress({ lesson, mode, completed = true }) {
  return request('/progress', { method: 'POST', body: { lesson, mode, completed } });
}

export function mergeProgress(payload) {
  return request('/progress/merge', { method: 'POST', body: payload });
}

/* ------------------------------------------------------------------ 复习 */

export function fetchReviewQueue() {
  return request('/review/queue');
}

export function gradeReview(concept, rating) {
  return request(`/review/${encodeURIComponent(concept)}/grade`, {
    method: 'POST',
    body: { rating }
  });
}

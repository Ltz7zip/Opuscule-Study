export const LANGS = ['zh', 'en'];
export const DEFAULT_LANG = 'zh';

export function pathWithoutLang(pathname = window.location.pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (LANGS.includes(parts[0])) parts.shift();
  return `/${parts.join('/')}`;
}

export function parseRoute(pathname = window.location.pathname) {
  const parts = pathname.split('/').filter(Boolean);
  let lang = DEFAULT_LANG;
  let explicit = false;
  if (LANGS.includes(parts[0])) {
    lang = parts[0];
    explicit = true;
    parts.shift();
  }
  const key = (suffix) => `${lang}/${suffix}`;

  if (!parts.length) return { lang, explicit, name: 'home', key: key('home') };

  if (parts[0] === 'path') {
    const subject = parts[1] || null;
    const mode = parts[2] || 'mastery';
    return { lang, explicit, name: 'path', subject, mode, key: key(`path/${subject}/${mode}`) };
  }
  if (parts[0] === 'read' && parts[1] && parts[2] && parts[3]) {
    const subject = parts[1];
    const unit = parts[2];
    const order = Number(parts[3]);
    return {
      lang,
      explicit,
      name: 'read',
      subject,
      unit,
      order: Number.isInteger(order) && order > 0 ? order : null,
      key: key(`read/${subject}/${unit}/${parts[3]}`)
    };
  }
  if (parts[0] === 'read') return { lang, explicit, name: 'read', subject: null, unit: null, order: null, key: key('read/invalid') };
  if (parts[0] === 'map') return { lang, explicit, name: 'map', key: key('map') };
  if (parts[0] === 'catalog') return { lang, explicit, name: 'catalog', key: key('catalog') };
  if (parts[0] === 'review') return { lang, explicit, name: 'review', key: key('review') };
  return { lang, explicit, name: 'home', key: key('home') };
}

export function routeHref(lang, path = '/') {
  if (!path || path === '/') return `/${lang}`;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  const parts = suffix.split('/').filter(Boolean);
  if (LANGS.includes(parts[0])) parts.shift();
  return `/${lang}/${parts.join('/')}`;
}

export function swapLangPath(pathname, lang) {
  const parts = pathname.split('/').filter(Boolean);
  if (LANGS.includes(parts[0])) parts[0] = lang;
  else parts.unshift(lang);
  return `/${parts.join('/')}` || `/${lang}`;
}

export function navigateTo(to, { replace = false } = {}) {
  if (replace) window.history.replaceState(null, '', to);
  else window.history.pushState(null, '', to);
  window.dispatchEvent(new Event('opus:route'));
}

export function initialRoute() {
  const route = parseRoute();
  if (route.explicit) return route;
  let stored = null;
  try {
    stored = localStorage.getItem('opus.lang');
  } catch (e) {
    stored = null;
  }
  const lang = LANGS.includes(stored) ? stored : DEFAULT_LANG;
  window.history.replaceState(null, '', routeHref(lang, pathWithoutLang()));
  return parseRoute();
}

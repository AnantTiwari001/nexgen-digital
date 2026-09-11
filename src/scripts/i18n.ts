/**
 * Client-side language switching.
 *
 * Pages are prerendered in English. Elements carry data-i18n="key" and are
 * swapped from /i18n/<lang>.json. Language is chosen by, in order:
 *   1. ?lang=ne URL parameter
 *   2. localStorage preference
 *   3. English
 *
 * Attribute translation: data-i18n-attr="placeholder:key,aria-label:key2"
 * HTML translation (trusted dictionary only): data-i18n-html="key"
 */
export type Lang = 'en' | 'ne';
const KEY = 'nexgen-lang';
const cache: Partial<Record<Lang, Record<string, string>>> = {};
let englishSnapshot: WeakMap<Element, string> | null = null;

export function currentLang(): Lang {
  return (document.documentElement.getAttribute('data-lang') as Lang) || 'en';
}

export function resolveLang(): Lang {
  const param = new URLSearchParams(location.search).get('lang');
  if (param === 'ne' || param === 'en') return param;
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === 'ne' || stored === 'en') return stored;
  } catch {}
  return 'en';
}

async function loadDict(lang: Lang): Promise<Record<string, string>> {
  if (cache[lang]) return cache[lang]!;
  const res = await fetch(`/i18n/${lang}.json`, { cache: 'force-cache' });
  const dict = (await res.json()) as Record<string, string>;
  cache[lang] = dict;
  return dict;
}

function snapshotEnglish() {
  if (englishSnapshot) return;
  englishSnapshot = new WeakMap();
  document.querySelectorAll<HTMLElement>('[data-i18n],[data-i18n-html]').forEach((el) => {
    englishSnapshot!.set(el, el.dataset.i18nHtml ? el.innerHTML : el.textContent ?? '');
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const pairs = el.dataset.i18nAttr!.split(',');
    const saved: Record<string, string> = {};
    pairs.forEach((p) => {
      const [attr] = p.split(':');
      saved[attr.trim()] = el.getAttribute(attr.trim()) ?? '';
    });
    englishSnapshot!.set(el, JSON.stringify(saved));
  });
}

export async function applyLang(lang: Lang, { persist = true } = {}) {
  snapshotEnglish();
  const dict = lang === 'en' ? null : await loadDict(lang);
  const root = document.documentElement;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    const value = dict?.[key];
    el.textContent = value ?? englishSnapshot!.get(el) ?? el.textContent;
    el.classList.toggle('ne', Boolean(value) && lang === 'ne');
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml!;
    const value = dict?.[key];
    el.innerHTML = value ?? englishSnapshot!.get(el) ?? el.innerHTML;
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    const saved = JSON.parse(englishSnapshot!.get(el) ?? '{}') as Record<string, string>;
    el.dataset.i18nAttr!.split(',').forEach((p) => {
      const [attrRaw, keyRaw] = p.split(':');
      const attr = attrRaw.trim();
      const key = keyRaw?.trim();
      const value = key ? dict?.[key] : undefined;
      el.setAttribute(attr, value ?? saved[attr] ?? '');
    });
  });

  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang);
  document.querySelectorAll<HTMLElement>('[data-lang-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(lang === 'ne'));
    const label = b.querySelector('[data-lang-label]');
    if (label) label.textContent = lang === 'ne' ? 'EN' : 'ने';
  });
  if (persist) {
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
  }
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

/** Keep ?lang in the URL when navigating so shared links stay in the chosen language. */
function syncLinks(lang: Lang) {
  const param = new URLSearchParams(location.search).get('lang');
  if (!param) return;
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    const url = new URL(a.getAttribute('href')!, location.origin);
    if (url.pathname.startsWith('/api/')) return;
    url.searchParams.set('lang', lang);
    a.setAttribute('href', url.pathname + url.search + url.hash);
  });
}

export function initI18n() {
  const lang = resolveLang();
  if (lang !== 'en') {
    applyLang(lang, { persist: !new URLSearchParams(location.search).has('lang') ? true : true });
  }
  syncLinks(lang);
  document.querySelectorAll<HTMLElement>('[data-lang-toggle]').forEach((b) => {
    if (b.dataset.bound) return;
    b.dataset.bound = '1';
    b.addEventListener('click', async () => {
      const next: Lang = currentLang() === 'ne' ? 'en' : 'ne';
      await applyLang(next);
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
      syncLinks(next);
    });
  });
}

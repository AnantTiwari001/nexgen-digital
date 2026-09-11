/**
 * Theme handling. The inline script in Base.astro applies the stored theme before
 * paint to avoid a flash; this module wires the toggle buttons.
 */
export type Theme = 'light' | 'dark';
const KEY = 'nexgen-theme';

export function getTheme(): Theme {
  return (document.documentElement.getAttribute('data-theme') as Theme) || 'light';
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(theme === 'dark'));
  });
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function initTheme() {
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(getTheme() === 'dark'));
    if (b.dataset.bound) return;
    b.dataset.bound = '1';
    b.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));
  });
}

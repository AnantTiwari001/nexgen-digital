import en from './en.json';
import ne from './ne.json';

export type Lang = 'en' | 'ne';
export const languages: { code: Lang; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'ne', label: 'Nepali', nativeLabel: 'ने' },
];
export const defaultLang: Lang = 'en';

type Dict = Record<string, string>;
export const dictionaries: Record<Lang, Dict> = { en: en as Dict, ne: ne as Dict };

/**
 * Build-time translation. Pages are prerendered in English; the client swaps
 * text for Nepali using data-i18n attributes (see src/scripts/i18n.ts).
 */
export function t(key: string, lang: Lang = defaultLang): string {
  const dict = dictionaries[lang];
  if (key in dict) return dict[key];
  if (key in dictionaries.en) return dictionaries.en[key];
  if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${key}`);
  return key;
}

/** Keys in `ne` that are missing from `en`, for sanity checks. */
export function missingKeys(): string[] {
  return Object.keys(dictionaries.ne).filter((k) => !(k in dictionaries.en) && !k.startsWith('svc.') && !k.startsWith('cat.'));
}

/**
 * Captures campaign parameters (utm_*, ref, promo) on first landing and stores them
 * so every form submission can carry attribution. Groundwork for the future
 * analytics surface: promotional links land here and the data follows the lead.
 */
const KEY = 'nexgen-attribution';
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref', 'promo', 'src'];

export interface Attribution {
  params: Record<string, string>;
  landing: string;
  referrer: string;
  firstSeen: string;
  lastSeen: string;
  visits: number;
}

export function captureAttribution(): Attribution {
  let existing: Attribution | null = null;
  try {
    existing = JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch {}

  const search = new URLSearchParams(location.search);
  const params: Record<string, string> = {};
  PARAMS.forEach((p) => {
    const v = search.get(p);
    if (v) params[p] = v.slice(0, 120);
  });

  const now = new Date().toISOString();
  const attribution: Attribution = existing
    ? {
        ...existing,
        params: Object.keys(params).length ? params : existing.params,
        lastSeen: now,
        visits: (existing.visits || 0) + 1,
      }
    : {
        params,
        landing: location.pathname + location.search,
        referrer: document.referrer || '',
        firstSeen: now,
        lastSeen: now,
        visits: 1,
      };

  try {
    localStorage.setItem(KEY, JSON.stringify(attribution));
  } catch {}
  return attribution;
}

export function getAttribution(): Attribution | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}

/** Fills hidden inputs named `attribution` and `page` inside forms. */
export function attachAttribution(form: HTMLFormElement) {
  const a = getAttribution();
  const set = (name: string, value: string) => {
    let input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  };
  set('attribution', a ? JSON.stringify(a) : '');
  set('page', location.href);
  set('lang', document.documentElement.getAttribute('data-lang') || 'en');
}

/**
 * Rule-based chat engine. Scores knowledge entries by keyword hits and returns the
 * best match, or a fallback that invites the visitor to leave contact details.
 * Replace `answer()` with an LLM call later without touching the widget.
 */
import { knowledge, type KnowledgeEntry } from '../data/faq';
import { dictionaries } from '../i18n';

export interface ChatAnswer {
  answer: string;
  matched: boolean;
  id?: string;
  link?: { label: string; href: string };
}

const GREETINGS = ['hi', 'hello', 'hey', 'namaste', 'नमस्ते', 'good morning', 'good evening', 'yo'];
const THANKS = ['thank', 'thanks', 'धन्यवाद', 'great', 'ok', 'okay', 'cool'];

const normalise = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ').trim();

function score(entry: KnowledgeEntry, text: string): number {
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (text.includes(k)) s += k.includes(' ') ? 3 : k.length > 4 ? 2 : 1;
  }
  return s;
}

export function answer(message: string, lang: 'en' | 'ne' = 'en'): ChatAnswer {
  const text = normalise(message);
  const t = (k: string) => dictionaries[lang]?.[k] ?? dictionaries.en[k] ?? k;

  if (!text) return { answer: t('chat.fallback'), matched: false };

  if (GREETINGS.some((g) => text === g || text.startsWith(g + ' '))) {
    return { answer: t('chat.greeting'), matched: true, id: 'greeting' };
  }
  if (THANKS.some((g) => text.startsWith(g))) {
    return {
      answer: lang === 'ne' ? 'स्वागत छ! अरू केही सोध्नु छ भने लेख्नुहोस्।' : 'You are welcome! Ask me anything else, or leave your details and the team will follow up.',
      matched: true,
      id: 'thanks',
    };
  }

  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of knowledge) {
    const s = score(entry, text);
    if (s > 0 && (!best || s > best.score)) best = { entry, score: s };
  }
  if (best) {
    return { answer: best.entry.answer, matched: true, id: best.entry.id, link: best.entry.link };
  }
  return { answer: t('chat.fallback'), matched: false };
}

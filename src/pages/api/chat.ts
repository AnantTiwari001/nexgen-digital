import type { APIRoute } from 'astro';
import { answer } from '../../server/chatbot';
import { attributionRows, layout, notifyAddress, sendMail, table } from '../../server/mailer';
import { json, rateLimit, readBody, str } from '../../server/http';
import { dictionaries } from '../../i18n';

export const prerender = false;

interface Turn {
  role: 'user' | 'bot';
  text: string;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!rateLimit(request, clientAddress, 30)) return json({ answer: 'Too many messages. Please wait a minute.', matched: false }, 429);
  const body = await readBody(request);
  const lang = (str(body.lang, 5) === 'ne' ? 'ne' : 'en') as 'en' | 'ne';
  const t = (k: string) => dictionaries[lang][k] ?? dictionaries.en[k];

  // Lead capture: email the transcript to the team
  if (body.lead && typeof body.lead === 'object') {
    const lead = body.lead as Record<string, unknown>;
    const name = str(lead.name, 120);
    const contact = str(lead.contact, 160);
    if (name.length < 2 || contact.length < 5) return json({ answer: t('chat.askContact'), matched: false }, 400);

    const history = Array.isArray(body.history) ? (body.history as Turn[]).slice(-30) : [];
    const transcript = history.map((h) => `${h.role === 'user' ? 'Visitor' : 'Bot'}: ${str(h.text, 600)}`).join('\n');

    await sendMail({
      to: notifyAddress(),
      subject: `Chat lead: ${name} (${contact})`,
      html: layout(
        'New chat lead',
        table([
          ['Name', name],
          ['Contact', contact],
          ['Page', str(body.page, 400)],
          ['Language', lang],
          ['Transcript', transcript || '(no messages)'],
          ...attributionRows(body.attribution),
        ]),
      ),
    });
    return json({ answer: t('chat.leadSent'), matched: true, id: 'lead' });
  }

  const message = str(body.message, 500);
  if (!message) return json({ answer: t('chat.fallback'), matched: false }, 400);
  return json(answer(message, lang));
};

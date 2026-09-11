import type { APIRoute, GetStaticPaths } from 'astro';
import { dictionaries, languages } from '../../i18n';

/** Serves each dictionary as static JSON so the client can swap languages. */
export const getStaticPaths: GetStaticPaths = () => languages.map((l) => ({ params: { lang: l.code } }));

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang as keyof typeof dictionaries;
  return new Response(JSON.stringify(dictionaries[lang] ?? {}), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};

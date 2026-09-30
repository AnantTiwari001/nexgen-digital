// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

/**
 * Site URL is read from PUBLIC_SITE_URL so the same build config works for
 * preview and production hosts. Defaults to a placeholder domain.
 */
const site = process.env.PUBLIC_SITE_URL || 'https://nexgendigital.com.np';

export default defineConfig({
  site,
  // Every page is prerendered. Only the /api/* endpoints opt out and run on the server.
  output: 'static',
  // Deployed on Cloudflare Workers: static pages are served as assets, /api/* runs in the
  // Worker (see wrangler.jsonc). 'compile' optimizes images with Sharp at build time, as
  // every page using <Image> is prerendered — no Cloudflare Images binding needed.
  // Self-hosting? Swap this for `import node from '@astrojs/node'` and
  // `adapter: node({ mode: 'standalone' })` — that's the only line that needs to change.
  adapter: cloudflare({ imageService: 'compile' }),
  // Nothing uses Astro sessions; without this the adapter provisions an unused KV namespace.
  session: false,
  integrations: [sitemap({ filter: (page) => !page.includes('/preorder/thank-you') && !page.includes('/api/') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Poppins',
      cssVariable: '--font-poppins',
      weights: [500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Caveat',
      cssVariable: '--font-script',
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
    {
      provider: fontProviders.google(),
      name: 'Mukta',
      cssVariable: '--font-devanagari',
      weights: [400, 600, 800],
      styles: ['normal'],
      subsets: ['devanagari', 'latin'],
      fallbacks: ['sans-serif'],
    },
  ],
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_META_PIXEL_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      // Storage (Supabase). Optional: without them, submissions are logged to the console
      // instead of persisted. See supabase/schema.sql for the tables this expects, and
      // supabase/notifications.sql for the ntfy alerts on new submissions.
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  build: { inlineStylesheets: 'auto' },
  // Dev-server only: lets tunneled hosts (ngrok, etc.) reach `astro dev` without
  // Vite's host-header check blocking the request. Has no effect on the built site.
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});

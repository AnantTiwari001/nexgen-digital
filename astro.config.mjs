// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
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
  // Deployed on Vercel: turns /api/* routes into Node serverless functions (needed for
  // googleapis + @supabase/supabase-js, which don't run on Vercel's edge runtime).
  // Self-hosting? Swap this back to `import node from '@astrojs/node'` and
  // `adapter: node({ mode: 'standalone' })` — that's the only line that needs to change.
  adapter: vercel(),
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
      // Email delivery (Gmail API). All optional: without them, emails are logged to the console.
      GMAIL_CLIENT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      GMAIL_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      GMAIL_REFRESH_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      GMAIL_SENDER: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTIFY_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Storage (Supabase). Optional: without them, submissions are logged to the console
      // instead of persisted. See supabase/schema.sql for the tables this expects.
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  build: { inlineStylesheets: 'auto' },
});

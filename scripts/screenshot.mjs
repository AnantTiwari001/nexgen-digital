/**
 * Visual check helper. Renders pages from the local server with the installed Chrome.
 *
 *   node scripts/screenshot.mjs /            -> full-page desktop + mobile shots
 *   node scripts/screenshot.mjs /about 1440 900 fold   -> viewport only
 *
 * Output: $SHOT_DIR (default ./.shots)
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const [route = '/', widthArg, heightArg, mode = 'full', themeArg = 'light', langArg = 'en'] = process.argv.slice(2);
const base = process.env.BASE_URL || 'http://127.0.0.1:4321';
const outDir = process.env.SHOT_DIR || path.resolve('.shots');
fs.mkdirSync(outDir, { recursive: true });

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--hide-scrollbars'] });

async function shot(width, height, suffix) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument((theme, lang) => {
    localStorage.setItem('nexgen-theme', theme);
    localStorage.setItem('nexgen-lang', lang);
  }, themeArg, langArg);
  if (mode === 'full') await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 800));

  if (mode === 'full') {
    // Scroll through the page so scroll-triggered reveals fire, then return to top.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(height * 0.6)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await new Promise((r) => setTimeout(r, 120));
    }
    await new Promise((r) => setTimeout(r, 900));
    await page.evaluate(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 600));
  }
  const name = `${route === '/' ? 'home' : route.replace(/^\//, '').replace(/[\/?=&]/g, '-')}-${suffix}${themeArg === 'dark' ? '-dark' : ''}${langArg === 'ne' ? '-ne' : ''}.png`;
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: mode === 'full' });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`${file} (${width}x${mode === 'full' ? h : height})`);
  if (errors.length) console.log('  console errors:', errors.slice(0, 5));
  await page.close();
}

if (widthArg) await shot(parseInt(widthArg, 10), parseInt(heightArg || '900', 10), mode === 'full' ? 'full' : 'fold');
else {
  await shot(1440, 900, 'desktop');
  await shot(400, 800, 'mobile');
}
await browser.close();

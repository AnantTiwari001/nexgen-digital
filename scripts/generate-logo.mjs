/**
 * Generates the NexGen Digital logo as SVG from Poppins ExtraBold outlines.
 *
 * Outputs:
 *   public/brand/logo-horizontal.svg        NexGen Digital in one line (light backgrounds)
 *   public/brand/logo-horizontal-dark.svg   same, for dark backgrounds
 *   public/brand/logo-horizontal-white.svg  all white, for orange backgrounds
 *   public/brand/logo-stacked.svg           NexGen over Digital (light backgrounds)
 *   public/brand/logo-stacked-dark.svg
 *   public/brand/logo-stacked-white.svg
 *   public/brand/logo-mark.svg              the X mark alone
 *   public/favicon.svg                      X mark on an orange tile
 *   src/generated/logo-paths.json           path data for the inline <Logo /> component
 *
 * Run: node scripts/generate-logo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const fontBuffer = fs.readFileSync(path.join(__dirname, 'assets/Poppins-ExtraBold.ttf'));
const font = opentype.parse(fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength));

const ORANGE = '#FF5A00';
const BLACK = '#0B0B0B';
const WHITE = '#FFFFFF';

const SIZE = 100; // font size used for path generation
const round = (n) => Math.round(n * 100) / 100;

/** Returns { d, advance } for a string at the given size, baseline at y. */
function textPath(text, x, y, size, letterSpacing = 0) {
  const glyphs = font.stringToGlyphs(text);
  let cursor = x;
  const parts = [];
  glyphs.forEach((g, i) => {
    const p = g.getPath(cursor, y, size);
    parts.push(p.toPathData(2));
    const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
    cursor += ((g.advanceWidth + kern) / font.unitsPerEm) * size + letterSpacing;
  });
  return { d: parts.join(' '), advance: cursor - x };
}

/**
 * The X mark: two diagonal bars. The rising bar is split by a slanted cut so it
 * reads like folded ribbon, matching the brand sheet.
 * Returns path data for a mark that fits in a box of `h` height with baseline at y.
 */
function xMark(x, y, h) {
  const w = h * 0.92; // slightly narrower than tall
  const t = h * 0.27; // bar thickness
  const top = y - h;
  const bottom = y;
  const left = x;
  const right = x + w;

  // Falling bar (top-left to bottom-right)
  const fall = [
    [left, top],
    [left + t, top],
    [right, bottom],
    [right - t, bottom],
  ];
  // Rising bar (bottom-left to top-right), split by a horizontal slit at the centre
  const gap = t * 0.14;
  const midY = (top + bottom) / 2;
  const dx = (right - left - t) / (bottom - top); // horizontal run per unit of height
  const yLow = midY + gap; // bottom edge of the slit
  const yHigh = midY - gap; // top edge of the slit
  const lowerPiece = [
    [left, bottom],
    [left + t, bottom],
    [left + t + (bottom - yLow) * dx, yLow],
    [left + (bottom - yLow) * dx, yLow],
  ];
  const upperPiece = [
    [left + (bottom - yHigh) * dx, yHigh],
    [left + t + (bottom - yHigh) * dx, yHigh],
    [right, top],
    [right - t, top],
  ];
  const poly = (pts) => 'M' + pts.map(([px, py]) => `${round(px)} ${round(py)}`).join(' L') + ' Z';
  return { d: `${poly(fall)} ${poly(lowerPiece)} ${poly(upperPiece)}`, width: w };
}

// --- Build the horizontal wordmark -------------------------------------------
// Layout: "Ne" + X + "Gen" then a gap then "Digital"
const baseline = 100;
const ne = textPath('Ne', 0, baseline, SIZE);
const xGap = SIZE * 0.02;
const capHeight = (font.tables.os2.sCapHeight / font.unitsPerEm) * SIZE;
const markHeight = capHeight * 1.02;
const mark = xMark(ne.advance + xGap, baseline, markHeight);
const genX = ne.advance + xGap + mark.width + xGap;
const gen = textPath('Gen', genX, baseline, SIZE);
const nexgenWidth = genX + gen.advance;

const wordGap = SIZE * 0.22;
const digital = textPath('Digital', nexgenWidth + wordGap, baseline, SIZE);
const totalWidth = nexgenWidth + wordGap + digital.advance;

// Vertical extents: ascender for the 'D' and 'l', descender for 'g'
const ascent = (font.ascender / font.unitsPerEm) * SIZE;
const descent = (Math.abs(font.descender) / font.unitsPerEm) * SIZE;
const padY = 8;
const top = baseline - ascent * 0.82 - padY; // Poppins ascender is generous; trim a little
const bottom = baseline + descent * 0.55 + padY;
const height = bottom - top;

// --- Build the stacked wordmark ------------------------------------------------
// "NexGen" on the first line; "Digital" smaller, right-aligned under it.
const stackedDigitalSize = SIZE * 0.62;
const stackedDigital = textPath('Digital', 0, 0, stackedDigitalSize);
const stackedDigitalX = nexgenWidth - stackedDigital.advance;
const stackedLine2Baseline = baseline + stackedDigitalSize * 0.86;
const stackedDigitalPath = textPath('Digital', stackedDigitalX, stackedLine2Baseline, stackedDigitalSize);
const stackedTop = top;
const stackedBottom = stackedLine2Baseline + (Math.abs(font.descender) / font.unitsPerEm) * stackedDigitalSize * 0.55 + padY;
const stackedHeight = stackedBottom - stackedTop;

const paths = {
  ne: ne.d,
  mark: mark.d,
  gen: gen.d,
  digital: digital.d,
  stackedDigital: stackedDigitalPath.d,
  horizontal: { viewBox: `0 ${round(top)} ${round(totalWidth)} ${round(height)}`, width: round(totalWidth), height: round(height) },
  stacked: { viewBox: `0 ${round(stackedTop)} ${round(nexgenWidth)} ${round(stackedHeight)}`, width: round(nexgenWidth), height: round(stackedHeight) },
  markBox: { x: round(ne.advance + xGap), y: round(baseline - markHeight), width: round(mark.width), height: round(markHeight) },
};

function svg({ viewBox, width, height }, body, extra = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" role="img" aria-label="NexGen Digital"${extra}>\n${body}\n</svg>\n`;
}

function horizontal(colors) {
  return svg(paths.horizontal, [
    `  <path fill="${colors.word}" d="${paths.ne} ${paths.gen}"/>`,
    `  <path fill="${colors.mark}" d="${paths.mark}"/>`,
    `  <path fill="${colors.digital}" d="${paths.digital}"/>`,
  ].join('\n'));
}

function stacked(colors) {
  return svg(paths.stacked, [
    `  <path fill="${colors.word}" d="${paths.ne} ${paths.gen}"/>`,
    `  <path fill="${colors.mark}" d="${paths.mark}"/>`,
    `  <path fill="${colors.digital}" d="${paths.stackedDigital}"/>`,
  ].join('\n'));
}

const light = { word: BLACK, mark: ORANGE, digital: ORANGE };
const dark = { word: WHITE, mark: ORANGE, digital: ORANGE };
const white = { word: WHITE, mark: WHITE, digital: WHITE };

const out = (rel, content) => {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  console.log('wrote', rel);
};

out('public/brand/logo-horizontal.svg', horizontal(light));
out('public/brand/logo-horizontal-dark.svg', horizontal(dark));
out('public/brand/logo-horizontal-white.svg', horizontal(white));
out('public/brand/logo-stacked.svg', stacked(light));
out('public/brand/logo-stacked-dark.svg', stacked(dark));
out('public/brand/logo-stacked-white.svg', stacked(white));

// Mark alone, normalised to its own box
const mb = paths.markBox;
const markOnly = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mb.x} ${mb.y} ${mb.width} ${mb.height}" width="${mb.width}" height="${mb.height}" role="img" aria-label="NexGen mark">\n  <path fill="${ORANGE}" d="${paths.mark}"/>\n</svg>\n`;
out('public/brand/logo-mark.svg', markOnly);

// Favicon: orange rounded tile with a white mark, padded
const pad = mb.width * 0.22;
const tile = Math.max(mb.width, mb.height) + pad * 2;
const tx = mb.x - (tile - mb.width) / 2;
const ty = mb.y - (tile - mb.height) / 2;
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${round(tx)} ${round(ty)} ${round(tile)} ${round(tile)}" width="64" height="64">\n  <rect x="${round(tx)}" y="${round(ty)}" width="${round(tile)}" height="${round(tile)}" rx="${round(tile * 0.22)}" fill="${ORANGE}"/>\n  <path fill="${WHITE}" d="${paths.mark}"/>\n</svg>\n`;
out('public/favicon.svg', favicon);

out('src/generated/logo-paths.json', JSON.stringify(paths, null, 2) + '\n');

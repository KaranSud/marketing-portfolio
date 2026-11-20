// Image sharpness check. Usage: node tasks/v3/workflows/sharpness.mjs <baseUrl> [path ...]
// At desktop (1440, 2x) and phone (390, 3x): for every visible-size <img>, compares the pixels the browser got
// (naturalWidth of the chosen source) with what the screen needs (rendered width x DPR, capped at the source
// file's own width). Prints each under-resolved image (got < 90% of need) and a summary; exit 1 if any.
import { createRequire } from 'module'; import { readdirSync } from 'fs'; import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const b = await chromium.launch({ executablePath: `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing` });
const [base, ...args] = process.argv.slice(2); const paths = args.length ? args : ['/'];
let bad = 0, total = 0; const quality = {};
for (const [w, dpr, mobile] of [[1440, 2, false], [390, 3, true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr, isMobile: mobile });
  for (const path of paths) {
    const p = await ctx.newPage(); await p.goto(base + path, { waitUntil: 'load' });
    await p.evaluate(async () => { document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'); for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } scrollTo(0, 0); });
    await p.waitForTimeout(4000);
    const rows = await p.evaluate(async (dpr) => {
      const out = []; const srcW = {};
      for (const img of document.querySelectorAll('img')) {
        const r = img.getBoundingClientRect(); if (r.width < 24 || !img.complete || !img.naturalWidth) continue;
        if (img.closest('[aria-hidden="true"]') && img.closest('.fl-stream-track > :nth-child(n+40)')) continue;
        const cs = getComputedStyle(img); const cover = cs.objectFit === 'cover';
        const u = new URL(img.currentSrc, location.href); const orig = u.pathname === '/_next/image' ? decodeURIComponent(u.searchParams.get('url')) : u.pathname;
        const q = u.searchParams.get('q');
        // naturalWidth of a srcset image is divided by its density, so decode the downloaded file for its real pixels
        const bmp = await fetch(img.currentSrc).then((x) => x.blob()).then((x) => createImageBitmap(x)).catch(() => null); if (!bmp) continue;
        const gw = bmp.width, gh = bmp.height;
        // with object-fit: cover the image is scaled to fill the box, so the binding dimension may be the height
        const scale = cover ? Math.max(r.width / gw, r.height / gh) : r.width / gw;
        out.push({ orig, q, cssW: Math.round(r.width), cssH: Math.round(r.height), gotW: gw, needScale: scale * dpr, cover });
      }
      return out;
    }, dpr);
    // the source file's own width caps what is achievable
    for (const r of rows) {
      if (!(r.orig in quality)) { const res = await p.request.get(base + encodeURI(r.orig)).catch(() => null); let sw = 0; if (res && res.ok()) { const buf = await res.body(); sw = dims(buf)?.[0] || 0; } quality[r.orig] = sw; }
      const srcW = quality[r.orig] || r.gotW; total++;
      const achievable = Math.min(1, srcW / r.gotW); // got/need ratio we could reach at best
      const ratio = 1 / r.needScale; // got pixels per needed device pixel
      if (ratio < 0.9 && r.gotW < srcW * 0.98) { bad++; console.log(`@${w} ${path}  ${r.orig.slice(0, 60)}  shown ${r.cssW}x${r.cssH}css  got ${r.gotW}px  need ${Math.round(r.gotW * r.needScale)}px  source ${srcW}px  q=${r.q}`); }
    }
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(`${total} images checked, ${bad} under-resolved`);
process.exit(bad ? 1 : 0);
function dims(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) { let i = 2; while (i < buf.length) { if (buf[i] !== 0xff) { i++; continue; } const m = buf[i + 1]; if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]; i += 2 + buf.readUInt16BE(i + 2); } }
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') { const c = buf.slice(12, 16).toString(); if (c === 'VP8X') return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)]; if (c === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff]; if (c === 'VP8L') { const b0 = buf.readUInt32LE(21); return [1 + (b0 & 0x3fff), 1 + ((b0 >> 14) & 0x3fff)]; } }
  return null;
}

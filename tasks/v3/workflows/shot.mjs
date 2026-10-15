// Screenshot any page at desktop + mobile, full length, split into readable chunks.
// Usage: NODE_PATH=/opt/node22/lib/node_modules node shot.mjs <url> <outPrefix> [--motion] [--click "<css selector>"]
// Default: reducedMotion=reduce and every framer/IO reveal forced visible, so nothing is caught mid-animation.
// --click: viewport shots paging through the opened overlay's scroller instead of full-page chunks.
// Output: <outPrefix>-desktop-01.png ... , <outPrefix>-mobile-01.png ...  (chunks of 1600px desktop / 2400px mobile)
// ESM ignores NODE_PATH, so resolve playwright via createRequire (NODE_PATH, else the global install).
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pwPath = (() => { for (const d of [...(process.env.NODE_PATH || '').split(':').filter(Boolean), '/opt/node22/lib/node_modules']) { try { return require.resolve('playwright', { paths: [d] }); } catch {} } return 'playwright'; })();
const { chromium } = require(pwPath);
const [url, out, ...rest] = process.argv.slice(2);
if (!url || !out) { console.error('usage: shot.mjs <url> <outPrefix> [--motion] [--click sel]'); process.exit(1); }
const motion = rest.includes('--motion');
const clickSel = rest.includes('--click') ? rest[rest.indexOf('--click') + 1] : null;
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, chunk: 1600, mobile: false },
  { name: 'mobile', width: 390, height: 844, chunk: 2400, mobile: true },
];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const v of VIEWPORTS) {
  const ctx = await b.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.mobile, hasTouch: v.mobile, reducedMotion: motion ? 'no-preference' : 'reduce', deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await p.waitForTimeout(1200);
  // walk the page so IntersectionObserver / whileInView fire
  await p.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(500);
  await p.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}' });
  await p.evaluate(() => document.querySelectorAll('[style]').forEach(el => { const s = el.style; if (s.opacity !== '' && parseFloat(s.opacity) < 1) s.opacity = '1'; if (s.transform && s.transform !== 'none') s.transform = 'none'; }));
  if (clickSel) {
    // Overlay mode: click, then page through the overlay's own scroller (largest scrollable element) with viewport shots.
    await p.click(clickSel).catch(e => console.error('click failed:', e.message)); await p.waitForTimeout(1200);
    await p.evaluate(() => document.querySelectorAll('[style]').forEach(el => { const s = el.style; if (s.opacity !== '' && parseFloat(s.opacity) < 1) s.opacity = '1'; if (s.transform && s.transform !== 'none') s.transform = 'none'; }));
    const total = await p.evaluate(() => {
      let best = null;
      for (const el of document.querySelectorAll('*')) { const cs = getComputedStyle(el); if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 20 && el.clientHeight > 200 && (!best || el.scrollHeight > best.scrollHeight)) best = el; }
      if (!best) return 0; best.setAttribute('data-shot-scroller', '1'); return Math.ceil((best.scrollHeight - best.clientHeight) / (best.clientHeight * 0.85)) + 1;
    });
    const n = Math.max(1, Math.min(total, 15));
    for (let i = 0; i < n; i++) {
      await p.evaluate(i => { const el = document.querySelector('[data-shot-scroller]'); if (el) el.scrollTop = i * el.clientHeight * 0.85; }, i);
      await p.waitForTimeout(300);
      const file = `${out}-${v.name}-${String(i + 1).padStart(2, '0')}.png`;
      await p.screenshot({ path: file }); console.log(file);
    }
    await ctx.close(); continue;
  }
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < H; y += v.chunk) {
    i++;
    const file = `${out}-${v.name}-${String(i).padStart(2, '0')}.png`;
    await p.screenshot({ path: file, fullPage: true, clip: { x: 0, y, width: v.width, height: Math.min(v.chunk, H - y) } });
    console.log(file);
  }
  await ctx.close();
}
await b.close();

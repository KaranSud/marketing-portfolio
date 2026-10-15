// Screenshot any page at desktop + mobile, full length, split into readable chunks.
// Usage: node shot.mjs <url> <outPrefix> [--motion] [--click "<css selector>"]
// Default: reducedMotion=reduce and every framer/IO reveal forced visible, so nothing is caught mid-animation.
// --click: viewport shots paging through the opened overlay's scroller instead of full-page chunks.
// Output: <outPrefix>-desktop-01.png ... , <outPrefix>-mobile-01.png ...  (chunks of 1600px desktop / 2400px mobile)
// ESM ignores NODE_PATH, so resolve playwright via createRequire: NODE_PATH dirs, the local tools dir
// (~/.cache/portfolio-v3-tools, playwright-core), then the old cloud global install.
import { createRequire } from 'module';
import { existsSync, readdirSync } from 'fs';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const pwPath = (() => { for (const d of [...(process.env.NODE_PATH || '').split(':').filter(Boolean), `${homedir()}/.cache/portfolio-v3-tools`, '/opt/node22/lib/node_modules']) { for (const m of ['playwright', 'playwright-core']) { try { return require.resolve(m, { paths: [d] }); } catch {} } } return 'playwright'; })();
const { chromium } = require(pwPath);
// If Playwright's own browser revision isn't downloaded, fall back to the newest cached Chromium.
const cachedChrome = () => {
  for (const root of [`${homedir()}/Library/Caches/ms-playwright`, `${homedir()}/.cache/ms-playwright`, '/opt/pw-browsers']) {
    if (!existsSync(root)) continue;
    for (const d of readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])) {
      for (const exe of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome']) {
        if (existsSync(`${root}/${d}/${exe}`)) return `${root}/${d}/${exe}`;
      }
    }
  }
};
const [url, out, ...rest] = process.argv.slice(2);
if (!url || !out) { console.error('usage: shot.mjs <url> <outPrefix> [--motion] [--click sel]'); process.exit(1); }
const motion = rest.includes('--motion');
const clickSel = rest.includes('--click') ? rest[rest.indexOf('--click') + 1] : null;
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, chunk: 1600, mobile: false },
  { name: 'mobile', width: 390, height: 844, chunk: 2400, mobile: true },
];
const b = existsSync(chromium.executablePath()) ? await chromium.launch() : await chromium.launch({ executablePath: cachedChrome() });
for (const v of VIEWPORTS) {
  const ctx = await b.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.mobile, hasTouch: v.mobile, reducedMotion: motion ? 'no-preference' : 'reduce', deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await p.waitForTimeout(1200);
  // walk the page so IntersectionObserver / whileInView fire
  await p.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  // lazy images otherwise come out blank: load them all eagerly and wait for decode
  await p.evaluate(async () => { const imgs = [...document.images]; imgs.forEach(i => { i.loading = 'eager'; }); await Promise.all(imgs.map(i => i.decode().catch(() => {}))); });
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

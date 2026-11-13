// Page speed meter. Usage: node tasks/v3/workflows/perf.mjs <url> [url...]
// Per URL, cold cache, desktop 1440: TTFB, FCP, LCP, bytes and requests until load, plus bytes
// after 4s idle (what lazy media pulls in without scrolling). Also a sticky/pinned-scroll check.
// IMGS=1 also lists which image folders load before the load event.
import { createRequire } from 'module';
import { readdirSync } from 'fs';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const exe = `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const browser = await chromium.launch({ executablePath: exe });
for (const url of process.argv.slice(2)) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let bytes = 0, reqs = 0, loaded = false, loadBytes = 0, loadReqs = 0;
  const kinds = {}; const imgs = [];
  page.on('response', async (r) => {
    try {
      const len = Number(r.headers()['content-length'] || (await r.body()).length || 0);
      bytes += len; reqs++;
      const t = r.request().resourceType(); kinds[t] = (kinds[t] || 0) + len; if (!loaded && t === 'image') imgs.push(decodeURIComponent(r.url()).replace(/^https?:\/\/[^/]+/, '').slice(0, 90));
    } catch {}
  });
  await page.addInitScript(() => {
    window.__lcp = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(url, { waitUntil: 'load' });
  loadBytes = bytes; loadReqs = reqs; loaded = true;
  await page.waitForTimeout(4000);
  const m = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    const pinned = [...document.querySelectorAll('*')].filter((e) => {
      const s = getComputedStyle(e); return s.position === 'sticky' && e.offsetHeight >= innerHeight * 0.8;
    }).length;
    return { ttfb: Math.round(n.responseStart - n.requestStart), fcp: Math.round(fcp?.startTime || 0), lcp: Math.round(window.__lcp), load: Math.round(n.loadEventEnd), pinned, smooth: getComputedStyle(document.documentElement).scrollBehavior };
  });
  const kb = (b) => `${Math.round(b / 1024)}KB`;
  console.log(`${url}\n  ttfb ${m.ttfb}ms  fcp ${m.fcp}ms  lcp ${m.lcp}ms  load ${m.load}ms\n  at load: ${kb(loadBytes)} in ${loadReqs} req  after 4s idle: ${kb(bytes)} in ${reqs} req\n  by type: ${Object.entries(kinds).map(([k, v]) => `${k} ${kb(v)}`).join(', ')}\n  pinned full-screen sections: ${m.pinned}  scroll-behavior: ${m.smooth}`);
  if (process.env.IMGS) { const c = {}; imgs.forEach((u) => { const k = u.replace(/[?&](w|q)=\d+/g, '').split('/').slice(0, 5).join('/'); c[k] = (c[k] || 0) + 1; }); console.log('  images at load by folder:', Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 12)); }
  await ctx.close();
}
await browser.close();

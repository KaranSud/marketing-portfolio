// Low-end phone profile. Usage: node tasks/v3/workflows/perf-lowend.mjs <baseUrl> [path ...]
//   RUNS=3 (default) cold runs per page, medians printed. OUT=file.json also saves the numbers.
// Target device, not this Mac: 360x740 phone, CPU slowed 4x, slow 4G (1.6 Mbps down, 750 kbps up, 150 ms RTT).
// Per page: load (TTFB, FCP, LCP and its element, CLS, blocking time, bytes and requests by type),
// main-thread busy share while idle (top of page, then mid-page), a full-page scroll (slow frames,
// worst frame, long tasks, bytes pulled in), taps (menu, FAQ, post viewer: time to next paint), and one
// in-site navigation. Run it against a production build (next build && next start), never dev.
import { createRequire } from 'module';
import { readdirSync, writeFileSync } from 'fs';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const exe = `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [base, ...args] = process.argv.slice(2);
const paths = args.length ? args : ['/'];
const RUNS = +(process.env.RUNS || 3);
const med = (a) => { const s = a.filter((v) => v != null && !Number.isNaN(v)).sort((x, y) => x - y); return s.length ? s[s.length >> 1] : null; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const observers = () => {
  window.__p = { lcp: 0, lcpEl: '', cls: 0, long: [], events: [], frames: [] };
  new PerformanceObserver((l) => { for (const e of l.getEntries()) { __p.lcp = e.startTime; __p.lcpEl = (e.element ? e.element.tagName.toLowerCase() + '.' + String(e.element.className).split(' ')[0] : '') + ' ' + (e.url || '').split('/').pop().slice(0, 40); } }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) __p.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) __p.long.push([e.startTime, e.duration]); }).observe({ type: 'longtask', buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.interactionId) __p.events.push([e.startTime, e.duration]); }).observe({ type: 'event', durationThreshold: 16, buffered: true });
  let last = 0; const tick = (t) => { if (last) __p.frames.push([t, t - last]); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
};

async function run(b, path) {
  const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable'); await cdp.send('Performance.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const types = new Map(); const urls = new Map(); const bytes = {}; const list = []; let total = 0, reqs = 0, lastNet = Date.now();
  cdp.on('Network.requestWillBeSent', (e) => { types.set(e.requestId, e.type || 'Other'); urls.set(e.requestId, e.request.url); lastNet = Date.now(); });
  cdp.on('Network.loadingFinished', (e) => { const t = types.get(e.requestId) || 'Other'; bytes[t] = (bytes[t] || 0) + e.encodedDataLength; total += e.encodedDataLength; reqs++; lastNet = Date.now(); list.push([Math.round(e.encodedDataLength / 1024), t, decodeURIComponent(urls.get(e.requestId) || '').replace(/^https?:\/\/[^/]+/, '').slice(0, 100)]); });
  const busy = async (ms) => { const g = async () => (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'TaskDuration').value; const a = await g(); await sleep(ms); return Math.round((((await g()) - a) * 1000 / ms) * 100); };
  const quiet = async (max = 20000) => { const t0 = Date.now(); while (Date.now() - lastNet < 2000 && Date.now() - t0 < max) await sleep(200); };
  await page.addInitScript(observers);
  await page.goto(base + path, { waitUntil: 'load', timeout: 120000 });
  await quiet();
  const load = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; const f = performance.getEntriesByName('first-contentful-paint')[0]; const fcp = f ? f.startTime : 0;
    return { ttfb: n.responseStart, fcp, lcp: __p.lcp, lcpEl: __p.lcpEl, cls: __p.cls, load: n.loadEventEnd, tbt: __p.long.filter(([s]) => s >= fcp).reduce((a, [, d]) => a + Math.max(0, d - 50), 0) }; });
  const r = { ...load, kb: total / 1024, reqs, byType: Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v / 1024)])) };
  if (process.env.LIST) { console.log(`  requests before any scroll (${list.length}), largest first:`); for (const [kb, t, u] of [...list].sort((a, c) => c[0] - a[0]).slice(0, +process.env.LIST)) console.log(`    ${String(kb).padStart(5)}KB ${t.padEnd(10)} ${u}`); }
  r.idleTop = await busy(4000);

  // Scroll the whole page with real wheel input and watch frames.
  const before = total; const h = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const mark = await page.evaluate(() => performance.now());
  for (let y = 0; y < h; y += 160) { await page.mouse.wheel(0, 160); await sleep(24); }
  await sleep(600);
  const sc = await page.evaluate((m) => { const f = __p.frames.filter(([t]) => t > m).map(([, d]) => d).sort((a, b) => a - b); const lt = __p.long.filter(([s]) => s > m);
    return { frames: f.length, slow: f.filter((d) => d > 50).length, worst: f.at(-1) || 0, p95: f[Math.floor(f.length * 0.95)] || 0, long: lt.reduce((a, [, d]) => a + d, 0), dur: performance.now() - m }; }, mark);
  r.scrollSlowPct = sc.frames ? (sc.slow / sc.frames) * 100 : 0; r.scrollWorst = sc.worst; r.scrollP95 = sc.p95; r.scrollLong = sc.long; r.scrollFps = sc.frames / (sc.dur / 1000);
  await quiet(8000); r.scrollKb = (total - before) / 1024; r.pageHeight = h;
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight * 0.5)); await sleep(800);
  r.idleMid = await busy(3000);

  // Taps: longest input-to-paint for each (Event Timing), the same thing INP is built from.
  const tap = async (sel, name) => { const el = page.locator(sel).first(); if (!(await el.count())) return;
    await el.scrollIntoViewIfNeeded().catch(() => {}); await sleep(500);
    const m = await page.evaluate(() => performance.now()); await el.tap({ timeout: 5000, force: true }).catch(() => {}); await sleep(1200);
    r['tap_' + name] = await page.evaluate((mm) => Math.max(0, ...__p.events.filter(([s]) => s >= mm - 5).map(([, d]) => d)), m); };
  await page.evaluate(() => scrollTo(0, 0)); await sleep(400);
  await tap('.fl-burger', 'menuOpen'); await tap('.fl-burger', 'menuClose');
  await tap('.fl-faq-item summary', 'faq');
  // A post tile drifts sideways, so tap whichever one is on screen right now.
  const tile = page.locator('.fl-stream').first();
  if (await tile.count()) { await tile.scrollIntoViewIfNeeded().catch(() => {}); await sleep(700);
    const pt = await page.evaluate(() => { for (const t of document.querySelectorAll('.fl-stream .fl-tile')) { const q = t.getBoundingClientRect(); if (q.left > 20 && q.right < innerWidth - 20 && q.top > 80 && q.bottom < innerHeight) return [q.left + q.width / 2 + 30, q.top + q.height / 2]; } for (const t of document.querySelectorAll('.fl-stream .fl-tile')) { const q = t.getBoundingClientRect(); if (q.left > 0 && q.left < innerWidth - 80 && q.top > 80 && q.bottom < innerHeight) return [q.left + 60, q.top + q.height / 2]; } return null; });
    if (pt) { const m = await page.evaluate(() => performance.now()); await page.touchscreen.tap(pt[0], pt[1]); await sleep(1500);
      r.tap_postOpen = await page.evaluate((mm) => Math.max(0, ...__p.events.filter(([s]) => s >= mm - 5).map(([, d]) => d)), m); } }
  if (await page.locator('dialog[open] button[aria-label="Next post"]').count()) { await tap('dialog[open] button[aria-label="Next post"]', 'postNext'); await tap('dialog[open] button[aria-label="Close"]', 'postClose'); }

  // One in-site navigation: footer link to the blog (or home), until the new page's h1 is painted.
  const dest = path.startsWith('/blog') ? '/' : '/blog';
  const link = page.locator(`footer a[href="${dest}"], footer a[href="/#work"]`).first();
  if (await link.count()) { await link.scrollIntoViewIfNeeded().catch(() => {}); await sleep(400); const t0 = Date.now(); const before2 = page.url();
    await link.tap({ force: true }).catch(() => {}); try { await page.waitForFunction((u) => location.href !== u && document.querySelector('h1') && document.readyState !== 'loading', before2, { timeout: 60000 }); await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)))); r.nav = Date.now() - t0; } catch { r.nav = null; } }
  await ctx.close();
  return r;
}

const b = await chromium.launch({ executablePath: exe });
const out = {};
for (const path of paths) {
  const rs = []; for (let i = 0; i < RUNS; i++) rs.push(await run(b, path));
  const m = {}; for (const k of Object.keys(rs[0])) m[k] = typeof rs[0][k] === 'number' || rs[0][k] === null ? med(rs.map((x) => x[k])) : rs[0][k];
  out[path] = m; const n = (v, d = 0) => (v == null ? 'n/a' : v.toFixed(d));
  console.log(`${path}
  load   ttfb ${n(m.ttfb)}  fcp ${n(m.fcp)}  lcp ${n(m.lcp)} (${m.lcpEl.trim()})  cls ${n(m.cls, 3)}  blocking ${n(m.tbt)}ms  onload ${n(m.load)}
  weight ${n(m.kb)}KB in ${m.reqs} req  ${Object.entries(m.byType).sort((a, c) => c[1] - a[1]).map(([k, v]) => `${k} ${v}`).join('  ')}
  idle   main thread busy ${m.idleTop}% at top, ${m.idleMid}% mid-page
  scroll ${n(m.pageHeight)}px  ${n(m.scrollFps)} fps  slow frames ${n(m.scrollSlowPct, 1)}%  p95 ${n(m.scrollP95)}ms  worst ${n(m.scrollWorst)}ms  long tasks ${n(m.scrollLong)}ms  pulled ${n(m.scrollKb)}KB
  taps   ${Object.entries(m).filter(([k]) => k.startsWith('tap_')).map(([k, v]) => `${k.slice(4)} ${n(v)}ms`).join('  ') || 'none'}   nav ${n(m.nav)}ms`);
}
await b.close();
if (process.env.OUT) writeFileSync(process.env.OUT, JSON.stringify(out, null, 1));

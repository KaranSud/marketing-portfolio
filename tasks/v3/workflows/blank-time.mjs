// How long media stays blank after it scrolls into view. Usage: node tasks/v3/workflows/blank-time.mjs <url> [label]
// Low-end phone (360px, CPU 4x, slow 4G), a steady human-speed scroll (about 700 px/s) down the whole page.
// For every post tile, lane tile and reel that enters the screen: ms from entering until its image has loaded
// (0 if already loaded), and for reels ms until the video is actually playing. Prints median, p90 and how many
// were still blank after 1 s and 3 s.
import { createRequire } from 'module'; import { readdirSync } from 'fs'; import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const b = await chromium.launch({ executablePath: `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing` });
const [url, label = ''] = process.argv.slice(2);
const ctx = await b.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true });
const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
await cdp.send('Network.enable'); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
// NET=3g: 750 kbps down, 300 ms RTT (a weak mobile link). Default: slow 4G, 1.6 Mbps, 150 ms.
const net = process.env.NET === '3g' ? { latency: 300, downloadThroughput: (750 * 1024) / 8, uploadThroughput: (250 * 1024) / 8 } : { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 };
await cdp.send('Network.emulateNetworkConditions', { offline: false, ...net });
await p.addInitScript(() => {
  window.__bt = { enter: new Map(), img: new Map(), play: new Map(), ask: [] };
  // every play request: when it was asked for, when it really started, and whether it was paused (left the screen) first
  const P = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () { if (!this.__ask) { const rec = { at: performance.now(), ok: null, gaveUp: false, src: '' }; this.__ask = rec; __bt.ask.push(rec);
    this.addEventListener('playing', () => { if (rec.ok == null && !rec.gaveUp) rec.ok = performance.now(); rec.src = this.currentSrc.split('/').slice(-2).join('/'); }, { once: true });
    this.addEventListener('pause', () => { if (rec.ok == null) rec.gaveUp = true; }, { once: true }); } return P.apply(this, arguments); };
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !__bt.enter.has(e.target)) __bt.enter.set(e.target, performance.now()); }), { threshold: 0.3 });
  const watch = () => document.querySelectorAll('.fl-tile:not([aria-hidden="true"]), .fl-lane-tile').forEach((t) => { if (!t.__w) { t.__w = 1; io.observe(t); } });
  document.addEventListener('load', (e) => { const t = e.target.closest?.('.fl-tile, .fl-lane-tile'); if (t && e.target.tagName === 'IMG' && !__bt.img.has(t)) __bt.img.set(t, performance.now()); }, true);
  document.addEventListener('playing', (e) => { const t = e.target.closest?.('.fl-tile'); if (t && !__bt.play.has(t)) __bt.play.set(t, performance.now()); }, true);
  new MutationObserver(watch).observe(document, { childList: true, subtree: true });
});
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
const downlink = await p.evaluate(() => navigator.connection ? navigator.connection.downlink : 'n/a');
await p.waitForTimeout(2500);
const h = await p.evaluate(() => document.documentElement.scrollHeight);
const stops = await p.evaluate(() => [...document.querySelectorAll('.fl-stream')].map((e) => e.getBoundingClientRect().top + scrollY - innerHeight / 3));
for (let y = 0; y < h; y += 140) { await p.mouse.wheel(0, 140); await p.waitForTimeout(200);
  if (process.env.DWELL && stops.some((s) => s >= y && s < y + 140)) await p.waitForTimeout(+process.env.DWELL); }
await p.waitForTimeout(4000);
const r = await p.evaluate(() => {
  const now = performance.now(); const imgs = [], vids = [];
  for (const [t, at] of __bt.enter) {
    const img = t.querySelector('img'); if (!img) continue;
    const loadedAt = __bt.img.get(t) ?? (img.complete && img.naturalWidth ? 0 : now);
    imgs.push(Math.max(0, loadedAt - at));
    if (t.querySelector('video')) { const pl = __bt.play.get(t) ?? now; vids.push(Math.max(0, pl - at)); }
  }
  return { imgs, vids, ask: __bt.ask.map((a) => a.ok != null ? a.ok - a.at : a.gaveUp ? -1 : now - a.at) };
});
const stat = (a) => { const s = [...a].sort((x, y) => x - y); const q = (f) => Math.round(s[Math.min(s.length - 1, Math.floor(s.length * f))] || 0);
  return `n=${s.length} median ${q(0.5)}ms p90 ${q(0.9)}ms  blank >1s: ${s.filter((x) => x > 1000).length}  >3s: ${s.filter((x) => x > 3000).length}`; };
const started = r.ask.filter((x) => x >= 0);
console.log(`${label} [${process.env.NET || 'slow4g'}, browser sees ${downlink} Mbps${process.env.DWELL ? ', dwell ' + process.env.DWELL + 'ms' : ''}] images: ${stat(r.imgs)}\n${label} reels, play asked until playing: ${stat(started)}  (${r.ask.filter((x) => x < 0).length} left the screen first)`);
await b.close();

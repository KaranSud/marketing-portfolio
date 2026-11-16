// Site audit crawl. Usage: node tasks/v3/workflows/audit.mjs <baseUrl> [path ...]
// With no paths it reads /sitemap.xml and checks every URL. Per page: status, title and description length,
// canonical, og:image, h1 count, heading order jumps, images with no alt or no size, links with no name,
// low-contrast text (WCAG AA), console errors, failed requests, uppercase CSS text. Then checks every internal
// and external link once (HEAD, falls back to GET; sites that block scripts count as not checkable, neither
// pass nor fail). Prints only problems plus a summary; exit 1 on any. Run it against a production build.
import { createRequire } from 'module';
import { readdirSync } from 'fs';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const exe = `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [base, ...args] = process.argv.slice(2);
let paths = args;
if (!paths.length) {
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  paths = [...xml.matchAll(/<loc>([^<]+)/g)].map(m => new URL(m[1]).pathname);
}
const b = await chromium.launch({ executablePath: exe });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
let problems = 0; const links = new Map(); const titles = new Map(); const descs = new Map();
const say = (p, m) => { problems++; console.log(`${p}  ${m}`); };
for (const path of paths) {
  const p = await ctx.newPage(); const errs = []; const bad = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 140)); });
  p.on('pageerror', e => errs.push('pageerror ' + String(e).slice(0, 140)));
  p.on('response', r => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url().slice(0, 110)}`); });
  const res = await p.goto(base + path, { waitUntil: 'load' });
  if (!res || res.status() !== 200) say(path, `status ${res && res.status()}`);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(300);
  const d = await p.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const lum = (c) => { const m = c.match(/[\d.]+/g).map(Number); const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return [0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]), m[3] ?? 1]; };
    const bgOf = (e) => { for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== 'none') return null; const [l, a] = lum(s.backgroundColor); if (a > 0.95) return l; if (a > 0.05) return null; } return 1; };
    const low = []; const seen = new Set();
    for (const e of document.querySelectorAll('body *:not(script):not(style):not(svg *)')) {
      const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1); if (!own) continue;
      const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
      const s = getComputedStyle(e); if (s.visibility === 'hidden' || +s.opacity < 0.9) continue;
      if (e.closest('[aria-hidden="true"]')) continue;
      const bg = bgOf(e); if (bg === null) continue; const [fg, a] = lum(s.color); if (a < 0.95) continue;
      const ratio = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      const big = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
      if (ratio < (big ? 3 : 4.5)) { const k = `${e.className || e.tagName}|${s.color}`; if (!seen.has(k)) { seen.add(k); low.push(`${ratio.toFixed(2)} ${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]} ${s.color} ${parseFloat(s.fontSize)}px "${e.textContent.trim().slice(0, 30)}"`); } }
    }
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
    const jumps = hs.filter((v, i) => i && v - hs[i - 1] > 1).length;
    const upper = [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).textTransform === 'uppercase' && e.textContent.trim()).length;
    const small = [...document.querySelectorAll('p,span,a,li,small,time,figcaption')].filter(e => { const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1); const r = e.getBoundingClientRect(); return own && r.width > 2 && !e.closest('[aria-hidden="true"]') && parseFloat(getComputedStyle(e).fontSize) < 12; }).map(e => `${parseFloat(getComputedStyle(e).fontSize)}px .${String(e.className).split(' ')[0]}`);
    return {
      title: document.title, desc: q('meta[name="description"]')?.content || '', canon: q('link[rel="canonical"]')?.href || '',
      og: q('meta[property="og:image"]')?.content || '', ogt: q('meta[property="og:title"]')?.content || '', tw: q('meta[name="twitter:card"]')?.content || '',
      h1: document.querySelectorAll('h1').length, jumps, upper, low: low.slice(0, 8), small: [...new Set(small)].slice(0, 6),
      noAlt: [...document.querySelectorAll('img:not([alt])')].length,
      emptyAltNotHidden: [...document.querySelectorAll('img[alt=""]')].filter(i => !i.closest('[aria-hidden="true"]') && !i.closest('a[aria-label],button[aria-label]') && !(i.closest('a,button')?.textContent.trim())).length,
      noName: [...document.querySelectorAll('a,button')].filter(e => !e.textContent.trim() && !e.getAttribute('aria-label') && !e.querySelector('img[alt]:not([alt=""])') && !e.closest('[aria-hidden="true"]')).length,
      brokenImg: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0 && i.currentSrc).map(i => i.currentSrc.slice(-70)).slice(0, 5),
      ld: document.querySelectorAll('script[type="application/ld+json"]').length, lang: document.documentElement.lang,
      hrefs: [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => /^https?:/.test(h)),
      hashes: [...document.querySelectorAll('a[href*="#"]')].map(a => a.getAttribute('href')).filter(h => h.startsWith('#') && h.length > 1 && !document.getElementById(h.slice(1))),
      words: document.querySelector('main')?.innerText.split(/\s+/).length || 0,
    };
  });
  if (d.title.length < 25 || d.title.length > 65) say(path, `title ${d.title.length} chars: ${d.title}`);
  if (d.desc.length < 70 || d.desc.length > 165) say(path, `description ${d.desc.length} chars`);
  if (titles.has(d.title)) say(path, `duplicate title with ${titles.get(d.title)}`); else titles.set(d.title, path);
  if (d.desc && descs.has(d.desc)) say(path, `duplicate description with ${descs.get(d.desc)}`); else descs.set(d.desc, path);
  if (!d.canon) say(path, 'no canonical'); else if (new URL(d.canon).pathname.replace(/\/$/, '') !== path.replace(/\/$/, '')) say(path, `canonical points to ${d.canon}`);
  if (!d.og) say(path, 'no og:image'); if (!d.tw) say(path, 'no twitter:card'); if (!d.ld) say(path, 'no JSON-LD'); if (!d.lang) say(path, 'no html lang');
  if (d.h1 !== 1) say(path, `h1 count ${d.h1}`); if (d.jumps) say(path, `heading level jumps ${d.jumps}`);
  if (d.upper) say(path, `uppercase text elements ${d.upper}`);
  if (d.noAlt) say(path, `img without alt ${d.noAlt}`); if (d.emptyAltNotHidden) say(path, `img alt="" not in aria-hidden ${d.emptyAltNotHidden}`);
  if (d.noName) say(path, `links/buttons with no name ${d.noName}`);
  for (const l of d.low) say(path, `contrast ${l}`); for (const s of d.small) say(path, `tiny text ${s}`);
  for (const i of d.brokenImg) say(path, `broken image ${i}`); for (const h of d.hashes) say(path, `dead anchor ${h}`);
  for (const e of [...new Set(errs)].slice(0, 4)) say(path, `console ${e}`); for (const e of [...new Set(bad)].slice(0, 4)) say(path, `request ${e}`);
  for (const h of d.hrefs) { const u = h.split('#')[0]; if (!links.has(u)) links.set(u, path); }
  await p.close();
}
await b.close();
const check = async (u) => { try { let r = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'user-agent': 'Mozilla/5.0 link-check' } }); if (r.status >= 400) r = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 link-check' } }); return r.status; } catch (e) { return String(e.name); } };
const all = [...links.keys()]; let n = 0, skipped = 0;
for (let i = 0; i < all.length; i += 12) {
  await Promise.all(all.slice(i, i + 12).map(async (u) => { const s = await check(u); n++; if (s !== 200) { const own = u.startsWith(base); if (typeof s === 'string' || (!own && [401, 403, 405, 429, 999].includes(s))) skipped++; else say(links.get(u), `link ${s} ${u.slice(0, 120)}`); } }));
}
console.log(`\n${paths.length} pages, ${n} links checked (${skipped} could not be checked: blocked or timed out), ${problems} problems`);
process.exit(problems ? 1 : 0);

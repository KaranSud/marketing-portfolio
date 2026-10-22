// Phone-width check (Karan's rule, 21 Oct 2026): at 375, 414 and 768 px, on every page type,
// no sideways scroll, tap targets at least 44 px, the mobile menu opens and closes (button and Escape),
// and the sticky CTA never covers the open menu or a heading.
// Usage: node tasks/v3/workflows/phone-check.mjs <baseUrl> [path ...]   (exit 1 on any FAIL)
// Inline text links inside sentences are exempt from the 44 px rule (WCAG 2.5.8 inline exception).
import { createRequire } from 'module';
import { existsSync, readdirSync } from 'fs';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const exe = `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [base, ...paths] = process.argv.slice(2);
if (!base) { console.error('usage: phone-check.mjs <baseUrl> [path ...]'); process.exit(1); }
const pages = paths.length ? paths : ['/'];
const b = existsSync(chromium.executablePath()) ? await chromium.launch() : await chromium.launch({ executablePath: exe });
let fails = 0;
const fail = (m) => { fails++; console.log('FAIL ' + m); };

for (const w of [375, 414, 768]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 812 }, reducedMotion: 'reduce', isMobile: w < 768, hasTouch: true });
  for (const path of pages) {
    const p = await ctx.newPage();
    const tag = `@${w} ${path}`;
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important}' });

    // 1. sideways scroll
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (over > 0) fail(`${tag} sideways scroll: page is ${over}px wider than the screen`);

    // 2. tap targets (visible, not an inline link inside running text)
    const small = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], summary')) {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (!r.width || !r.height || cs.visibility === 'hidden' || el.closest('[inert], [aria-hidden="true"]')) continue;
        if (el.matches('.sr-only, .skip-link') || r.width <= 2) continue;
        if (cs.display === 'inline' && el.closest('p, li, figcaption, td') && el.parentElement.innerText.trim().length > el.innerText.trim().length + 2) continue;
        if (r.height < 44 || r.width < 44) out.push(`${el.tagName.toLowerCase()} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
      return out;
    });
    if (small.length) fail(`${tag} ${small.length} tap targets under 44px: ${small.slice(0, 6).join('; ')}`);

    // 3. mobile menu opens and closes (button, then Escape) when the toggle is shown
    const toggle = p.locator('button[aria-controls][aria-expanded]').first();
    if (await toggle.count() && await toggle.isVisible()) {
      await toggle.click();
      await p.waitForTimeout(400);
      if ((await toggle.getAttribute('aria-expanded')) !== 'true') fail(`${tag} menu did not open`);
      const menuId = await toggle.getAttribute('aria-controls');
      const covered = await p.evaluate((id) => {
        const m = document.getElementById(id), s = document.querySelector('.v3-sticky.is-on');
        if (!m || !s) return false;
        const a = m.getBoundingClientRect(), c = s.getBoundingClientRect();
        return getComputedStyle(s).display !== 'none' && c.top < a.bottom && c.bottom > a.top && c.left < a.right && c.right > a.left;
      }, menuId);
      if (covered) fail(`${tag} sticky CTA covers the open menu`);
      await toggle.click();
      await p.waitForTimeout(400);
      if ((await toggle.getAttribute('aria-expanded')) !== 'false') fail(`${tag} menu did not close from its button`);
      await toggle.click();
      await p.waitForTimeout(300);
      await p.keyboard.press('Escape');
      await p.waitForTimeout(400);
      if ((await toggle.getAttribute('aria-expanded')) !== 'false') fail(`${tag} menu did not close on Escape`);
    } else if (w < 768) fail(`${tag} no visible menu toggle`);

    // 4. sticky CTA never hides content for good: at the end of the page, where nothing can scroll
    // out from under it, it must not overlap any text, link or button. (Mid-page, content passes
    // under any fixed bar while scrolling; the taste inspector checks headings at its scroll stops.)
    const hits = await p.evaluate(async () => {
      scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 700));
      const s = document.querySelector('.v3-sticky.is-on'); if (!s || getComputedStyle(s).display === 'none') return [];
      const c = s.getBoundingClientRect(); const out = [];
      for (const el of document.querySelectorAll('h1, h2, h3, p, li, a, button')) {
        if (s.contains(el) || el.contains(s)) continue;
        const r = el.getBoundingClientRect();
        if (r.height && getComputedStyle(el).visibility !== 'hidden' && c.top < r.bottom - 2 && c.bottom > r.top + 2 && c.left < r.right && c.right > r.left) out.push((el.innerText || el.tagName).trim().slice(0, 40));
      }
      return out;
    });
    if (hits.length) fail(`${tag} sticky CTA covers content at the end of the page: ${hits.slice(0, 4).join('; ')}`);
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(fails ? `RESULT: ${fails} FAIL` : 'RESULT: 0 FAIL');
process.exit(fails ? 1 : 0);

// Screenshot ONE element at a given viewport width (for close checks of a section, a logo row, a crop).
// Usage: node tasks/v3/workflows/elshot.mjs <url> "<css selector>" <out.png> [width=1440]
// Reveals forced visible and reduced motion on, like shot.mjs. Resolves playwright-core like shot.mjs.
import { createRequire } from 'module';
import { existsSync, readdirSync } from 'fs';
import { homedir } from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright-core', { paths: [`${homedir()}/.cache/portfolio-v3-tools`] }));
const root = `${homedir()}/Library/Caches/ms-playwright`;
const dir = readdirSync(root).filter(n => /^chromium-\d+$/.test(n)).sort((a, b) => b.split('-')[1] - a.split('-')[1])[0];
const exe = `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [url, sel, out, w] = process.argv.slice(2);
if (!url || !sel || !out) { console.error('usage: elshot.mjs <url> "<selector>" <out.png> [width]'); process.exit(1); }
const b = existsSync(chromium.executablePath()) ? await chromium.launch() : await chromium.launch({ executablePath: exe });
const p = await (await b.newContext({ viewport: { width: Number(w || 1440), height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 2 })).newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important} .v3-sticky{visibility:hidden!important}' });
const el = p.locator(sel).first();
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
await el.screenshot({ path: out });
await b.close();
console.log(out);

// Paste into javascript_tool on instagram.com/<handle>/ or /<handle>/reels/ (Claude in Chrome, read-only, tab in front).
// Call with window.__igStep(N, "YYYY-MM-DD" stopBefore) repeatedly (<= 20 steps per call: 45s CDP limit).
// Collects shortcodes, their type (p/reel), the tile text (reels tab shows view counts) and the date decoded from
// the shortcode (upload time). Returns "count; oldest" so you know when you have passed the tenure window.
// Read results with window.__igRows("2025-02-01", "2025-04-30") -> "date code type views" lines.
(() => {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  window.__igDate = (c) => { let n = 0n; for (const ch of c.slice(0, 11)) n = n * 64n + BigInt(A.indexOf(ch)); return new Date(Number(n >> 23n) + 1314220021721).toISOString().slice(0, 10); };
  window.__ig = window.__ig || new Map();
  window.__igStep = async (n = 18, stopBefore = '0000') => {
    let last = window.__ig.size, same = 0;
    for (let k = 0; k < n; k++) {
      document.querySelectorAll('main a').forEach((a) => {
        const m = (a.getAttribute('href') || '').match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
        if (m) window.__ig.set(m[2], [m[1], (a.innerText || '').replace(/\s+/g, ' ').trim()]);
      });
      const ds = [...window.__ig.keys()].map(window.__igDate).sort();
      if (ds.length > 15 && ds[6] < stopBefore) break;
      if (window.__ig.size === last) { if (++same > 5) break; } else { same = 0; last = window.__ig.size; }
      window.scrollTo(0, document.body.scrollHeight); await new Promise((r) => setTimeout(r, 1600));
    }
    const ds = [...window.__ig.keys()].map(window.__igDate).sort();
    return window.__ig.size + '; oldest ' + ds[0];
  };
  window.__igRows = (from = '0000', to = '9999') => [...window.__ig.entries()].map(([c, [t, v]]) => `${window.__igDate(c)} ${c} ${t} ${v || '-'}`).filter((r) => r.slice(0, 10) >= from && r.slice(0, 10) <= to).sort().join('\n');
  return 'ready';
})()

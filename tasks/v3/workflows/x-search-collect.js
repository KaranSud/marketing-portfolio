// Paste into javascript_tool on an x.com/search?q=... page (Claude in Chrome, read-only).
// Scrolls up to N steps, collects status ids by author, returns "handle;id;date;img;vid" lines (no URLs: the
// extension blocks output with query strings). Call again to continue; state lives in window.__x.
(async (N = 14) => {
  window.__x = window.__x || new Map();
  const grab = () => document.querySelectorAll('article').forEach((a) => {
    const l = [...a.querySelectorAll('a[href*="/status/"]')].map((x) => x.getAttribute('href')).find((h) => /\/status\/\d+$/.test(h));
    if (!l) return;
    const [, u, , id] = l.split('/');
    const t = a.querySelector('time')?.getAttribute('datetime') || '';
    window.__x.set(id, [u, id, t.slice(0, 10), a.querySelectorAll('[data-testid="tweetPhoto"] img').length, a.querySelectorAll('video').length].join(';'));
  });
  let last = -1, same = 0;
  for (let k = 0; k < N; k++) {
    grab();
    if (window.__x.size === last) { if (++same > 3) break; } else { same = 0; last = window.__x.size; }
    window.scrollBy(0, 2600); await new Promise((r) => setTimeout(r, 1600));
  }
  grab();
  return window.__x.size + '\n' + [...window.__x.values()].join('\n');
})()

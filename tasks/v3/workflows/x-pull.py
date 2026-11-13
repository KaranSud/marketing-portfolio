#!/usr/bin/env python3
"""Fetch X posts via api.fxtwitter.com and download their media, for portfolio creatives.

  python3 -I x-pull.py <ids.txt> <out_dir>
ids.txt: lines "handle;id[;...]" (output of x-search-collect.js). Writes <out_dir>/<handle>_<id>.json, the first
photo / video poster / article cover as <handle>_<id>.jpg, the best mp4 as <handle>_<id>.mp4 (videos), and
index.tsv sorted by views: handle id date views likes kind text. Skips anything already downloaded.
"""
import json, os, sys, time, urllib.request
ids, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0"}
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=40).read()
rows = []
for line in open(ids):
    p = line.strip().split(';')
    if len(p) < 2 or not p[1].isdigit():
        continue
    h, i = p[0], p[1]
    base = os.path.join(out, f"{h}_{i}")
    if not os.path.exists(base + '.json'):
        try:
            open(base + '.json', 'wb').write(get(f"https://api.fxtwitter.com/{h}/status/{i}"))
            time.sleep(0.3)
        except Exception as e:
            print('fail', h, i, e, file=sys.stderr); continue
    try:
        t = json.load(open(base + '.json'))['tweet']
    except Exception:
        continue
    if t['author']['screen_name'].lower() != h.lower():
        continue  # a repost or someone else's post
    m = t.get('media') or {}; a = t.get('article') or {}
    photos = [x['url'] for x in m.get('photos') or []]
    vids = m.get('videos') or []
    cover = ((a.get('cover_media') or {}).get('media_info') or {}).get('original_img_url')
    kind = 'video' if vids else 'article' if a else 'image' if photos else 'text'
    img = (photos[:1] or [v.get('thumbnail_url') for v in vids][:1] or ([cover] if cover else []))
    if img and not os.path.exists(base + '.jpg'):
        try: open(base + '.jpg', 'wb').write(get(img[0]))
        except Exception as e: print('img fail', i, e, file=sys.stderr)
    if vids and not os.path.exists(base + '.mp4'):
        v = vids[0]; fmts = [f for f in (v.get('formats') or v.get('variants') or []) if 'mp4' in (f.get('container', '') + f.get('content_type', '') + f.get('url', ''))]
        best = sorted(fmts, key=lambda f: f.get('bitrate') or 0)
        url = (best[-2] if len(best) > 1 else best[-1])['url'] if best else v.get('url')
        try: open(base + '.mp4', 'wb').write(get(url))
        except Exception as e: print('vid fail', i, e, file=sys.stderr)
    text = (a.get('title') or t.get('text') or '').replace('\n', ' ').replace('\t', ' ')[:120]
    rows.append((h, i, t['created_at'], t.get('views') or 0, t.get('likes') or 0, kind, text))
rows.sort(key=lambda r: -r[3])
with open(os.path.join(out, 'index.tsv'), 'w') as f:
    for r in rows: f.write('\t'.join(map(str, r)) + '\n')
print(len(rows), 'posts indexed in', out)

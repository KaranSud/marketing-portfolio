#!/usr/bin/env python3
"""Turn downloaded Instagram reels and posts into site media plus a data file (the Instagram twin of post-media.py).

  python3 -I ig-media.py <key> <mediaDir> "<Account label>" <raw_dir> <code...>
raw_dir holds reels/<code>.mp4|.jpg|.info.json (ig.py reel) and posts/<code>_s01.jpg (ig.py post).
Writes portfolio-v3/public/Results/<mediaDir>/posts/NN.jpg (max 1200px) and NN.mp4 (720p H.264, faststart,
max 90s, one ffmpeg at a time), then portfolio-v3/data/posts/<key>.json in the given order.
Dates: reels use the upload date from info.json (day precision); image posts use the date decoded from the
shortcode (upload time), shown as month and year only. Run from ~/marketing-portfolio.
"""
import datetime, json, os, re, subprocess, sys
key, media_dir, label, raw, *codes = sys.argv[1:]
pub = f"portfolio-v3/public/Results/{media_dir}/posts"
os.makedirs(pub, exist_ok=True); os.makedirs("portfolio-v3/data/posts", exist_ok=True)
A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
def code_date(c):
    n = 0
    for ch in c[:11]: n = n * 64 + A.index(ch)
    return datetime.datetime.fromtimestamp(((n >> 23) + 1314220021721) / 1000, datetime.UTC)
def dims(p):
    o = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", p], capture_output=True, text=True).stdout
    return [int(x) for x in re.findall(r"pixel\w+: (\d+)", o)]
caps = {}
pj = os.path.join(raw, "posts.json")
if os.path.exists(pj):
    for o in json.load(open(pj)):
        caps[o.get("code")] = o.get("caption") or ""
out = []
for c in codes:
    nn = f"{len(out) + 1:02d}"
    reel = os.path.join(raw, "reels", c)
    if os.path.exists(reel + ".mp4"):
        info = json.load(open(reel + ".info.json")) if os.path.exists(reel + ".info.json") else {}
        dur = float(info.get("duration") or 0)
        if dur > 90:
            print("skip long reel", c, round(dur)); continue
        thumb = reel + ".jpg" if os.path.exists(reel + ".jpg") else reel + ".webp"
        jpg = f"{pub}/{nn}.jpg"
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80", "-Z", "1200", thumb, "--out", jpg], capture_output=True)
        mp4 = f"{pub}/{nn}.mp4"
        if not os.path.exists(mp4):
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", reel + ".mp4", "-vf", "scale='min(720,iw)':-2", "-c:v", "libx264",
                            "-preset", "veryfast", "-crf", "28", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-c:a", "aac", "-b:a", "96k", mp4], check=True)
        w, h = dims(jpg)
        ts = info.get("timestamp")
        d = datetime.datetime.fromtimestamp(ts, datetime.UTC) if ts else code_date(c)
        text = (info.get("description") or info.get("title") or "").split("\n")[0]
        out.append({"src": f"/Results/{media_dir}/posts/{nn}.jpg", "w": w, "h": h, "video": mp4.replace("portfolio-v3/public", ""),
                    "alt": text[:140] or f"{label} reel", "caption": f"{label} on Instagram, {d.day} {d:%b %Y}",
                    "date": d.strftime("%Y-%m-%d"), "href": f"https://www.instagram.com/reel/{c}/"})
        continue
    img = os.path.join(raw, "posts", f"{c}_s01.jpg")
    if not os.path.exists(img):
        print("missing", c); continue
    jpg = f"{pub}/{nn}.jpg"
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80", "-Z", "1200", img, "--out", jpg], capture_output=True)
    w, h = dims(jpg)
    d = code_date(c)
    out.append({"src": f"/Results/{media_dir}/posts/{nn}.jpg", "w": w, "h": h,
                "alt": (caps.get(c, "").split("\n")[0][:140]) or f"{label} post",
                "caption": f"{label} on Instagram, {d:%B %Y}", "date": d.strftime("%Y-%m-%d"),
                "href": f"https://www.instagram.com/p/{c}/"})
json.dump(out, open(f"portfolio-v3/data/posts/{key}.json", "w"), indent=1, ensure_ascii=False)
print(len(out), "posts ->", f"portfolio-v3/data/posts/{key}.json")

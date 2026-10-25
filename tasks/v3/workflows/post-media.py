#!/usr/bin/env python3
"""Turn picked raw posts (from x-pull.py or ig.py) into site media plus a data file.

  python3 -I post-media.py <key> <mediaDir> "<Account label>" <platform X|Instagram> <raw_dir> <ids...>
Writes portfolio-v3/public/Results/<mediaDir>/posts/NN.jpg (max 1200px) and NN.mp4 (720p H.264, faststart,
one ffmpeg at a time), then portfolio-v3/data/posts/<key>.json in pick order. Run from ~/marketing-portfolio.
"""
import json, os, re, subprocess, sys, datetime
key, media_dir, label, platform, raw, *ids = sys.argv[1:]
pub = f"portfolio-v3/public/Results/{media_dir}/posts"
os.makedirs(pub, exist_ok=True); os.makedirs("portfolio-v3/data/posts", exist_ok=True)
def dims(p):
    o = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", p], capture_output=True, text=True).stdout
    return [int(x) for x in re.findall(r"pixel\w+: (\d+)", o)]
out = []
for n, i in enumerate(ids, 1):
    stem = next((f[:-5] for f in os.listdir(raw) if f.endswith(f"{i}.json")), None)
    if not stem:
        print("missing", i); continue
    t = json.load(open(f"{raw}/{stem}.json"))["tweet"]
    a = t.get("article") or {}
    nn = f"{n:02d}"
    jpg = f"{pub}/{nn}.jpg"
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "80", "-Z", "1200", f"{raw}/{stem}.jpg", "--out", jpg], capture_output=True)
    w, h = dims(jpg)
    item = {"src": f"/Results/{media_dir}/posts/{nn}.jpg", "w": w, "h": h}
    if os.path.exists(f"{raw}/{stem}.mp4"):
        mp4 = f"{pub}/{nn}.mp4"
        if not os.path.exists(mp4):
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{raw}/{stem}.mp4", "-vf", "scale='min(720,iw)':-2",
                            "-c:v", "libx264", "-preset", "veryfast", "-crf", "28", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                            "-c:a", "aac", "-b:a", "96k", mp4], check=True)
        item["video"] = f"/Results/{media_dir}/posts/{nn}.mp4"
    d = datetime.datetime.strptime(t["created_at"], "%a %b %d %H:%M:%S %z %Y")
    text = re.sub(r"https?://\S+", "", a.get("title") or t.get("text") or "").strip()
    item.update({
        "alt": (text[:140] or f"{label} post").replace("\n", " "),
        "caption": f"{label} on {platform}, {d.day} {d:%b %Y}",
        "date": d.strftime("%Y-%m-%d"),
        "href": t["url"],
    })
    out.append(item)
json.dump(out, open(f"portfolio-v3/data/posts/{key}.json", "w"), indent=1, ensure_ascii=False)
print(len(out), "posts ->", f"portfolio-v3/data/posts/{key}.json")

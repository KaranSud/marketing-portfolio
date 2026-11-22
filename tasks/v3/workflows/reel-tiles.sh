#!/bin/bash
# Small silent copies of the client reels for the autoplaying stream tiles (Stream.tsx). The tiles play
# muted at about 260 to 340 css px tall, so a 640px-tall, audio-free H.264 copy looks the same and is about
# half the bytes; the large viewer still plays the original with sound. Idempotent: skips existing tiles.
# One ffmpeg at a time (Karan's Mac runs hot). Usage: bash tasks/v3/workflows/reel-tiles.sh
cd "$(dirname "$0")/../../../portfolio-v3" || exit 1
grep -ho '"video": *"[^"]*"' data/posts/*.json | sed 's/"video": *"//;s/"$//' | sort -u | while read -r v; do
  src="public$v"; out="${src%.mp4}.tile.mp4"
  [ -f "$src" ] || { echo "missing $src"; continue; }
  [ -f "$out" ] || [ -f "$out.skip" ] && continue
  ffmpeg -nostdin -v error -y -i "$src" -an -vf "scale=-2:'min(640,ih)'" -c:v libx264 -preset slow -crf 28 \
    -pix_fmt yuv420p -movflags +faststart "$out" || continue
  # A reel that is already tiny can come out bigger; then the tile keeps using the original.
  if [ "$(stat -f %z "$out")" -ge "$(stat -f %z "$src")" ]; then rm -f "$out"; echo "kept original $v"; touch "$out.skip"; continue; fi
  echo "$(( $(stat -f %z "$src") / 1024 ))KB -> $(( $(stat -f %z "$out") / 1024 ))KB $v"
done
# Lite copies for weak connections (Stream.tsx picks them when the browser reports under 1.5 Mbps):
# 360px tall, CRF 32, about a third of the tile copy. Softer, but it plays on 3G instead of not at all.
grep -ho '"video": *"[^"]*"' data/posts/*.json | sed 's/"video": *"//;s/"$//' | sort -u | while read -r v; do
  src="public$v"; out="${src%.mp4}.lite.mp4"
  [ -f "$src" ] || continue; [ -f "$out" ] || [ -f "$out.skip" ] && continue
  ffmpeg -nostdin -v error -y -i "$src" -an -vf "scale=-2:'min(360,ih)'" -c:v libx264 -preset slow -crf 32 \
    -pix_fmt yuv420p -movflags +faststart "$out" || continue
  base="${src%.mp4}.tile.mp4"; [ -f "$base" ] || base="$src"
  if [ "$(stat -f %z "$out")" -ge "$(( $(stat -f %z "$base") * 8 / 10 ))" ]; then rm -f "$out"; touch "$out.skip"; echo "lite not worth it $v"; continue; fi
  echo "lite $(( $(stat -f %z "$base") / 1024 ))KB -> $(( $(stat -f %z "$out") / 1024 ))KB $v"
done

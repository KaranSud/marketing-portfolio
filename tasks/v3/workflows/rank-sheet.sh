#!/bin/bash
# Contact sheet of the top N posts (by views) from an x-pull.py folder, numbered by rank with kind (i/v/a/t).
# Usage: rank-sheet.sh <raw_dir> <out.jpg> [N=40]   -> also writes <raw_dir>/rank.txt (rank kind id views)
raw="$1"; out="$2"; n="${3:-40}"; tmp="$(mktemp -d)"
: > "$raw/rank.txt"; k=0
while IFS=$'\t' read -r h i d v l kind t; do
  k=$((k+1)); [ $k -gt $n ] && break
  echo "$k ${kind:0:1} $i $v" >> "$raw/rank.txt"
  [ -f "$raw/${h}_$i.jpg" ] && cp "$raw/${h}_$i.jpg" "$tmp/$(printf %02d $k)_${kind:0:1}.jpg"
done < "$raw/index.tsv"
python3 -I ~/.claude/skills/drive-ig-kit/scripts/sheet.py "$tmp/*.jpg" "$out" 8 170 >/dev/null 2>&1
rm -rf "$tmp"; echo "$out"

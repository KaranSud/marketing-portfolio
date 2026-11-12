import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Article header image: paper, sage streamlines unique to each post (seeded by its slug),
// the topic, the title in serif and the read time. Used at the top of each post, on the
// writing cards and as the share image. No full stops in the title (graphics rule).
export const HEADER_SIZE = { width: 1200, height: 630 };
const font = (f: string) => fs.readFileSync(path.join(process.cwd(), "assets", "fonts", f));

function lines(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 4294967296);
  const cx = 760 + rnd() * 260, cy = 180 + rnd() * 280, r = 70 + rnd() * 40;
  const out: string[] = [];
  for (let i = 0; i < 26; i++) {
    const y0 = 20 + i * 24;
    let d = `M -10 ${y0}`;
    for (let x = 0; x <= 1220; x += 20) {
      const dx = x - cx, dy = y0 - cy, r2 = dx * dx + dy * dy;
      const push = (r * r * dy) / (r2 + r * r); // smooth, bounded deflection past a round obstacle
      d += ` L ${x} ${(y0 + push + Math.sin(x / 140 + i) * 3).toFixed(1)}`;
    }
    out.push(d);
  }
  return { paths: out, cx, cy, r };
}

export function articleHeader({ slug, title, topic, readingTime }: { slug: string; title: string; topic: string; readingTime: string }) {
  const { paths, cx, cy, r } = lines(slug);
  const clean = title.replace(/[.]\s*$/, "");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F4F1EA", position: "relative" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={i % 5 === 2 ? "#6CA088" : "#1A1A17"} strokeOpacity={i % 5 === 2 ? 0.85 : 0.14} strokeWidth={i % 5 === 2 ? 2.5 : 1.5} />
          ))}
        </svg>
        <div style={{ position: "absolute", left: 72, top: 72, right: 72, bottom: 72, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", background: "#1A1A17", color: "#F4F1EA", fontFamily: "Geist", fontSize: 26, padding: "10px 22px", borderRadius: 999 }}>{topic}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 900 }}>
            <div style={{ fontFamily: "Fraunces", fontSize: clean.length > 60 ? 62 : 74, lineHeight: 1.05, color: "#1A1A17", letterSpacing: -1.5, background: "rgba(244,241,234,0.82)" }}>{clean}</div>
            <div style={{ display: "flex", fontFamily: "Geist", fontSize: 26, color: "#57554E" }}>Karan Sud · {readingTime}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...HEADER_SIZE,
      fonts: [
        { name: "Fraunces", data: font("Fraunces-400.ttf"), weight: 400, style: "normal" },
        { name: "Geist", data: font("Geist-500.ttf"), weight: 500, style: "normal" },
      ],
    }
  );
}

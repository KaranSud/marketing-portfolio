import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { hooks, type Hook } from "@/lib/hooks";

// Article header and share image (research: tasks/v3/research/article-headers.md).
// The title already shows under the image everywhere it appears, so the image carries what the
// title cannot: the post's one number, huge, a short line that sets it up, the number drawn,
// and Karan's face so a feed knows whose analysis it is. Dark card so it stands out on white feeds.
export const HEADER_SIZE = { width: 1200, height: 630 };
const file = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p));
const INK = "#0F1411", CREAM = "#F2EEE4", SAGE = "#8CC3A6", DIM = "rgba(242,238,228,0.18)", MUTED = "#A6A49B";

function Viz({ v }: { v: NonNullable<Hook["viz"]> }) {
  if (v.kind === "pct") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", width: 330, gap: 9 }}>
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} style={{ width: 24, height: 24, borderRadius: 12, background: i < v.value ? SAGE : DIM }} />
        ))}
      </div>
    );
  }
  if (v.kind === "count") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", width: 330, gap: 18 }}>
        {Array.from({ length: v.value }, (_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: SAGE }} />
            <div style={{ width: 44, height: 30, borderRadius: "22px 22px 6px 6px", background: SAGE }} />
          </div>
        ))}
      </div>
    );
  }
  const max = Math.max(v.a[1], v.b[1]);
  const bar = ([label, val, shown]: [string, number, string], hi: boolean) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Geist", fontSize: 26, color: hi ? CREAM : MUTED }}>
        <span>{label}</span><span>{shown}</span>
      </div>
      <div style={{ display: "flex", width: 340, height: 40, borderRadius: 8, background: DIM }}>
        <div style={{ width: Math.max(14, (val / max) * 340), height: 40, borderRadius: 8, background: hi ? SAGE : MUTED }} />
      </div>
    </div>
  );
  return <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>{bar(v.a, false)}{bar(v.b, true)}</div>;
}

export function articleHeader({ slug, topic }: { slug: string; topic: string }) {
  const h: Hook = hooks[slug] ?? { stat: "Karan Sud", line: "notes on marketing as it changes" };
  const photo = `data:image/jpeg;base64,${file("public", "karan.jpg").toString("base64")}`;
  const wide = !h.viz;
  const statSize = h.stat.length > 7 ? (wide ? 170 : 120) : wide ? 210 : 200;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: INK, padding: "64px 72px", color: CREAM }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: wide ? "center" : "stretch", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: wide ? "center" : "flex-start", fontFamily: "Geist", fontSize: 28, color: wide ? MUTED : SAGE }}>{topic}</div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: wide ? 1056 : 640, alignItems: wide ? "center" : "flex-start", textAlign: wide ? "center" : "left" }}>
            <div style={{ fontFamily: "Fraunces", fontSize: statSize, lineHeight: 0.95, letterSpacing: -4, color: wide ? SAGE : CREAM }}>{h.stat}</div>
            <div style={{ fontFamily: "Fraunces", fontSize: 46, lineHeight: 1.12, marginTop: 18, color: CREAM, letterSpacing: -0.5 }}>{h.line}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: wide ? "center" : "flex-start", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={64} height={64} style={{ borderRadius: 32 }} alt="" />
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Geist", fontSize: 24, lineHeight: 1.25 }}>
              <span style={{ color: CREAM }}>Karan Sud</span>
              <span style={{ color: MUTED }}>Engineer turned marketer</span>
            </div>
          </div>
        </div>
        {h.viz ? <div style={{ display: "flex", alignItems: "center", paddingLeft: 40 }}><Viz v={h.viz} /></div> : null}
      </div>
    ),
    {
      ...HEADER_SIZE,
      fonts: [
        { name: "Fraunces", data: file("assets", "fonts", "Fraunces-400.ttf"), weight: 400, style: "normal" },
        { name: "Geist", data: file("assets", "fonts", "Geist-500.ttf"), weight: 500, style: "normal" },
      ],
    }
  );
}

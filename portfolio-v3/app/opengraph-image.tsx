import { ImageResponse } from "next/og";

export const alt = "Karan Sud, growth and content for AI products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          padding: "64px 72px 48px",
          fontFamily: "sans-serif",
          color: "#F2F1EC",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: 54, lineHeight: 1.08, letterSpacing: -1.5 }}>
          <div>You built the AI product.</div>
          <div>I find the people who use it.</div>
          <div style={{ marginTop: 22, fontSize: 28, color: "#A9A89F", letterSpacing: 0 }}>
            Growth and content marketing for AI products
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 150, lineHeight: 0.8, letterSpacing: -7 }}>karan sud</div>
          <div style={{ width: 120, height: 10, background: "#6CA088", marginBottom: 12 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Karan Sud, growth and content for brands and founders";
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
          <div>I make the content that grows</div>
          <div>brands and founders.</div>
          <div style={{ marginTop: 22, fontSize: 28, color: "#A9A89F", letterSpacing: 0 }}>
            13+ brands and founders, 7+ industries
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

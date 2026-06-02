import { ImageResponse } from "next/og";

export const alt = "Karan Sud — Content & Growth Strategist";
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
          background:
            "radial-gradient(900px circle at 80% -10%, rgba(108,160,136,0.22), transparent 55%), #0A0A0B",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#989790",
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#6CA088",
            }}
          />
          PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F2F1EC",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Making brands
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              display: "flex",
              gap: 20,
            }}
          >
            <span style={{ color: "#6CA088" }}>impossible</span>
            <span style={{ color: "#F2F1EC" }}>to ignore</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#989790",
            fontSize: 28,
          }}
        >
          <div style={{ color: "#F2F1EC", fontSize: 34, fontWeight: 600 }}>
            Karan Sud
          </div>
          <div>Content &amp; Growth Strategist</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

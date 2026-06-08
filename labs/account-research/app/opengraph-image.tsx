import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Account Research & Outreach Engine by Karan Sud";

export default function OG() {
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
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "6px solid #6CA088",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#6CA088",
              }}
            />
          </div>
          <div style={{ color: "#989790", fontSize: 26, letterSpacing: 1 }}>
            Karan Sud / Labs
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#F2F1EC",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            <span>Account Research &amp;</span>
            <span>Outreach Engine</span>
          </div>
          <div style={{ color: "#989790", fontSize: 30, lineHeight: 1.4, maxWidth: 920 }}>
            Find your ideal customers, research any business from public data,
            and get a full outbound sequence. Free, every fact cited.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Lead discovery", "Fit scoring", "5-touch cadence", "Any vertical"].map(
            (t) => (
              <div
                key={t}
                style={{
                  color: "#6CA088",
                  fontSize: 22,
                  border: "1px solid rgba(108,160,136,0.35)",
                  borderRadius: 999,
                  padding: "8px 18px",
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

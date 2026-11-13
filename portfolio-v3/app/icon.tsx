import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6CA088",
          color: "#0A0A0B",
          fontSize: 38,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -2,
        }}
      >
        KS
      </div>
    ),
    { ...size }
  );
}

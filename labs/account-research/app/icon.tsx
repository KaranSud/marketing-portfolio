import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Branded "target" mark (account targeting), sage on near-black. Replaces the
// default Next.js / Vercel favicon.
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
          background: "#0A0A0B",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "5px solid #6CA088",
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
      </div>
    ),
    { ...size }
  );
}

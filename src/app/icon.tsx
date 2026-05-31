import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#050816",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #915EFF, #00FFFF)",
            width: 24,
            height: 24,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#050816",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}

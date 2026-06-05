import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f1e",
          borderRadius: 36,
        }}
      >
        <svg width="100" height="100" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4L28 26H4L16 4Z"
            fill="#0891b2"
            stroke="#0e7490"
            strokeWidth="1"
          />
          <path d="M16 10L22 24H10L16 10Z" fill="#ecfeff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

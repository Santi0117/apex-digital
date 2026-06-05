import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
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
          background: "#0a0f1e",
          borderRadius: 8,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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

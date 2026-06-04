import { ImageResponse } from "next/og";

export const alt = "Onvision Digital — Desarrollo web a medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0f1e 0%, #0f1729 50%, #1a1040 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "28px solid transparent",
              borderRight: "28px solid transparent",
              borderBottom: "48px solid #0891b2",
            }}
          />
          <span style={{ fontSize: 36, fontWeight: 500 }}>Onvision Digital</span>
        </div>
        <p style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.15, maxWidth: 900 }}>
          Desarrollo web a medida
        </p>
        <p style={{ fontSize: 28, color: "#a5f3fc", marginTop: 24 }}>
          Sitios · E-commerce · Apps SaaS · Latinoamérica
        </p>
      </div>
    ),
    { ...size }
  );
}

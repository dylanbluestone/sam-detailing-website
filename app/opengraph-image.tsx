import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Placeholder generated OG image — replace by dropping a real JPG/PNG named
// "opengraph-image.{jpg,png}" into /app/ when the brand asset is delivered.
export const alt = `${SITE.name} — ${SITE.tagline}`;
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
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 30%, #0B2545 0%, #0A0A0A 75%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#C9A227",
            fontSize: 18,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          Mobile Auto Spa · {SITE.serviceAreas.join(" + ")}
        </div>
        <div
          style={{
            display: "flex",
            color: "#FFFFFF",
            fontSize: 96,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          Crystal Coat
        </div>
        <div
          style={{
            display: "flex",
            color: "#C9A227",
            fontSize: 28,
            letterSpacing: 14,
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: 24,
          }}
        >
          Mobile Auto Spa
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.72)",
            fontSize: 26,
            marginTop: 56,
            maxWidth: 800,
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 56,
            color: "rgba(255,255,255,0.55)",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {SITE.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}

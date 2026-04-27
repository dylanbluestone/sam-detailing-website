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
          background: "linear-gradient(180deg, #0B2545 0%, #0A0A0A 100%)",
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
            fontSize: 92,
            letterSpacing: 14,
            textTransform: "uppercase",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          Crystal Coat Mobile
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.78)",
            fontSize: 30,
            letterSpacing: 4,
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.55)",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 28,
          }}
        >
          {SITE.serviceAreas.join(" · ")} · British Columbia
        </div>
      </div>
    ),
    { ...size },
  );
}

import type { Metadata } from "next";
import { LocationLanding } from "@/components/sections/location-landing";

export const metadata: Metadata = {
  title: "Mobile Auto Detailing in Port Coquitlam, BC",
  description:
    "Premium mobile auto detailing in Port Coquitlam — Birchland Manor, Riverwood, Lincoln Park, Citadel Heights, Mary Hill. Hand wash, full interior steam, paint sealant. Book online.",
  alternates: { canonical: "/mobile-detailing-port-coquitlam" },
};

export default function PortCoquitlamPage() {
  return (
    <LocationLanding
      city="Port Coquitlam"
      neighborhoods={[
        "Birchland Manor",
        "Riverwood",
        "Lincoln Park",
        "Citadel Heights",
        "Mary Hill",
      ]}
      mapQuery="Port Coquitlam, BC, Canada"
    />
  );
}

import type { Metadata } from "next";
import { LocationLanding } from "@/components/sections/location-landing";

export const metadata: Metadata = {
  title: "Port Coquitlam Mobile Detailing",
  description:
    "Premium mobile auto detailing in Port Coquitlam, BC — Birchland Manor, Riverwood, Lincoln Park, Citadel Heights, Mary Hill. Hand wash, steam clean, paint sealant.",
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
      path="/mobile-detailing-port-coquitlam"
    />
  );
}

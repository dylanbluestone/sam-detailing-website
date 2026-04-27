import type { Metadata } from "next";
import { LocationLanding } from "@/components/sections/location-landing";

export const metadata: Metadata = {
  title: "Coquitlam Mobile Detailing",
  description:
    "Premium mobile auto detailing in Coquitlam, BC — Burke Mountain, Westwood Plateau, Maillardville, City Centre, Eagle Ridge. Hand wash, steam clean, paint sealant.",
  alternates: { canonical: "/mobile-detailing-coquitlam" },
};

export default function CoquitlamPage() {
  return (
    <LocationLanding
      city="Coquitlam"
      neighborhoods={[
        "Burke Mountain",
        "Westwood Plateau",
        "Maillardville",
        "City Centre",
        "Eagle Ridge",
      ]}
      mapQuery="Coquitlam, BC, Canada"
      path="/mobile-detailing-coquitlam"
    />
  );
}

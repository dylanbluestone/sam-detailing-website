import type { Metadata } from "next";
import { LocationLanding } from "@/components/sections/location-landing";

export const metadata: Metadata = {
  title: "Mobile Auto Detailing in Coquitlam, BC",
  description:
    "Premium mobile auto detailing in Coquitlam — Burke Mountain, Westwood Plateau, Maillardville, City Centre, Eagle Ridge. Hand wash, full interior steam, paint sealant. Book online.",
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
    />
  );
}

import type { Metadata } from "next";
import { PackageDetail, findPackage } from "@/components/sections/package-detail";

const pkg = findPackage("premium-detail");

export const metadata: Metadata = {
  title: `${pkg.name} — From $${pkg.startingPrice}`,
  description: `${pkg.tagline} ${pkg.description} Mobile detailing in Port Coquitlam and Coquitlam, BC.`,
  alternates: { canonical: "/services/premium-detail" },
};

export default function PremiumDetailPage() {
  return <PackageDetail pkg={pkg} />;
}

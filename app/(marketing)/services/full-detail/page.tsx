import type { Metadata } from "next";
import { PackageDetail, findPackage } from "@/components/sections/package-detail";

const pkg = findPackage("full-detail");

export const metadata: Metadata = {
  title: `${pkg.name} — From $${pkg.startingPrice}`,
  description: `${pkg.tagline} ${pkg.description} Mobile detailing in Port Coquitlam and Coquitlam, BC.`,
  alternates: { canonical: "/services/full-detail" },
};

export default function FullDetailPage() {
  return <PackageDetail pkg={pkg} />;
}

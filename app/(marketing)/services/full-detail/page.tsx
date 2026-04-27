import type { Metadata } from "next";
import { PackageDetail, findPackage } from "@/components/sections/package-detail";

const pkg = findPackage("full-detail");

export const metadata: Metadata = {
  title: `${pkg.name} Package — From $${pkg.startingPrice}`,
  description:
    "Foam wash, hand dry, deep interior vacuum, steam clean of vents and surfaces, streak-free windows. Our most popular mobile detail. From $149 in Port Coquitlam.",
  alternates: { canonical: "/services/full-detail" },
};

export default function FullDetailPage() {
  return <PackageDetail pkg={pkg} />;
}

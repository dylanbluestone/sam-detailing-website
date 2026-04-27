import type { Metadata } from "next";
import { PackageDetail, findPackage } from "@/components/sections/package-detail";

const pkg = findPackage("premium-detail");

export const metadata: Metadata = {
  title: `${pkg.name} — From $${pkg.startingPrice}`,
  description:
    "Full interior steam, deep carpet shampoo, leather conditioning, clay bar, paint sealant. 1–2 month protection. Premium mobile detail from $279, Port Coquitlam.",
  alternates: { canonical: "/services/premium-detail" },
};

export default function PremiumDetailPage() {
  return <PackageDetail pkg={pkg} />;
}

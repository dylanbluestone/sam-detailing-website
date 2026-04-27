import type { Metadata } from "next";
import { PackageDetail, findPackage } from "@/components/sections/package-detail";

const pkg = findPackage("express-clean");

export const metadata: Metadata = {
  title: `${pkg.name} Detail — From $${pkg.startingPrice}`,
  description:
    "Quick exterior wash, full interior vacuum, wheels and tire shine, streak-free glass. From $79. Mobile detailing maintenance in Port Coquitlam, BC.",
  alternates: { canonical: "/services/express-clean" },
};

export default function ExpressCleanPage() {
  return <PackageDetail pkg={pkg} />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";

import { CTABand } from "@/components/sections/cta-band";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ADD_ONS, PACKAGES, VEHICLE_LABELS, type Package } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Detailing Packages & Pricing",
  description:
    "Compare three mobile detailing packages — Express Clean, Full Detail, Premium Detail. Sedan, SUV, and truck pricing. No deposits — pay in person on the day.",
  alternates: { canonical: "/services" },
};

type ComparisonRow = {
  feature: string;
  packages: Record<Package["slug"], boolean>;
};

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Hand wash & dry",
    packages: { "express-clean": true, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Foam soap & prewash",
    packages: { "express-clean": false, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Wheels + tire shine",
    packages: { "express-clean": true, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Streak-free windows",
    packages: { "express-clean": true, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Full interior vacuum",
    packages: { "express-clean": true, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Surface wipe-down (dash, panels)",
    packages: { "express-clean": true, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Steam clean (vents, cracks, cupholders)",
    packages: { "express-clean": false, "full-detail": true, "premium-detail": true },
  },
  {
    feature: "Full interior steam sanitation",
    packages: { "express-clean": false, "full-detail": false, "premium-detail": true },
  },
  {
    feature: "Deep carpet & seat shampoo",
    packages: { "express-clean": false, "full-detail": false, "premium-detail": true },
  },
  {
    feature: "Leather conditioning",
    packages: { "express-clean": false, "full-detail": false, "premium-detail": true },
  },
  {
    feature: "Clay bar treatment",
    packages: { "express-clean": false, "full-detail": false, "premium-detail": true },
  },
  {
    feature: "Paint sealant protection (1–2 months)",
    packages: { "express-clean": false, "full-detail": false, "premium-detail": true },
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      {/* Hero */}
      <section
        aria-label="Services hero"
        data-hero
        className="relative bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.6)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            Services &amp; Pricing
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Three packages. Transparent pricing.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">
            Pick the level your car needs. Every package is priced by vehicle
            size — sedan / SUV / truck — and we confirm final pricing on
            inspection. No deposits; you pay in person on the day of service.
          </p>
        </div>
      </section>

      {/* Comparison table — desktop */}
      <section
        aria-label="Compare packages"
        className="bg-bone py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            What's included
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Compare at a glance.
          </h2>

          {/* Desktop table */}
          <div className="mt-10 hidden md:block overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-4 text-left font-display text-xs font-bold tracking-[0.18em] uppercase text-gold"
                  >
                    Feature
                  </th>
                  {PACKAGES.map((pkg) => (
                    <th
                      key={pkg.slug}
                      scope="col"
                      className="px-5 py-4 text-left font-display text-base font-bold"
                    >
                      <div className="flex items-baseline gap-2">
                        {pkg.name}
                        {pkg.popular && (
                          <span className="rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] uppercase text-ink">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-white/70 font-normal">
                        From ${pkg.startingPrice}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-bone/60">
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-left font-medium text-ink"
                    >
                      {row.feature}
                    </th>
                    {PACKAGES.map((pkg) => (
                      <td key={pkg.slug} className="px-5 py-3.5">
                        {row.packages[pkg.slug] ? (
                          <Check
                            className="h-5 w-5 text-gold"
                            aria-label="Included"
                          />
                        ) : (
                          <Minus
                            className="h-4 w-4 text-muted/40"
                            aria-label="Not included"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-ink/[0.03]">
                  <th
                    scope="row"
                    className="px-5 py-4 text-left font-display font-bold text-ink"
                  >
                    Typical duration
                  </th>
                  {PACKAGES.map((pkg) => (
                    <td
                      key={pkg.slug}
                      className="px-5 py-4 text-sm text-muted-foreground"
                    >
                      {pkg.durationHours[0]}–{pkg.durationHours[1]} hrs
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile stacked card per package */}
          <div className="mt-10 md:hidden grid gap-4">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.slug}
                className="rounded-xl border border-border bg-white p-5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {pkg.name}{" "}
                    {pkg.popular && (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] uppercase text-ink ml-1">
                        Popular
                      </span>
                    )}
                  </h3>
                  <span className="font-display text-xl font-extrabold text-navy">
                    ${pkg.startingPrice}+
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {COMPARISON_ROWS.filter((r) => r.packages[pkg.slug]).map((r) => (
                    <li
                      key={r.feature}
                      className="flex items-start gap-2 text-ink"
                    >
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold" />
                      {r.feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Per-package detailed cards with all 3 vehicle prices */}
      <section
        aria-label="Per-package details"
        className="bg-white py-16 md:py-24 border-y border-border"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Pricing per vehicle
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Pick yours.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.slug}
                className={`relative flex flex-col rounded-xl border-2 bg-white p-6 transition-shadow ${
                  pkg.popular
                    ? "border-navy shadow-lg"
                    : "border-border hover:shadow-md"
                }`}
              >
                {pkg.popular && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-ink shadow-sm"
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-ink">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {pkg.tagline}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg border border-border bg-bone p-3">
                  {(["sedan", "suv", "truck"] as const).map((vt) => (
                    <div key={vt} className="text-center">
                      <div className="text-[10px] tracking-wider uppercase text-muted-foreground">
                        {VEHICLE_LABELS[vt].split(" ")[0]}
                      </div>
                      <div className="mt-0.5 font-display text-lg font-extrabold text-navy">
                        ${pkg.pricing[vt]}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {pkg.features.map((f) => (
                    <li key={f.title} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold" />
                      <span className="text-ink">{f.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Link
                    href={`/services/${pkg.slug}`}
                    className="inline-flex items-center justify-center gap-1 h-10 rounded-lg border border-border text-sm font-semibold text-ink hover:border-blue/40 hover:bg-bone transition-colors"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/book?package=${pkg.slug}`}
                    className="inline-flex items-center justify-center gap-1 h-10 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-blue transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Book this
                  </Link>
                </div>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  {pkg.durationHours[0]}–{pkg.durationHours[1]} hrs onsite
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section aria-label="Add-ons" className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Add-ons
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Optional extras.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Pair any of these with your package. Most can be quoted onsite if
            you decide on the day.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADD_ONS.map((addon) => (
              <div
                key={addon.slug}
                className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-ink">
                    {addon.name}
                  </h3>
                  <span className="text-sm font-bold text-navy whitespace-nowrap">
                    From ${addon.startingPrice}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Don't see what you need?{" "}
            <a
              href={`tel:${SITE.contact.primaryPhone.tel}`}
              className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
            >
              Call us
            </a>{" "}
            and ask — most things we can quote onsite.
          </p>
        </div>
      </section>

      <CTABand
        heading="Ready to book?"
        subhead="Pick a package and a time — we'll come to you."
      />
    </>
  );
}

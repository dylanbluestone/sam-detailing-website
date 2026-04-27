import Link from "next/link";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ServiceSchema } from "@/components/seo/service-schema";
import { ADD_ONS, PACKAGES, VEHICLE_LABELS, type Package } from "@/lib/services";

const BEST_FOR: Record<Package["slug"], string> = {
  "express-clean":
    "Drivers who keep their vehicle clean and want a quick reset between full details. Perfect for monthly maintenance.",
  "full-detail":
    "Anyone whose car needs a real refresh inside and out — full interior steam plus a thorough exterior wash. Our most popular package.",
  "premium-detail":
    "Drivers preparing to sell, returning a lease, or restoring a vehicle that's been neglected. The full deep-clean treatment with 1–2 month paint protection.",
};

const RECOMMENDED_ADDONS: Record<Package["slug"], readonly string[]> = {
  "express-clean": ["pet-hair", "odor-removal", "undercarriage"],
  "full-detail": ["clay-bar", "paint-sealant", "engine-bay", "pet-hair"],
  "premium-detail": ["engine-bay", "undercarriage", "odor-removal"],
};

export function PackageDetail({ pkg }: { pkg: Package }) {
  const recommended = RECOMMENDED_ADDONS[pkg.slug];

  return (
    <>
      <ServiceSchema pkg={pkg} />
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: pkg.name, path: `/services/${pkg.slug}` },
        ]}
      />
      <section
        aria-label={`${pkg.name} hero`}
        data-hero
        className="relative bg-ink text-white overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(11,37,69,0.65)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.18em] uppercase text-gold/80 hover:text-gold"
          >
            ← All packages
          </Link>
          {pkg.popular && (
            <span className="ml-3 inline-flex rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-ink">
              Most Popular
            </span>
          )}
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {pkg.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed">
            {pkg.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold">
                Starting at
              </span>
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
                ${pkg.startingPrice}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
              {pkg.durationHours[0]}–{pkg.durationHours[1]} hours typical
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/book?package=${pkg.slug}`}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Book this package
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
            >
              Compare all
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section
        aria-label={`${pkg.name} — what's included`}
        className="bg-bone py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            What's included
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-ink">
            Every step, in detail.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            {pkg.description}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {pkg.features.map((f) => (
              <li
                key={f.title}
                className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold shrink-0"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-ink">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {f.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing + duration + best-for */}
      <section
        aria-label={`${pkg.name} — pricing`}
        className="bg-white py-16 md:py-24 border-y border-border"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:gap-16 lg:grid-cols-2">
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
              Pricing
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-ink">
              Vehicle-type pricing.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Final price confirmed on inspection. Heavy soiling, pet messes,
              or oversized vehicles may adjust the quote.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full">
                <tbody>
                  {(["sedan", "suv", "truck"] as const).map((vt, i) => (
                    <tr
                      key={vt}
                      className={i > 0 ? "border-t border-border" : ""}
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-left font-display font-semibold text-ink"
                      >
                        {VEHICLE_LABELS[vt]}
                      </th>
                      <td className="px-5 py-4 text-right font-display text-2xl font-extrabold text-navy">
                        ${pkg.pricing[vt]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
              Best for
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-ink">
              Is this you?
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {BEST_FOR[pkg.slug]}
            </p>

            <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-5">
              <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-gold">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Duration
              </div>
              <p className="mt-2 text-sm text-ink leading-relaxed">
                Typically <strong>{pkg.durationHours[0]}–{pkg.durationHours[1]} hours</strong>{" "}
                onsite. We bring everything we need — water, power tools as
                required, and our own supplies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related add-ons */}
      <section
        aria-label="Pair with these add-ons"
        className="bg-bone py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Add-ons
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-ink">
            Pair with optional extras.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Common pairings highlighted. Add any of these when you book —
            they're priced separately.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADD_ONS.map((addon) => {
              const isRecommended = recommended.includes(addon.slug);
              return (
                <div
                  key={addon.slug}
                  className={`relative rounded-xl border bg-white p-5 transition-all ${
                    isRecommended
                      ? "border-gold/60 ring-1 ring-gold/20"
                      : "border-border hover:border-blue/30"
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute top-3 right-3 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-gold">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-baseline justify-between gap-2 pr-20">
                    <h3 className="font-display font-bold text-ink">
                      {addon.name}
                    </h3>
                    <span className="text-sm font-bold text-navy whitespace-nowrap">
                      +${addon.startingPrice}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        aria-label={`Book a ${pkg.name}`}
        className="relative bg-navy text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Ready for a {pkg.name.toLowerCase()}?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            Pick a date and we'll come to you. We'll confirm by email or text
            within a few hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/book?package=${pkg.slug}`}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Book this package
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
            >
              See other packages
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function findPackage(slug: Package["slug"]): Package {
  const pkg = PACKAGES.find((p) => p.slug === slug);
  if (!pkg) throw new Error(`Unknown package slug: ${slug}`);
  return pkg;
}

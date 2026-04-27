import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PACKAGES } from "@/lib/services";

type ServicesPreviewProps = {
  heading?: string;
  subhead?: string;
  showAllLink?: boolean;
};

export function ServicesPreview({
  heading = "Three packages. Pick what your car needs.",
  subhead = "Vehicle-type-specific pricing. No deposits — pay in person on the day of service.",
  showAllLink = true,
}: ServicesPreviewProps) {
  return (
    <section
      aria-label="Services"
      className="bg-bone py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Services
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            {heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subhead}
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.slug}
              className={`relative flex flex-col rounded-xl border-2 bg-white p-6 transition-shadow ${
                pkg.popular
                  ? "border-navy shadow-md"
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
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-bold text-ink">
                  {pkg.name}
                </h3>
                <div className="text-right">
                  <div className="text-[10px] tracking-wider uppercase text-muted-foreground">
                    Starting
                  </div>
                  <div className="font-display text-3xl font-extrabold text-navy leading-none">
                    ${pkg.startingPrice}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {pkg.tagline}
              </p>
              <ul className="mt-5 space-y-2 flex-1">
                {pkg.features.slice(0, 4).map((f) => (
                  <li
                    key={f.title}
                    className="flex items-start gap-2 text-sm text-ink"
                  >
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{f.title}</span>
                  </li>
                ))}
                {pkg.features.length > 4 && (
                  <li className="text-xs text-muted-foreground italic">
                    + {pkg.features.length - 4} more
                  </li>
                )}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <Link
                  href={`/services/${pkg.slug}`}
                  className="inline-flex items-center justify-center gap-1 h-10 rounded-lg border border-border text-sm font-semibold text-ink hover:border-blue/40 hover:bg-bone transition-colors"
                >
                  Learn more
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
              <div className="mt-3 text-xs text-muted-foreground">
                {pkg.durationHours[0]}–{pkg.durationHours[1]} hrs typical
              </div>
            </article>
          ))}
        </div>

        {showAllLink && (
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2 hover:text-blue"
            >
              Compare all packages
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

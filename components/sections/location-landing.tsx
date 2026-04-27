import Link from "next/link";
import { ArrowRight, Check, Clock, Phone, Sparkles, Truck } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { FAQSection } from "@/components/sections/faq-section";
import { FAQS } from "@/lib/faqs";
import { PACKAGES } from "@/lib/services";
import { SITE } from "@/lib/site";

const LOCAL_FAQ_QUESTIONS = new Set([
  "Do you come to me?",
  "What areas do you service?",
  "How far in advance should I book?",
]);

export type LocationLandingProps = {
  city: string;
  neighborhoods: readonly string[];
  mapQuery: string;
};

export function LocationLanding({
  city,
  neighborhoods,
  mapQuery,
}: LocationLandingProps) {
  const localFaqs = FAQS.filter((f) => LOCAL_FAQ_QUESTIONS.has(f.q));
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <section
        aria-label={`Mobile detailing in ${city} hero`}
        data-hero
        className="relative bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.6)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            Mobile Auto Detailing · {city}, BC
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Mobile Auto Detailing in {city}, BC.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">
            Premium hand wash, full interior steam clean, paint sealant, and
            more — done at your driveway in {city}. We serve every corner of
            the city, including {neighborhoods.slice(0, -1).join(", ")} and{" "}
            {neighborhoods[neighborhoods.length - 1]}.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Book Your Detail
            </Link>
            <a
              href={`tel:${SITE.contact.primaryPhone.tel}`}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.contact.primaryPhone.number}
            </a>
          </div>
        </div>
      </section>

      {/* Services snapshot */}
      <section aria-label="Services snapshot" className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Packages
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Three packages, all available in {city}.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.slug}
                className={`relative rounded-xl border-2 bg-white p-5 ${
                  pkg.popular ? "border-navy" : "border-border"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-ink">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-ink">
                  {pkg.name}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
                    From
                  </span>
                  <span className="font-display text-2xl font-extrabold text-navy">
                    ${pkg.startingPrice}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {pkg.tagline}
                </p>
                <Link
                  href={`/services/${pkg.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-blue"
                >
                  See full details
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Compare every feature on the{" "}
            <Link
              href="/services"
              className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
            >
              full services page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Why local drivers choose us */}
      <section
        aria-label={`Why ${city} drivers choose Crystal Coat`}
        className="bg-white py-16 md:py-24 border-y border-border"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Local advantages
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Why {city} drivers choose Crystal Coat.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-bone p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Truck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                Same-week service in {city}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We're based in Port Coquitlam — most {city} bookings can be
                fit in within 24–72 hours.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bone p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                Evenings &amp; weekends
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Most slots run 4–10 PM weekdays and 9 AM–10 PM Saturday and
                Sunday — fits around work without you taking time off.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bone p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                Done at your driveway
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We bring water, power tools, and supplies — all we need is a
                parking spot. Stays in your driveway, garage, or workplace lot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <FAQSection
        heading="Common questions from local drivers."
        items={localFaqs}
        variant="preview"
        showAllLink
      />

      {/* Map */}
      <section aria-label={`Map of ${city}`} className="bg-bone py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden border border-border bg-white shadow-sm">
            <iframe
              src={mapEmbed}
              title={`Map of ${city}, BC service area`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full h-[380px] sm:h-[460px] border-0"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Service area covers all of {city}, including {neighborhoods.join(", ")}.
          </p>
        </div>
      </section>

      <CTABand
        heading={`Book your detail in ${city}`}
        subhead={`We'll come to you anywhere in ${city}. Confirmation by email or text within a few hours.`}
      />
    </>
  );
}

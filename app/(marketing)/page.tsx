import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Phone, Sparkles } from "lucide-react";

import { CTABand } from "@/components/sections/cta-band";
import { FAQSection } from "@/components/sections/faq-section";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServicesPreview } from "@/components/sections/services-preview";
import { WhyCrystalCoat } from "@/components/sections/why-crystal-coat";
import { FAQS } from "@/lib/faqs";
import { getGalleryImages } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} — Mobile Auto Detailing in Port Coquitlam & Coquitlam`,
  },
  description:
    "Premium mobile auto detailing in Port Coquitlam and Coquitlam. We come to your driveway. Hand wash, full interior steam clean, paint sealant. Book online — pay in person.",
  alternates: { canonical: SITE.url },
};

const HOME_FAQ_SLUGS = new Set([
  "How much does detailing cost?",
  "Do you come to me?",
  "How long does it take?",
  "Do you work evenings and weekends?",
  "What areas do you service?",
]);

export default function HomePage() {
  const heroImage = getGalleryImages()[0];
  const homeFaqs = FAQS.filter((f) => HOME_FAQ_SLUGS.has(f.q));

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section
        aria-label="Hero"
        data-hero
        className="relative isolate min-h-[100svh] overflow-hidden text-white"
      >
        {heroImage && (
          <Image
            src={heroImage.src}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/95"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.55)_0%,rgba(10,10,10,0)_70%)]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 pt-28 pb-24 text-center">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            Mobile Auto Detailing · {SITE.serviceAreas.join(" + ")}
          </p>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl">
            Premium mobile detailing in Port Coquitlam &amp; Coquitlam.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
            We come to your driveway. Hand wash, full interior steam, paint
            sealant — done while you live your day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Book Your Detail
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
            >
              See Our Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/65">
            Or call{" "}
            <span className="font-semibold text-white">
              {SITE.contact.primaryPhone.name}
            </span>{" "}
            at{" "}
            <a
              href={`tel:${SITE.contact.primaryPhone.tel}`}
              className="inline-flex items-center gap-1 font-bold text-gold underline decoration-gold/40 underline-offset-4 decoration-2 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {SITE.contact.primaryPhone.number}
            </a>
            .
          </p>
        </div>

        <a
          href="#services"
          aria-label="Scroll to services"
          className="absolute left-1/2 bottom-7 -translate-x-1/2 inline-flex flex-col items-center gap-1.5 text-white/60 hover:text-gold transition-colors"
        >
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* SECTION 2 — Services preview */}
      <div id="services">
        <ServicesPreview />
      </div>

      {/* SECTION 3 — Gallery preview */}
      <GalleryPreview />

      {/* SECTION 4 — Why Crystal Coat */}
      <WhyCrystalCoat />

      {/* SECTION 5 — How it works */}
      <HowItWorks />

      {/* SECTION 6 — FAQ preview */}
      <FAQSection
        heading="Common questions"
        subhead="Everything else lives on the FAQ page."
        items={homeFaqs}
        showAllLink
        variant="preview"
      />

      {/* SECTION 7 — Big CTA */}
      <CTABand />
    </>
  );
}

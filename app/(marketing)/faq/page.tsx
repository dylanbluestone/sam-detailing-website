import type { Metadata } from "next";
import { CTABand } from "@/components/sections/cta-band";
import { FAQSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Crystal Coat Mobile — pricing, service area, scheduling, payment, pet hair, and more.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <section
        aria-label="FAQ hero"
        data-hero
        className="relative bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.6)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-12 lg:pt-40 lg:pb-16">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            Questions
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Frequently asked.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">
            Pricing, service area, scheduling, pet hair, payment — answered
            below. Still stuck? Text us at{" "}
            <span className="font-bold text-gold">236-878-9312</span>.
          </p>
        </div>
      </section>

      <FAQSection
        heading="Everything you might be wondering."
        subhead="If something isn't here, call or text — we'll answer in plain English."
      />

      <CTABand />
    </>
  );
}

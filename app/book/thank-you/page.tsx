import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Booking Received",
  description:
    "Thanks — your booking request is in. We'll reply by email or text within a few hours to confirm your time. Crystal Coat Mobile Auto Spa, Port Coquitlam BC.",
  alternates: { canonical: "/book/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="relative bg-ink text-white" data-hero>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.65)_0%,#0A0A0A_75%)]"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 text-center pt-28 pb-20">
        <span
          aria-hidden="true"
          className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gold/10"
        >
          <CheckCircle2 className="h-8 w-8 text-gold" />
        </span>
        <p className="mt-6 font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
          Booking received
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
          Got it — we'll be in touch.
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed">
          Your booking request is in. One of us ({SITE.contact.primaryPhone.name}{" "}
          or {SITE.contact.secondaryPhone.name}) will reply by email or text
          within a few hours to confirm your time.
        </p>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 max-w-md">
          <a
            href={`tel:${SITE.contact.primaryPhone.tel}`}
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {SITE.contact.primaryPhone.name}
          </a>
          <a
            href={`tel:${SITE.contact.secondaryPhone.tel}`}
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {SITE.contact.secondaryPhone.name}
          </a>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 text-sm text-white/70">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            See our work
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <span aria-hidden="true" className="hidden sm:inline text-white/30">
            ·
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            Back to home
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

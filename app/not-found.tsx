import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "We couldn't find that page. Try the home page or book a detail directly.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      className="relative min-h-[100svh] bg-ink text-white overflow-hidden"
      data-hero
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.65)_0%,#0A0A0A_75%)]"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <span
          aria-hidden="true"
          className="font-display text-[10px] font-bold tracking-[0.32em] uppercase text-gold"
        >
          404 · Not Found
        </span>
        <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
          We can't find that page.
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">
          Either the link is wrong, or we moved something. Try the home page,
          jump straight to booking, or call us — whichever's fastest.
        </p>
        <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 max-w-md">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Book a detail
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
        <a
          href={`tel:${SITE.contact.primaryPhone.tel}`}
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          Or call at{" "}
          <span className="font-bold text-gold">
            {SITE.contact.primaryPhone.number}
          </span>
        </a>
      </div>
    </div>
  );
}

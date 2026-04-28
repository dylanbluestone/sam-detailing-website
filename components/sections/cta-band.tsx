import Link from "next/link";
import { Phone, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

type CTABandProps = {
  heading?: string;
  subhead?: string;
  bookHref?: string;
  bookLabel?: string;
  className?: string;
};

export function CTABand({
  heading = "Ready for a clean car?",
  subhead = "Most jobs booked within 24–72 hours. Reply within a few hours of your request.",
  bookHref = "/book",
  bookLabel = "Book Your Detail",
  className = "",
}: CTABandProps) {
  return (
    <section
      aria-label={heading}
      className={`relative bg-navy text-white overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
          {subhead}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={bookHref}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {bookLabel}
          </Link>
          <a
            href={`tel:${SITE.contact.primaryPhone.tel}`}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call · {SITE.contact.primaryPhone.number}
          </a>
        </div>
      </div>
    </section>
  );
}

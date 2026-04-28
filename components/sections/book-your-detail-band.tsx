import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent ${className}`}
    />
  );
}

export function BookYourDetailBand() {
  return (
    <section
      aria-label="Book your detail"
      className="relative bg-navy"
    >
      <GoldDivider className="absolute inset-x-0 top-0" />
      <GoldDivider className="absolute inset-x-0 bottom-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Book your detail
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-md">
            Premium mobile detailing at your driveway. Most jobs booked within
            24–72 hours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/book"
            className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-gold text-ink font-semibold tracking-wide hover:bg-gold/90 transition-colors"
          >
            Book Your Detail
          </Link>
          <a
            href={`tel:${SITE.contact.primaryPhone.tel}`}
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-white/30 text-white font-medium tracking-wide hover:border-gold hover:text-gold transition-colors"
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            {SITE.contact.primaryPhone.number}
          </a>
        </div>
      </div>
    </section>
  );
}

export default BookYourDetailBand;

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { SITE } from "@/lib/site";
import { PACKAGES } from "@/lib/services";

const SERVICE_AREA_LINKS = [
  { city: "Port Coquitlam", href: "/mobile-detailing-port-coquitlam" },
  { city: "Coquitlam", href: "/mobile-detailing-coquitlam" },
] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16.5 7.5L16.51 7.5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.78 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.82-.12z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      {/* CTA band */}
      <section
        aria-label="Book your detail"
        className="bg-navy border-y border-white/10"
      >
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
              <Phone className="mr-2 h-4 w-4" />
              {SITE.contact.primaryPhone.number}
            </a>
          </div>
        </div>
      </section>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid gap-10 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo variant="light" href="/" />
          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            {SITE.tagline}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Crystal Coat on Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-gold hover:border-gold transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Crystal Coat on TikTok"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-gold hover:border-gold transition-colors"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.18em] uppercase text-gold">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {PACKAGES.map((pkg) => (
              <li key={pkg.slug}>
                <Link
                  href={`/services/${pkg.slug}`}
                  className="text-white/80 hover:text-gold transition-colors"
                >
                  {pkg.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="text-white/60 hover:text-gold transition-colors"
              >
                All packages →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.18em] uppercase text-gold">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${SITE.contact.primaryPhone.tel}`}
                className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4 text-white/40" />
                <span>
                  {SITE.contact.primaryPhone.name} ·{" "}
                  {SITE.contact.primaryPhone.number}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.contact.secondaryPhone.tel}`}
                className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4 text-white/40" />
                <span>
                  {SITE.contact.secondaryPhone.name} ·{" "}
                  {SITE.contact.secondaryPhone.number}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.primaryEmail}`}
                className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-white/40 shrink-0" />
                <span>{SITE.contact.primaryEmail}</span>
              </a>
            </li>
          </ul>

          <div className="mt-6 border-t border-gold/30 pt-5">
            <h4 className="font-display text-xs font-bold tracking-[0.18em] uppercase text-gold/90">
              Hours
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-white/70">
              {SITE.hoursDisplay.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.18em] uppercase text-gold">
            Service Areas
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICE_AREA_LINKS.map((area) => (
              <li key={area.city}>
                <Link
                  href={area.href}
                  className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors"
                >
                  <MapPin className="h-4 w-4 text-white/40" />
                  {area.city}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-white/55 leading-relaxed">
            {SITE.expansionNote}
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

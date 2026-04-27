import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Hours",
  description:
    "Reach Crystal Coat Mobile by phone or text — Luc 236-878-9312 or Sam 604-788-3116. Email, business hours, and service area covering Port Coquitlam & Coquitlam, BC.",
  alternates: { canonical: "/contact" },
};

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Port+Coquitlam,+BC,+Canada&t=&z=12&ie=UTF8&iwloc=&output=embed";

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section
        aria-label="Contact hero"
        data-hero
        className="relative bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(11,37,69,0.6)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-12 lg:pt-40 lg:pb-16">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            Contact
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Get in touch.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">
            Text or call directly. For booking requests, use the form — it
            captures everything we need to schedule.
          </p>
        </div>
      </section>

      <section aria-label="Contact info" className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:gap-10 lg:grid-cols-2">
          {/* Info card */}
          <div className="rounded-xl border border-border bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">
              Direct contact
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Phone or text — usually replies within an hour during business
              hours.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-gold">
                  {SITE.contact.primaryPhone.name} (primary)
                </div>
                <a
                  href={`tel:${SITE.contact.primaryPhone.tel}`}
                  className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-extrabold text-navy hover:text-blue"
                >
                  <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
                  {SITE.contact.primaryPhone.number}
                </a>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-gold">
                  {SITE.contact.secondaryPhone.name} (secondary)
                </div>
                <a
                  href={`tel:${SITE.contact.secondaryPhone.tel}`}
                  className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-extrabold text-navy hover:text-blue"
                >
                  <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
                  {SITE.contact.secondaryPhone.number}
                </a>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-gold">
                  Email
                </div>
                <a
                  href={`mailto:${SITE.contact.primaryEmail}`}
                  className="mt-1 inline-flex items-center gap-2 text-base text-ink hover:text-blue break-all"
                >
                  <Mail className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                  {SITE.contact.primaryEmail}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gold/30">
              <h3 className="font-display text-base font-bold text-ink">
                Hours
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {SITE.hoursDisplay.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gold/30">
              <h3 className="font-display text-base font-bold text-ink">
                Service area
              </h3>
              <p className="mt-2 inline-flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" aria-hidden="true" />
                <span>
                  {SITE.serviceAreas.join(", ")}.<br />
                  <span className="text-xs text-muted">
                    {SITE.expansionNote}
                  </span>
                </span>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gold/30">
              <h3 className="font-display text-base font-bold text-ink">
                Social
              </h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-blue underline decoration-gold underline-offset-4 decoration-2"
                >
                  Instagram
                </a>
                <a
                  href={SITE.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-blue underline decoration-gold underline-offset-4 decoration-2"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border bg-white shadow-sm">
            <iframe
              src={MAP_EMBED_URL}
              title="Map of Port Coquitlam, BC service area"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full h-[420px] sm:h-[520px] lg:h-full min-h-[420px] border-0"
            />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 lg:mt-14 rounded-xl border border-gold/30 bg-gold/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-ink">
              For bookings, please use our booking form.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Captures vehicle, package, time slot, address — everything we
              need to schedule.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors shrink-0"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Book Your Detail
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}

import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { CTABand } from "@/components/sections/cta-band";
import { WhyCrystalCoat } from "@/components/sections/why-crystal-coat";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Mobile Detailing in BC",
  description:
    "Crystal Coat Mobile is a premium mobile detailing service in Port Coquitlam, BC. Deep interior cleaning, hand-detailed exterior — done at your driveway by Luc and Sam.",
  alternates: { canonical: "/about" },
};

const TEAM = [
  {
    name: SITE.contact.primaryPhone.name,
    role: "Founder & Detailer",
    phone: SITE.contact.primaryPhone.number,
    tel: SITE.contact.primaryPhone.tel,
    bio: "Luc handles bookings, scheduling, and most details on the road. Easiest way to reach us — text or call directly.",
  },
  {
    name: SITE.contact.secondaryPhone.name,
    role: "Detailer & Operations",
    phone: SITE.contact.secondaryPhone.number,
    tel: SITE.contact.secondaryPhone.tel,
    bio: "Sam handles deeper details, prep, and the second set of hands on bigger jobs. Reach Sam directly when Luc's already on a job.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <section
        aria-label="About hero"
        data-hero
        className="relative bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(11,37,69,0.6)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            About
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            About Crystal Coat Mobile.
          </h1>
        </div>
      </section>

      <section
        aria-label="Our story"
        className="bg-bone py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 text-lg text-ink leading-relaxed">
          <p>
            Crystal Coat Mobile is a premium mobile detailing service based in
            Port Coquitlam. We specialize in deep interior cleaning and
            high-quality exterior detailing to bring your vehicle back to that
            fresh, like-new feeling.
          </p>
          <p>
            It's not just about having a clean car — it's about how it feels
            to drive something that looks taken care of again.
          </p>
          <p>
            We take our time with every detail, making sure your interior
            feels refreshed and your exterior has that clean, glossy finish.
            Best part — we come to you, so it's simple and convenient.
          </p>
          <p className="font-display text-xl font-bold text-navy">
            Reliable, high-quality service built on real results.
          </p>
        </div>
      </section>

      <WhyCrystalCoat
        heading="What makes us different"
        subhead="Premium detailing without the dealership runaround."
      />

      {/* Meet the team */}
      <section aria-label="Meet the team" className="bg-white py-16 md:py-24 border-y border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            The team
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Meet {SITE.contact.primaryPhone.name} &amp; {SITE.contact.secondaryPhone.name}.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Direct communication is part of why we exist. Skip the call
            centre — text or call us yourself.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TEAM.map((person) => (
              <article
                key={person.name}
                className="rounded-xl border border-border bg-bone p-6"
              >
                {/* PHOTO PLACEHOLDER: drop a square headshot at
                    /public/team/{first-name-lowercase}.jpg and replace this
                    block with a next/image. */}
                <div
                  aria-hidden="true"
                  className="h-20 w-20 rounded-full bg-gradient-to-br from-navy to-ink border-2 border-gold/30 flex items-center justify-center font-display text-2xl font-extrabold text-gold"
                >
                  {person.name.charAt(0)}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                  {person.name}
                </h3>
                <p className="mt-1 text-xs font-bold tracking-[0.18em] uppercase text-gold">
                  {person.role}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {person.bio}
                </p>
                <a
                  href={`tel:${person.tel}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2 hover:text-blue"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {person.phone}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}

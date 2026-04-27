// HOW TO ADD PHOTOS:
// 1. Drop image files into /public/gallery/. Accepted extensions: .jpg .jpeg
//    .png .webp .avif .svg.
// 2. Filename becomes the alt text (kebab/underscore → spaces, title-cased).
//    e.g. `2025-09-12_civic-exterior.jpg` → "Civic exterior — Crystal Coat
//    Mobile detailing".
// 3. Optional: prefix the filename with YYYY-MM-DD to control ordering —
//    newest first. Without a date prefix, files sort alphabetically and
//    appear after all dated files.
// 4. Rebuild (or restart dev) — getGalleryImages() reads the directory at
//    request time on the server, so a refresh is enough in dev.
// 5. The placeholder SVGs in /public/gallery/ can be deleted once you have
//    real photos.

import type { Metadata } from "next";
import { CTABand } from "@/components/sections/cta-band";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Detailing Gallery — Real Cars",
  description:
    "Real before-and-afters from Crystal Coat Mobile. Hand-detailed in Port Coquitlam & Coquitlam — exterior, interior steam, paint sealant. See our recent work.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <section
        aria-label="Gallery hero"
        data-hero
        className="relative bg-ink text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.6)_0%,#0A0A0A_75%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 pb-12 lg:pt-40 lg:pb-16">
          <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
            Our work
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Real cars. Real results.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">
            Every detail done by hand in Port Coquitlam and Coquitlam. Tap any
            photo to view it full size — use the arrow keys (or the buttons)
            to scrub through the set.
          </p>
        </div>
      </section>

      <section aria-label="Gallery" className="bg-bone py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={images} />
          {images.length > 0 && (
            <p className="mt-8 text-center text-xs text-muted-foreground">
              {images.length} {images.length === 1 ? "photo" : "photos"}.
              More work added after every detail — drop back any time.
            </p>
          )}
        </div>
      </section>

      <CTABand
        heading="Want yours to look like this?"
        subhead="Pick a date and we'll come to you. Confirmation by email or text within a few hours."
      />
    </>
  );
}

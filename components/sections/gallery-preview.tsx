import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGalleryImages } from "@/lib/gallery";

type GalleryPreviewProps = {
  heading?: string;
  subhead?: string;
  count?: number;
};

export function GalleryPreview({
  heading = "Real cars. Real results.",
  subhead = "Every detail done by hand. Tap any photo to see the full gallery.",
  count = 6,
}: GalleryPreviewProps) {
  const images = getGalleryImages().slice(0, count);

  return (
    <section
      aria-label="Gallery preview"
      className="relative bg-ink text-white py-16 md:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Gallery
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            {subhead}
          </p>
        </div>

        {images.length === 0 ? (
          <p className="mt-10 text-sm text-white/50 italic">
            Gallery photos coming soon.
          </p>
        ) : (
          <Link
            href="/gallery"
            aria-label="Open full gallery"
            className="mt-10 md:mt-14 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 group/grid"
          >
            {images.map((img) => (
              <div
                key={img.filename}
                className="relative aspect-[3/2] overflow-hidden rounded-lg border border-white/10 transition-all hover:border-gold hover:-translate-y-0.5 hover:shadow-xl bg-ink/60"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/grid:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </Link>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-white transition-colors"
          >
            View full gallery
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

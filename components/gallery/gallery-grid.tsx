"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return null;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);
  const next = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return null;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next]);

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-bone p-12 text-center">
        <ImageOff
          className="mx-auto h-8 w-8 text-muted"
          aria-hidden="true"
        />
        <p className="mt-3 font-display text-lg font-bold text-ink">
          Photos coming soon.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Real before-and-afters will land here as we wrap details.
        </p>
      </div>
    );
  }

  const currentImage = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <ul className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.filename}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open ${img.alt}`}
              className={cn(
                "group relative block w-full aspect-[3/2] overflow-hidden rounded-xl border border-border bg-ink/5",
                "transition-all hover:border-gold hover:-translate-y-0.5 hover:shadow-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="bg-ink text-white border-0 p-0 sm:max-w-5xl w-full max-w-[calc(100%-1rem)] rounded-xl overflow-hidden ring-1 ring-white/10"
        >
          {currentImage && (
            <div className="relative">
              <div className="relative w-full aspect-[3/2] bg-ink">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  priority
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-white/10">
                <p className="text-sm text-white/85 leading-snug">
                  {currentImage.alt}
                </p>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold whitespace-nowrap">
                  {(openIndex ?? 0) + 1} / {images.length}
                </span>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-white border border-white/20 hover:bg-gold hover:text-ink hover:border-gold transition-colors backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-white border border-white/20 hover:bg-gold hover:text-ink hover:border-gold transition-colors backdrop-blur-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <button
                type="button"
                aria-label="Close gallery"
                onClick={close}
                className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-white border border-white/20 hover:bg-gold hover:text-ink hover:border-gold transition-colors backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

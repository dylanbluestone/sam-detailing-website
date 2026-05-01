"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Phone, RotateCcw } from "lucide-react";
import { SITE } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[crystal-coat] route error:", error);
  }, [error]);

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
          className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gold/10"
        >
          <AlertTriangle className="h-7 w-7 text-gold" />
        </span>
        <p className="mt-6 font-display text-[10px] font-bold tracking-[0.32em] uppercase text-gold">
          Something went sideways
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
          That's on us — sorry.
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed">
          The page hit an unexpected error. The fastest path to getting your
          car booked is to call or text us directly. We'll handle it from
          there.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-white/40">
            Reference: <span className="font-mono">{error.digest}</span>
          </p>
        )}

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 max-w-md">
          <a
            href={`tel:${SITE.contact.primaryPhone.tel}`}
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {SITE.contact.primaryPhone.number}
          </a>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </div>
  );
}

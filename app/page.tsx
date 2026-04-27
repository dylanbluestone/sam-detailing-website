import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <section
      aria-label="Hero"
      data-hero
      className="relative min-h-[100svh] bg-ink text-white overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(11,37,69,0.65)_0%,#0A0A0A_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 text-center pt-24 pb-20">
        <span className="font-display text-[10px] font-bold tracking-[0.32em] uppercase text-gold">
          Mobile Auto Detailing · {SITE.serviceAreas.join(" + ")}
        </span>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
          {SITE.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed">
          {SITE.description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/book"
            className="inline-flex h-12 px-8 items-center justify-center rounded-lg bg-gold text-ink font-semibold tracking-wide hover:bg-gold/90 transition-colors"
          >
            Book Your Detail
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 px-8 items-center justify-center rounded-lg border border-white/30 text-white font-medium hover:border-gold hover:text-gold transition-colors"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}

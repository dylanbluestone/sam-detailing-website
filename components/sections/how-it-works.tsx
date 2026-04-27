import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Book online or call",
    body: "Tell us your vehicle and what it needs.",
  },
  {
    n: 2,
    title: "We confirm your slot",
    body: "Within a few hours by email or text.",
  },
  {
    n: 3,
    title: "We show up and detail",
    body: "Driveway, parking lot, wherever your car lives.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      aria-label="How it works"
      className="relative bg-ink text-white py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Three steps from request to clean car.
          </h2>
        </div>

        <ol className="mt-10 md:mt-14 grid gap-6 md:gap-4 md:grid-cols-3 relative">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-gold/10 font-display text-lg font-extrabold text-gold"
              >
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                {step.body}
              </p>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="hidden md:block absolute -right-3 top-12 h-6 w-6 text-gold/60"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { Clock, MapPin, MessageSquare, Sparkles } from "lucide-react";

const PILLARS = [
  {
    Icon: MapPin,
    title: "Mobile service",
    body: "We come to you, at home or at work.",
  },
  {
    Icon: Clock,
    title: "Not rushed",
    body: "We take the time to do every detail right.",
  },
  {
    Icon: Sparkles,
    title: "Real before-and-afters",
    body: "We let our work speak for itself.",
  },
  {
    Icon: MessageSquare,
    title: "Direct communication",
    body: "Text or call Luc directly. No call centres, no runaround.",
  },
] as const;

type WhyCrystalCoatProps = {
  heading?: string;
  subhead?: string;
};

export function WhyCrystalCoat({
  heading = "Why Crystal Coat",
  subhead = "Premium detailing without the dealership runaround.",
}: WhyCrystalCoatProps) {
  return (
    <section
      aria-label={heading}
      className="bg-bone py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            What sets us apart
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            {heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subhead}
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

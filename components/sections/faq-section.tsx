import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/faqs";

type FAQSectionProps = {
  heading?: string;
  subhead?: string;
  items?: readonly { q: string; a: string }[];
  showAllLink?: boolean;
  variant?: "light" | "preview";
  className?: string;
};

export function FAQSection({
  heading = "Frequently asked questions",
  subhead,
  items = FAQS,
  showAllLink = false,
  variant = "light",
  className = "",
}: FAQSectionProps) {
  const isPreview = variant === "preview";

  return (
    <section
      aria-label={heading}
      className={`bg-bone py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            {isPreview ? "FAQ" : "Questions"}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            {heading}
          </h2>
          {subhead && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subhead}
            </p>
          )}
        </div>

        <Accordion className="mt-10 md:mt-12 divide-y divide-border rounded-xl border border-border bg-white px-5">

          {items.map((item, idx) => (
            <AccordionItem key={item.q} value={`item-${idx}`}>
              <AccordionTrigger className="font-display text-base font-bold text-ink py-4 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pr-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {showAllLink && (
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2 hover:text-blue"
            >
              See all FAQs
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

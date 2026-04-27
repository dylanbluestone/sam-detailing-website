// Placeholder logo — replace this component's SVG output with the client's final logo file when delivered.
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoVariant = "light" | "dark";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  href?: string | null;
};

export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  const primaryColor = variant === "light" ? "text-white" : "text-ink";

  const content = (
    <span
      className={cn("inline-flex flex-col leading-none font-display", className)}
      aria-label="Crystal Coat Mobile Auto Spa"
    >
      <span
        className={cn(
          "text-lg sm:text-xl font-extrabold tracking-[0.18em] uppercase",
          primaryColor,
        )}
      >
        Crystal Coat
      </span>
      <span className="mt-1 text-[0.6rem] sm:text-[0.65rem] font-medium tracking-[0.32em] uppercase text-gold">
        Mobile Auto Spa
      </span>
    </span>
  );

  if (href === null) {
    return content;
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {content}
    </Link>
  );
}

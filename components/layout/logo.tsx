// Placeholder logo — replace this component's SVG output with the client's final logo file when delivered.
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoVariant = "light" | "dark";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  href?: string | null;
};

const SVG_WIDTH = 220;
const SVG_HEIGHT = 50;

export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  const primaryFill = variant === "light" ? "#FFFFFF" : "#0A0A0A";
  const accentFill = "#C9A227";

  const svg = (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      role="img"
      aria-label="Crystal Coat Mobile Auto Spa"
      className={cn("h-9 w-auto sm:h-10", className)}
    >
      <text
        x="0"
        y="22"
        fill={primaryFill}
        fontFamily='var(--font-heading), "Plus Jakarta Sans", system-ui, sans-serif'
        fontWeight={800}
        fontSize={22}
        letterSpacing={4.2}
        textLength={SVG_WIDTH - 4}
        lengthAdjust="spacingAndGlyphs"
      >
        CRYSTAL COAT
      </text>
      <text
        x="0"
        y="42"
        fill={accentFill}
        fontFamily='var(--font-heading), "Plus Jakarta Sans", system-ui, sans-serif'
        fontWeight={500}
        fontSize={9}
        letterSpacing={3.6}
        textLength={SVG_WIDTH - 4}
        lengthAdjust="spacingAndGlyphs"
      >
        MOBILE AUTO SPA
      </text>
    </svg>
  );

  if (href === null) {
    return svg;
  }

  return (
    <Link
      href={href}
      aria-label="Crystal Coat Mobile Auto Spa — home"
      className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {svg}
    </Link>
  );
}

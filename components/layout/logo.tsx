import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string | null;
};

export function Logo({ className, href = "/" }: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="Crystal Coat Mobile Auto Spa"
      width={313}
      height={313}
      priority
      className={cn("h-12 w-12 sm:h-14 sm:w-14", className)}
    />
  );

  if (href === null) {
    return image;
  }

  return (
    <Link
      href={href}
      aria-label="Crystal Coat Mobile Auto Spa — home"
      className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {image}
    </Link>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Logo } from "./logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE } from "@/lib/site";
import { PACKAGES } from "@/lib/services";
import { cn } from "@/lib/utils";

const NAV_BEFORE_SERVICES = [{ label: "Home", href: "/" }] as const;
const NAV_AFTER_SERVICES = [
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 100);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-ink/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Logo variant="light" />

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_BEFORE_SERVICES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-gold transition-colors py-2"
              aria-haspopup="true"
            >
              Services
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div
              role="menu"
              className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute left-1/2 top-full -translate-x-1/2 mt-1 w-72 rounded-lg bg-ink border border-white/10 shadow-xl p-2 transition-opacity"
            >
              {PACKAGES.map((pkg) => (
                <Link
                  key={pkg.slug}
                  href={`/services/${pkg.slug}`}
                  role="menuitem"
                  className="block rounded-md px-3 py-2 hover:bg-white/5 focus:bg-white/5 outline-none"
                >
                  <div className="flex items-center justify-between text-sm font-semibold text-white">
                    {pkg.name}
                    {pkg.popular && (
                      <span className="text-[10px] font-bold tracking-[0.18em] text-gold uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-white/60">
                    From ${pkg.startingPrice}
                  </div>
                </Link>
              ))}
              <div className="mt-1 border-t border-white/10 pt-1">
                <Link
                  href="/services"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-xs font-medium text-gold hover:bg-white/5 focus:bg-white/5 outline-none"
                >
                  See all services →
                </Link>
              </div>
            </div>
          </div>

          {NAV_AFTER_SERVICES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={`tel:${SITE.contact.primaryPhone.tel}`}
            className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-gold transition-colors"
            aria-label={`Call ${SITE.contact.primaryPhone.name} at ${SITE.contact.primaryPhone.number}`}
          >
            <Phone className="h-4 w-4" />
            {SITE.contact.primaryPhone.number}
          </a>
          <Link
            href="/book"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg border border-gold text-gold text-sm font-semibold tracking-wide hover:bg-gold hover:text-ink transition-colors"
          >
            Book Now
          </Link>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-ink text-white border-l border-white/10 w-full sm:max-w-sm"
          >
            <SheetTitle className="px-5 pt-5 text-white text-base font-semibold tracking-wide">
              Menu
            </SheetTitle>
            <nav
              aria-label="Mobile primary"
              className="flex flex-col px-5 pt-2 gap-0 flex-1 overflow-y-auto"
            >
              <SheetClose
                render={
                  <Link
                    href="/"
                    className="flex items-center justify-between py-4 border-b border-white/5 text-sm font-medium"
                  >
                    Home
                  </Link>
                }
              />
              <details className="border-b border-white/5 group/services">
                <summary className="flex items-center justify-between py-4 cursor-pointer text-sm font-medium list-none [&::-webkit-details-marker]:hidden">
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open/services:rotate-180" />
                </summary>
                <div className="flex flex-col gap-0 pl-3 pb-2">
                  <SheetClose
                    render={
                      <Link
                        href="/services"
                        className="py-2.5 text-sm text-white/85 hover:text-gold"
                      >
                        All services
                      </Link>
                    }
                  />
                  {PACKAGES.map((pkg) => (
                    <SheetClose
                      key={pkg.slug}
                      render={
                        <Link
                          href={`/services/${pkg.slug}`}
                          className="py-2.5 text-sm text-white/85 hover:text-gold flex items-center justify-between"
                        >
                          <span>{pkg.name}</span>
                          <span className="text-[11px] text-white/50">
                            from ${pkg.startingPrice}
                          </span>
                        </Link>
                      }
                    />
                  ))}
                </div>
              </details>
              <SheetClose
                render={
                  <Link
                    href="/gallery"
                    className="py-4 border-b border-white/5 text-sm font-medium"
                  >
                    Gallery
                  </Link>
                }
              />
              <SheetClose
                render={
                  <Link
                    href="/about"
                    className="py-4 border-b border-white/5 text-sm font-medium"
                  >
                    About
                  </Link>
                }
              />
              <SheetClose
                render={
                  <Link
                    href="/faq"
                    className="py-4 border-b border-white/5 text-sm font-medium"
                  >
                    FAQ
                  </Link>
                }
              />
              <SheetClose
                render={
                  <Link
                    href="/contact"
                    className="py-4 border-b border-white/5 text-sm font-medium"
                  >
                    Contact
                  </Link>
                }
              />
              <a
                href={`tel:${SITE.contact.primaryPhone.tel}`}
                className="py-4 flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80"
              >
                <Phone className="h-4 w-4" /> {SITE.contact.primaryPhone.number}
              </a>
            </nav>
            <div className="mt-auto p-5 border-t border-white/10">
              <SheetClose
                render={
                  <Link
                    href="/book"
                    className="inline-flex w-full items-center justify-center h-11 rounded-lg bg-gold text-ink font-semibold tracking-wide hover:bg-gold/90 transition-colors"
                  >
                    Book Now
                  </Link>
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

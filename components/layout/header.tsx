"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openServices = useCallback(() => {
    cancelScheduledClose();
    setServicesOpen(true);
  }, [cancelScheduledClose]);

  const scheduleCloseServices = useCallback(() => {
    cancelScheduledClose();
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
      closeTimeoutRef.current = null;
    }, 180);
  }, [cancelScheduledClose]);

  // Always clean up the timeout on unmount.
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close services dropdown on outside click + Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const closeServices = useCallback(() => setServicesOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-ink/95 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-normal">
        <div className="lg:justify-self-start">
          <Logo />
        </div>

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

          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
            onFocus={openServices}
            onBlur={(e) => {
              // Close only if focus moves OUTSIDE this wrapper entirely.
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                scheduleCloseServices();
              }
            }}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              aria-controls="header-services-menu"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-gold transition-colors py-2 outline-none focus-visible:text-gold"
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>
            {/* Wrapper sits flush against the trigger (top-full, no gap)
                — pt-2 here is hover-friendly transparent space, not a
                visual margin. The cursor can move freely from button
                into menu without leaving the wrapper. */}
            <div
              hidden={!servicesOpen}
              className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <div
                id="header-services-menu"
                role="menu"
                className="w-72 rounded-lg bg-ink border border-white/10 shadow-xl p-2"
              >
                {PACKAGES.map((pkg) => (
                  <Link
                    key={pkg.slug}
                    href={`/services/${pkg.slug}`}
                    role="menuitem"
                    onClick={closeServices}
                    className="block rounded-md px-3 py-2 hover:bg-white/5 focus:bg-white/5 outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-white">
                      {pkg.name}
                      {pkg.popular && (
                        <span className="text-[10px] font-bold tracking-[0.18em] text-gold uppercase">
                          Most Popular
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
                    onClick={closeServices}
                    className="block rounded-md px-3 py-2 text-xs font-medium text-gold hover:bg-white/5 focus:bg-white/5 outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    See all services →
                  </Link>
                </div>
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

        <div className="hidden lg:flex lg:justify-self-end items-center gap-5">
          <a
            href={`tel:${SITE.contact.primaryPhone.tel}`}
            className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-gold transition-colors"
            aria-label={`Call ${SITE.contact.primaryPhone.name} at ${SITE.contact.primaryPhone.number}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
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
                aria-label={`Call ${SITE.contact.primaryPhone.name} at ${SITE.contact.primaryPhone.number}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.contact.primaryPhone.number}
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

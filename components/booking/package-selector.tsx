"use client";

import { Check } from "lucide-react";
import { PACKAGES, VEHICLE_LABELS, type Package, type VehicleType } from "@/lib/services";
import { cn } from "@/lib/utils";

type PackageSelectorProps = {
  name: string;
  value: Package["slug"] | undefined;
  onChange: (value: Package["slug"]) => void;
  vehicleType: VehicleType | undefined;
  invalid?: boolean;
};

export function PackageSelector({
  name,
  value,
  onChange,
  vehicleType,
  invalid,
}: PackageSelectorProps) {
  return (
    <fieldset
      role="radiogroup"
      aria-invalid={invalid || undefined}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {PACKAGES.map((pkg) => {
        const checked = value === pkg.slug;
        const displayPrice = vehicleType
          ? pkg.pricing[vehicleType]
          : pkg.startingPrice;
        const priceSuffix = vehicleType
          ? `${VEHICLE_LABELS[vehicleType]} pricing`
          : "Starting price";

        return (
          <label
            key={pkg.slug}
            className={cn(
              "relative flex cursor-pointer flex-col rounded-xl border-2 bg-white p-5 transition-all",
              "hover:shadow-md",
              checked
                ? "border-navy ring-4 ring-navy/15 shadow-md"
                : "border-border hover:border-blue/40",
              invalid && !checked && "border-destructive/40",
            )}
          >
            {pkg.popular && (
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-ink shadow-sm"
              >
                Most Popular
              </span>
            )}
            <input
              type="radio"
              name={name}
              value={pkg.slug}
              checked={checked}
              onChange={() => onChange(pkg.slug)}
              className="sr-only"
            />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-ink">
                {pkg.name}
              </h3>
              <div className="text-right">
                <div className="font-display text-3xl font-extrabold text-navy">
                  ${displayPrice}
                </div>
                <div className="text-[10px] tracking-wider uppercase text-muted-foreground">
                  {priceSuffix}
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {pkg.tagline}
            </p>
            <ul className="mt-4 space-y-2">
              {pkg.features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex items-start gap-2 text-sm text-ink"
                >
                  <Check
                    className="h-4 w-4 mt-0.5 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold">{feature.title}</span>
                    <span className="block text-xs text-muted-foreground leading-relaxed">
                      {feature.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
              {pkg.durationHours[0]}–{pkg.durationHours[1]} hrs typical
            </div>
            <div
              aria-hidden="true"
              className={cn(
                "mt-4 inline-flex items-center justify-center rounded-md border px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors",
                checked
                  ? "bg-navy text-white border-navy"
                  : "bg-bone text-ink border-border",
              )}
            >
              {checked ? "Selected" : "Choose"}
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}

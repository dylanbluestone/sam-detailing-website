"use client";

import { Car } from "lucide-react";
import type { VehicleType } from "@/lib/services";
import { VEHICLE_LABELS } from "@/lib/services";
import { cn } from "@/lib/utils";

type VehicleTypeSelectorProps = {
  name: string;
  value: VehicleType | undefined;
  onChange: (value: VehicleType) => void;
  invalid?: boolean;
};

const OPTIONS: { value: VehicleType; helper: string }[] = [
  { value: "sedan", helper: "Standard cars and coupes" },
  { value: "suv", helper: "SUVs and crossovers" },
  { value: "truck", helper: "Pickups and 3-row vehicles" },
];

export function VehicleTypeSelector({
  name,
  value,
  onChange,
  invalid,
}: VehicleTypeSelectorProps) {
  return (
    <fieldset
      role="radiogroup"
      aria-invalid={invalid || undefined}
      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
    >
      {OPTIONS.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "relative flex cursor-pointer flex-col items-start rounded-lg border bg-white px-4 py-3.5 transition-all",
              "hover:border-blue/40 hover:shadow-sm",
              checked
                ? "border-navy ring-2 ring-navy/20 bg-navy text-white"
                : "border-border text-ink",
              invalid && !checked && "border-destructive/40",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div className="flex items-center gap-2">
              <Car
                className={cn(
                  "h-4 w-4",
                  checked ? "text-gold" : "text-muted",
                )}
                aria-hidden="true"
              />
              <span className="font-display font-semibold tracking-tight">
                {VEHICLE_LABELS[opt.value]}
              </span>
            </div>
            <span
              className={cn(
                "mt-1 text-xs",
                checked ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {opt.helper}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

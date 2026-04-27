"use client";

import { Check } from "lucide-react";
import { ADD_ONS } from "@/lib/services";
import { cn } from "@/lib/utils";

type AddOnsSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function AddOnsSelector({ value, onChange }: AddOnsSelectorProps) {
  const toggle = (slug: string) => {
    if (value.includes(slug)) {
      onChange(value.filter((s) => s !== slug));
    } else {
      onChange([...value, slug]);
    }
  };

  return (
    <div role="group" className="grid gap-3 sm:grid-cols-2">
      {ADD_ONS.map((addon) => {
        const checked = value.includes(addon.slug);
        const id = `addon-${addon.slug}`;
        return (
          <label
            key={addon.slug}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border bg-white px-4 py-3.5 transition-all",
              "hover:border-blue/40 hover:shadow-sm",
              checked
                ? "border-navy ring-2 ring-navy/15"
                : "border-border",
            )}
          >
            <input
              id={id}
              type="checkbox"
              checked={checked}
              onChange={() => toggle(addon.slug)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                checked
                  ? "border-navy bg-navy text-gold"
                  : "border-border bg-white text-transparent",
              )}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-display font-semibold text-ink">
                  {addon.name}
                </span>
                <span className="text-sm font-bold text-navy whitespace-nowrap">
                  +${addon.startingPrice}
                </span>
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground leading-relaxed">
                {addon.description}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

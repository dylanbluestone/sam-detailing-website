"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Controller,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import { BookingSchema, type BookingInput } from "@/lib/schemas";
import {
  PACKAGES,
  ADD_ONS,
  VEHICLE_LABELS,
  type VehicleType,
} from "@/lib/services";
import {
  SERVICE_CITIES,
  OTHER_LOWER_MAINLAND_CITIES,
  isInServiceArea,
} from "@/lib/cities";
import { SITE } from "@/lib/site";
import { formatSlotLabel } from "@/lib/booking";
import { format, parse } from "date-fns";

import { VehicleTypeSelector } from "./vehicle-type-selector";
import { PackageSelector } from "./package-selector";
import { AddOnsSelector } from "./addons-selector";
import { TimeSlotPicker } from "./time-slot-picker";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const FIELD_INPUT = "h-11 px-3 text-sm";

// Zod's `.default([])` on addOns makes its INPUT type optional but its OUTPUT
// type required — so we feed RHF the input shape and tell it the resolver
// produces the output shape.
type BookingFormInput = z.input<typeof BookingSchema>;
type BookingFormOutput = BookingInput;

type DefaultValues = Omit<BookingFormInput, "vehicleType" | "package"> & {
  vehicleType?: VehicleType;
  package?: BookingInput["package"];
};

const PACKAGE_SLUGS = PACKAGES.map((p) => p.slug) as readonly BookingInput["package"][];

function isPackageSlug(value: string | null | undefined): value is BookingInput["package"] {
  return !!value && (PACKAGE_SLUGS as readonly string[]).includes(value);
}

const DEFAULTS: DefaultValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  vehicleMakeModel: "",
  addOns: [],
  preferredDate: "",
  preferredSlot: "",
  alternateTime: "",
  notes: "",
  website: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-destructive"
    >
      <AlertCircle className="h-3.5 w-3.5 mt-px shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function SectionHeader({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold bg-gold/10 text-xs font-bold text-gold mt-0.5"
      >
        {step}
      </span>
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export function BookingForm({
  initialPackage,
}: {
  initialPackage?: string;
} = {}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const presetPackage = isPackageSlug(initialPackage) ? initialPackage : undefined;

  const form = useForm<BookingFormInput, unknown, BookingFormOutput>({
    resolver: zodResolver(BookingSchema),
    mode: "onTouched",
    // Cast through unknown because BookingFormInput requires vehicleType +
    // package, but the form starts with neither selected. RHF supports
    // DeepPartial defaults here.
    defaultValues: {
      ...DEFAULTS,
      ...(presetPackage ? { package: presetPackage } : {}),
    } as unknown as BookingFormInput,
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = form;

  const watchedVehicle = watch("vehicleType");
  const watchedPackage = watch("package");
  const watchedAddOns = watch("addOns") ?? [];
  const watchedCity = watch("city");
  const watchedDate = watch("preferredDate");
  const watchedSlot = watch("preferredSlot");

  const selectedPkg = PACKAGES.find((p) => p.slug === watchedPackage);
  const pkgPrice = selectedPkg
    ? watchedVehicle
      ? selectedPkg.pricing[watchedVehicle]
      : selectedPkg.startingPrice
    : 0;
  const addOnsList = watchedAddOns
    .map((slug) => ADD_ONS.find((a) => a.slug === slug))
    .filter((a): a is (typeof ADD_ONS)[number] => Boolean(a));
  const addOnsTotal = addOnsList.reduce(
    (sum, a) => sum + a.startingPrice,
    0,
  );
  const estimate = pkgPrice + addOnsTotal;

  const dateLabel = watchedDate
    ? (() => {
        try {
          return format(
            parse(watchedDate, "yyyy-MM-dd", new Date()),
            "EEE, MMM d",
          );
        } catch {
          return watchedDate;
        }
      })()
    : null;
  const slotLabelDisplay = watchedSlot ? formatSlotLabel(watchedSlot) : null;

  const onValid: SubmitHandler<BookingFormOutput> = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        fieldErrors?: Record<string, string[] | undefined>;
        formErrors?: string[];
      };

      if (!res.ok || !json.ok) {
        if (json.fieldErrors) {
          Object.entries(json.fieldErrors).forEach(([field, msgs]) => {
            if (Array.isArray(msgs) && msgs.length > 0) {
              setError(field as keyof BookingInput, {
                type: "server",
                message: msgs[0],
              });
            }
          });
        }
        toast.error(json.error ?? "Couldn't submit your request.", {
          description: `Call ${SITE.contact.primaryPhone.name} at ${SITE.contact.primaryPhone.number} and we'll book you in directly.`,
        });
        return;
      }

      router.push("/book/thank-you");
    } catch (err) {
      console.error("[booking-form] submit failed:", err);
      toast.error("Couldn't reach our server.", {
        description: `Call ${SITE.contact.primaryPhone.name} at ${SITE.contact.primaryPhone.number} and we'll book you in directly.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onInvalid = (errs: FieldErrors<BookingFormInput>) => {
    const firstKey = Object.keys(errs)[0];
    toast.error("Please review the highlighted fields.", {
      description: firstKey
        ? `Looks like ${firstKey} needs another look.`
        : undefined,
    });
  };

  const submitButton = (
    <button
      type="submit"
      form="booking-form"
      disabled={submitting}
      className="inline-flex items-center justify-center gap-2 h-12 w-full rounded-lg bg-gold text-ink font-display font-bold tracking-wide hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {submitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Request Booking
        </>
      )}
    </button>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
      <form
        id="booking-form"
        noValidate
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="space-y-12 pb-32 lg:pb-0"
      >
        {/* SECTION 1 — Your Details */}
        <section className="space-y-5">
          <SectionHeader
            step={1}
            title="Your Details"
            description="Just so we know who's booking and how to confirm."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-ink">
                <User className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                Full name
              </Label>
              <Input
                id="name"
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                {...register("name")}
                className={cn(FIELD_INPUT, "mt-1.5")}
              />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-ink">
                <Phone className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="604-555-0100"
                aria-invalid={errors.phone ? true : undefined}
                {...register("phone")}
                className={cn(FIELD_INPUT, "mt-1.5")}
              />
              <FieldError message={errors.phone?.message} />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-ink">
              <Mail className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? true : undefined}
              {...register("email")}
              className={cn(FIELD_INPUT, "mt-1.5")}
            />
            <FieldError message={errors.email?.message} />
          </div>
        </section>

        {/* SECTION 2 — Service Location */}
        <section className="space-y-5">
          <SectionHeader
            step={2}
            title="Service Location"
            description="We come to your driveway, work, or wherever the car lives."
          />
          <div>
            <Label htmlFor="address" className="text-sm font-medium text-ink">
              <MapPin className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              Street address
            </Label>
            <Input
              id="address"
              autoComplete="street-address"
              placeholder="1234 Example St."
              aria-invalid={errors.address ? true : undefined}
              {...register("address")}
              className={cn(FIELD_INPUT, "mt-1.5")}
            />
            <FieldError message={errors.address?.message} />
          </div>
          <div>
            <Label htmlFor="city" className="text-sm font-medium text-ink">
              City
            </Label>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="city"
                    aria-invalid={errors.city ? true : undefined}
                    className={cn(
                      "mt-1.5 w-full justify-between",
                      "data-[size=default]:h-11",
                    )}
                  >
                    <SelectValue placeholder="Choose a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Service Area</SelectLabel>
                      {SERVICE_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Other Lower Mainland</SelectLabel>
                      {OTHER_LOWER_MAINLAND_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.city?.message} />
          </div>
          {watchedCity && !isInServiceArea(watchedCity) && (
            <div
              role="status"
              className="rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm text-ink"
            >
              <p className="font-semibold text-ink">
                {watchedCity} is outside our current service area.
              </p>
              <p className="mt-1 text-muted-foreground">
                We're currently focused on Port Coquitlam and Coquitlam — but
                we're expanding fast. Submit your request and we'll add you to
                our waitlist.
              </p>
            </div>
          )}
        </section>

        {/* SECTION 3 — Your Vehicle */}
        <section className="space-y-5">
          <SectionHeader
            step={3}
            title="Your Vehicle"
            description="Pricing varies by size — pick the closest match."
          />
          <Controller
            control={control}
            name="vehicleType"
            render={({ field }) => (
              <VehicleTypeSelector
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                invalid={!!errors.vehicleType}
              />
            )}
          />
          <FieldError message={errors.vehicleType?.message} />
          <div>
            <Label
              htmlFor="vehicleMakeModel"
              className="text-sm font-medium text-ink"
            >
              Make & model{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="vehicleMakeModel"
              placeholder="e.g. 2019 Toyota RAV4"
              {...register("vehicleMakeModel")}
              className={cn(FIELD_INPUT, "mt-1.5")}
            />
            <FieldError message={errors.vehicleMakeModel?.message} />
          </div>
        </section>

        {/* SECTION 4 — Choose a Package */}
        <section className="space-y-5">
          <SectionHeader
            step={4}
            title="Choose a Package"
            description={
              watchedVehicle
                ? `Showing ${VEHICLE_LABELS[watchedVehicle]} pricing.`
                : "Pick a vehicle type above to see exact pricing."
            }
          />
          <Controller
            control={control}
            name="package"
            render={({ field }) => (
              <PackageSelector
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                vehicleType={watchedVehicle}
                invalid={!!errors.package}
              />
            )}
          />
          <FieldError message={errors.package?.message} />
        </section>

        {/* SECTION 5 — Add-Ons (Optional) */}
        <section className="space-y-5">
          <SectionHeader
            step={5}
            title="Add-Ons"
            description="Optional extras. Add as many as you'd like."
          />
          <Controller
            control={control}
            name="addOns"
            render={({ field }) => (
              <AddOnsSelector
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
        </section>

        {/* SECTION 6 — Pick a Time */}
        <section className="space-y-5">
          <SectionHeader
            step={6}
            title="Pick a Time"
            description="Hourly slots. We need at least 24h to schedule."
          />
          <Controller
            control={control}
            name="preferredDate"
            render={({ field: dateField }) => (
              <Controller
                control={control}
                name="preferredSlot"
                render={({ field: slotField }) => (
                  <TimeSlotPicker
                    date={dateField.value}
                    slot={slotField.value}
                    onDateChange={dateField.onChange}
                    onSlotChange={slotField.onChange}
                    invalidDate={!!errors.preferredDate}
                    invalidSlot={!!errors.preferredSlot}
                  />
                )}
              />
            )}
          />
          <FieldError
            message={errors.preferredDate?.message ?? errors.preferredSlot?.message}
          />
          <div>
            <Label
              htmlFor="alternateTime"
              className="text-sm font-medium text-ink"
            >
              Preferred specific time{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="alternateTime"
              placeholder="e.g. closer to 5:30 PM if possible"
              {...register("alternateTime")}
              className={cn(FIELD_INPUT, "mt-1.5")}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Need a specific time? Let us know — we'll do our best.
            </p>
            <FieldError message={errors.alternateTime?.message} />
          </div>
        </section>

        {/* SECTION 7 — Anything else */}
        <section className="space-y-5">
          <SectionHeader
            step={7}
            title="Anything else?"
            description="Pet hair, deep stains, oversized vehicle, gate codes — let us know."
          />
          <div>
            <Label htmlFor="notes" className="sr-only">
              Notes
            </Label>
            <Textarea
              id="notes"
              rows={5}
              placeholder="Tell us anything that'll help us prep — special access, areas to focus on, etc."
              {...register("notes")}
              className="text-sm min-h-[120px] px-3 py-2.5"
            />
            <FieldError message={errors.notes?.message} />
          </div>
        </section>

        {/* HONEYPOT — hidden from real users */}
        <div aria-hidden="true" className="sr-only">
          <label>
            Don't fill this out if you're human:
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </label>
        </div>

        {/* DESKTOP SUBMIT */}
        <div className="hidden lg:block">
          <p className="mb-3 text-sm text-muted-foreground">
            By submitting, you agree we'll contact you to confirm your booking.
          </p>
          {submitButton}
          <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            No payment until the work is done.
          </p>
        </div>
      </form>

      {/* DESKTOP SUMMARY (lg+) */}
      <aside
        aria-label="Booking summary"
        className="hidden lg:block"
      >
        <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">
            Your booking
          </h3>

          <SummaryRow
            label="Vehicle"
            value={
              watchedVehicle ? VEHICLE_LABELS[watchedVehicle] : "Not chosen"
            }
            empty={!watchedVehicle}
          />

          <SummaryRow
            label="Package"
            value={
              selectedPkg
                ? `${selectedPkg.name} — $${pkgPrice}`
                : "Not chosen"
            }
            empty={!selectedPkg}
          />

          {addOnsList.length > 0 && (
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
                Add-ons
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {addOnsList.map((a) => (
                  <li
                    key={a.slug}
                    className="flex items-center justify-between"
                  >
                    <span className="text-ink">{a.name}</span>
                    <span className="text-navy font-medium">
                      +${a.startingPrice}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <SummaryRow
            label="Date"
            value={
              dateLabel
                ? `${dateLabel}${slotLabelDisplay ? ` · ${slotLabelDisplay}` : ""}`
                : "Not chosen"
            }
            empty={!dateLabel}
          />

          <SummaryRow
            label={watchedCity ? "City" : "Service location"}
            value={watchedCity || "Not chosen"}
            empty={!watchedCity}
          />

          <div className="pt-4 border-t border-border">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
                Estimated total
              </span>
              <span className="font-display text-2xl font-extrabold text-navy">
                ${estimate}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              Final price confirmed on inspection. Heavy soiling, pet messes,
              or oversized vehicles may adjust the quote.
            </p>
          </div>
        </div>
      </aside>

      {/* MOBILE FIXED BOTTOM BAR (< lg) */}
      <div
        aria-label="Booking total"
        className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-gold/30 bg-ink/95 backdrop-blur-sm text-white px-4 py-3"
      >
        <div className="mx-auto max-w-2xl flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-gold">
              Estimated total
            </div>
            <div className="font-display text-xl font-extrabold leading-tight">
              ${estimate}
            </div>
          </div>
          <div className="shrink-0 w-44">{submitButton}</div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  empty,
}: {
  label: string;
  value: string;
  empty?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 text-sm",
          empty ? "text-muted-foreground italic" : "text-ink font-medium",
        )}
      >
        {value}
      </p>
    </div>
  );
}

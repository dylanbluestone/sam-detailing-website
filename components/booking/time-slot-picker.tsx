"use client";

import { useEffect, useMemo, useState } from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatSlotLabel,
  getSlotsForDate,
  isDateBookable,
  BOOKING_CONSTANTS,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

type TimeSlotPickerProps = {
  date: string;
  slot: string;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: string) => void;
  invalidDate?: boolean;
  invalidSlot?: boolean;
};

const DATE_FORMAT = "yyyy-MM-dd";

export function TimeSlotPicker({
  date,
  slot,
  onDateChange,
  onSlotChange,
  invalidDate,
  invalidSlot,
}: TimeSlotPickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const selectedDate = useMemo(() => {
    if (!date) return undefined;
    try {
      return parse(date, DATE_FORMAT, new Date());
    } catch {
      return undefined;
    }
  }, [date]);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return getSlotsForDate(selectedDate);
  }, [selectedDate]);

  // If the user changes day and their previously chosen slot no longer
  // exists for that day, clear it so we don't submit an invalid slot.
  useEffect(() => {
    if (slot && slots.length > 0 && !slots.includes(slot)) {
      onSlotChange("");
    }
  }, [slot, slots, onSlotChange]);

  const dateLabel = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : "Pick a date";

  return (
    <div className="space-y-5">
      <div>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger
            type="button"
            aria-invalid={invalidDate || undefined}
            className={cn(
              "inline-flex items-center gap-2 w-full sm:w-auto justify-between rounded-lg border bg-white px-4 py-2.5 text-left text-sm transition-colors hover:border-blue/40",
              invalidDate ? "border-destructive/60" : "border-border",
            )}
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted" aria-hidden="true" />
              <span className={selectedDate ? "text-ink" : "text-muted-foreground"}>
                {dateLabel}
              </span>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => {
                if (d) {
                  onDateChange(format(d, DATE_FORMAT));
                  setCalendarOpen(false);
                }
              }}
              disabled={(d) => !isDateBookable(d)}
              autoFocus
            />
          </PopoverContent>
        </Popover>
        <p className="mt-2 text-xs text-muted-foreground">
          Earliest booking is {BOOKING_CONSTANTS.MIN_LEAD_HOURS}h from now. We're closed Wednesday and Thursday.
        </p>
      </div>

      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted" aria-hidden="true" />
            <span className="text-sm font-display font-semibold text-ink">
              Available start times for {format(selectedDate, "EEE MMM d")}
            </span>
          </div>
          {slots.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No remaining slots for this day. Pick another date.
            </p>
          ) : (
            <div
              role="radiogroup"
              aria-invalid={invalidSlot || undefined}
              aria-label="Available time slots"
              className="grid grid-cols-3 sm:grid-cols-4 gap-2"
            >
              {slots.map((s) => {
                const checked = slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    onClick={() => onSlotChange(s)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors text-center",
                      checked
                        ? "border-navy bg-navy text-white ring-2 ring-navy/20"
                        : "border-border bg-white text-ink hover:border-blue/40 hover:bg-bone",
                      invalidSlot && !checked && "border-destructive/40",
                    )}
                  >
                    {formatSlotLabel(s)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

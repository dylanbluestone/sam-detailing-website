import { SITE } from "./site";
import { addDays, addHours, isBefore, isAfter, startOfDay, format, parse } from "date-fns";

const MIN_LEAD_HOURS = 24;
const MAX_DAYS_OUT = 60;
const SLOT_INTERVAL_HOURS = 1;
const HOURS_BEFORE_CLOSE_FOR_LAST_SLOT = 3;

const DAY_KEYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"] as const;

export function isDayOpen(date: Date): boolean {
  const key = DAY_KEYS[date.getDay()];
  return SITE.hours[key] !== null;
}

export function isDateBookable(date: Date): boolean {
  const now = new Date();
  const minDate = addHours(now, MIN_LEAD_HOURS);
  const maxDate = addDays(startOfDay(now), MAX_DAYS_OUT);
  if (isBefore(date, startOfDay(minDate))) return false;
  if (isAfter(date, maxDate)) return false;
  return isDayOpen(date);
}

export function getSlotsForDate(date: Date): string[] {
  const key = DAY_KEYS[date.getDay()];
  const hours = SITE.hours[key];
  if (!hours) return [];

  const [openH] = hours.open.split(":").map(Number);
  const [closeH] = hours.close.split(":").map(Number);
  const lastSlotHour = closeH - HOURS_BEFORE_CLOSE_FOR_LAST_SLOT;

  const slots: string[] = [];
  for (let h = openH; h <= lastSlotHour; h += SLOT_INTERVAL_HOURS) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }

  // If today is selected, filter out slots that violate min lead time
  const today = startOfDay(new Date());
  if (startOfDay(date).getTime() === today.getTime()) {
    const cutoff = addHours(new Date(), MIN_LEAD_HOURS);
    return slots.filter((slot) => {
      const slotDate = parse(slot, "HH:mm", date);
      return isAfter(slotDate, cutoff);
    });
  }

  return slots;
}

export function formatSlotLabel(slot: string): string {
  const d = parse(slot, "HH:mm", new Date());
  return format(d, "h:mm a");
}

export const BOOKING_CONSTANTS = {
  MIN_LEAD_HOURS,
  MAX_DAYS_OUT,
};

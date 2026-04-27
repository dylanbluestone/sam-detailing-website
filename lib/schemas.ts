import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().min(10, "Phone is required").max(20),
  address: z.string().trim().min(5, "Service address is required").max(200),
  city: z.string().trim().min(2, "City is required"),
  vehicleType: z.enum(["sedan", "suv", "truck"]),
  vehicleMakeModel: z.string().trim().max(100).optional().or(z.literal("")),
  package: z.enum(["express-clean", "full-detail", "premium-detail"]),
  addOns: z.array(z.string()).default([]),
  preferredDate: z.string().min(1, "Choose a date"),       // ISO date YYYY-MM-DD
  preferredSlot: z.string().min(1, "Choose a time slot"),  // HH:mm
  alternateTime: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;

import nodemailer from "nodemailer";
import type { BookingInput } from "./schemas";
import { PACKAGES, ADD_ONS, VEHICLE_LABELS } from "./services";
import { SITE } from "./site";
import { format, parse } from "date-fns";

interface EmailService {
  sendBookingRequest(data: BookingInput): Promise<void>;
  sendCustomerConfirmation(data: BookingInput): Promise<void>;
}

class GmailService implements EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });

  async sendBookingRequest(data: BookingInput): Promise<void> {
    const pkg = PACKAGES.find((p) => p.slug === data.package)!;
    const price = pkg.pricing[data.vehicleType];
    const addOnList =
      data.addOns
        .map((slug) => ADD_ONS.find((a) => a.slug === slug))
        .filter(Boolean)
        .map((a) => `  • ${a!.name} (from $${a!.startingPrice})`)
        .join("\n") || "  None";

    const dateLabel = format(
      parse(data.preferredDate, "yyyy-MM-dd", new Date()),
      "EEEE, MMMM d, yyyy",
    );
    const slotLabel = format(
      parse(data.preferredSlot, "HH:mm", new Date()),
      "h:mm a",
    );

    const text = `
NEW BOOKING REQUEST — Crystal Coat Mobile

CUSTOMER
  Name:    ${data.name}
  Email:   ${data.email}
  Phone:   ${data.phone}

SERVICE LOCATION
  Address: ${data.address}
  City:    ${data.city}

VEHICLE
  Type:    ${VEHICLE_LABELS[data.vehicleType]}
  Details: ${data.vehicleMakeModel || "(not provided)"}

SERVICE
  Package: ${pkg.name} — $${price} (${VEHICLE_LABELS[data.vehicleType]} pricing)
  Add-ons:
${addOnList}

REQUESTED TIME
  Date:           ${dateLabel}
  Slot:           ${slotLabel}
  Alternate:      ${data.alternateTime || "(none specified)"}

NOTES
${data.notes || "(none)"}

—
Reply directly to this email to confirm with the customer.
    `.trim();

    await this.transporter.sendMail({
      from: `"Crystal Coat Bookings" <${process.env.GMAIL_USER}>`,
      to: process.env.BOOKING_TO!,
      cc: process.env.BOOKING_CC!,
      replyTo: data.email,
      subject: `New Booking — ${data.name} — ${dateLabel} ${slotLabel}`,
      text,
    });
  }

  async sendCustomerConfirmation(data: BookingInput): Promise<void> {
    const pkg = PACKAGES.find((p) => p.slug === data.package)!;
    const dateLabel = format(
      parse(data.preferredDate, "yyyy-MM-dd", new Date()),
      "EEEE, MMMM d, yyyy",
    );
    const slotLabel = format(
      parse(data.preferredSlot, "HH:mm", new Date()),
      "h:mm a",
    );

    const text = `
Hi ${data.name},

Thanks for booking with ${SITE.name}. We've received your request:

  Package:  ${pkg.name}
  Date:     ${dateLabel}
  Time:     ${slotLabel}
  Address:  ${data.address}, ${data.city}

One of us (${SITE.contact.primaryPhone.name} or ${SITE.contact.secondaryPhone.name}) will reply within a few hours to confirm your slot. If you need us sooner, call or text:

  ${SITE.contact.primaryPhone.name} — ${SITE.contact.primaryPhone.number}
  ${SITE.contact.secondaryPhone.name} — ${SITE.contact.secondaryPhone.number}

Talk soon,
${SITE.shortName}
    `.trim();

    await this.transporter.sendMail({
      from: `"${SITE.shortName}" <${process.env.GMAIL_USER}>`,
      to: data.email,
      replyTo: process.env.BOOKING_TO!,
      subject: `We got your booking request — ${SITE.shortName}`,
      text,
    });
  }
}

export const emailService: EmailService = new GmailService();

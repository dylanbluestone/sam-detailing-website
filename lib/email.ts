import { Resend } from "resend";
import { format, parse } from "date-fns";
import type { BookingInput } from "./schemas";
import { ADD_ONS, PACKAGES, VEHICLE_LABELS } from "./services";
import { SITE } from "./site";

interface EmailService {
  sendBookingRequest(data: BookingInput): Promise<void>;
  sendCustomerConfirmation(data: BookingInput): Promise<void>;
}

// `RESEND_FROM` must be a sender on a domain you've verified in the Resend
// dashboard (resend.com/domains). Until you've verified a domain, set it to
// "onboarding@resend.dev" — that sandbox sender works ONLY when delivering
// to email addresses that are on your Resend account, so:
//   • staff booking email (BOOKING_TO) lands fine if BOOKING_TO is on your
//     Resend team
//   • customer confirmation will hit a Resend permission error and the API
//     route's best-effort handler logs and moves on (the customer just
//     doesn't get the auto-reply)
// Once you've verified a real domain, set RESEND_FROM to something like:
//   "Crystal Coat Bookings <bookings@yourdomain.com>"
// and both emails will deliver to anyone.
const FROM_ADDRESS =
  process.env.RESEND_FROM ?? `${SITE.shortName} <onboarding@resend.dev>`;

class ResendEmailService implements EmailService {
  private client = new Resend(process.env.RESEND_API_KEY);

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

    const { error } = await this.client.emails.send({
      from: FROM_ADDRESS,
      to: process.env.BOOKING_TO!,
      cc: process.env.BOOKING_CC ? [process.env.BOOKING_CC] : undefined,
      replyTo: data.email,
      subject: `New Booking — ${data.name} — ${dateLabel} ${slotLabel}`,
      text,
    });

    if (error) {
      throw new Error(
        `Resend booking-request failed: ${error.name} — ${error.message}`,
      );
    }
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

    const { error } = await this.client.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      replyTo: process.env.BOOKING_TO!,
      subject: `We got your booking request — ${SITE.shortName}`,
      text,
    });

    if (error) {
      throw new Error(
        `Resend customer-confirmation failed: ${error.name} — ${error.message}`,
      );
    }
  }
}

export const emailService: EmailService = new ResendEmailService();

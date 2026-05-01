import { format, parse } from "date-fns";
import type { BookingInput } from "./schemas";
import { ADD_ONS, PACKAGES, VEHICLE_LABELS } from "./services";
import { SITE } from "./site";

// FormSubmit (https://formsubmit.co) is a free email-relay service.
// First-ever submission triggers a one-time verification email to
// SITE.contact.primaryEmail. Once that link is clicked, every subsequent
// submission lands directly in the inbox.
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${SITE.contact.primaryEmail}`;

export interface EmailService {
  sendBookingRequest(data: BookingInput): Promise<void>;
}

class FormSubmitService implements EmailService {
  async sendBookingRequest(data: BookingInput): Promise<void> {
    const pkg = PACKAGES.find((p) => p.slug === data.package)!;
    const price = pkg.pricing[data.vehicleType];
    const addOnList =
      data.addOns
        .map((slug) => ADD_ONS.find((a) => a.slug === slug))
        .filter(Boolean)
        .map((a) => `${a!.name} (from $${a!.startingPrice})`)
        .join(", ") || "None";

    const dateLabel = format(
      parse(data.preferredDate, "yyyy-MM-dd", new Date()),
      "EEEE, MMMM d, yyyy",
    );
    const slotLabel = format(
      parse(data.preferredSlot, "HH:mm", new Date()),
      "h:mm a",
    );

    const payload = {
      _subject: `New Booking: ${data.name}, ${dateLabel} ${slotLabel}`,
      _replyto: data.email,
      _template: "table",
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Address: data.address,
      City: data.city,
      "Vehicle Type": VEHICLE_LABELS[data.vehicleType],
      "Vehicle Details": data.vehicleMakeModel || "(not provided)",
      Package: `${pkg.name}, $${price} (${VEHICLE_LABELS[data.vehicleType]} pricing)`,
      "Add-ons": addOnList,
      "Preferred Date": dateLabel,
      "Preferred Time": slotLabel,
      "Alternate Time": data.alternateTime || "(none)",
      Notes: data.notes || "(none)",
    };

    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: process.env.SITE_URL ?? SITE.url,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `FormSubmit failed with HTTP ${response.status}: ${response.statusText}`,
      );
    }

    const result = (await response.json()) as {
      success?: string;
      message?: string;
    };
    if (result.success !== "true") {
      throw new Error(
        `FormSubmit rejected the request: ${result.message ?? "(no message)"}`,
      );
    }
  }
}

export const emailService: EmailService = new FormSubmitService();

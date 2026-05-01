import { NextResponse } from "next/server";
import { z } from "zod";
import { BookingSchema } from "@/lib/schemas";
import { emailService } from "@/lib/email";

export const runtime = "nodejs";

const FRIENDLY_500 =
  "Something went wrong sending your request — please call us at 236-878-9312";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Honeypot check BEFORE schema validation. If a bot filled the hidden
  // `website` field, return 200 silently and don't email — the bot can't
  // tell its submission was rejected.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        fieldErrors: flat.fieldErrors,
        formErrors: flat.formErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    await emailService.sendBookingRequest(data);
  } catch (err) {
    console.error("[booking] sendBookingRequest failed:", err);
    return NextResponse.json(
      { ok: false, error: FRIENDLY_500 },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

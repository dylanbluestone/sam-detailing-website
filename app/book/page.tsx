import type { Metadata } from "next";
import { Clock, Phone, ShieldCheck, Truck } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Mobile Detail",
  description:
    "Request a mobile detailing appointment in Port Coquitlam or Coquitlam. We'll confirm by email or phone within a few hours. No payment until the work is done.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialPackage = Array.isArray(params.package)
    ? params.package[0]
    : params.package;

  return (
    <div className="bg-bone">
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pb-24">
        <div className="max-w-3xl">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase text-gold">
            Mobile · Port Coquitlam + Coquitlam
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-ink">
            Book Your Detail
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            We'll confirm by email or phone within a few hours.
          </p>
          <p className="mt-3 text-sm text-ink">
            Or call at{" "}
            <a
              href={`tel:${SITE.contact.primaryPhone.tel}`}
              className="inline-flex items-center gap-1 font-bold text-navy underline decoration-gold underline-offset-4 decoration-2 hover:text-blue"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {SITE.contact.primaryPhone.number}
            </a>
            .
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <BookingForm initialPackage={initialPackage} />
        </div>

        <div className="mt-16 lg:mt-20 grid gap-6 sm:grid-cols-3 max-w-4xl border-t border-border pt-10">
          <ReassuranceItem
            Icon={Truck}
            title="Mobile service"
            body="We come to you. Driveway, work, anywhere with a parking spot."
          />
          <ReassuranceItem
            Icon={ShieldCheck}
            title="No payment until done"
            body="Pay in person on the day of service. No deposits, no card on file."
          />
          <ReassuranceItem
            Icon={Clock}
            title="1.5–4 hrs depending on package"
            body="Express Cleans run faster; Premium Details take a little longer."
          />
        </div>
      </div>
    </div>
  );
}

function ReassuranceItem({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-sm font-bold text-ink">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}

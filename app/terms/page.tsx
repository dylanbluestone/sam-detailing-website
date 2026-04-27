import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name} — booking, cancellations, pricing, payment, liability, and weather rescheduling.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "April 2026";

export default function TermsPage() {
  return (
    <article className="bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10">
        <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-ink">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-10 text-base text-ink leading-relaxed">
          <Section title="1. About these terms">
            <p>
              These terms apply when you book or receive mobile detailing
              services from {SITE.name} ("{SITE.shortName}", "we", "us",
              "our") in {SITE.region}. By submitting our booking form, calling
              to book, or accepting service, you agree to these terms.
            </p>
          </Section>

          <Section title="2. Bookings are requests, not confirmations">
            <p>
              Submitting our booking form sends us a service request. It is
              not an automatically confirmed appointment. We confirm your
              slot by replying to your email or text — usually within a few
              hours during business hours. Until we reply, your booking is
              not yet scheduled.
            </p>
            <p className="mt-3">
              If you haven't heard back within roughly 24 hours, please call
              or text us at{" "}
              <a
                href={`tel:${SITE.contact.primaryPhone.tel}`}
                className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
              >
                {SITE.contact.primaryPhone.number}
              </a>
              .
            </p>
          </Section>

          <Section title="3. Cancellations and changes">
            <p>
              We ask for at least 24 hours' notice if you need to cancel or
              reschedule. This lets us fill the slot for another customer.
              Cancellations made with less than 24 hours' notice may, at our
              discretion, count toward a future booking deposit if a pattern
              develops. There is no fee for the first late cancellation.
            </p>
            <p className="mt-3">
              No-shows (vehicle not accessible at the confirmed time, no
              advance notice given) may result in a service surcharge on a
              future booking equal to one hour at our standard rate.
            </p>
          </Section>

          <Section title="4. Pricing is a starting estimate">
            <p>
              The prices shown on the website are starting prices for each
              vehicle type. The final price is confirmed onsite after a brief
              visual inspection. Conditions that may adjust the final quote
              include:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>Heavy soiling — mud, dried mess, dust accumulation beyond normal use</li>
              <li>Pet hair or pet messes (also available as a flat-rate add-on)</li>
              <li>Smoke or odour treatment beyond standard cleaning</li>
              <li>Oversized vehicles, lifted trucks, or vehicles with non-standard configurations</li>
              <li>Spilled food, drinks, biohazards, or anything requiring specialized cleaning</li>
            </ul>
            <p className="mt-3">
              We will quote any adjusted price before starting work. You can
              decline and pay only for any baseline service already
              completed, or proceed at the adjusted price.
            </p>
          </Section>

          <Section title="5. Payment">
            <p>
              Payment is taken in person on the day of service, after the
              detail is complete. We do not store payment information and do
              not collect deposits at booking. Accepted methods are confirmed
              when we reply to your booking request.
            </p>
          </Section>

          <Section title="6. Service area">
            <p>
              We currently serve {SITE.serviceAreas.join(" and ")}. Bookings
              outside this area are accepted at our discretion and may
              require a travel surcharge. {SITE.expansionNote} If your city
              isn't in our service area when you book, we'll add you to a
              waitlist and reply when we expand to you.
            </p>
            <p className="mt-3">
              You are responsible for providing a safe parking spot, access
              to the vehicle, and (when noted in advance) access to a power
              outlet. Lack of access may require us to reschedule.
            </p>
          </Section>

          <Section title="7. Liability and pre-existing damage">
            <p>
              We take reasonable care while detailing your vehicle, including
              using safe products, low-pressure water, and microfiber
              materials chosen for paint safety. That said, detailing can
              reveal — and is not designed to repair — pre-existing
              conditions, including but not limited to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>Faded or peeling clear coat</li>
              <li>Existing paint chips, scratches, or swirl marks</li>
              <li>Worn or stained interior fabric, leather cracking, sun damage</li>
              <li>Loose trim, decorative wraps with poor adhesion, aftermarket components</li>
              <li>Mechanical or electrical issues</li>
            </ul>
            <p className="mt-3">
              We are not responsible for damage caused by, or worsening of,
              pre-existing conditions during the normal course of detailing.
              If you are aware of any of the above on your vehicle, please
              tell us before service so we can adjust our approach.
            </p>
            <p className="mt-3">
              <strong>Personal valuables</strong>: please remove cash,
              jewelry, electronics, and other valuables from the vehicle
              before service. We are not responsible for items left in the
              vehicle. Items found during cleaning are placed in plain sight
              (typically the driver's seat) and pointed out before we leave.
            </p>
          </Section>

          <Section title="8. Weather and outdoor conditions">
            <p>
              Mobile detailing depends on weather. We may reschedule or
              recommend rescheduling when conditions would meaningfully
              affect service quality — heavy rain or snow, high winds,
              freezing temperatures, smoke advisories, or similar. We'll
              reach out as soon as we can if a reschedule is needed and work
              with you to find another time. There is no fee for a
              weather-driven reschedule.
            </p>
            <p className="mt-3">
              Sheltered locations (covered driveways, garages, undercover
              parkades) may allow us to proceed in conditions where outdoor
              detailing isn't viable. Let us know in advance if you have
              that option.
            </p>
          </Section>

          <Section title="9. Photography">
            <p>
              We may photograph completed work for our portfolio, social
              media, and website gallery. Photos focus on the vehicle and
              its finish — not license plates, faces, or property
              identifiers. If you'd prefer we don't photograph your vehicle,
              let us know in your booking notes or onsite and we'll skip it.
            </p>
          </Section>

          <Section title="10. Limitation of liability">
            <p>
              To the maximum extent permitted by law, our total liability
              for any claim related to a single booking is limited to the
              amount paid for that booking. We are not liable for indirect,
              consequential, or incidental damages. This does not limit any
              consumer rights you have under British Columbia law that
              cannot be waived.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p>
              These terms are governed by the laws of the Province of
              British Columbia and the federal laws of Canada applicable
              there. Any dispute that can't be resolved directly will be
              brought before a court of competent jurisdiction in British
              Columbia.
            </p>
          </Section>

          <Section title="12. Changes">
            <p>
              We may update these terms when our service or the law
              changes. The "Last updated" date at the top reflects the most
              recent revision. Continuing to book after an update means you
              accept the updated terms.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              Questions about these terms? Email{" "}
              <a
                href={`mailto:${SITE.contact.primaryEmail}`}
                className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
              >
                {SITE.contact.primaryEmail}
              </a>{" "}
              or call {SITE.contact.primaryPhone.name} at{" "}
              <a
                href={`tel:${SITE.contact.primaryPhone.tel}`}
                className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
              >
                {SITE.contact.primaryPhone.number}
              </a>
              .
            </p>
          </Section>
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          See also our <Link href="/privacy" className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2">Privacy Policy</Link>.
        </p>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

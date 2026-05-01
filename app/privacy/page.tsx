import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Crystal Coat Mobile Auto Spa: what we collect, how we use it, third parties, your rights under PIPA (BC) and PIPEDA, and contact details.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "April 2026";

export default function PrivacyPage() {
  return (
    <article className="bg-bone py-20 lg:py-28">
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10">
        <p className="font-display text-[11px] font-bold tracking-[0.32em] uppercase text-gold">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-ink">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-10 text-base text-ink leading-relaxed">
          <Section title="1. Who we are">
            <p>
              {SITE.name} (referred to in this policy as "{SITE.shortName}",
              "we", "us", or "our") is a mobile auto detailing service based
              in {SITE.city}, {SITE.region}. You can reach us about anything
              in this policy by emailing{" "}
              <a
                href={`mailto:${SITE.contact.primaryEmail}`}
                className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
              >
                {SITE.contact.primaryEmail}
              </a>
              .
            </p>
          </Section>

          <Section title="2. What we collect">
            <p>
              When you submit our booking form we collect the information you
              provide:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>Your name, email address, and phone number</li>
              <li>The service address (where you'd like the detail performed) and your city</li>
              <li>Vehicle type (sedan, SUV, truck) and optionally make / model</li>
              <li>The package and any add-ons you've selected</li>
              <li>Your preferred date and time slot, and any free-text notes you add</li>
            </ul>
            <p className="mt-3">
              We do not collect payment information through the website.
              Payment is taken in person on the day of service.
            </p>
            <p className="mt-3">
              We collect basic technical information automatically, such as
              your IP address and browser, when you visit the site. This is
              standard server log data used to keep the site secure and
              functional.
            </p>
          </Section>

          <Section title="3. How we use it">
            <p>We use the information you submit only to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>Reply to your booking request and confirm a time slot</li>
              <li>Reach you about scheduling changes, weather rescheduling, or onsite logistics</li>
              <li>Provide the service you've requested</li>
              <li>Respond to questions you send us by phone or email</li>
            </ul>
            <p className="mt-3">
              We do not use your information to market unrelated services or
              build profiles about you.
            </p>
          </Section>

          <Section title="4. Where it's stored">
            <p>
              Booking form submissions are sent by email to{" "}
              <a
                href={`mailto:${SITE.contact.primaryEmail}`}
                className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
              >
                {SITE.contact.primaryEmail}
              </a>{" "}
              and stored in that Google Workspace / Gmail mailbox. Google's
              data handling and security practices apply to that storage.
            </p>
            <p className="mt-3">
              We do not maintain a separate customer database. Your booking
              email and any follow-up correspondence are the only records we
              keep. Old booking emails are deleted periodically when they're
              no longer needed.
            </p>
          </Section>

          <Section title="5. Third parties">
            <p>The site uses a small number of third-party services:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>
                <strong>Gmail (Google)</strong> — to deliver booking emails
                and confirmation emails to customers.
              </li>
              <li>
                <strong>Google Maps embed</strong> — used on our Contact and
                location landing pages. When the map loads, Google may set
                cookies and receive your IP address; that's governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
                >
                  Google's Privacy Policy
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with
              advertising or marketing third parties.
            </p>
          </Section>

          <Section title="6. Cookies and analytics">
            <p>
              The booking form does not require any cookies. We may add
              Google Analytics 4 in the future to understand which pages
              visitors use most. If we do, it will be configured with IP
              anonymization enabled and will not identify you personally.
              We'll update this policy and note the change above when that
              happens.
            </p>
          </Section>

          <Section title="7. Your rights (PIPA BC and PIPEDA)">
            <p>
              Under British Columbia's <em>Personal Information Protection
              Act</em> (PIPA) and Canada's <em>Personal Information Protection
              and Electronic Documents Act</em> (PIPEDA), you have the right
              to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>Access the personal information we hold about you</li>
              <li>Correct information that is inaccurate</li>
              <li>Request deletion of your information when it's no longer needed for the purpose it was collected</li>
              <li>Withdraw consent for our use of your information at any time</li>
            </ul>
            <p className="mt-3">
              To make any of these requests, email us at{" "}
              <a
                href={`mailto:${SITE.contact.primaryEmail}`}
                className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
              >
                {SITE.contact.primaryEmail}
              </a>{" "}
              with the email address or phone number you used to book. We
              aim to respond within 30 days.
            </p>
          </Section>

          <Section title="8. We never sell your data">
            <p>
              We do not sell, rent, or trade your personal information to
              anyone. The only people who see your booking details are the
              two of us ({SITE.contact.primaryPhone.name} and{" "}
              {SITE.contact.secondaryPhone.name}) and Google as our email
              provider.
            </p>
          </Section>

          <Section title="9. Children">
            <p>
              The website and our services are intended for adults able to
              authorize work on a vehicle. We do not knowingly collect
              personal information from anyone under 13.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p>
              We may update this policy when our practices change, or when
              required by law. The "Last updated" date at the top of this
              page will reflect the most recent revision. Significant changes
              that affect how we use existing customer information will be
              communicated by email when reasonably possible.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              For privacy questions, requests, or concerns:
            </p>
            <ul className="mt-3 list-none pl-0 space-y-1.5">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${SITE.contact.primaryEmail}`}
                  className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
                >
                  {SITE.contact.primaryEmail}
                </a>
              </li>
              <li>
                Phone: {SITE.contact.primaryPhone.name} —{" "}
                <a
                  href={`tel:${SITE.contact.primaryPhone.tel}`}
                  className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2"
                >
                  {SITE.contact.primaryPhone.number}
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              If you're not satisfied with our response, you can contact the
              Office of the Information and Privacy Commissioner for British
              Columbia (oipc.bc.ca) or the Office of the Privacy Commissioner
              of Canada (priv.gc.ca).
            </p>
          </Section>
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          See also our <Link href="/terms" className="font-semibold text-navy underline decoration-gold underline-offset-4 decoration-2">Terms of Service</Link>.
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

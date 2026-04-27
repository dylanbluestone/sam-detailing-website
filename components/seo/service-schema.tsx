import { JsonLd } from "./json-ld";
import { VEHICLE_LABELS, type Package } from "@/lib/services";
import { SITE } from "@/lib/site";

export function ServiceSchema({ pkg }: { pkg: Package }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${pkg.slug}#service`,
    name: pkg.name,
    description: `${pkg.tagline} ${pkg.description}`,
    serviceType: "Mobile Auto Detailing",
    url: `${SITE.url}/services/${pkg.slug}`,
    provider: {
      "@type": "AutomotiveBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.contact.primaryPhone.tel,
      email: SITE.contact.primaryEmail,
    },
    areaServed: SITE.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    offers: (["sedan", "suv", "truck"] as const).map((vt) => ({
      "@type": "Offer",
      name: `${pkg.name} — ${VEHICLE_LABELS[vt]}`,
      price: pkg.pricing[vt],
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/book?package=${pkg.slug}`,
    })),
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      description: SITE.hoursDisplay.join(" · "),
    },
    termsOfService: `${SITE.url}/terms`,
  };

  return <JsonLd data={data} id={`schema-service-${pkg.slug}`} />;
}

import { JsonLd } from "./json-ld";
import { PACKAGES } from "@/lib/services";
import { SITE } from "@/lib/site";

const DAY_NAMES: Record<keyof typeof SITE.hours, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function buildOpeningHoursSpec() {
  const result: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string;
    opens: string;
    closes: string;
  }> = [];
  for (const day of Object.keys(SITE.hours) as (keyof typeof SITE.hours)[]) {
    const hours = SITE.hours[day];
    if (!hours) continue;
    result.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_NAMES[day],
      opens: hours.open,
      closes: hours.close,
    });
  }
  return result;
}

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}${SITE.ogImage}`,
    telephone: SITE.contact.primaryPhone.tel,
    email: SITE.contact.primaryEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.regionCode,
      addressCountry: SITE.countryCode,
    },
    areaServed: SITE.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: SITE.region,
      },
    })),
    priceRange: "$$",
    openingHoursSpecification: buildOpeningHoursSpec(),
    sameAs: [SITE.social.instagram, SITE.social.tiktok],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile Detailing Packages",
      itemListElement: PACKAGES.map((pkg) => ({
        "@type": "Offer",
        url: `${SITE.url}/services/${pkg.slug}`,
        priceCurrency: "CAD",
        price: pkg.startingPrice,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: pkg.pricing.sedan,
          maxPrice: pkg.pricing.truck,
          priceCurrency: "CAD",
        },
        itemOffered: {
          "@type": "Service",
          name: pkg.name,
          description: pkg.tagline,
        },
      })),
    },
    foundingDate: String(SITE.founded),
  };

  return <JsonLd data={data} id="schema-local-business" />;
}

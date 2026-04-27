import { JsonLd } from "./json-ld";
import { SITE } from "@/lib/site";

export type Breadcrumb = {
  name: string;
  /** Path starting with "/" — joined with SITE.url. */
  path: string;
};

export function BreadcrumbSchema({
  trail,
  id,
}: {
  trail: Breadcrumb[];
  id?: string;
}) {
  if (trail.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE.url}${b.path}`,
    })),
  };

  return <JsonLd data={data} id={id ?? "schema-breadcrumb"} />;
}

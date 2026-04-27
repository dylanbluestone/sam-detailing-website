import { JsonLd } from "./json-ld";

type FAQItem = { q: string; a: string };

export function FAQSchema({
  items,
  id,
}: {
  items: readonly FAQItem[];
  id?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return <JsonLd data={data} id={id ?? "schema-faq"} />;
}

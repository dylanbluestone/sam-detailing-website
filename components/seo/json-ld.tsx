// Server component that emits a JSON-LD <script>. Used by the schema
// components in this directory. Escapes "</" so script content can't be
// closed prematurely via injected user data (defense in depth — most schema
// inputs are constants from lib/, but this keeps it safe if dynamic copy
// ever flows in).

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  /** Optional id for the script tag — handy when multiple schemas live on one page. */
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

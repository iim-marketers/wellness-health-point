/**
 * Renders schema.org structured data into the page.
 *
 * `JSON.stringify` escapes nothing HTML-ish, so a stray `<` in any string
 * would close the script tag early and spill markup into the document; the
 * replace below turns it into its unicode escape, as the Next.js docs advise.
 *
 * Pass an array to emit several unrelated graphs in one tag.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

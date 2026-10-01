import { serializeJsonLd, type JsonLdValue } from "@/lib/seo/json-ld";

export function JsonLd({ value }: Readonly<{ value: JsonLdValue | null }>) {
  if (!value) return null;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }} />;
}

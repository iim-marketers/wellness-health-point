import { site } from "@/lib/site";

/**
 * Edge-to-edge Google Map. Deliberately rendered outside any container so it
 * spans the full viewport width with no horizontal padding or margin.
 *
 * Renders nothing when `NEXT_PUBLIC_MAP_EMBED_URL` is unset — same convention
 * as the footer's social links.
 */
export default function MapSection() {
  if (!site.mapEmbed) return null;

  return (
    <section className="leading-none" aria-label={`Map to ${site.name}`}>
      <iframe
        title={`Map to ${site.name}`}
        src={site.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-75 w-full border-0 sm:h-85 md:h-100 lg:h-115"
      />
    </section>
  );
}

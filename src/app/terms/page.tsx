import type { Metadata } from "next";

import Hero from "@/components/layout/Hero";
import PolicyLayout, {
  type PolicySectionView,
} from "@/components/policies/PolicyLayout";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { OG_IMAGES, pageMetadata } from "@/lib/metadata";
import {
  TERMS_LAST_UPDATED,
  TERMS_PATH,
  termsSections,
} from "@/lib/policies/terms";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that govern use of the ${site.name} website, including appointment requests and our healthcare disclaimer.`,
  path: TERMS_PATH,
  image: { ...OG_IMAGES.clinic, alt: `${site.name} in ${site.address}` },
});

/** "Doctor and Healthcare Professional Information" → "doctor-and-healthcare-professional-information" */
function toAnchor(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const sections: PolicySectionView[] = [
  ...termsSections.map((section) => ({
    id: toAnchor(section.title),
    title: section.title,
    content: (
      <>
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="mb-3 leading-relaxed last:mb-0">
            {paragraph}
          </p>
        ))}
        {section.items ? (
          <ul className="grid list-disc gap-2 pl-5 leading-relaxed marker:text-primary">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </>
    ),
  })),
  {
    id: "contact-us",
    title: "Contact Us",
    content: (
      <>
        <p className="leading-relaxed">{site.name}</p>
        <p className="leading-relaxed">
          Phone:{" "}
          <a href={telHref} className="text-primary hover:underline">
            {site.phonePrimary}
          </a>
          {site.phoneSecondary ? ` / ${site.phoneSecondary}` : null}
        </p>
        <p className="leading-relaxed">
          Email:{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary hover:underline"
          >
            {site.email}
          </a>
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Hero>
        <div className="container-page relative z-2 text-center">
          <span className="text-[0.78rem] font-bold tracking-[1px] text-pink uppercase sm:text-base">
            Legal
          </span>
          <h1 className="my-3 font-display text-[1.95rem] leading-tight font-bold text-ink sm:text-[2.3rem] md:my-4 lg:text-[2.9rem]">
            Terms of Service
          </h1>
          {TERMS_LAST_UPDATED ? (
            <p>Last updated: {TERMS_LAST_UPDATED}</p>
          ) : null}
        </div>
      </Hero>

      <Section>
        <Container>
          <PolicyLayout label="Terms of Service contents" sections={sections} />
        </Container>
      </Section>
    </>
  );
}

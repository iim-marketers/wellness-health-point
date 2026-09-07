import { diagnostics, services } from "@/lib/data/services";
import { site } from "@/lib/site";
import type { Doctor } from "@/lib/types";

/**
 * schema.org structured data, rendered as JSON-LD by `<JsonLd>`.
 * Validate changes with https://search.google.com/test/rich-results.
 */

/** JSON-LD needs absolute URLs; `metadataBase` only resolves the meta tags. */
function abs(path: string): string {
  return `${site.url}${path}`;
}

/** Stable node id, so a doctor page can point back at the clinic by reference. */
export const CLINIC_ID = abs("/#clinic");

/** schema.org's MedicalSpecialty enumeration, keyed by our department names. */
const SPECIALITY_BY_DEPARTMENT: Record<string, string> = {
  Gynecology: "Gynecologic",
  ENT: "Otolaryngologic",
  Surgery: "Surgical",
  Diabetology: "Endocrine",
  "General Medicine": "PrimaryCare",
  Pediatrics: "Pediatric",
  Cardiology: "Cardiovascular",
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.locality,
    addressRegion: site.region,
    ...(site.postalCode ? { postalCode: site.postalCode } : {}),
    addressCountry: site.country,
  };
}

/** The clinic itself. Rendered once per page from the root layout. */
export function clinicSchema() {
  const sameAs = [site.instagram].filter(Boolean);
  const specialities = services
    .map((service) => SPECIALITY_BY_DEPARTMENT[service.title])
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: abs("/images/logo-mark.png"),
    image: abs("/og/clinic.jpg"),
    telephone: [site.phonePrimary, site.phoneSecondary].filter(Boolean),
    email: site.email,
    address: postalAddress(),
    ...(site.latitude && site.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.latitude,
            longitude: site.longitude,
          },
        }
      : {}),
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${site.locality}, ${site.region}`,
    },
    medicalSpecialty: [...new Set(specialities)],
    availableService: diagnostics.map((test) => ({
      "@type": "MedicalTest",
      name: test.title,
      description: test.description,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS,
        opens: site.opens,
        closes: site.closes,
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book an appointment",
      target: {
        "@type": "EntryPoint",
        urlTemplate: abs("/appointment"),
      },
    },
  };
}

export function physicianSchema(doctor: Doctor) {
  const speciality = SPECIALITY_BY_DEPARTMENT[doctor.department];

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": abs(`/doctors/${doctor.id}#physician`),
    name: doctor.name,
    url: abs(`/doctors/${doctor.id}`),
    image: abs(doctor.image),
    description: doctor.description,
    ...(speciality ? { medicalSpecialty: speciality } : {}),
    knowsLanguage: doctor.languages,
    hasCredential: doctor.qualifications.map((qualification) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: qualification,
    })),
    address: postalAddress(),
    telephone: site.phonePrimary,
    parentOrganization: { "@id": CLINIC_ID },
  };
}

/** Turns the trail into the breadcrumb Google shows in place of a bare URL. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

const DEFAULT_ORIGIN = "https://www.thewellnesshealthpoint.com";

function resolveSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_ORIGIN;

  const withProtocol = /^https?:\/\//.test(candidate)
    ? candidate
    : `https://${candidate}`;

  return withProtocol.replace(/\/$/, "");
}

/** Single source of truth for clinic details repeated across the site. */
export const site = {
  name: process.env.NEXT_PUBLIC_CLINIC_NAME || "The Wellness Health Point",
  url: resolveSiteUrl(),
  tagline: "Care. Compassion. Excellence.",
  description:
    "Wellness Health Point — compassionate healthcare with experienced doctors, modern diagnostics and patient-focused treatment.",
  phonePrimary:
    process.env.NEXT_PUBLIC_CLINIC_PHONE_PRIMARY || "+91 6291664625",
  phoneSecondary: process.env.NEXT_PUBLIC_CLINIC_PHONE_SECONDARY,
  email:
    process.env.NEXT_PUBLIC_CLINIC_EMAIL || "thewellnesshealthpoint@gmail.com",
  address: process.env.NEXT_PUBLIC_CLINIC_ADDRESS || "Pansila, Khardah",
  hours: process.env.NEXT_PUBLIC_CLINIC_HOURS || "Mon–Sun: 8 AM – 8 PM",

  street: process.env.NEXT_PUBLIC_CLINIC_STREET || "Pansila",
  locality: process.env.NEXT_PUBLIC_CLINIC_LOCALITY || "Khardah",
  region: process.env.NEXT_PUBLIC_CLINIC_REGION || "West Bengal",

  country: process.env.NEXT_PUBLIC_CLINIC_COUNTRY || "IN",
  postalCode: process.env.NEXT_PUBLIC_CLINIC_POSTAL_CODE || "",
  opens: process.env.NEXT_PUBLIC_CLINIC_OPENS || "08:00",
  closes: process.env.NEXT_PUBLIC_CLINIC_CLOSES || "20:00",
  latitude: process.env.NEXT_PUBLIC_CLINIC_LATITUDE || "",
  longitude: process.env.NEXT_PUBLIC_CLINIC_LONGITUDE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916291664625",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  mapEmbed: process.env.NEXT_PUBLIC_MAP_EMBED_URL || "",
} as const;

/** Digits-only number for `tel:` links. */
export const telHref = `tel:${site.phonePrimary.replace(/\s/g, "")}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
] as const;

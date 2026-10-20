import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathnames } from "@/i18n/routing";
import { SITE_ADDRESS_HQ, SITE_EMAIL } from "@/lib/contact";
import { WHATSAPP_CN, WHATSAPP_SN } from "@/lib/whatsapp";

// Domaine de production : sert aux URLs canoniques, au sitemap et aux balises hreflang.
export const SITE_URL = "https://uniontransitgroup.com";

// Code fourni par Google Search Console (méthode « Balise HTML »).
export const GOOGLE_SITE_VERIFICATION = "SKJ6TaFiJp--4gKigOlHpF6hID_e6z9pZKZvxIG7X7Y";

// Pages publiques à faire indexer (réclamation, CGU, confidentialité restent indexables mais en priorité basse).
export const INDEXED_PAGES: { href: AppPathnames; priority: number }[] = [
  { href: "/", priority: 1 },
  { href: "/services", priority: 0.9 },
  { href: "/cargo-chine-senegal", priority: 0.9 },
  { href: "/fret-aerien-chine-dakar", priority: 0.9 },
  { href: "/groupage-maritime-chine-dakar", priority: 0.9 },
  { href: "/conteneur-chine-dakar", priority: 0.9 },
  { href: "/achat-sourcing-chine", priority: 0.8 },
  { href: "/ecommerce-chine-senegal", priority: 0.8 },
  { href: "/contact", priority: 0.8 },
  { href: "/about", priority: 0.7 },
  { href: "/tracking", priority: 0.5 },
  { href: "/claim", priority: 0.3 },
  { href: "/privacy", priority: 0.1 },
  { href: "/terms", priority: 0.1 },
];

export function absoluteUrl(href: AppPathnames, locale: string) {
  const path = getPathname({ href, locale });
  return `${SITE_URL}${path === `/${locale}/` ? `/${locale}` : path}`;
}

export function languageAlternates(href: AppPathnames) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(href, locale);
  }
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);
  return languages;
}

// Métadonnées d'une page : titre et description traduits, URL canonique et versions FR/EN.
export async function pageMetadata(
  locale: string,
  namespace: string,
  href: AppPathnames,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const url = absoluteUrl(href, locale);
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: url, languages: languageAlternates(href) },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "Union Transit",
      locale: locale === "fr" ? "fr_SN" : "en_US",
      type: "website",
      images: [{ url: "/logo.png", alt: "Union Transit" }],
    },
  };
}

// Données structurées (schema.org) décrivant l'entreprise pour Google.
export function organizationJsonLd(locale: string) {
  const description =
    locale === "fr"
      ? "Transitaire et cargo entre la Chine (Guangzhou, Yiwu) et le Sénégal (Dakar) : fret aérien express et normal, groupage maritime, conteneur complet, sourcing, contrôle qualité et paiement des fournisseurs."
      : "Freight forwarder and cargo between China (Guangzhou, Yiwu) and Senegal (Dakar): express and standard air freight, sea groupage, full containers, sourcing, quality control and supplier payments.";
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Union Transit",
    alternateName: ["Union Transit Group", "UTG Cargo"],
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description,
    email: SITE_EMAIL,
    telephone: `+${WHATSAPP_SN}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS_HQ.split(", Kaolack")[0],
      addressLocality: "Kaolack",
      addressCountry: "SN",
    },
    areaServed: [
      { "@type": "Country", name: "Senegal" },
      { "@type": "Country", name: "China" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${WHATSAPP_SN}`,
        contactType: "customer service",
        areaServed: "SN",
        availableLanguage: ["French", "English", "Wolof"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+${WHATSAPP_CN}`,
        contactType: "customer service",
        areaServed: "CN",
        availableLanguage: ["French", "English", "Chinese"],
      },
    ],
    knowsAbout: [
      "Cargo Chine Sénégal",
      "Fret aérien Chine Dakar",
      "Fret maritime Chine Dakar",
      "Groupage conteneur LCL",
      "Conteneur complet FCL",
      "Sourcing en Chine",
    ],
  };
}

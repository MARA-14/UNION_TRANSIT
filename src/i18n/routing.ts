import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/about": {
      fr: "/a-propos",
      en: "/about",
    },
    "/tracking": {
      fr: "/suivi",
      en: "/tracking",
    },
    "/contact": "/contact",
    "/claim": {
      fr: "/reclamation",
      en: "/complaint",
    },
    "/privacy": {
      fr: "/politique-confidentialite",
      en: "/privacy-policy",
    },
    "/terms": {
      fr: "/cgu",
      en: "/terms",
    },
    "/cargo-chine-senegal": {
      fr: "/cargo-chine-senegal",
      en: "/china-senegal-cargo",
    },
    "/fret-aerien-chine-dakar": {
      fr: "/fret-aerien-chine-dakar",
      en: "/air-freight-china-dakar",
    },
    "/groupage-maritime-chine-dakar": {
      fr: "/groupage-maritime-chine-dakar",
      en: "/sea-groupage-china-dakar",
    },
    "/conteneur-chine-dakar": {
      fr: "/conteneur-chine-dakar",
      en: "/container-china-dakar",
    },
    "/achat-sourcing-chine": {
      fr: "/achat-sourcing-chine",
      en: "/sourcing-china",
    },
    "/ecommerce-chine-senegal": {
      fr: "/ecommerce-chine-senegal",
      en: "/china-ecommerce-senegal",
    },
    "/coming-soon": {
      fr: "/bientot-disponible",
      en: "/coming-soon",
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;

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
    "/coming-soon": {
      fr: "/bientot-disponible",
      en: "/coming-soon",
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;

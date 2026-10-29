import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/about": "/a-propos",
    "/tracking": "/suivi",
    "/contact": "/contact",
    "/claim": "/reclamation",
    "/privacy": "/politique-confidentialite",
    "/terms": "/cgu",
    "/cargo-chine-senegal": "/cargo-chine-senegal",
    "/fret-aerien-chine-dakar": "/fret-aerien-chine-dakar",
    "/groupage-maritime-chine-dakar": "/groupage-maritime-chine-dakar",
    "/conteneur-chine-dakar": "/conteneur-chine-dakar",
    "/achat-sourcing-chine": "/achat-sourcing-chine",
    "/ecommerce-chine-senegal": "/ecommerce-chine-senegal",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/coming-soon": "/bientot-disponible",
  },
});

export type AppPathnames = keyof typeof routing.pathnames;

// Routes sans paramètre dynamique (tout sauf les articles du blog).
export type StaticPathnames = Exclude<AppPathnames, `${string}[${string}`>;

import type { AppPathnames } from "@/i18n/routing";

// Pages d'atterrissage SEO : une page par recherche visée (cargo, aérien, groupage, conteneur, sourcing).
// Les textes sont dans messages/*.json, sous « landing.<key> ».
export const LANDINGS = [
  { key: "cargo", href: "/cargo-chine-senegal" },
  { key: "air", href: "/fret-aerien-chine-dakar" },
  { key: "sea", href: "/groupage-maritime-chine-dakar" },
  { key: "container", href: "/conteneur-chine-dakar" },
  { key: "sourcing", href: "/achat-sourcing-chine" },
] as const satisfies readonly { key: string; href: AppPathnames }[];

export type LandingKey = (typeof LANDINGS)[number]["key"];

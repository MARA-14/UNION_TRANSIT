import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // L'anglais a été retiré : les anciennes adresses /en/... pointent vers leur équivalent français.
  async redirects() {
    const renamed = {
      about: "a-propos",
      tracking: "suivi",
      complaint: "reclamation",
      "privacy-policy": "politique-confidentialite",
      terms: "cgu",
      "coming-soon": "bientot-disponible",
      "china-senegal-cargo": "cargo-chine-senegal",
      "air-freight-china-dakar": "fret-aerien-chine-dakar",
      "sea-groupage-china-dakar": "groupage-maritime-chine-dakar",
      "container-china-dakar": "conteneur-chine-dakar",
      "sourcing-china": "achat-sourcing-chine",
      "china-ecommerce-senegal": "ecommerce-chine-senegal",
    };
    return [
      ...Object.entries(renamed).map(([en, fr]) => ({
        source: `/en/${en}`,
        destination: `/fr/${fr}`,
        permanent: true,
      })),
      { source: "/en/:path*", destination: "/fr/:path*", permanent: true },
      { source: "/en", destination: "/fr", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/logo.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

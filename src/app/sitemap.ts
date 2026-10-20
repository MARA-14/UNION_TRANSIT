import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { INDEXED_PAGES, absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXED_PAGES.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: locale === routing.defaultLocale ? priority : priority * 0.8,
      alternates: { languages: languageAlternates(href) },
    })),
  );
}

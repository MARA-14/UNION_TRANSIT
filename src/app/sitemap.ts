import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BLOG_ARTICLES } from "@/content/blog";
import { INDEXED_PAGES, SITE_URL, absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = INDEXED_PAGES.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: locale === routing.defaultLocale ? priority : priority * 0.8,
      alternates: { languages: languageAlternates(href) },
    })),
  );
  // Articles du blog : français uniquement.
  const articles = BLOG_ARTICLES.map((article) => ({
    url: `${SITE_URL}/fr/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...articles];
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FinalBanner from "@/components/FinalBanner";
import { BLOG_ARTICLES, getArticle } from "@/content/blog";
import { SITE_URL } from "@/lib/seo";

// Les articles n'existent qu'en français.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ locale: "fr", slug: a.slug }));
}

function articleUrl(slug: string) {
  return `${SITE_URL}/fr/blog/${slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = articleUrl(slug);
  return {
    title: `${article.title} | Union Transit`,
    description: article.description,
    alternates: { canonical: url, languages: { fr: url, "x-default": url } },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "Union Transit",
      locale: "fr_SN",
      type: "article",
      publishedTime: article.date,
      images: [{ url: "/logo.png", alt: "Union Transit" }],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (locale !== "fr" || !article) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: "fr",
      mainEntityOfPage: articleUrl(slug),
      image: `${SITE_URL}/logo.png`,
      author: { "@type": "Organization", name: "Union Transit", url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/fr` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/fr/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl(slug) },
      ],
    },
  ];

  const published = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="bg-gradient-to-b from-surface to-white py-14 sm:py-20">
          <div className="container-page max-w-3xl mx-auto">
            <Link href="/blog" className="text-sm text-navy/60 hover:text-navy underline underline-offset-4">
              {t("backToBlog")}
            </Link>
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold leading-tight text-navy">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-navy/50">
              {t("published")} <time dateTime={article.date}>{published}</time>
            </p>
            <p className="mt-6 text-base sm:text-lg text-navy/70">{article.intro}</p>
          </div>
        </header>

        <div className="py-10 sm:py-14">
          <div className="container-page max-w-3xl mx-auto space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-2xl font-bold text-navy">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-navy/70 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 list-disc pl-6 space-y-2 text-navy/70">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <FinalBanner
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
      />
    </>
  );
}

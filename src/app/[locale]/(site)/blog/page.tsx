import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FinalBanner from "@/components/FinalBanner";
import { BLOG_ARTICLES } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "blog.meta", "/blog");
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 sm:py-20">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">{t("title")}</h1>
          <p className="mt-4 text-navy/70">{t("subtitle")}</p>
          {t("frenchOnly") && <p className="mt-2 text-sm text-navy/50">{t("frenchOnly")}</p>}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl mx-auto grid gap-6">
          {BLOG_ARTICLES.map((article) => (
            <article key={article.slug} className="rounded-xl border border-navy/10 bg-white p-6">
              <h2 className="font-heading text-xl font-bold text-navy">
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: article.slug } }}
                  locale="fr"
                  className="hover:underline underline-offset-4"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-navy/70">{article.description}</p>
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: article.slug } }}
                locale="fr"
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline underline-offset-4"
              >
                {t("readMore")} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <FinalBanner
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
      />
    </>
  );
}

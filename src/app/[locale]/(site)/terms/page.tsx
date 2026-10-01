import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  const sections = [
    "purpose",
    "quotes",
    "tracking",
    "intellectualProperty",
    "externalLinks",
    "changes",
    "law",
  ] as const;

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
          {t("title")}
        </h1>

        <div className="mt-10 space-y-10">
          {sections.map((key) => (
            <div key={key}>
              <h2 className="font-heading text-xl font-bold text-navy">
                {t(`${key}.title`)}
              </h2>
              <p className="mt-4 text-navy/80">{t(`${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_EMAIL } from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "privacy.meta", "/privacy");
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  const sections = ["dataCollected", "dataUse", "dataStorage", "cookies", "rights"] as const;

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
              <p className="mt-4 text-navy/80">
                {t(`${key}.text`)}
                {key === "rights" && (
                  <>
                    {" "}
                    <a href={`mailto:${SITE_EMAIL}`} className="text-navy underline underline-offset-4 hover:no-underline">
                      {SITE_EMAIL}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

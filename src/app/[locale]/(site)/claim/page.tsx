import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClaimForm from "@/components/ClaimForm";
import FinalBanner from "@/components/FinalBanner";
import { WHATSAPP_CLAIMS, buildWhatsAppLink } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "claim.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ClaimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("claim");
  const tWa = await getTranslations("whatsapp");
  const whatsappHref = buildWhatsAppLink(WHATSAPP_CLAIMS, tWa("writeOnWhatsApp"));

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 sm:py-20">
        <div className="container-page text-center max-w-xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-navy/70">{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy">
              {t("form.title")}
            </h2>
            <div className="mt-6">
              <ClaimForm />
            </div>
          </div>
        </div>
      </section>

      <FinalBanner
        title={t("banner.title")}
        subtitle={t("banner.subtitle")}
        ctaLabel={t("banner.cta")}
        ctaExternalHref={whatsappHref}
      />
    </>
  );
}

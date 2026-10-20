import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TrackingClient from "@/components/TrackingClient";
import FinalBanner from "@/components/FinalBanner";
import { WHATSAPP_SN, buildWhatsAppLink } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "tracking.meta", "/tracking");
}

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tracking");
  const tWa = await getTranslations("whatsapp");
  const whatsappHref = buildWhatsAppLink(WHATSAPP_SN, tWa("writeOnWhatsApp"));

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 sm:py-20">
        <div className="container-page text-center max-w-xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-navy/70">{t("hero.subtitle")}</p>
        </div>
        <TrackingClient />
      </section>

      <div className="container-page pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-gold/40 bg-gold/10 p-5 text-sm text-navy">
          {t("info.text")}
        </div>
      </div>

      <FinalBanner
        title={t("banner.title")}
        subtitle={t("banner.subtitle")}
        ctaLabel={t("banner.cta")}
        ctaExternalHref={whatsappHref}
      />
    </>
  );
}

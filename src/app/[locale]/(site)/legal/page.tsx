import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE_EMAIL, SITE_ADDRESS_HQ } from "@/lib/contact";
import { WHATSAPP_SN, formatWhatsAppDisplay } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
          {t("title")}
        </h1>

        <div className="mt-10 space-y-10">
          <div>
            <h2 className="font-heading text-xl font-bold text-navy">
              {t("company.title")}
            </h2>
            <ul className="mt-4 space-y-2 text-navy/80">
              <li>{t("company.name")}</li>
              <li>
                {t("company.headquartersLabel")} : {SITE_ADDRESS_HQ}
              </li>
              <li>{t("company.rccm")}</li>
              <li>{t("company.ninea")}</li>
              <li>{t("company.manager")}</li>
              <li>
                {t("company.contactLabel")} : {SITE_EMAIL} — WhatsApp{" "}
                {formatWhatsAppDisplay(WHATSAPP_SN)}
              </li>
              <li>{t("company.host")}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy">
              {t("personalData.title")}
            </h2>
            <p className="mt-4 text-navy/80">{t("personalData.text")}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy">
              {t("intellectualProperty.title")}
            </h2>
            <p className="mt-4 text-navy/80">
              {t("intellectualProperty.text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

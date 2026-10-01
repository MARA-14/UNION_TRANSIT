import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import WhatsAppLink from "@/components/WhatsAppLink";
import { Link } from "@/i18n/navigation";
import { MapPinIcon, MailIcon, PhoneIcon } from "@/components/icons";
import {
  WHATSAPP_SN,
  WHATSAPP_CN,
  formatWhatsAppDisplay,
} from "@/lib/whatsapp";
import { SITE_EMAIL, SITE_ADDRESS_HQ } from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tWa = await getTranslations("whatsapp");

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-3 text-navy/70">{t("hero.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy">
              {t("form.title")}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="font-heading text-lg font-bold">
                {t("sidebar.directTitle")}
              </h2>
              <p className="mt-2 text-sm text-white/80">
                {t("sidebar.directText")}
              </p>
              <WhatsAppLink
                number={WHATSAPP_SN}
                className="mt-5 inline-flex min-h-[44px] items-center rounded-md bg-gold px-5 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                {tWa("writeOnWhatsApp")}
              </WhatsAppLink>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-6">
              <h2 className="font-heading text-lg font-bold text-navy">
                {t("sidebar.coordinatesTitle")}
              </h2>
              <ul className="mt-4 space-y-4 text-sm text-navy/80">
                <li className="flex gap-3">
                  <MapPinIcon className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-navy">
                      {t("sidebar.addressLabel")}
                    </p>
                    <p>{SITE_ADDRESS_HQ}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MailIcon className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-navy">
                      {t("sidebar.emailLabel")}
                    </p>
                    <p>
                      <a href={`mailto:${SITE_EMAIL}`} className="hover:underline">
                        {SITE_EMAIL}
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-navy">
                      {t("sidebar.whatsappSnLabel")}
                    </p>
                    <p>
                      <a href={`tel:+${WHATSAPP_SN}`} className="hover:underline">
                        {formatWhatsAppDisplay(WHATSAPP_SN)}
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-medium text-navy">
                      {t("sidebar.whatsappCnLabel")}
                    </p>
                    <p>
                      <a href={`tel:+${WHATSAPP_CN}`} className="hover:underline">
                        {formatWhatsAppDisplay(WHATSAPP_CN)}
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-6">
              <h2 className="font-heading text-lg font-bold text-navy">
                {t("sidebar.claimTitle")}
              </h2>
              <p className="mt-2 text-sm text-navy/70">{t("sidebar.claimText")}</p>
              <Link
                href="/claim"
                className="mt-4 inline-flex min-h-[44px] items-center rounded-md border-2 border-navy px-5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                {t("sidebar.claimCta")}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

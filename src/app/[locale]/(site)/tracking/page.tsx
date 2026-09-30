import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TrackingSearch from "@/components/TrackingSearch";
import Timeline, { type TimelineStep } from "@/components/Timeline";
import FinalBanner from "@/components/FinalBanner";
import { UserIcon } from "@/components/icons";
import { WHATSAPP_SN, buildWhatsAppLink } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tracking.meta" });
  return { title: t("title"), description: t("description") };
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

  const departure = t("result.departureDate");
  const arrival = t("result.arrivalDate");

  const steps: TimelineStep[] = [
    { label: t("result.seaStatuses.received"), state: "done" },
    { label: t("result.seaStatuses.loading"), state: "done" },
    {
      label: t("result.seaStatuses.departurePlanned", { date: departure }),
      state: "done",
    },
    { label: t("result.seaStatuses.leftPort"), state: "done" },
    { label: t("result.seaStatuses.inProgress"), state: "current" },
    {
      label: t("result.seaStatuses.arrivalPlanned", { date: arrival }),
      state: "upcoming",
    },
    { label: t("result.seaStatuses.arrived"), state: "upcoming" },
    { label: t("result.seaStatuses.customsWaiting"), state: "upcoming" },
    { label: t("result.seaStatuses.customsInProgress"), state: "upcoming" },
    { label: t("result.seaStatuses.availableWarehouse"), state: "upcoming" },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 sm:py-20">
        <div className="container-page text-center max-w-xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-navy/70">{t("hero.subtitle")}</p>
          <TrackingSearch />
        </div>
      </section>

      <section id="tracking-result" className="py-16 sm:py-20 scroll-mt-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                  {t("result.trackingNumberLabel")}
                </p>
                <p className="font-heading text-xl font-bold text-navy">
                  {t("hero.inputPlaceholder")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                  {t("result.currentStatusLabel")}
                </p>
                <p className="font-heading text-lg font-bold text-gold">
                  {t("result.seaStatuses.inProgress")}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-navy/50">{t("result.routeLabel")}</dt>
                <dd className="font-medium text-navy">{t("result.route")}</dd>
              </div>
              <div>
                <dt className="text-navy/50">{t("result.modeLabel")}</dt>
                <dd className="font-medium text-navy">{t("result.mode")}</dd>
              </div>
              <div>
                <dt className="text-navy/50">{t("result.lastUpdateLabel")}</dt>
                <dd className="font-medium text-navy">
                  {t("result.lastUpdateDate")}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-3 rounded-lg bg-surface p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white">
                <UserIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-navy/50">
                  {t("result.advisorLabel")}
                </p>
                <p className="text-sm font-semibold text-navy">
                  {t("result.advisorName")}
                </p>
              </div>
            </div>

            <h2 className="mt-8 font-heading text-base font-semibold text-navy">
              {t("result.timelineTitle")}
            </h2>
            <div className="mt-6">
              <Timeline
                steps={steps}
                currentLabelText={t("result.currentStatusLabel")}
              />
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-gold/40 bg-gold/10 p-5 text-sm text-navy">
            {t("info.text")}
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-navy/50">
            {t("demoDisclaimer")}
          </p>
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

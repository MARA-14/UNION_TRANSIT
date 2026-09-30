import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WhatsAppLink from "@/components/WhatsAppLink";
import AvisForm from "@/components/AvisForm";
import ServiceCard from "@/components/ServiceCard";
import ValueCard from "@/components/ValueCard";
import FinalBanner from "@/components/FinalBanner";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
  PlaneIcon,
  ShipIcon,
  ContainerIcon,
  ClockIcon,
  UserIcon,
  BadgeCheckIcon,
  LayersIcon,
  ShieldIcon,
  MapPinIcon,
  SearchCheckIcon,
} from "@/components/icons";
import { WHATSAPP_SN } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tWa = await getTranslations("whatsapp");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-navy">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-navy/70">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center rounded-md bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                {t("hero.ctaQuote")}
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center rounded-md border-2 border-navy px-6 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                {t("hero.ctaServices")}
              </Link>
            </div>
          </div>

          {/* Route visual */}
          <div className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
              {t("route.title")}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-heading text-sm sm:text-base font-semibold text-navy">
                {t("route.from")}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-navy/30 to-gold" />
              <PlaneIcon className="h-5 w-5 shrink-0 text-gold" />
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-gold to-navy/30" />
              <span className="font-heading text-sm sm:text-base font-semibold text-navy">
                {t("route.to")}
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 text-sm text-navy">
                <PlaneIcon className="h-4 w-4 shrink-0 text-navy" />
                {t("route.offers.airExpress")}
              </li>
              <li className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 text-sm text-navy">
                <PlaneIcon className="h-4 w-4 shrink-0 text-navy" />
                {t("route.offers.airNormal")}
              </li>
              <li className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 text-sm text-navy">
                <ShipIcon className="h-4 w-4 shrink-0 text-navy" />
                {t("route.offers.seaLcl")}
              </li>
              <li className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 text-sm text-navy">
                <ContainerIcon className="h-4 w-4 shrink-0 text-navy" />
                {t("route.offers.seaFcl")}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
              {t("services.title")}
            </h2>
            <p className="mt-3 text-navy/70">{t("services.subtitle")}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              icon={<PlaneIcon className="h-6 w-6" />}
              title={t("services.cards.airExpress.title")}
              delay={t("services.cards.airExpress.delay")}
              description={t("services.cards.airExpress.description")}
            />
            <ServiceCard
              icon={<PlaneIcon className="h-6 w-6" />}
              title={t("services.cards.airNormal.title")}
              delay={t("services.cards.airNormal.delay")}
              description={t("services.cards.airNormal.description")}
            />
            <ServiceCard
              icon={<ShipIcon className="h-6 w-6" />}
              title={t("services.cards.seaLcl.title")}
              delay={t("services.cards.seaLcl.delay")}
              description={t("services.cards.seaLcl.description")}
            />
            <ServiceCard
              icon={<ContainerIcon className="h-6 w-6" />}
              title={t("services.cards.seaFcl.title")}
              delay={t("services.cards.seaFcl.delay")}
              description={t("services.cards.seaFcl.description")}
            />
            <ServiceCard
              icon={<SearchCheckIcon className="h-6 w-6" />}
              title={t("services.cards.sourcing.title")}
              delay={t("services.cards.sourcing.delay")}
              description={t("services.cards.sourcing.description")}
            />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl sm:text-3xl font-bold text-white">
            {t("why.title")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ValueCard
              icon={<UserIcon className="h-5 w-5" />}
              title={t("why.items.advisor.title")}
              description={t("why.items.advisor.description")}
            />
            <ValueCard
              icon={<MapPinIcon className="h-5 w-5" />}
              title={t("why.items.tracking.title")}
              description={t("why.items.tracking.description")}
            />
            <ValueCard
              icon={<ClockIcon className="h-5 w-5" />}
              title={t("why.items.updates.title")}
              description={t("why.items.updates.description")}
            />
            <ValueCard
              icon={<BadgeCheckIcon className="h-5 w-5" />}
              title={t("why.items.quote.title")}
              description={t("why.items.quote.description")}
            />
            <ValueCard
              icon={<ShieldIcon className="h-5 w-5" />}
              title={t("why.items.sourcing.title")}
              description={t("why.items.sourcing.description")}
            />
            <ValueCard
              icon={<LayersIcon className="h-5 w-5" />}
              title={t("why.items.allInOne.title")}
              description={t("why.items.allInOne.description")}
            />
          </div>
        </div>
      </section>

      {/* Ambassadors */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
              {t("ambassadors.title")}
            </h2>
            <p className="mt-4 text-navy/70">{t("ambassadors.text")}</p>
          </div>

          <div className="mt-10 mx-auto max-w-md rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-navy">
              {t("ambassadors.form.title")}
            </h3>
            <div className="mt-5">
              <AvisForm />
            </div>
            <div className="mt-6 border-t border-navy/10 pt-5 text-center">
              <WhatsAppLink
                number={WHATSAPP_SN}
                message={t("ambassadors.cta")}
                className="inline-flex min-h-[44px] items-center rounded-md border-2 border-navy px-5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                {tWa("shareExperience")}
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>

      <FinalBanner
        title={t("banner.title")}
        subtitle={t("banner.subtitle")}
        ctaLabel={t("banner.cta")}
        ctaHref="/contact"
        secondaryLabel={tWa("talkToAdvisor")}
        secondaryHref={buildWhatsAppLink(WHATSAPP_SN, t("banner.title"))}
      />
    </>
  );
}

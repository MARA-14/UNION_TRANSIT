import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServiceCard from "@/components/ServiceCard";
import InfoCard from "@/components/InfoCard";
import StepCard from "@/components/StepCard";
import FinalBanner from "@/components/FinalBanner";
import {
  PlaneIcon,
  ShipIcon,
  ContainerIcon,
  ClockIcon,
  UserIcon,
  BadgeCheckIcon,
  ShieldIcon,
  LayersIcon,
} from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 sm:py-20">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-navy/70">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Transport */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
              {t("transport.title")}
            </h2>
            <p className="mt-3 text-navy/70">{t("transport.subtitle")}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              icon={<PlaneIcon className="h-6 w-6" />}
              title={t("transport.cards.airExpress.title")}
              delay={t("transport.cards.airExpress.delay")}
              description={t("transport.cards.airExpress.description")}
            />
            <ServiceCard
              icon={<PlaneIcon className="h-6 w-6" />}
              title={t("transport.cards.airNormal.title")}
              delay={t("transport.cards.airNormal.delay")}
              description={t("transport.cards.airNormal.description")}
            />
            <ServiceCard
              icon={<ShipIcon className="h-6 w-6" />}
              title={t("transport.cards.seaLcl.title")}
              delay={t("transport.cards.seaLcl.delay")}
              description={t("transport.cards.seaLcl.description")}
            />
            <ServiceCard
              icon={<ContainerIcon className="h-6 w-6" />}
              title={t("transport.cards.seaFcl.title")}
              delay={t("transport.cards.seaFcl.delay")}
              description={t("transport.cards.seaFcl.description")}
            />
          </div>
        </div>
      </section>

      {/* Achats en Chine */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl sm:text-3xl font-bold text-navy">
            {t("purchasing.title")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<BadgeCheckIcon className="h-5 w-5" />}
              title={t("purchasing.items.sourcing.title")}
              description={t("purchasing.items.sourcing.description")}
            />
            <InfoCard
              icon={<LayersIcon className="h-5 w-5" />}
              title={t("purchasing.items.factories.title")}
              description={t("purchasing.items.factories.description")}
            />
            <InfoCard
              icon={<ShieldIcon className="h-5 w-5" />}
              title={t("purchasing.items.quality.title")}
              description={t("purchasing.items.quality.description")}
            />
            <InfoCard
              icon={<BadgeCheckIcon className="h-5 w-5" />}
              title={t("purchasing.items.payment.title")}
              description={t("purchasing.items.payment.description")}
            />
            <InfoCard
              icon={<ContainerIcon className="h-5 w-5" />}
              title={t("purchasing.items.consolidation.title")}
              description={t("purchasing.items.consolidation.description")}
            />
          </div>
        </div>
      </section>

      {/* Votre suivi */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl sm:text-3xl font-bold text-navy">
            {t("tracking.title")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <InfoCard
              icon={<ClockIcon className="h-5 w-5" />}
              title={t("tracking.items.online.title")}
              description={t("tracking.items.online.description")}
            />
            <InfoCard
              icon={<ClockIcon className="h-5 w-5" />}
              title={t("tracking.items.updates.title")}
              description={t("tracking.items.updates.description")}
            />
            <InfoCard
              icon={<UserIcon className="h-5 w-5" />}
              title={t("tracking.items.advisor.title")}
              description={t("tracking.items.advisor.description")}
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl sm:text-3xl font-bold text-navy">
            {t("howItWorks.title")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number={1}
              title={t("howItWorks.steps.step1.title")}
              description={t("howItWorks.steps.step1.description")}
            />
            <StepCard
              number={2}
              title={t("howItWorks.steps.step2.title")}
              description={t("howItWorks.steps.step2.description")}
            />
            <StepCard
              number={3}
              title={t("howItWorks.steps.step3.title")}
              description={t("howItWorks.steps.step3.description")}
            />
            <StepCard
              number={4}
              title={t("howItWorks.steps.step4.title")}
              description={t("howItWorks.steps.step4.description")}
            />
          </div>
        </div>
      </section>

      <FinalBanner
        title={t("banner.title")}
        subtitle={t("banner.subtitle")}
        ctaLabel={t("banner.cta")}
        ctaHref="/contact"
      />
    </>
  );
}

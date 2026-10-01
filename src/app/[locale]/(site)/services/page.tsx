import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AccordionCard from "@/components/AccordionCard";
import InfoCard from "@/components/InfoCard";
import StepCard from "@/components/StepCard";
import FinalBanner from "@/components/FinalBanner";
import {
  PlaneIcon,
  ShipIcon,
  ContainerIcon,
  ClockIcon,
  UserIcon,
  ShieldIcon,
  LayersIcon,
  SearchCheckIcon,
  VerifiedSealIcon,
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
            <p className="mt-2 text-sm text-navy/50">
              {t("transport.hint")}
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <AccordionCard
              icon={<PlaneIcon className="h-6 w-6" />}
              title={t("transport.cards.airExpress.title")}
              badge={t("transport.cards.airExpress.delay")}
              summary={t("transport.cards.airExpress.description")}
              details={t("transport.cards.airExpress.details")}
            />
            <AccordionCard
              icon={<PlaneIcon className="h-6 w-6" />}
              title={t("transport.cards.airNormal.title")}
              badge={t("transport.cards.airNormal.delay")}
              summary={t("transport.cards.airNormal.description")}
              details={t("transport.cards.airNormal.details")}
            />
            <AccordionCard
              icon={<ShipIcon className="h-6 w-6" />}
              title={t("transport.cards.seaLcl.title")}
              badge={t("transport.cards.seaLcl.delay")}
              summary={t("transport.cards.seaLcl.description")}
              details={t("transport.cards.seaLcl.details")}
            />
            <AccordionCard
              icon={<ContainerIcon className="h-6 w-6" />}
              title={t("transport.cards.seaFcl.title")}
              badge={t("transport.cards.seaFcl.delay")}
              summary={t("transport.cards.seaFcl.description")}
              details={t("transport.cards.seaFcl.details")}
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <AccordionCard
              icon={<SearchCheckIcon className="h-5 w-5" />}
              title={t("purchasing.items.sourcing.title")}
              summary={t("purchasing.items.sourcing.description")}
              details={t("purchasing.items.sourcing.details")}
            />
            <AccordionCard
              icon={<LayersIcon className="h-5 w-5" />}
              title={t("purchasing.items.factories.title")}
              summary={t("purchasing.items.factories.description")}
              details={t("purchasing.items.factories.details")}
            />
            <AccordionCard
              icon={<ShieldIcon className="h-5 w-5" />}
              title={t("purchasing.items.quality.title")}
              summary={t("purchasing.items.quality.description")}
              details={t("purchasing.items.quality.details")}
            />
            <AccordionCard
              icon={<VerifiedSealIcon className="h-5 w-5" />}
              title={t("purchasing.items.payment.title")}
              summary={t("purchasing.items.payment.description")}
              details={t("purchasing.items.payment.details")}
            />
            <AccordionCard
              icon={<ContainerIcon className="h-5 w-5" />}
              title={t("purchasing.items.consolidation.title")}
              summary={t("purchasing.items.consolidation.description")}
              details={t("purchasing.items.consolidation.details")}
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

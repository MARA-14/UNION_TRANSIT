import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FinalBanner from "@/components/FinalBanner";
import { BadgeCheckIcon, ClockIcon, VerifiedSealIcon, MapPinIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 sm:py-20">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-navy/70">{t("hero.text")}</p>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            {t("whoWeAre.title")}
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              <MapPinIcon className="h-3.5 w-3.5" /> {t("whoWeAre.badgeSenegal")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              <MapPinIcon className="h-3.5 w-3.5" /> {t("whoWeAre.badgeChina")}
            </span>
          </div>
          <p className="mt-5 text-lg text-white/85">{t("whoWeAre.text")}</p>
          <p className="mt-6 font-heading text-xl italic text-gold">
            &ldquo;{t("whoWeAre.slogan")}&rdquo;
          </p>
        </div>
      </section>

      {/* Comment nous travaillons */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-center font-heading text-2xl sm:text-3xl font-bold text-navy">
            {t("howWeWork.title")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-navy/10 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                <BadgeCheckIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                {t("howWeWork.items.expertise.title")}
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                {t("howWeWork.items.expertise.description")}
              </p>
            </div>
            <div className="rounded-xl border border-navy/10 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                <ClockIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                {t("howWeWork.items.seriousness.title")}
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                {t("howWeWork.items.seriousness.description")}
              </p>
            </div>
            <div className="rounded-xl border border-navy/10 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                <VerifiedSealIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                {t("howWeWork.items.reliability.title")}
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                {t("howWeWork.items.reliability.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl bg-white p-8 sm:p-10 text-center shadow-sm border border-navy/10">
            <div
              aria-hidden="true"
              className="flex h-24 w-24 items-center justify-center rounded-full bg-navy font-heading text-2xl font-bold text-white"
            >
              {t("founder.initials")}
            </div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
              {t("founder.role")}
            </h2>
            <p className="text-navy/70">{t("founder.bio")}</p>
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

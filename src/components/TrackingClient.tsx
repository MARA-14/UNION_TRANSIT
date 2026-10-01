"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Timeline, { type TimelineStep } from "@/components/Timeline";
import { UserIcon } from "@/components/icons";
import { lookupTracking, type TrackingResult } from "@/lib/sheets";
import { WHATSAPP_SN, buildWhatsAppLink } from "@/lib/whatsapp";

const AIR_STEPS = ["received", "inProgress", "arrived"] as const;
const SEA_STEPS = [
  "received",
  "loading",
  "departurePlanned",
  "leftPort",
  "inProgress",
  "arrivalPlanned",
  "arrived",
  "customsWaiting",
  "customsInProgress",
  "availableWarehouse",
] as const;

type Status = "idle" | "loading" | "found" | "notfound";

export default function TrackingClient() {
  const t = useTranslations("tracking");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<TrackingResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;

    setStatus("loading");
    const data = await lookupTracking(value);

    if (data) {
      setResult(data);
      setStatus("found");
    } else {
      setResult(null);
      setStatus("notfound");
    }
  }

  const isAir = result ? result.mode.trim().toLowerCase().startsWith("a") : true;
  const stepKeys = isAir ? AIR_STEPS : SEA_STEPS;
  const statusNamespace = isAir ? "airStatuses" : "seaStatuses";
  const currentIndex = result
    ? Math.min(Math.max(Math.round(result.etape), 1), stepKeys.length) - 1
    : 0;

  function stepLabel(key: (typeof SEA_STEPS)[number]) {
    if (!result) return "";
    if (key === "departurePlanned") {
      return t(`result.${statusNamespace}.${key}`, { date: result.departPrevu });
    }
    if (key === "arrivalPlanned") {
      return t(`result.${statusNamespace}.${key}`, { date: result.arriveePrevue });
    }
    return t(`result.${statusNamespace}.${key}`);
  }

  const steps: TimelineStep[] = result
    ? stepKeys.map((key, index) => ({
        label: stepLabel(key),
        state: index < currentIndex ? "done" : index === currentIndex ? "current" : "upcoming",
      }))
    : [];

  const currentStatusLabel = result ? stepLabel(stepKeys[currentIndex]) : "";
  const advisorHref = buildWhatsAppLink(WHATSAPP_SN, t("result.advisorWhatsappMessage"));

  return (
    <>
      <div className="container-page">
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <div className="flex-1 text-left">
            <label htmlFor="tracking-number" className="sr-only">
              {t("hero.inputLabel")}
            </label>
            <input
              id="tracking-number"
              name="tracking-number"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("hero.inputPlaceholder")}
              className="w-full min-h-[44px] rounded-md border border-navy/20 bg-white px-4 text-navy placeholder:text-navy/30 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
            />
          </div>
          <button
            type="submit"
            className="min-h-[44px] shrink-0 rounded-md bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            {t("hero.cta")}
          </button>
        </form>
      </div>

      {(status === "loading" || status === "notfound" || status === "found") && (
        <section id="tracking-result" className="py-16 sm:py-20 scroll-mt-20">
          <div className="container-page">
            {status === "loading" && (
              <p className="text-center text-navy/60">{t("searching")}</p>
            )}

            {status === "notfound" && (
              <div className="mx-auto max-w-md rounded-xl border border-gold/40 bg-gold/10 p-6 text-center">
                <p className="font-heading font-semibold text-navy">
                  {t("notFoundTitle")}
                </p>
                <p className="mt-2 text-sm text-navy/70">{t("notFoundText")}</p>
              </div>
            )}

            {status === "found" && result && (
              <div className="mx-auto max-w-2xl rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy/10 pb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                      {t("result.trackingNumberLabel")}
                    </p>
                    <p className="font-heading text-xl font-bold text-navy">
                      {result.numero}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                      {t("result.currentStatusLabel")}
                    </p>
                    <p className="font-heading text-lg font-bold text-gold">
                      {currentStatusLabel}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-navy/50">{t("result.routeLabel")}</dt>
                    <dd className="font-medium text-navy">{result.trajet}</dd>
                  </div>
                  <div>
                    <dt className="text-navy/50">{t("result.modeLabel")}</dt>
                    <dd className="font-medium text-navy">{result.mode}</dd>
                  </div>
                  <div>
                    <dt className="text-navy/50">{t("result.lastUpdateLabel")}</dt>
                    <dd className="font-medium text-navy">{result.dateMaj}</dd>
                  </div>
                </dl>

                <a
                  href={advisorHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-3 rounded-lg bg-surface p-4 transition-colors hover:bg-navy/5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-navy/50">{t("result.advisorLabel")}</p>
                    <p className="text-sm font-semibold text-navy">{result.conseiller}</p>
                  </div>
                </a>

                <h2 className="mt-8 font-heading text-base font-semibold text-navy">
                  {t("result.timelineTitle")}
                </h2>
                <div className="mt-6">
                  <Timeline steps={steps} currentLabelText={t("result.currentStatusLabel")} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

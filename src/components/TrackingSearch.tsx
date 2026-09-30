"use client";

import { useTranslations } from "next-intl";

export default function TrackingSearch() {
  const t = useTranslations("tracking.hero");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    document
      .getElementById("tracking-result")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <div className="flex-1 text-left">
        <label htmlFor="tracking-number" className="sr-only">
          {t("inputLabel")}
        </label>
        <input
          id="tracking-number"
          name="tracking-number"
          type="text"
          readOnly
          value={t("inputPlaceholder")}
          aria-describedby="tracking-demo-note"
          className="w-full min-h-[44px] rounded-md border border-navy/20 bg-white px-4 text-navy focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
        />
        <p id="tracking-demo-note" className="mt-1 text-xs text-navy/50">
          {t("demoNote")}
        </p>
      </div>
      <button
        type="submit"
        className="min-h-[44px] shrink-0 rounded-md bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        {t("cta")}
      </button>
    </form>
  );
}

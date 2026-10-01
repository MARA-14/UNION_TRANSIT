"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { WHATSAPP_CLAIMS, buildWhatsAppLink } from "@/lib/whatsapp";
import { logToSheet } from "@/lib/sheets";

export default function ClaimForm() {
  const t = useTranslations("claim.form");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const lastName = (form.get("lastName") as string) ?? "";
    const firstName = (form.get("firstName") as string) ?? "";
    const phone = (form.get("phone") as string) ?? "";
    const trackingNumber = (form.get("trackingNumber") as string) ?? "";
    const claimType = (form.get("claimType") as string) ?? "";
    const description = (form.get("description") as string) ?? "";

    const claimTypeLabels: Record<string, string> = {
      delay: t("claimTypeDelay"),
      loss: t("claimTypeLoss"),
      financial: t("claimTypeFinancial"),
      loading: t("claimTypeLoading"),
      other: t("claimTypeOther"),
    };
    const claimTypeLabel = claimTypeLabels[claimType] ?? claimType;

    const lines = [
      t("whatsappMessage.intro"),
      "",
      `${t("whatsappMessage.name")}: ${firstName} ${lastName}`.trim(),
      `${t("whatsappMessage.phone")}: ${phone}`,
    ];

    if (trackingNumber) {
      lines.push(`${t("whatsappMessage.trackingNumber")}: ${trackingNumber}`);
    }

    lines.push(
      `${t("whatsappMessage.claimType")}: ${claimTypeLabel}`,
      `${t("whatsappMessage.description")}: ${description}`,
    );

    const message = lines.join("\n");

    logToSheet({
      type: "reclamation",
      lastName,
      firstName,
      phone,
      trackingNumber,
      claimType: claimTypeLabel,
      description,
    });

    window.open(buildWhatsAppLink(WHATSAPP_CLAIMS, message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const inputClass =
    "w-full min-h-[44px] rounded-md border border-navy/20 bg-white px-4 py-2 text-navy placeholder:text-navy/30 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2";
  const labelClass = "block text-sm font-medium text-navy mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lastName" className={labelClass}>
            {t("lastNameLabel")} <span aria-hidden="true">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="firstName" className={labelClass}>
            {t("firstNameLabel")} <span aria-hidden="true">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phoneLabel")} <span aria-hidden="true">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="trackingNumber" className={labelClass}>
            {t("trackingNumberLabel")}
          </label>
          <input id="trackingNumber" name="trackingNumber" type="text" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="claimType" className={labelClass}>
          {t("claimTypeLabel")} <span aria-hidden="true">*</span>
        </label>
        <select id="claimType" name="claimType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            —
          </option>
          <option value="delay">{t("claimTypeDelay")}</option>
          <option value="loss">{t("claimTypeLoss")}</option>
          <option value="financial">{t("claimTypeFinancial")}</option>
          <option value="loading">{t("claimTypeLoading")}</option>
          <option value="other">{t("claimTypeOther")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          {t("descriptionLabel")} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          className={inputClass}
        />
      </div>

      <p className="text-xs text-navy/50">{t("requiredNote")}</p>

      <button
        type="submit"
        className="w-full sm:w-auto min-h-[44px] rounded-md bg-success px-8 text-sm font-semibold text-white transition-colors hover:bg-success/90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-navy focus-visible:outline-offset-2"
      >
        {t("submit")}
      </button>

      <div role="status" aria-live="polite">
        {submitted && (
          <p className="text-sm font-medium text-success">{t("confirmation")}</p>
        )}
      </div>
    </form>
  );
}

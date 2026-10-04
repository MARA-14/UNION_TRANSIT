"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  WHATSAPP_CLAIMS,
  formatWhatsAppDisplay,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { logToSheet } from "@/lib/sheets";
import { Link } from "@/i18n/navigation";
import { validateFields, normalizeSnPhone, formatSnPhone, type FieldError, type Rule } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

const RULES_KIND: Record<string, string> = {
  lastName: "name",
  firstName: "name",
  phone: "phone",
  trackingNumber: "tracking",
  claimType: "choice",
};

export default function ClaimForm() {
  const t = useTranslations("claim.form");
  const tWa = useTranslations("whatsapp");
  const [status, setStatus] = useState<Status>("idle");
  const tv = useTranslations("validation");
  const [errors, setErrors] = useState<Record<string, FieldError>>({});
  const missing = Object.keys(errors);
  const successRef = useRef<HTMLDivElement>(null);

  // The form is replaced by a shorter confirmation block, which leaves the
  // visitor scrolled below it: bring the confirmation back into view.
  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const lastName = (form.get("lastName") as string) ?? "";
    const firstName = (form.get("firstName") as string) ?? "";
    const phone = (form.get("phone") as string) ?? "";
    const trackingNumber = (form.get("trackingNumber") as string) ?? "";
    const claimType = (form.get("claimType") as string) ?? "";
    const description = (form.get("description") as string) ?? "";

    const rules: Record<string, Rule> = {
      lastName: { kind: "name", required: true },
      firstName: { kind: "name", required: true },
      phone: { kind: "phone", required: true },
      trackingNumber: { kind: "tracking" },
      claimType: {
        kind: "choice",
        required: true,
        choices: ["delay", "loss", "financial", "loading", "other"],
      },
      description: { kind: "text", required: true, min: 10, max: 2000 },
    };
    const values = Object.fromEntries(
      Object.keys(rules).map((name) => [name, (form.get(name) as string) ?? ""]),
    );
    const found = validateFields(values, rules);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setErrors({});

    const claimTypeLabels: Record<string, string> = {
      delay: t("claimTypeDelay"),
      loss: t("claimTypeLoss"),
      financial: t("claimTypeFinancial"),
      loading: t("claimTypeLoading"),
      other: t("claimTypeOther"),
    };
    const claimTypeLabel = claimTypeLabels[claimType] ?? claimType;

    setStatus("sending");
    const success = await logToSheet({
      type: "reclamation",
      lastName,
      firstName,
      phone: formatSnPhone(normalizeSnPhone(phone) as string),
      trackingNumber: trackingNumber.trim(),
      claimType: claimTypeLabel,
      description,
    });

    setStatus(success ? "success" : "error");
  }

  const inputClass =
    "w-full min-h-[44px] rounded-md border border-navy/20 bg-white px-4 py-2 text-navy placeholder:text-navy/30 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2";
  const labelClass = "block text-sm font-medium text-navy mb-1.5";

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className="scroll-mt-28 rounded-xl border border-success/30 bg-success/10 p-6"
      >
        <p className="font-heading font-semibold text-success">
          {t("successTitle")}
        </p>
        <p className="mt-2 text-sm text-navy/70">{t("successText")}</p>
        <p className="mt-4 text-sm">
          <a href={`tel:+${WHATSAPP_CLAIMS}`} className="font-medium text-navy hover:underline">
            {formatWhatsAppDisplay(WHATSAPP_CLAIMS)}
          </a>
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-md bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-dark"
        >
          {t("backHome")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lastName" className={labelClass}>
            {t("lastNameLabel")} <span aria-hidden="true">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" aria-invalid={missing.includes("lastName")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="firstName" className={labelClass}>
            {t("firstNameLabel")} <span aria-hidden="true">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" aria-invalid={missing.includes("firstName")} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phoneLabel")} <span aria-hidden="true">*</span>
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="77 123 45 67" aria-invalid={missing.includes("phone")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="trackingNumber" className={labelClass}>
            {t("trackingNumberLabel")}
          </label>
          <input id="trackingNumber" name="trackingNumber" type="text" maxLength={30} aria-invalid={missing.includes("trackingNumber")} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="claimType" className={labelClass}>
          {t("claimTypeLabel")} <span aria-hidden="true">*</span>
        </label>
        <select id="claimType" name="claimType" aria-invalid={missing.includes("claimType")} defaultValue="" className={inputClass}>
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
          rows={5} aria-invalid={missing.includes("description")}
          className={inputClass}
        />
      </div>

      <p className="text-xs text-navy/50">{t("requiredNote")}</p>

      {missing.length > 0 && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{t("validationError")}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-red-700">
            {missing.map((name) => (
              <li key={name}>
                {tv(`fields.${name}`)} : {errors[name] === "required" ? tv("required") : tv(`invalid.${RULES_KIND[name] ?? "text"}`)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-gold/40 bg-gold/10 p-4">
          <p className="text-sm text-navy">{t("errorText")}</p>
          <a
            href={buildWhatsAppLink(WHATSAPP_CLAIMS)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[44px] items-center rounded-md bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-dark"
          >
            {tWa("writeOnWhatsApp")}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto min-h-[44px] rounded-md bg-success px-8 text-sm font-semibold text-white transition-colors hover:bg-success/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-3 focus-visible:outline-navy focus-visible:outline-offset-2"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

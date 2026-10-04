"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  WHATSAPP_SN,
  WHATSAPP_CN,
  formatWhatsAppDisplay,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { logToSheet } from "@/lib/sheets";
import { Link } from "@/i18n/navigation";

type RequestType = "shipment" | "sourcing";
type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tWa = useTranslations("whatsapp");
  const [requestType, setRequestType] = useState<RequestType>("shipment");
  const [status, setStatus] = useState<Status>("idle");
  const [missing, setMissing] = useState<string[]>([]);
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

    const companyName = (form.get("companyName") as string) ?? "";
    const lastName = (form.get("lastName") as string) ?? "";
    const firstName = (form.get("firstName") as string) ?? "";
    const phone = (form.get("phone") as string) ?? "";
    const email = (form.get("email") as string) ?? "";
    const notes = (form.get("notes") as string) ?? "";

    const isSourcing = requestType === "sourcing";

    const requiredFields = [
      "lastName",
      "firstName",
      "phone",
      isSourcing ? "productToSource" : "goodsType",
    ];
    const empty = requiredFields.filter(
      (name) => !((form.get(name) as string) ?? "").trim(),
    );
    if (empty.length > 0) {
      setMissing(empty);
      setStatus("idle");
      document.getElementById(empty[0])?.focus();
      return;
    }
    setMissing([]);

    const requestTypeLabel = isSourcing
      ? t("requestTypeSourcing")
      : t("requestTypeShipment");

    // Sourcing requests reuse the shipment fields' underlying sheet columns
    // (goodsType/quantity/size/weight) so no spreadsheet schema change is needed.
    const goodsType = isSourcing
      ? (form.get("productToSource") as string) ?? ""
      : (form.get("goodsType") as string) ?? "";
    const quantity = isSourcing ? "" : (form.get("quantity") as string) ?? "";
    const size = isSourcing
      ? (form.get("specs") as string) ?? ""
      : (form.get("size") as string) ?? "";
    const weight = isSourcing
      ? (form.get("expectations") as string) ?? ""
      : (form.get("weight") as string) ?? "";

    const notesForSheet = `[${requestTypeLabel}]${notes ? ` ${notes}` : ""}`;

    setStatus("sending");
    const success = await logToSheet({
      type: "devis",
      companyName,
      lastName,
      firstName,
      phone,
      email,
      goodsType,
      quantity,
      size,
      weight,
      notes: notesForSheet,
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
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <a href={`tel:+${WHATSAPP_SN}`} className="font-medium text-navy hover:underline">
              {formatWhatsAppDisplay(WHATSAPP_SN)}
            </a>
          </li>
          <li>
            <a href={`tel:+${WHATSAPP_CN}`} className="font-medium text-navy hover:underline">
              {formatWhatsAppDisplay(WHATSAPP_CN)}
            </a>
          </li>
        </ul>
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
      <fieldset>
        <legend className={labelClass}>
          {t("requestTypeLabel")} <span aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 min-h-[44px] rounded-md border border-navy/20 px-4 has-[:checked]:border-navy has-[:checked]:bg-navy/5">
            <input
              type="radio"
              name="requestType"
              value="shipment"
              checked={requestType === "shipment"}
              onChange={() => setRequestType("shipment")}
              className="h-4 w-4 accent-navy"
            />
            {t("requestTypeShipment")}
          </label>
          <label className="flex items-center gap-2 min-h-[44px] rounded-md border border-navy/20 px-4 has-[:checked]:border-navy has-[:checked]:bg-navy/5">
            <input
              type="radio"
              name="requestType"
              value="sourcing"
              checked={requestType === "sourcing"}
              onChange={() => setRequestType("sourcing")}
              className="h-4 w-4 accent-navy"
            />
            {t("requestTypeSourcing")}
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="companyName" className={labelClass}>
          {t("companyNameLabel")}
        </label>
        <input id="companyName" name="companyName" type="text" className={inputClass} />
      </div>

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
          <input id="phone" name="phone" type="tel" aria-invalid={missing.includes("phone")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input id="email" name="email" type="email" className={inputClass} />
        </div>
      </div>

      {requestType === "shipment" ? (
        <>
          <div>
            <label htmlFor="goodsType" className={labelClass}>
              {t("goodsTypeLabel")} <span aria-hidden="true">*</span>
            </label>
            <input id="goodsType" name="goodsType" type="text" aria-invalid={missing.includes("goodsType")} className={inputClass} />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="quantity" className={labelClass}>
                {t("quantityLabel")}
              </label>
              <input id="quantity" name="quantity" type="text" className={inputClass} />
            </div>
            <div>
              <label htmlFor="size" className={labelClass}>
                {t("sizeLabel")}
              </label>
              <input id="size" name="size" type="text" className={inputClass} />
            </div>
            <div>
              <label htmlFor="weight" className={labelClass}>
                {t("weightLabel")}
              </label>
              <input id="weight" name="weight" type="text" className={inputClass} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="productToSource" className={labelClass}>
              {t("productToSourceLabel")} <span aria-hidden="true">*</span>
            </label>
            <input
              id="productToSource"
              name="productToSource"
              type="text" aria-invalid={missing.includes("productToSource")}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="specs" className={labelClass}>
              {t("specsLabel")}
            </label>
            <textarea id="specs" name="specs" rows={3} className={inputClass} />
          </div>

          <div>
            <label htmlFor="expectations" className={labelClass}>
              {t("expectationsLabel")}
            </label>
            <textarea id="expectations" name="expectations" rows={3} className={inputClass} />
          </div>
        </>
      )}

      <div>
        <label htmlFor="notes" className={labelClass}>
          {t("notesLabel")}
        </label>
        <textarea id="notes" name="notes" rows={4} className={inputClass} />
      </div>

      <p className="text-xs text-navy/50">{t("requiredNote")}</p>

      {missing.length > 0 && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{t("validationError")}</p>
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-gold/40 bg-gold/10 p-4">
          <p className="text-sm text-navy">{t("errorText")}</p>
          <a
            href={buildWhatsAppLink(WHATSAPP_SN)}
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

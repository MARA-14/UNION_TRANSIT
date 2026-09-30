"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { WHATSAPP_SN, buildWhatsAppLink } from "@/lib/whatsapp";
import { logToSheet } from "@/lib/sheets";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const companyName = (form.get("companyName") as string) ?? "";
    const lastName = (form.get("lastName") as string) ?? "";
    const firstName = (form.get("firstName") as string) ?? "";
    const phone = (form.get("phone") as string) ?? "";
    const email = (form.get("email") as string) ?? "";
    const goodsType = (form.get("goodsType") as string) ?? "";
    const quantity = (form.get("quantity") as string) ?? "";
    const size = (form.get("size") as string) ?? "";
    const weight = (form.get("weight") as string) ?? "";
    const notes = (form.get("notes") as string) ?? "";

    const lines = [t("whatsappMessage.intro"), ""];

    if (companyName) {
      lines.push(`${t("whatsappMessage.companyName")}: ${companyName}`);
    }

    lines.push(
      `${t("whatsappMessage.name")}: ${firstName} ${lastName}`.trim(),
      `${t("whatsappMessage.phone")}: ${phone}`,
    );

    if (email) {
      lines.push(`${t("whatsappMessage.email")}: ${email}`);
    }

    lines.push(`${t("whatsappMessage.goodsType")}: ${goodsType}`);

    if (quantity) {
      lines.push(`${t("whatsappMessage.quantity")}: ${quantity}`);
    }
    if (size) {
      lines.push(`${t("whatsappMessage.size")}: ${size}`);
    }
    if (weight) {
      lines.push(`${t("whatsappMessage.weight")}: ${weight}`);
    }
    if (notes) {
      lines.push(`${t("whatsappMessage.notes")}: ${notes}`);
    }

    const message = lines.join("\n");

    logToSheet({
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
      notes,
    });

    window.open(buildWhatsAppLink(WHATSAPP_SN, message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const inputClass =
    "w-full min-h-[44px] rounded-md border border-navy/20 bg-white px-4 py-2 text-navy placeholder:text-navy/30 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2";
  const labelClass = "block text-sm font-medium text-navy mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
          <label htmlFor="email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input id="email" name="email" type="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="goodsType" className={labelClass}>
          {t("goodsTypeLabel")} <span aria-hidden="true">*</span>
        </label>
        <input id="goodsType" name="goodsType" type="text" required className={inputClass} />
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

      <div>
        <label htmlFor="notes" className={labelClass}>
          {t("notesLabel")}
        </label>
        <textarea id="notes" name="notes" rows={4} className={inputClass} />
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
          <p className="text-sm font-medium text-success">
            {t("confirmation")}
          </p>
        )}
      </div>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/components/icons";
import { logToSheet } from "@/lib/sheets";

export default function AvisForm() {
  const t = useTranslations("home.ambassadors.form");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) return;

    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string) ?? "";
    const comment = (form.get("comment") as string) ?? "";

    logToSheet({ type: "avis", rating, name, comment });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-xl border border-success/30 bg-success/10 px-5 py-4 text-sm font-medium text-success">
        {t("thankYou")}
      </p>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset>
        <legend className="text-sm font-medium text-navy">
          {t("ratingLabel")} <span aria-hidden="true">*</span>
        </legend>
        <div className="mt-2 flex gap-1" role="radiogroup" aria-label={t("ratingLabel")}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={t("starLabel", { value })}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-gold focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              <StarIcon className="h-7 w-7" filled={value <= displayRating} />
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="avis-name" className="text-sm font-medium text-navy">
          {t("nameLabel")}
        </label>
        <input
          id="avis-name"
          name="name"
          type="text"
          className="mt-1.5 w-full min-h-[44px] rounded-md border border-navy/20 bg-white px-4 text-navy focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
        />
      </div>

      <div>
        <label htmlFor="avis-comment" className="text-sm font-medium text-navy">
          {t("commentLabel")}
        </label>
        <textarea
          id="avis-comment"
          name="comment"
          rows={3}
          className="mt-1.5 w-full rounded-md border border-navy/20 bg-white px-4 py-2 text-navy focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="min-h-[44px] w-full sm:w-auto rounded-md bg-success px-6 text-sm font-semibold text-white transition-colors hover:bg-success/90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-navy focus-visible:outline-offset-2"
      >
        {t("submit")}
      </button>
    </form>
  );
}

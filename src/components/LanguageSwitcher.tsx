"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export default function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  function switchTo(nextLocale: "fr" | "en") {
    router.replace(
      // @ts-expect-error -- params shape is dynamic per current route
      { pathname, params },
      { locale: nextLocale },
    );
  }

  const baseBtn =
    "min-w-[44px] min-h-[44px] px-3 rounded-md text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2";

  const activeClass =
    variant === "dark" ? "bg-gold text-navy-dark" : "bg-navy text-white";
  const inactiveClass =
    variant === "dark"
      ? "text-white hover:bg-white/10"
      : "text-navy hover:bg-navy/10";

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-md border border-current/20 p-1"
    >
      <button
        type="button"
        onClick={() => switchTo("fr")}
        aria-pressed={locale === "fr"}
        className={`${baseBtn} ${locale === "fr" ? activeClass : inactiveClass}`}
      >
        {t("fr")}
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={locale === "en"}
        className={`${baseBtn} ${locale === "en" ? activeClass : inactiveClass}`}
      >
        {t("en")}
      </button>
    </div>
  );
}

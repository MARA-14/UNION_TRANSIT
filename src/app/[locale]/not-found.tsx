import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <header className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Union Transit"
            width={140}
            height={108}
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>
        <LanguageSwitcher variant="dark" />
      </header>

      <div className="container-page flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center text-white">
        <p className="font-heading text-6xl font-bold text-gold">404</p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold">
          {t("title")}
        </h1>
        <p className="max-w-md text-white/80">{t("text")}</p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-md bg-gold px-6 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { WHATSAPP_SN, buildWhatsAppLink } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comingSoon.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("comingSoon");
  const tWa = await getTranslations("whatsapp");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-navy px-6 py-16 text-center text-white">
      <div className="absolute right-6 top-6">
        <LanguageSwitcher variant="dark" />
      </div>

      <Image
        src="/logo.png"
        alt="Union Transit"
        width={200}
        height={155}
        className="h-24 w-auto brightness-0 invert"
        priority
      />

      <h1 className="font-heading text-3xl sm:text-4xl font-bold">
        {t("title")}
      </h1>
      <p className="max-w-md text-white/80">{t("text")}</p>

      <a
        href={buildWhatsAppLink(WHATSAPP_SN, t("title"))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center rounded-md bg-gold px-6 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        {tWa("writeOnWhatsApp")}
      </a>
    </div>
  );
}

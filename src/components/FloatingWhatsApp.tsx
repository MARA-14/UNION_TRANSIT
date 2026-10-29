import { useTranslations } from "next-intl";
import { buildWhatsAppLink, WHATSAPP_SN } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export default function FloatingWhatsApp() {
  const t = useTranslations("whatsapp");

  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_SN, t("floatingMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("talkToAdvisor")}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1ebe5a] focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2 sm:bottom-6 sm:right-6 sm:px-5"
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0" />
      <span className="hidden sm:inline">{t("floatingLabel")}</span>
    </a>
  );
}

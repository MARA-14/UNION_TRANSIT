import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_CN, WHATSAPP_SN, formatWhatsAppDisplay } from "@/lib/whatsapp";
import { SITE_EMAIL, SITE_ADDRESS_HQ } from "@/lib/contact";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-page py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Union Transit"
              width={140}
              height={108}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="font-heading text-xl font-bold">
              UNION <span className="text-gold">TRANSIT</span>
            </p>
          </div>
          <p className="mt-3 text-sm italic text-white/70">
            &ldquo;{t("about.whoWeAre.slogan")}&rdquo;
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
            {t("footer.navTitle")}
          </h2>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="text-white/80 hover:text-white">
              {t("nav.home")}
            </Link>
            <Link href="/services" className="text-white/80 hover:text-white">
              {t("nav.services")}
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white">
              {t("nav.about")}
            </Link>
            <Link href="/tracking" className="text-white/80 hover:text-white">
              {t("nav.tracking")}
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white">
              {t("nav.contact")}
            </Link>
            <Link href="/claim" className="text-white/80 hover:text-white">
              {t("footer.claimLink")}
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
            {t("footer.contactTitle")}
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${SITE_EMAIL}`} className="hover:text-white">
                {SITE_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:+${WHATSAPP_SN}`} className="hover:text-white">
                {formatWhatsAppDisplay(WHATSAPP_SN)}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:+${WHATSAPP_CN}`} className="hover:text-white">
                {formatWhatsAppDisplay(WHATSAPP_CN)}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              <span>{SITE_ADDRESS_HQ}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col-reverse items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} Union Transit. {t("footer.rights")}
          </p>
          <Link
            href="/legal"
            className="text-xs text-white/70 hover:text-white underline underline-offset-4"
          >
            {t("footer.legalLink")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

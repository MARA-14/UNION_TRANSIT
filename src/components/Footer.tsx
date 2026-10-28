import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_CN, WHATSAPP_SN, formatWhatsAppDisplay } from "@/lib/whatsapp";
import { SITE_EMAIL, SITE_ADDRESS_HQ, SITE_FACEBOOK, SITE_TIKTOK } from "@/lib/contact";
import { MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, TikTokIcon } from "@/components/icons";
import { LANDINGS } from "@/lib/landings";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const socials = [
    { href: SITE_FACEBOOK, label: t("footer.facebookLabel"), icon: <FacebookIcon className="h-5 w-5" /> },
    { href: SITE_TIKTOK, label: t("footer.tiktokLabel"), icon: <TikTokIcon className="h-5 w-5" /> },
  ].filter((s) => s.href);

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container-page py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
            <Link href="/blog" className="text-white/80 hover:text-white">
              {t("nav.blog")}
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
            {t("footer.routesTitle")}
          </h2>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            {LANDINGS.map((l) => (
              <Link key={l.key} href={l.href} className="text-white/80 hover:text-white">
                {t(`landing.common.nav.${l.key}`)}
              </Link>
            ))}
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
          {socials.length > 0 && (
            <div className="mt-5">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-gold">
                {t("footer.socialTitle")}
              </h3>
              <ul className="mt-3 flex items-center gap-3">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy-dark"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} Union Transit. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/70 hover:text-white underline underline-offset-4"
            >
              {t("footer.privacyLink")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/70 hover:text-white underline underline-offset-4"
            >
              {t("footer.termsLink")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

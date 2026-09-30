"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links: { href: "/" | "/services" | "/about" | "/tracking"; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/tracking", label: t("tracking") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Union Transit"
            width={140}
            height={108}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label={t("home")}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`min-h-[44px] flex items-center px-3 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                  isActive ? "text-navy font-semibold" : "text-navy/70 hover:text-navy hover:bg-navy/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`min-h-[44px] flex items-center px-3 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2 ${
              pathname === "/contact" ? "text-navy font-semibold" : "text-navy/70 hover:text-navy hover:bg-navy/5"
            }`}
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Right cluster: stays close to the logo at every breakpoint so there is never a bare gap before the menu button. */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher variant="light" />
          </div>
          <Link
            href="/tracking"
            className="inline-flex min-h-[44px] items-center rounded-md border-2 border-navy px-3 sm:px-4 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            {t("trackCta")}
          </Link>
          <Link
            href="/contact"
            className="hidden md:inline-flex min-h-[44px] items-center rounded-md bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            {t("quote")}
          </Link>

          <button
            type="button"
            className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center rounded-md text-navy focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-navy/10 bg-white">
          <nav className="container-page flex flex-col py-2" aria-label={t("home")}>
            {[...links, { href: "/contact" as const, label: t("contact") }].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-h-[44px] flex items-center rounded-md px-3 text-base font-medium ${
                    isActive ? "text-navy font-semibold bg-navy/5" : "text-navy/80 hover:bg-navy/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-3 border-t border-navy/10 pt-3">
              <div className="sm:hidden">
                <LanguageSwitcher variant="light" />
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="md:hidden min-h-[44px] flex items-center justify-center rounded-md bg-navy px-4 text-sm font-semibold text-white"
              >
                {t("quote")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

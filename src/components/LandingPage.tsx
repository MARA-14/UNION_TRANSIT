import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FinalBanner from "@/components/FinalBanner";
import { LANDINGS, type LandingKey } from "@/lib/landings";
import { absoluteUrl } from "@/lib/seo";
import { WHATSAPP_SN, buildWhatsAppLink } from "@/lib/whatsapp";

type Highlight = { label: string; value: string };
type Section = { title: string; text: string };
type Faq = { q: string; a: string };

export default async function LandingPage({
  landingKey,
  locale,
}: {
  landingKey: LandingKey;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: `landing.${landingKey}` });
  const tc = await getTranslations({ locale, namespace: "landing.common" });
  const highlights = t.raw("highlights") as Highlight[];
  const sections = t.raw("sections") as Section[];
  const faq = t.raw("faq") as Faq[];
  const current = LANDINGS.find((l) => l.key === landingKey)!;
  const related = LANDINGS.filter((l) => l.key !== landingKey);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t("hero.title"),
      description: t("meta.description"),
      url: absoluteUrl(current.href, locale),
      provider: { "@id": "https://uniontransitgroup.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "Senegal" },
        { "@type": "Country", name: "China" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: tc("breadcrumbHome"), item: absoluteUrl("/", locale) },
        {
          "@type": "ListItem",
          position: 2,
          name: tc(`nav.${landingKey}`),
          item: absoluteUrl(current.href, locale),
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-b from-surface to-white py-14 sm:py-20">
        <div className="container-page max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-navy/60">
            <Link href="/" className="hover:text-navy underline underline-offset-4">
              {tc("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <span>{tc(`nav.${landingKey}`)}</span>
          </nav>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold leading-tight text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-navy/70">{t("hero.intro")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-md bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              {tc("ctaButton")}
            </Link>
            <a
              href={buildWhatsAppLink(WHATSAPP_SN, tc(`nav.${landingKey}`))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-md border-2 border-navy/20 px-6 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              {tc("ctaWhatsApp")}
            </a>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page max-w-3xl mx-auto">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-navy/10 bg-white p-4 text-center">
                <dt className="text-xs uppercase tracking-wide text-navy/60">{h.label}</dt>
                <dd className="mt-1 font-heading text-base font-semibold text-gold">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-page max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading text-2xl font-bold text-navy">{s.title}</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <div className="container-page max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">{tc("faqTitle")}</h2>
          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="rounded-xl border border-navy/10 bg-white p-5">
                <summary className="cursor-pointer font-heading font-semibold text-navy">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-navy/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page max-w-3xl mx-auto">
          <h2 className="font-heading text-xl font-bold text-navy">{tc("relatedTitle")}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  className="block rounded-lg border border-navy/10 px-4 py-3 text-navy hover:bg-navy/5"
                >
                  {tc(`nav.${l.key}`)} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalBanner
        title={tc("ctaTitle")}
        subtitle={tc("ctaSubtitle")}
        ctaLabel={tc("ctaButton")}
        ctaHref="/contact"
      />
    </>
  );
}

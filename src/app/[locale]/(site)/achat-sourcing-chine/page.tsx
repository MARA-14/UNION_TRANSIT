import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LandingPage from "@/components/LandingPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "landing.sourcing.meta", "/achat-sourcing-chine");
}

export default async function SourcingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LandingPage landingKey="sourcing" locale={locale} />;
}

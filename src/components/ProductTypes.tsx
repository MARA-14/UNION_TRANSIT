import { getTranslations } from "next-intl/server";
import InfoCard from "@/components/InfoCard";
import {
  CarPartsIcon,
  ShirtIcon,
  ChipIcon,
  SparklesIcon,
  PackageIcon,
} from "@/components/icons";

export default async function ProductTypes() {
  const t = await getTranslations("products");

  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
            {t("title")}
          </h2>
          <p className="mt-3 text-navy/70">{t("subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icon={<CarPartsIcon className="h-5 w-5" />}
            title={t("items.autoParts.title")}
            description={t("items.autoParts.description")}
          />
          <InfoCard
            icon={<ShirtIcon className="h-5 w-5" />}
            title={t("items.clothing.title")}
            description={t("items.clothing.description")}
          />
          <InfoCard
            icon={<ChipIcon className="h-5 w-5" />}
            title={t("items.electronics.title")}
            description={t("items.electronics.description")}
          />
          <InfoCard
            icon={<SparklesIcon className="h-5 w-5" />}
            title={t("items.cosmetics.title")}
            description={t("items.cosmetics.description")}
          />
          <div className="sm:col-span-2">
            <InfoCard
              icon={<PackageIcon className="h-5 w-5" />}
              title={t("items.other.title")}
              description={t("items.other.description")}
            />
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-navy/50">{t("note")}</p>
      </div>
    </section>
  );
}

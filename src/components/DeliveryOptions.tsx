import { getTranslations } from "next-intl/server";
import { WarehouseIcon, TruckIcon } from "@/components/icons";

export default async function DeliveryOptions() {
  const t = await getTranslations("delivery");

  const options = [
    { key: "warehouse", icon: <WarehouseIcon className="h-6 w-6" /> },
    { key: "city", icon: <TruckIcon className="h-6 w-6" /> },
  ] as const;

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
            {t("title")}
          </h2>
          <p className="mt-3 text-navy/70">{t("subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {options.map(({ key, icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-navy">
                {icon}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                {t(`options.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-navy/70">
                {t(`options.${key}.description`)}
              </p>
              <p className="mt-3 text-sm font-medium text-navy">
                {t(`options.${key}.ideal`)}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-navy/50">{t("note")}</p>
      </div>
    </section>
  );
}

import { Link } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";

const ctaClass =
  "inline-flex min-h-[44px] items-center rounded-md bg-gold px-6 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white focus-visible:outline-offset-2";

type BaseProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

type InternalProps = BaseProps & { ctaHref: AppPathnames; ctaExternalHref?: never };
type ExternalProps = BaseProps & { ctaExternalHref: string; ctaHref?: never };

export default function FinalBanner(props: InternalProps | ExternalProps) {
  const { title, subtitle, ctaLabel, secondaryLabel, secondaryHref } = props;

  return (
    <section className="bg-navy">
      <div className="container-page py-14 sm:py-16 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-white/80 max-w-xl mx-auto">{subtitle}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {"ctaExternalHref" in props && props.ctaExternalHref ? (
            <a
              href={props.ctaExternalHref}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
            >
              {ctaLabel}
            </a>
          ) : (
            <Link href={(props as InternalProps).ctaHref} className={ctaClass}>
              {ctaLabel}
            </Link>
          )}
          {secondaryHref && secondaryLabel && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-md border-2 border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

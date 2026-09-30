export default function ServiceCard({
  title,
  delay,
  description,
  icon,
}: {
  title: string;
  delay: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
        {icon}
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
        {title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-gold">{delay}</p>
      <p className="mt-2 text-sm text-navy/70">{description}</p>
    </div>
  );
}

export default function InfoCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-navy/10 bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-navy">
        {icon}
      </div>
      <div>
        <h3 className="font-heading text-sm font-semibold text-navy">
          {title}
        </h3>
        <p className="mt-1 text-sm text-navy/70">{description}</p>
      </div>
    </div>
  );
}

export default function ValueCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/20 text-gold">
        {icon}
      </div>
      <h3 className="mt-4 font-heading text-base font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
    </div>
  );
}

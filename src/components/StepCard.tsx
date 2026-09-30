export default function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-xl border border-navy/10 bg-white p-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-navy-dark">
        {number}
      </span>
      <h3 className="mt-4 font-heading text-base font-semibold text-navy">
        {title}
      </h3>
      <p className="mt-2 text-sm text-navy/70">{description}</p>
    </div>
  );
}

export type TimelineStepState = "done" | "current" | "upcoming";

export interface TimelineStep {
  label: string;
  state: TimelineStepState;
}

const stateStyles: Record<TimelineStepState, { dot: string; text: string }> = {
  done: { dot: "bg-success border-success", text: "text-navy" },
  current: { dot: "bg-gold border-gold", text: "text-navy font-semibold" },
  upcoming: { dot: "bg-white border-navy/25", text: "text-navy/45" },
};

export default function Timeline({
  steps,
  currentLabelText,
}: {
  steps: TimelineStep[];
  currentLabelText: string;
}) {
  return (
    <ol className="flex flex-col gap-0">
      {steps.map((step, index) => {
        const styles = stateStyles[step.state];
        const isLast = index === steps.length - 1;
        return (
          <li key={step.label + index} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[9px] top-5 h-full w-0.5 ${
                  step.state === "done" ? "bg-success" : "bg-navy/15"
                }`}
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${styles.dot}`}
            />
            <div>
              <p className={`text-sm ${styles.text}`}>
                {step.label}
                {step.state === "current" && (
                  <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-navy">
                    {currentLabelText}
                  </span>
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";

export default function AccordionCard({
  icon,
  title,
  badge,
  summary,
  details,
}: {
  icon: ReactNode;
  title: string;
  badge?: string;
  summary: string;
  details: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `accordion-panel-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="rounded-xl border border-navy/10 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full min-h-[44px] flex items-start gap-4 p-6 text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
          {icon}
        </span>
        <span className="flex-1">
          <span className="block font-heading text-lg font-semibold text-navy">
            {title}
          </span>
          {badge && (
            <span className="mt-1 block text-sm font-semibold text-gold">
              {badge}
            </span>
          )}
          <span className="mt-2 block text-sm text-navy/70">{summary}</span>
        </span>
        <ChevronDownIcon
          className={`mt-1 h-5 w-5 shrink-0 text-navy/50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div
          id={panelId}
          className="border-t border-navy/10 px-6 pb-6 pt-4 text-sm text-navy/70"
        >
          {details}
        </div>
      )}
    </div>
  );
}

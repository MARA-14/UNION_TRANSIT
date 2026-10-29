type IconProps = { className?: string };

const common = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
} as const;

export function PlaneIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShipIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M3 16.5h18l-2.2 4.5a1 1 0 01-.9.6H6.1a1 1 0 01-.9-.6L3 16.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="9" y="10.5" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 10.5V4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 4.5l4 2.5h-4z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function ContainerIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="2" y="6" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 6v12M10 6v12M14 6v12M18 6v12"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect x="18.5" y="9" width="2" height="6" rx="0.4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c1.2-3.5 4-5.5 7-5.5s5.8 2 7 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M12 21s7-7.1 7-12a7 7 0 10-14 0c0 4.9 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M9 12l2 2 4-4m4 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 011-.24 8.5 8.5 0 002.7.43 1 1 0 011 1V19a1 1 0 01-1 1A15.5 15.5 0 014 5a1 1 0 011-1h3a1 1 0 011 1 8.5 8.5 0 00.43 2.7 1 1 0 01-.24 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VerifiedSealIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({
  className,
  filled = false,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3.5l2.72 5.83 6.28.62-4.7 4.4 1.29 6.28L12 17.6l-5.59 3.03 1.29-6.28-4.7-4.4 6.28-.62L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchCheckIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.5 15.5L21 21M7.5 10.5l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CarPartsIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShirtIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M8.5 3L3 6l2 4 2-1v12h10V9l2 1 2-4-5.5-3a3.5 3.5 0 01-7 0z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChipIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8L10 3zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M12 2.5l8.5 4.5v10L12 21.5 3.5 17V7L12 2.5zM3.5 7L12 11.5 20.5 7M12 11.5v10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WarehouseIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M3 10l9-6 9 6v10H3V10zM8 20v-6h8v6M8 17h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.2v3.3h-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.8" fill="var(--icon-bg, #fff)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="17.5" r="1.8" fill="var(--icon-bg, #fff)" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M16.6 3h-3v12.2a2.6 2.6 0 11-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.6 5.6 0 105.8 5.6V9a7 7 0 004 1.3V7.3A4.2 4.2 0 0116.6 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path
        d="M12 2.5a9.4 9.4 0 00-8.1 14.2L2.6 21.4l4.8-1.2A9.4 9.4 0 1012 2.5zm5.4 13.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.400z"
        fill="currentColor"
      />
    </svg>
  );
}

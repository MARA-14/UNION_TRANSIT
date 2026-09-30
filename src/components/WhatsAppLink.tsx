import type { ReactNode } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppLink({
  number,
  message,
  className,
  children,
}: {
  number: string;
  message?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={buildWhatsAppLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

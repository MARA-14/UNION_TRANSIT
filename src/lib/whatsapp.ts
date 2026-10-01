export const WHATSAPP_SN =
  process.env.NEXT_PUBLIC_WHATSAPP_SN ?? "221789512185";
export const WHATSAPP_CN =
  process.env.NEXT_PUBLIC_WHATSAPP_CN ?? "8613247324081";
// Numero dedie aux reclamations, distinct du numero de demande de devis.
export const WHATSAPP_CLAIMS =
  process.env.NEXT_PUBLIC_WHATSAPP_CLAIMS ?? "212602447494";

const DISPLAY_FORMATS: Record<string, string> = {
  [WHATSAPP_SN]: "+221 78 951 21 85",
  [WHATSAPP_CN]: "+86 132 4732 4081",
  [WHATSAPP_CLAIMS]: "+212 6 02 44 74 94",
};

export function formatWhatsAppDisplay(number: string) {
  return DISPLAY_FORMATS[number] ?? `+${number}`;
}

export function buildWhatsAppLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

const WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

type SheetPayload =
  | { type: "devis"; [key: string]: string }
  | { type: "avis"; rating: number; name: string; comment: string }
  | { type: "reclamation"; [key: string]: string };

/**
 * Writes to the Google Sheet via Apps Script. This is now the primary
 * delivery path for form submissions (the Apps Script also emails a
 * notification on each entry), so callers should await the result and
 * show the visitor an error state if it returns false.
 */
export async function logToSheet(payload: SheetPayload): Promise<boolean> {
  if (!WEBHOOK_URL) return false;

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.warn("logToSheet: request failed", err);
    return false;
  }
}

export interface TrackingResult {
  numero: string;
  mode: string;
  trajet: string;
  etape: number;
  dateMaj: string;
  conseiller: string;
  departPrevu: string;
  arriveePrevue: string;
}

/**
 * Looks up a tracking number in the "Suivi" sheet tab via Apps Script.
 * Returns null when not found, not configured, or on any network error.
 */
export async function lookupTracking(numero: string): Promise<TrackingResult | null> {
  if (!WEBHOOK_URL) return null;

  try {
    const url = `${WEBHOOK_URL}?numero=${encodeURIComponent(numero)}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.found) return null;

    return {
      numero: String(data.numero ?? numero),
      mode: String(data.mode ?? ""),
      trajet: String(data.trajet ?? ""),
      etape: Number(data.etape) || 1,
      dateMaj: String(data.dateMaj ?? ""),
      conseiller: String(data.conseiller ?? ""),
      departPrevu: String(data.departPrevu ?? ""),
      arriveePrevue: String(data.arriveePrevue ?? ""),
    };
  } catch {
    return null;
  }
}

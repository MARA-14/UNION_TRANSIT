const WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

type SheetPayload =
  | { type: "devis"; [key: string]: string }
  | { type: "avis"; rating: number; name: string; comment: string };

/**
 * Fire-and-forget write to the Google Sheet via Apps Script.
 * Never throws: the WhatsApp flow (the primary path) must not be blocked
 * or fail if the sheet is unreachable or not configured yet.
 */
export function logToSheet(payload: SheetPayload) {
  if (!WEBHOOK_URL) return;

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        console.warn("logToSheet: unexpected response", res.status);
      }
    })
    .catch((err) => {
      // Never blocks the WhatsApp flow: the sheet is a convenience log, not the source of truth.
      console.warn("logToSheet: request failed", err);
    });
}

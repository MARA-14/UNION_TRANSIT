export type FieldError = "required" | "invalid";

export type Rule = {
  kind: "name" | "phone" | "email" | "text" | "tracking" | "choice";
  required?: boolean;
  min?: number;
  max?: number;
  choices?: string[];
};

const NAME_RE = /^[^\d_!@#$%^&*()+=[\]{}<>/\\|?~`:;"]{2,50}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TRACKING_RE = /^[A-Za-z0-9-]{4,30}$/;

/**
 * Normalizes a Senegalese number to 9 national digits, or returns null.
 * Accepts an optional +221 / 00221 prefix and spaces, dots, dashes, brackets.
 * Valid: mobiles 70/75/76/77/78 and landlines 3x, followed by 7 digits.
 */
export function normalizeSnPhone(raw: string): string | null {
  let digits = raw.trim().replace(/[\s.\-()]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  if (!/^\d+$/.test(digits)) return null;
  if (digits.length === 12 && digits.startsWith("221")) digits = digits.slice(3);
  return /^(7[05678]|3\d)\d{7}$/.test(digits) ? digits : null;
}

export function formatSnPhone(national: string): string {
  return `221 ${national.slice(0, 2)} ${national.slice(2, 5)} ${national.slice(5, 7)} ${national.slice(7)}`;
}

function check(value: string, rule: Rule): FieldError | null {
  const v = value.trim();
  if (!v) return rule.required ? "required" : null;
  switch (rule.kind) {
    case "name":
      return NAME_RE.test(v) ? null : "invalid";
    case "phone":
      return normalizeSnPhone(v) ? null : "invalid";
    case "email":
      return v.length <= 100 && EMAIL_RE.test(v) ? null : "invalid";
    case "tracking":
      return TRACKING_RE.test(v) ? null : "invalid";
    case "choice":
      return rule.choices?.includes(v) ? null : "invalid";
    default:
      if (v.length < (rule.min ?? 0) || v.length > (rule.max ?? 500)) return "invalid";
      return null;
  }
}

export function validateFields(
  values: Record<string, string>,
  rules: Record<string, Rule>,
): Record<string, FieldError> {
  const errors: Record<string, FieldError> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const err = check(values[name] ?? "", rule);
    if (err) errors[name] = err;
  }
  return errors;
}

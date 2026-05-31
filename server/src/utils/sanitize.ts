import xss from "xss";
import validator from "validator";

export function sanitizeText(input: string, maxLength: number): string {
  const trimmed = input.trim().slice(0, maxLength);
  const stripped = validator.stripLow(trimmed);
  const safe = typeof stripped === "string" ? stripped : trimmed;
  return xss(safe);
}

export function sanitizeEmail(input: string): string {
  const normalized = validator.normalizeEmail(input.trim().toLowerCase());
  return typeof normalized === "string" ? normalized : "";
}

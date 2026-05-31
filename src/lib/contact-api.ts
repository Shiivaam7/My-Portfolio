import type { ContactFormData } from "./contact-validation";
import type { ContactFieldErrors } from "./contact-validation";

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: ContactFieldErrors;
}

const DEV_API_URL = "http://localhost:5000";

function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
      console.warn(
        "[Contact] NEXT_PUBLIC_CONTACT_API_URL is not set — using default:",
        DEV_API_URL
      );
    }
    return DEV_API_URL;
  }

  throw new Error(
    "Contact API is not configured. Set NEXT_PUBLIC_CONTACT_API_URL in .env.local (dev) or Vercel environment variables (production)."
  );
}

export function isContactApiConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() ||
      process.env.NODE_ENV === "development"
  );
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  const baseUrl = getApiBaseUrl();

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      "Network error. Is the contact API running? Start it with: npm run dev:api"
    );
  }

  let payload: ContactApiResponse;
  try {
    payload = (await res.json()) as ContactApiResponse;
  } catch {
    throw new Error("Invalid response from server.");
  }

  if (!res.ok) {
    const err = new Error(payload.message ?? "Failed to send message.") as Error & {
      fieldErrors?: ContactFieldErrors;
    };
    err.fieldErrors = payload.errors;
    throw err;
  }

  return payload;
}

import validator from "validator";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  data?: ContactPayload;
}

const LIMITS = {
  name: { min: 2, max: 100 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 5000 },
} as const;

export function validateContactBody(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object") {
    return { valid: false, errors: { _form: "Invalid request body." } };
  }

  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const subject = typeof raw.subject === "string" ? raw.subject.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!name || name.length < LIMITS.name.min) {
    errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Name must be under ${LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!subject || subject.length < LIMITS.subject.min) {
    errors.subject = `Subject must be at least ${LIMITS.subject.min} characters.`;
  } else if (subject.length > LIMITS.subject.max) {
    errors.subject = `Subject must be under ${LIMITS.subject.max} characters.`;
  }

  if (!message || message.length < LIMITS.message.min) {
    errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Message must be under ${LIMITS.message.max} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: { name, email, subject, message },
  };
}

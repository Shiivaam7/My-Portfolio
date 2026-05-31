export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormData | "_form", string>
>;

const LIMITS = {
  name: { min: 2, max: 100 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData
): { valid: boolean; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};

  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const message = data.message.trim();

  if (!name || name.length < LIMITS.name.min) {
    errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Name must be under ${LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
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

  return { valid: Object.keys(errors).length === 0, errors };
}

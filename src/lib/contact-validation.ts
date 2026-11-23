export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  requirement: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  phone: 32,
  requirement: 3000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeInternationalPhone(value: string): string | null {
  let normalized = value.trim();
  if (normalized.startsWith("00")) normalized = `+${normalized.slice(2)}`;
  normalized = normalized.replace(/[\s().-]/g, "");

  if (!/^\+[1-9]\d{6,14}$/.test(normalized)) return null;
  return normalized;
}

export function validateContactForm(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const requirement = values.requirement.trim();

  if (!name) errors.name = "Enter your full name.";
  else if (name.length > CONTACT_LIMITS.name) errors.name = "Name must be 120 characters or fewer.";

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  else if (values.phone.length > CONTACT_LIMITS.phone || !normalizeInternationalPhone(values.phone)) {
    errors.phone = "Enter a valid number with country code, such as +1 415 555 0132.";
  }

  if (!requirement) errors.requirement = "Tell us a little about your requirement.";
  else if (requirement.length > CONTACT_LIMITS.requirement) {
    errors.requirement = "Your requirement must be 3,000 characters or fewer.";
  }

  return errors;
}

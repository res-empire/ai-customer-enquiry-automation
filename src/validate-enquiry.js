const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and normalise an incoming customer enquiry.
 * Unknown properties are intentionally discarded.
 */
export function validateEnquiry(input) {
  const errors = [];

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, errors: ["Request body must be a JSON object."], data: null };
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const source = typeof input.source === "string" ? input.source.trim() : "";

  if (name.length < 2 || name.length > 100) {
    errors.push("name must be between 2 and 100 characters.");
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.push("email must be a valid email address no longer than 254 characters.");
  }
  if (message.length < 10 || message.length > 5000) {
    errors.push("message must be between 10 and 5000 characters.");
  }
  if (phone.length > 30) {
    errors.push("phone must not exceed 30 characters.");
  }
  if (source.length > 80) {
    errors.push("source must not exceed 80 characters.");
  }

  if (errors.length) {
    return { valid: false, errors, data: null };
  }

  return {
    valid: true,
    errors: [],
    data: {
      name,
      email,
      message,
      phone: phone || null,
      source: source || "unknown"
    }
  };
}

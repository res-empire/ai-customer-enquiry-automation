import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry } from "../src/validate-enquiry.js";

test("accepts a valid enquiry and normalises values", () => {
  const result = validateEnquiry({
    name: " Ada Okafor ",
    email: "ADA@example.com",
    message: "I would like to know more about your services.",
    source: "website",
    unexpected: "discard this"
  });

  assert.equal(result.valid, true);
  assert.equal(result.data.name, "Ada Okafor");
  assert.equal(result.data.email, "ada@example.com");
  assert.equal(result.data.source, "website");
  assert.equal("unexpected" in result.data, false);
});

test("rejects missing and malformed required fields", () => {
  const result = validateEnquiry({ name: "A", email: "not-an-email", message: "Short" });
  assert.equal(result.valid, false);
  assert.ok(result.errors.length >= 3);
});

test("uses unknown when source is omitted", () => {
  const result = validateEnquiry({
    name: "Ada Okafor",
    email: "ada@example.com",
    message: "Please send me information about your service."
  });
  assert.equal(result.valid, true);
  assert.equal(result.data.source, "unknown");
});

test("rejects a non-object request body", () => {
  const result = validateEnquiry(null);
  assert.equal(result.valid, false);
  assert.equal(result.data, null);
});

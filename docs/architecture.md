# System Architecture

## Purpose

Capture customer enquiries once, classify them consistently, keep a structured record, and make the next human action visible.

## Components

| Component | Responsibility | Boundary |
|---|---|---|
| Enquiry form / webhook | Receives customer-submitted fields | Must not accept arbitrary internal fields as trusted |
| n8n | Orchestrates validation, AI call, persistence, and notification | Credentials stored in n8n credential store |
| OpenAI API | Produces structured classification and a suggested reply | Output is advisory and must be validated |
| Airtable | Stores enquiry and follow-up state | Access restricted to authorised operators |
| Notification channel | Alerts the responsible person | Message should avoid exposing unnecessary customer data |

## Data flow

1. Receive a POST request with `name`, `email`, `message`, and optional `phone` and `source`.
2. Validate and normalise the input.
3. Send only the necessary enquiry content to the AI classification step.
4. Parse and validate the model's structured output.
5. Save original and derived fields to Airtable.
6. Notify the assigned team member.
7. Keep follow-up status under human control.

## Classification contract

The AI should return:
- `category`: sales, support, billing, partnership, feedback, or other.
- `intent`: concise description of what the customer wants.
- `urgency`: low, normal, high, or critical.
- `summary`: short factual summary of the message.
- `suggested_reply`: polite draft for staff review.
- `requires_human_review`: boolean.

## Failure handling

- Invalid request: reject before calling the AI provider.
- AI timeout or provider error: preserve the original enquiry where possible, mark classification as pending/failed, and alert an operator.
- Invalid AI response: do not treat it as trusted structured data; route for human review.
- Airtable failure: do not report successful storage; retry safely or alert an operator.
- Notification failure: preserve the enquiry record and surface the notification failure for retry.

## Human oversight

The system must not autonomously promise refunds, prices, delivery dates, diagnoses, legal outcomes, or other commitments. Suggested replies are drafts. A staff member reviews and sends the response.

## Deployment assumptions to confirm

Before production, choose the actual enquiry channel, Airtable base/table, notification channel, data retention period, access roles, and customer privacy notice. These are organisation-specific and are not assumed by this repository.

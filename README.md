# AI Customer Enquiry & Follow-Up Automation

An implementation-focused portfolio project by **Emmanuel Racham / RES Empire**. The system is designed to capture customer enquiries, use AI to classify and summarise them, store structured records, and support timely human follow-up.

> The objective is not to automate conversations blindly. It is to help a business respond consistently, route enquiries correctly, and maintain a reliable record of every request.

## Project status

**Stage 1 — Foundation and design.** This repository currently contains the project specification, data contract, sample payload, and reusable JavaScript logic. The end-to-end n8n workflow and live integrations are the next implementation stages. No live deployment or business results are claimed.

## Target workflow

1. A customer submits an enquiry through a form or webhook.
2. n8n receives the request and validates required fields.
3. The OpenAI API classifies the enquiry and produces a concise summary and suggested reply.
4. Airtable stores the original enquiry and AI-generated fields.
5. The business owner or team receives a notification.
6. A staff member reviews the suggested response, contacts the customer, and updates the follow-up status.

## Planned technology

- **n8n** — workflow orchestration.
- **OpenAI API** — structured enquiry classification and response drafting.
- **Airtable** — enquiry records and follow-up tracking.
- **JavaScript** — validation and reusable workflow logic.
- **GitHub** — version control and project documentation.

## Enquiry fields

| Field | Required | Description |
|---|---:|---|
| name | Yes | Customer's name |
| email | Yes | Customer's contact email |
| message | Yes | Enquiry text |
| phone | No | Optional contact number |
| source | No | Origin such as website, WhatsApp, or referral |

AI output fields will include category, intent, urgency, summary, suggested reply, and a human-review flag. The AI suggestion is a draft, not an automatically sent promise or commitment.

## Repository map

- `docs/architecture.md` — system components, data flow, and operating assumptions.
- `docs/data-schema.md` — input and output data contract.
- `examples/sample-enquiry.json` — safe sample request for testing.
- `src/validate-enquiry.js` — reusable input validation.
- `src/ai-prompt.js` — classification prompt and output contract.
- `test/` — automated tests using Node's built-in test runner.
- `.env.example` — names of configuration variables; never put real secrets here.

## Local development

Requirements: Node.js 20 or later.

```bash
npm test
```

The first stage focuses on validation and prompt-contract tests. The n8n workflow and connected API credentials will be configured in later stages.

## Security and responsible use

- Keep API tokens in n8n credentials or environment variables, never in workflow exports or source files.
- Collect only the customer information the business needs.
- Validate incoming data before sending it to an AI provider.
- Treat AI output as untrusted and require human review before sending customer-facing commitments.
- Do not include sensitive personal, financial, health, or authentication data in test fixtures.
- Configure retention, access permissions, and consent notices for the organisation's actual use case.

## Implementation roadmap

- [x] Define the project scope and target workflow.
- [x] Define the enquiry data contract and sample request.
- [x] Add reusable validation and AI prompt logic.
- [x] Add automated tests for the foundation.
- [ ] Build and import the n8n workflow.
- [ ] Connect OpenAI and Airtable using secure credentials.
- [ ] Test valid, invalid, urgent, and ambiguous enquiries end to end.
- [ ] Add notifications and human-reviewed follow-up.
- [ ] Capture screenshots, workflow export, and test evidence.

## Maintainer

**Emmanuel Racham**  
AI Automation Specialist | ICT & SME Workflow Automation | Technology Educator

- LinkedIn: https://www.linkedin.com/in/emmanuel-racham-francis-0b68b0401/
- GitHub: https://github.com/res-empire

Part of the practical automation portfolio at **Racham Elites Solutions / RES Empire**.

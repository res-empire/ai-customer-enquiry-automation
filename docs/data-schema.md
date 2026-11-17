# Data Contract

## Incoming enquiry

```json
{
  "name": "Ada Okafor",
  "email": "ada@example.com",
  "message": "Hello, I would like to know more about your service plans.",
  "phone": "+2348000000000",
  "source": "website"
}
```

### Required fields

- `name`: trimmed string, 2–100 characters.
- `email`: trimmed email address, maximum 254 characters.
- `message`: trimmed string, 10–5,000 characters.

### Optional fields

- `phone`: string, maximum 30 characters.
- `source`: string, maximum 80 characters. Defaults to `unknown`.

Unknown fields should be ignored by the validation layer. Never accept an incoming `status`, `urgency`, or `classification` as authoritative; these are set by the workflow.

## AI classification result

```json
{
  "category": "sales",
  "intent": "Requesting information about service plans",
  "urgency": "normal",
  "summary": "The customer wants details about available service plans.",
  "suggested_reply": "Hello Ada, thank you for reaching out...",
  "requires_human_review": true
}
```

Allowed categories: `sales`, `support`, `billing`, `partnership`, `feedback`, `other`.

Allowed urgency values: `low`, `normal`, `high`, `critical`.

## Suggested Airtable columns

| Column | Type |
|---|---|
| Name | Single line text |
| Email | Email |
| Phone | Phone number or single line text |
| Message | Long text |
| Source | Single line text |
| Category | Single select |
| Intent | Long text |
| Urgency | Single select |
| Summary | Long text |
| Suggested Reply | Long text |
| Human Review Required | Checkbox |
| Follow-up Status | Single select: New, In Progress, Contacted, Resolved |
| Received At | Date/time |
| AI Processing Status | Single select: Pending, Completed, Failed |

The exact Airtable field names and select options must match the table configuration before connecting the workflow.

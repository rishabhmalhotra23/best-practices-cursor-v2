# Kognitos Automation Template

Build Kognitos automations using Cursor AI + Quill agent. This repo contains best practices, proven patterns, and reusable code from production automation projects.

## What's Inside

### Cursor Rules (`.cursor/rules/`)
AI-guided rules that Cursor follows when building automations:

| Rule | Purpose |
|------|---------|
| `01-kognitos-api.mdc` | API reference: endpoints, auth, response formats, gotchas |
| `02-quill-agent.mdc` | How to talk to Quill: create/modify automations, SPy limitations |
| `03-automation-patterns.mdc` | Proven patterns: IDP extraction, Epicor validation, SharePoint, Excel, email |
| `04-workflow.mdc` | Step-by-step workflow for building a new automation |

### Library (`lib/`)
Reusable TypeScript helpers:

| File | Purpose |
|------|---------|
| `kognitos.ts` | API client: `req()`, `invokeAutomation()`, `pollRun()`, `parseOutputValue()` |
| `quill.ts` | Quill agent: `createQuillThread()`, `askQuill()`, NDJSON parser |
| `spy.ts` | Inline code execution: `runSpy()` with Arrow IPC decoding |

### Scripts (`scripts/`)

| Script | Purpose |
|--------|---------|
| `verify-connection.ts` | Test API connectivity, list automations |
| `continue-quill.ts` | Send messages to Quill to create/modify automations |

## Quick Start

```bash
# 1. Clone and setup
cp .env.example .env
# Edit .env with your Kognitos credentials

# 2. Install
npm install

# 3. Verify connection
npm run verify

# 4. Talk to Quill
npm run quill -- "Create an automation that..."
```

## How It Works

1. **You describe what you want** in plain English
2. **Quill creates the automation** on the Kognitos platform (SPy code)
3. **You test and iterate** using the test harness
4. **Quill fixes issues** based on your feedback
5. **You publish** when accuracy is good enough

All automation logic runs inside Kognitos. The local TypeScript is only for development and testing.

## Key Principles

### Talk to Quill, Don't Write SPy
- Quill is the only one who should write/edit SPy code
- Send clear, specific instructions with exact procedure signatures
- Always ask Quill to search for procedures before using them
- Test after every change

### Name > Number for Handwritten Documents
- Employee names are more reliable than handwritten IDs
- Use names as the primary match signal, IDs as confirmation
- Fuzzy match against reference data (BAQ, master lists)

### Archive Last, Email Always
- Source file archiving should be the very last step
- If anything fails, the source stays available for retry
- Always send an email notification, even on errors

### Validate Against Source of Truth
- Don't just extract — validate against ERP/master data
- Auto-correct when confident (name match + ID close)
- Flag for review when uncertain
- Show confidence levels so users know what to trust

## Connections Commonly Used

| Integration | Book | Purpose |
|------------|------|---------|
| IDP | `idp` | Document extraction (OCR, table extraction) |
| Epicor | `epicor` | ERP validation (BAQs for employees, jobs) |
| SharePoint | `sharepoint` | File fetch, upload, archive |
| Excel Standalone | `excel_standalone` | Create Excel files with formatting |
| Outlook | `outlook` | Send email notifications with attachments |
| Email | `email` | Trigger-only (fires automation on incoming email) |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `KOGNITOS_TOKEN` | Personal access token (`kgn_pat_...`) |
| `KOGNITOS_ORG_ID` | Organization ID |
| `KOGNITOS_WORKSPACE_ID` | Workspace ID |
| `KOGNITOS_BASE_URL` | API base URL (must end with `/api/v1`) |
| `KOGNITOS_AUTOMATION_ID` | Target automation ID (set after creation) |

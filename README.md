# Kognitos Automation Template

Build Kognitos automations using Cursor AI + Quill agent. This repo contains best practices, proven patterns, and reusable code distilled from production automation projects.

## What's Inside

### Cursor Rules (`.cursor/rules/`)
AI-guided rules that Cursor follows automatically when building automations:

| Rule | What it covers |
|------|---------------|
| `01-kognitos-api.mdc` | REST API: endpoints, auth, response formats, typed values, gotchas |
| `02-quill-agent.mdc` | Quill agent: how to create/modify automations, SPy language limitations, NDJSON parsing |
| `03-automation-patterns.mdc` | Integration patterns: document extraction, ERP validation, file storage, Excel, email, error handling |
| `04-workflow.mdc` | Step-by-step phases for building a new automation from scratch |

### Library (`lib/`)
Reusable TypeScript helpers for interacting with the Kognitos API:

| File | Purpose |
|------|---------|
| `kognitos.ts` | API client: `req()`, `invokeAutomation()`, `pollRun()`, `parseOutputValue()` |
| `quill.ts` | Quill agent: `createQuillThread()`, `askQuill()`, NDJSON response parser |
| `spy.ts` | Inline code execution: `runSpy()` with Arrow IPC table decoding |

### Scripts (`scripts/`)

| Script | Purpose |
|--------|---------|
| `verify-connection.ts` | Test API connectivity and list automations |
| `continue-quill.ts` | Send messages to Quill to create/modify automations |

## Quick Start

```bash
# 1. Clone and setup
git clone git@github.com:rishabhmalhotra23/best-practices-cursor-v2.git my-automation
cd my-automation
cp .env.example .env
# Edit .env with your Kognitos credentials

# 2. Install
npm install

# 3. Verify connection
npm run verify

# 4. Start building — talk to Quill
npm run quill -- "Create an automation that processes invoices from SharePoint..."
```

## How It Works

1. **You describe what you want** in plain English
2. **Quill creates the automation** on the Kognitos platform
3. **You test and iterate** using the local test harness
4. **Quill fixes issues** based on your feedback
5. **You publish** when quality is good enough

All automation logic runs inside Kognitos. Local TypeScript is only for development and testing.

## Key Principles

### Talk to Quill, Don't Write SPy
Quill is the only one who writes automation code. Send clear instructions, test the result, iterate.

### Test After Every Change
SPy errors compound quickly. One change → one test → next change.

### Validate Against Source of Truth
Don't trust OCR or extracted data blindly. Always validate against your ERP, database, or master lists.

### Archive Last, Notify Always
Source files should only be archived after ALL processing succeeds. Users should always get a notification, even on errors.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `KOGNITOS_TOKEN` | Personal access token (`kgn_pat_...`) |
| `KOGNITOS_ORG_ID` | Organization ID |
| `KOGNITOS_WORKSPACE_ID` | Workspace ID |
| `KOGNITOS_BASE_URL` | API base URL (**must** end with `/api/v1`) |
| `KOGNITOS_AUTOMATION_ID` | Target automation ID (set after creation) |

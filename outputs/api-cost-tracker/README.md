# YMSTUDIO API Cost Tracker

A static, local-first cost planner for AI creators who need to understand where Claude, OpenAI/Codex, Nano Banana, MCP tools, ComfyUI/local, Runway, Kling, and custom workflows are spending money or credits.

## What it does

- Logs manual usage entries by provider, project, workflow, category, quantity, unit cost, and credits used.
- Includes pricing presets for common creator workflows: planning sessions, Codex implementation, image batches, MCP automation, local renders, and video clips.
- Tracks monthly budget and monthly credit allowance.
- Shows current burn, projected month-end spend, remaining safe budget, daily average, budget percentage, credit percentage, and warning level.
- Reports provider breakdown, category breakdown, top workflows, and practical recommendations.
- Supports provider, category, project, and text filtering.
- Exports the current month as Markdown or CSV.
- Exports and imports the full tracker state as JSON for backups or local handoff.
- Uses a two-step delete flow with undo for safer ledger cleanup.
- Persists everything in browser `localStorage`.

## Example workflows

Use the presets as starting estimates, then adjust the unit cost to match your actual plan or credit model.

| Provider | Preset example | Why track it |
| --- | --- | --- |
| Claude | Planning and review session | Shows which work stayed inside plan-included manual usage. |
| OpenAI/Codex | Implementation token pass | Helps compare repeated coding loops against budget. |
| Nano Banana | Character image batch | Makes image exploration spend visible before scaling. |
| MCP tools | Browser/file automation runs | Captures small repeated automation costs. |
| ComfyUI/local | Local thumbnail renders | Records avoided API spend and local production volume. |
| Runway | Final video generation | Tracks higher-cost video clips and credit burn. |
| Kling | Motion variant generation | Compares alternate video workflows. |
| Custom provider | Custom calls | Gives a template for any provider not listed yet. |

## Why AI creators need cost tracking

AI production work often mixes plan-included CLI/manual usage with paid SDK calls, image/video credits, MCP automation runs, and local model rendering. Without a simple ledger, it is easy to spend API credits on workflows that should have stayed in Claude CLI, Codex CLI, browser/manual tooling, or ComfyUI/local generation. This tracker makes those tradeoffs visible before the monthly bill or credit balance becomes a surprise.

## Run locally

Open `index.html` directly in a browser:

```powershell
start .\index.html
```

No build step, server, account, deployment, or paid API is required.

## Backup and restore

Use `Export JSON` to download a full local backup of settings and entries. Use `Import JSON` to restore that same state in another browser profile or after clearing local storage.

CSV and Markdown exports are monthly reports. JSON is the full editable tracker state.

## Run tests

From this folder:

```powershell
node test.js
node --check app.js
node --check state.js
node --check test.js
```

## Intentionally out of scope

- Automatic provider imports from billing dashboards.
- OAuth, API keys, account sync, or external uploads.
- Team sharing and cloud storage.
- Exact token-price modeling for every provider plan.
- Payment processing or subscription management.

## Monetization direction

This module can become a paid template for creator operations dashboards, a setup service for studios that need provider-specific cost categories and budget rules, and a future importer bundle for OpenAI, Anthropic, image/video providers, automation runners, and MCP tool logs. The current MVP stays local and manual so creators can start tracking spend immediately without connecting accounts.

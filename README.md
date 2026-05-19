# YMSTUDIO AI Creator OS

Local-first AI Creator OS for prompts, scripts, shot planning, API cost tracking, YouTube scheduling, and asset management.

[Live Demo](https://ymstudio-lab.github.io/ymstudio-ai-creator-os/)

![YMSTUDIO AI Creator OS dashboard](docs/assets/dashboard-desktop.png)

YMSTUDIO AI Creator OS is a browser-based MVP bundle for AI video and content creators. It runs as static files, stores data in your browser `localStorage`, and does not require a server, login, upload, or paid API call.

## Modules

| Module | What it helps with |
| --- | --- |
| Creator Prompt Board | Save, search, rate, and reuse creator prompts |
| AI Shot Planner | Plan scenes, shots, generation prompts, and production notes |
| API Cost Tracker | Manually track AI tool usage, credits, budgets, and warnings |
| YouTube Calendar | Manage content ideas, status, upload dates, and weekly plans |
| Creator Asset Manager | Organize generated images, videos, prompts, licenses, and file paths |
| Thumbnail Idea Board | Plan thumbnail hooks, Korean overlay text, layouts, palettes, and image prompts |
| Template Library | Use built-in creator templates for hooks, thumbnails, scripts, shot plans, calendars, assets, characters, and ComfyUI recipes |
| Script Generator | Turn a Creator Project into hooks, outlines, scene narration, CTAs, and reusable script drafts |
| ComfyUI Workflow Manager | Save reusable local generation recipes for models, resolution, steps, batch, prompts, and failure fixes |
| Creator OS Dashboard | Open all modules from one local control panel |

## Creator Project Flow

The dashboard includes a local Creator Project profile for a single video project:

- Channel name, video topic, target audience, video goal, platform, tone, AI tools, and project folder name
- Guided workflow from topic setup to template selection, prompt storage, shot planning, thumbnail planning, upload planning, asset notes, and cost tracking
- Project JSON export/import for local backup
- Current project banner on module pages so each tool can reference the same project context
- Script Generator can send scene drafts directly into AI Shot Planner without overwriting valid existing plans
- Script Generator can also send upload ideas into YouTube Calendar
- ComfyUI Workflow Manager can turn the saved Creator Project into a local generation recipe
- Thumbnail Idea Board can send thumbnail prompts into YouTube Calendar
- AI Shot Planner can send selected shots into Creator Asset Manager
- Dashboard progress cards show whether project, templates, scripts, shots, thumbnails, calendar items, and assets exist locally
- Dashboard setup card shows browser-visible CPU/RAM/GPU hints and recommends low-spec, balanced, local-first, or cloud-first LLM/ComfyUI workflows

Project planning notes are kept outside the dashboard:

- [Roadmap](ROADMAP.md)
- [Publishing checklist](PUBLISHING_CHECKLIST.md)

## Quick Start

Use the hosted demo:

```text
https://ymstudio-lab.github.io/ymstudio-ai-creator-os/
```

Or run locally:

1. Download or clone this repository.
2. Open this file in your browser:

```text
outputs/creator-os-dashboard/index.html
```

The root `index.html` also redirects to the dashboard.

## Beginner Flow

1. Open the dashboard.
2. Choose the module you need.
3. Start with the demo data.
4. Replace sample titles, notes, prompts, dates, and tags with your own work.
5. Back up important data with `Export JSON`.

## Data And Privacy

- Data is stored in your browser `localStorage`.
- No account is required.
- No data is uploaded by this app.
- No external API call is made by this app.
- Data is not automatically synced across browsers or devices.

Do not enter API keys, passwords, customer personal data, payment data, or private contract information.

## Status

- Public local MVP
- Static HTML/CSS/JavaScript
- Desktop and mobile screenshot checks passed
- Module tests passed
- No backend, auth, upload, or paid API dependency

## Verification

Run a module test from each module folder:

```powershell
node test.js
```

Run the full screenshot check from this workspace layout:

```powershell
python scripts\capture_creator_os_screenshots.py
```

Run the browser interaction check from this workspace layout:

```powershell
python scripts\test_creator_os_interactions.py
```

Security pattern scan:

```powershell
rg -n "window\.prompt|fetch\(|XMLHttpRequest|sendBeacon|eval\(|new Function|document\.write|api[_-]?key|secret|password" outputs
```

## Roadmap

- Move data between modules with shared JSON exports
- Add one shared project profile for channel, campaign, and client metadata
- Expand the template library based on saved/rated/copied template patterns
- Add deeper direct imports into Shot Planner, Calendar, Asset Manager, and Cost Tracker
- Prepare optional automation adapters after the offline-first workflow is stable

See [Roadmap](ROADMAP.md) for the current planning list.

## License

See [LICENSE](LICENSE).

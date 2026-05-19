# YMSTUDIO AI Creator OS

Local-first creator workspace for planning AI video/content projects without a server, login, upload, or paid API call.

[Live Demo](https://ymstudio-lab.github.io/ymstudio-ai-creator-os/)

![YMSTUDIO AI Creator OS dashboard](docs/assets/dashboard-desktop.png)

YMSTUDIO AI Creator OS is a browser-based MVP bundle for solo creators, AI video makers, and beginners who need a repeatable production flow. It turns one video idea into a project profile, template choices, scripts, prompts, ComfyUI recipes, character notes, shot plans, thumbnails, upload schedules, assets, and cost notes.

## Who This Is For

- Beginners who do not know which AI video task to do next
- Solo creators who want reusable templates instead of blank pages
- ComfyUI and AI image/video users who need recipe and failure-fix notes
- YouTube creators who want scripts, thumbnails, calendar, assets, and review notes in one local workspace
- People who prefer offline-first tools before connecting paid APIs or automation

## What It Does

1. Save one Creator Project with channel, topic, target viewer, goal, platform, tone, AI tools, and folder name.
2. Follow the dashboard order: Template -> Script -> Prompt -> ComfyUI -> Character -> Shot Plan -> Thumbnail -> Calendar -> Assets/Costs.
3. Use demo data first, then replace titles, prompts, dates, and notes with your own work.
4. Export JSON from the project and modules for local backup.

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
| Character Consistency Tool | Build reusable character bibles for face, hair, outfit, reference notes, prompts, and scene checks |
| Creator OS Dashboard | Open all modules from one local control panel |

## Beginner UX Status

Every module includes a Korean "처음 쓰는 순서" guide, demo data, local editing, and JSON export/import. Screenshot tests check desktop/mobile layout, missing beginner guides, broken Korean text, and horizontal overflow.

The dashboard and template modules are the easiest entry points. Shot planning, asset management, and cost tracking are more detailed because they model real production work, but they are still usable from the included sample data.

## Creator Project Flow

The dashboard includes a local Creator Project profile for a single video project:

- Channel name, video topic, target audience, video goal, platform, tone, AI tools, and project folder name
- Guided workflow from topic setup to template selection, prompt storage, shot planning, thumbnail planning, upload planning, asset notes, and cost tracking
- Project JSON export/import for local backup
- Current project banner on module pages so each tool can reference the same project context
- Script Generator can send scene drafts directly into AI Shot Planner without overwriting valid existing plans
- Script Generator can also send upload ideas into YouTube Calendar
- ComfyUI Workflow Manager can turn the saved Creator Project into a local generation recipe
- Character Consistency Tool can turn the saved Creator Project into a reusable character bible
- Thumbnail Idea Board can send thumbnail prompts into YouTube Calendar
- AI Shot Planner can send selected shots into Creator Asset Manager
- Dashboard progress cards show whether project, templates, scripts, shots, thumbnails, calendar items, and assets exist locally
- Dashboard setup card shows browser-visible CPU/RAM/GPU hints and recommends low-spec, balanced, local-first, or cloud-first LLM/ComfyUI workflows
- Dashboard operations cards summarize the current project, next focus task, backup reminders, and local/offline safety status

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
2. Fill or sample-fill the Creator Project.
3. Check "오늘의 작업 상태" to see the next task.
4. Open the recommended module.
5. Start with demo data and replace it with your own work.
6. Back up important data with `Export JSON`.

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

## Public Launch Notes

- [v1 public launch checklist](docs/V1_PUBLIC_LAUNCH.md)
- [UI review notes](docs/UI_REVIEW.md)

## Roadmap

- Improve direct module-to-module imports where they save real repeated work
- Add more high-signal templates based on user feedback
- Prepare optional automation adapters only after offline-first usage is validated
- Consider NAS/server sync later, after local MVP traction is proven

See [Roadmap](ROADMAP.md) for the current planning list.

## License

See [LICENSE](LICENSE).

# YMSTUDIO YouTube Calendar

Local-first YouTube planning board for AI creators, automation builders, tutorial channels, and monetization experiments.

It keeps video ideas, script outlines, title variants, thumbnail prompts, production status, upload dates, tools, performance notes, weekly density, and pipeline counts in one browser app.

## Why It Exists

AI creators often plan content across ChatGPT, Claude, Discord, YouTube Studio notes, spreadsheets, and folders. This module keeps the planning layer local and structured before upload or publishing.

## Features

- Idea board for Shorts, long-form, live, community, and clip content
- Better demo niches for AI Shorts, AI tools, automation, monetization, and tutorial content
- Script outline per content item with richer title variant and thumbnail prompt examples
- Production status workflow
- Upload calendar grouped by date or week
- Compact weekly planning summary against a weekly upload target
- Pipeline summary with counts by format, status, and upload week
- Channel/project, niche, tool, and performance note fields
- Search and filters by status, format, channel, month, and keyword
- Markdown, CSV, and full-state JSON export
- Full-state JSON import for moving a local calendar between browsers or machines
- Safer delete flow with typed confirmation and immediate undo
- Local persistence with `localStorage`
- Demo data for real creator planning workflows

## Run Locally

Open `index.html` in a browser.

No server, login, deployment, database, YouTube API, or paid API call is required.

All data stays in the browser unless you manually export a file.

## Test

```powershell
node test.js
node --check app.js
node --check state.js
node --check test.js
```

## Out Of Scope

- YouTube API publishing
- OAuth login
- Cloud sync
- Analytics import
- Payment flow
- External uploads

## File Overview

- `index.html` - static app shell
- `style.css` - responsive app styling
- `state.js` - local state, summaries, import/export, and pure helpers
- `app.js` - browser UI wiring
- `test.js` - Node tests for state logic and static UI targets
- `PROMOTION.md` - pitch, launch copy, target users, extension ideas, and roadmap

## Monetization Direction

- 30-day niche content calendar packs
- Shorts script and thumbnail prompt template packs
- Creator launch workflow setup service
- Future YouTube Studio analytics importer
- Team version with review notes and approval status

# YMSTUDIO AI Shot Planner

AI Shot Planner is a local-first production board for AI video creators who need one clean place to plan scenes, prompts, tools, statuses, references, continuity, and exportable handoffs before generation starts.

This module is part of `YMSTUDIO AI Creator OS`.

## Problem It Solves

AI video projects get fragile when prompts live in chat history, reference paths live in folders, status notes live in spreadsheets, and continuity rules live in someone else's memory. AI Shot Planner keeps the episode brief, scene beats, shot prompts, tool choices, generated asset paths, and continuity notes together in a browser-based local workspace.

## Features

- Episode/project summary with goal, format, and audience
- Scene board with editable title, summary, and location fields
- Shot editor for prompt, description, status, tool/model, duration, notes, and asset paths
- Shot statuses: idea, prompt ready, generating, review, approved, rejected
- Continuity fields for character, outfit, location, mood, and camera/style
- Search plus filters by status, scene, tool, or free text
- Safer shot deletion with confirmation and immediate undo
- Local persistence through browser `localStorage`
- Export to Markdown, CSV, or full-plan JSON
- Import JSON in merge or replace mode
- Demo project: `Creator OS Launch Short`

## Local Usage

Open `index.html` in a browser. The app is static and local-only; it does not require a server, account, cloud sync, paid API, or external service.

Your edits are saved automatically in browser storage under the app key. Use `Reset demo` to restore the included example project.

## Import And Export

`Export Markdown` downloads a production-ready shot plan with the episode summary, continuity bible, scenes, shots, prompts, asset paths, and notes.

`Export CSV` downloads a spreadsheet-friendly shot list for editing, handoff, status review, or import into another production tracker.

`Export JSON` downloads the complete editable plan. `Import JSON` supports:

- `Merge import`: appends imported scenes and shots to the current plan.
- `Replace plan`: replaces the current local plan with the imported file.

## Test Command

From this directory:

```bash
node test.js
node --check app.js
node --check state.js
node --check test.js
```

## Monetization Direction

- Storyboard templates for short-form ads, faceless videos, creator launches, product demos, and local business promos
- AI ad/video production packs with reusable scene structures, continuity bibles, prompt systems, and export handoff formats
- Creator setup service that installs local workflows, folder conventions, generation handoff templates, and repeatable shot-planning habits

## Scope Notes

This MVP intentionally avoids login, cloud sync, paid API calls, deployment, real media generation, payment flows, and external uploads. It is designed as a local planning layer for creators using tools such as Runway, Kling, Pika, ComfyUI, Claude, ChatGPT, Nano Banana, and Midjourney.

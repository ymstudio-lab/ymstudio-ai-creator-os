# YMSTUDIO Creator Prompt Board

Creator Prompt Board is a local-first prompt workspace for AI video, image, and content creators. It is part of the `YMSTUDIO AI Creator OS`, a practical toolkit for storing repeatable creator workflows before they become larger project systems.

Use it to collect prompts for YouTube Shorts, product ads, character consistency, thumbnails, storyboards, and ComfyUI/Runway/Kling/Pika workflows without needing a login, backend, or paid API.

## Features

- Prompt library with editable title, body, tool tags, category tags, favorite state, rating, and result notes
- Search plus filters for tool, category, favorite prompts, and minimum rating
- One-click copy formatting for production use
- Local browser storage through `localStorage`
- JSON export using a stable `{ "version": 1, "prompts": [...] }` shape
- JSON import for exported files or raw prompt arrays, with validation and visible success/error feedback
- Demo prompt set designed for AI video/content creator workflows

## Local Usage

1. Open this folder.
2. Open `index.html` in a browser.
3. Add, edit, rate, filter, and copy prompts.
4. Use `Export JSON` to back up the library.
5. Use `Import JSON` to replace the current local library with a validated export or raw prompt array.

All app data stays in the current browser unless you export it manually.

## Import And Export

Exports are JSON files with this shape:

```json
{
  "version": 1,
  "exportedAt": "2026-05-19T00:00:00.000Z",
  "prompts": []
}
```

The importer accepts that exported object or a raw array of prompt objects. It rejects invalid JSON, empty imports, non-object prompt entries, missing titles, missing prompt bodies, invalid tag arrays, invalid favorite values, and invalid ratings.

## Tests

Run from this directory:

```bash
node test.js
node --check app.js
node --check state.js
node --check test.js
```

The tests cover prompt creation, updates, search/filter behavior, favorite toggling, rating normalization, copy formatting, export shape, valid imports, raw array imports, and invalid import rejection.

## Smoke Test Checklist

- Open `index.html` and confirm the prompt list renders.
- Add a prompt, edit its fields, and confirm the selected card updates.
- Use search and filters to narrow the list.
- Copy a prompt and confirm the toast appears.
- Export JSON and confirm the downloaded file contains `version`, `exportedAt`, and `prompts`.
- Import a valid export and confirm a success toast appears.
- Try importing invalid JSON and confirm an error toast appears without clearing the current library.

## Public Scope

This public MVP focuses on local prompt organization:

- Prompt examples for specific channels, formats, tools, and project niches
- Importable workflow templates for short-form video production, thumbnails, ads, and AI spokesperson systems
- Project workspaces for repeated creator tasks
- Version history and result comparison for prompt iteration
- Optional desktop packaging or private hosted sync for creators who need multi-device access

## Scope

This is a local-only MVP. It does not include login, cloud sync, external API calls, paid services, deployment automation, or GitHub publishing.

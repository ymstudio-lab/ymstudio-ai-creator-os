# YMSTUDIO Creator Asset Manager

Local-first catalog for AI creator assets: generated images, video tests, audio placeholders, prompt templates, reference docs, workflow files, and usage/license notes.

The MVP is intentionally static and private. It runs from `index.html`, stores data in browser `localStorage`, and never scans folders, uploads files, or calls external services.

## What It Tracks

- Asset types: image, video, audio, prompt, reference, document, workflow
- Title, collection, project, source tool/model, tags, date, and path text
- Prompt/workflow detail, result notes, and license/usage notes
- Status workflow: new, reviewed, approved, used, archived
- Asset health indicators for missing path, license, notes, tags, or prompt detail
- Collection summaries with counts, approval/usage status, latest date, type mix, and review needs
- Search and filters by type, status, collection, and keyword
- Markdown, CSV, and JSON export
- JSON import for restoring or moving the full local catalog state

## Demo Catalog

The bundled demo data shows a practical creator workflow:

- Character reference sheets and thumbnail grids
- Runway/Kling video motion tests
- YouTube launch prompt templates
- Sponsor-read usage notes
- ComfyUI workflow metadata
- Studio reference docs
- Audio placeholder tracking with an intentionally missing license note to show health warnings

## Run Locally

Open `index.html` in a browser. No build step is required.

The catalog remains in the browser profile that opened the file. Use `Export JSON` before switching browsers or clearing local storage.

## Import / Export

- `Export Markdown`: readable collection handoff.
- `Export CSV`: spreadsheet-friendly asset inventory.
- `Export JSON`: full local catalog state for backup or migration.
- `Import JSON`: replaces the current local catalog with a validated Creator Asset Manager JSON export.

## Safety Notes

- Delete uses a two-step confirmation and offers undo.
- User-entered fields are rendered as text, not raw HTML.
- File paths are stored as text only. The app does not read local files.
- Import reads only the JSON file explicitly selected by the user.

## Future Folder Scanner Roadmap

Automatic scanning is out of scope for this MVP. A future paid/local extension could add an explicit folder review workflow:

1. User chooses a folder with a browser-supported picker or local desktop wrapper.
2. The app lists candidate files locally and waits for confirmation.
3. User maps file types, default project, collection, and license assumptions.
4. The scanner drafts catalog entries without uploading anything.
5. User reviews and accepts changes before they are written to the local catalog.

The roadmap goal is assisted organization, not background monitoring. No automatic filesystem scan should be added to this MVP.

## Test

```powershell
node test.js
node --check app.js
node --check state.js
node --check test.js
```

## Out Of Scope

- Automatic local folder scanning
- Cloud storage
- Uploads
- AI media generation
- Payment flows
- External API imports

## Monetization Direction

- Creator file system setup service
- Asset organization templates
- Character bible and prompt library packs
- Future folder scanner extension
- Team review workflow

# YMSTUDIO AI Creator OS Dashboard

Static local launcher for the first wave of YMSTUDIO AI Creator OS tools.

## Included Modules

- Creator Prompt Board: prompt library and reusable creator workflow board.
- AI Shot Planner: episode, scene, and shot planning for AI video production.
- API Cost Tracker: manual provider usage, budget, credit, and report tracking.
- YouTube Calendar: idea, script, thumbnail, status, and upload planning.
- Creator Asset Manager: local AI asset catalog with rights and project context.

## Run Locally

Open `index.html` in a browser. The dashboard is static and links to sibling module folders under `outputs`.

No server, deployment, upload, authentication, or paid API is required.

## Tests

Run from this folder:

```powershell
node test.js
node --check app.js
node --check state.js
node --check test.js
```

## Publishing Notes

Before GitHub publishing, review local paths, screenshots, module READMEs, license, and release notes. Keep private project data out of public demo exports.

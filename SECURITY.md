# Security Policy

## Current Security Scope

YMSTUDIO AI Creator OS is a static, local-first browser MVP.

- No backend server is required.
- No login is required.
- No external API call is made by the app.
- App data is stored in browser `localStorage`.
- Files and folders are not scanned automatically.
- Uploading or publishing is not automated.

## Do Not Enter Sensitive Data

This MVP does not provide account permissions, encrypted sync, role-based access, or cloud backup.

Do not enter:

- API keys
- OAuth secrets
- access tokens
- passwords
- customer personal data
- payment data
- private contract information
- private prompts, source files, or paths that should not be public

## Known Limits

- If browser site data is deleted, locally saved data can be lost.
- Data does not automatically sync across browsers or devices.
- Any script served from the same static origin could access the same origin's `localStorage`, so only run trusted copies of the app.
- JSON exports are plain files. Store them only in locations you trust.

## Public Release Checks

Before a public update, run:

```powershell
node test.js
python scripts\test_creator_os_interactions.py
python scripts\test_creator_os_sample_flow.py
python scripts\capture_creator_os_screenshots.py
rg -n "window\.prompt|fetch\(|XMLHttpRequest|sendBeacon|eval\(|new Function|document\.write|api[_-]?key|secret|password" outputs
```

Also check:

- Screenshots do not expose private paths or private data.
- Public docs do not include internal operating notes.
- Release notes describe only public app behavior.

## Reporting

If you find a security issue, open a GitHub issue with:

- affected module
- browser
- reproduction steps
- expected behavior
- actual behavior

Do not include real secrets, customer data, or private files in the issue.

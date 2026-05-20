# Public Repository Boundary Audit

Date: 2026-05-20

## Classification Summary

Public-safe files in this repo:

- Static app code under `outputs/`.
- User-facing README, roadmap, privacy, security, release, and publishing docs.
- Public screenshots under `docs/assets/`.
- Public demo videos and frames under `exports/shorts/`.
- Test and generation scripts under `scripts/` when they do not contain credentials or private operations.

Removed from the public repo working tree:

- Platform and community copy drafts.
- Promotion planning logs.
- Platform metadata and comment draft packages.

Reason: that material belongs outside the public GitHub repo.

## Current Risk Notes

- No API key, OAuth secret, token, password, or `.env` content was found in the public app files during the scan.
- Cost-tracking UI terms such as `pricing preset` are kept because they are app functionality, not pricing or sales strategy.
- Existing modified Shorts images/videos were left intact because they are public demo assets and were already changed before this audit.
- Folders outside this public repository were not touched.

## Commit Rule

Do not run `git add`, `git commit`, or `git push` until Polaris confirms the public/private classification.

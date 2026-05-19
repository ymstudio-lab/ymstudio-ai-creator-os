# AI Agent Work Split

Use this split when Codex and Claude work at the same time. The goal is to avoid file conflicts and duplicated work.

## Codex Owns

Codex should handle implementation, verification, packaging, and repository updates.

Primary files and folders:

- `outputs/`
- `scripts/`
- `exports/`
- `reports/`
- `README.md`
- `SECURITY.md`
- `PRIVACY.md`
- test files

Codex tasks:

- Build or fix app modules
- Generate screenshots and MP4 shorts
- Run browser/UI tests
- Run security scans
- Commit and push releases
- Keep GitHub Pages working

## Claude Owns

Claude should handle marketing, product packaging, copywriting, and upload metadata.

Primary files and folders:

- `docs/shorts/`
- `docs/MONETIZATION_PACKAGE.md`
- `docs/PROMOTION_KIT.md`
- `docs/PROMOTION_LOG.md`
- future ebook/course drafts under `docs/products/`

Claude tasks:

- YouTube titles, descriptions, pinned comments, tags
- Shorts scripts
- Ebook outline and chapter drafts
- Template pack product copy
- Sales page copy
- Community post drafts
- Cross-check claims for marketing clarity

## Shared Rules

- Do not let both agents edit the same file in the same run.
- Claude can do read-only code and UI review, but should not edit implementation files unless explicitly assigned.
- Codex can do read-only marketing review, but should not rewrite all Claude copy unless there is a safety, accuracy, or product-positioning issue.
- API keys, OAuth tokens, cookies, and YouTube credentials must not be written to repo files.
- YouTube upload automation should use local authenticated tools or environment variables only.

## Safe Parallel Work Examples

Good:

- Codex renders `exports/shorts/*.mp4`
- Claude edits `docs/shorts/YOUTUBE_SHORTS_UPLOAD_PACK.md`

Good:

- Codex improves `outputs/template-library/`
- Claude drafts `docs/products/template-pack-sales-page.md`

Risky:

- Claude edits `README.md` while Codex is preparing release/package changes
- Codex edits `docs/PROMOTION_KIT.md` while Claude is preparing campaign copy
- Claude changes screenshots while Codex is generating videos

Ownership rule:

- `README.md` is Codex-primary. Claude may review it read-only.
- `docs/PROMOTION_KIT.md` is Claude-primary. Codex may review it read-only.

## Current Priority Split

### Codex

1. Finish generated Shorts files.
2. Verify dimensions and duration.
3. Add generator script and upload pack to Git.
4. Keep dashboard and GitHub Pages stable.

### Claude

1. Prepare YouTube upload metadata.
2. Draft ebook/course/table-of-contents assets.
3. Draft template pack sales copy.
4. Review claims so public posts do not overpromise.

## Claude Prompt For Safe Work

```text
Work only on docs/shorts, docs/products, docs/PROMOTION_KIT.md, docs/PROMOTION_LOG.md, or docs/MONETIZATION_PACKAGE.md.
Do not edit outputs, scripts, exports, reports, README, SECURITY, PRIVACY, package files, or tests.
Create marketing copy, upload metadata, ebook/course drafts, and product packaging only.
Do not include API keys, OAuth tokens, cookies, or private credentials.
```

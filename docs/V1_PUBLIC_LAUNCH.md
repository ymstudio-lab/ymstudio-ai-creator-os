# v1 Public Launch Checklist

Use this before promoting the GitHub repo publicly.

## Demo Links

- Live demo: https://ymstudio-lab.github.io/ymstudio-ai-creator-os/
- Repository: https://github.com/ymstudio-lab/ymstudio-ai-creator-os
- Feedback: https://github.com/ymstudio-lab/ymstudio-ai-creator-os/issues

## One-Line Pitch

YMSTUDIO AI Creator OS is a local-first workspace that helps creators turn one video idea into templates, scripts, prompts, ComfyUI recipes, character notes, shot plans, thumbnails, upload schedules, assets, and cost notes.

## Short Public Description

This is a browser-based MVP for AI video and content creators. It runs as static files, stores data in your browser, and does not require a server, login, upload, or paid API call. It is designed for beginners who need a clear production order and for creators who want reusable local templates before adding automation.

## Recommended Demo Flow

1. Open the dashboard.
2. Click the sample project fill button.
3. Check the daily work status cards.
4. Open Template Library.
5. Open Script Generator and create from project.
6. Open ComfyUI Workflow Manager and create from project.
7. Open Character Consistency Tool and create from project.
8. Export JSON from the dashboard or a module.

## Public Demo Surfaces

- GitHub repository README
- GitHub Pages demo
- Public screenshots
- Public demo videos
- GitHub Issues feedback templates

## Safe Public Wording

Use:

- Local-first
- Offline-friendly
- Browser-based MVP
- No server required
- No login required
- No external API call from this app
- JSON backup
- Beginner workflow

Avoid overclaiming:

- Do not say it automatically creates finished videos.
- Do not say it guarantees character consistency.
- Do not say it detects exact GPU/VRAM.
- Do not say it replaces ComfyUI, Claude, ChatGPT, or editing tools.

## Before Posting

- Run `node test.js` in key module folders.
- Run `python scripts\test_creator_os_interactions.py`.
- Run `python scripts\capture_creator_os_screenshots.py`.
- Run the security scan from README.
- Confirm screenshots do not expose private paths or private data.
- Confirm the live GitHub Pages demo loads.

## First Feedback Questions

Use GitHub Issues for early feedback:

```text
https://github.com/ymstudio-lab/ymstudio-ai-creator-os/issues
```

- Which module did you understand first?
- Which screen looked too complex?
- Would you use this for a real video project?
- Which template would you want more of?
- Which local workflow would you want improved first?

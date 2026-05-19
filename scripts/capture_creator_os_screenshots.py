from __future__ import annotations

import json
import os
from pathlib import Path
from urllib.parse import quote

from playwright.sync_api import sync_playwright


PROJECT = Path(__file__).resolve().parents[1]
OUTPUTS = PROJECT / "outputs"
SCREENSHOTS = PROJECT / "reports" / "screenshots"
REPORT_PATH = PROJECT / "reports" / "ui-screenshot-report.json"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")

PAGES = [
    ("dashboard", OUTPUTS / "creator-os-dashboard" / "index.html"),
    ("prompt-board", OUTPUTS / "creator-prompt-board" / "index.html"),
    ("shot-planner", OUTPUTS / "ai-shot-planner" / "index.html"),
    ("cost-tracker", OUTPUTS / "api-cost-tracker" / "index.html"),
    ("youtube-calendar", OUTPUTS / "youtube-calendar" / "index.html"),
    ("asset-manager", OUTPUTS / "creator-asset-manager" / "index.html"),
    ("thumbnail-board", OUTPUTS / "thumbnail-idea-board" / "index.html"),
    ("template-library", OUTPUTS / "template-library" / "index.html"),
    ("script-generator", OUTPUTS / "script-generator" / "index.html"),
    ("comfyui-workflow-manager", OUTPUTS / "comfyui-workflow-manager" / "index.html"),
    ("character-consistency-tool", OUTPUTS / "character-consistency-tool" / "index.html"),
]

VIEWPORTS = [
    ("desktop", {"width": 1440, "height": 1000}),
    ("mobile", {"width": 390, "height": 900}),
]


def file_url(path: Path) -> str:
    return "file:///" + quote(str(path.resolve()).replace("\\", "/"), safe="/:")


def png_size(path: Path) -> dict[str, int]:
    data = path.read_bytes()
    if len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n":
      return {"width": 0, "height": 0, "bytes": len(data)}
    return {
        "width": int.from_bytes(data[16:20], "big"),
        "height": int.from_bytes(data[20:24], "big"),
        "bytes": len(data),
    }


def main() -> int:
    SCREENSHOTS.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    executable = CHROME if CHROME.exists() else EDGE
    if not executable.exists():
        raise SystemExit("Chrome or Edge executable was not found.")

    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path=str(executable),
            headless=True,
            args=["--disable-gpu", "--no-first-run", "--disable-extensions"],
        )
        for viewport_name, viewport in VIEWPORTS:
            context = browser.new_context(viewport=viewport, locale="ko-KR")
            page = context.new_page()
            for name, html in PAGES:
                if not html.exists():
                    results.append({
                        "page": name,
                        "viewport": viewport_name,
                        "passed": False,
                        "error": f"missing file: {html}",
                    })
                    continue

                page.goto(file_url(html), wait_until="networkidle")
                page.evaluate(
                    """() => {
                        localStorage.setItem("ymstudio.creatorOS.language", "ko");
                        [
                          "ymstudio.creatorPromptBoard.v1",
                          "ymstudio.aiShotPlanner.v1",
                          "ymstudio.apiCostTracker.v1",
                          "ymstudio.youtubeCalendar.v1",
                          "ymstudio.creatorAssetManager.v1",
                          "ymstudio.thumbnailIdeaBoard.v1",
                          "ymstudio.templateLibrary.v1",
                          "ymstudio.scriptGenerator.v1",
                          "ymstudio.comfyWorkflowManager.v1",
                          "ymstudio.characterConsistencyTool.v1"
                        ].forEach((key) => localStorage.removeItem(key));
                    }"""
                )
                page.reload(wait_until="networkidle")
                page.wait_for_timeout(250)

                overflow = page.evaluate(
                    """() => Array.from(document.querySelectorAll("body *"))
                      .filter((el) => {
                        const style = getComputedStyle(el);
                        const rect = el.getBoundingClientRect();
                        if (style.display === "none" || style.visibility === "hidden") return false;
                        if (el.closest(".visually-hidden,[hidden]")) return false;
                        if (["input", "select", "textarea"].includes(el.tagName.toLowerCase())) return false;
                        if (rect.width < 2 || rect.height < 2) return false;
                        return el.scrollWidth > el.clientWidth + 2;
                      })
                      .slice(0, 20)
                      .map((el) => ({
                        tag: el.tagName.toLowerCase(),
                        className: el.className || "",
                        id: el.id || "",
                        text: (el.innerText || el.textContent || "").trim().slice(0, 120),
                        clientWidth: el.clientWidth,
                        scrollWidth: el.scrollWidth
                      }))"""
                )
                title = page.title()
                text = page.locator("body").inner_text(timeout=3000)
                screenshot_path = SCREENSHOTS / f"{name}-{viewport_name}.png"
                page.screenshot(path=str(screenshot_path), full_page=True)
                size = png_size(screenshot_path)
                passed = size["bytes"] > 10_000 and "처음 쓰는 순서" in text and "�" not in text
                results.append({
                    "page": name,
                    "viewport": viewport_name,
                    "title": title,
                    "screenshot": str(screenshot_path),
                    "png": size,
                    "beginner_guide_present": "처음 쓰는 순서" in text,
                    "replacement_char_free": "�" not in text,
                    "overflow_count": len(overflow),
                    "overflow_samples": overflow,
                    "passed": passed and len(overflow) == 0,
                })
            context.close()
        browser.close()

    payload = {
        "checked_at": __import__("datetime").datetime.now().astimezone().isoformat(timespec="seconds"),
        "mode": "playwright_chrome_headless_screenshot",
        "screenshots_dir": str(SCREENSHOTS),
        "passed": all(item.get("passed") for item in results),
        "results": results,
    }
    REPORT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0 if payload["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from urllib.parse import quote

from playwright.sync_api import sync_playwright


PROJECT = Path(__file__).resolve().parents[1]
OUTPUTS = PROJECT / "outputs"
REPORT_PATH = PROJECT / "reports" / "sample-flow-report.json"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")


LOCAL_KEYS = [
    "ymstudio.creatorProject.v1",
    "ymstudio.templateLibrary.v1",
    "ymstudio.creatorPromptBoard.v1",
    "ymstudio.thumbnailIdeaBoard.v1",
    "ymstudio.scriptGenerator.v1",
    "ymstudio.comfyWorkflowManager.v1",
    "ymstudio.characterConsistencyTool.v1",
    "ymstudio.aiShotPlanner.v1",
    "ymstudio.youtubeCalendar.v1",
    "ymstudio.creatorAssetManager.v1",
    "ymstudio.apiCostTracker.v1",
]


def file_url(path: Path) -> str:
    return "file:///" + quote(str(path.resolve()).replace("\\", "/"), safe="/:")


def read_json(page, key: str, fallback: str):
    return page.evaluate(
        """([storageKey, fallbackJson]) => JSON.parse(localStorage.getItem(storageKey) || fallbackJson)""",
        [key, fallback],
    )


def main() -> int:
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    executable = CHROME if CHROME.exists() else EDGE
    if not executable.exists():
        raise SystemExit("Chrome or Edge executable was not found.")

    checks: list[dict[str, object]] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path=str(executable),
            headless=True,
            args=["--disable-gpu", "--no-first-run", "--disable-extensions"],
        )
        context = browser.new_context(locale="ko-KR", accept_downloads=True)
        page = context.new_page()

        dashboard = OUTPUTS / "creator-os-dashboard" / "index.html"
        page.goto(file_url(dashboard), wait_until="networkidle")
        page.evaluate(
            """(keys) => {
              localStorage.setItem("ymstudio.creatorOS.language", "ko");
              keys.forEach((key) => localStorage.removeItem(key));
            }""",
            LOCAL_KEYS,
        )
        page.reload(wait_until="networkidle")
        page.click("[data-sample-project-shortcut]")

        project = read_json(page, "ymstudio.creatorProject.v1", "{}")
        template_state = read_json(page, "ymstudio.templateLibrary.v1", "{}")
        scripts = read_json(page, "ymstudio.scriptGenerator.v1", "[]")
        shot_plan = read_json(page, "ymstudio.aiShotPlanner.v1", "{}")
        thumbnails = read_json(page, "ymstudio.thumbnailIdeaBoard.v1", "[]")
        calendar = read_json(page, "ymstudio.youtubeCalendar.v1", "{}")
        assets = read_json(page, "ymstudio.creatorAssetManager.v1", "{}")
        costs = read_json(page, "ymstudio.apiCostTracker.v1", "{}")

        checks.extend([
            {
                "name": "sample_project_saved",
                "passed": project.get("channelName") == "YMSTUDIO" and bool(project.get("videoTopic")),
            },
            {
                "name": "sample_templates_seeded",
                "passed": len(template_state.get("saved", [])) >= 3,
            },
            {
                "name": "sample_script_seeded",
                "passed": len(scripts) == 1 and scripts[0].get("title") == "AI 영상 제작 워크플로우 소개",
            },
            {
                "name": "sample_shot_plan_seeded",
                "passed": len(shot_plan.get("scenes", [])) >= 3 and len(shot_plan.get("shots", [])) >= 2,
            },
            {
                "name": "sample_thumbnail_seeded",
                "passed": len(thumbnails) == 1 and bool(thumbnails[0].get("prompt")),
            },
            {
                "name": "sample_calendar_seeded",
                "passed": len(calendar.get("items", [])) == 1 and bool(calendar["items"][0].get("scriptOutline")),
            },
            {
                "name": "sample_assets_seeded",
                "passed": len(assets.get("assets", [])) == 1 and bool(assets["assets"][0].get("filePath")),
            },
            {
                "name": "sample_costs_seeded",
                "passed": len(costs.get("entries", [])) == 1 and costs["entries"][0].get("provider") == "Claude",
            },
        ])

        template = OUTPUTS / "template-library" / "index.html"
        page.goto(file_url(template), wait_until="networkidle")
        page.select_option("#categoryFilter", "썸네일")
        template_count_text = page.locator("#count").inner_text(timeout=3000)
        detail_result = page.locator("#detailResult").inner_text(timeout=3000)
        checks.append({
            "name": "thumbnail_category_finds_templates",
            "passed": "0 templates" not in template_count_text and bool(detail_result.strip()),
        })

        script_generator = OUTPUTS / "script-generator" / "index.html"
        page.goto(file_url(script_generator), wait_until="networkidle")
        page.fill("#briefTopic", "AI 영상 제작 워크플로우")
        page.fill("#briefAudience", "왕초보 크리에이터")
        page.select_option("#briefLength", "Shorts")
        page.select_option("#briefTone", "빠르고 강하게")
        page.click("#buildFromBrief")
        scripts_after_builder = read_json(page, "ymstudio.scriptGenerator.v1", "[]")
        checks.append({
            "name": "beginner_builder_creates_script",
            "passed": len(scripts_after_builder) >= 2 and scripts_after_builder[0].get("audience") == "왕초보 크리에이터",
        })

        page.click("#sendShotPlanner")
        shot_plan_after_script = read_json(page, "ymstudio.aiShotPlanner.v1", "{}")
        checks.append({
            "name": "builder_script_sends_to_shot_planner",
            "passed": len(shot_plan_after_script.get("scenes", [])) > len(shot_plan.get("scenes", [])),
        })

        page.click("#sendCalendar")
        calendar_after_script = read_json(page, "ymstudio.youtubeCalendar.v1", "{}")
        checks.append({
            "name": "builder_script_sends_to_calendar",
            "passed": len(calendar_after_script.get("items", [])) >= 2,
        })

        browser.close()

    payload = {
        "checked_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "mode": "sample_project_end_to_end",
        "passed": all(item["passed"] for item in checks),
        "checks": checks,
    }
    REPORT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0 if payload["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

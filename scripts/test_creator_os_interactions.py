from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import quote

from playwright.sync_api import sync_playwright


PROJECT = Path(__file__).resolve().parents[1]
OUTPUTS = PROJECT / "outputs"
REPORT_PATH = PROJECT / "reports" / "ui-interaction-report.json"
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")


def file_url(path: Path) -> str:
    return "file:///" + quote(str(path.resolve()).replace("\\", "/"), safe="/:")


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
            """() => {
              localStorage.setItem("ymstudio.creatorOS.language", "ko");
              [
                "ymstudio.creatorProject.v1",
                "ymstudio.templateLibrary.v1",
                "ymstudio.creatorPromptBoard.v1",
                "ymstudio.thumbnailIdeaBoard.v1",
                "ymstudio.scriptGenerator.v1",
                "ymstudio.comfyWorkflowManager.v1",
                "ymstudio.aiShotPlanner.v1",
                "ymstudio.youtubeCalendar.v1",
                "ymstudio.creatorAssetManager.v1"
              ].forEach((key) => localStorage.removeItem(key));
            }"""
        )
        page.reload(wait_until="networkidle")
        page.fill('[data-project-field="channelName"]', "YMSTUDIO Test")
        page.fill('[data-project-field="videoTopic"]', "일반 영상 제작 파이프라인 테스트")
        page.fill('[data-project-field="targetAudience"]', "초보 영상 제작자")
        page.fill('[data-project-field="videoGoal"]', "템플릿 기반 제작 흐름 검증")
        page.click(".inline-disclosure summary")
        page.fill('[data-project-field="platform"]', "YouTube")
        page.fill('[data-project-field="tone"]', "쉽고 실전형")
        page.fill('[data-project-field="aiTools"]', "Claude, ChatGPT")
        page.fill('[data-project-field="folderName"]', "interaction-test")
        page.click("[data-save-project]")
        project = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.creatorProject.v1"))""")
        checks.append({
            "name": "dashboard_project_saved",
            "passed": project.get("videoTopic") == "일반 영상 제작 파이프라인 테스트",
        })

        with page.expect_download() as download_info:
            page.click("[data-export-project]")
        download = download_info.value
        checks.append({
            "name": "dashboard_project_export_download",
            "passed": download.suggested_filename == "creator-project.json",
        })
        page.click("[data-detect-hardware]")
        page.select_option("[data-performance-tier]", "balanced")
        page.click("[data-recommend-setup]")
        setup_text = page.locator("[data-setup-recommendation]").inner_text(timeout=3000)
        cpu_text = page.locator("[data-spec-cpu]").inner_text(timeout=3000)
        checks.append({
            "name": "dashboard_setup_recommendation",
            "passed": "중간 사양 추천" in setup_text and "컨텍스트" in setup_text,
        })
        checks.append({
            "name": "dashboard_hardware_detection",
            "passed": cpu_text != "확인 전",
        })

        template = OUTPUTS / "template-library" / "index.html"
        page.goto(file_url(template), wait_until="networkidle")
        banner_text = page.locator(".ym-project-banner").inner_text(timeout=3000)
        checks.append({
            "name": "shared_project_banner_visible",
            "passed": "일반 영상 제작 파이프라인 테스트" in banner_text,
        })
        page.click("#saveTemplate")
        page.fill("#rating", "5")
        page.click("#importTemplate")
        local_state = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.templateLibrary.v1"))""")
        prompt_board = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.creatorPromptBoard.v1") || "[]")""")
        thumbnail_board = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.thumbnailIdeaBoard.v1") || "[]")""")
        checks.append({
            "name": "template_save_and_rating",
            "passed": bool(local_state.get("saved")) and bool(local_state.get("ratings")),
        })
        checks.append({
            "name": "template_import_to_supported_module",
            "passed": len(prompt_board) + len(thumbnail_board) >= 1,
        })
        with page.expect_download() as template_download_info:
            page.click("#exportJson")
        template_download = template_download_info.value
        checks.append({
            "name": "template_library_export_download",
            "passed": template_download.suggested_filename == "template-library-state.json",
        })

        script_generator = OUTPUTS / "script-generator" / "index.html"
        page.goto(file_url(script_generator), wait_until="networkidle")
        page.click("#fromProject")
        script_state = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.scriptGenerator.v1") || "[]")""")
        checks.append({
            "name": "script_generator_from_project",
            "passed": len(script_state) >= 1 and bool(script_state[0].get("hook")),
        })
        page.click("#sendShotPlanner")
        shot_plan = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.aiShotPlanner.v1") || "{}")""")
        checks.append({
            "name": "script_generator_send_to_shot_planner",
            "passed": len(shot_plan.get("scenes", [])) >= 1 and len(shot_plan.get("shots", [])) >= 1,
        })
        page.click("#sendCalendar")
        calendar_state = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.youtubeCalendar.v1") || "{}")""")
        checks.append({
            "name": "script_generator_send_to_calendar",
            "passed": len(calendar_state.get("items", [])) >= 1 and bool(calendar_state["items"][0].get("title")),
        })
        with page.expect_download() as script_download_info:
            page.click("#exportJson")
        script_download = script_download_info.value
        checks.append({
            "name": "script_generator_export_download",
            "passed": script_download.suggested_filename == "script-generator-state.json",
        })

        comfy_manager = OUTPUTS / "comfyui-workflow-manager" / "index.html"
        page.goto(file_url(comfy_manager), wait_until="networkidle")
        page.click("#fromProject")
        comfy_state = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.comfyWorkflowManager.v1") || "[]")""")
        checks.append({
            "name": "comfy_workflow_from_project",
            "passed": len(comfy_state) >= 1 and bool(comfy_state[0].get("positive")) and bool(comfy_state[0].get("failureFixes")),
        })
        with page.expect_download() as comfy_download_info:
            page.click("#exportJson")
        comfy_download = comfy_download_info.value
        checks.append({
            "name": "comfy_workflow_export_download",
            "passed": comfy_download.suggested_filename == "comfyui-workflow-manager-state.json",
        })

        thumbnail = OUTPUTS / "thumbnail-idea-board" / "index.html"
        page.goto(file_url(thumbnail), wait_until="networkidle")
        page.click("#sendCalendar")
        calendar_after_thumbnail = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.youtubeCalendar.v1") || "{}")""")
        checks.append({
            "name": "thumbnail_board_send_to_calendar",
            "passed": len(calendar_after_thumbnail.get("items", [])) >= 2 and bool(calendar_after_thumbnail["items"][-1].get("thumbnailPrompts")),
        })

        shot_planner = OUTPUTS / "ai-shot-planner" / "index.html"
        page.goto(file_url(shot_planner), wait_until="networkidle")
        page.click("#sendAsset")
        asset_state = page.evaluate("""() => JSON.parse(localStorage.getItem("ymstudio.creatorAssetManager.v1") || "{}")""")
        checks.append({
            "name": "shot_planner_send_to_asset_manager",
            "passed": len(asset_state.get("assets", [])) >= 1 and bool(asset_state["assets"][0].get("promptText")),
        })

        browser.close()

    payload = {
        "checked_at": __import__("datetime").datetime.now().astimezone().isoformat(timespec="seconds"),
        "mode": "playwright_chrome_interactions",
        "passed": all(item["passed"] for item in checks),
        "checks": checks,
    }
    REPORT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0 if payload["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

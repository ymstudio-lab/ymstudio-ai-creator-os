from __future__ import annotations

import argparse
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont
from moviepy import ImageClip, concatenate_videoclips


PROJECT = Path(__file__).resolve().parents[1]
SCREENSHOTS = PROJECT / "reports" / "screenshots"
OUT_DIR = PROJECT / "exports" / "shorts"
FRAME_DIR = OUT_DIR / "frames"

W, H = 1080, 1920
FONT_REGULAR = Path(r"C:\Windows\Fonts\malgun.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")


SERIES = {
    "dashboard-overview": {
        "filename": "ymstudio-ai-creator-os-dashboard-overview.mp4",
        "scenes": [
            ("dashboard-desktop.png", 3.0, "AI 영상 제작", "도구보다 먼저\n작업 순서가 필요합니다", (0.08, 0.02, 0.92, 0.62)),
            ("dashboard-desktop.png", 3.5, "샘플 프로젝트", "주제, 타깃, 목적을 정하고\n다음 행동을 바로 고릅니다", (0.05, 0.18, 0.95, 0.50)),
            ("template-library-desktop.png", 3.5, "템플릿 선택", "빈 화면에서 시작하지 않고\n샘플 템플릿으로 출발합니다", (0.05, 0.16, 0.95, 0.64)),
            ("script-generator-desktop.png", 3.5, "대본 초안", "주제와 시청자를 넣고\n훅, 본문, CTA를 만듭니다", (0.05, 0.16, 0.95, 0.68)),
            ("shot-planner-desktop.png", 3.5, "샷 플랜", "대본을 장면과 샷으로 나눠\n제작 메모로 연결합니다", (0.05, 0.12, 0.95, 0.74)),
            ("thumbnail-board-desktop.png", 3.5, "썸네일", "문구, 감정, 레이아웃,\n이미지 프롬프트를 정리합니다", (0.05, 0.12, 0.95, 0.72)),
            ("youtube-calendar-desktop.png", 3.5, "업로드 일정", "아이디어가 캘린더와\n리뷰 메모로 이어집니다", (0.05, 0.12, 0.95, 0.70)),
            ("dashboard-desktop.png", 4.0, "무료 공개 MVP", "Demo와 GitHub 링크는\n설명란에서 확인하세요", (0.05, 0.02, 0.95, 0.62)),
        ],
    },
    "beginner-flow": {
        "filename": "ymstudio-ai-creator-os-beginner-flow.mp4",
        "scenes": [
            ("dashboard-desktop.png", 3.0, "처음이면", "무엇부터 해야 할지\n막히는 게 정상입니다", (0.05, 0.12, 0.95, 0.52)),
            ("dashboard-desktop.png", 3.5, "1단계", "샘플 프로젝트를 채우고\n내 주제로 바꿉니다", (0.05, 0.18, 0.95, 0.50)),
            ("template-library-desktop.png", 3.5, "2단계", "템플릿을 고르면\n작업 방향이 정리됩니다", (0.05, 0.16, 0.95, 0.64)),
            ("script-generator-desktop.png", 3.5, "3단계", "대본을 만들고\n필요한 문장을 나눕니다", (0.05, 0.16, 0.95, 0.68)),
            ("shot-planner-desktop.png", 3.5, "4단계", "장면별로 무엇을 만들지\n샷으로 쪼갭니다", (0.05, 0.12, 0.95, 0.74)),
            ("asset-manager-desktop.png", 3.5, "5단계", "생성 파일과 메모를\n자산으로 남깁니다", (0.05, 0.12, 0.95, 0.72)),
            ("dashboard-desktop.png", 4.0, "초보자용 흐름", "한 번 따라 해보고\n필요한 모듈만 쓰면 됩니다", (0.05, 0.02, 0.95, 0.62)),
        ],
    },
    "template-to-script": {
        "filename": "ymstudio-ai-creator-os-template-to-script.mp4",
        "scenes": [
            ("template-library-desktop.png", 3.0, "빈 화면 금지", "쇼츠 대본을 매번\n처음부터 쓰지 마세요", (0.05, 0.14, 0.95, 0.64)),
            ("template-library-desktop.png", 3.5, "템플릿 고르기", "훅, 리뷰, 비교, 튜토리얼,\n썸네일 방향을 고릅니다", (0.05, 0.16, 0.95, 0.64)),
            ("script-generator-desktop.png", 3.5, "대본 생성", "주제, 시청자, 길이, 톤만\n먼저 입력합니다", (0.05, 0.16, 0.95, 0.68)),
            ("script-generator-desktop.png", 3.5, "결과물", "훅, 본문, CTA,\n샷 분리 문장을 얻습니다", (0.15, 0.18, 0.95, 0.80)),
            ("thumbnail-board-desktop.png", 3.5, "썸네일까지", "대본에서 나온 메시지를\n썸네일 문구로 이어갑니다", (0.05, 0.12, 0.95, 0.72)),
            ("youtube-calendar-desktop.png", 3.5, "업로드 메모", "제목 후보와 일정까지\n같이 남깁니다", (0.05, 0.12, 0.95, 0.70)),
            ("dashboard-desktop.png", 4.0, "반복 가능한 제작", "작업 순서를 템플릿으로\n계속 재사용합니다", (0.05, 0.02, 0.95, 0.62)),
        ],
    },
    "comfyui-recipe": {
        "filename": "ymstudio-ai-creator-os-comfyui-recipe.mp4",
        "scenes": [
            ("comfyui-workflow-manager-desktop.png", 3.0, "ComfyUI 설정", "좋은 결과가 나왔는데\n다시 못 만들 때가 있습니다", (0.05, 0.10, 0.95, 0.70)),
            ("comfyui-workflow-manager-desktop.png", 3.5, "레시피 저장", "모델, seed, steps,\n프롬프트를 한곳에 둡니다", (0.05, 0.12, 0.95, 0.72)),
            ("shot-planner-desktop.png", 3.5, "장면 연결", "어떤 샷에 어떤 프롬프트를\n썼는지 남깁니다", (0.05, 0.12, 0.95, 0.74)),
            ("character-consistency-tool-desktop.png", 3.5, "캐릭터 유지", "기준 이미지와 규칙을\n장면별로 확인합니다", (0.05, 0.10, 0.95, 0.72)),
            ("asset-manager-desktop.png", 3.5, "파일 경로", "생성 이미지와 결과물을\n자산으로 기록합니다", (0.05, 0.12, 0.95, 0.72)),
            ("dashboard-desktop.png", 4.0, "제작 레시피", "한 번의 결과를\n다음 영상에서도 다시 씁니다", (0.05, 0.02, 0.95, 0.62)),
        ],
    },
    "local-first-safety": {
        "filename": "ymstudio-ai-creator-os-local-first.mp4",
        "scenes": [
            ("dashboard-desktop.png", 3.0, "로컬 우선", "로그인 없이 브라우저에서\n먼저 테스트합니다", (0.05, 0.02, 0.95, 0.62)),
            ("prompt-board-desktop.png", 3.5, "프롬프트 정리", "민감한 키나 비밀 정보는\n넣지 않는 흐름입니다", (0.05, 0.12, 0.95, 0.72)),
            ("cost-tracker-desktop.png", 3.5, "비용 기록", "API와 도구 사용 비용을\n프로젝트별로 확인합니다", (0.05, 0.12, 0.95, 0.72)),
            ("asset-manager-desktop.png", 3.5, "백업 가능", "작업이 쌓이면 JSON으로\n내보내고 보관합니다", (0.05, 0.12, 0.95, 0.72)),
            ("dashboard-desktop.png", 4.0, "무료 공개 MVP", "Demo와 GitHub 링크는\n설명란에서 확인하세요", (0.05, 0.02, 0.95, 0.62)),
        ],
    },
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REGULAR), size=size)


def cover_crop(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((int(image.width * scale), int(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def contain_fit(image: Image.Image, size: tuple[int, int], fill=(250, 252, 248)) -> Image.Image:
    target_w, target_h = size
    scale = min(target_w / image.width, target_h / image.height)
    resized = image.resize((int(image.width * scale), int(image.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, fill)
    left = (target_w - resized.width) // 2
    top = (target_h - resized.height) // 2
    canvas.paste(resized, (left, top))
    return canvas


def focus_crop(image: Image.Image, focus: tuple[float, float, float, float]) -> Image.Image:
    x1, y1, x2, y2 = focus
    return image.crop((int(image.width * x1), int(image.height * y1), int(image.width * x2), int(image.height * y2)))


def draw_rounded_rectangle(draw: ImageDraw.ImageDraw, xy, radius, fill, outline=None, width=1) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_multiline_center(draw: ImageDraw.ImageDraw, text: str, y: int, fnt, fill, line_gap: int = 12) -> None:
    lines: list[str] = []
    for raw in text.split("\n"):
        if not raw.strip():
            lines.append("")
            continue
        lines.extend(wrap(raw, width=14))

    line_heights = [draw.textbbox((0, 0), line or " ", font=fnt)[3] for line in lines]
    total_h = sum(line_heights) + line_gap * (len(lines) - 1)
    current_y = y - total_h // 2
    for line, line_h in zip(lines, line_heights):
        bbox = draw.textbbox((0, 0), line, font=fnt)
        line_w = bbox[2] - bbox[0]
        draw.text(((W - line_w) // 2, current_y), line, font=fnt, fill=fill)
        current_y += line_h + line_gap


def make_frame(series_key: str, scene: tuple, index: int, total: int) -> Path:
    image_name, _duration, title, body, focus = scene
    source = Image.open(SCREENSHOTS / image_name).convert("RGB")
    background = cover_crop(source, (W, H)).filter(ImageFilter.GaussianBlur(18))
    canvas = Image.alpha_composite(background.convert("RGBA"), Image.new("RGBA", (W, H), (15, 34, 29, 120)))

    shot = contain_fit(source, (940, 1000))
    shot = shot.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=3))

    card = Image.new("RGBA", (980, 1040), (255, 255, 255, 0))
    card_draw = ImageDraw.Draw(card)
    card_draw.rounded_rectangle((0, 0, 980, 1040), radius=44, fill=(250, 252, 248, 255))
    card_draw.rounded_rectangle((18, 18, 962, 1022), radius=32, outline=(220, 230, 222, 255), width=3)
    card.alpha_composite(shot.convert("RGBA"), (20, 20))
    canvas.alpha_composite(card, (50, 360))

    draw = ImageDraw.Draw(canvas)
    draw_rounded_rectangle(draw, (50, 70, 1030, 300), 36, (22, 86, 75, 238), outline=(125, 180, 168, 210), width=2)
    draw.text((82, 96), "YMSTUDIO AI Creator OS", font=font(36, bold=True), fill=(220, 244, 236, 255))
    draw.text((82, 152), title, font=font(66, bold=True), fill=(255, 255, 255, 255))

    draw_rounded_rectangle(draw, (70, 1430, 1010, 1780), 42, (12, 38, 34, 228), outline=(99, 169, 151, 240), width=3)
    draw_multiline_center(draw, body, 1605, font(56, bold=True), (255, 255, 255, 255), line_gap=14)

    progress_w = int(940 * ((index + 1) / total))
    draw_rounded_rectangle(draw, (70, 1810, 1010, 1830), 10, (210, 230, 222, 140))
    draw_rounded_rectangle(draw, (70, 1810, 70 + progress_w, 1830), 10, (48, 191, 160, 255))

    frame_dir = FRAME_DIR / series_key
    frame_dir.mkdir(parents=True, exist_ok=True)
    path = frame_dir / f"frame_{index + 1:02d}.png"
    canvas.convert("RGB").save(path, quality=95)
    return path


def render_series(series_key: str) -> Path:
    config = SERIES[series_key]
    scenes = config["scenes"]
    clips = []
    for index, scene in enumerate(scenes):
        frame = make_frame(series_key, scene, index, len(scenes))
        clips.append(ImageClip(str(frame)).with_duration(scene[1]))

    out_file = OUT_DIR / config["filename"]
    video = concatenate_videoclips(clips, method="compose")
    video.write_videofile(
        str(out_file),
        fps=30,
        codec="libx264",
        audio=False,
        preset="medium",
        bitrate="3000k",
        threads=4,
    )
    return out_file


def main() -> int:
    parser = argparse.ArgumentParser(description="Render YMSTUDIO dashboard promo Shorts.")
    parser.add_argument("series", nargs="?", default="all", choices=["all", *SERIES.keys()])
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    keys = SERIES.keys() if args.series == "all" else [args.series]
    for key in keys:
        print(render_series(key))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

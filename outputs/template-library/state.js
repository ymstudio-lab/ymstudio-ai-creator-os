(function (root, factory) {
  const state = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = state;
  }
  root.TemplateLibraryState = state;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const STORAGE_KEY = "ymstudio.templateLibrary.v1";
  const PROMPT_BOARD_KEY = "ymstudio.creatorPromptBoard.v1";
  const THUMBNAIL_BOARD_KEY = "ymstudio.thumbnailIdeaBoard.v1";
  const SCRIPT_GENERATOR_KEY = "ymstudio.scriptGenerator.v1";
  const EXPORT_VERSION = 1;

  const categories = [
    "Shorts",
    "Longform",
    "Tutorial",
    "Review",
    "Comparison",
    "Thumbnail",
    "Hook",
    "Prompt",
    "Script",
    "Shot Plan",
    "Calendar",
    "Asset",
    "Character",
    "ComfyUI",
    "Editing",
    "Analytics",
    "SEO",
    "Repurposing",
    "Voiceover",
    "Education",
  ];
  const audiences = ["General Video Creator", "AI Video Creator", "YouTube Creator", "Solo Creator", "Agency", "Educator", "Small Business"];
  const targetModules = ["Creator Prompt Board", "Thumbnail Idea Board", "Script Generator", "AI Shot Planner", "YouTube Calendar", "Creator Asset Manager", "Copy only"];

  function promptPayload(title, body, categoryTags, resultNotes, extra) {
    return {
      title,
      body,
      toolTags: ["ChatGPT", "Claude"],
      categoryTags,
      favorite: Boolean(extra?.favorite),
      rating: extra?.rating || 4,
      resultNotes,
      ...(extra || {}),
    };
  }

  function thumbnailPayload(title, overlayText, prompt, extra) {
    return {
      title,
      format: extra?.format || "YouTube Long",
      status: extra?.status || "idea",
      emotion: extra?.emotion || "curiosity",
      layout: extra?.layout || "single focal object with short Korean text",
      subject: extra?.subject || "creator workflow screen",
      overlayText,
      palette: extra?.palette || "high contrast with one accent color",
      prompt,
      notes: extra?.notes || "Keep text short enough to read on mobile.",
      score: extra?.score || 4,
      favorite: Boolean(extra?.favorite),
    };
  }

  function scriptPayload(title, hook, scenes, extra) {
    return {
      title,
      format: extra?.format || "Shorts",
      tone: extra?.tone || "clear and practical",
      status: extra?.status || "draft",
      audience: extra?.audience || "beginner creator",
      goal: extra?.goal || "turn one topic into a usable first draft",
      hook,
      outline: extra?.outline || "Hook > problem > 3 steps > next action",
      scenes,
      cta: extra?.cta || "Try this flow with your next project.",
      notes: extra?.notes || "Public demo template.",
      favorite: Boolean(extra?.favorite),
      resultNotes: extra?.resultNotes || "Creates a reusable script draft.",
    };
  }

  const templates = [
    {
      id: "thumb_emotion_contrast",
      title: "Emotion + Contrast Thumbnail Formula",
      titleKo: "감정 + 대비 썸네일 공식",
      category: "Thumbnail",
      audience: "YouTube Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "Readable thumbnails usually need one emotion, one object, strong contrast, and very short text.",
      reasonKo: "읽히는 썸네일은 보통 감정 하나, 대상 하나, 강한 대비, 아주 짧은 문구가 필요합니다.",
      resultKo: "모바일에서도 읽히는 썸네일 방향과 이미지 프롬프트가 남습니다.",
      content: "Create a thumbnail with one expressive subject, one clear object, bold 1-3 word overlay text, high contrast lighting, and a simple background.",
      usage: "Use when the video has a mistake, result, cost, surprise, or before/after angle.",
      payload: thumbnailPayload("감정 대비 썸네일", "왜 이럴까?", "YouTube thumbnail, expressive creator face, one clear object, bold Korean text area, high contrast lighting, clean background, mobile readable", { favorite: true, score: 5 }),
    },
    {
      id: "thumb_before_after",
      title: "Before / After Thumbnail",
      titleKo: "전후 비교 썸네일",
      category: "Thumbnail",
      audience: "AI Video Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "Before/after formats work because the viewer understands the promise instantly.",
      reasonKo: "전후 비교는 시청자가 영상의 약속을 바로 이해하기 쉬워 클릭 이유가 분명합니다.",
      resultKo: "개선 전과 개선 후가 대비되는 썸네일 초안이 남습니다.",
      content: "Split the image into two clear halves: messy workflow on the left, organized workflow on the right, with short contrast text.",
      usage: "Best for workflow improvement, cleanup, tool comparison, and tutorial content.",
      payload: thumbnailPayload("전후 비교 썸네일", "전 vs 후", "split screen YouTube thumbnail, messy workflow versus clean dashboard, clear before after contrast, bold Korean text area", { favorite: true, score: 5, layout: "left before / right after" }),
    },
    {
      id: "script_hook_loop",
      title: "Shorts Hook Loop Script",
      titleKo: "쇼츠 훅 루프 대본",
      category: "Shorts",
      audience: "YouTube Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Short-form scripts need fast hooks, visible proof, and endings that naturally point back to the first line.",
      reasonKo: "숏폼 대본은 빠른 훅, 보이는 근거, 첫 문장으로 다시 이어지는 마무리가 중요합니다.",
      resultKo: "25초 숏폼 대본 구조와 반복 시청을 유도하는 마무리 문장이 남습니다.",
      content: "Write a 25-second script with a 2-second hook, three fast proof points, one visual demo moment, and a loop ending.",
      usage: "Use for Shorts, Reels, TikTok, and quick AI tool demos.",
      payload: scriptPayload("쇼츠 훅 루프 대본", "이 한 가지를 바꾸면 결과가 바로 달라집니다.", ["문제를 한 화면으로 보여줍니다.", "해결 포인트 3개를 빠르게 말합니다.", "작은 데모 화면을 보여줍니다.", "첫 문장으로 돌아가는 결말을 붙입니다."], { favorite: true, resultNotes: "반복 시청을 노리는 숏폼 구조입니다." }),
    },
    {
      id: "classic_video_hook_map",
      title: "Classic Video Hook Map",
      titleKo: "일반 영상 훅 설계도",
      category: "Hook",
      audience: "General Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Most videos need a clear reason to keep watching: problem, result, curiosity, mistake, or challenge.",
      reasonKo: "대부분의 영상은 문제, 결과, 궁금증, 실수, 도전 중 하나로 시청 이유를 빨리 보여줘야 합니다.",
      resultKo: "영상 주제의 첫 문장과 시청 이유 후보가 남습니다.",
      content: "Write five opening hooks for one video: problem hook, result hook, curiosity hook, mistake hook, and challenge hook.",
      usage: "Use before scripting normal YouTube videos, Shorts, tutorials, reviews, and public demos.",
      payload: promptPayload("일반 영상 훅 설계도", "아래 영상 주제로 문제형, 결과형, 궁금증형, 실수형, 도전형 훅을 각각 5개씩 만들어줘. 각 훅은 12단어 이내로 짧고 구체적으로 써줘.", ["Hook", "Script"], "첫 대본 전에 훅 후보를 비교합니다.", { favorite: true, rating: 5 }),
    },
    {
      id: "prompt_thumbnail_variants",
      title: "10 Thumbnail Direction Generator",
      titleKo: "썸네일 방향 10개 생성",
      category: "Prompt",
      audience: "AI Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Creators often need many visual directions before choosing one image prompt.",
      reasonKo: "하나의 이미지 프롬프트를 정하기 전에 여러 시각 방향을 빠르게 비교해야 합니다.",
      resultKo: "썸네일 콘셉트 10개와 이미지 프롬프트 후보가 남습니다.",
      content: "Generate 10 thumbnail concepts with layout, emotion, text, focal object, color palette, and image prompt.",
      usage: "Use before opening an image generator.",
      payload: promptPayload("썸네일 방향 10개 생성", "아래 영상 주제로 썸네일 콘셉트 10개를 만들어줘. 각 콘셉트마다 감정, 레이아웃, 핵심 오브젝트, 한글 문구 1-3단어, 컬러 팔레트, 이미지 생성 프롬프트를 포함해줘.", ["Thumbnail", "Image prompt"], "Thumbnail Idea Board로 옮겨 비교하기 좋습니다.", { favorite: true, rating: 5 }),
    },
    {
      id: "shot_plan_six_scene",
      title: "6-Scene AI Video Plan",
      titleKo: "6장면 AI 영상 플랜",
      category: "Shot Plan",
      audience: "AI Video Creator",
      targetModule: "AI Shot Planner",
      popularity: 4,
      reason: "AI video generation is easier when ideas are split into short, controllable shots.",
      reasonKo: "AI 영상 생성은 아이디어를 짧고 통제 가능한 샷으로 나눌수록 안정적입니다.",
      resultKo: "장면 목표, 카메라 방향, 프롬프트 메모, 일관성 위험이 정리됩니다.",
      content: "Break one video idea into 6 scenes with scene goal, camera direction, motion, prompt notes, and continuity risks.",
      usage: "Use before Runway, Kling, Pika, ComfyUI, or similar tools.",
      payload: promptPayload("6장면 AI 영상 플랜", "아래 영상 아이디어를 6개 장면으로 나눠줘. 각 장면마다 목표, 화면 설명, 카메라 움직임, 생성 프롬프트, 일관성 위험, 실패 가능성을 포함해줘.", ["Storyboard", "Video prompt"], "Shot Planner에 옮겨 장면별로 다듬기 좋습니다."),
    },
    {
      id: "calendar_four_week_launch",
      title: "4-Week Content Calendar",
      titleKo: "4주 콘텐츠 캘린더",
      category: "Calendar",
      audience: "Solo Creator",
      targetModule: "YouTube Calendar",
      popularity: 4,
      reason: "Creators need repeatable publishing systems, not just one-off ideas.",
      reasonKo: "크리에이터는 단발성 아이디어보다 반복 가능한 발행 시스템이 필요합니다.",
      resultKo: "4주 동안의 아이디어, 대본, 자산, 편집, 게시, 리뷰 단계가 정리됩니다.",
      content: "Plan 4 weeks of content with idea, script, asset, edit, publish, and review stages.",
      usage: "Use for a channel, tutorial series, public demo series, or content sprint.",
      payload: promptPayload("4주 콘텐츠 캘린더", "하나의 콘텐츠 주제를 4주 계획으로 나눠줘. 주차별 목표, 영상 아이디어, 쇼츠 파생 아이디어, 썸네일 방향, 대본 마감일, 편집 마감일, 게시 날짜, 리뷰 항목을 포함해줘.", ["Calendar", "Planning"], "YouTube Calendar에 수동으로 옮겨 쓰기 좋습니다."),
    },
    {
      id: "asset_license_note",
      title: "Asset Usage Note Checklist",
      titleKo: "자산 사용 메모 체크리스트",
      category: "Asset",
      audience: "Agency",
      targetModule: "Creator Asset Manager",
      popularity: 4,
      reason: "Generated assets still need source, rights, and usage notes before public work.",
      reasonKo: "생성 자산은 공개 작업 전에 출처, 사용권, 사용 메모를 남겨야 합니다.",
      resultKo: "출처 도구, 파일 경로, 사용권 메모, 교체 필요 여부가 정리됩니다.",
      content: "Track source tool, model, prompt, usage rights, project, file path, and replacement risk.",
      usage: "Use before publishing or sharing generated assets.",
      payload: promptPayload("자산 사용 메모 체크리스트", "AI 생성 자산을 기록할 때 필요한 체크리스트를 만들어줘. 출처 도구, 모델, 프롬프트, 파일 경로, 프로젝트명, 사용권 메모, 공개 가능 여부, 교체 필요 여부를 포함해줘.", ["Asset", "Checklist"], "Asset Manager의 메모 기준으로 쓰기 좋습니다."),
    },
    {
      id: "character_bible",
      title: "Character Consistency Bible",
      titleKo: "캐릭터 일관성 바이블",
      category: "Character",
      audience: "AI Video Creator",
      targetModule: "Copy only",
      popularity: 5,
      reason: "Character consistency remains a major issue across image and video generation.",
      reasonKo: "캐릭터 일관성은 이미지와 영상 생성에서 계속 중요한 문제입니다.",
      resultKo: "외형, 의상, 기준 이미지, 금지 표현, 장면별 규칙이 남습니다.",
      content: "Document face, hair, outfit, silhouette, expression range, camera restrictions, reference images, and negative prompts.",
      usage: "Use before generating multiple scenes with the same character.",
      payload: promptPayload("캐릭터 일관성 바이블", "같은 캐릭터를 여러 장면에서 유지하기 위한 바이블을 만들어줘. 얼굴형, 헤어, 의상, 실루엣, 표정 범위, 금지 요소, 기준 이미지 설명, 장면별 일관성 규칙을 포함해줘.", ["Character", "Image prompt"], "Character Consistency Tool로 옮기기 좋습니다.", { favorite: true, rating: 5 }),
    },
    {
      id: "comfyui_recipe_card",
      title: "ComfyUI Workflow Recipe Card",
      titleKo: "ComfyUI 워크플로우 레시피 카드",
      category: "ComfyUI",
      audience: "AI Tool Power User",
      targetModule: "Copy only",
      popularity: 4,
      reason: "Local generation workflows need repeatable notes for models, nodes, inputs, outputs, and known failure cases.",
      reasonKo: "로컬 생성 워크플로우는 모델, 노드, 입력, 출력, 실패 사례를 반복 기록해야 합니다.",
      resultKo: "반복 가능한 ComfyUI 설정 카드가 남습니다.",
      content: "Track workflow name, model, LoRA, node purpose, input size, output size, prompt rules, and failure fixes.",
      usage: "Use when a ComfyUI setup becomes repeatable.",
      payload: promptPayload("ComfyUI 레시피 카드", "ComfyUI 워크플로우를 재사용하기 위한 레시피 카드 형식을 만들어줘. 워크플로우 이름, 목적, 모델, LoRA, 주요 노드, 입력 이미지 규칙, 출력 규격, 프롬프트 규칙, 자주 나는 오류, 수정 방법을 포함해줘.", ["ComfyUI", "Recipe"], "ComfyUI Workflow Manager의 기본 메모로 쓰기 좋습니다."),
    },
    {
      id: "voiceover_readability_pass",
      title: "Voiceover Readability Pass",
      titleKo: "내레이션 읽기 쉬움 점검",
      category: "Voiceover",
      audience: "AI Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "AI voice and human narration both need short sentences, clear rhythm, and fewer tongue-twisting phrases.",
      reasonKo: "AI 음성과 사람 내레이션 모두 짧은 문장, 명확한 리듬, 발음하기 쉬운 표현이 필요합니다.",
      resultKo: "읽기 쉬운 내레이션 초안과 멈춤 지점이 남습니다.",
      content: "Rewrite narration for spoken delivery: shorter sentences, natural pauses, pronunciation safety, and emotional beats.",
      usage: "Use before recording, TTS, or avatar video generation.",
      payload: promptPayload("내레이션 읽기 쉬움 점검", "아래 내레이션을 실제로 읽기 쉽게 고쳐줘. 문장은 짧게 나누고, 쉬어 읽을 지점을 표시하고, 발음하기 어려운 표현은 바꾸고, 감정이 바뀌는 지점에는 메모를 달아줘.", ["Voiceover", "Script"], "TTS나 녹음 전 마지막 점검에 씁니다."),
    },
    {
      id: "course_lesson_structure",
      title: "Course Lesson Structure",
      titleKo: "강의 영상 구조 템플릿",
      category: "Education",
      audience: "Educator",
      targetModule: "AI Shot Planner",
      popularity: 4,
      reason: "Tutorials work better when the lesson promise, prerequisites, steps, example, practice, and recap are visible.",
      reasonKo: "튜토리얼은 약속, 준비물, 단계, 예시, 실습, 요약이 보일 때 따라 하기 쉽습니다.",
      resultKo: "학습 목표, 단계, 데모 순간, 실습, 요약 구조가 남습니다.",
      content: "Turn one lesson topic into a structured tutorial with learning goal, steps, demo moments, practice, and recap.",
      usage: "Use for courses, tutorials, lessons, and step-by-step explainers.",
      payload: promptPayload("강의 영상 구조", "아래 강의 주제로 초보자가 따라 할 수 있는 영상 강의 구조를 만들어줘. 학습 목표, 필요한 사전 지식, 단계별 설명, 화면 데모 지점, 실습 과제, 마지막 요약, 다음 강의 예고를 포함해줘.", ["Education", "Tutorial"], "강의형 콘텐츠용."),
    },
    {
      id: "small_business_explainer",
      title: "Small Business Explainer Video",
      titleKo: "소상공인 설명 영상 템플릿",
      category: "Script",
      audience: "Small Business",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Small projects need simple videos that explain who it is for, what changes, proof, key message, and next action.",
      reasonKo: "작은 프로젝트도 누구를 위한지, 무엇이 달라지는지, 근거와 다음 행동을 분명히 보여줘야 합니다.",
      resultKo: "45초 설명 영상 대본 초안이 남습니다.",
      content: "Create a 45-second explainer video script with viewer problem, result, evidence, key message, and next action.",
      usage: "Use for local business, online store, service, project page, and educational drafts.",
      payload: promptPayload("소상공인 설명 영상", "아래 프로젝트/서비스로 45초 설명 영상을 만들어줘. 누구를 위한 것인지, 어떤 문제가 해결되는지, 믿을 만한 근거, 핵심 메시지, 마지막 행동 안내를 포함해줘. 초보자가 촬영할 수 있게 장면도 간단히 나눠줘.", ["Script", "Explainer"], "공개 설명 영상 초안으로 씁니다."),
    },
    {
      id: "mistake_fix_shorts",
      title: "Mistake Fix Shorts",
      titleKo: "실수 교정 쇼츠",
      category: "Shorts",
      audience: "General Video Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Mistake-based shorts work because viewers quickly recognize a problem and want the fix.",
      reasonKo: "실수 기반 쇼츠는 시청자가 문제를 바로 알아보고 해결법을 기다리기 쉽습니다.",
      resultKo: "실수 지적, 3단계 해결, 반복 규칙이 있는 쇼츠 대본이 남습니다.",
      content: "Write a 30-second short video that starts with one common mistake, shows the consequence, gives a simple fix, and ends with a repeatable rule.",
      usage: "Use for tutorials, creator tips, AI tool tips, editing tips, and beginner education.",
      payload: scriptPayload("실수 교정 쇼츠", "이 실수 하나 때문에 결과가 바로 무너집니다.", ["흔한 실수 화면을 보여줍니다.", "왜 문제가 되는지 한 문장으로 말합니다.", "바로 적용할 수정법을 보여줍니다.", "다음 작업에도 쓸 규칙으로 정리합니다."], { favorite: true, resultNotes: "초보자 교육용 쇼츠 템플릿입니다." }),
    },
    {
      id: "longform_problem_solution",
      title: "Problem-Solution Longform",
      titleKo: "문제 해결 롱폼 구조",
      category: "Longform",
      audience: "YouTube Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Long videos are easier to finish when the viewer sees a clear problem, a path, and a payoff.",
      reasonKo: "롱폼은 문제, 해결 순서, 마지막 보상이 명확해야 끝까지 볼 이유가 생깁니다.",
      resultKo: "8-10분 영상의 개요, 장면 순서, CTA 초안이 남습니다.",
      content: "Build an 8-10 minute video with opening problem, stakes, three solution steps, proof/demo, summary, and next action.",
      usage: "Use for YouTube explainers, workflow videos, product education, and creator tutorials.",
      payload: scriptPayload("문제 해결 롱폼 구조", "이 문제를 그냥 두면 다음 단계에서 계속 막힙니다.", ["문제를 짧게 보여줍니다.", "시청자가 겪는 막힘을 정리합니다.", "해결 1-3단계를 실행합니다.", "결과를 보여주고 다음 행동을 안내합니다."], { format: "YouTube Long", tone: "calm and clear", resultNotes: "롱폼 대본 초안과 장면 흐름입니다." }),
    },
    {
      id: "tutorial_follow_along",
      title: "Follow-Along Tutorial",
      titleKo: "따라 하기 튜토리얼",
      category: "Tutorial",
      audience: "Educator",
      targetModule: "AI Shot Planner",
      popularity: 5,
      reason: "Beginner tutorials work best when each step has one visible action and one visible result.",
      reasonKo: "초보자 튜토리얼은 단계마다 행동 하나와 결과 하나만 보일 때 따라 하기 쉽습니다.",
      resultKo: "튜토리얼 단계, 화면 녹화 지점, 체크포인트 메모가 남습니다.",
      content: "Turn one task into a step-by-step tutorial with input, click/action, expected result, and common mistake for each step.",
      usage: "Use for software tutorials, AI workflow guides, onboarding videos, and course lessons.",
      payload: promptPayload("따라 하기 튜토리얼", "아래 작업을 초보자가 따라 할 수 있는 단계별 튜토리얼로 나눠줘. 각 단계마다 입력값, 클릭/행동, 보이는 결과, 자주 하는 실수를 적어줘.", ["Tutorial", "Education"], "Shot Planner에 넣기 좋은 단계별 목록입니다."),
    },
    {
      id: "review_good_bad_fit",
      title: "Good / Bad / Fit Review",
      titleKo: "좋은 점 / 아쉬운 점 / 맞는 사람 리뷰",
      category: "Review",
      audience: "YouTube Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Review viewers want a fast verdict, proof, tradeoffs, and whether the product fits them.",
      reasonKo: "리뷰 시청자는 결론, 근거, 장단점, 자신에게 맞는지 여부를 빠르게 확인하고 싶어 합니다.",
      resultKo: "리뷰 대본 구조, 장단점 문장, 추천/비추천 결론이 남습니다.",
      content: "Create a review script with quick verdict, who it is for, three strengths, two weaknesses, comparison note, and final recommendation.",
      usage: "Use for AI tools, apps, gear, services, templates, and creator products.",
      payload: scriptPayload("좋은 점 / 아쉬운 점 / 맞는 사람 리뷰", "기능보다 중요한 건 이 도구가 당신 상황에 맞는지입니다.", ["결론을 먼저 말합니다.", "맞는 사람을 정리합니다.", "장점과 근거를 보여줍니다.", "아쉬운 점을 솔직히 말합니다.", "최종 추천을 정리합니다."], { format: "YouTube Long", tone: "balanced and specific" }),
    },
    {
      id: "comparison_decision_matrix",
      title: "Two-Option Comparison Matrix",
      titleKo: "두 가지 선택 비교표",
      category: "Comparison",
      audience: "General Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Comparison videos work because viewers arrive with a decision they already need to make.",
      reasonKo: "비교 영상은 시청자가 이미 선택 고민을 가지고 들어오기 때문에 클릭 이유가 강합니다.",
      resultKo: "비교 기준, 추천 대상, 결론 문장이 남습니다.",
      content: "Compare two options by cost range, speed, quality, beginner difficulty, best use case, hidden burden, and final pick.",
      usage: "Use for tool comparisons, workflow choices, local vs cloud, and beginner recommendations.",
      payload: promptPayload("두 가지 선택 비교표", "두 선택지를 비용 범위, 속도, 품질, 초보자 난이도, 맞는 상황, 숨은 부담, 최종 추천으로 비교해줘. 마지막에는 어떤 사람은 A, 어떤 사람은 B를 고르면 되는지 정리해줘.", ["Comparison", "Review"], "비교 영상 기획서의 결론 문장으로 씁니다.", { favorite: true, rating: 5 }),
    },
    {
      id: "thumbnail_curiosity_gap",
      title: "Curiosity Gap Thumbnail",
      titleKo: "궁금증 썸네일 공식",
      category: "Thumbnail",
      audience: "YouTube Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "A good curiosity gap makes the viewer understand the topic but still need the answer.",
      reasonKo: "좋은 궁금증은 주제를 이해시키면서도 답은 영상 안에서 확인하고 싶게 만듭니다.",
      resultKo: "모바일에서 읽히는 썸네일 문구, 감정, 레이아웃, 이미지 프롬프트가 남습니다.",
      content: "Design a thumbnail with one unanswered question, one visual clue, a clear emotion, and short text that does not repeat the title.",
      usage: "Use when the title explains the topic and the thumbnail must add tension.",
      payload: thumbnailPayload("궁금증 썸네일 공식", "왜 이럴까?", "YouTube thumbnail, curiosity gap, expressive face, one visual clue, short Korean text area, clean mobile readable layout", { favorite: true, score: 5 }),
    },
    {
      id: "hook_first_five_seconds",
      title: "First 5 Seconds Hook Pack",
      titleKo: "첫 5초 훅 패키지",
      category: "Hook",
      audience: "General Video Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "The first seconds decide whether viewers give the rest of the video a chance.",
      reasonKo: "처음 몇 초는 시청자가 영상을 계속 볼지 결정하는 구간입니다.",
      resultKo: "문제형, 결과형, 반전형, 비교형, 도전형 훅 5개가 남습니다.",
      content: "Generate five opening hooks for one topic: problem, result, surprise, comparison, and challenge.",
      usage: "Use before writing Shorts, longform intros, tutorials, and reviews.",
      payload: scriptPayload("첫 5초 훅 패키지", "시작 5초만 바꿔도 같은 주제가 다르게 보입니다.", ["문제형 훅을 보여줍니다.", "결과형 훅을 보여줍니다.", "반전형 훅을 보여줍니다.", "가장 맞는 훅을 고릅니다."], { resultNotes: "바로 테스트할 수 있는 훅 후보 5개입니다." }),
    },
    {
      id: "ai_workflow_demo",
      title: "AI Workflow Demo Script",
      titleKo: "AI 워크플로우 시연 대본",
      category: "Tutorial",
      audience: "AI Video Creator",
      targetModule: "Script Generator",
      popularity: 4,
      reason: "AI workflow videos need visible before, action, output, and next step so viewers trust the process.",
      reasonKo: "AI 워크플로우 영상은 이전 상태, 실행, 결과, 다음 행동을 보여줘야 과정이 믿을 만해집니다.",
      resultKo: "화면 시연용 대본, 컷 분리 문장, 결과 확인 멘트가 남습니다.",
      content: "Write a demo script that shows the starting problem, the tool action, the generated output, the cleanup step, and the saved result.",
      usage: "Use for AI app demos, ComfyUI workflows, prompt systems, and creator automation videos.",
      payload: scriptPayload("AI 워크플로우 시연 대본", "AI 도구는 결과보다 순서가 보일 때 따라 하기 쉬워집니다.", ["시작 전 빈 화면을 보여줍니다.", "프롬프트와 설정을 입력합니다.", "결과 화면을 보여줍니다.", "수정할 부분을 정리합니다.", "저장 위치와 다음 단계를 보여줍니다."], { format: "Tutorial", tone: "clear and calm" }),
    },
    {
      id: "creator_project_overview",
      title: "Creator Project Overview Video",
      titleKo: "크리에이터 프로젝트 소개 영상",
      category: "Longform",
      audience: "Small Business",
      targetModule: "Script Generator",
      popularity: 4,
      reason: "Creators need a clear overview video that explains what a project does, who it helps, and what to try first.",
      reasonKo: "크리에이터 프로젝트는 무엇을 하는지, 누구에게 도움이 되는지, 무엇부터 써보면 되는지 분명하게 보여줘야 합니다.",
      resultKo: "프로젝트 소개 훅, 문제/해결/근거/구성/다음 행동 대본이 남습니다.",
      content: "Create an overview video script with audience pain, project promise, proof, what is included, who it is not for, and CTA.",
      usage: "Use for GitHub projects, public demos, tools, services, and project pages.",
      payload: scriptPayload("크리에이터 프로젝트 소개 영상", "이 프로젝트는 많은 기능을 파는 것이 아니라 반복 작업을 줄이는 도구입니다.", ["반복 작업 문제를 보여줍니다.", "프로젝트가 줄여주는 시간을 설명합니다.", "구성 요소를 보여줍니다.", "사용 전후를 비교합니다.", "다음 확인 행동을 안내합니다."], { format: "Product Demo", tone: "professional and simple" }),
    },
    {
      id: "upload_checklist_final_pass",
      title: "Final Publishing Review Checklist",
      titleKo: "게시 전 최종 검토 체크리스트",
      category: "Calendar",
      audience: "YouTube Creator",
      targetModule: "YouTube Calendar",
      popularity: 4,
      reason: "Many creators lose quality at the final step: title, thumbnail, description, captions, and review notes.",
      reasonKo: "게시 직전에는 제목, 썸네일, 설명, 자막, 리뷰 메모처럼 빠뜨리기 쉬운 항목이 많습니다.",
      resultKo: "게시 준비 확인표와 캘린더 메모가 남습니다.",
      content: "Check title, thumbnail, description, chapters, tags, schedule notes, subtitles, and post-publish review date.",
      usage: "Use while preparing a local publishing review.",
      payload: promptPayload("게시 전 최종 검토 체크리스트", "게시 준비 중 확인할 항목을 체크리스트로 정리해줘. 제목, 썸네일, 설명, 챕터, 태그, 일정 메모, 자막, 게시 후 리뷰 날짜를 포함해줘.", ["YouTube", "Publishing"], "YouTube Calendar에 붙일 검토 메모입니다."),
    },
    {
      id: "post_publish_review",
      title: "Post-Publish Review Notes",
      titleKo: "게시 후 성과 리뷰 노트",
      category: "Analytics",
      audience: "YouTube Creator",
      targetModule: "YouTube Calendar",
      popularity: 4,
      reason: "Creators improve by reviewing what happened after publishing, not only by making the next video.",
      reasonKo: "다음 영상을 잘 만들려면 게시 후 제목, 썸네일, 댓글, 반응을 기록해야 합니다.",
      resultKo: "24-72시간 뒤 확인할 성과 리뷰 항목이 남습니다.",
      content: "Log publish date, title, thumbnail angle, first 24-hour CTR, retention notes, comments, and next experiment.",
      usage: "Use 24-72 hours after publishing to decide what to repeat or improve.",
      payload: promptPayload("게시 후 성과 리뷰 노트", "게시한 영상의 성과 리뷰 형식을 만들어줘. 제목, 썸네일 방향, 게시 날짜, 첫 24시간 클릭률, 초반 이탈 지점, 댓글 반응, 다음 실험 항목을 포함해줘.", ["YouTube", "Analytics"], "YouTube Calendar의 성과 메모로 옮겨 쓰기 좋습니다."),
    },
    {
      id: "youtube_metadata_pack",
      title: "Local Publishing Notes Pack",
      titleKo: "로컬 게시 준비 메모 패키지",
      category: "SEO",
      audience: "YouTube Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Creators repeatedly need searchable titles, descriptions, chapters, tags, and review notes after editing.",
      reasonKo: "편집 후에는 검색형 제목, 설명, 챕터, 태그, 검토 메모를 반복해서 준비해야 합니다.",
      resultKo: "제목 후보, 짧은 설명, 챕터, 태그, 검토 메모가 남습니다.",
      content: "Create searchable title options, a concise description, chapter markers, tags, and review notes from one video summary.",
      usage: "Use after editing while preparing local planning notes.",
      payload: promptPayload("로컬 게시 준비 메모 패키지", "아래 영상 요약을 바탕으로 로컬 게시 준비 메모를 만들어줘. 검색형 제목 5개, 궁금증형 제목 5개, 짧은 설명 초안 1개, 챕터 마커 예시, 태그 후보, 검토 메모를 포함해줘.", ["SEO", "YouTube"], "게시 준비 중 반복되는 메모를 줄입니다.", { favorite: true, rating: 5 }),
    },
    {
      id: "longform_to_shorts_repurpose",
      title: "Longform to Shorts Repurposing",
      titleKo: "롱폼 영상 숏폼 재활용",
      category: "Repurposing",
      audience: "Solo Creator",
      targetModule: "YouTube Calendar",
      popularity: 5,
      reason: "One long video can become multiple short clips, posts, and follow-up ideas.",
      reasonKo: "긴 영상 하나는 여러 숏폼 클립, 게시 메모, 후속 아이디어로 나눌 수 있습니다.",
      resultKo: "숏폼 클립 후보, 훅, 자막, 썸네일 문구, 캘린더 메모가 남습니다.",
      content: "Extract 8 short-form clip ideas, each with hook, clip range, caption, thumbnail text, and planning note.",
      usage: "Use after recording or editing a long video.",
      payload: promptPayload("롱폼 영상 숏폼 재활용", "아래 롱폼 영상 요약에서 숏폼으로 자를 수 있는 클립 아이디어 8개를 뽑아줘. 각 아이디어마다 훅, 클립 구간, 자막 첫 문장, 썸네일 문구, 캘린더 메모를 포함해줘.", ["Shorts", "Repurposing"], "Calendar에 후속 콘텐츠로 등록하기 좋습니다.", { favorite: true, rating: 5 }),
    },
    {
      id: "editing_broll_checklist",
      title: "B-roll Edit Checklist",
      titleKo: "B-roll 편집 체크리스트",
      category: "Editing",
      audience: "General Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "B-roll works best when it clarifies the sentence instead of decorating the timeline.",
      reasonKo: "B-roll은 타임라인 장식보다 문장을 더 쉽게 이해시키는 역할을 해야 합니다.",
      resultKo: "문장별 필요한 보조 화면과 편집 메모가 남습니다.",
      content: "Mark where B-roll, screen recording, zoom, caption emphasis, and visual proof should appear in a script.",
      usage: "Use after the first script draft, before editing.",
      payload: promptPayload("B-roll 편집 체크리스트", "아래 대본에서 B-roll, 화면 녹화, 확대, 자막 강조, 시각 근거가 필요한 지점을 표시해줘. 각 지점마다 왜 필요한지와 어떤 화면이면 좋은지 적어줘.", ["Editing", "B-roll"], "편집 전 화면 보강 메모로 씁니다."),
    },
    {
      id: "prompt_result_review",
      title: "Prompt Result Review",
      titleKo: "프롬프트 결과 리뷰",
      category: "Prompt",
      audience: "AI Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Prompt iteration improves faster when each result records what worked, what failed, and what to change next.",
      reasonKo: "프롬프트 반복은 잘된 점, 실패한 점, 다음 수정점을 기록할 때 더 빨라집니다.",
      resultKo: "프롬프트 실험 기록 양식이 남습니다.",
      content: "Review one generated result with prompt, model, useful details, failure points, and next prompt revision.",
      usage: "Use after any image, video, or text generation result.",
      payload: promptPayload("프롬프트 결과 리뷰", "아래 생성 결과를 리뷰하는 표를 만들어줘. 원본 프롬프트, 사용 도구/모델, 잘된 점, 실패한 점, 다음 수정 프롬프트, 재사용 여부를 포함해줘.", ["Prompt", "Review"], "Prompt Board에 실험 메모로 저장하기 좋습니다."),
    },
    {
      id: "dashboard_demo_walkthrough",
      title: "Dashboard Demo Walkthrough",
      titleKo: "대시보드 데모 안내 대본",
      category: "Tutorial",
      audience: "General Video Creator",
      targetModule: "Script Generator",
      popularity: 4,
      reason: "A public demo is easier to understand when it follows one project from setup to export.",
      reasonKo: "공개 데모는 프로젝트 생성부터 내보내기까지 한 흐름으로 보여줄 때 이해하기 쉽습니다.",
      resultKo: "대시보드 화면 녹화용 설명 대본이 남습니다.",
      content: "Write a walkthrough that starts with Sample Project, opens three modules, shows local status cards, and ends with JSON export.",
      usage: "Use for public app demos and release screenshots.",
      payload: scriptPayload("대시보드 데모 안내 대본", "처음 보는 사람도 1분 안에 흐름을 이해할 수 있게 보여줍니다.", ["샘플 프로젝트 버튼을 누릅니다.", "상태 카드가 채워지는 장면을 보여줍니다.", "Template Library와 Script Generator를 엽니다.", "JSON 백업 버튼으로 마무리합니다."], { format: "Tutorial", resultNotes: "공개 데모 영상용 안내 대본입니다." }),
    },
    {
      id: "privacy_safe_demo_data",
      title: "Privacy-Safe Demo Data",
      titleKo: "개인정보 없는 데모 데이터",
      category: "Asset",
      audience: "Agency",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Public demos should use generic data that cannot expose accounts, customers, or private plans.",
      reasonKo: "공개 데모는 계정, 고객, 비공개 계획이 드러나지 않는 일반 데이터를 사용해야 합니다.",
      resultKo: "공개 데모용 안전 데이터 점검표가 남습니다.",
      content: "Create a checklist for replacing private names, paths, IDs, contracts, and account details with generic demo examples.",
      usage: "Use before recording screenshots or public demo videos.",
      payload: promptPayload("개인정보 없는 데모 데이터", "공개 데모 전에 확인할 안전 데이터 체크리스트를 만들어줘. 개인 이름, 계정명, 로컬 경로, 고객명, 계약 정보, 비공개 계획, 실제 비용 데이터를 일반 예시로 바꾸는 항목을 포함해줘.", ["Privacy", "Demo"], "스크린샷 촬영 전 점검에 씁니다."),
    },
    {
      id: "release_note_summary",
      title: "Release Note Summary",
      titleKo: "릴리스 노트 요약",
      category: "Analytics",
      audience: "Solo Creator",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Release notes should tell users what changed, how to try it, and what remains out of scope.",
      reasonKo: "릴리스 노트는 변경점, 사용 방법, 아직 범위 밖인 항목을 분명하게 말해야 합니다.",
      resultKo: "공개 릴리스 노트 초안 구조가 남습니다.",
      content: "Summarize a release with highlights, changed files, verification, known limits, and next feedback request.",
      usage: "Use before publishing GitHub release notes.",
      payload: promptPayload("릴리스 노트 요약", "아래 변경 내용을 공개 릴리스 노트로 정리해줘. 하이라이트, 바뀐 화면, 검증 결과, 알려진 제한, 다음 피드백 질문을 포함해줘.", ["Release", "Summary"], "GitHub 릴리스 문서 초안으로 씁니다."),
    },
    {
      id: "local_first_safety_note",
      title: "Local-First Safety Note",
      titleKo: "로컬 우선 안전 안내",
      category: "Education",
      audience: "General Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Users need to understand what stays local and what they must avoid entering.",
      reasonKo: "사용자는 무엇이 로컬에 남는지, 어떤 정보를 입력하면 안 되는지 알아야 합니다.",
      resultKo: "앱 소개나 README에 넣을 안전 안내 문구가 남습니다.",
      content: "Write a short local-first safety note: localStorage, no login, no upload, no API calls, export JSON, and sensitive-data warning.",
      usage: "Use in README, privacy docs, and demo scripts.",
      payload: promptPayload("로컬 우선 안전 안내", "로컬 우선 앱 안전 안내 문구를 짧게 써줘. localStorage 저장, 로그인 없음, 업로드 없음, 외부 API 호출 없음, Export JSON 백업, 민감 정보 입력 금지를 포함해줘.", ["Privacy", "Safety"], "README와 Privacy 문서에 맞게 다듬기 좋습니다."),
    },
  ];

  function makeId(prefix) {
    return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function loadState(storage) {
    const fallback = { ratings: {}, saved: [] };
    if (!storage) return fallback;
    try {
      const parsed = JSON.parse(storage.getItem(STORAGE_KEY) || "{}");
      return {
        ratings: parsed && typeof parsed.ratings === "object" && !Array.isArray(parsed.ratings) ? parsed.ratings : {},
        saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveState(storage, state) {
    if (!storage) return;
    storage.setItem(STORAGE_KEY, JSON.stringify({
      ratings: state.ratings || {},
      saved: Array.isArray(state.saved) ? state.saved : [],
    }));
  }

  function getTemplateRating(localState, templateId) {
    const value = Number(localState.ratings && localState.ratings[templateId]);
    return Number.isFinite(value) ? Math.max(0, Math.min(5, Math.round(value))) : 0;
  }

  function setTemplateRating(localState, templateId, rating) {
    return {
      ...localState,
      ratings: {
        ...(localState.ratings || {}),
        [templateId]: Math.max(0, Math.min(5, Math.round(Number(rating) || 0))),
      },
    };
  }

  function saveTemplate(localState, templateId) {
    const saved = new Set(Array.isArray(localState.saved) ? localState.saved : []);
    saved.add(templateId);
    return { ...localState, saved: Array.from(saved) };
  }

  function removeSavedTemplate(localState, templateId) {
    const saved = new Set(Array.isArray(localState.saved) ? localState.saved : []);
    saved.delete(templateId);
    return { ...localState, saved: Array.from(saved) };
  }

  function searchableText(template) {
    return [
      template.title,
      template.titleKo,
      template.category,
      template.audience,
      template.targetModule,
      template.reason,
      template.reasonKo,
      template.content,
      template.usage,
    ].join(" ").toLowerCase();
  }

  function filterTemplates(items, filters, localState) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const category = String(options.category || "").trim();
    const audience = String(options.audience || "").trim();
    const targetModule = String(options.targetModule || "").trim();
    const savedOnly = Boolean(options.savedOnly);
    const minPopularity = Number(options.minPopularity || 0);
    const saved = new Set((localState && localState.saved) || []);

    const categoryGroups = {
      Thumbnail: ["Thumbnail"],
      Hook: ["Hook", "Script", "Prompt"],
      Shorts: ["Shorts", "Script"],
      Longform: ["Longform", "Script"],
      Tutorial: ["Tutorial", "Education", "Shot Plan"],
    };
    const matchingCategories = categoryGroups[category] || (category ? [category] : []);

    return items.filter((template) => {
      if (query && !searchableText(template).includes(query)) return false;
      if (category && !matchingCategories.includes(template.category)) return false;
      if (audience && template.audience !== audience) return false;
      if (targetModule && template.targetModule !== targetModule) return false;
      if (savedOnly && !saved.has(template.id)) return false;
      if (minPopularity && template.popularity < minPopularity) return false;
      return true;
    });
  }

  function formatTemplate(template) {
    return [
      `${template.title} / ${template.titleKo}`,
      `Category: ${template.category}`,
      `Audience: ${template.audience}`,
      `Target module: ${template.targetModule}`,
      `Popularity: ${template.popularity}/5`,
      "",
      "Why it matters:",
      template.reason,
      "",
      "Template:",
      template.content,
      "",
      "How to use:",
      template.usage,
      "",
      "Payload:",
      JSON.stringify(template.payload, null, 2),
    ].join("\n");
  }

  function promptBoardItem(template) {
    const payload = template.payload || {};
    return {
      id: makeId("prompt"),
      title: payload.title || template.titleKo || template.title,
      body: payload.body || template.content,
      toolTags: Array.isArray(payload.toolTags) ? payload.toolTags : ["ChatGPT"],
      categoryTags: Array.isArray(payload.categoryTags) ? payload.categoryTags : [template.category],
      favorite: Boolean(payload.favorite),
      rating: Number.isFinite(Number(payload.rating)) ? Number(payload.rating) : template.popularity,
      resultNotes: payload.resultNotes || template.usage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  function thumbnailIdeaItem(template) {
    const payload = template.payload || {};
    return {
      id: makeId("thumb"),
      title: payload.title || template.titleKo || template.title,
      format: payload.format || "YouTube Long",
      status: payload.status || "idea",
      emotion: payload.emotion || "curiosity",
      layout: payload.layout || "single focal object with short Korean text",
      subject: payload.subject || template.content,
      overlayText: payload.overlayText || "핵심 문구",
      palette: payload.palette || "high contrast with one accent color",
      prompt: payload.prompt || template.content,
      notes: payload.notes || template.usage,
      score: Number.isFinite(Number(payload.score)) ? Number(payload.score) : template.popularity,
      favorite: Boolean(payload.favorite),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  function scriptGeneratorItem(template) {
    const payload = template.payload || {};
    return {
      id: makeId("script"),
      title: payload.title || template.titleKo || template.title,
      format: payload.format || "Shorts",
      tone: payload.tone || "clear and practical",
      status: payload.status || "draft",
      audience: payload.audience || template.audience,
      goal: payload.goal || template.reasonKo || template.reason,
      hook: payload.hook || template.content,
      outline: payload.outline || "Hook > key proof > visual example > CTA",
      scenes: Array.isArray(payload.scenes) ? payload.scenes : ["훅으로 문제를 제기합니다.", "핵심 근거를 빠르게 보여줍니다.", "시각 예시를 넣습니다.", "CTA로 마무리합니다."],
      cta: payload.cta || "다음 작업으로 이어지는 행동을 하나 제안합니다.",
      notes: payload.notes || template.usage,
      favorite: Boolean(payload.favorite),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  function importToModule(storage, template) {
    if (!storage) return { ok: false, message: "localStorage is not available." };
    try {
      if (template.targetModule === "Creator Prompt Board") {
        const current = JSON.parse(storage.getItem(PROMPT_BOARD_KEY) || "[]");
        const next = Array.isArray(current) ? [promptBoardItem(template), ...current] : [promptBoardItem(template)];
        storage.setItem(PROMPT_BOARD_KEY, JSON.stringify(next));
        return { ok: true, message: "Added to Creator Prompt Board." };
      }
      if (template.targetModule === "Thumbnail Idea Board") {
        const current = JSON.parse(storage.getItem(THUMBNAIL_BOARD_KEY) || "[]");
        const next = Array.isArray(current) ? [thumbnailIdeaItem(template), ...current] : [thumbnailIdeaItem(template)];
        storage.setItem(THUMBNAIL_BOARD_KEY, JSON.stringify(next));
        return { ok: true, message: "Added to Thumbnail Idea Board." };
      }
      if (template.targetModule === "Script Generator") {
        const current = JSON.parse(storage.getItem(SCRIPT_GENERATOR_KEY) || "[]");
        const next = Array.isArray(current) ? [scriptGeneratorItem(template), ...current] : [scriptGeneratorItem(template)];
        storage.setItem(SCRIPT_GENERATOR_KEY, JSON.stringify(next));
        return { ok: true, message: "Added to Script Generator." };
      }
    } catch (error) {
      return { ok: false, message: "Could not import because the target module data is not valid JSON." };
    }
    return { ok: false, message: "This template is copy-only for now." };
  }

  function exportLibrary(localState) {
    return {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      templates,
      localState: {
        ratings: (localState && localState.ratings) || {},
        saved: (localState && localState.saved) || [],
      },
    };
  }

  function parseLibraryImport(input) {
    const parsed = typeof input === "string" ? JSON.parse(input) : input;
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid template library export");
    const localState = parsed.localState || parsed;
    return {
      ratings: localState && typeof localState.ratings === "object" && !Array.isArray(localState.ratings) ? localState.ratings : {},
      saved: Array.isArray(localState.saved) ? localState.saved : [],
    };
  }

  return {
    STORAGE_KEY,
    PROMPT_BOARD_KEY,
    THUMBNAIL_BOARD_KEY,
    SCRIPT_GENERATOR_KEY,
    EXPORT_VERSION,
    categories,
    audiences,
    targetModules,
    templates,
    loadState,
    saveState,
    getTemplateRating,
    setTemplateRating,
    saveTemplate,
    removeSavedTemplate,
    filterTemplates,
    formatTemplate,
    importToModule,
    exportLibrary,
    parseLibraryImport,
  };
});

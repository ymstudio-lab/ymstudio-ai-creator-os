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

  const categories = ["쇼츠", "롱폼", "튜토리얼", "리뷰", "비교", "썸네일", "후킹", "Thumbnail", "Prompt", "Script", "Shot Plan", "Calendar", "Asset", "Character", "ComfyUI", "Editing", "Analytics", "SEO", "Repurposing", "Voiceover", "Education"];
  const audiences = ["General Video Creator", "AI Video Creator", "YouTube Creator", "Solo Creator", "Agency", "Educator", "Small Business"];
  const targetModules = ["Creator Prompt Board", "Thumbnail Idea Board", "Script Generator", "AI Shot Planner", "YouTube Calendar", "Creator Asset Manager", "Copy only"];

  const templates = [
    {
      id: "thumb_emotion_contrast",
      title: "Emotion + Contrast Thumbnail Formula",
      titleKo: "감정 + 대비 썸네일 공식",
      category: "Thumbnail",
      audience: "YouTube Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "Thumbnail prompt articles in 2026 still repeat the same winning pattern: clear emotion, readable text, strong contrast, and one focal point.",
      reasonKo: "2026년 썸네일 프롬프트 글에서도 감정, 읽기 쉬운 문구, 강한 대비, 명확한 초점이 반복해서 강조됩니다.",
      content: "Create a YouTube thumbnail with one expressive face, one clear object, bold 1-3 word overlay text, high contrast lighting, and a simple background that reads clearly on mobile.",
      usage: "Use this when the video has a strong before/after, mistake, cost, or surprise angle.",
      payload: {
        title: "감정 대비 썸네일",
        format: "YouTube Long",
        status: "idea",
        emotion: "궁금증",
        layout: "얼굴 + 큰 문구",
        subject: "강한 감정의 인물 + 핵심 오브젝트 1개",
        overlayText: "왜 이럴까?",
        palette: "강한 대비, 밝은 배경, 포인트 컬러 1개",
        prompt: "YouTube thumbnail, expressive creator face, one clear object, bold Korean text area, high contrast lighting, clean background, mobile readable",
        notes: "문구는 1-3단어로 유지하고, 모바일에서 알아볼 수 있는지 확인.",
        score: 5,
        favorite: true,
      },
    },
    {
      id: "thumb_before_after",
      title: "Before / After Thumbnail",
      titleKo: "전후 비교 썸네일",
      category: "Thumbnail",
      audience: "AI Video Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "Before/after formats remain popular because viewers understand the promise instantly.",
      reasonKo: "전후 비교는 시청자가 영상의 약속을 즉시 이해하기 때문에 꾸준히 강합니다.",
      content: "Split the thumbnail into two clear halves: messy old workflow on the left, clean improved workflow on the right. Add short contrast text.",
      usage: "Best for workflow improvement, tool comparison, cleanup, and tutorial content.",
      payload: {
        title: "전후 비교 썸네일",
        format: "YouTube Long",
        status: "ready",
        emotion: "전후 변화",
        layout: "전후 비교",
        subject: "왼쪽은 복잡한 작업 화면, 오른쪽은 정리된 대시보드",
        overlayText: "전 vs 후",
        palette: "회색, 민트, 화이트",
        prompt: "split screen YouTube thumbnail, messy workflow versus clean dashboard, clear before after contrast, bold Korean text area",
        notes: "좌우 대비가 160px 폭에서도 보이게 구성.",
        score: 5,
        favorite: true,
      },
    },
    {
      id: "script_hook_loop",
      title: "Shorts Hook Loop Script",
      titleKo: "쇼츠 훅 루프 대본",
      category: "Script",
      audience: "YouTube Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Short-form creators still need fast hooks, loopable endings, and repeatable structures.",
      reasonKo: "숏폼 제작자는 빠른 훅, 반복 시청을 유도하는 마무리, 재사용 가능한 구조를 계속 필요로 합니다.",
      content: "Write a 25-second Shorts script with a 2-second hook, 3 fast proof points, one visual demo moment, and a loop ending that points back to the first line.",
      usage: "Use for Shorts, Reels, TikTok, and quick AI tool demos.",
      payload: {
        title: "쇼츠 훅 루프 대본",
        body: "다음 주제로 25초 쇼츠 대본을 작성해줘. 첫 2초는 강한 훅, 중간은 빠른 근거 3개, 후반은 화면으로 보여줄 데모 1개, 마지막은 첫 문장으로 다시 이어지는 루프형 문장으로 끝내줘. 말투는 짧고 직접적으로.",
        toolTags: ["ChatGPT", "Claude"],
        categoryTags: ["YouTube Shorts", "Script"],
        favorite: true,
        rating: 5,
        resultNotes: "반복 시청을 노리는 숏폼 구조.",
      },
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
      reasonKo: "크리에이터는 이미지 프롬프트 하나를 쓰기 전에 여러 시각 방향을 빠르게 비교해야 합니다.",
      content: "Generate 10 thumbnail concepts with layout, emotion, text, focal object, color palette, and image prompt.",
      usage: "Use before opening an image generator.",
      payload: {
        title: "썸네일 방향 10개 생성",
        body: "아래 영상 주제로 클릭을 유도할 썸네일 콘셉트 10개를 만들어줘. 각 콘셉트마다 감정 훅, 레이아웃, 핵심 오브젝트, 한글 문구 1-3단어, 컬러 팔레트, 이미지 생성 프롬프트를 포함해줘. 너무 과장된 낚시는 피하고 영상 내용과 일치하게 만들어줘.",
        toolTags: ["ChatGPT", "Claude"],
        categoryTags: ["Thumbnail", "Image prompt"],
        favorite: true,
        rating: 5,
        resultNotes: "Thumbnail Idea Board로 옮겨서 후보를 비교.",
      },
    },
    {
      id: "shot_plan_six_scene",
      title: "6-Scene AI Video Plan",
      titleKo: "6장면 AI 영상 플랜",
      category: "Shot Plan",
      audience: "AI Video Creator",
      targetModule: "AI Shot Planner",
      popularity: 4,
      reason: "AI video generation works better when creators break ideas into short, controllable shots.",
      reasonKo: "AI 영상 생성은 아이디어를 짧고 통제 가능한 샷으로 나눌수록 안정적입니다.",
      content: "Break one video idea into 6 scenes with scene goal, camera direction, motion, prompt notes, and continuity risks.",
      usage: "Use before Runway, Kling, Pika, Veo, or similar tools.",
      payload: {
        title: "6장면 AI 영상 플랜",
        body: "아래 영상 아이디어를 6개 장면으로 나눠줘. 각 장면마다 목표, 화면 설명, 카메라 움직임, 피사체 동작, 이미지/영상 생성 프롬프트, 유지해야 할 일관성 요소, 실패 가능성을 포함해줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Storyboard", "Video prompt"],
        favorite: false,
        rating: 4,
        resultNotes: "샷 플래너에 옮겨서 장면별로 다듬기.",
      },
    },
    {
      id: "calendar_four_week_launch",
      title: "4-Week Content Launch Calendar",
      titleKo: "4주 콘텐츠 론칭 캘린더",
      category: "Calendar",
      audience: "Solo Creator",
      targetModule: "YouTube Calendar",
      popularity: 4,
      reason: "Creators need repeatable publishing systems, not just one-off ideas.",
      reasonKo: "크리에이터는 단발성 아이디어보다 반복 가능한 발행 시스템이 필요합니다.",
      content: "Plan 4 weeks of content with idea, script, asset, edit, publish, and review stages.",
      usage: "Use when launching a channel, course, product, or content series.",
      payload: {
        title: "4주 콘텐츠 론칭 캘린더",
        body: "하나의 콘텐츠 주제를 4주 발행 계획으로 나눠줘. 주차별 목표, 영상 아이디어, 쇼츠 파생 콘텐츠, 썸네일 방향, 대본 마감일, 편집 마감일, 업로드 날짜, 성과 리뷰 항목을 포함해줘.",
        toolTags: ["ChatGPT", "Claude"],
        categoryTags: ["YouTube Shorts", "Script"],
        favorite: false,
        rating: 4,
        resultNotes: "유튜브 캘린더에 수동으로 옮기기 좋은 계획 템플릿.",
      },
    },
    {
      id: "asset_license_note",
      title: "Asset License Note Checklist",
      titleKo: "자산 라이선스 메모 체크리스트",
      category: "Asset",
      audience: "Agency",
      targetModule: "Creator Asset Manager",
      popularity: 4,
      reason: "AI-generated assets still need source, rights, and usage notes before public/client work.",
      reasonKo: "AI 생성 자산도 공개/클라이언트 작업 전 출처, 권리, 사용 메모가 필요합니다.",
      content: "Track source tool, model, prompt, usage rights, client/project, file path, and replacement risk.",
      usage: "Use before publishing or handing assets to a client.",
      payload: {
        title: "자산 라이선스 메모 체크리스트",
        body: "AI 생성 자산을 등록할 때 기록해야 할 체크리스트를 만들어줘. 출처 도구, 모델, 프롬프트, 파일 경로, 프로젝트명, 사용권 메모, 공개 가능 여부, 교체 필요 여부, 클라이언트 전달 가능 여부를 포함해줘.",
        toolTags: ["ChatGPT", "Claude"],
        categoryTags: ["Image prompt", "Storyboard"],
        favorite: false,
        rating: 4,
        resultNotes: "자산 매니저의 메모 규칙으로 사용.",
      },
    },
    {
      id: "character_bible",
      title: "Character Consistency Bible",
      titleKo: "캐릭터 일관성 바이블",
      category: "Character",
      audience: "AI Video Creator",
      targetModule: "Copy only",
      popularity: 5,
      reason: "Character consistency remains a major pain point across image and video generation.",
      reasonKo: "캐릭터 일관성은 이미지/영상 생성에서 여전히 큰 문제입니다.",
      content: "Document face, hair, outfit, silhouette, expression range, camera restrictions, reference images, and negative prompts.",
      usage: "Use before generating multiple scenes with the same character.",
      payload: {
        title: "캐릭터 일관성 바이블",
        body: "같은 캐릭터를 여러 장면에서 유지하기 위한 바이블을 만들어줘. 얼굴형, 헤어, 의상, 실루엣, 표정 범위, 금지 요소, 기준 이미지 설명, seed/model 메모, 장면별 유지 규칙을 포함해줘.",
        toolTags: ["Claude", "ChatGPT", "ComfyUI"],
        categoryTags: ["Character", "Image prompt"],
        favorite: true,
        rating: 5,
        resultNotes: "Coming soon: Character Consistency Tool의 기본 템플릿.",
      },
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
      content: "Track workflow name, model, LoRA, node purpose, input size, output size, prompt rules, and failure fixes.",
      usage: "Use when a ComfyUI setup becomes repeatable.",
      payload: {
        title: "ComfyUI 워크플로우 레시피 카드",
        body: "ComfyUI 워크플로우를 재사용하기 위한 레시피 카드 양식을 만들어줘. 워크플로우 이름, 목적, 모델, LoRA, 주요 노드, 입력 이미지 규칙, 출력 규격, 프롬프트 규칙, 자주 나는 오류, 수정 방법을 포함해줘.",
        toolTags: ["ComfyUI", "Claude"],
        categoryTags: ["Image prompt", "Character"],
        favorite: false,
        rating: 4,
        resultNotes: "Coming soon: ComfyUI Workflow Manager의 기본 템플릿.",
      },
    },
    {
      id: "agency_client_brief",
      title: "Client AI Video Brief",
      titleKo: "클라이언트 AI 영상 브리프",
      category: "Shot Plan",
      audience: "Agency",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Freelancers and agencies need repeatable briefs before creating AI-assisted assets.",
      reasonKo: "프리랜서와 에이전시는 AI 제작 전에 반복 가능한 브리프가 필요합니다.",
      content: "Collect client goal, audience, offer, tone, visual references, deliverables, usage rights, and approval process.",
      usage: "Use before producing client-facing AI video or image work.",
      payload: {
        title: "클라이언트 AI 영상 브리프",
        body: "클라이언트용 AI 영상 제작 브리프를 만들어줘. 목표, 타깃, 제안/상품, 톤앤매너, 참고 이미지, 필요한 산출물, 사용권 범위, 승인 단계, 금지 표현, 일정, 최종 전달 형식을 포함해줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Storyboard", "Video prompt"],
        favorite: false,
        rating: 4,
        resultNotes: "프리랜서/에이전시 작업 시작 전 사용.",
      },
    },
    {
      id: "classic_video_hook_map",
      title: "Classic Video Hook Map",
      titleKo: "일반 영상 훅 설계표",
      category: "Script",
      audience: "General Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Popular videos usually make the viewer understand the promise quickly: problem, result, curiosity, or conflict.",
      reasonKo: "인기 영상은 보통 문제, 결과, 궁금증, 갈등 중 하나로 초반에 볼 이유를 빠르게 보여줍니다.",
      content: "Write five opening hooks for one video: problem hook, result hook, curiosity hook, mistake hook, and challenge hook. Keep each under 12 Korean words.",
      usage: "Use before scripting normal YouTube videos, Shorts, Reels, tutorials, reviews, and business videos.",
      payload: {
        title: "일반 영상 훅 설계표",
        body: "아래 영상 주제로 초반 5초 안에 쓸 수 있는 훅을 5개 만들어줘. 유형은 문제형, 결과형, 궁금증형, 실수형, 도전형으로 나누고, 각 문장은 한국어 12단어 이하로 짧게 써줘. 과장 광고처럼 보이지 않게 실제 영상 내용과 맞춰줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Script", "YouTube"],
        favorite: true,
        rating: 5,
        resultNotes: "AI 영상이 아니어도 모든 영상 기획 첫 단계에서 사용.",
      },
    },
    {
      id: "title_thumbnail_fit_check",
      title: "Title + Thumbnail Fit Check",
      titleKo: "제목 + 썸네일 궁합 체크",
      category: "Thumbnail",
      audience: "YouTube Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "Viewers usually see title and thumbnail first, so the two must work together instead of repeating the same words.",
      reasonKo: "시청자는 보통 제목과 썸네일을 먼저 보기 때문에 둘이 같은 말을 반복하지 않고 함께 작동해야 합니다.",
      content: "Check whether the title and thumbnail tell the same story, avoid duplicate text, stay readable on mobile, and create a clear reason to click.",
      usage: "Use before upload, especially when choosing between multiple thumbnail and title versions.",
      payload: {
        title: "제목 + 썸네일 궁합 체크",
        format: "YouTube Long",
        status: "review",
        emotion: "호기심",
        layout: "제목과 다른 정보만 썸네일에 표시",
        subject: "영상의 핵심 장면 또는 결과물",
        overlayText: "제목과 중복 금지",
        palette: "모바일에서 읽히는 고대비",
        prompt: "Review the title and thumbnail as one package. Check story fit, mobile readability, duplicated words, emotional clarity, and click reason.",
        notes: "업로드 전 제목 후보와 썸네일 후보를 함께 비교.",
        score: 5,
        favorite: true,
      },
    },
    {
      id: "shooting_broll_checklist",
      title: "Shooting + B-Roll Checklist",
      titleKo: "촬영 + 보조컷 체크리스트",
      category: "Shot Plan",
      audience: "General Video Creator",
      targetModule: "AI Shot Planner",
      popularity: 4,
      reason: "Professional videos rely on planned coverage: main shot, close-up, proof shot, reaction, process, and transition footage.",
      reasonKo: "전문가 영상은 메인컷만 찍지 않고 근접컷, 증거컷, 리액션, 과정, 전환컷을 미리 확보합니다.",
      content: "Plan the main shot, close-up, proof shot, reaction shot, process shot, transition shot, and safety shot for one video.",
      usage: "Use for camera shoots, screen recordings, product videos, tutorials, and AI-assisted production.",
      payload: {
        title: "촬영 + 보조컷 체크리스트",
        body: "아래 영상 주제로 촬영 체크리스트를 만들어줘. 메인컷, 근접컷, 증거컷, 리액션컷, 과정컷, 전환컷, 실패했을 때 대체컷을 포함해줘. 각 컷마다 목적, 화면 설명, 필요한 소품, 놓치면 안 되는 포인트를 적어줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Storyboard", "Production"],
        favorite: false,
        rating: 4,
        resultNotes: "일반 촬영, 화면 녹화, AI 영상 샷 플랜 모두에 사용.",
      },
    },
    {
      id: "retention_editing_pass",
      title: "Retention Editing Pass",
      titleKo: "시청 유지 편집 점검",
      category: "Editing",
      audience: "General Video Creator",
      targetModule: "Copy only",
      popularity: 5,
      reason: "Videos compete for attention, so creators repeatedly tighten openings, remove dead time, and add visual changes.",
      reasonKo: "영상은 시청 유지가 중요해서 초반 압축, 빈 시간 제거, 화면 변화 추가를 반복 점검해야 합니다.",
      content: "Review a script or rough cut for slow openings, repeated points, missing visual changes, weak transitions, and unclear payoff.",
      usage: "Use after draft scripting or rough editing.",
      payload: {
        title: "시청 유지 편집 점검",
        body: "아래 대본 또는 러프컷 메모를 보고 시청 유지 관점에서 수정해줘. 초반 10초가 느린지, 반복되는 말이 있는지, 화면 변화가 부족한지, 전환이 어색한지, 마지막 보상이 약한지 체크하고 바로 고칠 문장/컷 순서로 제안해줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Editing", "Script"],
        favorite: true,
        rating: 5,
        resultNotes: "업로드 전 마지막 품질 점검용.",
      },
    },
    {
      id: "post_publish_review",
      title: "Post-Publish Review Notes",
      titleKo: "업로드 후 성과 리뷰 노트",
      category: "Analytics",
      audience: "YouTube Creator",
      targetModule: "YouTube Calendar",
      popularity: 4,
      reason: "Creators improve by reviewing what happened after publishing, not only by making the next video.",
      reasonKo: "다음 영상을 잘 만들려면 업로드 후 제목, 썸네일, 초반 이탈, 댓글 반응을 기록해야 합니다.",
      content: "Log publish date, title, thumbnail angle, first 24-hour CTR, retention notes, comments, and next experiment.",
      usage: "Use 24-72 hours after upload to decide whether to update title/thumbnail or repeat the topic.",
      payload: {
        title: "업로드 후 성과 리뷰 노트",
        body: "업로드한 영상의 성과 리뷰 양식을 만들어줘. 제목, 썸네일 방향, 업로드 날짜, 첫 24시간 클릭률, 초반 이탈 지점, 댓글에서 반복된 말, 다음 영상에서 반복할 것, 바꿀 것을 정리하는 표로 만들어줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["YouTube", "Analytics"],
        favorite: false,
        rating: 4,
        resultNotes: "YouTube Calendar의 성과 메모로 옮겨 쓰기.",
      },
    },
    {
      id: "youtube_metadata_pack",
      title: "YouTube Metadata Pack",
      titleKo: "유튜브 메타데이터 패키지",
      category: "SEO",
      audience: "YouTube Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Creators repeatedly need searchable titles, descriptions, chapters, and pinned comment drafts after the video is ready.",
      reasonKo: "영상이 완성된 뒤에도 검색형 제목, 설명, 챕터, 고정 댓글 초안은 매번 반복해서 필요합니다.",
      content: "Create searchable title options, a concise description, chapter markers, tags, and a pinned comment from one video summary.",
      usage: "Use after editing, before upload.",
      payload: {
        title: "유튜브 메타데이터 패키지",
        body: "아래 영상 요약을 바탕으로 유튜브 업로드 메타데이터를 만들어줘. 검색형 제목 5개, 궁금증형 제목 5개, 설명란 1개, 챕터 마커 예시, 태그 후보, 고정 댓글 초안을 포함해줘. 제목은 과장하지 말고 핵심 키워드를 앞쪽에 둬줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["SEO", "YouTube"],
        favorite: true,
        rating: 5,
        resultNotes: "업로드 직전 반복 작업용.",
      },
    },
    {
      id: "longform_to_shorts_repurpose",
      title: "Longform to Shorts Repurposing",
      titleKo: "롱폼 영상 쇼츠 재활용",
      category: "Repurposing",
      audience: "Solo Creator",
      targetModule: "YouTube Calendar",
      popularity: 5,
      reason: "Solo creators and agencies need to turn one long video into multiple short clips, posts, and follow-up ideas.",
      reasonKo: "1인 크리에이터와 대행사는 긴 영상 하나를 쇼츠, 게시물, 후속 아이디어로 반복 재활용해야 합니다.",
      content: "Extract 8 short-form clip ideas, each with hook, clip range, caption, thumbnail text, and publishing note.",
      usage: "Use after recording or editing a long video.",
      payload: {
        title: "롱폼 영상 쇼츠 재활용",
        body: "아래 롱폼 영상 요약에서 쇼츠/릴스/틱톡으로 자를 수 있는 클립 아이디어 8개를 뽑아줘. 각 아이디어마다 훅, 잘라낼 구간, 화면 자막, 썸네일 문구, 업로드 메모를 포함해줘. 같은 말을 반복하지 말고 서로 다른 시청자 욕구를 겨냥해줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Shorts", "Repurposing"],
        favorite: true,
        rating: 5,
        resultNotes: "Calendar에 후속 콘텐츠로 등록.",
      },
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
      content: "Rewrite narration for spoken delivery: shorter sentences, natural pauses, pronunciation safety, and emotional beats.",
      usage: "Use before recording, TTS, or avatar video generation.",
      payload: {
        title: "내레이션 읽기 쉬움 점검",
        body: "아래 내레이션 대본을 실제로 읽기 쉽게 고쳐줘. 한 문장은 짧게, 숨 쉴 지점은 표시하고, 발음하기 어려운 표현은 바꾸고, 감정이 바뀌는 지점에는 메모를 달아줘. AI 음성으로 읽어도 어색하지 않게 자연스러운 구어체로 정리해줘.",
        toolTags: ["Claude", "ChatGPT", "ElevenLabs"],
        categoryTags: ["Voiceover", "Script"],
        favorite: false,
        rating: 4,
        resultNotes: "TTS 또는 녹음 전 마지막 대본 점검.",
      },
    },
    {
      id: "course_lesson_structure",
      title: "Course Lesson Structure",
      titleKo: "강의 영상 구조 템플릿",
      category: "Education",
      audience: "Educator",
      targetModule: "AI Shot Planner",
      popularity: 4,
      reason: "Educators need repeatable lesson structure: promise, prerequisite, steps, example, practice, and recap.",
      reasonKo: "강의 제작자는 약속, 준비 지식, 단계, 예시, 실습, 요약 구조를 반복해서 사용합니다.",
      content: "Turn one lesson topic into a structured tutorial with learning goal, steps, demo moments, practice, and recap.",
      usage: "Use for courses, tutorials, paid lessons, and knowledge products.",
      payload: {
        title: "강의 영상 구조 템플릿",
        body: "아래 강의 주제로 초보자도 따라올 수 있는 영상 강의 구조를 만들어줘. 학습 목표, 필요한 사전 지식, 단계별 설명, 화면 데모 지점, 실습 과제, 마지막 요약, 다음 강의 예고를 포함해줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Education", "Tutorial"],
        favorite: false,
        rating: 4,
        resultNotes: "지식상품/강의형 콘텐츠용.",
      },
    },
    {
      id: "small_business_offer_video",
      title: "Small Business Offer Video",
      titleKo: "소상공인 제안 영상 템플릿",
      category: "Script",
      audience: "Small Business",
      targetModule: "Creator Prompt Board",
      popularity: 4,
      reason: "Small businesses need simple videos that explain who it is for, what changes, proof, offer, and next action.",
      reasonKo: "소상공인 영상은 대상, 변화, 증거, 제안, 다음 행동을 짧고 분명하게 보여줘야 합니다.",
      content: "Create a 45-second offer video script with customer problem, result, proof, offer, and CTA.",
      usage: "Use for local business, online store, service, landing page, and ad creative drafts.",
      payload: {
        title: "소상공인 제안 영상 템플릿",
        body: "아래 상품/서비스로 45초 제안 영상을 만들어줘. 누구를 위한 것인지, 어떤 문제가 해결되는지, 믿을 만한 증거, 제안 내용, 마지막 행동 유도를 포함해줘. 초보자가 촬영할 수 있게 장면도 간단히 나눠줘.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Business", "Ad script"],
        favorite: false,
        rating: 4,
        resultNotes: "비즈니스/마케팅 OS로 확장 가능한 기본 템플릿.",
      },
    },
    {
      id: "shorts_mistake_fix",
      title: "Mistake Fix Shorts",
      titleKo: "실수 교정 쇼츠",
      category: "쇼츠",
      audience: "General Video Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Mistake-based short videos work because viewers quickly recognize a problem and want the fix.",
      reasonKo: "실수형 쇼츠는 시청자가 문제를 바로 알아보고 해결법을 기다리기 때문에 초반 유지에 강합니다.",
      resultKo: "실수 지적 훅, 3단계 해결 본문, 반복 시청을 부르는 마무리 문장이 남습니다.",
      content: "Write a 30-second short video that starts with one common mistake, shows the consequence, gives a simple fix, and ends with a repeatable rule.",
      usage: "Use for tutorials, creator tips, AI tool tips, editing tips, and beginner education.",
      payload: {
        title: "실수 교정 쇼츠",
        format: "Shorts",
        tone: "빠르고 강하게",
        status: "draft",
        audience: "초보 크리에이터",
        goal: "자주 하는 실수 하나를 빠르게 고치게 만들기",
        hook: "이 실수 하나 때문에 영상이 바로 넘겨집니다.",
        outline: "실수 지적 > 왜 문제인지 > 바로 고치는 방법 > 반복 규칙",
        scenes: ["흔한 실수 화면을 보여줍니다.", "시청자가 떠나는 이유를 한 문장으로 말합니다.", "바로 적용할 수정법을 보여줍니다.", "다음 영상에도 쓸 규칙으로 정리합니다."],
        cta: "오늘 만든 영상에서 이 실수 하나만 먼저 고쳐보세요.",
        notes: "초보자 교육형 쇼츠 첫 템플릿.",
        favorite: true,
        resultNotes: "쇼츠 대본 초안과 샷 분리 문장.",
      },
    },
    {
      id: "longform_problem_solution",
      title: "Problem-Solution Longform",
      titleKo: "문제 해결 롱폼 구조",
      category: "롱폼",
      audience: "YouTube Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Long videos are easier to finish when the viewer sees a clear problem, a path, and a payoff.",
      reasonKo: "롱폼은 문제, 해결 순서, 마지막 보상이 명확할 때 끝까지 볼 이유가 생깁니다.",
      resultKo: "8~10분 롱폼용 훅, 개요, 장면 순서, CTA 초안이 남습니다.",
      content: "Build an 8-10 minute video with opening problem, stakes, three solution steps, proof/demo, summary, and next action.",
      usage: "Use for YouTube explainers, workflow videos, product education, and creator tutorials.",
      payload: {
        title: "문제 해결 롱폼 구조",
        format: "YouTube Long",
        tone: "쉽고 차분하게",
        status: "draft",
        audience: "문제를 해결하려는 시청자",
        goal: "하나의 문제를 순서대로 해결하게 만들기",
        hook: "이 문제를 그냥 두면 다음 단계에서 계속 막힙니다.",
        outline: "문제 정의 > 왜 막히는지 > 해결 3단계 > 실제 예시 > 정리",
        scenes: ["문제를 짧게 보여줍니다.", "시청자가 겪는 막힘을 정리합니다.", "해결 1단계를 실행합니다.", "해결 2단계와 3단계를 이어갑니다.", "결과를 보여주고 다음 행동을 안내합니다."],
        cta: "내 프로젝트에 같은 순서를 적용해보고 저장하세요.",
        resultNotes: "롱폼 대본 초안과 장면 흐름.",
      },
    },
    {
      id: "tutorial_follow_along",
      title: "Follow-Along Tutorial",
      titleKo: "따라 하기 튜토리얼",
      category: "튜토리얼",
      audience: "Educator",
      targetModule: "AI Shot Planner",
      popularity: 5,
      reason: "Beginner tutorials work best when each step has one visible action and one result.",
      reasonKo: "초보자 튜토리얼은 한 단계에 한 행동과 한 결과만 보여줄 때 따라 하기 쉽습니다.",
      resultKo: "튜토리얼 단계, 화면 녹화 샷, 체크포인트 메모가 남습니다.",
      content: "Turn one task into a step-by-step tutorial with input, click/action, expected result, and common mistake for each step.",
      usage: "Use for software tutorials, AI workflow guides, onboarding videos, and course lessons.",
      payload: {
        title: "따라 하기 튜토리얼",
        body: "주제를 초보자가 그대로 따라 할 수 있는 단계별 튜토리얼로 나눕니다. 각 단계마다 입력값, 클릭/행동, 보이는 결과, 자주 하는 실수를 적습니다.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Tutorial", "Education"],
        resultNotes: "Shot Planner에 넣기 좋은 단계별 샷 목록.",
      },
    },
    {
      id: "review_good_bad_fit",
      title: "Good / Bad / Fit Review",
      titleKo: "좋은 점/아쉬운 점/맞는 사람 리뷰",
      category: "리뷰",
      audience: "YouTube Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "Review viewers want a fast verdict, proof, tradeoffs, and whether the product fits them.",
      reasonKo: "리뷰 시청자는 결론, 근거, 단점, 나에게 맞는지 여부를 빠르게 확인하고 싶어합니다.",
      resultKo: "리뷰 대본 구조, 장단점 문장, 추천/비추천 결론이 남습니다.",
      content: "Create a review script with quick verdict, who it is for, three strengths, two weaknesses, comparison note, and final recommendation.",
      usage: "Use for AI tools, apps, gear, services, templates, and creator products.",
      payload: {
        title: "좋은 점/아쉬운 점/맞는 사람 리뷰",
        format: "YouTube Long",
        tone: "전문가처럼",
        status: "draft",
        audience: "구매나 사용을 고민하는 사람",
        goal: "장단점을 보고 선택하게 돕기",
        hook: "이 도구가 좋은지는 기능보다 당신 상황에 맞는지가 더 중요합니다.",
        outline: "빠른 결론 > 맞는 사람 > 장점 3개 > 단점 2개 > 비교 > 추천 여부",
        scenes: ["결론을 먼저 말합니다.", "어떤 사람에게 맞는지 정리합니다.", "장점과 근거를 보여줍니다.", "아쉬운 점을 솔직히 말합니다.", "대안과 최종 추천을 정리합니다."],
        cta: "내 상황에 맞는 선택 기준을 먼저 적어보세요.",
        resultNotes: "리뷰형 대본과 비교 포인트.",
      },
    },
    {
      id: "comparison_decision_matrix",
      title: "Two-Option Comparison Matrix",
      titleKo: "두 가지 선택 비교표",
      category: "비교",
      audience: "General Video Creator",
      targetModule: "Creator Prompt Board",
      popularity: 5,
      reason: "Comparison videos perform well because viewers arrive with a decision they already need to make.",
      reasonKo: "비교 영상은 시청자가 이미 선택 고민을 가지고 들어오기 때문에 클릭 이유가 강합니다.",
      resultKo: "비교 기준표, 추천 대상, 결론 문장, 썸네일 문구가 남습니다.",
      content: "Compare two options by price, speed, quality, beginner difficulty, best use case, hidden cost, and final pick.",
      usage: "Use for tool comparisons, workflow choices, paid vs free, local vs cloud, and beginner recommendations.",
      payload: {
        title: "두 가지 선택 비교표",
        body: "두 선택지를 가격, 속도, 품질, 초보자 난이도, 맞는 상황, 숨은 비용, 최종 추천으로 비교합니다. 마지막에는 어떤 사람은 A, 어떤 사람은 B를 고르면 되는지 정리합니다.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["Comparison", "Review"],
        favorite: true,
        rating: 5,
        resultNotes: "비교 영상 기획표와 결론 문장.",
      },
    },
    {
      id: "thumbnail_curiosity_gap",
      title: "Curiosity Gap Thumbnail",
      titleKo: "궁금증 썸네일 공식",
      category: "썸네일",
      audience: "YouTube Creator",
      targetModule: "Thumbnail Idea Board",
      popularity: 5,
      reason: "A good curiosity gap makes the viewer understand the topic but still need the answer.",
      reasonKo: "좋은 궁금증은 주제는 이해되지만 답은 영상 안에서 확인하고 싶게 만듭니다.",
      resultKo: "모바일에서 읽히는 썸네일 문구, 감정, 레이아웃, 이미지 프롬프트가 남습니다.",
      content: "Design a thumbnail with one unanswered question, one visual clue, a clear emotion, and short text that does not repeat the title.",
      usage: "Use when the title already explains the topic and the thumbnail must add tension.",
      payload: {
        title: "궁금증 썸네일 공식",
        format: "YouTube Long",
        status: "idea",
        emotion: "궁금함",
        layout: "얼굴 + 단서 오브젝트 + 짧은 문구",
        subject: "답을 숨긴 시각 단서 하나",
        overlayText: "왜 이럴까?",
        palette: "밝은 배경, 진한 포인트 컬러",
        prompt: "YouTube thumbnail, curiosity gap, expressive face, one visual clue, short Korean text area, clean mobile readable layout",
        notes: "제목과 같은 말을 반복하지 않습니다.",
        score: 5,
        resultNotes: "썸네일 후보와 이미지 생성 프롬프트.",
      },
    },
    {
      id: "hook_first_five_seconds",
      title: "First 5 Seconds Hook Pack",
      titleKo: "첫 5초 훅 패키지",
      category: "후킹",
      audience: "General Video Creator",
      targetModule: "Script Generator",
      popularity: 5,
      reason: "The first seconds decide whether viewers give the rest of the video a chance.",
      reasonKo: "첫 몇 초는 시청자가 영상을 계속 볼지 결정하는 구간이라 반복적으로 개선할 가치가 큽니다.",
      resultKo: "문제형, 결과형, 반전형, 비교형, 도전형 훅 5개가 남습니다.",
      content: "Generate five opening hooks for one topic: problem, result, surprise, comparison, and challenge. Keep each short and concrete.",
      usage: "Use before writing Shorts, longform intros, ads, tutorials, and reviews.",
      payload: {
        title: "첫 5초 훅 패키지",
        format: "Shorts",
        tone: "빠르고 강하게",
        status: "draft",
        audience: "빠르게 판단하는 시청자",
        goal: "첫 5초 이탈을 줄이기",
        hook: "시작 5초만 바꿔도 같은 주제가 다르게 보입니다.",
        outline: "문제형 훅 > 결과형 훅 > 반전형 훅 > 비교형 훅 > 도전형 훅",
        scenes: ["문제형 훅을 보여줍니다.", "결과형 훅을 보여줍니다.", "반전형 훅을 보여줍니다.", "가장 맞는 훅을 고릅니다."],
        cta: "오늘 영상에는 훅을 5개 만든 뒤 하나만 고르세요.",
        resultNotes: "바로 테스트할 수 있는 훅 후보 5개.",
      },
    },
    {
      id: "ai_workflow_demo",
      title: "AI Workflow Demo Script",
      titleKo: "AI 워크플로우 시연 대본",
      category: "튜토리얼",
      audience: "AI Video Creator",
      targetModule: "Script Generator",
      popularity: 4,
      reason: "AI workflow videos need visible before, action, output, and next step so viewers trust the process.",
      reasonKo: "AI 워크플로우 영상은 이전 상태, 실행, 결과, 다음 행동이 보여야 과정이 믿을 만해집니다.",
      resultKo: "화면 시연용 대본, 샷 분리 문장, 결과 확인 멘트가 남습니다.",
      content: "Write a demo script that shows the starting problem, the tool action, the generated output, the cleanup step, and the saved result.",
      usage: "Use for AI app demos, ComfyUI workflows, prompt systems, and creator automation videos.",
      payload: {
        title: "AI 워크플로우 시연 대본",
        format: "Tutorial",
        tone: "쉽고 차분하게",
        status: "draft",
        audience: "AI 도구를 처음 쓰는 사람",
        goal: "AI 작업 흐름을 눈으로 이해시키기",
        hook: "AI 도구는 결과보다 순서가 보일 때 따라 하기 쉬워집니다.",
        outline: "문제 > 도구 실행 > 결과 확인 > 정리 > 저장",
        scenes: ["시작 전 빈 화면을 보여줍니다.", "프롬프트나 설정을 입력합니다.", "결과가 나온 화면을 보여줍니다.", "수정할 부분을 정리합니다.", "저장 위치와 다음 단계를 보여줍니다."],
        cta: "같은 흐름을 내 주제로 한 번 저장해보세요.",
        resultNotes: "AI 시연 영상 대본과 화면 녹화 샷.",
      },
    },
    {
      id: "creator_offer_landing_video",
      title: "Creator Offer Landing Video",
      titleKo: "크리에이터 상품 소개 영상",
      category: "롱폼",
      audience: "Small Business",
      targetModule: "Script Generator",
      popularity: 4,
      reason: "Creators who sell templates, services, or courses need a clear offer video, not only educational content.",
      reasonKo: "템플릿, 서비스, 강의를 파는 크리에이터는 교육 영상뿐 아니라 제안이 분명한 소개 영상도 필요합니다.",
      resultKo: "상품 소개 훅, 문제/해결/증거/제안/CTA 대본이 남습니다.",
      content: "Create a landing video script with audience pain, offer promise, proof, what is included, who it is not for, and CTA.",
      usage: "Use for GitHub projects, template packs, paid guides, services, and landing pages.",
      payload: {
        title: "크리에이터 상품 소개 영상",
        format: "Product Demo",
        tone: "전문가처럼",
        status: "draft",
        audience: "작업 시간을 줄이고 싶은 크리에이터",
        goal: "상품이나 템플릿의 가치를 설명하기",
        hook: "이건 더 많은 기능을 파는 게 아니라 반복 작업을 줄이는 도구입니다.",
        outline: "문제 > 약속 > 구성품 > 사용 예시 > 맞는 사람/아닌 사람 > CTA",
        scenes: ["반복 작업 문제를 보여줍니다.", "상품이 줄여주는 시간을 설명합니다.", "구성품을 보여줍니다.", "사용 전후를 비교합니다.", "구매나 다운로드 행동을 안내합니다."],
        cta: "먼저 무료 샘플로 내 작업에 맞는지 확인해보세요.",
        resultNotes: "공개/홍보용 소개 영상 대본.",
      },
    },
    {
      id: "upload_checklist_final_pass",
      title: "Final Upload Checklist",
      titleKo: "업로드 직전 체크리스트",
      category: "튜토리얼",
      audience: "YouTube Creator",
      targetModule: "YouTube Calendar",
      popularity: 4,
      reason: "Many creators lose quality at the final step: title, thumbnail, description, chapters, captions, and review notes.",
      reasonKo: "업로드 직전에는 제목, 썸네일, 설명, 챕터, 자막, 리뷰 메모처럼 빠뜨리기 쉬운 항목이 많습니다.",
      resultKo: "업로드 전 확인표와 캘린더 메모가 남습니다.",
      content: "Check title, thumbnail, description, chapters, tags, pinned comment, upload time, subtitles, and post-publish review date.",
      usage: "Use right before publishing a video.",
      payload: {
        title: "업로드 직전 체크리스트",
        body: "업로드 직전 확인할 항목을 체크리스트로 정리합니다. 제목, 썸네일, 설명, 챕터, 태그, 고정 댓글, 업로드 시간, 자막, 업로드 후 리뷰 날짜를 포함합니다.",
        toolTags: ["Claude", "ChatGPT"],
        categoryTags: ["YouTube", "Publishing"],
        resultNotes: "YouTube Calendar에 붙일 업로드 체크 메모.",
      },
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
      "썸네일": ["썸네일", "Thumbnail"],
      "Thumbnail": ["Thumbnail", "썸네일"],
      "후킹": ["후킹", "Script", "Prompt"],
      "롱폼": ["롱폼", "Script"],
      "튜토리얼": ["튜토리얼", "Education", "Shot Plan"],
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
      emotion: payload.emotion || "궁금증",
      layout: payload.layout || "얼굴 + 큰 문구",
      subject: payload.subject || template.content,
      overlayText: payload.overlayText || "핵심 문구",
      palette: payload.palette || "강한 대비, 포인트 컬러 1개",
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
      tone: payload.tone || "빠르고 강하게",
      status: payload.status || "draft",
      audience: payload.audience || template.audience,
      goal: payload.goal || template.reasonKo || template.reason,
      hook: payload.hook || template.content,
      outline: payload.outline || "훅 > 핵심 근거 > 시각 예시 > CTA",
      scenes: Array.isArray(payload.scenes) ? payload.scenes : ["훅으로 문제를 제기합니다.", "핵심 근거를 빠르게 보여줍니다.", "시각 예시를 넣습니다.", "CTA로 마무리합니다."],
      cta: payload.cta || "다음 작업으로 이어질 행동을 하나 제안합니다.",
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

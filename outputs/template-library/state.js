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
  const EXPORT_VERSION = 1;

  const categories = ["Thumbnail", "Prompt", "Script", "Shot Plan", "Calendar", "Asset", "Character", "ComfyUI", "Editing", "Analytics", "SEO", "Repurposing", "Voiceover", "Education"];
  const audiences = ["General Video Creator", "AI Video Creator", "YouTube Creator", "Solo Creator", "Agency", "Educator", "Small Business"];
  const targetModules = ["Creator Prompt Board", "Thumbnail Idea Board", "AI Shot Planner", "YouTube Calendar", "Creator Asset Manager", "Copy only"];

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
      targetModule: "Creator Prompt Board",
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

    return items.filter((template) => {
      if (query && !searchableText(template).includes(query)) return false;
      if (category && template.category !== category) return false;
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

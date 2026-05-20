(function (root, factory) {
  const state = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = state;
  }
  root.CreatorOSState = state;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const modules = [
    {
      id: "creator-prompt-board",
      name: "Creator Prompt Board",
      nameKo: "크리에이터 프롬프트 보드",
      workflow: "Prompting",
      workflowKo: "프롬프트",
      status: "ready",
      link: "../creator-prompt-board/index.html",
      outputFolder: "../creator-prompt-board",
      value: "Reusable prompt library for video concepts, scripts, thumbnails, and production tasks.",
      valueKo: "영상 콘셉트, 스크립트, 썸네일, 제작 작업에 반복해서 쓰는 프롬프트 보드입니다.",
      publicUse: "Useful for collecting repeatable prompts, comparing results, and keeping production notes searchable.",
      publicUseKo: "반복 프롬프트를 모으고, 결과를 비교하고, 제작 메모를 쉽게 찾는 데 유용합니다.",
    },
    {
      id: "ai-shot-planner",
      name: "AI Shot Planner",
      nameKo: "AI 샷 플래너",
      workflow: "Production",
      workflowKo: "제작",
      status: "ready",
      link: "../ai-shot-planner/index.html",
      outputFolder: "../ai-shot-planner",
      value: "Scene and shot planning system that turns concepts into prompt-ready production plans.",
      valueKo: "아이디어를 장면과 샷 단위로 나누고 바로 생성에 쓸 수 있는 제작 계획으로 정리합니다.",
      publicUse: "Useful for turning a rough idea into scenes, shots, prompts, and review notes before generation.",
      publicUseKo: "거친 아이디어를 생성 전 장면, 샷, 프롬프트, 검토 메모로 정리하는 데 유용합니다.",
    },
    {
      id: "api-cost-tracker",
      name: "API Cost Tracker",
      nameKo: "API 비용 트래커",
      workflow: "Operations",
      workflowKo: "운영",
      status: "ready",
      link: "../api-cost-tracker/index.html",
      outputFolder: "../api-cost-tracker",
      value: "Manual AI tool usage, monthly budget, credit tracking, warning levels, and report exports.",
      valueKo: "AI 도구 사용량, 월 예산, 크레딧 소모, 경고 단계, 리포트를 로컬에서 관리합니다.",
      publicUse: "Useful for seeing local estimates, credit use, and budget warnings before connecting any accounts.",
      publicUseKo: "계정 연결 없이 로컬 추정 비용, 크레딧 사용량, 예산 경고를 확인하는 데 유용합니다.",
    },
    {
      id: "youtube-calendar",
      name: "YouTube Calendar",
      nameKo: "유튜브 캘린더",
      workflow: "Publishing",
      workflowKo: "발행",
      status: "ready",
      link: "../youtube-calendar/index.html",
      outputFolder: "../youtube-calendar",
      value: "Content pipeline for ideas, title variants, thumbnail prompts, status, and upload planning.",
      valueKo: "영상 아이디어, 제목 후보, 썸네일 프롬프트, 제작 상태, 업로드 일정을 한곳에서 관리합니다.",
      publicUse: "Useful for planning content status, upload dates, title variants, and review notes in one place.",
      publicUseKo: "콘텐츠 상태, 업로드 날짜, 제목 후보, 검토 메모를 한곳에서 계획하는 데 유용합니다.",
    },
    {
      id: "creator-asset-manager",
      name: "Creator Asset Manager",
      nameKo: "크리에이터 자산 매니저",
      workflow: "Assets",
      workflowKo: "자산",
      status: "ready",
      link: "../creator-asset-manager/index.html",
      outputFolder: "../creator-asset-manager",
      value: "Local catalog for generated assets, source tools, usage rights, project relations, and collections.",
      valueKo: "AI 생성 이미지, 영상, 프롬프트, 파일 경로, 출처 도구, 사용권, 프로젝트, 컬렉션을 정리합니다.",
      publicUse: "Useful for tracking generated files, source tools, usage notes, and project relationships locally.",
      publicUseKo: "생성 파일, 출처 도구, 사용 메모, 프로젝트 관계를 로컬에서 추적하는 데 유용합니다.",
    },
    {
      id: "thumbnail-idea-board",
      name: "Thumbnail Idea Board",
      nameKo: "썸네일 아이디어 보드",
      workflow: "Publishing",
      workflowKo: "발행",
      status: "ready",
      link: "../thumbnail-idea-board/index.html",
      outputFolder: "../thumbnail-idea-board",
      value: "Thumbnail hooks, Korean overlay text, layout notes, palettes, scores, and image prompts.",
      valueKo: "썸네일 훅, 한글 문구, 레이아웃, 컬러, 점수, 이미지 생성 프롬프트를 정리합니다.",
      publicUse: "Useful for comparing hooks, Korean overlay text, layout notes, and image prompts before design work.",
      publicUseKo: "디자인 전에 훅, 한글 문구, 레이아웃 메모, 이미지 프롬프트를 비교하는 데 유용합니다.",
    },
    {
      id: "template-library",
      name: "Template Library",
      nameKo: "템플릿 라이브러리",
      workflow: "Prompting",
      workflowKo: "프롬프트",
      status: "ready",
      link: "../template-library/index.html",
      outputFolder: "../template-library",
      value: "Built-in creator templates for hooks, thumbnails, scripts, shot plans, calendars, assets, characters, and ComfyUI recipes.",
      valueKo: "훅, 썸네일, 대본, 샷 플랜, 캘린더, 자산, 캐릭터, ComfyUI 레시피처럼 영상 제작자가 반복해서 쓰는 템플릿을 모읍니다.",
      publicUse: "Useful for testing which local templates are worth saving, rating, copying, and reusing.",
      publicUseKo: "어떤 로컬 템플릿을 저장, 별점, 복사, 재사용할 가치가 있는지 확인하는 데 유용합니다.",
    },
    {
      id: "script-generator",
      name: "Script Generator",
      nameKo: "스크립트 생성기",
      workflow: "Prompting",
      workflowKo: "프롬프트",
      status: "ready",
      link: "../script-generator/index.html",
      outputFolder: "../script-generator",
      value: "Hook, outline, scene narration, CTA, short-form scripts, and reusable script drafts.",
      valueKo: "훅, 개요, 장면 내레이션, CTA, 숏폼 대본, 반복 가능한 대본 초안을 만듭니다.",
      publicUse: "Useful for turning a saved Creator Project into a first script draft before prompt and shot planning.",
      publicUseKo: "저장된 Creator Project를 프롬프트와 샷 플랜 전에 바로 쓸 수 있는 첫 대본 초안으로 바꿀 때 유용합니다.",
    },
    {
      id: "comfyui-workflow-manager",
      name: "ComfyUI Workflow Manager",
      nameKo: "ComfyUI 워크플로우 매니저",
      workflow: "Automation",
      workflowKo: "자동화",
      status: "ready",
      link: "../comfyui-workflow-manager/index.html",
      outputFolder: "../comfyui-workflow-manager",
      value: "Reusable local generation recipes for model notes, resolution, steps, batch, prompts, and failure fixes.",
      valueKo: "모델 메모, 해상도, steps, batch, 프롬프트, 실패 수정법을 반복 생성 레시피로 저장합니다.",
      publicUse: "Useful for keeping model notes, settings, prompts, and failure fixes attached to a project.",
      publicUseKo: "모델 메모, 설정, 프롬프트, 실패 수정법을 프로젝트와 함께 보관하는 데 유용합니다.",
    },
    {
      id: "character-consistency-tool",
      name: "Character Consistency Tool",
      nameKo: "캐릭터 일관성 도구",
      workflow: "Production",
      workflowKo: "제작",
      status: "ready",
      link: "../character-consistency-tool/index.html",
      outputFolder: "../character-consistency-tool",
      value: "Character bible for face, hair, outfit, silhouette, reference notes, prompts, and scene consistency checks.",
      valueKo: "얼굴, 헤어, 의상, 실루엣, 기준 이미지, 프롬프트, 장면별 일관성 체크를 캐릭터 바이블로 정리합니다.",
      publicUse: "Useful for keeping faces, outfits, reference notes, prompts, and scene consistency checks together.",
      publicUseKo: "얼굴, 의상, 기준 메모, 프롬프트, 장면별 일관성 체크를 함께 관리하는 데 유용합니다.",
    },
  ];

  const plannedModules = [];

  const launchpadOrder = [
    "template-library",
    "script-generator",
    "creator-prompt-board",
    "comfyui-workflow-manager",
    "character-consistency-tool",
    "ai-shot-planner",
    "thumbnail-idea-board",
    "youtube-calendar",
    "creator-asset-manager",
    "api-cost-tracker",
  ];

  const githubChecklist = [
    { en: "Confirm each module opens from its local index.html.", ko: "각 모듈이 로컬 index.html에서 정상적으로 열리는지 확인합니다." },
    { en: "Review README and usage docs for public wording.", ko: "README와 사용 문서의 공개용 문구를 확인합니다." },
    { en: "Remove private local paths from screenshots or demo exports.", ko: "스크린샷이나 데모 export에 개인 로컬 경로가 보이지 않게 정리합니다." },
    { en: "Keep privacy and security notes visible before sharing.", ko: "공유 전 개인정보와 보안 안내가 잘 보이는지 확인합니다." },
    { en: "Prepare screenshots or a short demo video for the dashboard and each module.", ko: "대시보드와 각 모듈의 스크린샷 또는 짧은 데모 영상을 준비합니다." },
  ];

  const roadmap = [
    {
      phase: "Phase 2",
      phaseKo: "2-1단계",
      title: "Cross-module exports",
      titleKo: "모듈끼리 자료 주고받기",
      detail: "Move prompts, shot plans, calendar entries, thumbnails, and assets between tools with shared JSON formats.",
      detailKo: "프롬프트, 샷 플랜, 업로드 일정, 썸네일 아이디어, 자산 정보를 저장해 두고 다른 도구에서도 불러올 수 있게 합니다.",
    },
    {
      phase: "Phase 2",
      phaseKo: "2-2단계",
      title: "Unified project profile",
      titleKo: "프로젝트 정보 한곳에 모으기",
      detail: "Add one local project profile so every module can reference the same channel, campaign, and client data.",
      detailKo: "채널명, 캠페인명, 클라이언트 정보처럼 여러 도구에서 반복해서 쓰는 정보를 한곳에 저장합니다.",
    },
    {
      phase: "Phase 3",
      phaseKo: "3단계",
      title: "Optional automation adapters",
      titleKo: "자동화 연결 준비",
      detail: "Stabilize local import/export flows before external service integrations are added.",
      detailKo: "외부 서비스와 연결하기 전에, 먼저 로컬에서 자료를 가져오고 내보내는 흐름을 안정적으로 정리합니다.",
    },
  ];

  const architectureNotes = [
    { en: "Runs as static local files from the outputs folder.", ko: "outputs 폴더 안의 정적 로컬 파일로 실행합니다." },
    { en: "No deployment, authentication, server process, upload, or paid API call is required.", ko: "배포, 로그인, 서버 프로세스, 업로드, 유료 API 호출이 필요 없습니다." },
    { en: "Dashboard state is declared in state.js; user search input is handled as text only.", ko: "대시보드 상태는 state.js에 선언되어 있고, 검색 입력은 텍스트로만 처리합니다." },
    { en: "Module links point to sibling folders inside outputs.", ko: "모듈 링크는 outputs 안의 각 하위 폴더를 가리킵니다." },
  ];

  const copy = {
    en: {
      heroEyebrow: "Local launcher - active creator bundle",
      heroTitle: "YMSTUDIO AI Creator OS Dashboard",
      heroCopy: "Turn a video idea into a clear production plan: topic, hook, prompt, shot plan, thumbnail, upload schedule, assets, and review notes.",
      promiseOrderTitle: "Turn ideas into order",
      promiseOrderCopy: "Choose the topic, audience, and goal first, then pick the next action.",
      promiseTemplateTitle: "Start repeat work from templates",
      promiseTemplateCopy: "Do not begin hooks, scripts, shots, or thumbnails from a blank screen.",
      promiseProjectTitle: "Keep assets in one project",
      promiseProjectCopy: "Every module reads the same project info and can be backed up as JSON.",
      quickstartStep1: "Step 1",
      quickstartStep2: "Step 2",
      quickstartStep3: "Step 3",
      quickstartSampleTitle: "Start with a sample project",
      quickstartSampleCopy: "If you are not sure what to write, fill the sample project and replace it with your own topic.",
      quickstartSampleButton: "Start from sample project",
      quickstartTemplateTitle: "Choose a template",
      quickstartTemplateCopy: "Open the first module, Template Library, from the launchpad below.",
      quickstartScriptTitle: "Make the first script",
      quickstartScriptCopy: "Open the second module, Script Generator, from the launchpad below.",
      outputPreviewEyebrow: "Output example",
      outputPreviewTitle: "Following this flow leaves a complete work bundle for one video.",
      outputPreviewItem1: "Short-form or long-form script draft",
      outputPreviewItem2: "Shot plan and thumbnail candidates",
      outputPreviewItem3: "Upload schedule and asset notes",
      outputPreviewItem4: "AI/API cost records",
      projectTitle: "Start a new video project",
      projectNote: "This information becomes the current project banner in other modules.",
      fieldChannelName: "Channel name",
      fieldVideoTopic: "Video topic",
      fieldTargetAudience: "Target audience",
      fieldVideoGoal: "Video goal",
      fieldPlatform: "Upload platform",
      fieldTone: "Tone",
      fieldAiTools: "AI tools",
      fieldFolderName: "Project folder name",
      placeholderChannelName: "Example: YMSTUDIO",
      placeholderVideoTopic: "Example: AI video production workflow",
      placeholderTargetAudience: "Example: beginner video creators",
      placeholderVideoGoal: "Example: introduce a template-based production flow",
      placeholderPlatform: "Example: YouTube, Shorts, Instagram",
      placeholderTone: "Example: clear, practical, calm",
      placeholderAiTools: "Example: Claude, ChatGPT, ComfyUI",
      placeholderFolderName: "Example: 20260519-creator-workflow",
      additionalProjectInfo: "Additional project info",
      saveProject: "Save project",
      refillSample: "Refill sample",
      exportJson: "Export JSON",
      importJson: "Import JSON",
      workflowSummaryTitle: "View guided steps",
      hardwareSummaryEyebrow: "Optional setup",
      hardwareSummaryTitle: "Check my work environment",
      hardwareSummaryCopy: "Open only when you need PC, LLM, or ComfyUI recommendations",
      hardwareTitle: "Check my work environment",
      hardwareNote: "Split recommendations across local LLMs, paid web/API tools, and ComfyUI so you can start even on a low-spec PC.",
      browserInfoTitle: "Information the browser can check",
      detectHardware: "Check environment",
      notChecked: "Not checked",
      browserSecurityNote: "Browser security may hide exact VRAM, total RAM, and model names.",
      setupRecommendationTitle: "Recommendation for my performance level",
      performanceTierLabel: "Work environment",
      performanceCloud: "Low-spec or laptop: paid web/API first",
      performanceBalanced: "Mid-spec: small local models plus paid support",
      performanceLocal: "High-end GPU: local LLM/ComfyUI first",
      performanceManual: "Not sure: safe default recommendation",
      showRecommendation: "Show recommendation",
      recommendationWaiting: "Waiting for recommendation",
      recommendationWaitingCopy: "Use Check environment or Show recommendation to see model, context, token speed, and ComfyUI startup guidance.",
      opsSummaryEyebrow: "Status check",
      opsSummaryTitle: "Today's work status",
      opsSummaryCopy: "Check save, backup, and next action",
      opsTitle: "Today's work status",
      opsNote: "Read the saved project and local module data to show next work, backup, and status checks.",
      progressSummaryEyebrow: "Progress",
      progressSummaryTitle: "Project progress",
      progressSummaryCopy: "See whether each module has saved data",
      progressTitle: "Project progress",
      languageKo: "Korean",
      languageLabel: "Language",
      searchLabel: "Search modules",
      searchPlaceholder: "Search launchpad modules: thumbnail, production, assets, cost",
      workflowLabel: "Workflow area",
      localReady: "Local-ready module",
      launchpadEyebrow: "Launchpad",
      modulesTitle: "Completed modules",
      plannedEyebrow: "Coming soon",
      plannedTitle: "Planned modules",
      comingSoon: "Coming soon",
      emptyState: "No modules match the current filter.",
      summarySuffix: " modules ready for local use",
      finalVerified: "Ready",
      openModule: "Open module",
      publicNotesEyebrow: "Public scope",
      publicNotesTitle: "Local-first MVP",
      publicNotesCopy1: "The bundle is a static browser workspace for prompts, shot planning, cost tracking, publishing calendars, thumbnail ideas, and asset notes.",
      publicNotesCopy2: "It avoids login, backend storage, upload automation, account linking, and paid API calls in this public MVP.",
      publishingEyebrow: "Publishing",
      githubTitle: "GitHub checklist",
      architectureEyebrow: "Architecture",
      architectureTitle: "Local-only note",
      roadmapEyebrow: "Roadmap",
      roadmapTitle: "Next phase",
      allWorkflows: "All",
      orderSuffix: "step",
      recommended: "Recommended",
      noSavedProjectTitle: "No saved project",
      noSavedProjectStatus: "No project saved yet.",
      currentProjectPrefix: "Current project:",
      fieldsEnteredSuffix: "fields entered",
      savedSuffix: "items saved",
      noneYet: "None yet",
      projectMissingPrefix: "required fields are empty. Fill in channel, topic, audience, and goal first.",
      projectDataPrefix: "has work data in",
      projectDataSuffix: "modules.",
      noProjectTitle: "No project",
      backupHasDataSuffix: "data exists. Back up important work with Export JSON in each module.",
      noBackupData: "No module data to back up yet. Save a project, then start with templates or scripts.",
      opsProject: "Project",
      opsNextFocus: "Next focus",
      opsBackup: "Backup reminder",
      opsLocalStatus: "Local status",
      checkProject: "Check project",
      allStartedDetail: "The basic flow has started. Strengthen the calendar and review notes next.",
      moduleEmptySuffix: "is still empty.",
      openSuffix: "Open",
      moduleSavedSuffix: "modules saved",
      backupWaiting: "Backup waiting",
      exportProjectJson: "Export project JSON",
      safeMode: "Safe mode",
      staticFileRun: "Static file run",
      localStorageUse: "Local storage",
      noLogin: "No login",
      noExternalApiCall: "No external API calls",
      publicChecklist: "Public checklist",
      webglUnavailable: "WebGL info unavailable",
      gpuNamePrivate: "GPU name private",
      browserUnavailable: "Unavailable in browser",
      logicalThreads: "logical threads",
      memoryEstimatePrefix: "Estimated at least",
      memoryEstimateSuffix: "GB",
      importProjectError: "Could not read the project JSON.",
      confirmSampleOverwrite: "Replace the current project with the sample project?",
      confirmImportOverwrite: "Replace the current project with the imported JSON?",
    },
    ko: {
      heroEyebrow: "로컬 런처 - 크리에이터 번들 확장 중",
      heroTitle: "YMSTUDIO AI Creator OS 대시보드",
      heroCopy: "영상 아이디어를 주제, 훅, 프롬프트, 샷 플랜, 썸네일, 업로드 일정, 자산, 리뷰 메모로 바꾸는 로컬 작업대입니다.",
      promiseOrderTitle: "아이디어를 작업 순서로",
      promiseOrderCopy: "주제, 타깃, 목적을 먼저 정하고 다음 행동을 고릅니다.",
      promiseTemplateTitle: "반복 작업을 템플릿으로",
      promiseTemplateCopy: "훅, 대본, 샷, 썸네일을 빈 화면에서 시작하지 않습니다.",
      promiseProjectTitle: "자료를 한 프로젝트로",
      promiseProjectCopy: "모듈마다 같은 프로젝트 정보를 보고 JSON으로 백업합니다.",
      quickstartStep1: "1단계",
      quickstartStep2: "2단계",
      quickstartStep3: "3단계",
      quickstartSampleTitle: "샘플 프로젝트로 시작",
      quickstartSampleCopy: "무엇을 적어야 할지 모르겠다면 샘플 프로젝트를 채운 뒤 내 주제로 바꿉니다.",
      quickstartSampleButton: "샘플 프로젝트로 바로 시작",
      quickstartTemplateTitle: "템플릿 고르기",
      quickstartTemplateCopy: "아래 런치패드에서 1순서 템플릿 라이브러리를 엽니다.",
      quickstartScriptTitle: "첫 대본 만들기",
      quickstartScriptCopy: "아래 런치패드에서 2순서 스크립트 생성기를 엽니다.",
      outputPreviewEyebrow: "결과 예시",
      outputPreviewTitle: "이 흐름을 따라가면 영상 1개에 필요한 작업 묶음이 남습니다.",
      outputPreviewItem1: "쇼츠/롱폼 대본 초안",
      outputPreviewItem2: "샷 플랜과 썸네일 후보",
      outputPreviewItem3: "업로드 일정과 자산 메모",
      outputPreviewItem4: "AI/API 비용 기록",
      projectTitle: "새 영상 프로젝트 시작",
      projectNote: "이 정보가 다른 모듈의 현재 프로젝트 배너로 이어집니다.",
      fieldChannelName: "채널명",
      fieldVideoTopic: "영상 주제",
      fieldTargetAudience: "타깃 시청자",
      fieldVideoGoal: "영상 목적",
      fieldPlatform: "업로드 플랫폼",
      fieldTone: "톤앤매너",
      fieldAiTools: "사용할 AI 도구",
      fieldFolderName: "프로젝트 폴더명",
      placeholderChannelName: "예: YMSTUDIO",
      placeholderVideoTopic: "예: AI 영상 제작 워크플로우",
      placeholderTargetAudience: "예: 영상 제작 초보자",
      placeholderVideoGoal: "예: 템플릿 기반 제작 흐름 소개",
      placeholderPlatform: "예: YouTube, Shorts, Instagram",
      placeholderTone: "예: 쉽게, 실전형, 차분하게",
      placeholderAiTools: "예: Claude, ChatGPT, ComfyUI",
      placeholderFolderName: "예: 20260519-creator-workflow",
      additionalProjectInfo: "추가 프로젝트 정보",
      saveProject: "프로젝트 저장",
      refillSample: "샘플 다시 채우기",
      exportJson: "JSON 내보내기",
      importJson: "JSON 가져오기",
      workflowSummaryTitle: "따라 하기 순서 보기",
      hardwareSummaryEyebrow: "선택 설정",
      hardwareSummaryTitle: "내 작업 환경 체크",
      hardwareSummaryCopy: "PC 성능/LLM/ComfyUI 추천이 필요할 때만 펼치기",
      hardwareTitle: "내 작업 환경 체크",
      hardwareNote: "PC 성능이 낮아도 시작할 수 있게 로컬 LLM, 유료 웹/API, ComfyUI 권장 흐름을 나눠서 안내합니다.",
      browserInfoTitle: "브라우저가 확인한 정보",
      detectHardware: "내 환경 확인",
      notChecked: "확인 전",
      browserSecurityNote: "브라우저 보안상 실제 VRAM, 전체 RAM, 정확한 모델명은 일부만 표시될 수 있습니다.",
      setupRecommendationTitle: "내 성능에 맞는 추천",
      performanceTierLabel: "작업 환경",
      performanceCloud: "저사양 또는 노트북: 유료 웹/API 우선",
      performanceBalanced: "중간 사양: 로컬 소형 + 유료 보조",
      performanceLocal: "고사양 GPU: 로컬 LLM/ComfyUI 우선",
      performanceManual: "모르겠음: 안전 설정 추천",
      showRecommendation: "추천 보기",
      recommendationWaiting: "추천 대기 중",
      recommendationWaitingCopy: "내 환경 확인 또는 추천 보기를 누르면 모델, 컨텍스트, 토큰 속도, ComfyUI 시작 설정을 보여줍니다.",
      opsSummaryEyebrow: "상태 점검",
      opsSummaryTitle: "오늘의 작업 상태",
      opsSummaryCopy: "저장/백업/다음 작업 확인",
      opsTitle: "오늘의 작업 상태",
      opsNote: "저장된 프로젝트와 각 모듈의 로컬 데이터를 읽어서 다음 작업, 백업, 상태 점검을 보여줍니다.",
      progressSummaryEyebrow: "진행 현황",
      progressSummaryTitle: "프로젝트 진행률",
      progressSummaryCopy: "모듈별 저장 데이터가 쌓였는지 보기",
      progressTitle: "프로젝트 진행률",
      languageKo: "한국어",
      languageLabel: "언어",
      searchLabel: "모듈 검색",
      searchPlaceholder: "런치패드 모듈 검색: 썸네일, 제작, 자산, 비용",
      workflowLabel: "워크플로우 영역",
      localReady: "로컬 사용 준비 완료",
      launchpadEyebrow: "런치패드",
      modulesTitle: "완료된 모듈",
      plannedEyebrow: "예정 모듈",
      plannedTitle: "다음에 붙일 모듈",
      comingSoon: "준비 중",
      emptyState: "현재 필터와 일치하는 모듈이 없습니다.",
      summarySuffix: "개 모듈이 로컬 사용 준비 완료",
      finalVerified: "사용 준비 완료",
      openModule: "모듈 열기",
      publicNotesEyebrow: "공개 범위",
      publicNotesTitle: "로컬 우선 MVP",
      publicNotesCopy1: "이 모듈 묶음은 프롬프트, 샷 기획, 비용 관리, 발행 캘린더, 썸네일 아이디어, 자산 메모를 위한 정적 브라우저 작업 공간입니다.",
      publicNotesCopy2: "공개 MVP에서는 로그인, 백엔드 저장, 업로드 자동화, 계정 연결, 유료 API 호출을 사용하지 않습니다.",
      publishingEyebrow: "공개 준비",
      githubTitle: "GitHub 체크리스트",
      architectureEyebrow: "구조",
      architectureTitle: "로컬 사용 메모",
      roadmapEyebrow: "로드맵",
      roadmapTitle: "다음 단계",
      allWorkflows: "전체",
      orderSuffix: "순서",
      recommended: "추천",
      noSavedProjectTitle: "저장된 프로젝트 없음",
      noSavedProjectStatus: "아직 저장된 프로젝트가 없습니다.",
      currentProjectPrefix: "현재 프로젝트:",
      fieldsEnteredSuffix: "개 항목 입력됨",
      savedSuffix: "개 저장됨",
      noneYet: "아직 없음",
      projectMissingPrefix: "개가 비어 있습니다. 채널명, 주제, 타깃, 목적부터 채우세요.",
      projectDataPrefix: "기준으로",
      projectDataSuffix: "개 모듈에 작업 데이터가 있습니다.",
      noProjectTitle: "프로젝트 없음",
      backupHasDataSuffix: "데이터가 있습니다. 중요한 작업은 각 모듈의 Export JSON으로 백업하세요.",
      noBackupData: "아직 백업할 모듈 데이터가 없습니다. 프로젝트를 저장한 뒤 템플릿이나 대본부터 만들어보세요.",
      opsProject: "프로젝트",
      opsNextFocus: "다음 집중 작업",
      opsBackup: "백업 알림",
      opsLocalStatus: "로컬 상태",
      checkProject: "프로젝트 확인",
      allStartedDetail: "기본 흐름이 모두 시작되었습니다. 캘린더와 리뷰 메모를 보강하세요.",
      moduleEmptySuffix: "모듈이 아직 비어 있습니다.",
      openSuffix: "열기",
      moduleSavedSuffix: "개 모듈 저장됨",
      backupWaiting: "백업 대기",
      exportProjectJson: "프로젝트 JSON 내보내기",
      safeMode: "안전 모드",
      staticFileRun: "정적 파일 실행",
      localStorageUse: "로컬 저장소 사용",
      noLogin: "로그인 없음",
      noExternalApiCall: "외부 API 호출 없음",
      publicChecklist: "공개 체크리스트",
      webglUnavailable: "WebGL 정보 없음",
      gpuNamePrivate: "GPU 이름 비공개",
      browserUnavailable: "브라우저에서 확인 불가",
      logicalThreads: "논리 스레드",
      memoryEstimatePrefix: "약",
      memoryEstimateSuffix: "GB 이상으로 추정",
      importProjectError: "프로젝트 JSON을 읽을 수 없습니다.",
      confirmSampleOverwrite: "기존 프로젝트를 샘플 프로젝트로 바꿀까요?",
      confirmImportOverwrite: "기존 프로젝트를 가져온 JSON으로 바꿀까요?",
    },
  };

  function normalizeLanguage(language) {
    return language === "en" ? "en" : "ko";
  }

  function localizeModule(module, language) {
    const lang = normalizeLanguage(language);
    if (lang === "en") {
      return { ...module, displayName: module.name, displayWorkflow: module.workflow, displayValue: module.value, displayPublicUse: module.publicUse };
    }
    return {
      ...module,
      displayName: module.nameKo || module.name,
      displayWorkflow: module.workflowKo || module.workflow,
      displayValue: module.valueKo || module.value,
      displayPublicUse: module.publicUseKo || module.publicUse,
    };
  }

  function getCopy(language) {
    return copy[normalizeLanguage(language)];
  }

  function getWorkflowAreas(language) {
    const text = getCopy(language);
    return [{ value: "All", label: text.allWorkflows }].concat(
      [...new Set(modules.map((module) => module.workflow))].map((workflow) => {
        const matched = modules.find((module) => module.workflow === workflow);
        return { value: workflow, label: normalizeLanguage(language) === "ko" ? matched.workflowKo || workflow : workflow };
      })
    );
  }

  function filterModules(query, workflow, language) {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    const selectedWorkflow = workflow || "All";
    return modules.filter((module) => {
      const matchesWorkflow = selectedWorkflow === "All" || module.workflow === selectedWorkflow;
      const searchableText = [
        module.name,
        module.nameKo,
        module.workflow,
        module.workflowKo,
        module.value,
        module.valueKo,
        module.publicUse,
        module.publicUseKo,
      ].join(" ").toLowerCase();
      return matchesWorkflow && (!normalizedQuery || searchableText.includes(normalizedQuery));
    }).sort((a, b) => launchpadOrder.indexOf(a.id) - launchpadOrder.indexOf(b.id)).map((module) => localizeModule(module, language));
  }

  function getStatusSummary(items) {
    const source = items || modules;
    return source.reduce(
      (summary, module) => {
        summary.total += 1;
        if (module.status === "ready") summary.finalVerified += 1;
        return summary;
      },
      { total: 0, finalVerified: 0 }
    );
  }

  function getGithubChecklist() {
    return githubChecklist.map((item) => item.en);
  }

  function getLocalizedChecklist(language) {
    const lang = normalizeLanguage(language);
    return githubChecklist.map((item) => item[lang]);
  }

  function getLocalizedRoadmap(language) {
    const lang = normalizeLanguage(language);
    return roadmap.map((item) => lang === "en" ? item : { ...item, phase: item.phaseKo, title: item.titleKo, detail: item.detailKo });
  }

  function getLocalizedArchitectureNotes(language) {
    const lang = normalizeLanguage(language);
    return architectureNotes.map((item) => item[lang]);
  }

  function getLocalizedPlannedModules(language) {
    const lang = normalizeLanguage(language);
    if (lang === "en") return plannedModules.map((module) => ({ ...module }));
    return plannedModules.map((module) => ({
      ...module,
      name: module.nameKo || module.name,
      workflow: module.workflowKo || module.workflow,
      value: module.valueKo || module.value,
      reason: module.reasonKo || module.reason,
    }));
  }

  function getLaunchpadOrder() {
    return launchpadOrder.slice();
  }

  return {
    modules,
    plannedModules,
    githubChecklist,
    roadmap,
    architectureNotes,
    copy,
    getCopy,
    getWorkflowAreas,
    filterModules,
    getStatusSummary,
    getGithubChecklist,
    getLocalizedChecklist,
    getLocalizedRoadmap,
    getLocalizedArchitectureNotes,
    getLocalizedPlannedModules,
    getLaunchpadOrder,
  };
});

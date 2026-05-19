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
      businessUse: "Useful for prompt packs, reusable creator templates, and team workflow boards.",
      businessUseKo: "프롬프트 묶음, 크리에이터 템플릿, 팀 작업 보드로 확장하기 좋습니다.",
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
      businessUse: "Useful for video templates, production playbooks, and client-ready planning workflows.",
      businessUseKo: "영상 템플릿, 제작 플레이북, 클라이언트용 기획 워크플로우로 확장하기 좋습니다.",
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
      businessUse: "Useful for operator dashboards, agency reporting, and cost-control starter kits.",
      businessUseKo: "운영 대시보드, 에이전시 리포트, 비용 관리 스타터 키트로 확장하기 좋습니다.",
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
      businessUse: "Useful for channel calendars, launch planners, and repeatable publishing systems.",
      businessUseKo: "채널 캘린더, 론칭 플래너, 반복 가능한 발행 시스템으로 확장하기 좋습니다.",
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
      businessUse: "Useful for asset packs, license tracking, and reusable production archives.",
      businessUseKo: "자산 묶음, 라이선스 추적, 재사용 가능한 제작 아카이브로 확장하기 좋습니다.",
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
      businessUse: "Useful for thumbnail testing packs, creator content systems, and repeatable design briefs.",
      businessUseKo: "썸네일 테스트 묶음, 크리에이터 콘텐츠 시스템, 반복 가능한 디자인 브리프로 확장하기 좋습니다.",
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
      businessUse: "Useful before a server marketplace: test which templates people save, rate, copy, and import most.",
      businessUseKo: "서버 마켓 전 단계로 사람들이 어떤 템플릿을 저장, 별점, 복사, 가져오기 하는지 먼저 검증하기 좋습니다.",
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
      businessUse: "Useful for turning a saved Creator Project into a first script draft before prompt and shot planning.",
      businessUseKo: "저장된 Creator Project를 프롬프트와 샷 플랜 전에 바로 쓸 수 있는 첫 대본 초안으로 바꿀 때 유용합니다.",
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
      businessUse: "Useful for ComfyUI recipe packs, local setup guides, and creator workflow consulting.",
      businessUseKo: "ComfyUI 레시피 묶음, 로컬 셋업 가이드, 제작 워크플로우 컨설팅으로 확장하기 좋습니다.",
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
      businessUse: "Useful for character bible packs, AI video continuity templates, and client production guides.",
      businessUseKo: "캐릭터 바이블 묶음, AI 영상 일관성 템플릿, 클라이언트용 제작 가이드로 확장하기 좋습니다.",
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
      monetizationEyebrow: "Business use",
      monetizationTitle: "Bundle strategy",
      monetizationCopy1: "The bundle can be positioned as a local-first creator operations kit: prompts, shot planning, cost control, publishing calendars, thumbnail ideas, and asset governance.",
      monetizationCopy2: "Good next offers include creator templates, agency workflow packs, education products, and setup services for AI video production teams.",
      publishingEyebrow: "Publishing",
      githubTitle: "GitHub checklist",
      architectureEyebrow: "Architecture",
      architectureTitle: "Local-only note",
      roadmapEyebrow: "Roadmap",
      roadmapTitle: "Next phase",
      allWorkflows: "All",
    },
    ko: {
      heroEyebrow: "로컬 런처 - 크리에이터 번들 확장 중",
      heroTitle: "YMSTUDIO AI Creator OS 대시보드",
      heroCopy: "영상 아이디어를 주제, 훅, 프롬프트, 샷 플랜, 썸네일, 업로드 일정, 자산, 리뷰 메모로 바꾸는 로컬 작업대입니다.",
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
      monetizationEyebrow: "비즈니스 활용",
      monetizationTitle: "번들 전략",
      monetizationCopy1: "이 모듈 묶음은 프롬프트 시스템, 샷 기획, 비용 관리, 발행 캘린더, 썸네일 아이디어, 자산 관리를 포함한 로컬 우선 크리에이터 운영 번들로 사용할 수 있습니다.",
      monetizationCopy2: "다음 단계의 상품 아이디어는 크리에이터 템플릿, 에이전시 워크플로우 팩, 교육 상품, AI 영상 제작팀용 셋업 서비스입니다.",
      publishingEyebrow: "공개 준비",
      githubTitle: "GitHub 체크리스트",
      architectureEyebrow: "구조",
      architectureTitle: "로컬 사용 메모",
      roadmapEyebrow: "로드맵",
      roadmapTitle: "다음 단계",
      allWorkflows: "전체",
    },
  };

  function normalizeLanguage(language) {
    return language === "en" ? "en" : "ko";
  }

  function localizeModule(module, language) {
    const lang = normalizeLanguage(language);
    if (lang === "en") {
      return { ...module, displayName: module.name, displayWorkflow: module.workflow, displayValue: module.value, displayMonetization: module.businessUse };
    }
    return {
      ...module,
      displayName: module.nameKo || module.name,
      displayWorkflow: module.workflowKo || module.workflow,
      displayValue: module.valueKo || module.value,
      displayMonetization: module.businessUseKo || module.businessUse,
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
        module.businessUse,
        module.businessUseKo,
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
  };
});

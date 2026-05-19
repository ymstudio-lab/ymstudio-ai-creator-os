(function () {
  const state = window.CreatorOSState;

  const elements = {
    moduleGrid: document.querySelector("[data-module-grid]"),
    plannedGrid: document.querySelector("[data-planned-grid]"),
    search: document.querySelector("[data-search]"),
    workflow: document.querySelector("[data-workflow]"),
    summary: document.querySelector("[data-summary]"),
    emptyState: document.querySelector("[data-empty-state]"),
    language: document.querySelector("[data-language]"),
    projectFields: document.querySelectorAll("[data-project-field]"),
    saveProject: document.querySelector("[data-save-project]"),
    sampleProject: document.querySelector("[data-sample-project]"),
    sampleProjectShortcut: document.querySelector("[data-sample-project-shortcut]"),
    exportProject: document.querySelector("[data-export-project]"),
    importProject: document.querySelector("[data-import-project]"),
    importProjectFile: document.querySelector("[data-import-project-file]"),
    projectStatus: document.querySelector("[data-project-status]"),
    workflowSteps: document.querySelector("[data-workflow-steps]"),
    progressGrid: document.querySelector("[data-progress-grid]"),
    opsGrid: document.querySelector("[data-ops-grid]"),
    plannedSection: document.querySelector("[data-planned-section]"),
    detectHardware: document.querySelector("[data-detect-hardware]"),
    recommendSetup: document.querySelector("[data-recommend-setup]"),
    performanceTier: document.querySelector("[data-performance-tier]"),
    setupRecommendation: document.querySelector("[data-setup-recommendation]"),
    specCpu: document.querySelector("[data-spec-cpu]"),
    specMemory: document.querySelector("[data-spec-memory]"),
    specGpu: document.querySelector("[data-spec-gpu]"),
  };

  const LANGUAGE_KEY = "ymstudio.creatorOS.language";
  const PROJECT_KEY = "ymstudio.creatorProject.v1";
  const projectFields = ["channelName", "videoTopic", "targetAudience", "videoGoal", "platform", "tone", "aiTools", "folderName"];
  const workflowSteps = [
    { title: "1단계: 주제 입력", detail: "Creator Project에 채널, 주제, 타깃, 목적을 먼저 저장합니다.", href: "#", label: "현재 화면" },
    { title: "2단계: 훅 고르기", detail: "Template Library에서 일반 영상/AI 영상에 맞는 훅 템플릿을 고릅니다.", href: "../template-library/index.html", label: "템플릿 열기" },
    { title: "3단계: 프롬프트 저장", detail: "쓸 만한 프롬프트와 대본 구조를 Prompt Board에 저장합니다.", href: "../creator-prompt-board/index.html", label: "프롬프트 열기" },
    { title: "4단계: ComfyUI 레시피 선택", detail: "내 PC 성능에 맞는 모델, 해상도, steps, batch, 실패 수정법을 저장합니다.", href: "../comfyui-workflow-manager/index.html", label: "ComfyUI 열기" },
    { title: "5단계: 캐릭터 고정 규칙", detail: "같은 캐릭터가 필요한 영상은 얼굴, 헤어, 의상, 기준 이미지 메모를 먼저 고정합니다.", href: "../character-consistency-tool/index.html", label: "캐릭터 열기" },
    { title: "6단계: 샷 나누기", detail: "Shot Planner에서 장면, 컷, 생성 프롬프트, 촬영 메모를 나눕니다.", href: "../ai-shot-planner/index.html", label: "샷 플랜 열기" },
    { title: "7단계: 썸네일 후보 만들기", detail: "Thumbnail Idea Board에서 제목과 썸네일 방향을 비교합니다.", href: "../thumbnail-idea-board/index.html", label: "썸네일 열기" },
    { title: "8단계: 업로드 계획", detail: "YouTube Calendar에 일정과 업로드 후 리뷰 메모를 남깁니다.", href: "../youtube-calendar/index.html", label: "캘린더 열기" },
    { title: "9단계: 자산/비용 정리", detail: "Asset Manager와 Cost Tracker에 파일, 라이선스, 사용 비용을 기록합니다.", href: "../creator-asset-manager/index.html", label: "자산 열기" },
  ];
  const sampleProject = {
    channelName: "YMSTUDIO",
    videoTopic: "AI와 일반 영상 제작자가 함께 쓰는 제작 워크플로우",
    targetAudience: "영상 제작을 처음 시작하는 1인 크리에이터",
    videoGoal: "템플릿으로 기획부터 업로드까지 막히지 않게 돕기",
    platform: "YouTube Long, Shorts",
    tone: "쉽게, 실전형, 차분하게",
    aiTools: "Claude, ChatGPT, ComfyUI",
    folderName: "20260519-creator-workflow",
  };

  function seedSampleModules() {
    const now = new Date().toISOString();
    const setIfEmpty = (key, value) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, value);
    };
    setIfEmpty("ymstudio.templateLibrary.v1", JSON.stringify({
      ratings: { classic_video_hook_map: 5, script_hook_loop: 5, thumb_emotion_contrast: 5 },
      saved: ["classic_video_hook_map", "script_hook_loop", "thumb_emotion_contrast"],
    }));
    setIfEmpty("ymstudio.scriptGenerator.v1", JSON.stringify([
      {
        id: "sample_script_creator_workflow",
        title: "AI 영상 제작 워크플로우 소개",
        format: "YouTube Long",
        tone: "쉽고 차분하게",
        status: "draft",
        audience: "영상 제작 초보자",
        goal: "아이디어를 대본, 샷, 썸네일, 업로드 계획으로 바꾸는 흐름 소개",
        hook: "AI 영상 제작이 어려운 이유는 도구가 부족해서가 아니라 작업 순서가 흩어져 있기 때문입니다.",
        outline: "문제 제기 > Creator Project 입력 > 템플릿 선택 > 대본/샷/썸네일/캘린더 연결 > JSON 백업",
        scenes: [
          "빈 화면에서 시작하면 무엇부터 해야 할지 막히는 상황을 보여줍니다.",
          "Creator Project에 채널명, 주제, 타깃, 목적을 입력합니다.",
          "템플릿 라이브러리에서 첫 훅과 대본 구조를 고릅니다.",
          "스크립트 생성기에서 훅, 본문, CTA, 샷 분리 문장을 만듭니다.",
          "샷 플래너, 썸네일 보드, 캘린더, 자산 메모로 이어지는 흐름을 보여줍니다.",
        ],
        cta: "오늘 만들 영상 주제 하나를 Creator Project에 저장하고 첫 템플릿을 골라보세요.",
        notes: "대시보드 샘플 프로젝트에서 자동 생성된 대표 대본입니다.",
        favorite: true,
        createdAt: now,
        updatedAt: now,
      },
    ]));
    setIfEmpty("ymstudio.aiShotPlanner.v1", JSON.stringify({
      version: 1,
      project: { title: "AI 영상 제작 워크플로우 소개", goal: sampleProject.videoGoal, format: "YouTube Long", audience: sampleProject.targetAudience },
      scenes: [
        { id: "sample_scene_1", title: "문제 제기", summary: "도구는 많은데 순서가 없어 막히는 상황", location: "데스크 화면", order: 1 },
        { id: "sample_scene_2", title: "프로젝트 입력", summary: "채널명, 주제, 타깃, 목적 입력", location: "Creator OS 대시보드", order: 2 },
        { id: "sample_scene_3", title: "모듈 연결", summary: "템플릿에서 대본, 샷, 썸네일, 캘린더로 이동", location: "런치패드", order: 3 },
      ],
      shots: [
        { id: "sample_shot_1", sceneId: "sample_scene_1", shotNumber: "1.1", title: "막히는 시작 화면", description: "빈 문서와 흩어진 도구를 보여줍니다.", prompt: "creator desk, empty document, scattered AI tools, calm tutorial screen", tool: "Claude", model: "sample", status: "idea", duration: "5s", assetPaths: {}, continuity: {}, notes: "인트로용" },
        { id: "sample_shot_2", sceneId: "sample_scene_2", shotNumber: "2.1", title: "프로젝트 입력", description: "Creator Project 필드가 채워지는 화면", prompt: "dashboard form filled with Korean creator project fields", tool: "Claude", model: "sample", status: "idea", duration: "8s", assetPaths: {}, continuity: {}, notes: "화면 녹화" },
      ],
      updatedAt: now,
    }));
    setIfEmpty("ymstudio.thumbnailIdeaBoard.v1", JSON.stringify([
      {
        id: "sample_thumb_creator_workflow",
        title: "AI 영상 제작 순서 썸네일",
        format: "YouTube Long",
        status: "idea",
        emotion: "막힘에서 정리됨",
        layout: "왼쪽 복잡한 도구 / 오른쪽 정리된 대시보드",
        subject: "흩어진 AI 도구와 정리된 Creator OS 화면",
        overlayText: "순서가 답이다",
        palette: "짙은 초록, 밝은 배경, 민트 포인트",
        prompt: "YouTube thumbnail, messy AI tools on left, clean creator dashboard on right, Korean text area, high contrast, mobile readable",
        notes: "제목과 겹치지 않게 결과 느낌을 보여줍니다.",
        score: 5,
        favorite: true,
        createdAt: now,
        updatedAt: now,
      },
    ]));
    setIfEmpty("ymstudio.youtubeCalendar.v1", JSON.stringify({
      settings: { channel: "YMSTUDIO", month: now.slice(0, 7), weeklyTarget: 2 },
      items: [
        {
          id: "sample_calendar_creator_workflow",
          title: "AI 영상 제작 워크플로우 소개",
          format: "long-form",
          channel: "YMSTUDIO",
          niche: "AI creator workflow",
          uploadDate: now.slice(0, 10),
          status: "scripted",
          scriptOutline: "문제 제기 > 프로젝트 입력 > 템플릿 선택 > 대본/샷/썸네일/캘린더 연결",
          titleVariants: ["AI 영상 제작, 순서만 잡으면 쉬워집니다", "초보자를 위한 AI 영상 제작 워크플로우"],
          thumbnailPrompts: ["순서가 답이다", "도구보다 흐름"],
          tools: ["Creator OS", "Script Generator", "Thumbnail Board"],
          performanceNotes: "업로드 후 제목/썸네일 반응을 24시간 뒤 확인합니다.",
        },
      ],
    }));
    setIfEmpty("ymstudio.creatorAssetManager.v1", JSON.stringify({
      assets: [
        {
          title: "Creator OS 대시보드 스크린샷",
          type: "image",
          collection: "샘플 프로젝트",
          project: "AI 영상 제작 워크플로우 소개",
          sourceTool: "Browser Screenshot",
          tags: ["dashboard", "tutorial", "sample"],
          filePath: "outputs/creator-os-dashboard/index.html",
          promptText: "대시보드 사용 흐름 설명용 화면",
          resultNotes: "튜토리얼 영상 B-roll로 사용",
          licenseNote: "직접 제작한 로컬 화면",
          status: "approved",
          createdDate: now.slice(0, 10),
        },
      ],
    }));
    setIfEmpty("ymstudio.apiCostTracker.v1", JSON.stringify({
      settings: { monthlyBudget: 100, monthlyCredits: 100, month: now.slice(0, 7) },
      entries: [
        {
          id: "sample_cost_creator_workflow",
          provider: "Claude",
          category: "CLI",
          project: "YMSTUDIO Creator OS",
          workflow: "샘플 프로젝트 기획",
          quantity: 1,
          unit: "session",
          unitCost: 0,
          creditUsed: 0,
          notes: "샘플 프로젝트용 비용 기록 예시",
          createdAt: now,
        },
      ],
    }));
  }

  const progressSources = [
    { key: PROJECT_KEY, label: "프로젝트", href: "#", read: (data) => projectFields.filter((field) => data && data[field]).length },
    { key: "ymstudio.templateLibrary.v1", label: "템플릿", href: "../template-library/index.html", read: (data) => data && Array.isArray(data.saved) ? data.saved.length : data && data.localState && Array.isArray(data.localState.saved) ? data.localState.saved.length : 0 },
    { key: "ymstudio.scriptGenerator.v1", label: "대본", href: "../script-generator/index.html", read: (data) => Array.isArray(data) ? data.length : 0 },
    { key: "ymstudio.comfyWorkflowManager.v1", label: "ComfyUI", href: "../comfyui-workflow-manager/index.html", read: (data) => Array.isArray(data) ? data.length : data && Array.isArray(data.workflows) ? data.workflows.length : 0 },
    { key: "ymstudio.characterConsistencyTool.v1", label: "캐릭터", href: "../character-consistency-tool/index.html", read: (data) => Array.isArray(data) ? data.length : data && Array.isArray(data.characters) ? data.characters.length : 0 },
    { key: "ymstudio.aiShotPlanner.v1", label: "샷 플랜", href: "../ai-shot-planner/index.html", read: (data) => data && Array.isArray(data.shots) ? data.shots.length : 0 },
    { key: "ymstudio.thumbnailIdeaBoard.v1", label: "썸네일", href: "../thumbnail-idea-board/index.html", read: (data) => Array.isArray(data) ? data.length : data && Array.isArray(data.ideas) ? data.ideas.length : 0 },
    { key: "ymstudio.youtubeCalendar.v1", label: "캘린더", href: "../youtube-calendar/index.html", read: (data) => data && Array.isArray(data.items) ? data.items.length : 0 },
    { key: "ymstudio.creatorAssetManager.v1", label: "자산", href: "../creator-asset-manager/index.html", read: (data) => data && Array.isArray(data.assets) ? data.assets.length : 0 },
  ];

  const requiredProjectFields = ["channelName", "videoTopic", "targetAudience", "videoGoal"];

  const setupRecommendations = {
    cloud: {
      title: "저사양/노트북 추천: 유료 웹/API 우선",
      lines: [
        "LLM: ChatGPT, Claude, Gemini, Kimi 같은 웹/API 모델로 대본과 프롬프트를 만들고 로컬은 저장/정리용으로 씁니다.",
        "로컬 모델: 필요하면 Gemma/Qwen/Llama 계열 2B-4B급만 짧은 메모 정리에 사용합니다.",
        "컨텍스트: 8K-32K부터 시작하고 긴 자료는 장면/섹션 단위로 나눕니다.",
        "속도 기대치: CPU 전용 환경에서는 2B급도 매우 느릴 수 있으니 품질 작업은 클라우드, 반복 정리는 로컬이 유리합니다.",
        "ComfyUI: 768px 이하, 낮은 step, batch 1, 클라우드 GPU 또는 RunComfy류 서비스 보조를 권장합니다.",
      ],
    },
    balanced: {
      title: "중간 사양 추천: 로컬 소형 + 유료 보조",
      lines: [
        "LLM: 로컬 4B-8B급은 초안/분류/태그에 쓰고, 최종 대본과 복잡한 판단은 유료 웹/API로 넘깁니다.",
        "컨텍스트: 16K-64K 범위에서 시작하고 프로젝트 JSON만 짧게 붙입니다.",
        "속도 기대치: 초안은 로컬로 빠르게 반복하고, 느려지면 컨텍스트와 출력 길이를 줄입니다.",
        "ComfyUI: 1024px 전후, batch 1, 이미지 먼저 검증 후 영상 워크플로우로 넘어갑니다.",
      ],
    },
    local: {
      title: "고사양 GPU 추천: 로컬 LLM/ComfyUI 우선",
      lines: [
        "LLM: 8B-14B급 이상 로컬 모델을 프롬프트 변형, 캐릭터 규칙, 자산 메모 자동화에 적극 사용합니다.",
        "유료 모델: 최종 기획 검토, 긴 리서치, 복잡한 전략 판단에만 보조로 씁니다.",
        "컨텍스트: 32K-128K까지 늘려도 되지만, 프로젝트별 JSON만 넣는 습관을 유지합니다.",
        "속도 기대치: 토큰 속도는 GPU/양자화/컨텍스트 길이에 따라 크게 달라지므로 긴 출력보다 짧은 반복이 안정적입니다.",
        "ComfyUI: 고해상도와 영상 워크플로우를 시도하되 VRAM 부족 시 해상도, step, batch를 먼저 낮춥니다.",
      ],
    },
    manual: {
      title: "모르겠을 때 안전 추천",
      lines: [
        "처음에는 유료 웹/API로 대본과 프롬프트를 만들고, Creator OS에는 결과와 JSON만 저장합니다.",
        "로컬 LLM은 2B-4B급부터 테스트하고, 느리면 모델 크기보다 컨텍스트와 출력 길이를 먼저 줄입니다.",
        "ComfyUI는 이미지 1장 생성 워크플로우부터 시작하고 영상/고해상도는 나중에 붙입니다.",
        "프로젝트마다 프롬프트, 샷, 썸네일, 자산을 나눠 저장하면 저사양 PC도 작업 흐름은 유지됩니다.",
      ],
    },
  };

  function getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) || "ko";
  }

  function createTextElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    element.textContent = text;
    return element;
  }

  function loadProject() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PROJECT_KEY) || "{}");
      return projectFields.reduce((project, field) => {
        project[field] = typeof parsed[field] === "string" ? parsed[field] : "";
        return project;
      }, {});
    } catch (error) {
      return projectFields.reduce((project, field) => {
        project[field] = "";
        return project;
      }, {});
    }
  }

  function projectFromFields() {
    const project = {};
    elements.projectFields.forEach((input) => {
      project[input.dataset.projectField] = input.value.trim();
    });
    return project;
  }

  function saveProject(project) {
    const payload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      ...project,
    };
    localStorage.setItem(PROJECT_KEY, JSON.stringify(payload));
    renderProject();
    if (elements.progressGrid) renderProgress();
    if (elements.opsGrid) renderOpsDashboard();
    return payload;
  }

  function hasSavedProject() {
    return projectFields.some((field) => loadProject()[field]);
  }

  function confirmProjectOverwrite(message) {
    return !hasSavedProject() || window.confirm(message);
  }

  function renderProject() {
    const project = loadProject();
    elements.projectFields.forEach((input) => {
      input.value = project[input.dataset.projectField] || "";
    });
    const filled = projectFields.filter((field) => project[field]).length;
    const title = project.videoTopic || "저장된 프로젝트 없음";
    elements.projectStatus.textContent = filled
      ? `현재 프로젝트: ${title} · ${filled}/${projectFields.length}개 항목 입력됨`
      : "아직 저장된 프로젝트가 없습니다.";
  }

  function renderWorkflowSteps() {
    elements.workflowSteps.replaceChildren(
      ...workflowSteps.map((step) => {
        const item = document.createElement("li");
        const title = createTextElement("strong", "", step.title);
        const detail = createTextElement("p", "", step.detail);
        const link = document.createElement("a");
        link.href = step.href;
        link.className = "workflow-link";
        link.textContent = step.label;
        item.append(title, detail, link);
        return item;
      })
    );
  }

  function readStorageJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function renderProgress() {
    const cards = getProgressItems().map((source) => {
      const card = document.createElement("a");
      card.href = source.href;
      card.className = "progress-card" + (source.count > 0 ? " is-started" : "");
      card.append(
        createTextElement("strong", "", source.label),
        createTextElement("span", "", source.count > 0 ? `${source.count}개 저장됨` : "아직 없음")
      );
      return card;
    });
    elements.progressGrid.replaceChildren(...cards);
  }

  function getProgressItems() {
    return progressSources.map((source) => ({
      ...source,
      count: source.read(readStorageJson(source.key)),
    }));
  }

  function makeOpsCard(title, status, detail, action) {
    const card = document.createElement("article");
    card.className = "ops-card";
    card.append(createTextElement("span", "ops-label", title), createTextElement("strong", "", status), createTextElement("p", "", detail));
    if (action) {
      if (action.exportProject) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ops-link";
        button.setAttribute("data-ops-export-project", "");
        button.textContent = action.label;
        card.appendChild(button);
      } else {
        const link = document.createElement("a");
        link.className = "ops-link";
        link.href = action.href;
        link.textContent = action.label;
        card.appendChild(link);
      }
    }
    return card;
  }

  function renderOpsDashboard() {
    const project = loadProject();
    const missingProjectFields = requiredProjectFields.filter((field) => !project[field]);
    const progressItems = getProgressItems();
    const moduleItems = progressItems.filter((item) => item.key !== PROJECT_KEY);
    const startedModules = moduleItems.filter((item) => item.count > 0);
    const nextItem = moduleItems.find((item) => item.count === 0) || moduleItems[moduleItems.length - 1];
    const projectTitle = project.videoTopic || project.channelName || "프로젝트 없음";
    const projectDetail = missingProjectFields.length
      ? `필수 항목 ${missingProjectFields.length}개가 비어 있습니다. 채널명, 주제, 타깃, 목적부터 채우세요.`
      : `${projectTitle} 기준으로 ${startedModules.length}/${moduleItems.length}개 모듈에 작업 데이터가 있습니다.`;
    const backupDetail = startedModules.length
      ? `${startedModules.map((item) => item.label).join(", ")} 데이터가 있습니다. 중요한 작업은 각 모듈의 Export JSON으로 백업하세요.`
      : "아직 백업할 모듈 데이터가 없습니다. 프로젝트를 저장한 뒤 템플릿이나 대본부터 만들어보세요.";
    const healthDetail = [
      "정적 파일 실행",
      "로컬 저장소 사용",
      "로그인 없음",
      "외부 API 호출 없음",
    ].join(" · ");
    elements.opsGrid.replaceChildren(
      makeOpsCard("프로젝트", projectTitle, projectDetail, { href: "#", label: "프로젝트 확인" }),
      makeOpsCard("다음 집중 작업", nextItem.label, nextItem.count > 0 ? "기본 흐름이 모두 시작되었습니다. 캘린더와 리뷰 메모를 보강하세요." : `${nextItem.label} 모듈이 아직 비어 있습니다.`, { href: nextItem.href, label: `${nextItem.label} 열기` }),
      makeOpsCard("백업 알림", startedModules.length ? `${startedModules.length}개 모듈 저장됨` : "백업 대기", backupDetail, { exportProject: true, label: "프로젝트 JSON 내보내기" }),
      makeOpsCard("로컬 상태", "안전 모드", healthDetail, { href: "../../PUBLISHING_CHECKLIST.md", label: "공개 체크리스트" })
    );
  }

  function getWebGlRenderer() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return "WebGL 정보 없음";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "GPU 이름 비공개";
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "GPU 이름 비공개";
  }

  function detectHardware() {
    const threads = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} 논리 스레드` : "브라우저에서 확인 불가";
    const memory = navigator.deviceMemory ? `약 ${navigator.deviceMemory}GB 이상으로 추정` : "브라우저에서 확인 불가";
    elements.specCpu.textContent = threads;
    elements.specMemory.textContent = memory;
    elements.specGpu.textContent = getWebGlRenderer();
  }

  function renderSetupRecommendation() {
    const selected = setupRecommendations[elements.performanceTier.value] || setupRecommendations.manual;
    const title = createTextElement("strong", "", selected.title);
    const list = document.createElement("ul");
    selected.lines.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      list.appendChild(item);
    });
    elements.setupRecommendation.replaceChildren(title, list);
  }

  function downloadProject() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      schema: PROJECT_KEY,
      project: loadProject(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "creator-project.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importProjectFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        const parsed = JSON.parse(reader.result);
        const source = parsed.project || parsed;
        const project = projectFields.reduce((next, field) => {
          next[field] = typeof source[field] === "string" ? source[field] : "";
          return next;
        }, {});
        saveProject(project);
      } catch (error) {
        elements.projectStatus.textContent = "프로젝트 JSON을 읽을 수 없습니다.";
      } finally {
        elements.importProjectFile.value = "";
      }
    });
    reader.readAsText(file);
  }

  function renderWorkflowOptions() {
    elements.workflow.replaceChildren();
    state.getWorkflowAreas(getLanguage()).forEach((area) => {
      const option = document.createElement("option");
      option.value = area.value;
      option.textContent = area.label;
      elements.workflow.appendChild(option);
    });
  }

  function renderStaticCopy() {
    const text = state.getCopy(getLanguage());
    document.documentElement.lang = getLanguage();
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = text[node.dataset.i18n] || "";
    });
    elements.search.placeholder = text.searchPlaceholder;
    elements.emptyState.textContent = text.emptyState;
  }

  function renderSummary() {
    const summary = state.getStatusSummary();
    const text = state.getCopy(getLanguage());
    elements.summary.replaceChildren(
      createTextElement("strong", "", `${summary.finalVerified}/${summary.total}`),
      document.createTextNode(text.summarySuffix)
    );
  }

  function renderModules(items) {
    const cards = items.map((module) => {
      const card = document.createElement("article");
      card.className = "module-card";
      card.setAttribute("data-module-card", module.id);
      const order = state.getLaunchpadOrder().indexOf(module.id) + 1;

      const topLine = document.createElement("div");
      topLine.className = "module-topline";
      topLine.append(
        createTextElement("span", "order-pill", order ? `${order}순서` : "추천"),
        createTextElement("span", "workflow-pill", module.displayWorkflow || module.workflow)
      );

      const title = createTextElement("h3", "", module.displayName);
      const value = createTextElement("p", "module-value", module.displayValue);
      const queue = createTextElement("p", "queue-line", state.getCopy(getLanguage()).localReady);
      const money = createTextElement("p", "module-money", module.displayMonetization);

      const link = document.createElement("a");
      link.className = "launch-link";
      link.href = module.link;
      link.textContent = state.getCopy(getLanguage()).openModule;
      link.setAttribute("aria-label", `${state.getCopy(getLanguage()).openModule}: ${module.displayName}`);

      card.append(topLine, title, value, queue, money, link);
      return card;
    });

    elements.moduleGrid.replaceChildren(...cards);
    elements.emptyState.hidden = items.length > 0;
  }

  function renderPlannedModules() {
    const plannedModules = state.getLocalizedPlannedModules(getLanguage());
    if (elements.plannedSection) {
      elements.plannedSection.hidden = plannedModules.length === 0;
    }
    const cards = plannedModules.map((module) => {
      const card = document.createElement("article");
      card.className = "planned-card";

      const topLine = document.createElement("div");
      topLine.className = "module-topline";
      topLine.append(
        createTextElement("span", "workflow-pill", module.displayWorkflow || module.workflow),
        createTextElement("span", "coming-pill", state.getCopy(getLanguage()).comingSoon)
      );

      const title = createTextElement("h3", "", module.name);
      const value = createTextElement("p", "module-value", module.value);
      const reason = createTextElement("p", "module-money", module.reason);

      card.append(topLine, title, value, reason);
      return card;
    });

    elements.plannedGrid.replaceChildren(...cards);
  }

  function applyFilters() {
    const items = state.filterModules(elements.search.value, elements.workflow.value, getLanguage());
    renderModules(items);
  }

  function renderAll() {
    const selectedWorkflow = elements.workflow.value || "All";
    elements.language.value = getLanguage();
    renderStaticCopy();
    renderWorkflowOptions();
    elements.workflow.value = selectedWorkflow;
    renderSummary();
    renderPlannedModules();
    renderProject();
    renderWorkflowSteps();
    renderProgress();
    renderOpsDashboard();
    applyFilters();
  }

  function init() {
    renderAll();

    elements.search.addEventListener("input", applyFilters);
    elements.workflow.addEventListener("change", applyFilters);
    elements.language.addEventListener("change", () => {
      localStorage.setItem(LANGUAGE_KEY, elements.language.value);
      renderAll();
    });
    elements.saveProject.addEventListener("click", () => saveProject(projectFromFields()));
    elements.sampleProject.addEventListener("click", () => {
      if (confirmProjectOverwrite("기존 프로젝트를 샘플 프로젝트로 바꿀까요?")) {
        saveProject(sampleProject);
        seedSampleModules();
        renderProgress();
        renderOpsDashboard();
      }
    });
    if (elements.sampleProjectShortcut) {
      elements.sampleProjectShortcut.addEventListener("click", () => {
        if (confirmProjectOverwrite("기존 프로젝트를 샘플 프로젝트로 바꿀까요?")) {
          saveProject(sampleProject);
          seedSampleModules();
          renderProgress();
          renderOpsDashboard();
        }
      });
    }
    elements.exportProject.addEventListener("click", downloadProject);
    elements.importProject.addEventListener("click", () => {
      if (confirmProjectOverwrite("기존 프로젝트를 가져온 JSON으로 바꿀까요?")) elements.importProjectFile.click();
    });
    elements.importProjectFile.addEventListener("change", () => importProjectFile(elements.importProjectFile.files[0]));
    elements.opsGrid.addEventListener("click", (event) => {
      if (event.target.closest("[data-ops-export-project]")) downloadProject();
    });
    elements.detectHardware.addEventListener("click", detectHardware);
    elements.recommendSetup.addEventListener("click", renderSetupRecommendation);
    elements.performanceTier.addEventListener("change", renderSetupRecommendation);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

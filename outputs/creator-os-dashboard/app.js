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
    exportProject: document.querySelector("[data-export-project]"),
    importProject: document.querySelector("[data-import-project]"),
    importProjectFile: document.querySelector("[data-import-project-file]"),
    projectStatus: document.querySelector("[data-project-status]"),
    workflowSteps: document.querySelector("[data-workflow-steps]"),
  };

  const LANGUAGE_KEY = "ymstudio.creatorOS.language";
  const PROJECT_KEY = "ymstudio.creatorProject.v1";
  const projectFields = ["channelName", "videoTopic", "targetAudience", "videoGoal", "platform", "tone", "aiTools", "folderName"];
  const workflowSteps = [
    { title: "1단계: 주제 입력", detail: "Creator Project에 채널, 주제, 타깃, 목적을 먼저 저장합니다.", href: "#", label: "현재 화면" },
    { title: "2단계: 훅 고르기", detail: "Template Library에서 일반 영상/AI 영상에 맞는 훅 템플릿을 고릅니다.", href: "../template-library/index.html", label: "템플릿 열기" },
    { title: "3단계: 프롬프트 저장", detail: "쓸 만한 프롬프트와 대본 구조를 Prompt Board에 저장합니다.", href: "../creator-prompt-board/index.html", label: "프롬프트 열기" },
    { title: "4단계: 샷 나누기", detail: "Shot Planner에서 장면, 컷, 생성 프롬프트, 촬영 메모를 나눕니다.", href: "../ai-shot-planner/index.html", label: "샷 플랜 열기" },
    { title: "5단계: 썸네일 후보 만들기", detail: "Thumbnail Idea Board에서 제목과 썸네일 방향을 비교합니다.", href: "../thumbnail-idea-board/index.html", label: "썸네일 열기" },
    { title: "6단계: 업로드 계획", detail: "YouTube Calendar에 일정과 업로드 후 리뷰 메모를 남깁니다.", href: "../youtube-calendar/index.html", label: "캘린더 열기" },
    { title: "7단계: 자산/비용 정리", detail: "Asset Manager와 Cost Tracker에 파일, 라이선스, 사용 비용을 기록합니다.", href: "../creator-asset-manager/index.html", label: "자산 열기" },
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

      const topLine = document.createElement("div");
      topLine.className = "module-topline";
      topLine.append(
        createTextElement("span", "workflow-pill", module.workflow),
        createTextElement("span", "status-pill", state.getCopy(getLanguage()).finalVerified)
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
    const cards = state.getLocalizedPlannedModules(getLanguage()).map((module) => {
      const card = document.createElement("article");
      card.className = "planned-card";

      const topLine = document.createElement("div");
      topLine.className = "module-topline";
      topLine.append(
        createTextElement("span", "workflow-pill", module.workflow),
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
      if (confirmProjectOverwrite("기존 프로젝트를 샘플 프로젝트로 바꿀까요?")) saveProject(sampleProject);
    });
    elements.exportProject.addEventListener("click", downloadProject);
    elements.importProject.addEventListener("click", () => {
      if (confirmProjectOverwrite("기존 프로젝트를 가져온 JSON으로 바꿀까요?")) elements.importProjectFile.click();
    });
    elements.importProjectFile.addEventListener("change", () => importProjectFile(elements.importProjectFile.files[0]));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

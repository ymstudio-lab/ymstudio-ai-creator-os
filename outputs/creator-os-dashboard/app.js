(function () {
  const state = window.CreatorOSState;

  const elements = {
    moduleGrid: document.querySelector("[data-module-grid]"),
    plannedGrid: document.querySelector("[data-planned-grid]"),
    search: document.querySelector("[data-search]"),
    workflow: document.querySelector("[data-workflow]"),
    summary: document.querySelector("[data-summary]"),
    checklist: document.querySelector("[data-checklist]"),
    roadmap: document.querySelector("[data-roadmap]"),
    architecture: document.querySelector("[data-architecture]"),
    emptyState: document.querySelector("[data-empty-state]"),
    language: document.querySelector("[data-language]"),
  };

  const LANGUAGE_KEY = "ymstudio.creatorOS.language";

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

  function renderChecklist() {
    elements.checklist.replaceChildren(
      ...state.getLocalizedChecklist(getLanguage()).map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      })
    );
  }

  function renderRoadmap() {
    elements.roadmap.replaceChildren(
      ...state.getLocalizedRoadmap(getLanguage()).map((item) => {
        const block = document.createElement("li");
        block.append(
          createTextElement("span", "roadmap-phase", item.phase),
          createTextElement("strong", "", item.title),
          createTextElement("p", "", item.detail)
        );
        return block;
      })
    );
  }

  function renderArchitecture() {
    elements.architecture.replaceChildren(
      ...state.getLocalizedArchitectureNotes(getLanguage()).map((note) => {
        const li = document.createElement("li");
        li.textContent = note;
        return li;
      })
    );
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
    renderChecklist();
    renderRoadmap();
    renderArchitecture();
    renderPlannedModules();
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

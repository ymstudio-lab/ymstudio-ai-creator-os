const State = window.TemplateLibraryState;

let localState = State.loadState(window.localStorage);
let selectedId = State.templates[0]?.id || null;

const els = {
  total: document.querySelector("[data-total]"),
  summary: document.querySelector("[data-summary]"),
  search: document.querySelector("#search"),
  categoryFilter: document.querySelector("#categoryFilter"),
  audienceFilter: document.querySelector("#audienceFilter"),
  moduleFilter: document.querySelector("#moduleFilter"),
  popularityFilter: document.querySelector("#popularityFilter"),
  savedOnly: document.querySelector("#savedOnly"),
  beginnerPicks: document.querySelector("[data-beginner-picks]"),
  count: document.querySelector("#count"),
  list: document.querySelector("#templateList"),
  empty: document.querySelector("#emptyState"),
  detailTitle: document.querySelector("#detailTitle"),
  detailCategory: document.querySelector("#detailCategory"),
  detailAudience: document.querySelector("#detailAudience"),
  detailModule: document.querySelector("#detailModule"),
  detailPopularity: document.querySelector("#detailPopularity"),
  detailReason: document.querySelector("#detailReason"),
  detailResult: document.querySelector("#detailResult"),
  detailContent: document.querySelector("#detailContent"),
  detailUsage: document.querySelector("#detailUsage"),
  rating: document.querySelector("#rating"),
  ratingValue: document.querySelector("#ratingValue"),
  saveTemplate: document.querySelector("#saveTemplate"),
  copyTemplate: document.querySelector("#copyTemplate"),
  importTemplate: document.querySelector("#importTemplate"),
  exportJson: document.querySelector("#exportJson"),
  importFile: document.querySelector("#importFile"),
  toast: document.querySelector("#toast"),
};

const beginnerPickIds = ["classic_video_hook_map", "script_hook_loop", "thumb_emotion_contrast"];
const beginnerPickReasons = {
  classic_video_hook_map: "영상 주제의 첫 문장과 시청 이유를 정합니다.",
  script_hook_loop: "훅을 고른 뒤 바로 첫 대본 구조를 만듭니다.",
  thumb_emotion_contrast: "제목과 함께 보일 첫 썸네일 방향을 정합니다.",
};

function clear(node) {
  node.replaceChildren();
}

function appendOption(select, value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label || value;
  select.appendChild(option);
}

function initOptions() {
  appendOption(els.categoryFilter, "", "모든 카테고리");
  State.categories.forEach((value) => appendOption(els.categoryFilter, value));
  appendOption(els.audienceFilter, "", "모든 대상");
  State.audiences.forEach((value) => appendOption(els.audienceFilter, value));
  appendOption(els.moduleFilter, "", "모든 연결");
  State.targetModules.forEach((value) => appendOption(els.moduleFilter, value));
}

function persist() {
  State.saveState(window.localStorage, localState);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
}

function currentFilters() {
  return {
    query: els.search.value,
    category: els.categoryFilter.value,
    audience: els.audienceFilter.value,
    targetModule: els.moduleFilter.value,
    minPopularity: els.popularityFilter.value,
    savedOnly: els.savedOnly.checked,
  };
}

function selectedTemplate() {
  return State.templates.find((template) => template.id === selectedId) || State.templates[0] || null;
}

function stars(value) {
  return "★".repeat(value) + "☆".repeat(5 - value);
}

function renderSummary() {
  const saved = localState.saved.length;
  const rated = Object.values(localState.ratings).filter((value) => Number(value) > 0).length;
  els.total.textContent = State.templates.length;
  els.summary.textContent = `saved ${saved} / rated ${rated}`;
}

function renderBeginnerPicks() {
  if (!els.beginnerPicks) return;
  clear(els.beginnerPicks);
  beginnerPickIds.forEach((id, index) => {
    const template = State.templates.find((item) => item.id === id);
    if (!template) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "beginner-pick";
    button.dataset.beginnerPick = template.id;

    const step = document.createElement("span");
    step.className = "pick-step";
    step.textContent = `${index + 1}단계`;

    const title = document.createElement("strong");
    title.textContent = template.titleKo;

    const reason = document.createElement("span");
    reason.className = "pick-reason";
    reason.textContent = beginnerPickReasons[template.id] || template.reasonKo;

    button.append(step, title, reason);
    els.beginnerPicks.appendChild(button);
  });
}

function renderList() {
  const filtered = State.filterTemplates(State.templates, currentFilters(), localState);
  const saved = new Set(localState.saved);
  els.count.textContent = `${filtered.length} templates`;
  els.empty.hidden = filtered.length > 0;

  if (!filtered.some((template) => template.id === selectedId)) {
    selectedId = filtered[0]?.id || State.templates[0]?.id || null;
  }

  clear(els.list);
  filtered.forEach((template) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-card" + (template.id === selectedId ? " is-active" : "");
    button.dataset.id = template.id;

    const top = document.createElement("span");
    top.className = "card-top";
    const title = document.createElement("strong");
    title.textContent = template.titleKo;
    const mark = document.createElement("span");
    mark.textContent = saved.has(template.id) ? "저장됨" : stars(template.popularity);
    top.append(title, mark);

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = `${template.category} / ${template.audience}`;

    const reason = document.createElement("span");
    reason.className = "reason";
    reason.textContent = template.reasonKo;

    button.append(top, meta, reason);
    els.list.appendChild(button);
  });

  renderDetail();
  renderSummary();
}

function renderDetail() {
  const template = selectedTemplate();
  const disabled = !template;
  [els.saveTemplate, els.copyTemplate, els.importTemplate, els.rating].forEach((node) => {
    node.disabled = disabled;
  });
  if (!template) return;

  els.detailTitle.textContent = template.titleKo;
  els.detailCategory.textContent = template.category;
  els.detailAudience.textContent = template.audience;
  els.detailModule.textContent = template.targetModule;
  els.detailPopularity.textContent = stars(template.popularity);
  els.detailReason.textContent = template.reasonKo;
  els.detailResult.textContent = template.resultKo || (template.payload && template.payload.resultNotes) || "지원 모듈로 가져가 바로 수정할 수 있는 작업 초안이 남습니다.";
  els.detailContent.textContent = template.content;
  els.detailUsage.textContent = template.usage;
  const rating = State.getTemplateRating(localState, template.id);
  els.rating.value = rating;
  els.ratingValue.textContent = `${rating}/5`;
  els.saveTemplate.textContent = localState.saved.includes(template.id) ? "저장 해제" : "저장";
  els.importTemplate.disabled = !["Creator Prompt Board", "Thumbnail Idea Board", "Script Generator"].includes(template.targetModule);
}

function updateRating() {
  const template = selectedTemplate();
  if (!template) return;
  localState = State.setTemplateRating(localState, template.id, els.rating.value);
  persist();
  els.ratingValue.textContent = `${State.getTemplateRating(localState, template.id)}/5`;
  renderSummary();
}

function toggleSaved() {
  const template = selectedTemplate();
  if (!template) return;
  if (localState.saved.includes(template.id)) {
    localState = State.removeSavedTemplate(localState, template.id);
    showToast("저장을 해제했습니다.");
  } else {
    localState = State.saveTemplate(localState, template.id);
    showToast("템플릿을 저장했습니다.");
  }
  persist();
  renderList();
}

async function copyTemplate() {
  const template = selectedTemplate();
  if (!template) return;
  try {
    await navigator.clipboard.writeText(State.formatTemplate(template));
    showToast("템플릿을 복사했습니다.");
  } catch (error) {
    showToast("브라우저가 복사를 막았습니다. 템플릿 내용을 직접 복사하세요.");
  }
}

function importTemplate() {
  const template = selectedTemplate();
  if (!template) return;
  const result = State.importToModule(window.localStorage, template);
  showToast(result.message);
}

function exportJson() {
  const blob = new Blob([JSON.stringify(State.exportLibrary(localState), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "template-library-state.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      localState = State.parseLibraryImport(reader.result);
      persist();
      renderList();
      showToast("라이브러리 상태를 가져왔습니다.");
    } catch (error) {
      showToast("가져오기 실패: 올바른 JSON인지 확인하세요.");
    }
  });
  reader.readAsText(file);
}

function bindEvents() {
  [els.search, els.categoryFilter, els.audienceFilter, els.moduleFilter, els.popularityFilter, els.savedOnly].forEach((node) => {
    node.addEventListener("input", renderList);
    node.addEventListener("change", renderList);
  });
  els.list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    selectedId = card.dataset.id;
    renderList();
  });
  if (els.beginnerPicks) {
    els.beginnerPicks.addEventListener("click", (event) => {
      const card = event.target.closest("[data-beginner-pick]");
      if (!card) return;
      selectedId = card.dataset.beginnerPick;
      els.search.value = "";
      els.categoryFilter.value = "";
      els.audienceFilter.value = "";
      els.moduleFilter.value = "";
      els.popularityFilter.value = "0";
      els.savedOnly.checked = false;
      renderList();
      document.querySelector(".detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  els.rating.addEventListener("input", updateRating);
  els.saveTemplate.addEventListener("click", toggleSaved);
  els.copyTemplate.addEventListener("click", copyTemplate);
  els.importTemplate.addEventListener("click", importTemplate);
  els.exportJson.addEventListener("click", exportJson);
  els.importFile.addEventListener("change", (event) => importJson(event.target.files[0]));
}

initOptions();
bindEvents();
renderBeginnerPicks();
renderList();

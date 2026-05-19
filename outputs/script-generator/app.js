const State = window.ScriptGeneratorState;

let scripts = State.loadScripts(window.localStorage);
let selectedId = scripts[0]?.id || null;

const els = {
  total: document.querySelector("[data-total]"),
  summary: document.querySelector("[data-summary]"),
  search: document.querySelector("#search"),
  formatFilter: document.querySelector("#formatFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  favoriteOnly: document.querySelector("#favoriteOnly"),
  briefTopic: document.querySelector("#briefTopic"),
  briefAudience: document.querySelector("#briefAudience"),
  briefLength: document.querySelector("#briefLength"),
  briefTone: document.querySelector("#briefTone"),
  buildFromBrief: document.querySelector("#buildFromBrief"),
  count: document.querySelector("#count"),
  list: document.querySelector("#scriptList"),
  empty: document.querySelector("#emptyState"),
  newScript: document.querySelector("#newScript"),
  fromProject: document.querySelector("#fromProject"),
  saveScript: document.querySelector("#saveScript"),
  sendShotPlanner: document.querySelector("#sendShotPlanner"),
  sendCalendar: document.querySelector("#sendCalendar"),
  copyScript: document.querySelector("#copyScript"),
  deleteScript: document.querySelector("#deleteScript"),
  title: document.querySelector("#title"),
  format: document.querySelector("#format"),
  tone: document.querySelector("#tone"),
  status: document.querySelector("#status"),
  audience: document.querySelector("#audience"),
  goal: document.querySelector("#goal"),
  hook: document.querySelector("#hook"),
  outline: document.querySelector("#outline"),
  scenes: document.querySelector("#scenes"),
  cta: document.querySelector("#cta"),
  notes: document.querySelector("#notes"),
  favorite: document.querySelector("#favorite"),
  preview: document.querySelector("#preview"),
  exportJson: document.querySelector("#exportJson"),
  importFile: document.querySelector("#importFile"),
  toast: document.querySelector("#toast"),
};

function appendOption(select, value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label || value;
  select.appendChild(option);
}

function initOptions() {
  appendOption(els.formatFilter, "", "모든 형식");
  State.formats.forEach((value) => {
    appendOption(els.formatFilter, value);
    appendOption(els.format, value);
  });
  appendOption(els.statusFilter, "", "모든 상태");
  State.statuses.forEach((value) => {
    appendOption(els.statusFilter, value);
    appendOption(els.status, value);
  });
  State.tones.forEach((value) => appendOption(els.tone, value));
  State.tones.forEach((value) => appendOption(els.briefTone, value));
}

function persist() {
  State.saveScripts(window.localStorage, scripts);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
}

function selectedScript() {
  return scripts.find((script) => script.id === selectedId) || scripts[0] || null;
}

function readEditor() {
  const current = selectedScript();
  return State.createScript({
    ...(current || {}),
    title: els.title.value,
    format: els.format.value,
    tone: els.tone.value,
    status: els.status.value,
    audience: els.audience.value,
    goal: els.goal.value,
    hook: els.hook.value,
    outline: els.outline.value,
    scenes: els.scenes.value,
    cta: els.cta.value,
    notes: els.notes.value,
    favorite: els.favorite.checked,
  });
}

function currentFilters() {
  return {
    query: els.search.value,
    format: els.formatFilter.value,
    status: els.statusFilter.value,
    favoriteOnly: els.favoriteOnly.checked,
  };
}

function renderSummary() {
  const summary = State.getSummary(scripts);
  els.total.textContent = summary.total;
  els.summary.textContent = `ready ${summary.ready} · favorite ${summary.favorites}`;
}

function renderList() {
  const filtered = State.filterScripts(scripts, currentFilters());
  els.count.textContent = `${filtered.length}개`;
  els.empty.hidden = filtered.length > 0;
  if (!filtered.some((script) => script.id === selectedId)) {
    selectedId = filtered[0]?.id || scripts[0]?.id || null;
  }

  els.list.replaceChildren(
    ...filtered.map((script) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "script-card" + (script.id === selectedId ? " is-active" : "");
      button.dataset.id = script.id;

      const top = document.createElement("span");
      top.className = "card-top";
      const title = document.createElement("strong");
      title.textContent = script.title;
      const status = document.createElement("span");
      status.textContent = script.favorite ? "중요" : script.status;
      top.append(title, status);

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${script.format} · ${script.tone}`;

      const hook = document.createElement("span");
      hook.className = "hook-line";
      hook.textContent = script.hook || "훅을 입력하세요.";

      button.append(top, meta, hook);
      return button;
    })
  );

  renderEditor();
  renderSummary();
}

function renderEditor() {
  const script = selectedScript();
  const disabled = !script;
  [els.saveScript, els.sendShotPlanner, els.sendCalendar, els.copyScript, els.deleteScript].forEach((button) => {
    button.disabled = disabled;
  });
  if (!script) {
    els.preview.textContent = "";
    return;
  }
  els.title.value = script.title;
  els.format.value = script.format;
  els.tone.value = script.tone;
  els.status.value = script.status;
  els.audience.value = script.audience;
  els.goal.value = script.goal;
  els.hook.value = script.hook;
  els.outline.value = script.outline;
  els.scenes.value = script.scenes.join("\n");
  els.cta.value = script.cta;
  els.notes.value = script.notes;
  els.favorite.checked = script.favorite;
  renderPreview();
}

function renderPreview() {
  if (!selectedScript()) {
    els.preview.textContent = "";
    return;
  }
  els.preview.textContent = State.formatScript(readEditor());
}

function saveCurrent() {
  const current = readEditor();
  const index = scripts.findIndex((script) => script.id === current.id);
  if (index >= 0) {
    scripts[index] = current;
  } else {
    scripts.unshift(current);
    selectedId = current.id;
  }
  persist();
  renderList();
  showToast("대본을 저장했습니다.");
}

function addNewScript() {
  const script = State.createScript({});
  scripts.unshift(script);
  selectedId = script.id;
  persist();
  renderList();
  showToast("새 대본을 만들었습니다.");
}

function addFromProject() {
  const project = State.loadProject(window.localStorage);
  const script = State.buildFromProject(project);
  scripts.unshift(script);
  selectedId = script.id;
  persist();
  renderList();
  showToast("Creator Project 기준으로 초안을 만들었습니다.");
}

function addFromBrief() {
  const script = State.buildFromBrief({
    topic: els.briefTopic.value,
    audience: els.briefAudience.value,
    length: els.briefLength.value,
    tone: els.briefTone.value,
  });
  scripts.unshift(script);
  selectedId = script.id;
  persist();
  renderList();
  showToast("초보자용 입력값으로 첫 대본 초안을 만들었습니다.");
}

async function copyCurrent() {
  const script = readEditor();
  try {
    await navigator.clipboard.writeText(State.formatScript(script));
    showToast("대본을 복사했습니다.");
  } catch (error) {
    showToast("브라우저가 복사를 막았습니다. 미리보기 내용을 직접 복사하세요.");
  }
}

function sendCurrentToShotPlanner() {
  const script = readEditor();
  const result = State.sendToShotPlanner(window.localStorage, script);
  showToast(result.message);
}

function sendCurrentToCalendar() {
  const script = readEditor();
  const result = State.sendToYouTubeCalendar(window.localStorage, script);
  showToast(result.message);
}

function deleteCurrent() {
  const script = selectedScript();
  if (!script) return;
  scripts = scripts.filter((item) => item.id !== script.id);
  selectedId = scripts[0]?.id || null;
  persist();
  renderList();
  showToast("대본을 삭제했습니다.");
}

function exportJson() {
  const blob = new Blob([JSON.stringify(State.exportScripts(scripts), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "script-generator-state.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      scripts = State.parseScriptImport(reader.result);
      selectedId = scripts[0]?.id || null;
      persist();
      renderList();
      showToast("대본 JSON을 가져왔습니다.");
    } catch (error) {
      showToast("가져오기 실패: 올바른 JSON인지 확인하세요.");
    } finally {
      els.importFile.value = "";
    }
  });
  reader.readAsText(file);
}

function bindEvents() {
  [els.search, els.formatFilter, els.statusFilter, els.favoriteOnly].forEach((node) => {
    node.addEventListener("input", renderList);
    node.addEventListener("change", renderList);
  });
  els.list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    selectedId = card.dataset.id;
    renderList();
  });
  [els.title, els.format, els.tone, els.status, els.audience, els.goal, els.hook, els.outline, els.scenes, els.cta, els.notes, els.favorite].forEach((node) => {
    node.addEventListener("input", renderPreview);
    node.addEventListener("change", renderPreview);
  });
  els.newScript.addEventListener("click", addNewScript);
  els.fromProject.addEventListener("click", addFromProject);
  els.buildFromBrief.addEventListener("click", addFromBrief);
  els.saveScript.addEventListener("click", saveCurrent);
  els.sendShotPlanner.addEventListener("click", sendCurrentToShotPlanner);
  els.sendCalendar.addEventListener("click", sendCurrentToCalendar);
  els.copyScript.addEventListener("click", copyCurrent);
  els.deleteScript.addEventListener("click", deleteCurrent);
  els.exportJson.addEventListener("click", exportJson);
  els.importFile.addEventListener("change", (event) => importJson(event.target.files[0]));
}

initOptions();
bindEvents();
renderList();

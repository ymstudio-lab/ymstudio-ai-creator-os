const State = window.ComfyWorkflowState;

let workflows = State.loadWorkflows(window.localStorage);
let selectedId = workflows[0]?.id || null;

const els = {
  total: document.querySelector("[data-total]"),
  summary: document.querySelector("[data-summary]"),
  search: document.querySelector("#search"),
  typeFilter: document.querySelector("#typeFilter"),
  tierFilter: document.querySelector("#tierFilter"),
  favoriteOnly: document.querySelector("#favoriteOnly"),
  count: document.querySelector("#count"),
  list: document.querySelector("#workflowList"),
  empty: document.querySelector("#emptyState"),
  newWorkflow: document.querySelector("#newWorkflow"),
  fromProject: document.querySelector("#fromProject"),
  saveWorkflow: document.querySelector("#saveWorkflow"),
  copyWorkflow: document.querySelector("#copyWorkflow"),
  deleteWorkflow: document.querySelector("#deleteWorkflow"),
  name: document.querySelector("#name"),
  type: document.querySelector("#type"),
  tier: document.querySelector("#tier"),
  status: document.querySelector("#status"),
  model: document.querySelector("#model"),
  size: document.querySelector("#size"),
  steps: document.querySelector("#steps"),
  batch: document.querySelector("#batch"),
  positive: document.querySelector("#positive"),
  negative: document.querySelector("#negative"),
  inputs: document.querySelector("#inputs"),
  outputs: document.querySelector("#outputs"),
  context: document.querySelector("#context"),
  speed: document.querySelector("#speed"),
  nodeNotes: document.querySelector("#nodeNotes"),
  failureFixes: document.querySelector("#failureFixes"),
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
  appendOption(els.typeFilter, "", "모든 유형");
  State.types.forEach((value) => {
    appendOption(els.typeFilter, value);
    appendOption(els.type, value);
  });
  appendOption(els.tierFilter, "", "모든 환경");
  State.tiers.forEach((value) => {
    appendOption(els.tierFilter, value);
    appendOption(els.tier, value);
  });
  State.statuses.forEach((value) => appendOption(els.status, value));
}

function persist() {
  State.saveWorkflows(window.localStorage, workflows);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
}

function selectedWorkflow() {
  return workflows.find((workflow) => workflow.id === selectedId) || workflows[0] || null;
}

function readEditor() {
  const current = selectedWorkflow();
  return State.createWorkflow({
    ...(current || {}),
    name: els.name.value,
    type: els.type.value,
    tier: els.tier.value,
    status: els.status.value,
    model: els.model.value,
    size: els.size.value,
    steps: els.steps.value,
    batch: els.batch.value,
    positive: els.positive.value,
    negative: els.negative.value,
    inputs: els.inputs.value,
    outputs: els.outputs.value,
    context: els.context.value,
    speed: els.speed.value,
    nodeNotes: els.nodeNotes.value,
    failureFixes: els.failureFixes.value,
    favorite: els.favorite.checked,
  });
}

function currentFilters() {
  return {
    query: els.search.value,
    type: els.typeFilter.value,
    tier: els.tierFilter.value,
    favoriteOnly: els.favoriteOnly.checked,
  };
}

function renderSummary() {
  const summary = State.getSummary(workflows);
  els.total.textContent = summary.total;
  els.summary.textContent = `stable ${summary.stable} · favorite ${summary.favorites}`;
}

function renderList() {
  const filtered = State.filterWorkflows(workflows, currentFilters());
  els.count.textContent = `${filtered.length}개`;
  els.empty.hidden = filtered.length > 0;
  if (!filtered.some((workflow) => workflow.id === selectedId)) {
    selectedId = filtered[0]?.id || workflows[0]?.id || null;
  }

  els.list.replaceChildren(
    ...filtered.map((workflow) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "workflow-card" + (workflow.id === selectedId ? " is-active" : "");
      button.dataset.id = workflow.id;

      const top = document.createElement("span");
      top.className = "card-top";
      const title = document.createElement("strong");
      title.textContent = workflow.name;
      const status = document.createElement("span");
      status.textContent = workflow.favorite ? "중요" : workflow.status;
      top.append(title, status);

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${workflow.type} · ${workflow.tier}`;

      const prompt = document.createElement("span");
      prompt.className = "hook-line";
      prompt.textContent = workflow.positive || "프롬프트를 입력하세요.";

      button.append(top, meta, prompt);
      return button;
    })
  );

  renderEditor();
  renderSummary();
}

function renderEditor() {
  const workflow = selectedWorkflow();
  const disabled = !workflow;
  [els.saveWorkflow, els.copyWorkflow, els.deleteWorkflow].forEach((button) => {
    button.disabled = disabled;
  });
  if (!workflow) {
    els.preview.textContent = "";
    return;
  }
  els.name.value = workflow.name;
  els.type.value = workflow.type;
  els.tier.value = workflow.tier;
  els.status.value = workflow.status;
  els.model.value = workflow.model;
  els.size.value = workflow.size;
  els.steps.value = workflow.steps;
  els.batch.value = workflow.batch;
  els.positive.value = workflow.positive;
  els.negative.value = workflow.negative;
  els.inputs.value = workflow.inputs;
  els.outputs.value = workflow.outputs;
  els.context.value = workflow.context;
  els.speed.value = workflow.speed;
  els.nodeNotes.value = workflow.nodeNotes;
  els.failureFixes.value = workflow.failureFixes;
  els.favorite.checked = workflow.favorite;
  renderPreview();
}

function renderPreview() {
  if (!selectedWorkflow()) {
    els.preview.textContent = "";
    return;
  }
  els.preview.textContent = State.formatWorkflow(readEditor());
}

function saveCurrent() {
  const current = readEditor();
  const index = workflows.findIndex((workflow) => workflow.id === current.id);
  if (index >= 0) {
    workflows[index] = current;
  } else {
    workflows.unshift(current);
    selectedId = current.id;
  }
  persist();
  renderList();
  showToast("워크플로우 레시피를 저장했습니다.");
}

function addNewWorkflow() {
  const workflow = State.createWorkflow({});
  workflows.unshift(workflow);
  selectedId = workflow.id;
  persist();
  renderList();
  showToast("새 레시피를 만들었습니다.");
}

function addFromProject() {
  const project = State.loadProject(window.localStorage);
  const workflow = State.buildFromProject(project);
  workflows.unshift(workflow);
  selectedId = workflow.id;
  persist();
  renderList();
  showToast("Creator Project 기준으로 레시피를 만들었습니다.");
}

async function copyCurrent() {
  const workflow = readEditor();
  try {
    await navigator.clipboard.writeText(State.formatWorkflow(workflow));
    showToast("레시피를 복사했습니다.");
  } catch (error) {
    showToast("브라우저가 복사를 막았습니다. 미리보기 내용을 직접 복사하세요.");
  }
}

function deleteCurrent() {
  const workflow = selectedWorkflow();
  if (!workflow) return;
  workflows = workflows.filter((item) => item.id !== workflow.id);
  selectedId = workflows[0]?.id || null;
  persist();
  renderList();
  showToast("레시피를 삭제했습니다.");
}

function exportJson() {
  const blob = new Blob([JSON.stringify(State.exportWorkflows(workflows), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "comfyui-workflow-manager-state.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      workflows = State.parseWorkflowImport(reader.result);
      selectedId = workflows[0]?.id || null;
      persist();
      renderList();
      showToast("워크플로우 JSON을 가져왔습니다.");
    } catch (error) {
      showToast("가져오기 실패: 올바른 JSON인지 확인하세요.");
    } finally {
      els.importFile.value = "";
    }
  });
  reader.readAsText(file);
}

function bindEvents() {
  [els.search, els.typeFilter, els.tierFilter, els.favoriteOnly].forEach((node) => {
    node.addEventListener("input", renderList);
    node.addEventListener("change", renderList);
  });
  [
    els.name,
    els.type,
    els.tier,
    els.status,
    els.model,
    els.size,
    els.steps,
    els.batch,
    els.positive,
    els.negative,
    els.inputs,
    els.outputs,
    els.context,
    els.speed,
    els.nodeNotes,
    els.failureFixes,
    els.favorite,
  ].forEach((node) => {
    node.addEventListener("input", renderPreview);
    node.addEventListener("change", renderPreview);
  });
  els.list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    selectedId = card.dataset.id;
    renderList();
  });
  els.newWorkflow.addEventListener("click", addNewWorkflow);
  els.fromProject.addEventListener("click", addFromProject);
  els.saveWorkflow.addEventListener("click", saveCurrent);
  els.copyWorkflow.addEventListener("click", copyCurrent);
  els.deleteWorkflow.addEventListener("click", deleteCurrent);
  els.exportJson.addEventListener("click", exportJson);
  els.importFile.addEventListener("change", () => importJson(els.importFile.files[0]));
}

initOptions();
bindEvents();
renderList();

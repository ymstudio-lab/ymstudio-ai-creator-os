const State = window.ThumbnailIdeaBoardState;

let ideas = State.loadIdeas(window.localStorage);
let selectedId = ideas[0]?.id || null;
let lastDeleted = null;

const els = {
  total: document.querySelector("[data-total]"),
  summary: document.querySelector("[data-summary]"),
  search: document.querySelector("#search"),
  formatFilter: document.querySelector("#formatFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  favoriteFilter: document.querySelector("#favoriteFilter"),
  scoreFilter: document.querySelector("#scoreFilter"),
  count: document.querySelector("#count"),
  list: document.querySelector("#ideaList"),
  empty: document.querySelector("#emptyState"),
  form: document.querySelector("#ideaForm"),
  title: document.querySelector("#title"),
  format: document.querySelector("#format"),
  status: document.querySelector("#status"),
  emotion: document.querySelector("#emotion"),
  layout: document.querySelector("#layout"),
  subject: document.querySelector("#subject"),
  overlayText: document.querySelector("#overlayText"),
  palette: document.querySelector("#palette"),
  prompt: document.querySelector("#prompt"),
  notes: document.querySelector("#notes"),
  score: document.querySelector("#score"),
  scoreValue: document.querySelector("#scoreValue"),
  favorite: document.querySelector("#favorite"),
  newIdea: document.querySelector("#newIdea"),
  copyPrompt: document.querySelector("#copyPrompt"),
  deleteIdea: document.querySelector("#deleteIdea"),
  exportJson: document.querySelector("#exportJson"),
  importFile: document.querySelector("#importFile"),
  resetDemo: document.querySelector("#resetDemo"),
  toast: document.querySelector("#toast"),
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
  [els.format, els.status, els.emotion, els.layout, els.formatFilter, els.statusFilter].forEach(clear);
  State.formatOptions.forEach((value) => appendOption(els.format, value));
  State.statusOptions.forEach((value) => appendOption(els.status, value));
  State.emotionOptions.forEach((value) => appendOption(els.emotion, value));
  State.layoutOptions.forEach((value) => appendOption(els.layout, value));
  appendOption(els.formatFilter, "", "All formats");
  State.formatOptions.forEach((value) => appendOption(els.formatFilter, value));
  appendOption(els.statusFilter, "", "All statuses");
  State.statusOptions.forEach((value) => appendOption(els.statusFilter, value));
}

function getSelectedIdea() {
  return ideas.find((idea) => idea.id === selectedId) || ideas[0] || null;
}

function persist() {
  State.saveIdeas(window.localStorage, ideas);
}

function showToast(message, action) {
  clear(els.toast);
  const span = document.createElement("span");
  span.textContent = message;
  els.toast.appendChild(span);
  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.addEventListener("click", action.onClick, { once: true });
    els.toast.appendChild(button);
  }
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), action ? 6000 : 2400);
}

function currentFilters() {
  return {
    query: els.search.value,
    format: els.formatFilter.value,
    status: els.statusFilter.value,
    favoriteOnly: els.favoriteFilter.checked,
    minScore: els.scoreFilter.value,
  };
}

function scoreText(score) {
  return "★".repeat(score) + "☆".repeat(5 - score);
}

function renderSummary() {
  const summary = State.getSummary(ideas);
  els.total.textContent = summary.total;
  els.summary.textContent = `ready ${summary.ready} · tested ${summary.tested} · avg ${summary.averageScore}`;
}

function renderList() {
  const filtered = State.filterIdeas(ideas, currentFilters());
  els.count.textContent = `${filtered.length} ideas`;
  els.empty.hidden = filtered.length > 0;
  if (!filtered.some((idea) => idea.id === selectedId)) {
    selectedId = filtered[0]?.id || ideas[0]?.id || null;
  }

  clear(els.list);
  filtered.forEach((idea) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "idea-card" + (idea.id === selectedId ? " is-active" : "");
    button.dataset.id = idea.id;

    const top = document.createElement("span");
    top.className = "card-top";
    const title = document.createElement("strong");
    title.textContent = idea.title;
    const favorite = document.createElement("span");
    favorite.textContent = idea.favorite ? "★" : "☆";
    top.append(title, favorite);

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = `${idea.format} · ${idea.status} · ${idea.emotion}`;

    const overlay = document.createElement("span");
    overlay.className = "overlay-text";
    overlay.textContent = idea.overlayText || "문구 없음";

    const score = document.createElement("span");
    score.className = "score";
    score.textContent = scoreText(idea.score);

    button.append(top, meta, overlay, score);
    els.list.appendChild(button);
  });

  renderEditor();
  renderSummary();
}

function renderEditor() {
  const idea = getSelectedIdea();
  const disabled = !idea;
  els.form.classList.toggle("is-disabled", disabled);
  els.copyPrompt.disabled = disabled;
  els.deleteIdea.disabled = disabled;

  if (!idea) {
    ["title", "subject", "overlayText", "palette", "prompt", "notes"].forEach((key) => {
      els[key].value = "";
    });
    els.score.value = 0;
    els.scoreValue.textContent = "0/5";
    els.favorite.checked = false;
    return;
  }

  els.title.value = idea.title;
  els.format.value = idea.format;
  els.status.value = idea.status;
  els.emotion.value = idea.emotion;
  els.layout.value = idea.layout;
  els.subject.value = idea.subject;
  els.overlayText.value = idea.overlayText;
  els.palette.value = idea.palette;
  els.prompt.value = idea.prompt;
  els.notes.value = idea.notes;
  els.score.value = idea.score;
  els.scoreValue.textContent = `${idea.score}/5`;
  els.favorite.checked = idea.favorite;
}

function applyFormChanges() {
  const idea = getSelectedIdea();
  if (!idea) return;
  ideas = ideas.map((item) =>
    item.id === idea.id
      ? State.updateIdea(item, {
          title: els.title.value,
          format: els.format.value,
          status: els.status.value,
          emotion: els.emotion.value,
          layout: els.layout.value,
          subject: els.subject.value,
          overlayText: els.overlayText.value,
          palette: els.palette.value,
          prompt: els.prompt.value,
          notes: els.notes.value,
          score: els.score.value,
          favorite: els.favorite.checked,
        })
      : item
  );
  persist();
  renderList();
}

function addIdea() {
  const idea = State.createIdea({
    title: "새 썸네일 아이디어",
    format: "YouTube Long",
    status: "idea",
    emotion: "궁금증",
    layout: "얼굴 + 큰 문구",
    subject: "영상 주제와 가장 강한 장면을 적어주세요.",
    overlayText: "한눈에 보이는 문구",
    palette: "메인 컬러, 보조 컬러, 배경 컬러",
    prompt: "clean YouTube thumbnail, strong subject, bold Korean text area, high contrast",
    notes: "테스트할 가설과 참고 이미지를 적어주세요.",
    score: 3,
  });
  ideas = [idea, ...ideas];
  selectedId = idea.id;
  persist();
  renderList();
  els.title.focus();
  els.title.select();
}

async function copyPrompt() {
  const idea = getSelectedIdea();
  if (!idea) return;
  try {
    await navigator.clipboard.writeText(State.makePrompt(idea));
    showToast("프롬프트를 복사했습니다.");
  } catch (error) {
    els.prompt.focus();
    els.prompt.select();
    showToast("복사가 막혔습니다. 선택된 프롬프트를 직접 복사하세요.");
  }
}

function deleteIdea() {
  const idea = getSelectedIdea();
  if (!idea) return;
  const index = ideas.findIndex((item) => item.id === idea.id);
  lastDeleted = { idea, index };
  ideas = ideas.filter((item) => item.id !== idea.id);
  selectedId = ideas[0]?.id || null;
  persist();
  renderList();
  showToast("아이디어를 삭제했습니다.", {
    label: "Undo",
    onClick: () => {
      if (!lastDeleted) return;
      const restored = State.createIdea(lastDeleted.idea);
      const insertAt = Math.max(0, Math.min(lastDeleted.index, ideas.length));
      ideas = [...ideas.slice(0, insertAt), restored, ...ideas.slice(insertAt)];
      selectedId = restored.id;
      lastDeleted = null;
      persist();
      renderList();
      showToast("아이디어를 복원했습니다.");
    },
  });
}

function downloadJson() {
  const payload = JSON.stringify(State.exportIdeas(ideas), null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "thumbnail-ideas.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      ideas = State.parseIdeaImport(reader.result);
      selectedId = ideas[0]?.id || null;
      persist();
      renderList();
      showToast("JSON을 가져왔습니다.");
    } catch (error) {
      showToast("가져오기 실패: 올바른 JSON 파일인지 확인하세요.");
    }
  });
  reader.readAsText(file);
}

function resetDemo() {
  ideas = State.demoIdeas.map(State.createIdea);
  selectedId = ideas[0]?.id || null;
  persist();
  renderList();
  showToast("데모 데이터를 복원했습니다.");
}

function bindEvents() {
  [els.search, els.formatFilter, els.statusFilter, els.favoriteFilter, els.scoreFilter].forEach((node) => {
    node.addEventListener("input", renderList);
    node.addEventListener("change", renderList);
  });
  els.list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    selectedId = card.dataset.id;
    renderList();
  });
  els.form.addEventListener("input", applyFormChanges);
  els.form.addEventListener("change", applyFormChanges);
  els.newIdea.addEventListener("click", addIdea);
  els.copyPrompt.addEventListener("click", copyPrompt);
  els.deleteIdea.addEventListener("click", deleteIdea);
  els.exportJson.addEventListener("click", downloadJson);
  els.importFile.addEventListener("change", (event) => importJson(event.target.files[0]));
  els.resetDemo.addEventListener("click", resetDemo);
}

initOptions();
bindEvents();
renderList();

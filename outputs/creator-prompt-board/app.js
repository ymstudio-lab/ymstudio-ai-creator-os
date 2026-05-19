const BoardState = window.CreatorPromptBoardState;

let prompts = BoardState.loadPrompts(window.localStorage);
let selectedId = prompts[0]?.id || null;
let lastDeletedPrompt = null;

const els = {
  list: document.querySelector("#promptList"),
  form: document.querySelector("#promptForm"),
  title: document.querySelector("#title"),
  body: document.querySelector("#body"),
  resultNotes: document.querySelector("#resultNotes"),
  rating: document.querySelector("#rating"),
  favorite: document.querySelector("#favorite"),
  toolTags: document.querySelector("#toolTags"),
  categoryTags: document.querySelector("#categoryTags"),
  search: document.querySelector("#search"),
  toolFilter: document.querySelector("#toolFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  favoriteFilter: document.querySelector("#favoriteFilter"),
  ratingFilter: document.querySelector("#ratingFilter"),
  count: document.querySelector("#count"),
  empty: document.querySelector("#emptyState"),
  newButton: document.querySelector("#newPrompt"),
  deleteButton: document.querySelector("#deletePrompt"),
  copyButton: document.querySelector("#copyPrompt"),
  resetDemo: document.querySelector("#resetDemo"),
  exportPrompts: document.querySelector("#exportPrompts"),
  importPrompts: document.querySelector("#importPrompts"),
  importFile: document.querySelector("#importFile"),
  toast: document.querySelector("#toast"),
};

function clearNode(node) {
  node.replaceChildren();
}

function appendOption(select, value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label || value;
  select.appendChild(option);
}

function initOptions() {
  [els.toolTags, els.categoryTags, els.toolFilter, els.categoryFilter].forEach(clearNode);
  BoardState.toolOptions.forEach((tool) => appendOption(els.toolTags, tool));
  BoardState.categoryOptions.forEach((category) => appendOption(els.categoryTags, category));
  appendOption(els.toolFilter, "", "All tools");
  BoardState.toolOptions.forEach((tool) => appendOption(els.toolFilter, tool));
  appendOption(els.categoryFilter, "", "All categories");
  BoardState.categoryOptions.forEach((category) => appendOption(els.categoryFilter, category));
}

function getSelectedOptions(select) {
  return Array.from(select.selectedOptions).map((option) => option.value);
}

function setSelectedOptions(select, values) {
  const selected = new Set(values || []);
  Array.from(select.options).forEach((option) => {
    option.selected = selected.has(option.value);
  });
}

function getSelectedPrompt() {
  return prompts.find((prompt) => prompt.id === selectedId) || prompts[0] || null;
}

function persist() {
  BoardState.savePrompts(window.localStorage, prompts);
}

function showToast(message, action) {
  clearNode(els.toast);
  const text = document.createElement("span");
  text.textContent = message;
  els.toast.appendChild(text);
  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.addEventListener("click", action.onClick, { once: true });
    els.toast.appendChild(button);
  }
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), action ? 6000 : 2600);
}

function currentFilters() {
  return {
    query: els.search.value,
    tool: els.toolFilter.value,
    category: els.categoryFilter.value,
    favoriteOnly: els.favoriteFilter.checked,
    minRating: els.ratingFilter.value,
  };
}

function appendTagRow(tags, values) {
  values.forEach((tag) => {
    const node = document.createElement("span");
    node.textContent = tag;
    tags.appendChild(node);
  });
}

function renderList() {
  const filtered = BoardState.filterPrompts(prompts, currentFilters());
  els.count.textContent = `${filtered.length} prompt${filtered.length === 1 ? "" : "s"}`;
  els.empty.hidden = filtered.length !== 0;

  if (!filtered.some((prompt) => prompt.id === selectedId)) {
    selectedId = filtered[0]?.id || prompts[0]?.id || null;
  }

  clearNode(els.list);
  filtered.forEach((prompt) => {
    const card = document.createElement("button");
    card.className = "prompt-card" + (prompt.id === selectedId ? " is-active" : "");
    card.dataset.id = prompt.id;
    card.type = "button";

    const top = document.createElement("span");
    top.className = "card-top";
    const title = document.createElement("strong");
    title.textContent = prompt.title;
    const favorite = document.createElement("span");
    favorite.className = "favorite";
    favorite.textContent = prompt.favorite ? "★" : "☆";
    top.append(title, favorite);

    const body = document.createElement("span");
    body.className = "card-body";
    body.textContent = prompt.body;

    const tags = document.createElement("span");
    tags.className = "tag-row";
    appendTagRow(tags, prompt.toolTags.slice(0, 2).concat(prompt.categoryTags.slice(0, 2)));

    const meta = document.createElement("span");
    meta.className = "card-meta";
    meta.textContent = "★".repeat(prompt.rating) + "☆".repeat(5 - prompt.rating);

    card.append(top, body, tags, meta);
    els.list.appendChild(card);
  });

  renderEditor();
}

function renderEditor() {
  const prompt = getSelectedPrompt();
  const disabled = !prompt;
  els.form.classList.toggle("is-disabled", disabled);
  els.deleteButton.disabled = disabled;
  els.copyButton.disabled = disabled;

  if (!prompt) {
    els.title.value = "";
    els.body.value = "";
    els.resultNotes.value = "";
    els.rating.value = 0;
    els.favorite.checked = false;
    setSelectedOptions(els.toolTags, []);
    setSelectedOptions(els.categoryTags, []);
    return;
  }

  els.title.value = prompt.title;
  els.body.value = prompt.body;
  els.resultNotes.value = prompt.resultNotes;
  els.rating.value = prompt.rating;
  els.favorite.checked = prompt.favorite;
  setSelectedOptions(els.toolTags, prompt.toolTags);
  setSelectedOptions(els.categoryTags, prompt.categoryTags);
}

function applyFormChanges() {
  const prompt = getSelectedPrompt();
  if (!prompt) return;
  prompts = prompts.map((item) =>
    item.id === prompt.id
      ? BoardState.updatePrompt(item, {
          title: els.title.value,
          body: els.body.value,
          resultNotes: els.resultNotes.value,
          rating: els.rating.value,
          favorite: els.favorite.checked,
          toolTags: getSelectedOptions(els.toolTags),
          categoryTags: getSelectedOptions(els.categoryTags),
        })
      : item
  );
  persist();
  renderList();
}

function addPrompt() {
  const prompt = BoardState.createPrompt({
    title: "새 크리에이터 프롬프트",
    body: "주제, 형식, 카메라 방향, 조명, 스타일, 길이, 제외할 요소를 적어주세요.",
    toolTags: ["ChatGPT"],
    categoryTags: ["Script"],
    rating: 3,
  });
  prompts = [prompt, ...prompts];
  selectedId = prompt.id;
  persist();
  renderList();
  els.title.focus();
  els.title.select();
}

async function copySelectedPrompt() {
  const prompt = getSelectedPrompt();
  if (!prompt) return;
  const text = BoardState.formatPromptForCopy(prompt);
  try {
    await navigator.clipboard.writeText(text);
    showToast("Prompt copied");
  } catch (error) {
    els.body.focus();
    els.body.select();
    showToast("클립보드 복사가 막혔습니다. 선택된 프롬프트 본문을 직접 복사하세요.");
  }
}

function deleteSelectedPrompt() {
  const prompt = getSelectedPrompt();
  if (!prompt) return;
  const index = prompts.findIndex((item) => item.id === prompt.id);
  lastDeletedPrompt = { prompt, index };
  prompts = prompts.filter((item) => item.id !== prompt.id);
  selectedId = prompts[0]?.id || null;
  persist();
  renderList();
  showToast("Prompt deleted", {
    label: "Undo",
    onClick: () => {
      if (!lastDeletedPrompt) return;
      const restored = BoardState.createPrompt(lastDeletedPrompt.prompt);
      const insertAt = Math.max(0, Math.min(lastDeletedPrompt.index, prompts.length));
      prompts = [...prompts.slice(0, insertAt), restored, ...prompts.slice(insertAt)];
      selectedId = restored.id;
      lastDeletedPrompt = null;
      persist();
      renderList();
      showToast("Prompt restored");
    },
  });
}

function resetDemoData() {
  prompts = BoardState.demoPrompts.map(BoardState.createPrompt);
  selectedId = prompts[0]?.id || null;
  persist();
  renderList();
  showToast("Demo prompts restored");
}

function exportPromptJson() {
  const payload = BoardState.exportPrompts(prompts);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `creator-prompt-board-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`Exported ${payload.prompts.length} prompts`);
}

function chooseImportFile() {
  els.importFile.value = "";
  els.importFile.click();
}

function importPromptJson(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const result = BoardState.parsePromptImport(String(reader.result || ""));
    if (!result.ok) {
      showToast(result.error);
      return;
    }

    prompts = result.prompts;
    selectedId = prompts[0]?.id || null;
    persist();
    renderList();
    showToast(`Imported ${prompts.length} prompts`);
  });
  reader.addEventListener("error", () => showToast("Could not read the selected file."));
  reader.readAsText(file);
}

function bindEvents() {
  els.list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    selectedId = card.dataset.id;
    renderList();
  });

  [els.title, els.body, els.resultNotes, els.rating, els.favorite, els.toolTags, els.categoryTags].forEach((input) => {
    input.addEventListener("input", applyFormChanges);
    input.addEventListener("change", applyFormChanges);
  });

  [els.search, els.toolFilter, els.categoryFilter, els.favoriteFilter, els.ratingFilter].forEach((input) => {
    input.addEventListener("input", renderList);
    input.addEventListener("change", renderList);
  });

  els.newButton.addEventListener("click", addPrompt);
  els.deleteButton.addEventListener("click", deleteSelectedPrompt);
  els.copyButton.addEventListener("click", copySelectedPrompt);
  els.resetDemo.addEventListener("click", resetDemoData);
  els.exportPrompts.addEventListener("click", exportPromptJson);
  els.importPrompts.addEventListener("click", chooseImportFile);
  els.importFile.addEventListener("change", importPromptJson);
}

initOptions();
bindEvents();
renderList();

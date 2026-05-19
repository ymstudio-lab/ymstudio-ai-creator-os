const State = window.CharacterConsistencyState;

let characters = State.loadCharacters(window.localStorage);
let selectedId = characters[0]?.id || null;

const els = {
  total: document.querySelector("[data-total]"),
  summary: document.querySelector("[data-summary]"),
  search: document.querySelector("#search"),
  roleFilter: document.querySelector("#roleFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  favoriteOnly: document.querySelector("#favoriteOnly"),
  count: document.querySelector("#count"),
  list: document.querySelector("#characterList"),
  empty: document.querySelector("#emptyState"),
  newCharacter: document.querySelector("#newCharacter"),
  fromProject: document.querySelector("#fromProject"),
  saveCharacter: document.querySelector("#saveCharacter"),
  copyCharacter: document.querySelector("#copyCharacter"),
  deleteCharacter: document.querySelector("#deleteCharacter"),
  name: document.querySelector("#name"),
  role: document.querySelector("#role"),
  status: document.querySelector("#status"),
  face: document.querySelector("#face"),
  hair: document.querySelector("#hair"),
  outfit: document.querySelector("#outfit"),
  silhouette: document.querySelector("#silhouette"),
  expression: document.querySelector("#expression"),
  referenceNotes: document.querySelector("#referenceNotes"),
  modelNotes: document.querySelector("#modelNotes"),
  positive: document.querySelector("#positive"),
  negative: document.querySelector("#negative"),
  sceneRules: document.querySelector("#sceneRules"),
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
  appendOption(els.roleFilter, "", "모든 역할");
  State.roles.forEach((value) => {
    appendOption(els.roleFilter, value);
    appendOption(els.role, value);
  });
  appendOption(els.statusFilter, "", "모든 상태");
  State.statuses.forEach((value) => {
    appendOption(els.statusFilter, value);
    appendOption(els.status, value);
  });
}

function persist() {
  State.saveCharacters(window.localStorage, characters);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2400);
}

function selectedCharacter() {
  return characters.find((character) => character.id === selectedId) || characters[0] || null;
}

function readEditor() {
  const current = selectedCharacter();
  return State.createCharacter({
    ...(current || {}),
    name: els.name.value,
    role: els.role.value,
    status: els.status.value,
    face: els.face.value,
    hair: els.hair.value,
    outfit: els.outfit.value,
    silhouette: els.silhouette.value,
    expression: els.expression.value,
    referenceNotes: els.referenceNotes.value,
    modelNotes: els.modelNotes.value,
    positive: els.positive.value,
    negative: els.negative.value,
    sceneRules: els.sceneRules.value,
    failureFixes: els.failureFixes.value,
    favorite: els.favorite.checked,
  });
}

function currentFilters() {
  return {
    query: els.search.value,
    role: els.roleFilter.value,
    status: els.statusFilter.value,
    favoriteOnly: els.favoriteOnly.checked,
  };
}

function renderSummary() {
  const summary = State.getSummary(characters);
  els.total.textContent = summary.total;
  els.summary.textContent = `locked ${summary.locked} · favorite ${summary.favorites}`;
}

function renderList() {
  const filtered = State.filterCharacters(characters, currentFilters());
  els.count.textContent = `${filtered.length}개`;
  els.empty.hidden = filtered.length > 0;
  if (!filtered.some((character) => character.id === selectedId)) {
    selectedId = filtered[0]?.id || characters[0]?.id || null;
  }

  els.list.replaceChildren(
    ...filtered.map((character) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "character-card" + (character.id === selectedId ? " is-active" : "");
      button.dataset.id = character.id;

      const top = document.createElement("span");
      top.className = "card-top";
      const title = document.createElement("strong");
      title.textContent = character.name;
      const status = document.createElement("span");
      status.textContent = character.favorite ? "중요" : character.status;
      top.append(title, status);

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${character.role} · ${character.status}`;

      const rule = document.createElement("span");
      rule.className = "hook-line";
      rule.textContent = character.face || "얼굴 고정 규칙을 입력하세요.";

      button.append(top, meta, rule);
      return button;
    })
  );

  renderEditor();
  renderSummary();
}

function renderEditor() {
  const character = selectedCharacter();
  const disabled = !character;
  [els.saveCharacter, els.copyCharacter, els.deleteCharacter].forEach((button) => {
    button.disabled = disabled;
  });
  if (!character) {
    els.preview.textContent = "";
    return;
  }
  els.name.value = character.name;
  els.role.value = character.role;
  els.status.value = character.status;
  els.face.value = character.face;
  els.hair.value = character.hair;
  els.outfit.value = character.outfit;
  els.silhouette.value = character.silhouette;
  els.expression.value = character.expression;
  els.referenceNotes.value = character.referenceNotes;
  els.modelNotes.value = character.modelNotes;
  els.positive.value = character.positive;
  els.negative.value = character.negative;
  els.sceneRules.value = character.sceneRules;
  els.failureFixes.value = character.failureFixes;
  els.favorite.checked = character.favorite;
  renderPreview();
}

function renderPreview() {
  if (!selectedCharacter()) {
    els.preview.textContent = "";
    return;
  }
  els.preview.textContent = State.formatCharacter(readEditor());
}

function saveCurrent() {
  const current = State.createCharacter({
    ...readEditor(),
    updatedAt: new Date().toISOString(),
  });
  const index = characters.findIndex((character) => character.id === current.id);
  if (index >= 0) {
    characters[index] = current;
  } else {
    characters.unshift(current);
    selectedId = current.id;
  }
  persist();
  renderList();
  showToast("캐릭터 바이블을 저장했습니다.");
}

function addNewCharacter() {
  const character = State.createCharacter({});
  characters.unshift(character);
  selectedId = character.id;
  persist();
  renderList();
  showToast("새 캐릭터를 만들었습니다.");
}

function addFromProject() {
  const project = State.loadProject(window.localStorage);
  const character = State.buildFromProject(project);
  characters.unshift(character);
  selectedId = character.id;
  persist();
  renderList();
  showToast("Creator Project 기준으로 캐릭터를 만들었습니다.");
}

async function copyCurrent() {
  const character = readEditor();
  try {
    await navigator.clipboard.writeText(State.formatCharacter(character));
    showToast("캐릭터 바이블을 복사했습니다.");
  } catch (error) {
    showToast("브라우저가 복사를 막았습니다. 미리보기 내용을 직접 복사하세요.");
  }
}

function deleteCurrent() {
  const character = selectedCharacter();
  if (!character) return;
  if (!window.confirm("캐릭터를 삭제할까요?")) return;
  characters = characters.filter((item) => item.id !== character.id);
  selectedId = characters[0]?.id || null;
  persist();
  renderList();
  showToast("캐릭터를 삭제했습니다.");
}

function exportJson() {
  const blob = new Blob([JSON.stringify(State.exportCharacters(characters), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "character-consistency-tool-state.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      characters = State.parseCharacterImport(reader.result);
      selectedId = characters[0]?.id || null;
      persist();
      renderList();
      showToast("캐릭터 JSON을 가져왔습니다.");
    } catch (error) {
      showToast("가져오기 실패: 올바른 JSON인지 확인하세요.");
    } finally {
      els.importFile.value = "";
    }
  });
  reader.readAsText(file);
}

function bindEvents() {
  [els.search, els.roleFilter, els.statusFilter, els.favoriteOnly].forEach((node) => {
    node.addEventListener("input", renderList);
    node.addEventListener("change", renderList);
  });
  [
    els.name,
    els.role,
    els.status,
    els.face,
    els.hair,
    els.outfit,
    els.silhouette,
    els.expression,
    els.referenceNotes,
    els.modelNotes,
    els.positive,
    els.negative,
    els.sceneRules,
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
  els.newCharacter.addEventListener("click", addNewCharacter);
  els.fromProject.addEventListener("click", addFromProject);
  els.saveCharacter.addEventListener("click", saveCurrent);
  els.copyCharacter.addEventListener("click", copyCurrent);
  els.deleteCharacter.addEventListener("click", deleteCurrent);
  els.exportJson.addEventListener("click", exportJson);
  els.importFile.addEventListener("change", () => importJson(els.importFile.files[0]));
}

initOptions();
bindEvents();
renderList();

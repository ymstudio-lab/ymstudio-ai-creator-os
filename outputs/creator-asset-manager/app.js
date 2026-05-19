(function () {
  const State = window.CreatorAssetManagerState;
  let appState = State.loadState(window.localStorage);
  let pendingDeletedAsset = null;
  let armedDeleteId = "";

  const el = {
    totalMetric: document.querySelector("#totalMetric"),
    approvedMetric: document.querySelector("#approvedMetric"),
    usedMetric: document.querySelector("#usedMetric"),
    collectionsMetric: document.querySelector("#collectionsMetric"),
    attentionMetric: document.querySelector("#attentionMetric"),
    assetForm: document.querySelector("#assetForm"),
    titleInput: document.querySelector("#titleInput"),
    typeInput: document.querySelector("#typeInput"),
    statusInput: document.querySelector("#statusInput"),
    collectionInput: document.querySelector("#collectionInput"),
    projectInput: document.querySelector("#projectInput"),
    sourceToolInput: document.querySelector("#sourceToolInput"),
    toolOptions: document.querySelector("#toolOptions"),
    tagsInput: document.querySelector("#tagsInput"),
    filePathInput: document.querySelector("#filePathInput"),
    promptInput: document.querySelector("#promptInput"),
    resultNotesInput: document.querySelector("#resultNotesInput"),
    licenseInput: document.querySelector("#licenseInput"),
    createdDateInput: document.querySelector("#createdDateInput"),
    assetCount: document.querySelector("#assetCount"),
    resetDemo: document.querySelector("#resetDemo"),
    searchInput: document.querySelector("#searchInput"),
    typeFilter: document.querySelector("#typeFilter"),
    statusFilter: document.querySelector("#statusFilter"),
    collectionFilter: document.querySelector("#collectionFilter"),
    emptyState: document.querySelector("#emptyState"),
    assetList: document.querySelector("#assetList"),
    collectionView: document.querySelector("#collectionView"),
    exportMarkdown: document.querySelector("#exportMarkdown"),
    exportCsv: document.querySelector("#exportCsv"),
    exportJson: document.querySelector("#exportJson"),
    importJson: document.querySelector("#importJson"),
    importJsonFile: document.querySelector("#importJsonFile"),
    toast: document.querySelector("#toast"),
  };

  function textEl(tag, text, className) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    return node;
  }

  function option(value, label) {
    const node = document.createElement("option");
    node.value = value;
    node.textContent = label || value;
    return node;
  }

  function fillSelect(select, values, allLabel) {
    select.innerHTML = "";
    if (allLabel) select.appendChild(option("", allLabel));
    values.forEach((value) => select.appendChild(option(value)));
  }

  function uniqueCollections() {
    return Array.from(new Set(appState.assets.map((asset) => asset.collection).filter(Boolean))).sort();
  }

  function setupOptions() {
    fillSelect(el.typeInput, State.assetTypes);
    fillSelect(el.statusInput, State.statusOptions);
    fillSelect(el.typeFilter, State.assetTypes, "All types");
    fillSelect(el.statusFilter, State.statusOptions, "All statuses");
    State.toolOptions.forEach((tool) => el.toolOptions.appendChild(option(tool)));
  }

  function saveAndRender(message) {
    State.saveState(window.localStorage, appState);
    render();
    if (message) showToast(message);
  }

  function readFilters() {
    return {
      query: el.searchInput.value,
      type: el.typeFilter.value,
      status: el.statusFilter.value,
      collection: el.collectionFilter.value,
    };
  }

  function renderMetrics() {
    const summary = State.summarize(appState.assets);
    el.totalMetric.textContent = summary.total;
    el.approvedMetric.textContent = summary.approved;
    el.usedMetric.textContent = summary.used;
    el.collectionsMetric.textContent = summary.collections;
    el.attentionMetric.textContent = summary.needsAttention;
  }

  function renderFilters() {
    const current = el.collectionFilter.value;
    fillSelect(el.collectionFilter, uniqueCollections(), "All collections");
    el.collectionFilter.value = current;
  }

  function renderAssets() {
    const filtered = State.filterAssets(appState.assets, readFilters());
    el.assetCount.textContent = `${filtered.length} ${filtered.length === 1 ? "asset" : "assets"}`;
    el.emptyState.hidden = filtered.length > 0;
    el.assetList.innerHTML = "";
    filtered.forEach((asset) => {
      const article = document.createElement("article");
      article.className = "asset-card";
      const head = document.createElement("div");
      head.className = "asset-main";
      const text = document.createElement("div");
      text.appendChild(textEl("p", `${asset.createdDate} / ${asset.type} / ${asset.status}`));
      text.appendChild(textEl("h3", asset.title));
      text.appendChild(textEl("small", `${asset.collection} / ${asset.project}`));
      head.appendChild(text);
      head.appendChild(textEl("strong", asset.sourceTool));

      article.appendChild(head);
      article.appendChild(textEl("p", `Tags: ${asset.tags.join(", ") || "none"}`, "meta"));
      article.appendChild(textEl("p", `Path: ${asset.filePath || "not tracked"}`, "meta"));
      article.appendChild(textEl("p", `Prompt: ${asset.promptText || "none"}`, "notes"));
      article.appendChild(textEl("p", `Result: ${asset.resultNotes || "none"}`, "notes"));
      article.appendChild(textEl("p", `License: ${asset.licenseNote || "none"}`, "meta"));

      const health = State.getAssetHealth(asset);
      const healthLine = document.createElement("p");
      healthLine.className = `health health-${health.level}`;
      healthLine.textContent = `${health.label}${health.issues.length ? `: ${health.issues.join(", ")}` : ""}`;
      article.appendChild(healthLine);

      const actions = document.createElement("div");
      actions.className = "card-actions";
      const status = document.createElement("select");
      State.statusOptions.forEach((value) => status.appendChild(option(value)));
      status.value = asset.status;
      status.dataset.statusId = asset.id;
      const del = document.createElement("button");
      del.type = "button";
      del.dataset.deleteId = asset.id;
      del.textContent = armedDeleteId === asset.id ? "Confirm delete" : "Delete";
      if (armedDeleteId === asset.id) del.classList.add("confirm-delete");
      actions.append(status, del);
      article.appendChild(actions);
      el.assetList.appendChild(article);
    });
  }

  function renderCollections() {
    const summaries = State.summarizeCollections(appState.assets);
    el.collectionView.innerHTML = "";
    summaries.forEach((summary) => {
      const section = document.createElement("section");
      section.className = "collection-card";
      section.appendChild(textEl("h3", summary.collection));
      section.appendChild(textEl("p", `${summary.count} assets / ${summary.approved} approved / ${summary.used} used`));
      section.appendChild(textEl("p", `${summary.needsAttention} need review / latest ${summary.latestDate || "n/a"}`));
      section.appendChild(textEl("small", `Types: ${Object.entries(summary.types).map(([type, count]) => `${type} ${count}`).join(", ")}`));
      summary.assets.slice(0, 5).forEach((asset) => section.appendChild(textEl("small", `${asset.status}: ${asset.title}`)));
      el.collectionView.appendChild(section);
    });
  }

  function render() {
    appState.assets = State.normalizeAssets(appState.assets);
    renderMetrics();
    renderFilters();
    renderAssets();
    renderCollections();
  }

  function readForm() {
    return {
      title: el.titleInput.value,
      type: el.typeInput.value,
      status: el.statusInput.value,
      collection: el.collectionInput.value,
      project: el.projectInput.value,
      sourceTool: el.sourceToolInput.value,
      tags: el.tagsInput.value,
      filePath: el.filePathInput.value,
      promptText: el.promptInput.value,
      resultNotes: el.resultNotesInput.value,
      licenseNote: el.licenseInput.value,
      createdDate: el.createdDateInput.value,
    };
  }

  function resetForm() {
    el.titleInput.value = "";
    el.typeInput.value = "image";
    el.statusInput.value = "new";
    el.collectionInput.value = "Inbox";
    el.projectInput.value = "YMSTUDIO AI Creator OS";
    el.sourceToolInput.value = "Claude";
    el.tagsInput.value = "";
    el.filePathInput.value = "";
    el.promptInput.value = "";
    el.resultNotesInput.value = "";
    el.licenseInput.value = "";
    el.createdDateInput.value = new Date().toISOString().slice(0, 10);
  }

  function download(filename, type, content) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function showToast(message, action) {
    el.toast.innerHTML = "";
    el.toast.appendChild(textEl("span", message));
    if (action) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = action.label;
      button.addEventListener("click", action.handler);
      el.toast.appendChild(button);
    }
    el.toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => (el.toast.hidden = true), 2200);
  }

  el.assetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    appState.assets = State.addAsset(appState.assets, readForm());
    resetForm();
    saveAndRender("Asset added.");
  });

  [el.searchInput, el.typeFilter, el.statusFilter, el.collectionFilter].forEach((input) => input.addEventListener("input", renderAssets));

  el.assetList.addEventListener("change", (event) => {
    const target = event.target.closest("[data-status-id]");
    if (!target) return;
    appState.assets = State.updateStatus(appState.assets, target.dataset.statusId, target.value);
    saveAndRender("Status updated.");
  });

  el.assetList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button) return;
    const id = button.dataset.deleteId;
    if (armedDeleteId !== id) {
      armedDeleteId = id;
      renderAssets();
      showToast("Click Confirm delete to remove this local catalog entry.");
      return;
    }
    const result = State.deleteAssetWithUndo(appState.assets, id);
    pendingDeletedAsset = result.deletedAsset;
    armedDeleteId = "";
    appState.assets = result.assets;
    State.saveState(window.localStorage, appState);
    render();
    showToast("Asset deleted.", {
      label: "Undo",
      handler: () => {
        appState.assets = State.restoreAsset(appState.assets, pendingDeletedAsset);
        pendingDeletedAsset = null;
        saveAndRender("Asset restored.");
      },
    });
  });

  el.resetDemo.addEventListener("click", () => {
    appState = State.createDemoState();
    saveAndRender("Demo restored.");
  });

  el.exportMarkdown.addEventListener("click", () => download("creator-assets.md", "text/markdown;charset=utf-8", State.generateMarkdown(appState.assets)));
  el.exportCsv.addEventListener("click", () => download("creator-assets.csv", "text/csv;charset=utf-8", State.generateCsv(appState.assets)));
  el.exportJson.addEventListener("click", () => download("creator-assets.json", "application/json;charset=utf-8", State.generateJson(appState)));
  el.importJson.addEventListener("click", () => el.importJsonFile.click());
  el.importJsonFile.addEventListener("change", async () => {
    const file = el.importJsonFile.files[0];
    if (!file) return;
    try {
      appState = State.parseJsonImport(await file.text());
      armedDeleteId = "";
      pendingDeletedAsset = null;
      saveAndRender("JSON catalog imported.");
    } catch {
      showToast("Import failed. Choose a valid Creator Asset Manager JSON file.");
    } finally {
      el.importJsonFile.value = "";
    }
  });

  setupOptions();
  resetForm();
  render();
})();

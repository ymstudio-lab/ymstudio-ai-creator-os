(function () {
  const State = window.ApiCostTrackerState;
  let appState = State.loadState(window.localStorage);
  let pendingDeleteId = "";
  let lastDeletedEntry = null;

  const el = {
    monthInput: document.querySelector("#monthInput"),
    budgetInput: document.querySelector("#budgetInput"),
    creditsInput: document.querySelector("#creditsInput"),
    warningCard: document.querySelector("#warningCard"),
    warningLevel: document.querySelector("#warningLevel"),
    warningDetail: document.querySelector("#warningDetail"),
    totalCost: document.querySelector("#totalCost"),
    budgetPercent: document.querySelector("#budgetPercent"),
    totalCredits: document.querySelector("#totalCredits"),
    creditPercent: document.querySelector("#creditPercent"),
    dailyAverage: document.querySelector("#dailyAverage"),
    projectedCost: document.querySelector("#projectedCost"),
    currentBurn: document.querySelector("#currentBurn"),
    projectedMonthEnd: document.querySelector("#projectedMonthEnd"),
    remainingSafeBudget: document.querySelector("#remainingSafeBudget"),
    entryForm: document.querySelector("#entryForm"),
    presetInput: document.querySelector("#presetInput"),
    applyPreset: document.querySelector("#applyPreset"),
    entryDate: document.querySelector("#entryDate"),
    providerInput: document.querySelector("#providerInput"),
    categoryInput: document.querySelector("#categoryInput"),
    projectInput: document.querySelector("#projectInput"),
    workflowInput: document.querySelector("#workflowInput"),
    quantityInput: document.querySelector("#quantityInput"),
    unitInput: document.querySelector("#unitInput"),
    unitCostInput: document.querySelector("#unitCostInput"),
    creditInput: document.querySelector("#creditInput"),
    notesInput: document.querySelector("#notesInput"),
    projectOptions: document.querySelector("#projectOptions"),
    searchInput: document.querySelector("#searchInput"),
    providerFilter: document.querySelector("#providerFilter"),
    categoryFilter: document.querySelector("#categoryFilter"),
    projectFilter: document.querySelector("#projectFilter"),
    exportMarkdown: document.querySelector("#exportMarkdown"),
    exportCsv: document.querySelector("#exportCsv"),
    exportJson: document.querySelector("#exportJson"),
    importJson: document.querySelector("#importJson"),
    importJsonFile: document.querySelector("#importJsonFile"),
    resetDemo: document.querySelector("#resetDemo"),
    entryCount: document.querySelector("#entryCount"),
    providerBreakdown: document.querySelector("#providerBreakdown"),
    categoryBreakdown: document.querySelector("#categoryBreakdown"),
    topWorkflows: document.querySelector("#topWorkflows"),
    recommendations: document.querySelector("#recommendations"),
    entryList: document.querySelector("#entryList"),
    emptyState: document.querySelector("#emptyState"),
    toast: document.querySelector("#toast"),
  };

  function money(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function option(value, label) {
    const item = document.createElement("option");
    item.value = value;
    item.textContent = label || value;
    return item;
  }

  function textElement(tagName, text, className) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function fillSelect(select, values, includeAllLabel) {
    select.innerHTML = "";
    if (includeAllLabel) select.appendChild(option("", includeAllLabel));
    values.forEach((value) => select.appendChild(option(value)));
  }

  function uniqueProjects() {
    return Array.from(
      new Set([...State.projectOptions, ...appState.entries.map((entry) => entry.project)].filter(Boolean))
    ).sort();
  }

  function setupOptions() {
    State.pricingPresets.forEach((preset) => el.presetInput.appendChild(option(preset.id, preset.label)));
    fillSelect(el.providerInput, State.providerOptions);
    fillSelect(el.categoryInput, State.categoryOptions);
    fillSelect(el.providerFilter, State.providerOptions, "All providers");
    fillSelect(el.categoryFilter, State.categoryOptions, "All categories");
    renderProjectOptions();
  }

  function renderProjectOptions() {
    const projects = uniqueProjects();
    fillSelect(el.projectFilter, projects, "All projects");
    el.projectOptions.innerHTML = "";
    projects.forEach((project) => el.projectOptions.appendChild(option(project)));
  }

  function saveAndRender(message) {
    State.saveState(window.localStorage, appState);
    render();
    if (message) showToast(message);
  }

  function readFilters() {
    return {
      month: appState.settings.month,
      query: el.searchInput.value,
      provider: el.providerFilter.value,
      category: el.categoryFilter.value,
      project: el.projectFilter.value,
    };
  }

  function renderSettings() {
    el.monthInput.value = appState.settings.month;
    el.budgetInput.value = appState.settings.monthlyBudget;
    el.creditsInput.value = appState.settings.monthlyCredits;
  }

  function renderDashboard() {
    const totals = State.calculateTotals(appState.entries, appState.settings);
    const scenario = State.calculateScenario(appState.entries, appState.settings);
    el.warningCard.dataset.level = totals.warningLevel.replace(" ", "-");
    el.warningLevel.textContent = totals.warningLevel;
    el.warningDetail.textContent = `${Math.max(totals.budgetPercent, totals.creditPercent)}% max usage`;
    el.totalCost.textContent = money(totals.totalCost);
    el.budgetPercent.textContent = `${totals.budgetPercent}% of budget`;
    el.totalCredits.textContent = totals.totalCredits.toFixed(2);
    el.creditPercent.textContent = `${totals.creditPercent}% of credits`;
    el.dailyAverage.textContent = money(totals.dailyAverage);
    el.projectedCost.textContent = `${money(totals.projectedCost)} projected`;
    el.currentBurn.textContent = money(scenario.currentBurn);
    el.projectedMonthEnd.textContent = money(scenario.projectedMonthEnd);
    el.remainingSafeBudget.textContent = money(scenario.remainingSafeBudget);
  }

  function renderBreakdown(container, rows) {
    container.innerHTML = "";
    rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = "breakdown-row";
      row.appendChild(textElement("span", item.label));
      row.appendChild(textElement("strong", money(item.cost)));
      row.appendChild(textElement("small", `${item.credits.toFixed(2)} credits`));
      container.appendChild(row);
    });
  }

  function renderCompactList(container, rows, emptyText) {
    container.innerHTML = "";
    if (!rows.length) {
      container.appendChild(textElement("p", emptyText, "empty-inline"));
      return;
    }
    rows.forEach((row) => {
      const item = document.createElement("div");
      item.className = "compact-item";
      if (typeof row === "string") {
        item.textContent = row;
      } else {
        item.appendChild(textElement("strong", row.workflow));
        item.appendChild(textElement("span", `${row.provider} / ${row.project} / ${money(row.cost)} / ${row.credits.toFixed(2)} credits`));
      }
      container.appendChild(item);
    });
  }

  function renderReport(filteredEntries) {
    const report = State.buildMonthlyReport(filteredEntries, appState.settings);
    renderBreakdown(el.providerBreakdown, report.providers);
    renderBreakdown(el.categoryBreakdown, report.categories);
    renderCompactList(el.topWorkflows, report.workflows, "No workflows for this filter.");
    renderCompactList(el.recommendations, report.recommendations, "No recommendations yet.");
  }

  function renderEntries() {
    const filtered = State.filterEntries(appState.entries, readFilters()).sort((a, b) => b.date.localeCompare(a.date));
    el.entryCount.textContent = `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`;
    el.emptyState.hidden = filtered.length !== 0;
    el.entryList.innerHTML = "";
    renderReport(filtered);

    filtered.forEach((entry) => {
      const article = document.createElement("article");
      article.className = "entry-card";
      const main = document.createElement("div");
      main.className = "entry-main";
      const copy = document.createElement("div");
      copy.appendChild(textElement("p", `${entry.date} / ${entry.provider} / ${entry.category}`));
      copy.appendChild(textElement("h3", entry.workflow));
      copy.appendChild(textElement("small", entry.project));
      main.appendChild(copy);
      main.appendChild(textElement("strong", money(entry.cost)));

      const meta = document.createElement("div");
      meta.className = "entry-meta";
      meta.appendChild(textElement("span", `${entry.quantity} ${entry.unit} x ${money(entry.unitCost)}`));
      meta.appendChild(textElement("span", `${entry.creditUsed.toFixed(2)} credits`));

      article.appendChild(main);
      article.appendChild(meta);
      if (entry.notes) article.appendChild(textElement("p", entry.notes, "notes"));

      const button = document.createElement("button");
      button.className = "delete-button";
      button.type = "button";
      button.dataset.deleteId = entry.id;
      button.textContent = pendingDeleteId === entry.id ? "Confirm delete" : "Delete";
      article.appendChild(button);
      el.entryList.appendChild(article);
    });
  }

  function render() {
    appState = {
      settings: State.normalizeSettings(appState.settings),
      entries: State.normalizeEntries(appState.entries),
    };
    renderSettings();
    renderProjectOptions();
    renderDashboard();
    renderEntries();
  }

  function readEntryForm() {
    const quantity = Number(el.quantityInput.value || 0);
    const unitCost = Number(el.unitCostInput.value || 0);
    return {
      date: el.entryDate.value,
      provider: el.providerInput.value,
      category: el.categoryInput.value,
      project: el.projectInput.value,
      workflow: el.workflowInput.value,
      quantity,
      unit: el.unitInput.value,
      unitCost,
      cost: quantity * unitCost,
      creditUsed: el.creditInput.value === "" ? quantity * unitCost : Number(el.creditInput.value),
      notes: el.notesInput.value,
    };
  }

  function resetEntryForm() {
    el.entryDate.value = new Date().toISOString().slice(0, 10);
    el.providerInput.value = "OpenAI/Codex";
    el.categoryInput.value = "SDK/API";
    el.projectInput.value = "YMSTUDIO Creator OS";
    el.workflowInput.value = "";
    el.quantityInput.value = "1";
    el.unitInput.value = "calls";
    el.unitCostInput.value = "0";
    el.creditInput.value = "";
    el.notesInput.value = "";
  }

  function fillEntryForm(entry) {
    el.providerInput.value = entry.provider;
    el.categoryInput.value = entry.category;
    el.projectInput.value = entry.project;
    el.workflowInput.value = entry.workflow;
    el.quantityInput.value = entry.quantity;
    el.unitInput.value = entry.unit;
    el.unitCostInput.value = entry.unitCost;
    el.creditInput.value = entry.creditUsed;
    el.notesInput.value = entry.notes;
  }

  function downloadFile(filename, mimeType, content) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function showToast(message) {
    el.toast.innerHTML = "";
    el.toast.appendChild(textElement("span", message));
    if (lastDeletedEntry) {
      const undo = document.createElement("button");
      undo.type = "button";
      undo.textContent = "Undo";
      undo.addEventListener("click", () => {
        appState.entries = [lastDeletedEntry, ...appState.entries];
        lastDeletedEntry = null;
        saveAndRender("Entry restored.");
      });
      el.toast.appendChild(undo);
    }
    el.toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      el.toast.hidden = true;
    }, 2200);
  }

  el.entryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    appState.entries = State.addEntry(appState.entries, readEntryForm());
    resetEntryForm();
    saveAndRender("Usage entry added.");
  });

  el.applyPreset.addEventListener("click", () => {
    const presetEntry = State.applyPricingPreset(el.presetInput.value, { date: el.entryDate.value });
    fillEntryForm(presetEntry);
    showToast("Pricing preset applied.");
  });

  [el.monthInput, el.budgetInput, el.creditsInput].forEach((input) => {
    input.addEventListener("input", () => {
      appState.settings = State.normalizeSettings({
        month: el.monthInput.value,
        monthlyBudget: el.budgetInput.value,
        monthlyCredits: el.creditsInput.value,
      });
      saveAndRender();
    });
  });

  [el.searchInput, el.providerFilter, el.categoryFilter, el.projectFilter].forEach((input) => {
    input.addEventListener("input", renderEntries);
  });

  el.entryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button) return;
    const id = button.dataset.deleteId;
    if (pendingDeleteId !== id) {
      pendingDeleteId = id;
      renderEntries();
      showToast("Click confirm delete to remove this entry.");
      return;
    }
    const deleted = appState.entries.find((entry) => entry.id === id);
    appState.entries = appState.entries.filter((entry) => entry.id !== id);
    pendingDeleteId = "";
    lastDeletedEntry = deleted || null;
    saveAndRender("Entry deleted.");
  });

  el.exportMarkdown.addEventListener("click", () => {
    const report = State.generateMarkdown(appState.entries, appState.settings);
    downloadFile(`api-cost-report-${appState.settings.month}.md`, "text/markdown;charset=utf-8", report);
  });

  el.exportCsv.addEventListener("click", () => {
    const entries = State.filterEntries(appState.entries, { month: appState.settings.month });
    const csv = State.generateCsv(entries);
    downloadFile(`api-cost-report-${appState.settings.month}.csv`, "text/csv;charset=utf-8", csv);
  });

  el.exportJson.addEventListener("click", () => {
    const json = State.exportStateJson(appState);
    downloadFile(`api-cost-tracker-state-${appState.settings.month}.json`, "application/json;charset=utf-8", json);
  });

  el.importJson.addEventListener("click", () => {
    el.importJsonFile.click();
  });

  el.importJsonFile.addEventListener("change", () => {
    const file = el.importJsonFile.files && el.importJsonFile.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        appState = State.importStateJson(String(reader.result || ""));
        pendingDeleteId = "";
        lastDeletedEntry = null;
        saveAndRender("JSON state imported.");
      } catch (error) {
        showToast("Import failed. Check that the JSON came from this tracker.");
      } finally {
        el.importJsonFile.value = "";
      }
    });
    reader.readAsText(file);
  });

  el.resetDemo.addEventListener("click", () => {
    appState = State.createDemoState();
    pendingDeleteId = "";
    lastDeletedEntry = null;
    saveAndRender("Demo data restored.");
  });

  setupOptions();
  resetEntryForm();
  render();
})();

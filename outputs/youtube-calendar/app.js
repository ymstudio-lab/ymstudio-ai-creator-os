(function () {
  const State = window.YouTubeCalendarState;
  let appState = State.loadState(window.localStorage);
  let pendingDeleteId = "";

  const el = {
    channelInput: document.querySelector("#channelInput"),
    monthInput: document.querySelector("#monthInput"),
    weeklyTargetInput: document.querySelector("#weeklyTargetInput"),
    totalMetric: document.querySelector("#totalMetric"),
    scheduledMetric: document.querySelector("#scheduledMetric"),
    publishedMetric: document.querySelector("#publishedMetric"),
    productionMetric: document.querySelector("#productionMetric"),
    weeklySummary: document.querySelector("#weeklySummary"),
    pipelineSummary: document.querySelector("#pipelineSummary"),
    contentForm: document.querySelector("#contentForm"),
    titleInput: document.querySelector("#titleInput"),
    formatInput: document.querySelector("#formatInput"),
    statusInput: document.querySelector("#statusInput"),
    itemChannelInput: document.querySelector("#itemChannelInput"),
    nicheInput: document.querySelector("#nicheInput"),
    uploadDateInput: document.querySelector("#uploadDateInput"),
    scriptInput: document.querySelector("#scriptInput"),
    titleVariantsInput: document.querySelector("#titleVariantsInput"),
    thumbnailPromptsInput: document.querySelector("#thumbnailPromptsInput"),
    toolsInput: document.querySelector("#toolsInput"),
    toolOptions: document.querySelector("#toolOptions"),
    performanceInput: document.querySelector("#performanceInput"),
    itemCount: document.querySelector("#itemCount"),
    resetDemo: document.querySelector("#resetDemo"),
    searchInput: document.querySelector("#searchInput"),
    statusFilter: document.querySelector("#statusFilter"),
    formatFilter: document.querySelector("#formatFilter"),
    channelFilter: document.querySelector("#channelFilter"),
    emptyState: document.querySelector("#emptyState"),
    contentList: document.querySelector("#contentList"),
    calendarMode: document.querySelector("#calendarMode"),
    calendarView: document.querySelector("#calendarView"),
    exportMarkdown: document.querySelector("#exportMarkdown"),
    exportCsv: document.querySelector("#exportCsv"),
    exportJson: document.querySelector("#exportJson"),
    importJson: document.querySelector("#importJson"),
    importFile: document.querySelector("#importFile"),
    toast: document.querySelector("#toast"),
  };

  function textEl(tagName, text, className) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    node.textContent = text;
    return node;
  }

  function option(value, label) {
    const item = document.createElement("option");
    item.value = value;
    item.textContent = label || value;
    return item;
  }

  function fillSelect(select, values, allLabel) {
    select.innerHTML = "";
    if (allLabel) select.appendChild(option("", allLabel));
    values.forEach((value) => select.appendChild(option(value)));
  }

  function uniqueChannels() {
    return Array.from(new Set(appState.items.map((item) => item.channel).filter(Boolean))).sort();
  }

  function setupOptions() {
    fillSelect(el.formatInput, State.formatOptions);
    fillSelect(el.statusInput, State.statusOptions);
    fillSelect(el.statusFilter, State.statusOptions, "All statuses");
    fillSelect(el.formatFilter, State.formatOptions, "All formats");
    el.toolOptions.innerHTML = "";
    State.toolOptions.forEach((tool) => el.toolOptions.appendChild(option(tool)));
  }

  function readFilters() {
    return {
      month: appState.settings.month,
      query: el.searchInput.value,
      status: el.statusFilter.value,
      format: el.formatFilter.value,
      channel: el.channelFilter.value,
    };
  }

  function saveAndRender(message) {
    State.saveState(window.localStorage, appState);
    render();
    if (message) showToast(message);
  }

  function renderSettings() {
    el.channelInput.value = appState.settings.channel;
    el.monthInput.value = appState.settings.month;
    el.weeklyTargetInput.value = appState.settings.weeklyTarget;
  }

  function renderMetrics() {
    const summary = State.summarize(appState.items, appState.settings);
    el.totalMetric.textContent = summary.total;
    el.scheduledMetric.textContent = summary.scheduled;
    el.publishedMetric.textContent = summary.published;
    el.productionMetric.textContent = summary.inProduction;
  }

  function renderWeeklySummary() {
    const weeks = State.weeklyPlanningSummary(appState.items, appState.settings);
    el.weeklySummary.innerHTML = "";
    if (!weeks.length) {
      el.weeklySummary.appendChild(textEl("p", "No uploads planned for this month.", "empty"));
      return;
    }
    weeks.forEach((week) => {
      const card = document.createElement("article");
      card.className = "week-card";
      card.appendChild(textEl("span", week.week));
      card.appendChild(textEl("strong", `${week.total}/${appState.settings.weeklyTarget}`));
      const bar = document.createElement("div");
      bar.className = "density-bar";
      const fill = document.createElement("i");
      fill.style.width = `${Math.min(100, Math.round((week.total / appState.settings.weeklyTarget) * 100))}%`;
      bar.appendChild(fill);
      card.appendChild(bar);
      card.appendChild(textEl("p", `${week.scheduled} scheduled / ${week.inProduction} in production / ${week.gapToTarget} open`, "entry-meta"));
      el.weeklySummary.appendChild(card);
    });
  }

  function chipsFromCounts(counts) {
    const wrap = document.createElement("div");
    wrap.className = "summary-chips";
    Object.keys(counts)
      .sort()
      .forEach((key) => {
        wrap.appendChild(textEl("span", `${key}: ${counts[key]}`));
      });
    return wrap;
  }

  function renderPipelineSummary() {
    const summary = State.summarizePipeline(appState.items, appState.settings);
    el.pipelineSummary.innerHTML = "";
    [
      ["Format", summary.byFormat],
      ["Status", summary.byStatus],
      ["Upload week", summary.byUploadWeek],
    ].forEach(([label, counts]) => {
      const section = document.createElement("section");
      section.className = "pipeline-section";
      section.appendChild(textEl("h3", label));
      section.appendChild(Object.keys(counts).length ? chipsFromCounts(counts) : textEl("p", "No items", "entry-meta"));
      el.pipelineSummary.appendChild(section);
    });
  }

  function renderFilters() {
    const selected = el.channelFilter.value;
    fillSelect(el.channelFilter, uniqueChannels(), "All channels");
    el.channelFilter.value = selected;
  }

  function renderContentList() {
    const filtered = State.filterItems(appState.items, readFilters()).sort((a, b) => a.uploadDate.localeCompare(b.uploadDate));
    el.itemCount.textContent = `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;
    el.emptyState.hidden = filtered.length > 0;
    el.contentList.innerHTML = "";

    filtered.forEach((item) => {
      const article = document.createElement("article");
      article.className = "content-card";
      const head = document.createElement("div");
      head.className = "entry-main";
      const titleBlock = document.createElement("div");
      titleBlock.appendChild(textEl("p", `${item.uploadDate} / ${item.format} / ${item.status}`));
      titleBlock.appendChild(textEl("h3", item.title));
      titleBlock.appendChild(textEl("small", `${item.channel} / ${item.niche}`));
      head.appendChild(titleBlock);
      head.appendChild(textEl("strong", item.tools.join(", ") || "No tools"));

      const outline = textEl("p", item.scriptOutline, "outline");
      const variants = textEl("p", `Titles: ${item.titleVariants.join(" | ") || "none"}`, "entry-meta");
      const prompts = textEl("p", `Thumbnails: ${item.thumbnailPrompts.join(" | ") || "none"}`, "entry-meta");
      const notes = textEl("p", `Notes: ${item.performanceNotes || "none"}`, "entry-meta");

      const actions = document.createElement("div");
      actions.className = "card-actions";
      const statusSelect = document.createElement("select");
      State.statusOptions.forEach((status) => statusSelect.appendChild(option(status)));
      statusSelect.value = item.status;
      statusSelect.dataset.statusId = item.id;
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.dataset.deleteId = item.id;
      deleteButton.textContent = pendingDeleteId === item.id ? "Confirm delete" : "Delete";
      actions.appendChild(statusSelect);
      actions.appendChild(deleteButton);

      article.append(head, outline, variants, prompts, notes, actions);
      el.contentList.appendChild(article);
    });
  }

  function renderCalendar() {
    const filtered = State.filterItems(appState.items, { month: appState.settings.month });
    const groups = State.groupByUploadDate(filtered, el.calendarMode.value);
    el.calendarView.innerHTML = "";
    Object.keys(groups)
      .sort()
      .forEach((key) => {
        const section = document.createElement("section");
        section.className = "calendar-group";
        section.appendChild(textEl("h3", key));
        groups[key].forEach((item) => {
          section.appendChild(textEl("p", `${item.status}: ${item.title} (${item.format})`));
        });
        el.calendarView.appendChild(section);
      });
  }

  function render() {
    appState = {
      settings: State.normalizeSettings(appState.settings),
      items: State.normalizeItems(appState.items),
    };
    renderSettings();
    renderFilters();
    renderMetrics();
    renderWeeklySummary();
    renderPipelineSummary();
    renderContentList();
    renderCalendar();
  }

  function readForm() {
    return {
      title: el.titleInput.value,
      format: el.formatInput.value,
      channel: el.itemChannelInput.value || el.channelInput.value,
      niche: el.nicheInput.value,
      uploadDate: el.uploadDateInput.value,
      status: el.statusInput.value,
      scriptOutline: el.scriptInput.value,
      titleVariants: el.titleVariantsInput.value,
      thumbnailPrompts: el.thumbnailPromptsInput.value,
      tools: el.toolsInput.value,
      performanceNotes: el.performanceInput.value,
    };
  }

  function resetForm() {
    el.titleInput.value = "";
    el.formatInput.value = "Shorts";
    el.statusInput.value = "idea";
    el.itemChannelInput.value = appState.settings.channel;
    el.nicheInput.value = "AI creator";
    el.uploadDateInput.value = new Date().toISOString().slice(0, 10);
    el.scriptInput.value = "";
    el.titleVariantsInput.value = "";
    el.thumbnailPromptsInput.value = "";
    el.toolsInput.value = "";
    el.performanceInput.value = "";
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
      button.addEventListener("click", action.onClick, { once: true });
      el.toast.appendChild(button);
    }
    el.toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      el.toast.hidden = true;
    }, action ? 6000 : 2200);
  }

  el.contentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    appState.items = State.addItem(appState.items, readForm());
    resetForm();
    saveAndRender("Content item added.");
  });

  [el.channelInput, el.monthInput, el.weeklyTargetInput].forEach((input) => {
    input.addEventListener("input", () => {
      appState.settings = State.normalizeSettings({
        channel: el.channelInput.value,
        month: el.monthInput.value,
        weeklyTarget: el.weeklyTargetInput.value,
      });
      saveAndRender();
    });
  });

  [el.searchInput, el.statusFilter, el.formatFilter, el.channelFilter, el.calendarMode].forEach((input) => {
    input.addEventListener("input", render);
  });

  el.contentList.addEventListener("change", (event) => {
    const target = event.target.closest("[data-status-id]");
    if (!target) return;
    appState.items = State.updateStatus(appState.items, target.dataset.statusId, target.value);
    pendingDeleteId = "";
    saveAndRender("Status updated.");
  });

  el.contentList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button) return;
    const item = appState.items.find((entry) => entry.id === button.dataset.deleteId);
    if (!item) return;
    if (pendingDeleteId !== item.id) {
      pendingDeleteId = item.id;
      renderContentList();
      showToast("삭제하려면 같은 삭제 버튼을 한 번 더 누르세요.");
      return;
    }
    const result = State.deleteItemWithUndo(appState.items, item.id);
    appState.items = result.items;
    pendingDeleteId = "";
    saveAndRender();
    showToast("Content item deleted.", {
      label: "Undo",
      onClick: () => {
        appState.items = State.restoreDeletedItem(appState.items, result.deleted);
        saveAndRender("Delete undone.");
      },
    });
  });

  el.resetDemo.addEventListener("click", () => {
    appState = State.createDemoState();
    saveAndRender("Demo data restored.");
  });

  el.exportMarkdown.addEventListener("click", () => {
    download(`youtube-calendar-${appState.settings.month}.md`, "text/markdown;charset=utf-8", State.generateMarkdown(appState.items, appState.settings));
  });

  el.exportCsv.addEventListener("click", () => {
    download(`youtube-calendar-${appState.settings.month}.csv`, "text/csv;charset=utf-8", State.generateCsv(State.filterItems(appState.items, { month: appState.settings.month })));
  });

  el.exportJson.addEventListener("click", () => {
    download(`youtube-calendar-${appState.settings.month}.json`, "application/json;charset=utf-8", State.exportStateJson(appState));
  });

  el.importJson.addEventListener("click", () => {
    el.importFile.click();
  });

  el.importFile.addEventListener("change", () => {
    const file = el.importFile.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        appState = State.importStateJson(reader.result);
        saveAndRender("JSON calendar imported.");
      } catch (error) {
        showToast(error.message || "Could not import JSON.");
      } finally {
        el.importFile.value = "";
      }
    });
    reader.readAsText(file);
  });

  setupOptions();
  resetForm();
  render();
})();

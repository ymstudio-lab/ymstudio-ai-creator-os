(function () {
  const State = window.AiShotPlannerState;
  let plan = State.loadPlan(window.localStorage);
  let selectedSceneId = plan.scenes[0] ? plan.scenes[0].id : "";
  let selectedShotId = plan.shots[0] ? plan.shots[0].id : "";
  let lastDeletedShot = null;
  let toastTimer = null;

  const $ = (selector) => document.querySelector(selector);

  const els = {
    projectTitle: $("#projectTitle"),
    projectGoal: $("#projectGoal"),
    projectFormat: $("#projectFormat"),
    projectAudience: $("#projectAudience"),
    addScene: $("#addScene"),
    sceneList: $("#sceneList"),
    sceneForm: $("#sceneForm"),
    sceneTitle: $("#sceneTitle"),
    sceneSummary: $("#sceneSummary"),
    sceneLocation: $("#sceneLocation"),
    search: $("#search"),
    statusFilter: $("#statusFilter"),
    sceneFilter: $("#sceneFilter"),
    toolFilter: $("#toolFilter"),
    exportMarkdown: $("#exportMarkdown"),
    exportCsv: $("#exportCsv"),
    exportJson: $("#exportJson"),
    importMode: $("#importMode"),
    importJson: $("#importJson"),
    importFile: $("#importFile"),
    resetDemo: $("#resetDemo"),
    shotCount: $("#shotCount"),
    addShot: $("#addShot"),
    shotList: $("#shotList"),
    emptyState: $("#emptyState"),
    shotForm: $("#shotForm"),
    deleteShot: $("#deleteShot"),
    deleteSafety: $("#deleteSafety"),
    undoDelete: $("#undoDelete"),
    shotNumber: $("#shotNumber"),
    shotStatus: $("#shotStatus"),
    shotTitle: $("#shotTitle"),
    shotScene: $("#shotScene"),
    shotDescription: $("#shotDescription"),
    shotPrompt: $("#shotPrompt"),
    shotTool: $("#shotTool"),
    shotModel: $("#shotModel"),
    shotDuration: $("#shotDuration"),
    assetImage: $("#assetImage"),
    assetVideo: $("#assetVideo"),
    assetReference: $("#assetReference"),
    continuityCharacter: $("#continuityCharacter"),
    continuityOutfit: $("#continuityOutfit"),
    continuityLocation: $("#continuityLocation"),
    continuityMood: $("#continuityMood"),
    continuityCameraStyle: $("#continuityCameraStyle"),
    shotNotes: $("#shotNotes"),
    continuityHeadline: $("#continuityHeadline"),
    continuitySummary: $("#continuitySummary"),
    toast: $("#toast"),
  };

  function save(message) {
    plan.updatedAt = new Date().toISOString();
    State.savePlan(window.localStorage, plan);
    if (message) showToast(message);
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 1900);
  }

  function option(select, value, label) {
    const node = document.createElement("option");
    node.value = value;
    node.textContent = label;
    select.appendChild(node);
  }

  function fillOptions() {
    els.statusFilter.innerHTML = "";
    option(els.statusFilter, "", "Any status");
    State.statusOptions.forEach((status) => option(els.statusFilter, status, titleCase(status)));

    els.shotStatus.innerHTML = "";
    State.statusOptions.forEach((status) => option(els.shotStatus, status, titleCase(status)));

    els.toolFilter.innerHTML = "";
    option(els.toolFilter, "", "Any tool");
    State.toolOptions.forEach((tool) => option(els.toolFilter, tool, tool));

    els.shotTool.innerHTML = "";
    State.toolOptions.forEach((tool) => option(els.shotTool, tool, tool));
  }

  function fillSceneOptions() {
    [els.sceneFilter, els.shotScene].forEach((select) => {
      const current = select.value;
      select.innerHTML = "";
      if (select === els.sceneFilter) option(select, "", "Any scene");
      plan.scenes
        .slice()
        .sort((a, b) => a.order - b.order)
        .forEach((scene) => option(select, scene.id, `${scene.order}. ${scene.title}`));
      if ([...select.options].some((item) => item.value === current)) select.value = current;
    });
  }

  function titleCase(text) {
    return String(text)
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function statusClass(status) {
    return String(status).replace(/\s+/g, "-");
  }

  function clearNode(node) {
    node.replaceChildren();
  }

  function selectedShot() {
    return plan.shots.find((shot) => shot.id === selectedShotId) || plan.shots[0] || null;
  }

  function selectedScene() {
    return plan.scenes.find((scene) => scene.id === selectedSceneId) || plan.scenes[0] || null;
  }

  function renderProject() {
    els.projectTitle.value = plan.project.title;
    els.projectGoal.value = plan.project.goal;
    els.projectFormat.value = plan.project.format;
    els.projectAudience.value = plan.project.audience;
  }

  function renderScenes() {
    clearNode(els.sceneList);
    if (!plan.scenes.length) {
      const empty = document.createElement("p");
      empty.className = "empty compact-empty";
      empty.textContent = "No scenes yet. Add a scene to start planning.";
      els.sceneList.appendChild(empty);
      return;
    }
    plan.scenes
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach((scene) => {
        const card = document.createElement("article");
        card.className = "scene-card" + (scene.id === selectedSceneId ? " active" : "");
        const count = plan.shots.filter((shot) => shot.sceneId === scene.id).length;
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.sceneId = scene.id;
        const title = document.createElement("strong");
        title.textContent = scene.title;
        const summary = document.createElement("p");
        summary.textContent = scene.summary || `${count} shots`;
        button.append(title, summary);
        if (scene.location) {
          const location = document.createElement("p");
          location.className = "scene-location";
          location.textContent = scene.location;
          button.appendChild(location);
        }
        button.addEventListener("click", () => {
          selectedSceneId = scene.id;
          els.sceneFilter.value = scene.id;
          const first = plan.shots.find((shot) => shot.sceneId === scene.id);
          if (first) selectedShotId = first.id;
          render();
        });
        card.appendChild(button);
        els.sceneList.appendChild(card);
      });
  }

  function renderSceneEditor() {
    const scene = selectedScene();
    const disabled = !scene;
    Array.from(els.sceneForm.elements).forEach((element) => {
      element.disabled = disabled;
    });
    if (!scene) {
      els.sceneTitle.value = "";
      els.sceneSummary.value = "";
      els.sceneLocation.value = "";
      return;
    }
    els.sceneTitle.value = scene.title;
    els.sceneSummary.value = scene.summary;
    els.sceneLocation.value = scene.location || "";
  }

  function renderShots() {
    const filters = {
      query: els.search.value,
      status: els.statusFilter.value,
      sceneId: els.sceneFilter.value,
      tool: els.toolFilter.value,
    };
    const shots = State.filterShots(plan.shots, filters, plan.scenes);
    clearNode(els.shotList);
    els.shotCount.textContent = `${shots.length} ${shots.length === 1 ? "shot" : "shots"}`;
    els.emptyState.hidden = shots.length !== 0;
    if (!shots.length) {
      els.emptyState.textContent = plan.shots.length
        ? "No shots match the current filters."
        : "No shots yet. Add a shot once the first scene is ready.";
    }

    shots.forEach((shot) => {
      const scene = plan.scenes.find((item) => item.id === shot.sceneId);
      const card = document.createElement("article");
      card.className = "shot-card" + (shot.id === selectedShotId ? " active" : "");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.shotId = shot.id;
      const title = document.createElement("strong");
      title.textContent = `${shot.shotNumber} ${shot.title}`;
      const sceneTitle = document.createElement("p");
      sceneTitle.textContent = scene ? scene.title : "Unassigned scene";
      const meta = document.createElement("div");
      meta.className = "shot-meta";
      [
        [titleCase(shot.status), "chip " + statusClass(shot.status)],
        [shot.tool, "chip"],
        [shot.duration || "n/a", "chip"],
      ].forEach(([text, className]) => {
        const chip = document.createElement("span");
        chip.className = className;
        chip.textContent = text;
        meta.appendChild(chip);
      });
      const description = document.createElement("p");
      description.textContent = String(shot.description || shot.prompt).slice(0, 150);
      button.append(title, sceneTitle, meta, description);
      button.addEventListener("click", () => {
        selectedShotId = shot.id;
        selectedSceneId = shot.sceneId;
        render();
      });
      card.appendChild(button);
      els.shotList.appendChild(card);
    });
  }

  function renderEditor() {
    const shot = selectedShot();
    const disabled = !shot;
    Array.from(els.shotForm.elements).forEach((element) => {
      element.disabled = disabled && element !== els.undoDelete;
    });
    els.deleteShot.disabled = disabled;
    els.deleteSafety.hidden = !lastDeletedShot;
    if (!shot) {
      [
        els.shotNumber,
        els.shotTitle,
        els.shotDescription,
        els.shotPrompt,
        els.shotModel,
        els.shotDuration,
        els.assetImage,
        els.assetVideo,
        els.assetReference,
        els.continuityCharacter,
        els.continuityOutfit,
        els.continuityLocation,
        els.continuityMood,
        els.continuityCameraStyle,
        els.shotNotes,
      ].forEach((input) => {
        input.value = "";
      });
      return;
    }

    els.shotNumber.value = shot.shotNumber;
    els.shotStatus.value = shot.status;
    els.shotTitle.value = shot.title;
    els.shotScene.value = shot.sceneId;
    els.shotDescription.value = shot.description;
    els.shotPrompt.value = shot.prompt;
    els.shotTool.value = shot.tool;
    els.shotModel.value = shot.model;
    els.shotDuration.value = shot.duration;
    els.assetImage.value = shot.assetPaths.image;
    els.assetVideo.value = shot.assetPaths.video;
    els.assetReference.value = shot.assetPaths.reference;
    els.continuityCharacter.value = shot.continuity.character;
    els.continuityOutfit.value = shot.continuity.outfit;
    els.continuityLocation.value = shot.continuity.location;
    els.continuityMood.value = shot.continuity.mood;
    els.continuityCameraStyle.value = shot.continuity.cameraStyle;
    els.shotNotes.value = shot.notes;
  }

  function renderContinuity() {
    const summary = State.continuitySummary(plan);
    els.continuityHeadline.textContent = summary.isComplete
      ? "All shot continuity fields are filled"
      : `${summary.missing.length} continuity gaps`;
    els.continuitySummary.textContent = [
      `Character: ${plan.project.continuity.character}`,
      `Outfit: ${plan.project.continuity.outfit}`,
      `Location: ${plan.project.continuity.location}`,
      `Mood: ${plan.project.continuity.mood}`,
      `Camera/style: ${plan.project.continuity.cameraStyle}`,
    ].join(" | ");
  }

  function render() {
    fillSceneOptions();
    renderProject();
    renderScenes();
    renderSceneEditor();
    renderShots();
    renderEditor();
    renderContinuity();
  }

  function updateCurrentShot(changes, message) {
    const index = plan.shots.findIndex((shot) => shot.id === selectedShotId);
    if (index === -1) return;
    plan.shots[index] = State.updateShot(plan.shots[index], changes);
    selectedSceneId = plan.shots[index].sceneId;
    save(message);
    render();
  }

  function updateCurrentScene(changes, message) {
    const index = plan.scenes.findIndex((scene) => scene.id === selectedSceneId);
    if (index === -1) return;
    plan.scenes[index] = State.updateScene(plan.scenes[index], changes);
    save(message);
    render();
  }

  function bindProjectInputs() {
    [
      ["projectTitle", "title"],
      ["projectGoal", "goal"],
      ["projectFormat", "format"],
      ["projectAudience", "audience"],
    ].forEach(([id, field]) => {
      els[id].addEventListener("input", () => {
        plan.project[field] = els[id].value;
        save();
      });
    });
  }

  function bindSceneInputs() {
    [
      ["sceneTitle", "title"],
      ["sceneSummary", "summary"],
      ["sceneLocation", "location"],
    ].forEach(([id, field]) => {
      els[id].addEventListener("input", () => updateCurrentScene({ [field]: els[id].value }));
    });
  }

  function bindEditorInputs() {
    const simple = [
      ["shotNumber", "shotNumber"],
      ["shotStatus", "status"],
      ["shotTitle", "title"],
      ["shotScene", "sceneId"],
      ["shotDescription", "description"],
      ["shotPrompt", "prompt"],
      ["shotTool", "tool"],
      ["shotModel", "model"],
      ["shotDuration", "duration"],
      ["shotNotes", "notes"],
    ];
    simple.forEach(([id, field]) => {
      els[id].addEventListener("input", () => updateCurrentShot({ [field]: els[id].value }));
      els[id].addEventListener("change", () => updateCurrentShot({ [field]: els[id].value }));
    });

    [
      ["assetImage", "image"],
      ["assetVideo", "video"],
      ["assetReference", "reference"],
    ].forEach(([id, field]) => {
      els[id].addEventListener("input", () => updateCurrentShot({ assetPaths: { [field]: els[id].value } }));
    });

    [
      ["continuityCharacter", "character"],
      ["continuityOutfit", "outfit"],
      ["continuityLocation", "location"],
      ["continuityMood", "mood"],
      ["continuityCameraStyle", "cameraStyle"],
    ].forEach(([id, field]) => {
      els[id].addEventListener("input", () => updateCurrentShot({ continuity: { [field]: els[id].value } }));
    });
  }

  function bindFilters() {
    [els.search, els.statusFilter, els.sceneFilter, els.toolFilter].forEach((control) => {
      control.addEventListener("input", renderShots);
      control.addEventListener("change", renderShots);
    });
  }

  function bindActions() {
    els.addScene.addEventListener("click", () => {
      const order = plan.scenes.length + 1;
      const scene = State.createScene({
        title: `Scene ${order}`,
        summary: "New production beat.",
        location: "Add location or set notes here.",
        order,
      });
      plan.scenes.push(scene);
      selectedSceneId = scene.id;
      save("Scene added");
      render();
    });

    els.addShot.addEventListener("click", () => {
      const scene = selectedScene();
      const shot = State.createShot({
        sceneId: scene ? scene.id : "",
        shotNumber: `${scene ? scene.order : 1}.${plan.shots.length + 1}`,
        title: "New shot",
        status: "idea",
        tool: "Runway",
        continuity: plan.project.continuity,
      });
      plan.shots.push(shot);
      selectedShotId = shot.id;
      selectedSceneId = shot.sceneId;
      save("Shot added");
      render();
    });

    els.deleteShot.addEventListener("click", () => {
      if (!selectedShotId) return;
      const shot = selectedShot();
      const label = shot ? `${shot.shotNumber} ${shot.title}` : "this shot";
      if (!window.confirm(`Delete ${label}? You can undo this immediately after deletion.`)) return;
      const result = State.deleteShotWithUndo(plan, selectedShotId);
      plan = result.plan;
      lastDeletedShot = result.deletedShot ? { shot: result.deletedShot, index: result.deletedIndex } : null;
      selectedShotId = plan.shots.find((item) => item.sceneId === selectedSceneId)?.id || (plan.shots[0] ? plan.shots[0].id : "");
      save("Shot deleted. Undo is available.");
      render();
    });

    els.undoDelete.addEventListener("click", () => {
      if (!lastDeletedShot) return;
      plan = State.restoreDeletedShot(plan, lastDeletedShot.shot, lastDeletedShot.index);
      selectedShotId = lastDeletedShot.shot.id;
      selectedSceneId = lastDeletedShot.shot.sceneId;
      lastDeletedShot = null;
      save("Shot restored");
      render();
    });

    els.exportMarkdown.addEventListener("click", () => download("creator-os-shot-plan.md", State.exportToMarkdown(plan), "text/markdown"));
    els.exportCsv.addEventListener("click", () => download("creator-os-shot-plan.csv", State.exportToCsv(plan), "text/csv"));
    els.exportJson.addEventListener("click", () => download("creator-os-shot-plan.json", State.exportToJson(plan), "application/json"));
    els.importJson.addEventListener("click", () => els.importFile.click());
    els.importFile.addEventListener("change", () => {
      const file = els.importFile.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        try {
          const result = State.importShotPlan(plan, reader.result, els.importMode.value);
          plan = result.plan;
          selectedSceneId = plan.scenes[0] ? plan.scenes[0].id : "";
          selectedShotId = plan.shots[0] ? plan.shots[0].id : "";
          lastDeletedShot = null;
          save(result.summary);
          render();
        } catch (error) {
          showToast(error.message || "Import failed");
        } finally {
          els.importFile.value = "";
        }
      });
      reader.readAsText(file);
    });
    els.resetDemo.addEventListener("click", () => {
      plan = State.resetDemoPlan();
      selectedSceneId = plan.scenes[0].id;
      selectedShotId = plan.shots[0].id;
      lastDeletedShot = null;
      save("Demo restored");
      render();
    });
  }

  function download(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`${filename} exported`);
  }

  fillOptions();
  fillSceneOptions();
  bindProjectInputs();
  bindSceneInputs();
  bindEditorInputs();
  bindFilters();
  bindActions();
  render();
})();

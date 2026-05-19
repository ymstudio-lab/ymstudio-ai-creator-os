const assert = require("node:assert/strict");
const fs = require("node:fs");
const State = require("./state.js");

function testCreateSceneAndShotObjects() {
  const scene = State.createScene({ title: "Opening hook", summary: "Creator desk chaos", order: 2 });
  const shot = State.createShot({
    sceneId: scene.id,
    shotNumber: "2.1",
    title: "Runway opener",
    prompt: "Creator desk overhead shot",
    tool: "Runway",
    status: "prompt ready",
    continuity: { character: "Founder hands", outfit: "Ivory blazer" },
  });

  assert.ok(scene.id);
  assert.ok(shot.id);
  assert.equal(scene.title, "Opening hook");
  assert.equal(shot.sceneId, scene.id);
  assert.equal(shot.status, "prompt ready");
  assert.equal(shot.continuity.character, "Founder hands");
}

function testUpdateShotFields() {
  const shot = State.createShot({ title: "Draft", status: "idea", tool: "Pika" });
  const updated = State.updateShot(shot, {
    title: "Approved founder close",
    status: "approved",
    tool: "Kling",
    assetPaths: { video: "exports/kling/founder-close.mp4" },
    continuity: { mood: "Confident" },
  });

  assert.equal(updated.id, shot.id);
  assert.equal(updated.title, "Approved founder close");
  assert.equal(updated.status, "approved");
  assert.equal(updated.tool, "Kling");
  assert.equal(updated.assetPaths.video, "exports/kling/founder-close.mp4");
  assert.equal(updated.continuity.mood, "Confident");
}

function testUpdateSceneFields() {
  const scene = State.createScene({ title: "Old title", summary: "Old summary", location: "Desk" });
  const updated = State.updateScene(scene, {
    title: "Studio reveal",
    summary: "Show the planner board",
    location: "Seoul creator studio",
  });

  assert.equal(updated.id, scene.id);
  assert.equal(updated.title, "Studio reveal");
  assert.equal(updated.summary, "Show the planner board");
  assert.equal(updated.location, "Seoul creator studio");
}

function testFilterShotsByStatusToolSceneAndText() {
  const scenes = [
    State.createScene({ id: "scene_a", title: "Hook", order: 1 }),
    State.createScene({ id: "scene_b", title: "Payoff", order: 2 }),
  ];
  const shots = [
    State.createShot({
      sceneId: "scene_a",
      title: "Runway desk chaos",
      prompt: "Overhead creator desk",
      status: "approved",
      tool: "Runway",
    }),
    State.createShot({
      sceneId: "scene_b",
      title: "Claude plan",
      prompt: "Storyboard summary for continuity",
      status: "prompt ready",
      tool: "Claude",
    }),
  ];

  assert.equal(State.filterShots(shots, { status: "approved" }, scenes).length, 1);
  assert.equal(State.filterShots(shots, { tool: "Claude" }, scenes)[0].title, "Claude plan");
  assert.equal(State.filterShots(shots, { sceneId: "scene_a" }, scenes)[0].tool, "Runway");
  assert.equal(State.filterShots(shots, { query: "continuity" }, scenes)[0].tool, "Claude");
}

function testContinuitySummaryValidation() {
  const plan = State.createPlan({
    project: { title: "Continuity test" },
    scenes: [State.createScene({ id: "scene_1", title: "Only scene" })],
    shots: [
      State.createShot({
        sceneId: "scene_1",
        shotNumber: "1.1",
        title: "Missing fields",
        continuity: {
          character: "Founder",
          outfit: "",
          location: "Studio",
          mood: "Focused",
          cameraStyle: "",
        },
      }),
    ],
  });
  const summary = State.continuitySummary(plan);

  assert.equal(summary.isComplete, false);
  assert.equal(summary.missing.includes("1.1 Missing fields: outfit"), true);
  assert.equal(summary.missing.includes("1.1 Missing fields: cameraStyle"), true);
}

function testExportFormatting() {
  const plan = State.resetDemoPlan();
  const markdown = State.exportToMarkdown(plan);
  const csv = State.exportToCsv(plan);

  assert.equal(markdown.includes("# Creator OS 런칭 Shorts"), true);
  assert.equal(markdown.includes("## Continuity Bible"), true);
  assert.equal(markdown.includes("### 1.1 책상 위 혼란 오프닝"), true);
  assert.equal(csv.startsWith("Scene,Shot,Title,Status,Tool"), true);
  assert.equal(csv.includes("제작 준비 완료 클로징"), true);
}

function testDeleteShotWithUndo() {
  const plan = State.createPlan({
    project: { title: "Delete test" },
    scenes: [State.createScene({ id: "scene_1", title: "Scene" })],
    shots: [
      State.createShot({ id: "shot_a", sceneId: "scene_1", title: "Keep" }),
      State.createShot({ id: "shot_b", sceneId: "scene_1", title: "Delete me" }),
    ],
  });

  const deleted = State.deleteShotWithUndo(plan, "shot_b");
  assert.equal(deleted.plan.shots.length, 1);
  assert.equal(deleted.deletedShot.title, "Delete me");
  assert.equal(deleted.deletedIndex, 1);

  const restored = State.restoreDeletedShot(deleted.plan, deleted.deletedShot, deleted.deletedIndex);
  assert.equal(restored.shots.length, 2);
  assert.equal(restored.shots[1].id, "shot_b");
}

function testJsonExportImportReplaceAndMerge() {
  const base = State.createPlan({
    project: { title: "Base plan" },
    scenes: [State.createScene({ id: "scene_base", title: "Base scene" })],
    shots: [State.createShot({ id: "shot_base", sceneId: "scene_base", title: "Base shot" })],
  });
  const incoming = State.createPlan({
    project: { title: "Imported plan" },
    scenes: [State.createScene({ id: "scene_import", title: "Imported scene", location: "Studio B" })],
    shots: [State.createShot({ id: "shot_import", sceneId: "scene_import", title: "Imported shot" })],
  });
  const json = State.exportToJson(incoming);

  const replaced = State.importShotPlan(base, json, "replace");
  assert.equal(replaced.plan.project.title, "Imported plan");
  assert.equal(replaced.plan.scenes.length, 1);
  assert.equal(replaced.plan.scenes[0].location, "Studio B");

  const merged = State.importShotPlan(base, json, "merge");
  assert.equal(merged.plan.project.title, "Base plan");
  assert.equal(merged.plan.scenes.length, 2);
  assert.equal(merged.plan.shots.length, 2);
  assert.equal(merged.summary.includes("Merged 1 scenes and 1 shots"), true);
}

function testEmptyPlanDoesNotRestoreDemoShots() {
  const empty = State.createPlan({ project: { title: "Empty" }, scenes: [], shots: [] });
  assert.equal(empty.scenes.length, 0);
  assert.equal(empty.shots.length, 0);
}

function testLocalStoragePayloadNormalization() {
  const memory = {};
  const storage = {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
    },
    setItem(key, value) {
      memory[key] = value;
    },
  };

  const rawPlan = {
    project: { title: "Raw imported plan" },
    scenes: [{ id: "scene_raw", title: "Raw scene", order: "3" }],
    shots: [{ sceneId: "missing_scene", title: "", status: "bad status", tool: "" }],
  };
  State.savePlan(storage, rawPlan);
  const loaded = State.loadPlan(storage);

  assert.equal(loaded.project.title, "Raw imported plan");
  assert.equal(loaded.scenes[0].order, 3);
  assert.equal(loaded.shots[0].title, "Untitled shot");
  assert.equal(loaded.shots[0].status, "idea");
  assert.equal(loaded.shots[0].sceneId, "scene_raw");
}

function testStaticUiSmokeTargets() {
  const html = fs.readFileSync("index.html", "utf8");
  const app = fs.readFileSync("app.js", "utf8");

  [
    "projectTitle",
    "sceneList",
    "shotList",
    "shotForm",
    "search",
    "statusFilter",
    "sceneFilter",
    "toolFilter",
    "exportMarkdown",
    "exportCsv",
    "exportJson",
    "importMode",
    "importJson",
    "importFile",
    "sceneForm",
    "sceneTitle",
    "sceneSummary",
    "sceneLocation",
    "deleteSafety",
    "undoDelete",
    "toast",
  ].forEach((id) => {
    assert.equal(html.includes(`id="${id}"`), true, `index.html should include #${id}`);
    assert.equal(app.includes(`#${id}`), true, `app.js should bind #${id}`);
  });
}

const tests = [
  testCreateSceneAndShotObjects,
  testUpdateShotFields,
  testUpdateSceneFields,
  testFilterShotsByStatusToolSceneAndText,
  testContinuitySummaryValidation,
  testExportFormatting,
  testDeleteShotWithUndo,
  testJsonExportImportReplaceAndMerge,
  testEmptyPlanDoesNotRestoreDemoShots,
  testLocalStoragePayloadNormalization,
  testStaticUiSmokeTargets,
];

for (const test of tests) {
  test();
}

console.log(`Passed ${tests.length} AI Shot Planner tests.`);

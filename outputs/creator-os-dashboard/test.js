const assert = require("assert");
const fs = require("fs");
const path = require("path");
const state = require("./state.js");

const dashboardDir = __dirname;

function testModuleDefinitions() {
  assert.strictEqual(state.modules.length, 10, "expected ten creator modules");
  const ids = state.modules.map((module) => module.id).sort();
  assert.deepStrictEqual(ids, [
    "ai-shot-planner",
    "api-cost-tracker",
    "character-consistency-tool",
    "comfyui-workflow-manager",
    "creator-asset-manager",
    "creator-prompt-board",
    "script-generator",
    "template-library",
    "thumbnail-idea-board",
    "youtube-calendar",
  ]);
}

function testLinksExist() {
  state.modules.forEach((module) => {
    const folderPath = path.resolve(dashboardDir, module.outputFolder);
    const indexPath = path.resolve(dashboardDir, module.link);
    assert.ok(fs.existsSync(folderPath), `${module.name} output folder should exist`);
    assert.ok(fs.existsSync(indexPath), `${module.name} index.html should exist`);
  });
}

function testWorkflowFiltering() {
  assert.strictEqual(state.filterModules("", "All").length, 10);
  assert.deepStrictEqual(
    state.filterModules("", "All").map((module) => module.id),
    [
      "template-library",
      "script-generator",
      "creator-prompt-board",
      "comfyui-workflow-manager",
      "character-consistency-tool",
      "ai-shot-planner",
      "thumbnail-idea-board",
      "youtube-calendar",
      "creator-asset-manager",
      "api-cost-tracker",
    ]
  );
  assert.deepStrictEqual(
    state.filterModules("", "Publishing").map((module) => module.id).sort(),
    ["thumbnail-idea-board", "youtube-calendar"]
  );
  assert.deepStrictEqual(
    state.filterModules("썸네일 아이디어", "All", "ko").map((module) => module.id),
    ["thumbnail-idea-board"]
  );
  assert.ok(state.filterModules("자산", "All", "ko").some((module) => module.id === "creator-asset-manager"));
  assert.ok(state.filterModules("template library", "All").some((module) => module.id === "template-library"));
  assert.ok(state.filterModules("script generator", "All").some((module) => module.id === "script-generator"));
  assert.strictEqual(state.getWorkflowAreas("ko")[0].label, "전체");
}

function testStatusSummary() {
  const summary = state.getStatusSummary();
  assert.strictEqual(summary.total, 10);
  assert.strictEqual(summary.finalVerified, 10);
}

function testPlannedModules() {
  assert.strictEqual(state.plannedModules.length, 0);
  assert.deepStrictEqual(state.getLocalizedPlannedModules("ko"), []);
  assert.strictEqual(state.getCopy("ko").comingSoon, "준비 중");
}

function testGithubChecklistData() {
  const checklist = state.getGithubChecklist();
  const koreanChecklist = state.getLocalizedChecklist("ko");
  assert.ok(Array.isArray(checklist));
  assert.ok(checklist.length >= 5, "GitHub publishing checklist should have publish steps");
  assert.ok(checklist.some((item) => item.toLowerCase().includes("privacy")));
  assert.ok(koreanChecklist.some((item) => item.includes("보안")));
  assert.strictEqual(state.getCopy("ko").openModule, "모듈 열기");
  assert.strictEqual(state.getCopy("ko").localReady, "로컬 사용 준비 완료");
}

function testStaticUiBindings() {
  const index = fs.readFileSync(path.join(dashboardDir, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(dashboardDir, "app.js"), "utf8");
  [
    "data-module-grid",
    "data-planned-grid",
    "data-search",
    "data-workflow",
    "data-language",
    "data-i18n",
    "data-summary",
    "data-project-field",
    "data-save-project",
    "data-workflow-steps",
    "data-progress-grid",
    "data-ops-grid",
    "data-planned-section",
    "data-detect-hardware",
    "data-recommend-setup",
    "data-performance-tier",
    "data-setup-recommendation",
    "ROADMAP.md",
    "PUBLISHING_CHECKLIST.md",
    "state.js",
    "app.js",
  ].forEach((token) => {
    assert.ok(index.includes(token), `index.html should include ${token}`);
  });
  ["textContent", "createElement", "addEventListener", "filterModules", "ymstudio.creatorOS.language", "ymstudio.creatorProject.v1", "downloadProject", "importProjectFile", "renderProgress", "renderOpsDashboard", "makeOpsCard", "data-ops-export-project", "detectHardware", "renderSetupRecommendation", "navigator.hardwareConcurrency", "navigator.deviceMemory"].forEach((token) => {
    assert.ok(app.includes(token), `app.js should include ${token}`);
  });
  assert.ok(!app.includes("innerHTML"), "app.js should avoid unsafe raw HTML rendering");
  assert.ok(!app.includes("queueIds"), "dashboard should not expose internal queue ids");
}

[
  testModuleDefinitions,
  testLinksExist,
  testWorkflowFiltering,
  testStatusSummary,
  testPlannedModules,
  testGithubChecklistData,
  testStaticUiBindings,
].forEach((test) => test());

console.log("creator-os-dashboard tests passed (7)");

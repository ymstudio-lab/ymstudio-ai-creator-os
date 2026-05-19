const assert = require("assert");
const fs = require("fs");
const path = require("path");
const state = require("./state.js");

const dashboardDir = __dirname;

function testModuleDefinitions() {
  assert.strictEqual(state.modules.length, 7, "expected seven creator modules");
  const ids = state.modules.map((module) => module.id).sort();
  assert.deepStrictEqual(ids, [
    "ai-shot-planner",
    "api-cost-tracker",
    "creator-asset-manager",
    "creator-prompt-board",
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
  assert.strictEqual(state.filterModules("", "All").length, 7);
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
  assert.strictEqual(state.getWorkflowAreas("ko")[0].label, "전체");
}

function testStatusSummary() {
  const summary = state.getStatusSummary();
  assert.strictEqual(summary.total, 7);
  assert.strictEqual(summary.finalVerified, 7);
}

function testPlannedModules() {
  assert.strictEqual(state.plannedModules.length, 4);
  assert.deepStrictEqual(
    state.plannedModules.map((module) => module.id),
    [
      "character-consistency-tool",
      "comfyui-workflow-manager",
      "script-generator",
      "creator-dashboard-upgrade",
    ]
  );
  assert.strictEqual(state.getLocalizedPlannedModules("ko")[0].name, "캐릭터 일관성 도구");
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
    "data-checklist",
    "data-roadmap",
    "data-architecture",
    "state.js",
    "app.js",
  ].forEach((token) => {
    assert.ok(index.includes(token), `index.html should include ${token}`);
  });
  ["textContent", "createElement", "addEventListener", "filterModules", "ymstudio.creatorOS.language"].forEach((token) => {
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

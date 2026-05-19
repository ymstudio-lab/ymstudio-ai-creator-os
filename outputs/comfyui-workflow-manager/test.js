const assert = require("assert");
const State = require("./state.js");

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

function testCreateWorkflowDefaults() {
  const workflow = State.createWorkflow({ name: "  Test  ", type: "bad", tier: "bad", steps: "bad" });
  assert.strictEqual(workflow.name, "Test");
  assert.strictEqual(workflow.type, "Text to Image");
  assert.strictEqual(workflow.tier, "저사양/API 보조");
  assert.strictEqual(workflow.steps, 20);
  assert.ok(workflow.id.startsWith("comfy_"));
}

function testFiltering() {
  const workflows = State.demoWorkflows.map(State.createWorkflow);
  assert.ok(State.filterWorkflows(workflows, { query: "저사양" }).length >= 1);
  assert.ok(State.filterWorkflows(workflows, { type: "Upscale" }).every((workflow) => workflow.type === "Upscale"));
  assert.ok(State.filterWorkflows(workflows, { tier: "중간 사양" }).every((workflow) => workflow.tier === "중간 사양"));
  assert.ok(State.filterWorkflows(workflows, { favoriteOnly: true }).every((workflow) => workflow.favorite));
}

function testBuildFromProject() {
  const workflow = State.buildFromProject({
    videoTopic: "AI 영상 제작",
    targetAudience: "초보자",
    videoGoal: "워크플로우 안내",
    platform: "YouTube Shorts",
    tone: "차분하게",
    aiTools: "Claude, ComfyUI",
  });
  assert.ok(workflow.name.includes("AI 영상 제작"));
  assert.strictEqual(workflow.type, "Image to Video");
  assert.strictEqual(workflow.size, "768x1344");
  assert.ok(workflow.context.includes("초보자"));
}

function testFormatWorkflow() {
  const workflow = State.createWorkflow({ name: "레시피", positive: "positive", negative: "negative" });
  const text = State.formatWorkflow(workflow);
  assert.ok(text.includes("이름: 레시피"));
  assert.ok(text.includes("Positive Prompt:"));
  assert.ok(text.includes("negative"));
}

function testSummary() {
  const summary = State.getSummary(State.demoWorkflows.map(State.createWorkflow));
  assert.strictEqual(summary.total, State.demoWorkflows.length);
  assert.ok(summary.stable >= 1);
  assert.ok(summary.favorites >= 1);
}

function testStorageRoundTrip() {
  const storage = memoryStorage();
  const workflows = State.demoWorkflows.map(State.createWorkflow);
  State.saveWorkflows(storage, workflows);
  const loaded = State.loadWorkflows(storage);
  assert.strictEqual(loaded.length, workflows.length);
  assert.strictEqual(loaded[0].name, workflows[0].name);
}

function testExportImportRoundTrip() {
  const workflows = State.demoWorkflows.map(State.createWorkflow);
  const exported = State.exportWorkflows(workflows);
  const imported = State.parseWorkflowImport(JSON.stringify(exported));
  assert.strictEqual(imported.length, workflows.length);
  assert.strictEqual(imported[0].name, workflows[0].name);
}

function testInvalidImport() {
  assert.throws(() => State.parseWorkflowImport("{}"), /Invalid ComfyUI workflow export/);
}

[
  testCreateWorkflowDefaults,
  testFiltering,
  testBuildFromProject,
  testFormatWorkflow,
  testSummary,
  testStorageRoundTrip,
  testExportImportRoundTrip,
  testInvalidImport,
].forEach((test) => test());

console.log("Passed 8 ComfyUI Workflow Manager tests.");

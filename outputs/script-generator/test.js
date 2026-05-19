const assert = require("assert");
const State = require("./state.js");

function testCreateScriptDefaults() {
  const script = State.createScript({ title: "  Test  ", format: "bad", status: "bad" });
  assert.strictEqual(script.title, "Test");
  assert.strictEqual(script.format, "YouTube Long");
  assert.strictEqual(script.status, "idea");
  assert.ok(script.id.startsWith("script_"));
}

function testSceneNormalization() {
  const script = State.createScript({ scenes: "1. Intro\n2. Demo\n- CTA" });
  assert.deepStrictEqual(script.scenes, ["Intro", "Demo", "CTA"]);
}

function testFiltering() {
  const scripts = State.demoScripts.map(State.createScript);
  assert.ok(State.filterScripts(scripts, { query: "초보자" }).length >= 1);
  assert.ok(State.filterScripts(scripts, { format: "Shorts" }).every((script) => script.format === "Shorts"));
  assert.ok(State.filterScripts(scripts, { status: "ready" }).every((script) => script.status === "ready"));
  assert.ok(State.filterScripts(scripts, { favoriteOnly: true }).every((script) => script.favorite));
}

function testUpdatePreservesIdentity() {
  const script = State.createScript({ title: "A" });
  const updated = State.updateScript(script, { title: "B" });
  assert.strictEqual(updated.id, script.id);
  assert.strictEqual(updated.createdAt, script.createdAt);
  assert.strictEqual(updated.title, "B");
}

function testFormatScript() {
  const script = State.createScript({ title: "Hook", scenes: ["A", "B"], cta: "Go" });
  const text = State.formatScript(script);
  assert.ok(text.includes("제목: Hook"));
  assert.ok(text.includes("1. A"));
  assert.ok(text.includes("CTA: Go"));
}

function testBuildFromProject() {
  const script = State.buildFromProject({
    channelName: "YMSTUDIO",
    videoTopic: "AI 영상 제작",
    targetAudience: "초보자",
    videoGoal: "작업 순서 소개",
    platform: "YouTube Shorts",
  });
  assert.strictEqual(script.title, "AI 영상 제작");
  assert.strictEqual(script.format, "Shorts");
  assert.ok(script.audience.includes("초보자"));
}

function testSummary() {
  const summary = State.getSummary(State.demoScripts.map(State.createScript));
  assert.strictEqual(summary.total, State.demoScripts.length);
  assert.ok(summary.ready >= 1);
  assert.ok(summary.favorites >= 1);
}

function testExportImportRoundTrip() {
  const scripts = State.demoScripts.map(State.createScript);
  const exported = State.exportScripts(scripts);
  const imported = State.parseScriptImport(JSON.stringify(exported));
  assert.strictEqual(imported.length, scripts.length);
  assert.strictEqual(imported[0].title, scripts[0].title);
}

function testInvalidImport() {
  assert.throws(() => State.parseScriptImport("{}"), /Invalid script generator export/);
}

[
  testCreateScriptDefaults,
  testSceneNormalization,
  testFiltering,
  testUpdatePreservesIdentity,
  testFormatScript,
  testBuildFromProject,
  testSummary,
  testExportImportRoundTrip,
  testInvalidImport,
].forEach((test) => test());

console.log("Passed 9 Script Generator tests.");

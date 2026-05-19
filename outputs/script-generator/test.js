const assert = require("assert");
const State = require("./state.js");

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

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

function testBuildFromBrief() {
  const script = State.buildFromBrief({
    topic: "AI 영상 제작 워크플로우",
    audience: "영상 제작 초보자",
    length: "Shorts",
    tone: "빠르고 강하게",
  });
  assert.strictEqual(script.title, "AI 영상 제작 워크플로우");
  assert.strictEqual(script.format, "Shorts");
  assert.strictEqual(script.tone, "빠르고 강하게");
  assert.ok(script.hook.includes("AI 영상 제작 워크플로우"));
  assert.ok(script.scenes.length >= 4);
  assert.ok(script.cta);
}

function testScriptToShotPlan() {
  const script = State.createScript({ title: "대본", scenes: ["첫 장면", "둘째 장면"], hook: "시작", cta: "저장" });
  const plan = State.scriptToShotPlan(script);
  assert.strictEqual(plan.project.title, "대본");
  assert.strictEqual(plan.scenes.length, 2);
  assert.strictEqual(plan.shots.length, 2);
  assert.strictEqual(plan.shots[0].sceneId, plan.scenes[0].id);
}

function testSendToShotPlannerMergesExistingPlan() {
  const storage = memoryStorage();
  storage.setItem(State.SHOT_PLANNER_KEY, JSON.stringify({
    version: 1,
    project: { title: "기존 계획" },
    scenes: [{ id: "scene_old", title: "기존", summary: "", location: "", order: 1 }],
    shots: [],
  }));
  const result = State.sendToShotPlanner(storage, State.createScript({ title: "새 대본", scenes: ["새 장면"] }));
  const plan = JSON.parse(storage.getItem(State.SHOT_PLANNER_KEY));
  assert.strictEqual(result.ok, true);
  assert.strictEqual(plan.project.title, "기존 계획");
  assert.strictEqual(plan.scenes.length, 2);
  assert.strictEqual(plan.shots.length, 1);
  assert.strictEqual(plan.scenes[1].order, 2);
}

function testSendToShotPlannerDoesNotOverwriteCorruptPlan() {
  const storage = memoryStorage();
  storage.setItem(State.SHOT_PLANNER_KEY, "{not json");
  const result = State.sendToShotPlanner(storage, State.createScript({ title: "새 대본", scenes: ["새 장면"] }));
  assert.strictEqual(result.ok, false);
  assert.strictEqual(storage.getItem(State.SHOT_PLANNER_KEY), "{not json");
}

function testScriptToCalendarItem() {
  const script = State.createScript({ title: "캘린더 대본", format: "Shorts", status: "ready", audience: "초보자", hook: "훅", cta: "구독" });
  const item = State.scriptToCalendarItem(script, { channelName: "YMSTUDIO" });
  assert.strictEqual(item.title, "캘린더 대본");
  assert.strictEqual(item.format, "Shorts");
  assert.strictEqual(item.channel, "YMSTUDIO");
  assert.strictEqual(item.status, "scripted");
  assert.ok(item.scriptOutline.includes("훅"));
}

function testSendToYouTubeCalendarMergesItems() {
  const storage = memoryStorage();
  storage.setItem(State.YOUTUBE_CALENDAR_KEY, JSON.stringify({
    settings: { channel: "YMSTUDIO", month: "2026-05", weeklyTarget: 3 },
    items: [{ id: "old", title: "기존", format: "Shorts", uploadDate: "2026-05-19", status: "idea" }],
  }));
  const result = State.sendToYouTubeCalendar(storage, State.createScript({ title: "새 업로드", scenes: ["장면"] }));
  const state = JSON.parse(storage.getItem(State.YOUTUBE_CALENDAR_KEY));
  assert.strictEqual(result.ok, true);
  assert.strictEqual(state.items.length, 2);
  assert.strictEqual(state.items[1].title, "새 업로드");
}

function testSendToYouTubeCalendarDoesNotOverwriteCorruptState() {
  const storage = memoryStorage();
  storage.setItem(State.YOUTUBE_CALENDAR_KEY, "{not json");
  const result = State.sendToYouTubeCalendar(storage, State.createScript({ title: "새 업로드" }));
  assert.strictEqual(result.ok, false);
  assert.strictEqual(storage.getItem(State.YOUTUBE_CALENDAR_KEY), "{not json");
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
  testBuildFromBrief,
  testScriptToShotPlan,
  testSendToShotPlannerMergesExistingPlan,
  testSendToShotPlannerDoesNotOverwriteCorruptPlan,
  testScriptToCalendarItem,
  testSendToYouTubeCalendarMergesItems,
  testSendToYouTubeCalendarDoesNotOverwriteCorruptState,
  testSummary,
  testExportImportRoundTrip,
  testInvalidImport,
].forEach((test) => test());

console.log("Passed 16 Script Generator tests.");

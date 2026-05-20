const assert = require("assert");
const fs = require("fs");
const path = require("path");
const State = require("./state.js");

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

function testDefinitions() {
  assert.ok(State.templates.length >= 30);
  ["Shorts", "Longform", "Tutorial", "Review", "Comparison", "Thumbnail", "Hook"].forEach((category) => {
    assert.ok(State.categories.includes(category));
    assert.ok(State.templates.some((item) => item.category === category));
  });
  assert.ok(State.categories.includes("SEO"));
  assert.ok(State.categories.includes("Repurposing"));
  assert.ok(State.audiences.includes("AI Video Creator"));
  assert.ok(State.audiences.includes("Educator"));
  assert.ok(State.audiences.includes("Small Business"));
  assert.ok(State.targetModules.includes("Creator Prompt Board"));
  assert.ok(State.targetModules.includes("Script Generator"));
  assert.ok(State.templates.some((item) => item.audience === "Educator"));
  assert.ok(State.templates.some((item) => item.audience === "Small Business"));
  assert.ok(State.templates.every((item) => item.resultKo || item.payload?.resultNotes || item.usage));
}

function testFiltering() {
  const localState = { ratings: {}, saved: ["thumb_before_after"] };
  assert.ok(State.filterTemplates(State.templates, { query: "thumbnail" }, localState).length >= 2);
  assert.ok(State.filterTemplates(State.templates, { category: "Thumbnail" }, localState).every((item) => item.category === "Thumbnail"));
  assert.ok(State.filterTemplates(State.templates, { category: "ComfyUI" }, localState).every((item) => item.category === "ComfyUI"));
  assert.ok(State.filterTemplates(State.templates, { savedOnly: true }, localState).every((item) => item.id === "thumb_before_after"));
  assert.ok(State.filterTemplates(State.templates, { minPopularity: 5 }, localState).every((item) => item.popularity >= 5));
}

function testRatingsAndSaved() {
  let localState = State.loadState(null);
  localState = State.setTemplateRating(localState, "x", 9);
  assert.strictEqual(State.getTemplateRating(localState, "x"), 5);
  localState = State.saveTemplate(localState, "x");
  assert.ok(localState.saved.includes("x"));
  localState = State.removeSavedTemplate(localState, "x");
  assert.ok(!localState.saved.includes("x"));
}

function testFormatTemplate() {
  const text = State.formatTemplate(State.templates[0]);
  assert.ok(text.includes(State.templates[0].title));
  assert.ok(text.includes("Payload"));
}

function testPromptBoardImport() {
  const storage = memoryStorage();
  const template = State.templates.find((item) => item.targetModule === "Creator Prompt Board");
  const result = State.importToModule(storage, template);
  assert.strictEqual(result.ok, true);
  const prompts = JSON.parse(storage.getItem(State.PROMPT_BOARD_KEY));
  assert.strictEqual(prompts.length, 1);
  assert.ok(prompts[0].title);
}

function testThumbnailImport() {
  const storage = memoryStorage();
  const template = State.templates.find((item) => item.targetModule === "Thumbnail Idea Board");
  const result = State.importToModule(storage, template);
  assert.strictEqual(result.ok, true);
  const ideas = JSON.parse(storage.getItem(State.THUMBNAIL_BOARD_KEY));
  assert.strictEqual(ideas.length, 1);
  assert.ok(ideas[0].prompt);
}

function testScriptGeneratorImport() {
  const storage = memoryStorage();
  const template = State.templates.find((item) => item.targetModule === "Script Generator");
  const result = State.importToModule(storage, template);
  assert.strictEqual(result.ok, true);
  const scripts = JSON.parse(storage.getItem(State.SCRIPT_GENERATOR_KEY));
  assert.strictEqual(scripts.length, 1);
  assert.ok(scripts[0].hook);
}

function testImportHandlesCorruptTargetData() {
  const storage = memoryStorage();
  storage.setItem(State.PROMPT_BOARD_KEY, "{not json");
  const template = State.templates.find((item) => item.targetModule === "Creator Prompt Board");
  const result = State.importToModule(storage, template);
  assert.strictEqual(result.ok, false);
  assert.ok(result.message.includes("not valid JSON"));
}

function testExportImportState() {
  const state = { ratings: { a: 4 }, saved: ["a"] };
  const exported = State.exportLibrary(state);
  const imported = State.parseLibraryImport(JSON.stringify(exported));
  assert.strictEqual(imported.ratings.a, 4);
  assert.deepStrictEqual(imported.saved, ["a"]);
}

function testBeginnerPicksUiBindings() {
  const index = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
  assert.ok(index.includes("data-beginner-picks"));
  assert.ok(index.includes("처음이면 이 3개부터"));
  assert.ok(app.includes("beginnerPickIds"));
  assert.ok(app.includes("classic_video_hook_map"));
  assert.ok(app.includes("script_hook_loop"));
  assert.ok(app.includes("thumb_emotion_contrast"));
  assert.ok(app.includes("beginnerPickReasons"));
  assert.ok(app.includes("영상 주제의 첫 문장과 시청 이유"));
  assert.ok(app.includes("scrollIntoView"));
}

function testResultUiBindings() {
  const index = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
  assert.ok(index.includes("detailResult"));
  assert.ok(index.includes("이 템플릿으로 얻는 결과"));
  assert.ok(app.includes("detailResult"));
  assert.ok(app.includes("resultKo"));
}

[
  testDefinitions,
  testFiltering,
  testRatingsAndSaved,
  testFormatTemplate,
  testPromptBoardImport,
  testThumbnailImport,
  testScriptGeneratorImport,
  testImportHandlesCorruptTargetData,
  testExportImportState,
  testBeginnerPicksUiBindings,
  testResultUiBindings,
].forEach((test) => test());

console.log("Passed 11 Template Library tests.");

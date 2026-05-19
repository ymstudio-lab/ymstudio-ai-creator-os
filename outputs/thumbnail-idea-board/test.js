const assert = require("assert");
const State = require("./state.js");

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

function testCreateIdeaDefaults() {
  const idea = State.createIdea({ title: "  Test  ", score: 99, status: "bad" });
  assert.strictEqual(idea.title, "Test");
  assert.strictEqual(idea.score, 5);
  assert.strictEqual(idea.status, "idea");
  assert.ok(idea.id.startsWith("thumb_"));
}

function testFiltering() {
  const ideas = State.demoIdeas.map(State.createIdea);
  assert.ok(State.filterIdeas(ideas, { query: "비용" }).length >= 1);
  assert.ok(State.filterIdeas(ideas, { format: "Course" }).every((idea) => idea.format === "Course"));
  assert.ok(State.filterIdeas(ideas, { status: "ready" }).every((idea) => idea.status === "ready"));
  assert.ok(State.filterIdeas(ideas, { favoriteOnly: true }).every((idea) => idea.favorite));
  assert.ok(State.filterIdeas(ideas, { minScore: 5 }).every((idea) => idea.score >= 5));
}

function testUpdatePreservesIdentity() {
  const idea = State.createIdea({ title: "A", score: 2 });
  const updated = State.updateIdea(idea, { title: "B", score: 4 });
  assert.strictEqual(updated.id, idea.id);
  assert.strictEqual(updated.createdAt, idea.createdAt);
  assert.strictEqual(updated.title, "B");
  assert.strictEqual(updated.score, 4);
}

function testPromptText() {
  const idea = State.createIdea({ title: "Hook", subject: "Face", overlayText: "Click", prompt: "clean thumbnail" });
  const text = State.makePrompt(idea);
  assert.ok(text.includes("Hook"));
  assert.ok(text.includes("Face"));
  assert.ok(text.includes("clean thumbnail"));
}

function testSummary() {
  const summary = State.getSummary(State.demoIdeas.map(State.createIdea));
  assert.strictEqual(summary.total, State.demoIdeas.length);
  assert.ok(summary.ready >= 1);
  assert.ok(summary.favorites >= 1);
  assert.ok(summary.averageScore > 0);
}

function testExportImportRoundTrip() {
  const ideas = State.demoIdeas.map(State.createIdea);
  const exported = State.exportIdeas(ideas);
  const imported = State.parseIdeaImport(JSON.stringify(exported));
  assert.strictEqual(imported.length, ideas.length);
  assert.strictEqual(imported[0].title, ideas[0].title);
}

function testInvalidImport() {
  assert.throws(() => State.parseIdeaImport("{}"), /Invalid thumbnail idea export/);
}

function testIdeaToCalendarItem() {
  const idea = State.createIdea({ title: "Thumb", format: "YouTube Shorts", status: "ready", prompt: "image prompt" });
  const item = State.ideaToCalendarItem(idea);
  assert.strictEqual(item.title, "Thumb");
  assert.strictEqual(item.format, "Shorts");
  assert.strictEqual(item.status, "assets ready");
  assert.ok(item.thumbnailPrompts[0].includes("image prompt"));
}

function testSendToCalendarMergesItems() {
  const storage = memoryStorage();
  storage.setItem(State.YOUTUBE_CALENDAR_KEY, JSON.stringify({ settings: { channel: "YMSTUDIO", month: "2026-05", weeklyTarget: 5 }, items: [] }));
  const result = State.sendToYouTubeCalendar(storage, State.createIdea({ title: "Thumb", prompt: "image prompt" }));
  const state = JSON.parse(storage.getItem(State.YOUTUBE_CALENDAR_KEY));
  assert.strictEqual(result.ok, true);
  assert.strictEqual(state.items.length, 1);
  assert.strictEqual(state.items[0].title, "Thumb");
}

[
  testCreateIdeaDefaults,
  testFiltering,
  testUpdatePreservesIdentity,
  testPromptText,
  testSummary,
  testExportImportRoundTrip,
  testInvalidImport,
  testIdeaToCalendarItem,
  testSendToCalendarMergesItems,
].forEach((test) => test());

console.log("Passed 9 Thumbnail Idea Board tests.");

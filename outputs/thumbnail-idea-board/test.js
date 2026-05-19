const assert = require("assert");
const State = require("./state.js");

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

[
  testCreateIdeaDefaults,
  testFiltering,
  testUpdatePreservesIdentity,
  testPromptText,
  testSummary,
  testExportImportRoundTrip,
  testInvalidImport,
].forEach((test) => test());

console.log("Passed 7 Thumbnail Idea Board tests.");

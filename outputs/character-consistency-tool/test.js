const assert = require("assert");
const State = require("./state.js");

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

function testCreateCharacterDefaults() {
  const character = State.createCharacter({ name: "  Test  ", role: "bad", status: "bad" });
  assert.strictEqual(character.name, "Test");
  assert.strictEqual(character.role, "Main Character");
  assert.strictEqual(character.status, "draft");
  assert.ok(character.id.startsWith("char_"));
}

function testFiltering() {
  const characters = State.demoCharacters.map(State.createCharacter);
  assert.ok(State.filterCharacters(characters, { query: "진행자" }).length >= 1);
  assert.ok(State.filterCharacters(characters, { role: "Host" }).every((character) => character.role === "Host"));
  assert.ok(State.filterCharacters(characters, { status: "locked" }).every((character) => character.status === "locked"));
  assert.ok(State.filterCharacters(characters, { favoriteOnly: true }).every((character) => character.favorite));
}

function testBuildFromProject() {
  const character = State.buildFromProject({
    videoTopic: "AI 영상 제작",
    tone: "쉽고 차분하게",
    aiTools: "ComfyUI, Claude",
  });
  assert.ok(character.name.includes("AI 영상 제작"));
  assert.strictEqual(character.role, "Host");
  assert.ok(character.positive.includes("consistent character"));
  assert.ok(character.failureFixes.includes("캐릭터"));
}

function testFormatCharacter() {
  const character = State.createCharacter({ name: "캐릭터", face: "둥근 얼굴", positive: "same face" });
  const text = State.formatCharacter(character);
  assert.ok(text.includes("이름: 캐릭터"));
  assert.ok(text.includes("얼굴: 둥근 얼굴"));
  assert.ok(text.includes("Positive Prompt:"));
}

function testUpdatedAtCanAdvance() {
  const character = State.createCharacter({ name: "A", updatedAt: "2026-01-01T00:00:00.000Z" });
  const updated = State.createCharacter({ ...character, name: "B", updatedAt: "2026-01-02T00:00:00.000Z" });
  assert.strictEqual(updated.id, character.id);
  assert.strictEqual(updated.name, "B");
  assert.strictEqual(updated.updatedAt, "2026-01-02T00:00:00.000Z");
}

function testSummary() {
  const summary = State.getSummary(State.demoCharacters.map(State.createCharacter));
  assert.strictEqual(summary.total, State.demoCharacters.length);
  assert.ok(summary.locked >= 1);
  assert.ok(summary.favorites >= 1);
}

function testStorageRoundTrip() {
  const storage = memoryStorage();
  const characters = State.demoCharacters.map(State.createCharacter);
  State.saveCharacters(storage, characters);
  const loaded = State.loadCharacters(storage);
  assert.strictEqual(loaded.length, characters.length);
  assert.strictEqual(loaded[0].name, characters[0].name);
}

function testExportImportRoundTrip() {
  const characters = State.demoCharacters.map(State.createCharacter);
  const exported = State.exportCharacters(characters);
  const imported = State.parseCharacterImport(JSON.stringify(exported));
  assert.strictEqual(imported.length, characters.length);
  assert.strictEqual(imported[0].name, characters[0].name);
}

function testInvalidImport() {
  assert.throws(() => State.parseCharacterImport("{}"), /Invalid character consistency export/);
}

[
  testCreateCharacterDefaults,
  testFiltering,
  testBuildFromProject,
  testFormatCharacter,
  testUpdatedAtCanAdvance,
  testSummary,
  testStorageRoundTrip,
  testExportImportRoundTrip,
  testInvalidImport,
].forEach((test) => test());

console.log("Passed 9 Character Consistency Tool tests.");

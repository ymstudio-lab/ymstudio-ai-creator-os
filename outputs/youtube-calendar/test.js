const assert = require("node:assert/strict");
const fs = require("node:fs");
const State = require("./state.js");

function testAddContentItems() {
  const items = State.addItem([], {
    title: "AI shorts idea",
    format: "Shorts",
    channel: "YMSTUDIO AI",
    uploadDate: "2026-05-19",
    titleVariants: "One\nTwo",
  });
  assert.equal(items.length, 1);
  assert.equal(items[0].title, "AI shorts idea");
  assert.equal(items[0].titleVariants.length, 2);
}

function testStatusUpdates() {
  const item = State.createItem({ title: "Status test", status: "idea" });
  const updated = State.updateStatus([item], item.id, "scheduled");
  assert.equal(updated[0].status, "scheduled");
  assert.equal(State.updateStatus(updated, item.id, "bad-status")[0].status, "scheduled");
}

function testCalendarGrouping() {
  const items = [
    State.createItem({ title: "A", uploadDate: "2026-05-01" }),
    State.createItem({ title: "B", uploadDate: "2026-05-03" }),
    State.createItem({ title: "C", uploadDate: "2026-05-15" }),
  ];
  assert.equal(State.groupByUploadDate(items, "date")["2026-05-01"].length, 1);
  assert.equal(Object.keys(State.groupByUploadDate(items, "week")).length >= 2, true);
}

function testSearchAndFilters() {
  const items = [
    State.createItem({ title: "Claude calendar", format: "Shorts", status: "idea", channel: "A", tools: ["Claude"] }),
    State.createItem({ title: "Long video", format: "long-form", status: "published", channel: "B", tools: ["CapCut"] }),
  ];
  assert.equal(State.filterItems(items, { query: "claude" }).length, 1);
  assert.equal(State.filterItems(items, { format: "long-form" })[0].title, "Long video");
  assert.equal(State.filterItems(items, { status: "published", channel: "B" }).length, 1);
}

function testExportGeneration() {
  const items = [
    State.createItem({
      title: "Export test",
      uploadDate: "2026-05-20",
      tools: ["Claude", "YouTube Studio"],
      performanceNotes: "Note, with comma",
    }),
  ];
  const csv = State.generateCsv(items);
  const markdown = State.generateMarkdown(items, { month: "2026-05", channel: "YMSTUDIO AI" });
  assert.equal(csv.includes('"Export test"'), true);
  assert.equal(csv.includes('"Note, with comma"'), true);
  assert.equal(markdown.includes("# YouTube Calendar Monthly Plan"), true);
  assert.equal(markdown.includes("Export test"), true);
}

function testStorageFallback() {
  const brokenStorage = { getItem: () => "{bad json", setItem() {} };
  assert.equal(State.loadState(brokenStorage).items.length > 0, true);
  let saved = "";
  const memoryStorage = {
    getItem: () => saved,
    setItem(_key, value) {
      saved = value;
    },
  };
  State.saveState(memoryStorage, {
    settings: { channel: "Test", month: "2026-05-19", weeklyTarget: "3" },
    items: [{ title: "Saved", uploadDate: "2026-05-21" }],
  });
  const loaded = State.loadState(memoryStorage);
  assert.equal(loaded.settings.month, "2026-05");
  assert.equal(loaded.items[0].title, "Saved");
}

function testSummary() {
  const items = [
    State.createItem({ status: "published", uploadDate: "2026-05-01" }),
    State.createItem({ status: "scheduled", uploadDate: "2026-05-02" }),
    State.createItem({ status: "editing", uploadDate: "2026-05-03" }),
  ];
  const summary = State.summarize(items, { month: "2026-05" });
  assert.equal(summary.total, 3);
  assert.equal(summary.published, 1);
  assert.equal(summary.inProduction, 1);
}

function testPipelineAndWeeklySummary() {
  const items = [
    State.createItem({ format: "Shorts", status: "scheduled", uploadDate: "2026-05-01" }),
    State.createItem({ format: "Shorts", status: "editing", uploadDate: "2026-05-02" }),
    State.createItem({ format: "long-form", status: "published", uploadDate: "2026-05-12" }),
    State.createItem({ format: "clip", status: "idea", uploadDate: "2026-06-01" }),
  ];
  const pipeline = State.summarizePipeline(items, { month: "2026-05", weeklyTarget: 3 });
  const weekly = State.weeklyPlanningSummary(items, { month: "2026-05", weeklyTarget: 3 });
  assert.equal(pipeline.total, 3);
  assert.equal(pipeline.byFormat.Shorts, 2);
  assert.equal(pipeline.byStatus.published, 1);
  assert.equal(Object.values(pipeline.byUploadWeek).reduce((sum, count) => sum + count, 0), 3);
  assert.equal(weekly[0].total, 2);
  assert.equal(weekly[0].gapToTarget, 1);
}

function testJsonImportExport() {
  const state = {
    settings: { channel: "Import Test", month: "2026-05", weeklyTarget: 4 },
    items: [State.createItem({ title: "JSON roundtrip", uploadDate: "2026-05-09", tools: "Claude, CapCut" })],
  };
  const exported = State.exportStateJson(state);
  const imported = State.importStateJson(exported);
  assert.equal(imported.settings.channel, "Import Test");
  assert.equal(imported.items[0].title, "JSON roundtrip");
  assert.equal(imported.items[0].tools.length, 2);
  assert.throws(() => State.importStateJson("{}"), /items array/);
}

function testDeleteUndoWorkflow() {
  const first = State.createItem({ title: "Keep" });
  const second = State.createItem({ title: "Delete me" });
  const result = State.deleteItemWithUndo([first, second], second.id);
  assert.equal(result.items.length, 1);
  assert.equal(result.deleted.item.title, "Delete me");
  const restored = State.restoreDeletedItem(result.items, result.deleted);
  assert.equal(restored.length, 2);
  assert.equal(restored[1].title, "Delete me");
}

function testDemoDataCoversCreatorNiches() {
  const niches = State.createDemoState().items.map((item) => item.niche.toLowerCase()).join(" ");
  ["shorts", "tools", "automation", "budget", "tutorial"].forEach((term) => {
    assert.equal(niches.includes(term), true, `demo niches should include ${term}`);
  });
}

function testStaticUiSmokeTargets() {
  const html = fs.readFileSync("index.html", "utf8");
  const app = fs.readFileSync("app.js", "utf8");
  [
    "contentForm",
    "titleInput",
    "scriptInput",
    "titleVariantsInput",
    "thumbnailPromptsInput",
    "statusFilter",
    "formatFilter",
    "calendarView",
    "weeklySummary",
    "pipelineSummary",
    "exportMarkdown",
    "exportCsv",
    "exportJson",
    "importJson",
    "importFile",
    "resetDemo",
    "toast",
  ].forEach((id) => {
    assert.equal(html.includes(`id="${id}"`), true, `index.html should include #${id}`);
    assert.equal(app.includes(`querySelector("#${id}")`), true, `app.js should bind #${id}`);
  });
}

const tests = [
  testAddContentItems,
  testStatusUpdates,
  testCalendarGrouping,
  testSearchAndFilters,
  testExportGeneration,
  testStorageFallback,
  testSummary,
  testPipelineAndWeeklySummary,
  testJsonImportExport,
  testDeleteUndoWorkflow,
  testDemoDataCoversCreatorNiches,
  testStaticUiSmokeTargets,
];

for (const test of tests) test();

console.log(`Passed ${tests.length} YouTube Calendar tests.`);

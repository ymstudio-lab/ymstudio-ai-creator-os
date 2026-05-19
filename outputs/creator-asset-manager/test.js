const assert = require("node:assert/strict");
const fs = require("node:fs");
const State = require("./state.js");

function testAddingAssets() {
  const assets = State.addAsset([], {
    title: "Hero image",
    type: "image",
    collection: "Characters",
    tags: "hero, reference",
  });
  assert.equal(assets.length, 1);
  assert.equal(assets[0].title, "Hero image");
  assert.equal(assets[0].tags.length, 2);
}

function testStatusUpdates() {
  const asset = State.createAsset({ title: "Status test", status: "new" });
  const updated = State.updateStatus([asset], asset.id, "approved");
  assert.equal(updated[0].status, "approved");
  assert.equal(State.updateStatus(updated, asset.id, "bad")[0].status, "approved");
}

function testCollectionGrouping() {
  const assets = [
    State.createAsset({ title: "A", collection: "One" }),
    State.createAsset({ title: "B", collection: "One" }),
    State.createAsset({ title: "C", collection: "Two" }),
  ];
  const groups = State.groupByCollection(assets);
  assert.equal(groups.One.length, 2);
  assert.equal(groups.Two.length, 1);
}

function testSearchAndFilters() {
  const assets = [
    State.createAsset({ title: "Prompt file", type: "prompt", status: "used", collection: "Prompts", tags: ["youtube"] }),
    State.createAsset({ title: "Motion clip", type: "video", status: "reviewed", collection: "Video", sourceTool: "Runway" }),
  ];
  assert.equal(State.filterAssets(assets, { query: "runway" }).length, 1);
  assert.equal(State.filterAssets(assets, { type: "prompt" })[0].title, "Prompt file");
  assert.equal(State.filterAssets(assets, { status: "used", collection: "Prompts" }).length, 1);
}

function testExportGeneration() {
  const assets = [
    State.createAsset({
      title: "Export asset",
      collection: "Exports",
      filePath: "assets/export, one.png",
      licenseNote: "Internal, generated",
    }),
  ];
  const csv = State.generateCsv(assets);
  const markdown = State.generateMarkdown(assets);
  assert.equal(csv.includes('"assets/export, one.png"'), true);
  assert.equal(csv.includes('"Internal, generated"'), true);
  assert.equal(markdown.includes("# Creator Asset Manager Export"), true);
  assert.equal(markdown.includes("Export asset"), true);
  const json = State.generateJson({ assets });
  const imported = State.parseJsonImport(json);
  assert.equal(imported.assets.length, 1);
  assert.equal(imported.assets[0].title, "Export asset");
}

function testStorageFallback() {
  const brokenStorage = { getItem: () => "{bad json", setItem() {} };
  assert.equal(State.loadState(brokenStorage).assets.length > 0, true);
  let saved = "";
  const memoryStorage = {
    getItem: () => saved,
    setItem(_key, value) {
      saved = value;
    },
  };
  State.saveState(memoryStorage, { assets: [{ title: "Saved", type: "workflow", tags: "a,b" }] });
  const loaded = State.loadState(memoryStorage);
  assert.equal(loaded.assets[0].title, "Saved");
  assert.equal(loaded.assets[0].tags.length, 2);
}

function testSummary() {
  const assets = [
    State.createAsset({ status: "approved", collection: "A" }),
    State.createAsset({ status: "used", collection: "A" }),
    State.createAsset({ status: "new", collection: "B", licenseNote: "ok", filePath: "b.md", resultNotes: "done", tags: ["ready"], promptText: "make it" }),
  ];
  const summary = State.summarize(assets);
  assert.equal(summary.total, 3);
  assert.equal(summary.approved, 1);
  assert.equal(summary.used, 1);
  assert.equal(summary.collections, 2);
  assert.equal(summary.byStatus.new, 1);
  assert.equal(summary.byType.image, 3);
  assert.equal(summary.needsAttention, 2);
}

function testHealthAndCollectionSummaries() {
  const healthy = State.createAsset({
    title: "Healthy",
    collection: "Launch",
    filePath: "assets/healthy.png",
    licenseNote: "Internal generated asset.",
    resultNotes: "Approved for launch.",
    tags: ["launch"],
    promptText: "Generate a clean launch image.",
    status: "approved",
  });
  const risky = State.createAsset({ title: "Risky", collection: "Launch", licenseNote: "" });
  assert.equal(State.getAssetHealth(healthy).level, "good");
  assert.equal(State.getAssetHealth(risky).level, "risk");
  const collections = State.summarizeCollections([healthy, risky]);
  assert.equal(collections[0].collection, "Launch");
  assert.equal(collections[0].count, 2);
  assert.equal(collections[0].needsAttention, 1);
}

function testDeleteUndoHelpers() {
  const asset = State.createAsset({ title: "Delete me" });
  const result = State.deleteAssetWithUndo([asset], asset.id);
  assert.equal(result.assets.length, 0);
  assert.equal(result.deletedAsset.title, "Delete me");
  const restored = State.restoreAsset(result.assets, result.deletedAsset);
  assert.equal(restored.length, 1);
  assert.equal(State.restoreAsset(restored, result.deletedAsset).length, 1);
}

function testJsonImportVariants() {
  const raw = JSON.stringify({ assets: [{ title: "Plain import", tags: "one,two" }] });
  const imported = State.parseJsonImport(raw);
  assert.equal(imported.assets[0].title, "Plain import");
  assert.equal(imported.assets[0].tags.length, 2);
  assert.throws(() => State.parseJsonImport("{bad json"));
}

function testStaticUiSmokeTargets() {
  const html = fs.readFileSync("index.html", "utf8");
  const app = fs.readFileSync("app.js", "utf8");
  [
    "assetForm",
    "totalMetric",
    "approvedMetric",
    "usedMetric",
    "collectionsMetric",
    "attentionMetric",
    "titleInput",
    "typeInput",
    "statusInput",
    "collectionInput",
    "projectInput",
    "sourceToolInput",
    "tagsInput",
    "filePathInput",
    "promptInput",
    "resultNotesInput",
    "licenseInput",
    "searchInput",
    "typeFilter",
    "statusFilter",
    "collectionFilter",
    "assetList",
    "collectionView",
    "exportMarkdown",
    "exportCsv",
    "exportJson",
    "importJson",
    "importJsonFile",
    "resetDemo",
    "toast",
  ].forEach((id) => {
    assert.equal(html.includes(`id="${id}"`), true, `index.html should include #${id}`);
    assert.equal(app.includes(`querySelector("#${id}")`), true, `app.js should bind #${id}`);
  });
  assert.equal(app.includes("innerHTML = \"\""), true, "app.js should clear toast DOM before adding undo action");
}

const tests = [
  testAddingAssets,
  testStatusUpdates,
  testCollectionGrouping,
  testSearchAndFilters,
  testExportGeneration,
  testStorageFallback,
  testSummary,
  testHealthAndCollectionSummaries,
  testDeleteUndoHelpers,
  testJsonImportVariants,
  testStaticUiSmokeTargets,
];

for (const test of tests) test();

console.log(`Passed ${tests.length} Creator Asset Manager tests.`);

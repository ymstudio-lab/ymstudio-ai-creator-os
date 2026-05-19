const assert = require("node:assert/strict");
const fs = require("node:fs");
const CostState = require("./state.js");

function testAddingUsageEntries() {
  const entries = CostState.addEntry([], {
    date: "2026-05-19",
    provider: "OpenAI/Codex",
    category: "SDK/API",
    project: "YMSTUDIO Creator OS",
    workflow: "Codex implementation pass",
    quantity: 10,
    unit: "1K tokens",
    unitCost: 0.02,
  });

  assert.equal(entries.length, 1);
  assert.ok(entries[0].id);
  assert.equal(entries[0].provider, "OpenAI/Codex");
  assert.equal(entries[0].cost, 0.2);
}

function testCostTotalCalculation() {
  const entries = [
    CostState.createEntry({ date: "2026-05-01", quantity: 2, unitCost: 3 }),
    CostState.createEntry({ date: "2026-05-02", quantity: 5, unitCost: 1.5 }),
    CostState.createEntry({ date: "2026-04-30", quantity: 100, unitCost: 10 }),
  ];
  const totals = CostState.calculateTotals(entries, { month: "2026-05", monthlyBudget: 100, monthlyCredits: 50 });

  assert.equal(totals.entryCount, 2);
  assert.equal(totals.totalCost, 13.5);
}

function testMonthlyBudgetPercentage() {
  const entries = [CostState.createEntry({ date: "2026-05-05", quantity: 1, unitCost: 45 })];
  const totals = CostState.calculateTotals(entries, { month: "2026-05", monthlyBudget: 90, monthlyCredits: 100 });

  assert.equal(totals.budgetPercent, 50);
}

function testWarningLevelCalculation() {
  assert.equal(CostState.calculateWarningLevel(10, 20), "safe");
  assert.equal(CostState.calculateWarningLevel(60, 10), "watch");
  assert.equal(CostState.calculateWarningLevel(85, 20), "high");
  assert.equal(CostState.calculateWarningLevel(101, 20), "over budget");
  assert.equal(CostState.calculateWarningLevel(20, 100), "over budget");
}

function testProviderCategoryFiltering() {
  const entries = [
    CostState.createEntry({
      provider: "Claude",
      category: "CLI",
      project: "Prompt research",
      workflow: "Manual planning",
      date: "2026-05-01",
    }),
    CostState.createEntry({
      provider: "Nano Banana",
      category: "SDK/API",
      project: "AI Shorts Factory",
      workflow: "Character images",
      date: "2026-05-02",
    }),
  ];

  assert.equal(CostState.filterEntries(entries, { provider: "Claude" }).length, 1);
  assert.equal(CostState.filterEntries(entries, { category: "SDK/API" })[0].provider, "Nano Banana");
  assert.equal(CostState.filterEntries(entries, { project: "AI Shorts Factory", query: "character" }).length, 1);
}

function testExportGeneration() {
  const entries = [
    CostState.createEntry({
      date: "2026-05-09",
      provider: "MCP tools",
      category: "MCP",
      project: "Infrastructure",
      workflow: "Browser automation, CSV check",
      quantity: 3,
      unitCost: 0.5,
      creditUsed: 1.5,
      notes: "Contains, comma",
    }),
  ];

  const csv = CostState.generateCsv(entries);
  const markdown = CostState.generateMarkdown(entries, { month: "2026-05", monthlyBudget: 10, monthlyCredits: 5 });

  assert.equal(csv.includes("date,provider,category,project"), true);
  assert.equal(csv.includes('"Browser automation, CSV check"'), true);
  assert.equal(markdown.includes("# API Cost Tracker Monthly Report"), true);
  assert.equal(markdown.includes("MCP tools: $1.50"), true);
  assert.equal(markdown.includes("## Category Totals"), true);
  assert.equal(markdown.includes("## Top Workflows"), true);
  assert.equal(markdown.includes("## Recommendations"), true);
}

function testPricingPresetsAndScenario() {
  const preset = CostState.applyPricingPreset("kling-video", { date: "2026-05-19", quantity: 2 });
  assert.equal(preset.provider, "Kling");
  assert.equal(preset.category, "browser/manual");
  assert.equal(preset.cost, 0.9);

  const scenario = CostState.calculateScenario([preset], {
    month: "2026-05",
    monthlyBudget: 20,
    monthlyCredits: 10,
  });
  assert.equal(scenario.currentBurn, 0.9);
  assert.equal(typeof scenario.projectedMonthEnd, "number");
  assert.equal(scenario.remainingSafeBudget >= 0, true);
}

function testMonthlyReportBreakdowns() {
  const entries = [
    CostState.createEntry({
      date: "2026-05-01",
      provider: "Runway",
      category: "browser/manual",
      workflow: "Video pass",
      quantity: 10,
      unitCost: 1,
    }),
    CostState.createEntry({
      date: "2026-05-02",
      provider: "OpenAI/Codex",
      category: "SDK/API",
      workflow: "Code pass",
      quantity: 5,
      unitCost: 1,
    }),
  ];
  const report = CostState.buildMonthlyReport(entries, { month: "2026-05", monthlyBudget: 100, monthlyCredits: 100 });

  assert.equal(report.providers[0].label, "Runway");
  assert.equal(report.categories.some((item) => item.label === "SDK/API"), true);
  assert.equal(report.workflows[0].workflow, "Video pass");
  assert.equal(report.recommendations.length > 0, true);
}

function testJsonStateRoundTrip() {
  const state = {
    settings: { month: "2026-05", monthlyBudget: 75, monthlyCredits: 25 },
    entries: [CostState.applyPricingPreset("nano-banana-images", { date: "2026-05-19" })],
  };
  const exported = CostState.exportStateJson(state);
  const imported = CostState.importStateJson(exported);

  assert.equal(imported.settings.monthlyBudget, 75);
  assert.equal(imported.entries.length, 1);
  assert.equal(imported.entries[0].provider, "Nano Banana");
  assert.equal(JSON.parse(exported).version, CostState.EXPORT_VERSION);
}

function testLocalStorageNormalizationFallback() {
  const brokenStorage = {
    getItem() {
      return "{bad json";
    },
    setItem() {},
  };
  const emptyState = CostState.loadState(brokenStorage);

  assert.equal(emptyState.entries.length > 0, true);
  assert.equal(emptyState.settings.monthlyBudget, CostState.defaultSettings.monthlyBudget);

  let saved = "";
  const memoryStorage = {
    getItem() {
      return saved;
    },
    setItem(_key, value) {
      saved = value;
    },
  };

  CostState.saveState(memoryStorage, {
    settings: { monthlyBudget: "42", monthlyCredits: "12", month: "2026-05-19" },
    entries: [{ quantity: "2", unitCost: "5", provider: "Custom provider" }],
  });
  const loaded = CostState.loadState(memoryStorage);

  assert.equal(loaded.settings.monthlyBudget, 42);
  assert.equal(loaded.settings.month, "2026-05");
  assert.equal(loaded.entries[0].cost, 10);
}

function testStaticUiSmokeTargets() {
  const html = fs.readFileSync("index.html", "utf8");
  const app = fs.readFileSync("app.js", "utf8");

  [
    "entryForm",
    "monthInput",
    "budgetInput",
    "creditsInput",
    "currentBurn",
    "projectedMonthEnd",
    "remainingSafeBudget",
    "presetInput",
    "applyPreset",
    "providerFilter",
    "categoryFilter",
    "projectFilter",
    "exportMarkdown",
    "exportCsv",
    "exportJson",
    "importJson",
    "importJsonFile",
    "resetDemo",
    "categoryBreakdown",
    "topWorkflows",
    "recommendations",
    "toast",
  ].forEach((id) => {
    assert.equal(html.includes(`id="${id}"`), true, `index.html should include #${id}`);
    assert.equal(app.includes(`querySelector("#${id}")`), true, `app.js should bind #${id}`);
  });
}

const tests = [
  testAddingUsageEntries,
  testCostTotalCalculation,
  testMonthlyBudgetPercentage,
  testWarningLevelCalculation,
  testProviderCategoryFiltering,
  testExportGeneration,
  testPricingPresetsAndScenario,
  testMonthlyReportBreakdowns,
  testJsonStateRoundTrip,
  testLocalStorageNormalizationFallback,
  testStaticUiSmokeTargets,
];

for (const test of tests) {
  test();
}

console.log(`Passed ${tests.length} API Cost Tracker tests.`);

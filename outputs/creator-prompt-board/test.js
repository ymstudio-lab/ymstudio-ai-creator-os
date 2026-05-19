const assert = require("node:assert/strict");
const fs = require("node:fs");
const BoardState = require("./state.js");

function testCreatePromptObject() {
  const prompt = BoardState.createPrompt({
    title: "Nano Banana character draft",
    body: "Consistent creator avatar with clean studio lighting.",
    toolTags: ["Nano Banana", "Nano Banana", "Midjourney"],
    categoryTags: ["Character"],
    rating: 4,
  });

  assert.ok(prompt.id);
  assert.equal(prompt.title, "Nano Banana character draft");
  assert.deepEqual(prompt.toolTags, ["Nano Banana", "Midjourney"]);
  assert.equal(prompt.rating, 4);
}

function testUpdatePromptFields() {
  const prompt = BoardState.createPrompt({ title: "Draft", body: "Short prompt", rating: 2 });
  const updated = BoardState.updatePrompt(prompt, {
    title: "Storyboard prompt",
    body: "Three-shot sequence for a creator tutorial intro.",
    categoryTags: ["Storyboard", "YouTube Shorts"],
  });

  assert.equal(updated.id, prompt.id);
  assert.equal(updated.title, "Storyboard prompt");
  assert.equal(updated.body.includes("creator tutorial"), true);
  assert.deepEqual(updated.categoryTags, ["Storyboard", "YouTube Shorts"]);
  assert.notEqual(updated.updatedAt, "");
}

function testSearchAndFilterPromptData() {
  const prompts = [
    BoardState.createPrompt({
      title: "Runway opener",
      body: "Cinematic product ad",
      toolTags: ["Runway"],
      categoryTags: ["Product ad"],
      rating: 5,
    }),
    BoardState.createPrompt({
      title: "Claude improver",
      body: "Rewrite thumbnail prompt",
      toolTags: ["Claude"],
      categoryTags: ["Thumbnail"],
      rating: 3,
    }),
  ];

  assert.equal(BoardState.filterPrompts(prompts, { query: "cinematic" }).length, 1);
  assert.equal(BoardState.filterPrompts(prompts, { tool: "Claude" })[0].title, "Claude improver");
  assert.equal(BoardState.filterPrompts(prompts, { category: "Product ad", minRating: 5 }).length, 1);
  assert.equal(BoardState.filterPrompts(prompts, { category: "Product ad", minRating: 5 })[0].title, "Runway opener");
}

function testToggleFavorite() {
  const prompt = BoardState.createPrompt({ title: "Pika draft", favorite: false });
  const updated = BoardState.toggleFavorite(prompt);

  assert.equal(updated.favorite, true);
  assert.equal(prompt.favorite, false);
}

function testRatingValidation() {
  assert.equal(BoardState.normalizeRating(8), 5);
  assert.equal(BoardState.normalizeRating(-2), 0);
  assert.equal(BoardState.normalizeRating(3.6), 4);
  assert.equal(BoardState.createPrompt({ title: "Bad rating", rating: "nope" }).rating, 0);
}

function testCopyReadyFormatting() {
  const prompt = BoardState.createPrompt({
    title: "Kling scene",
    body: "Founder walks through a bright studio.",
    toolTags: ["Kling"],
    categoryTags: ["Storyboard"],
    rating: 5,
    resultNotes: "Use as shot two.",
  });
  const copy = BoardState.formatPromptForCopy(prompt);

  assert.equal(copy.includes("Kling scene"), true);
  assert.equal(copy.includes("Tools: Kling"), true);
  assert.equal(copy.includes("Categories: Storyboard"), true);
  assert.equal(copy.includes("Rating: 5/5"), true);
  assert.equal(copy.includes("Use as shot two."), true);
}

function testExportShape() {
  const prompts = [
    BoardState.createPrompt({
      title: "Export me",
      body: "Prompt body",
      toolTags: ["Runway"],
      categoryTags: ["Video prompt"],
      rating: 5,
    }),
  ];
  const exported = BoardState.exportPrompts(prompts);

  assert.equal(exported.version, 1);
  assert.equal(Array.isArray(exported.prompts), true);
  assert.equal(exported.prompts.length, 1);
  assert.equal(exported.prompts[0].title, "Export me");
  assert.ok(exported.exportedAt);
}

function testImportValidExportShape() {
  const exported = BoardState.exportPrompts([
    BoardState.createPrompt({
      title: "Import export shape",
      body: "Valid imported prompt.",
      toolTags: ["Kling"],
      categoryTags: ["Storyboard"],
      favorite: true,
      rating: 4,
    }),
  ]);
  const result = BoardState.parsePromptImport(JSON.stringify(exported));

  assert.equal(result.ok, true);
  assert.equal(result.prompts.length, 1);
  assert.equal(result.prompts[0].title, "Import export shape");
  assert.equal(result.prompts[0].favorite, true);
  assert.deepEqual(result.prompts[0].toolTags, ["Kling"]);
}

function testImportRawPromptArray() {
  const result = BoardState.parsePromptImport(
    JSON.stringify([
      {
        title: "Raw array import",
        body: "Import this raw array prompt.",
        toolTags: ["ComfyUI", "ComfyUI"],
        categoryTags: ["Character"],
        rating: 9,
      },
    ])
  );

  assert.equal(result.ok, true);
  assert.equal(result.prompts[0].rating, 5);
  assert.deepEqual(result.prompts[0].toolTags, ["ComfyUI"]);
}

function testRejectInvalidImportData() {
  const invalidJson = BoardState.parsePromptImport("{nope");
  const missingBody = BoardState.parsePromptImport(JSON.stringify([{ title: "Missing body" }]));
  const invalidTags = BoardState.parsePromptImport(
    JSON.stringify([{ title: "Bad tags", body: "Body", toolTags: [{ bad: true }] }])
  );

  assert.equal(invalidJson.ok, false);
  assert.equal(missingBody.ok, false);
  assert.equal(invalidTags.ok, false);
}

function testStaticUiSmokeTargets() {
  const html = fs.readFileSync("index.html", "utf8");
  const app = fs.readFileSync("app.js", "utf8");

  [
    "promptList",
    "promptForm",
    "exportPrompts",
    "importPrompts",
    "importFile",
    "resetDemo",
    "toast",
  ].forEach((id) => {
    assert.equal(html.includes(`id="${id}"`), true, `index.html should include #${id}`);
    assert.equal(app.includes(`querySelector("#${id}")`), true, `app.js should bind #${id}`);
  });
}

const tests = [
  testCreatePromptObject,
  testUpdatePromptFields,
  testSearchAndFilterPromptData,
  testToggleFavorite,
  testRatingValidation,
  testCopyReadyFormatting,
  testExportShape,
  testImportValidExportShape,
  testImportRawPromptArray,
  testRejectInvalidImportData,
  testStaticUiSmokeTargets,
];

for (const test of tests) {
  test();
}

console.log(`Passed ${tests.length} Creator Prompt Board tests.`);

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ApiCostTrackerState = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  const STORAGE_KEY = "ymstudio.apiCostTracker.v1";
  const EXPORT_VERSION = 1;

  const providerOptions = [
    "Claude",
    "OpenAI/Codex",
    "Nano Banana",
    "ComfyUI/local",
    "MCP tools",
    "Runway",
    "Kling",
    "Custom provider",
  ];

  const categoryOptions = ["CLI", "SDK/API", "MCP", "browser/manual", "local model"];

  const projectOptions = [
    "YMSTUDIO Creator OS",
    "AI Shorts Factory",
    "Client product ads",
    "Prompt research",
    "Infrastructure",
  ];

  const defaultSettings = {
    monthlyBudget: 300,
    monthlyCredits: 120,
    month: "2026-05",
  };

  const pricingPresets = [
    {
      id: "claude-planning",
      label: "Claude 기획 세션",
      provider: "Claude",
      category: "CLI",
      project: "YMSTUDIO Creator OS",
      workflow: "Claude 기획 및 검토",
      quantity: 1,
      unit: "sessions",
      unitCost: 0,
      creditUsed: 0,
      notes: "플랜에 포함된 Claude 사용량. 유료 API로 돌렸을 때와 비교하기 위해 기록.",
    },
    {
      id: "openai-codex-tokens",
      label: "OpenAI/Codex 구현 토큰",
      provider: "OpenAI/Codex",
      category: "SDK/API",
      project: "YMSTUDIO Creator OS",
      workflow: "Codex 구현 작업",
      quantity: 100,
      unit: "1K tokens",
      unitCost: 0.015,
      creditUsed: 1.5,
      notes: "구현이나 리뷰 반복처럼 토큰 사용량이 커지는 작업을 기록.",
    },
    {
      id: "nano-banana-images",
      label: "Nano Banana 이미지 묶음 생성",
      provider: "Nano Banana",
      category: "SDK/API",
      project: "AI Shorts Factory",
      workflow: "캐릭터 기준 이미지 생성",
      quantity: 24,
      unit: "images",
      unitCost: 0.08,
      creditUsed: 1.92,
      notes: "프롬프트 방향이 정해진 뒤에만 이미지 묶음 생성.",
    },
    {
      id: "mcp-automation",
      label: "MCP 자동화 실행",
      provider: "MCP tools",
      category: "MCP",
      project: "Infrastructure",
      workflow: "브라우저 및 파일 자동화",
      quantity: 20,
      unit: "runs",
      unitCost: 0.02,
      creditUsed: 0.4,
      notes: "1회 비용은 작아도 에이전트 반복 실행은 누적되므로 기록.",
    },
    {
      id: "comfyui-local",
      label: "ComfyUI/local 렌더",
      provider: "ComfyUI/local",
      category: "local model",
      project: "Client product ads",
      workflow: "로컬 썸네일 후보 생성",
      quantity: 25,
      unit: "renders",
      unitCost: 0,
      creditUsed: 0,
      notes: "API 비용을 아끼는 로컬 렌더링 항목.",
    },
    {
      id: "runway-video",
      label: "Runway 영상 클립",
      provider: "Runway",
      category: "browser/manual",
      project: "AI Shorts Factory",
      workflow: "최종 영상 생성",
      quantity: 10,
      unit: "clips",
      unitCost: 0.55,
      creditUsed: 5.5,
      notes: "수동 플랜 또는 크레딧 기반 영상 생성량 기록.",
    },
    {
      id: "kling-video",
      label: "Kling 영상 클립",
      provider: "Kling",
      category: "browser/manual",
      project: "AI Shorts Factory",
      workflow: "움직임 후보 생성",
      quantity: 8,
      unit: "clips",
      unitCost: 0.45,
      creditUsed: 3.6,
      notes: "다른 영상 생성 결과를 비교하는 실험용.",
    },
    {
      id: "custom-provider",
      label: "직접 입력 제공자",
      provider: "Custom provider",
      category: "SDK/API",
      project: "Prompt research",
      workflow: "직접 입력 작업 흐름",
      quantity: 1,
      unit: "calls",
      unitCost: 0,
      creditUsed: 0,
      notes: "제공자별 단가나 예상 크레딧으로 바꿔 입력.",
    },
  ];

  const demoEntries = [
    {
      date: "2026-05-03",
      provider: "Claude",
      category: "CLI",
      project: "YMSTUDIO Creator OS",
      workflow: "프롬프트 보드 기획 및 검토",
      quantity: 14,
      unit: "sessions",
      unitCost: 0,
      creditUsed: 0,
      notes: "Claude 플랜에 포함된 사용량. 가능하면 유료 API 대신 이 흐름을 우선 사용.",
    },
    {
      date: "2026-05-06",
      provider: "OpenAI/Codex",
      category: "SDK/API",
      project: "YMSTUDIO Creator OS",
      workflow: "앱 초안 생성 실험",
      quantity: 820,
      unit: "1K tokens",
      unitCost: 0.015,
      creditUsed: 12.3,
      notes: "반복 실행 전에 CLI 또는 수동 검토로 줄일 수 있는 항목.",
    },
    {
      date: "2026-05-08",
      provider: "Nano Banana",
      category: "SDK/API",
      project: "AI Shorts Factory",
      workflow: "캐릭터 기준 이미지 묶음",
      quantity: 48,
      unit: "images",
      unitCost: 0.08,
      creditUsed: 3.84,
      notes: "최종 캐릭터 방향이 정해진 뒤에만 묶음 생성.",
    },
    {
      date: "2026-05-10",
      provider: "MCP tools",
      category: "MCP",
      project: "Infrastructure",
      workflow: "브라우저 및 파일 자동화 점검",
      quantity: 35,
      unit: "runs",
      unitCost: 0.02,
      creditUsed: 0.7,
      notes: "대체로 저비용이지만 반복 루프가 많으면 누적됨.",
    },
    {
      date: "2026-05-12",
      provider: "ComfyUI/local",
      category: "local model",
      project: "Client product ads",
      workflow: "로컬 썸네일 후보 생성",
      quantity: 62,
      unit: "renders",
      unitCost: 0,
      creditUsed: 0,
      notes: "로컬 GPU 작업으로 이미지 API 비용을 절약.",
    },
    {
      date: "2026-05-15",
      provider: "Runway",
      category: "browser/manual",
      project: "AI Shorts Factory",
      workflow: "최종 영상 생성",
      quantity: 18,
      unit: "clips",
      unitCost: 0.55,
      creditUsed: 9.9,
      notes: "수동 플랜 사용량. 월간 허용 크레딧과 비교해서 기록.",
    },
  ];

  function makeId() {
    return "cost_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function clampMoney(value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) return 0;
    return Math.round(number * 10000) / 10000;
  }

  function clampQuantity(value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) return 0;
    return Math.round(number * 100) / 100;
  }

  function toMonth(dateValue) {
    const value = String(dateValue || "").trim();
    if (/^\d{4}-\d{2}/.test(value)) return value.slice(0, 7);
    return defaultSettings.month;
  }

  function normalizeSettings(input) {
    const source = input || {};
    return {
      monthlyBudget: clampMoney(source.monthlyBudget ?? defaultSettings.monthlyBudget),
      monthlyCredits: clampMoney(source.monthlyCredits ?? defaultSettings.monthlyCredits),
      month: toMonth(source.month || defaultSettings.month),
    };
  }

  function createEntry(input) {
    const source = input || {};
    const quantity = clampQuantity(source.quantity ?? 1);
    const unitCost = clampMoney(source.unitCost);
    const cost = clampMoney(source.cost ?? quantity * unitCost);

    return {
      id: source.id || makeId(),
      date: String(source.date || new Date().toISOString().slice(0, 10)).slice(0, 10),
      provider: String(source.provider || "Custom provider").trim() || "Custom provider",
      category: String(source.category || "SDK/API").trim() || "SDK/API",
      project: String(source.project || "YMSTUDIO Creator OS").trim() || "YMSTUDIO Creator OS",
      workflow: String(source.workflow || "Untitled workflow").trim() || "Untitled workflow",
      quantity,
      unit: String(source.unit || "calls").trim() || "calls",
      unitCost,
      cost,
      creditUsed: clampMoney(source.creditUsed ?? cost),
      notes: String(source.notes || "").trim(),
      createdAt: source.createdAt || new Date().toISOString(),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function updateEntry(entry, changes) {
    return createEntry({
      ...entry,
      ...changes,
      id: entry.id,
      createdAt: entry.createdAt,
      updatedAt: new Date().toISOString(),
    });
  }

  function addEntry(entries, input) {
    return [createEntry(input), ...normalizeEntries(entries)];
  }

  function normalizeEntries(entries) {
    if (!Array.isArray(entries)) return [];
    return entries.map(createEntry);
  }

  function getMonthlyEntries(entries, month) {
    const targetMonth = toMonth(month);
    return normalizeEntries(entries).filter((entry) => toMonth(entry.date) === targetMonth);
  }

  function sumBy(entries, key) {
    return normalizeEntries(entries).reduce((total, entry) => total + clampMoney(entry[key]), 0);
  }

  function calculateTotals(entries, settings) {
    const safeSettings = normalizeSettings(settings);
    const monthlyEntries = getMonthlyEntries(entries, safeSettings.month);
    const totalCost = clampMoney(sumBy(monthlyEntries, "cost"));
    const totalCredits = clampMoney(sumBy(monthlyEntries, "creditUsed"));
    const budgetPercent = safeSettings.monthlyBudget
      ? Math.round((totalCost / safeSettings.monthlyBudget) * 1000) / 10
      : 0;
    const creditPercent = safeSettings.monthlyCredits
      ? Math.round((totalCredits / safeSettings.monthlyCredits) * 1000) / 10
      : 0;
    const daysElapsed = daysElapsedInMonth(safeSettings.month);
    const projectedCost = clampMoney((totalCost / Math.max(daysElapsed, 1)) * daysInMonth(safeSettings.month));
    const dailyAverage = clampMoney(totalCost / Math.max(daysElapsed, 1));

    return {
      month: safeSettings.month,
      entryCount: monthlyEntries.length,
      totalCost,
      totalCredits,
      budgetPercent,
      creditPercent,
      dailyAverage,
      projectedCost,
      remainingBudget: clampMoney(Math.max(safeSettings.monthlyBudget - totalCost, 0)),
      remainingCredits: clampMoney(Math.max(safeSettings.monthlyCredits - totalCredits, 0)),
      warningLevel: calculateWarningLevel(budgetPercent, creditPercent),
    };
  }

  function calculateScenario(entries, settings) {
    const safeSettings = normalizeSettings(settings);
    const totals = calculateTotals(entries, safeSettings);
    return {
      currentBurn: totals.totalCost,
      projectedMonthEnd: totals.projectedCost,
      remainingSafeBudget: clampMoney(Math.max(safeSettings.monthlyBudget - totals.projectedCost, 0)),
      currentRemainingBudget: totals.remainingBudget,
      currentRemainingCredits: totals.remainingCredits,
    };
  }

  function daysInMonth(month) {
    const [year, monthNumber] = toMonth(month).split("-").map(Number);
    return new Date(year, monthNumber, 0).getDate();
  }

  function daysElapsedInMonth(month, now) {
    const target = toMonth(month);
    const current = now ? new Date(now) : new Date();
    const currentMonth = current.toISOString().slice(0, 7);
    if (target < currentMonth) return daysInMonth(target);
    if (target > currentMonth) return 1;
    return Math.max(1, current.getDate());
  }

  function calculateWarningLevel(budgetPercent, creditPercent) {
    const percent = Math.max(Number(budgetPercent) || 0, Number(creditPercent) || 0);
    if (percent >= 100) return "over budget";
    if (percent >= 85) return "high";
    if (percent >= 60) return "watch";
    return "safe";
  }

  function searchText(entry) {
    return [entry.provider, entry.category, entry.project, entry.workflow, entry.unit, entry.notes]
      .join(" ")
      .toLowerCase();
  }

  function filterEntries(entries, filters) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const provider = String(options.provider || "").trim();
    const category = String(options.category || "").trim();
    const project = String(options.project || "").trim();
    const month = String(options.month || "").trim();

    return normalizeEntries(entries).filter((entry) => {
      if (month && toMonth(entry.date) !== toMonth(month)) return false;
      if (query && !searchText(entry).includes(query)) return false;
      if (provider && entry.provider !== provider) return false;
      if (category && entry.category !== category) return false;
      if (project && entry.project !== project) return false;
      return true;
    });
  }

  function groupTotalsBy(entries, key) {
    return normalizeEntries(entries).reduce((groups, entry) => {
      const label = entry[key] || "Unassigned";
      if (!groups[label]) groups[label] = { cost: 0, credits: 0, count: 0 };
      groups[label].cost = clampMoney(groups[label].cost + entry.cost);
      groups[label].credits = clampMoney(groups[label].credits + entry.creditUsed);
      groups[label].count += 1;
      return groups;
    }, {});
  }

  function sortedGroupRows(groups) {
    return Object.keys(groups)
      .sort((a, b) => groups[b].cost - groups[a].cost || a.localeCompare(b))
      .map((label) => ({ label, ...groups[label] }));
  }

  function topWorkflows(entries, limit) {
    const groups = normalizeEntries(entries).reduce((items, entry) => {
      const label = entry.workflow || "Untitled workflow";
      if (!items[label]) {
        items[label] = {
          workflow: label,
          provider: entry.provider,
          project: entry.project,
          cost: 0,
          credits: 0,
          count: 0,
        };
      }
      items[label].cost = clampMoney(items[label].cost + entry.cost);
      items[label].credits = clampMoney(items[label].credits + entry.creditUsed);
      items[label].count += 1;
      return items;
    }, {});
    return Object.values(groups)
      .sort((a, b) => b.cost - a.cost || b.credits - a.credits || a.workflow.localeCompare(b.workflow))
      .slice(0, limit || 5);
  }

  function getPresetById(id) {
    return pricingPresets.find((preset) => preset.id === id) || pricingPresets[0];
  }

  function applyPricingPreset(id, overrides) {
    const preset = getPresetById(id);
    return createEntry({
      ...preset,
      ...overrides,
      id: undefined,
      label: undefined,
    });
  }

  function generateRecommendations(entries, settings) {
    const safeSettings = normalizeSettings(settings);
    const monthlyEntries = getMonthlyEntries(entries, safeSettings.month);
    const totals = calculateTotals(monthlyEntries, safeSettings);
    const providerRows = sortedGroupRows(groupTotalsBy(monthlyEntries, "provider"));
    const categoryRows = sortedGroupRows(groupTotalsBy(monthlyEntries, "category"));
    const recommendations = [];

    if (totals.projectedCost > safeSettings.monthlyBudget && safeSettings.monthlyBudget > 0) {
      recommendations.push(
        `Projected spend is above budget by $${(totals.projectedCost - safeSettings.monthlyBudget).toFixed(
          2
        )}. Move repeat experiments to Claude CLI, Codex CLI review, or ComfyUI/local before using paid APIs.`
      );
    } else {
      recommendations.push("Projected spend is inside the current budget. Keep logging repeated workflows before scaling.");
    }

    if (providerRows[0]) {
      recommendations.push(
        `${providerRows[0].label} is the largest provider cost at $${providerRows[0].cost.toFixed(
          2
        )}. Review that workflow first for batching, cheaper presets, or local alternatives.`
      );
    }

    if (categoryRows[0] && categoryRows[0].label !== "local model") {
      recommendations.push(
        `${categoryRows[0].label} is the highest-spend category. Add a manual approval step before repeating high-volume runs.`
      );
    }

    if (totals.creditPercent >= 85) {
      recommendations.push("Credit usage is high. Reserve remaining credits for deliverables, not exploration.");
    }

    return recommendations;
  }

  function buildMonthlyReport(entries, settings) {
    const safeSettings = normalizeSettings(settings);
    const monthlyEntries = getMonthlyEntries(entries, safeSettings.month);
    return {
      totals: calculateTotals(monthlyEntries, safeSettings),
      scenario: calculateScenario(monthlyEntries, safeSettings),
      providers: sortedGroupRows(groupTotalsBy(monthlyEntries, "provider")),
      categories: sortedGroupRows(groupTotalsBy(monthlyEntries, "category")),
      workflows: topWorkflows(monthlyEntries, 5),
      recommendations: generateRecommendations(monthlyEntries, safeSettings),
    };
  }

  function escapeCsv(value) {
    const text = String(value ?? "");
    if (!/[",\n]/.test(text)) return text;
    return '"' + text.replace(/"/g, '""') + '"';
  }

  function generateCsv(entries) {
    const headers = [
      "date",
      "provider",
      "category",
      "project",
      "workflow",
      "quantity",
      "unit",
      "unitCost",
      "cost",
      "creditUsed",
      "notes",
    ];
    const rows = normalizeEntries(entries).map((entry) => headers.map((key) => escapeCsv(entry[key])).join(","));
    return [headers.join(","), ...rows].join("\n");
  }

  function generateMarkdown(entries, settings) {
    const safeEntries = normalizeEntries(entries);
    const report = buildMonthlyReport(safeEntries, settings);
    const totals = report.totals;
    const lines = [
      "# API Cost Tracker Monthly Report",
      "",
      `Month: ${totals.month}`,
      `Total cost: $${totals.totalCost.toFixed(2)}`,
      `Budget used: ${totals.budgetPercent}%`,
      `Credits used: ${totals.totalCredits.toFixed(2)}`,
      `Credit usage: ${totals.creditPercent}%`,
      `Warning level: ${totals.warningLevel}`,
      `Projected month-end cost: $${totals.projectedCost.toFixed(2)}`,
      `Remaining safe budget: $${report.scenario.remainingSafeBudget.toFixed(2)}`,
      "",
      "## Provider Totals",
      "",
    ];

    report.providers.forEach((item) => {
      lines.push(`- ${item.label}: $${item.cost.toFixed(2)} / ${item.credits.toFixed(2)} credits (${item.count} entries)`);
    });

    lines.push("", "## Category Totals", "");
    report.categories.forEach((item) => {
      lines.push(`- ${item.label}: $${item.cost.toFixed(2)} / ${item.credits.toFixed(2)} credits (${item.count} entries)`);
    });

    lines.push("", "## Top Workflows", "");
    report.workflows.forEach((item) => {
      lines.push(
        `- ${item.workflow}: $${item.cost.toFixed(2)} / ${item.credits.toFixed(2)} credits (${item.count} entries, ${item.provider})`
      );
    });

    lines.push("", "## Recommendations", "");
    report.recommendations.forEach((item) => {
      lines.push(`- ${item}`);
    });

    lines.push("", "## Entries", "");
    getMonthlyEntries(safeEntries, totals.month).forEach((entry) => {
      lines.push(
        `- ${entry.date} | ${entry.provider} | ${entry.category} | ${entry.project} | $${entry.cost.toFixed(2)} | ${entry.workflow}`
      );
    });

    return lines.join("\n");
  }

  function normalizeState(state) {
    return {
      settings: normalizeSettings(state && state.settings),
      entries: normalizeEntries(state && state.entries),
    };
  }

  function exportStateJson(state) {
    return JSON.stringify(
      {
        version: EXPORT_VERSION,
        exportedAt: new Date().toISOString(),
        state: normalizeState(state),
      },
      null,
      2
    );
  }

  function importStateJson(json) {
    const parsed = typeof json === "string" ? JSON.parse(json) : json;
    const source = parsed && parsed.state ? parsed.state : parsed;
    return normalizeState(source);
  }

  function loadState(storage) {
    if (!storage) return createDemoState();
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return createDemoState();
      const parsed = JSON.parse(raw);
      return normalizeState(parsed);
    } catch (error) {
      return createDemoState();
    }
  }

  function saveState(storage, state) {
    if (!storage) return;
    const safeState = normalizeState(state);
    storage.setItem(STORAGE_KEY, JSON.stringify(safeState));
  }

  function createDemoState() {
    return {
      settings: normalizeSettings(defaultSettings),
      entries: demoEntries.map(createEntry),
    };
  }

  return {
    STORAGE_KEY,
    EXPORT_VERSION,
    providerOptions,
    categoryOptions,
    projectOptions,
    pricingPresets,
    defaultSettings,
    demoEntries,
    createEntry,
    updateEntry,
    addEntry,
    normalizeEntries,
    normalizeSettings,
    calculateTotals,
    calculateScenario,
    calculateWarningLevel,
    daysInMonth,
    daysElapsedInMonth,
    filterEntries,
    groupTotalsBy,
    topWorkflows,
    applyPricingPreset,
    generateRecommendations,
    buildMonthlyReport,
    generateCsv,
    generateMarkdown,
    exportStateJson,
    importStateJson,
    loadState,
    saveState,
    createDemoState,
  };
});

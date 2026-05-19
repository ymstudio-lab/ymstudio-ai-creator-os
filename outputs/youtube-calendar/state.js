(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.YouTubeCalendarState = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const STORAGE_KEY = "ymstudio.youtubeCalendar.v1";
  const statusOptions = ["idea", "scripted", "assets ready", "editing", "scheduled", "published", "review"];
  const formatOptions = ["Shorts", "long-form", "live", "community", "clip"];
  const toolOptions = ["Claude", "ChatGPT", "OpenAI/Codex", "Nano Banana", "Runway", "Kling", "ComfyUI", "CapCut", "YouTube Studio"];

  const defaultSettings = {
    channel: "YMSTUDIO AI",
    month: "2026-05",
    weeklyTarget: 5,
  };

  const demoItems = [
    {
      title: "Claude로 Shorts 공장 만들기",
      format: "Shorts",
      channel: "YMSTUDIO AI",
      niche: "AI Shorts 자동화",
      uploadDate: "2026-05-20",
      status: "scheduled",
      scriptOutline: "수동으로 기획하다가 꼬이는 문제를 훅으로 보여주고, Claude 프롬프트 보드를 공개한 뒤, 반복 가능한 Shorts 제작 시스템으로 마무리.",
      titleVariants: ["Claude로 Shorts 공장을 만들었습니다", "AI Shorts 기획을 메모장에 흩뿌리지 마세요", "프롬프트 보드 하나로 Shorts 7개 만들기"],
      thumbnailPrompts: ["크리에이터 책상, 노트북에 Claude 프롬프트 보드, Shorts 카드 7장이 펼쳐진 구성, 깔끔한 초록 포인트"],
      tools: ["Claude", "CapCut", "YouTube Studio"],
      performanceNotes: "메모장과 Discord에 프롬프트를 흩어 관리하는 크리에이터에게 맞춤.",
    },
    {
      title: "Nano Banana 캐릭터 일관성 잡기",
      format: "Shorts",
      channel: "YMSTUDIO AI",
      niche: "AI image workflow",
      uploadDate: "2026-05-22",
      status: "editing",
      scriptOutline: "캐릭터가 매번 달라지는 예시와 기준 이미지를 고정한 예시를 비교하고, 재사용 체크리스트를 보여줌.",
      titleVariants: ["AI 캐릭터가 계속 바뀐다면 이렇게 하세요", "캐릭터 일관성 체크리스트", "캐릭터 드리프트를 보드 하나로 줄이는 법"],
      thumbnailPrompts: ["일치하는 AI 캐릭터 프레임 3개와 초록 체크, 탈락한 빨간 프레임 1개"],
      tools: ["Nano Banana", "ComfyUI"],
      performanceNotes: "무료 템플릿 배포용 리드마그넷으로 적합.",
    },
    {
      title: "크리에이터가 자주 놓치는 API 비용 실수",
      format: "long-form",
      channel: "YMSTUDIO AI",
      niche: "AI business",
      uploadDate: "2026-05-25",
      status: "scripted",
      scriptOutline: "CLI와 SDK/API 사용 차이를 설명하고, 비용 추적기를 보여준 뒤, 월간 점검 루틴으로 마무리.",
      titleVariants: ["AI API 예산이 새고 있습니다", "런칭 전에 AI 크레딧부터 추적하세요", "Claude와 Codex 비용 관리 흐름"],
      thumbnailPrompts: ["빨간 예산 경고가 뜬 깔끔한 SaaS 대시보드, 계산기를 든 크리에이터, AI 도구 라벨"],
      tools: ["Claude", "OpenAI/Codex"],
      performanceNotes: "로컬 전용 추적기이며 API 호출이 없다는 점을 강조.",
    },
    {
      title: "1인 크리에이터용 AI tools 스택",
      format: "long-form",
      channel: "YMSTUDIO AI",
      niche: "AI tools 스택",
      uploadDate: "2026-05-27",
      status: "assets ready",
      scriptOutline: "아이디어 하나를 기준으로 기획, 대본, 이미지/영상 생성, 편집, 업로드까지 이어지는 도구 스택을 보여줌.",
      titleVariants: ["2026년에 쓰는 AI 크리에이터 스택", "계속 쓰게 되는 AI 도구만 정리했습니다", "도구 5개로 Creator OS 만들기"],
      thumbnailPrompts: ["크리에이터 커맨드센터처럼 배치된 앱 창 5개, 선명한 흰 배경"],
      tools: ["Claude", "ChatGPT", "Runway", "CapCut", "YouTube Studio"],
      performanceNotes: "도구 제휴 링크와 템플릿 링크를 연결하는 핵심 영상으로 사용.",
    },
    {
      title: "Automation 레시피: 아이디어에서 업로드까지",
      format: "Shorts",
      channel: "YMSTUDIO AI",
      niche: "Automation 레시피",
      uploadDate: "2026-05-29",
      status: "idea",
      scriptOutline: "아이디어 저장, 에셋 생성, 업로드 전 검토 예약까지 3단계 자동화 지도를 보여줌.",
      titleVariants: ["유튜브 준비 과정을 자동화하세요", "아이디어에서 업로드까지 덜 꼬이게 가는 법", "크리에이터 자동화 지도"],
      thumbnailPrompts: ["전구 아이콘에서 업로드 버튼까지 이어지는 플로우차트, 굵은 숫자 3단계"],
      tools: ["Claude", "OpenAI/Codex", "YouTube Studio"],
      performanceNotes: "유료 셋업 서비스로 연결하기 좋은 주제.",
    },
    {
      title: "AI 튜토리얼 채널 Monetization 사다리",
      format: "community",
      channel: "YMSTUDIO AI",
      niche: "Monetization 실험",
      uploadDate: "2026-05-30",
      status: "scheduled",
      scriptOutline: "시청자에게 템플릿, 진단, 셋업 서비스, 강의 중 어떤 상품을 원하는지 묻는 커뮤니티 글.",
      titleVariants: ["다음 크리에이터 상품을 골라주세요", "AI 채널은 무엇을 먼저 팔아야 할까요?", "투표: 템플릿, 진단, 셋업 서비스"],
      thumbnailPrompts: ["비즈니스 모델 선택지 4개가 있는 단순한 투표 카드, YMSTUDIO 브랜드 헤더"],
      tools: ["YouTube Studio"],
      performanceNotes: "댓글 반응으로 확장 로드맵을 검증.",
    },
    {
      title: "CapCut Tutorial: 얼굴 없는 AI Shorts 편집",
      format: "clip",
      channel: "YMSTUDIO AI",
      niche: "Tutorial content",
      uploadDate: "2026-06-02",
      status: "review",
      scriptOutline: "긴 튜토리얼에서 자막, B-roll, 빠른 컷 편집, 내보내기 설정을 보여주는 클립.",
      titleVariants: ["CapCut으로 AI Shorts 더 빠르게 편집하기", "얼굴 없는 Shorts 편집 스택", "AI 튜토리얼용 CapCut 설정"],
      thumbnailPrompts: ["자막이 강조된 CapCut 타임라인, 옆에는 얼굴 없는 크리에이터 채널 미리보기"],
      tools: ["CapCut", "YouTube Studio"],
      performanceNotes: "검색 유입용 튜토리얼 콘텐츠로 재활용.",
    },
  ];

  function uid(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function arrayFrom(value) {
    if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
    if (typeof value === "string") return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
    return [];
  }

  function normalizeItem(item) {
    return {
      id: item.id || uid("yt"),
      title: String(item.title || "Untitled content").trim(),
      format: formatOptions.includes(item.format) ? item.format : "Shorts",
      channel: String(item.channel || defaultSettings.channel).trim(),
      niche: String(item.niche || "AI creator").trim(),
      uploadDate: String(item.uploadDate || new Date().toISOString().slice(0, 10)).slice(0, 10),
      status: statusOptions.includes(item.status) ? item.status : "idea",
      scriptOutline: String(item.scriptOutline || "").trim(),
      titleVariants: arrayFrom(item.titleVariants),
      thumbnailPrompts: arrayFrom(item.thumbnailPrompts),
      tools: arrayFrom(item.tools),
      performanceNotes: String(item.performanceNotes || "").trim(),
    };
  }

  function normalizeSettings(settings) {
    const source = settings || {};
    const month = /^\d{4}-\d{2}/.test(source.month || "") ? String(source.month).slice(0, 7) : defaultSettings.month;
    return {
      channel: String(source.channel || defaultSettings.channel).trim(),
      month,
      weeklyTarget: Math.max(1, Number(source.weeklyTarget || defaultSettings.weeklyTarget)),
    };
  }

  function normalizeItems(items) {
    return Array.isArray(items) ? items.map(normalizeItem) : demoItems.map(normalizeItem);
  }

  function createItem(data) {
    return normalizeItem({ id: uid("yt"), ...data });
  }

  function addItem(items, data) {
    return [...normalizeItems(items), createItem(data)];
  }

  function updateStatus(items, id, status) {
    if (!statusOptions.includes(status)) return normalizeItems(items);
    return normalizeItems(items).map((item) => (item.id === id ? { ...item, status } : item));
  }

  function deleteItem(items, id) {
    return normalizeItems(items).filter((item) => item.id !== id);
  }

  function deleteItemWithUndo(items, id) {
    const normalized = normalizeItems(items);
    const index = normalized.findIndex((item) => item.id === id);
    if (index === -1) return { items: normalized, deleted: null };
    return {
      items: normalized.filter((item) => item.id !== id),
      deleted: { item: normalized[index], index },
    };
  }

  function restoreDeletedItem(items, deleted) {
    const normalized = normalizeItems(items);
    if (!deleted?.item) return normalized;
    const restored = normalizeItem(deleted.item);
    if (normalized.some((item) => item.id === restored.id)) return normalized;
    const index = Math.max(0, Math.min(Number(deleted.index) || 0, normalized.length));
    return [...normalized.slice(0, index), restored, ...normalized.slice(index)];
  }

  function filterItems(items, filters) {
    const source = normalizeItems(items);
    const query = String(filters?.query || "").toLowerCase();
    return source.filter((item) => {
      if (filters?.status && item.status !== filters.status) return false;
      if (filters?.format && item.format !== filters.format) return false;
      if (filters?.channel && item.channel !== filters.channel) return false;
      if (filters?.month && !item.uploadDate.startsWith(filters.month)) return false;
      if (!query) return true;
      return [item.title, item.niche, item.scriptOutline, item.performanceNotes, ...item.titleVariants, ...item.thumbnailPrompts, ...item.tools]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }

  function getWeekKey(dateText) {
    const date = new Date(`${dateText}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "Unscheduled";
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const week = Math.floor((date.getDate() + first.getDay() - 1) / 7) + 1;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")} W${week}`;
  }

  function groupByUploadDate(items, mode) {
    return normalizeItems(items).reduce((groups, item) => {
      const key = mode === "week" ? getWeekKey(item.uploadDate) : item.uploadDate;
      groups[key] = groups[key] || [];
      groups[key].push(item);
      groups[key].sort((a, b) => a.title.localeCompare(b.title));
      return groups;
    }, {});
  }

  function summarize(items, settings) {
    const normalized = normalizeItems(items);
    const monthItems = filterItems(normalized, { month: normalizeSettings(settings).month });
    const byStatus = statusOptions.reduce((acc, status) => ({ ...acc, [status]: monthItems.filter((item) => item.status === status).length }), {});
    return {
      total: monthItems.length,
      published: byStatus.published,
      scheduled: byStatus.scheduled,
      inProduction: byStatus.scripted + byStatus["assets ready"] + byStatus.editing + byStatus.review,
      ideas: byStatus.idea,
      byStatus,
    };
  }

  function countBy(items, key) {
    return normalizeItems(items).reduce((acc, item) => {
      const value = item[key] || "Unspecified";
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  function summarizePipeline(items, settings) {
    const normalizedSettings = normalizeSettings(settings);
    const monthItems = filterItems(items, { month: normalizedSettings.month });
    return {
      total: monthItems.length,
      weeklyTarget: normalizedSettings.weeklyTarget,
      byFormat: countBy(monthItems, "format"),
      byStatus: countBy(monthItems, "status"),
      byUploadWeek: monthItems.reduce((acc, item) => {
        const key = getWeekKey(item.uploadDate);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    };
  }

  function weeklyPlanningSummary(items, settings) {
    const normalizedSettings = normalizeSettings(settings);
    const monthItems = filterItems(items, { month: normalizedSettings.month });
    const weeks = monthItems.reduce((acc, item) => {
      const key = getWeekKey(item.uploadDate);
      acc[key] = acc[key] || { week: key, total: 0, scheduled: 0, published: 0, inProduction: 0, gapToTarget: normalizedSettings.weeklyTarget };
      acc[key].total += 1;
      if (item.status === "scheduled") acc[key].scheduled += 1;
      if (item.status === "published") acc[key].published += 1;
      if (["scripted", "assets ready", "editing", "review"].includes(item.status)) acc[key].inProduction += 1;
      acc[key].gapToTarget = Math.max(0, normalizedSettings.weeklyTarget - acc[key].total);
      return acc;
    }, {});
    return Object.values(weeks).sort((a, b) => a.week.localeCompare(b.week));
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function generateCsv(items) {
    const rows = [["title", "format", "channel", "niche", "uploadDate", "status", "tools", "performanceNotes"]];
    normalizeItems(items).forEach((item) => {
      rows.push([item.title, item.format, item.channel, item.niche, item.uploadDate, item.status, item.tools.join("; "), item.performanceNotes]);
    });
    return rows.map((row) => row.map(csvCell).join(",")).join("\n");
  }

  function generateMarkdown(items, settings) {
    const normalizedSettings = normalizeSettings(settings);
    const filtered = filterItems(items, { month: normalizedSettings.month });
    const summary = summarize(items, normalizedSettings);
    const lines = [
      "# YouTube Calendar Monthly Plan",
      "",
      `Channel: ${normalizedSettings.channel}`,
      `Month: ${normalizedSettings.month}`,
      `Total items: ${summary.total}`,
      `Scheduled: ${summary.scheduled}`,
      `Published: ${summary.published}`,
      "",
      "## Upload Plan",
    ];
    filtered
      .sort((a, b) => a.uploadDate.localeCompare(b.uploadDate))
      .forEach((item) => {
        lines.push("", `### ${item.uploadDate} - ${item.title}`, `- Format: ${item.format}`, `- Status: ${item.status}`, `- Niche: ${item.niche}`, `- Tools: ${item.tools.join(", ") || "none"}`, `- Outline: ${item.scriptOutline}`, `- Performance notes: ${item.performanceNotes}`);
      });
    return lines.join("\n");
  }

  function exportStateJson(state) {
    const normalized = {
      settings: normalizeSettings(state?.settings),
      items: normalizeItems(state?.items),
      exportedAt: new Date().toISOString(),
      schema: STORAGE_KEY,
    };
    return JSON.stringify(normalized, null, 2);
  }

  function importStateJson(raw) {
    const parsed = JSON.parse(String(raw || ""));
    if (!parsed || typeof parsed !== "object") throw new Error("Import must be a JSON object.");
    const source = Array.isArray(parsed.items) ? parsed : parsed.state;
    if (!source || !Array.isArray(source.items)) throw new Error("Import JSON must include an items array.");
    return {
      settings: normalizeSettings(source.settings),
      items: normalizeItems(source.items),
    };
  }

  function createDemoState() {
    return { settings: { ...defaultSettings }, items: demoItems.map(normalizeItem) };
  }

  function loadState(storage) {
    try {
      const raw = storage?.getItem(STORAGE_KEY);
      if (!raw) return createDemoState();
      const parsed = JSON.parse(raw);
      return { settings: normalizeSettings(parsed.settings), items: normalizeItems(parsed.items) };
    } catch {
      return createDemoState();
    }
  }

  function saveState(storage, state) {
    const normalized = { settings: normalizeSettings(state.settings), items: normalizeItems(state.items) };
    storage?.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  return {
    STORAGE_KEY,
    statusOptions,
    formatOptions,
    toolOptions,
    defaultSettings,
    demoItems,
    normalizeItem,
    normalizeItems,
    normalizeSettings,
    createItem,
    addItem,
    updateStatus,
    deleteItem,
    deleteItemWithUndo,
    restoreDeletedItem,
    filterItems,
    getWeekKey,
    groupByUploadDate,
    summarize,
    summarizePipeline,
    weeklyPlanningSummary,
    generateCsv,
    generateMarkdown,
    exportStateJson,
    importStateJson,
    createDemoState,
    loadState,
    saveState,
  };
});

(function (root, factory) {
  const state = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = state;
  }
  root.ThumbnailIdeaBoardState = state;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const STORAGE_KEY = "ymstudio.thumbnailIdeaBoard.v1";
  const YOUTUBE_CALENDAR_KEY = "ymstudio.youtubeCalendar.v1";
  const EXPORT_VERSION = 1;

  const formatOptions = ["YouTube Long", "YouTube Shorts", "Course", "Product", "Community"];
  const statusOptions = ["idea", "draft", "ready", "tested", "archived"];
  const emotionOptions = ["궁금증", "충격", "비교", "전후 변화", "실수 방지", "체크리스트", "결과 공개"];
  const layoutOptions = ["얼굴 + 큰 문구", "전후 비교", "3분할 비교", "제품 클로즈업", "대시보드 캡처", "단순 투표 카드"];

  const demoIdeas = [
    {
      title: "AI 영상 제작비가 새는 5곳",
      format: "YouTube Long",
      status: "ready",
      emotion: "실수 방지",
      layout: "얼굴 + 큰 문구",
      subject: "API 비용 트래커 화면과 놀란 표정",
      overlayText: "돈 새는 곳 5개",
      palette: "딥그린, 화이트, 경고 오렌지",
      prompt: "clean YouTube thumbnail, Korean AI creator, dashboard cost warning, bold Korean text area, high contrast, sharp lighting, no logo",
      notes: "비용/크레딧 주제 영상의 첫 테스트 썸네일.",
      score: 5,
      favorite: true,
    },
    {
      title: "프롬프트 정리 전후 비교",
      format: "YouTube Shorts",
      status: "draft",
      emotion: "전후 변화",
      layout: "전후 비교",
      subject: "왼쪽은 지저분한 채팅, 오른쪽은 정리된 프롬프트 보드",
      overlayText: "정리 전 vs 후",
      palette: "민트, 차콜, 화이트",
      prompt: "split screen thumbnail, messy AI prompt chat versus clean prompt board, Korean text space, modern creator workflow",
      notes: "짧은 튜토리얼용. 텍스트는 6글자 이하로 유지.",
      score: 4,
      favorite: true,
    },
    {
      title: "유튜브 캘린더 없이 생기는 문제",
      format: "YouTube Long",
      status: "idea",
      emotion: "체크리스트",
      layout: "대시보드 캡처",
      subject: "업로드 일정이 비어 있는 캘린더와 체크리스트",
      overlayText: "업로드 밀림?",
      palette: "네이비, 옐로우, 화이트",
      prompt: "YouTube content calendar thumbnail, missed upload dates, checklist overlay, clean SaaS style, Korean text area",
      notes: "캘린더 모듈 홍보/설명 콘텐츠에 사용.",
      score: 3,
      favorite: false,
    },
    {
      title: "같은 캐릭터 유지하는 방법",
      format: "Course",
      status: "ready",
      emotion: "결과 공개",
      layout: "3분할 비교",
      subject: "같은 캐릭터가 세 장면에서 일관되게 보이는 예시",
      overlayText: "얼굴 안 바뀜",
      palette: "보라, 블랙, 라이트 그레이",
      prompt: "three panel AI character consistency thumbnail, same creator character in different scenes, clean comparison layout",
      notes: "다음 Character Consistency Tool과 연결 가능한 주제.",
      score: 5,
      favorite: true,
    },
  ];

  function makeId() {
    return "thumb_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function clampScore(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(5, Math.round(number)));
  }

  function normalizeChoice(value, options, fallback) {
    const text = String(value || "").trim();
    return options.includes(text) ? text : fallback;
  }

  function createIdea(input) {
    const source = input || {};
    return {
      id: source.id || makeId(),
      title: String(source.title || "새 썸네일 아이디어").trim() || "새 썸네일 아이디어",
      format: normalizeChoice(source.format, formatOptions, formatOptions[0]),
      status: normalizeChoice(source.status, statusOptions, statusOptions[0]),
      emotion: normalizeChoice(source.emotion, emotionOptions, emotionOptions[0]),
      layout: normalizeChoice(source.layout, layoutOptions, layoutOptions[0]),
      subject: String(source.subject || "").trim(),
      overlayText: String(source.overlayText || "").trim(),
      palette: String(source.palette || "").trim(),
      prompt: String(source.prompt || "").trim(),
      notes: String(source.notes || "").trim(),
      score: clampScore(source.score),
      favorite: Boolean(source.favorite),
      createdAt: source.createdAt || new Date().toISOString(),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function updateIdea(idea, changes) {
    return createIdea({
      ...idea,
      ...changes,
      id: idea.id,
      createdAt: idea.createdAt,
      updatedAt: new Date().toISOString(),
    });
  }

  function searchableText(idea) {
    return [
      idea.title,
      idea.format,
      idea.status,
      idea.emotion,
      idea.layout,
      idea.subject,
      idea.overlayText,
      idea.palette,
      idea.prompt,
      idea.notes,
    ].join(" ").toLowerCase();
  }

  function filterIdeas(ideas, filters) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const format = String(options.format || "").trim();
    const status = String(options.status || "").trim();
    const favoriteOnly = Boolean(options.favoriteOnly);
    const minScore = Number(options.minScore || 0);

    return ideas.filter((idea) => {
      if (query && !searchableText(idea).includes(query)) return false;
      if (format && idea.format !== format) return false;
      if (status && idea.status !== status) return false;
      if (favoriteOnly && !idea.favorite) return false;
      if (minScore && idea.score < minScore) return false;
      return true;
    });
  }

  function makePrompt(idea) {
    return [
      `Title: ${idea.title}`,
      `Format: ${idea.format}`,
      `Emotion: ${idea.emotion}`,
      `Layout: ${idea.layout}`,
      `Subject: ${idea.subject}`,
      `Overlay text: ${idea.overlayText}`,
      `Palette: ${idea.palette}`,
      "",
      "Image prompt:",
      idea.prompt,
      "",
      "Notes:",
      idea.notes,
    ].join("\n");
  }

  function getSummary(ideas) {
    return ideas.reduce(
      (summary, idea) => {
        summary.total += 1;
        if (idea.status === "ready") summary.ready += 1;
        if (idea.status === "tested") summary.tested += 1;
        if (idea.favorite) summary.favorites += 1;
        summary.averageScore += idea.score;
        return summary;
      },
      { total: 0, ready: 0, tested: 0, favorites: 0, averageScore: 0 }
    );
  }

  function finalizeSummary(summary) {
    return {
      ...summary,
      averageScore: summary.total ? Math.round((summary.averageScore / summary.total) * 10) / 10 : 0,
    };
  }

  function loadIdeas(storage) {
    if (!storage) return demoIdeas.map(createIdea);
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return demoIdeas.map(createIdea);
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return demoIdeas.map(createIdea);
      return parsed.map(createIdea);
    } catch (error) {
      return demoIdeas.map(createIdea);
    }
  }

  function saveIdeas(storage, ideas) {
    if (!storage) return;
    storage.setItem(STORAGE_KEY, JSON.stringify(ideas.map(createIdea)));
  }

  function exportIdeas(ideas) {
    return {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      ideas: Array.isArray(ideas) ? ideas.map(createIdea) : [],
    };
  }

  function parseIdeaImport(input) {
    const parsed = typeof input === "string" ? JSON.parse(input) : input;
    if (Array.isArray(parsed)) return parsed.map(createIdea);
    if (parsed && Array.isArray(parsed.ideas)) return parsed.ideas.map(createIdea);
    throw new Error("Invalid thumbnail idea export");
  }

  function ideaToCalendarItem(idea) {
    const safeIdea = createIdea(idea);
    return {
      id: makeId().replace("thumb_", "yt_"),
      title: safeIdea.title,
      format: safeIdea.format === "YouTube Shorts" ? "Shorts" : "long-form",
      channel: "YMSTUDIO AI",
      niche: safeIdea.subject || "Thumbnail test",
      uploadDate: new Date().toISOString().slice(0, 10),
      status: safeIdea.status === "ready" ? "assets ready" : "idea",
      scriptOutline: safeIdea.subject,
      titleVariants: [safeIdea.title, safeIdea.overlayText].filter(Boolean),
      thumbnailPrompts: [safeIdea.prompt].filter(Boolean),
      tools: ["Thumbnail Idea Board"],
      performanceNotes: [safeIdea.overlayText, safeIdea.palette, safeIdea.notes].filter(Boolean).join("\n"),
    };
  }

  function sendToYouTubeCalendar(storage, idea) {
    if (!storage) return { ok: false, message: "localStorage를 사용할 수 없습니다." };
    const item = ideaToCalendarItem(idea);
    try {
      const raw = storage.getItem(YOUTUBE_CALENDAR_KEY);
      if (!raw) {
        storage.setItem(YOUTUBE_CALENDAR_KEY, JSON.stringify({
          settings: { channel: item.channel, month: item.uploadDate.slice(0, 7), weeklyTarget: 5 },
          items: [item],
        }));
        return { ok: true, message: "캘린더에 썸네일 기반 업로드 아이디어를 만들었습니다.", items: 1 };
      }
      const current = JSON.parse(raw);
      const items = Array.isArray(current.items) ? current.items : [];
      const next = {
        settings: current.settings || { channel: item.channel, month: item.uploadDate.slice(0, 7), weeklyTarget: 5 },
        items: items.concat(item),
      };
      storage.setItem(YOUTUBE_CALENDAR_KEY, JSON.stringify(next));
      return { ok: true, message: "캘린더에 썸네일 프롬프트를 추가했습니다.", items: next.items.length };
    } catch (error) {
      return { ok: false, message: "기존 캘린더 JSON을 읽지 못했습니다. 캘린더에서 먼저 백업하거나 초기화하세요.", items: 0 };
    }
  }

  return {
    STORAGE_KEY,
    YOUTUBE_CALENDAR_KEY,
    EXPORT_VERSION,
    formatOptions,
    statusOptions,
    emotionOptions,
    layoutOptions,
    demoIdeas,
    createIdea,
    updateIdea,
    filterIdeas,
    makePrompt,
    getSummary: (ideas) => finalizeSummary(getSummary(ideas || [])),
    loadIdeas,
    saveIdeas,
    exportIdeas,
    parseIdeaImport,
    ideaToCalendarItem,
    sendToYouTubeCalendar,
  };
});

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.CreatorPromptBoardState = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  const STORAGE_KEY = "ymstudio.creatorPromptBoard.v1";
  const EXPORT_VERSION = 1;
  const MAX_PROMPTS = 250;
  const MAX_TITLE_LENGTH = 120;
  const MAX_BODY_LENGTH = 8000;
  const MAX_NOTES_LENGTH = 4000;
  const MAX_TAG_LENGTH = 48;
  const MAX_TAGS = 12;

  const toolOptions = [
    "Nano Banana",
    "Midjourney",
    "Runway",
    "Kling",
    "Pika",
    "ComfyUI",
    "ChatGPT",
    "Claude",
  ];

  const categoryOptions = [
    "YouTube Shorts",
    "Thumbnail",
    "Character",
    "Product ad",
    "Storyboard",
    "Image prompt",
    "Video prompt",
    "Script",
  ];

  const demoPrompts = [
    {
      title: "유튜브 Shorts 훅 만들기",
      body:
        "AI 크리에이터용 22초 YouTube Shorts 대본을 만들어줘. 첫 2초는 시선을 끄는 훅으로 시작하고, 바로 따라 할 수 있는 워크플로우 이득 1개를 보여줘. 빠른 화면 전환 3개, 자연스러운 팔로우 유도, 음성으로 읽기 쉬운 짧은 문장으로 구성해줘.",
      toolTags: ["ChatGPT", "Claude"],
      categoryTags: ["YouTube Shorts", "Script"],
      favorite: true,
      rating: 5,
      resultNotes: "B-roll 만들기 전에 사용. 조회 유지율 테스트용으로 훅 3개 버전을 같이 요청하면 좋음.",
    },
    {
      title: "프리미엄 제품 광고 오프닝",
      body:
        "크리에이터 책상 위 미니멀 무선 마이크 키트를 위한 7초 세로 광고 영상. 제품 디테일 매크로 샷으로 시작하고, 손이 마이크를 꽂는 장면으로 전환한 뒤, 깔끔한 히어로 샷으로 마무리해줘. 소프트박스 조명, 선명한 반사, 부드러운 카메라 푸시, 프리미엄 스튜디오 느낌. 텍스트와 왜곡된 로고는 제외.",
      toolTags: ["Runway", "Kling", "Pika"],
      categoryTags: ["Product ad", "Video prompt"],
      favorite: true,
      rating: 5,
      resultNotes: "런칭 영상 첫 장면으로 적합. 고객별로 제품명과 브랜드 컬러만 바꿔 재사용.",
    },
    {
      title: "캐릭터 일관성 기준표",
      body:
        "모든 장면에서 같은 크리에이터 캐릭터를 유지해줘. 20대 후반 한국 여성 창업자, 짧은 검은 보브컷, 아이보리 블레이저, 작은 실버 귀걸이, 차분하고 자신 있는 표정, 실제 피부 질감, 자연스러운 손, 현대적인 서울 스튜디오. 얼굴 구조, 머리 길이, 의상, 분위기를 매번 동일하게 유지.",
      toolTags: ["Kling", "ComfyUI", "Nano Banana"],
      categoryTags: ["Character", "Image prompt"],
      favorite: true,
      rating: 5,
      resultNotes: "가능하면 기준 이미지, seed, 모델 메모와 같이 사용.",
    },
    {
      title: "썸네일 콘셉트 생성기",
      body:
        "AI 영상 제작 워크플로우를 만드는 영상용 고클릭 썸네일 콘셉트 5개를 제안해줘. 인물 포즈, 배경 장면, 조명, 감정, 텍스트 여백, 색 대비, 궁금증을 만드는 포인트를 포함해줘. 복잡한 구성, 작은 UI 글자, 흔한 로봇 이미지는 피해야 해.",
      toolTags: ["Midjourney", "Nano Banana", "ChatGPT"],
      categoryTags: ["Thumbnail", "Image prompt"],
      favorite: false,
      rating: 4,
      resultNotes: "먼저 콘셉트를 고른 뒤, 가장 좋은 콘셉트만 이미지 프롬프트로 확장.",
    },
    {
      title: "6컷 스토리보드 플래너",
      body:
        "크리에이터 튜토리얼 아이디어를 6컷 스토리보드로 바꿔줘. 각 컷마다 샷 타입, 인물 행동, 카메라 움직임, 내레이션 포인트, 화면에 필요한 에셋, 전환 방식, 생성 메모를 넣어줘. 편집자 1명이 2시간 안에 만들 수 있는 현실적인 구성으로 정리.",
      toolTags: ["Claude", "ChatGPT"],
      categoryTags: ["Storyboard", "YouTube Shorts"],
      favorite: false,
      rating: 4,
      resultNotes: "Runway, Kling, Pika에서 장면을 한꺼번에 만들기 전에 사용.",
    },
    {
      title: "ComfyUI에서 Runway로 넘기는 제작 흐름",
      body:
        "일관된 AI 진행자 클립을 만드는 반복 워크플로우를 만들어줘. ComfyUI에서 기본 인물 이미지를 만들고, 캐릭터 기준을 고정하고, 깨끗하게 업스케일한 뒤, 표정 3가지를 만들고, Runway 또는 Kling에서 움직임을 넣어줘. 마지막으로 seed, 모델, 프롬프트, 네거티브 프롬프트, 내보내기 설정을 문서화.",
      toolTags: ["ComfyUI", "Runway", "Kling"],
      categoryTags: ["Character", "Video prompt"],
      favorite: false,
      rating: 5,
      resultNotes: "워크플로우 문서화용 체크리스트 프롬프트로 사용.",
    },
  ];

  function makeId() {
    return "prompt_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function normalizeRating(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(5, Math.round(number)));
  }

  function normalizeTags(tags) {
    if (!Array.isArray(tags)) return [];
    return Array.from(
      new Set(
        tags
          .map((tag) => String(tag || "").trim())
          .filter(Boolean)
          .map((tag) => tag.slice(0, MAX_TAG_LENGTH))
      )
    ).slice(0, MAX_TAGS);
  }

  function createPrompt(input) {
    const source = input || {};
    return {
      id: source.id || makeId(),
      title: String(source.title || "Untitled prompt").trim() || "Untitled prompt",
      body: String(source.body || "").trim(),
      toolTags: normalizeTags(source.toolTags),
      categoryTags: normalizeTags(source.categoryTags),
      favorite: Boolean(source.favorite),
      rating: normalizeRating(source.rating),
      resultNotes: String(source.resultNotes || "").trim(),
      createdAt: source.createdAt || new Date().toISOString(),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function updatePrompt(prompt, changes) {
    return createPrompt({
      ...prompt,
      ...changes,
      id: prompt.id,
      createdAt: prompt.createdAt,
      updatedAt: new Date().toISOString(),
    });
  }

  function toggleFavorite(prompt) {
    return updatePrompt(prompt, { favorite: !prompt.favorite });
  }

  function searchableText(prompt) {
    return [
      prompt.title,
      prompt.body,
      prompt.resultNotes,
      ...(prompt.toolTags || []),
      ...(prompt.categoryTags || []),
    ]
      .join(" ")
      .toLowerCase();
  }

  function filterPrompts(prompts, filters) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const tool = String(options.tool || "").trim();
    const category = String(options.category || "").trim();
    const favoriteOnly = Boolean(options.favoriteOnly);
    const minRating = Number(options.minRating || 0);

    return prompts.filter((prompt) => {
      if (query && !searchableText(prompt).includes(query)) return false;
      if (tool && !(prompt.toolTags || []).includes(tool)) return false;
      if (category && !(prompt.categoryTags || []).includes(category)) return false;
      if (favoriteOnly && !prompt.favorite) return false;
      if (minRating && prompt.rating < minRating) return false;
      return true;
    });
  }

  function formatPromptForCopy(prompt) {
    const toolLine = prompt.toolTags.length ? "Tools: " + prompt.toolTags.join(", ") : "Tools: none";
    const categoryLine = prompt.categoryTags.length
      ? "Categories: " + prompt.categoryTags.join(", ")
      : "Categories: none";
    const notesLine = prompt.resultNotes ? "\n\nResult notes:\n" + prompt.resultNotes : "";
    return `${prompt.title}\n\n${prompt.body}\n\n${toolLine}\n${categoryLine}\nRating: ${prompt.rating}/5${notesLine}`;
  }

  function loadPrompts(storage) {
    if (!storage) return demoPrompts.map(createPrompt);
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return demoPrompts.map(createPrompt);
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return demoPrompts.map(createPrompt);
      return parsed.map(createPrompt);
    } catch (error) {
      return demoPrompts.map(createPrompt);
    }
  }

  function savePrompts(storage, prompts) {
    if (!storage) return;
    storage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  }

  function exportPrompts(prompts) {
    const safePrompts = Array.isArray(prompts) ? prompts.map(createPrompt) : [];
    return {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      prompts: safePrompts,
    };
  }

  function parsePromptImport(input) {
    let parsed = input;
    if (typeof input === "string") {
      try {
        parsed = JSON.parse(input);
      } catch (error) {
        return { ok: false, error: "Invalid JSON. Choose a valid Creator Prompt Board export file." };
      }
    }

    const rawPrompts = Array.isArray(parsed) ? parsed : parsed && parsed.prompts;
    if (!Array.isArray(rawPrompts)) {
      return { ok: false, error: "Import must be an exported object with prompts or a raw prompt array." };
    }
    if (rawPrompts.length === 0) {
      return { ok: false, error: "Import file does not contain any prompts." };
    }
    if (rawPrompts.length > MAX_PROMPTS) {
      return { ok: false, error: `Import is limited to ${MAX_PROMPTS} prompts.` };
    }

    const normalized = [];
    for (let index = 0; index < rawPrompts.length; index += 1) {
      const result = normalizeImportedPrompt(rawPrompts[index], index);
      if (!result.ok) return result;
      normalized.push(result.prompt);
    }

    return { ok: true, prompts: normalized };
  }

  function normalizeImportedPrompt(input, index) {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return { ok: false, error: `Prompt ${index + 1} must be an object.` };
    }

    const title = safeText(input.title, MAX_TITLE_LENGTH).trim();
    const body = safeText(input.body, MAX_BODY_LENGTH).trim();
    const resultNotes = safeText(input.resultNotes, MAX_NOTES_LENGTH).trim();

    if (!title) return { ok: false, error: `Prompt ${index + 1} is missing a title.` };
    if (!body) return { ok: false, error: `Prompt ${index + 1} is missing a prompt body.` };
    if (input.toolTags !== undefined && !isStringArray(input.toolTags)) {
      return { ok: false, error: `Prompt ${index + 1} has invalid tool tags.` };
    }
    if (input.categoryTags !== undefined && !isStringArray(input.categoryTags)) {
      return { ok: false, error: `Prompt ${index + 1} has invalid category tags.` };
    }
    if (input.favorite !== undefined && typeof input.favorite !== "boolean") {
      return { ok: false, error: `Prompt ${index + 1} has an invalid favorite value.` };
    }
    if (input.rating !== undefined && !Number.isFinite(Number(input.rating))) {
      return { ok: false, error: `Prompt ${index + 1} has an invalid rating.` };
    }

    return {
      ok: true,
      prompt: createPrompt({
        id: typeof input.id === "string" && input.id.trim() ? input.id.trim().slice(0, 80) : undefined,
        title,
        body,
        toolTags: normalizeTags(input.toolTags),
        categoryTags: normalizeTags(input.categoryTags),
        favorite: Boolean(input.favorite),
        rating: normalizeRating(input.rating),
        resultNotes,
        createdAt: validDateString(input.createdAt) ? input.createdAt : new Date().toISOString(),
        updatedAt: validDateString(input.updatedAt) ? input.updatedAt : new Date().toISOString(),
      }),
    };
  }

  function safeText(value, maxLength) {
    if (typeof value !== "string" && typeof value !== "number") return "";
    return String(value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ").slice(0, maxLength);
  }

  function isStringArray(value) {
    return Array.isArray(value) && value.every((item) => typeof item === "string" || typeof item === "number");
  }

  function validDateString(value) {
    return typeof value === "string" && !Number.isNaN(Date.parse(value));
  }

  return {
    STORAGE_KEY,
    EXPORT_VERSION,
    toolOptions,
    categoryOptions,
    demoPrompts,
    createPrompt,
    updatePrompt,
    toggleFavorite,
    normalizeRating,
    filterPrompts,
    formatPromptForCopy,
    loadPrompts,
    savePrompts,
    exportPrompts,
    parsePromptImport,
  };
});

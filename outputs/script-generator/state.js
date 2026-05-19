(function (root, factory) {
  const state = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = state;
  }
  root.ScriptGeneratorState = state;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const STORAGE_KEY = "ymstudio.scriptGenerator.v1";
  const PROJECT_KEY = "ymstudio.creatorProject.v1";
  const SHOT_PLANNER_KEY = "ymstudio.aiShotPlanner.v1";
  const EXPORT_VERSION = 1;

  const formats = ["YouTube Long", "Shorts", "Tutorial", "Product Demo", "Course Lesson"];
  const tones = ["쉽고 차분하게", "빠르고 강하게", "전문가처럼", "친근하게", "문제 해결형"];
  const statuses = ["idea", "draft", "ready", "reviewed"];

  const demoScripts = [
    {
      title: "AI 영상 제작 초보자가 처음 만드는 워크플로우",
      format: "YouTube Long",
      tone: "쉽고 차분하게",
      status: "draft",
      audience: "AI 영상 제작을 처음 시작하는 1인 크리에이터",
      goal: "빈 화면에서 시작하지 않고 순서대로 작업하게 만들기",
      hook: "AI 영상 제작이 어려운 이유는 도구가 부족해서가 아니라 순서가 없기 때문입니다.",
      outline: "문제 제기 > 작업 순서 소개 > 모듈별 사용 예시 > JSON 백업 > 다음 행동",
      scenes: [
        "대시보드에서 새 영상 프로젝트를 만든다.",
        "템플릿을 골라 훅과 대본 방향을 정한다.",
        "샷 플랜과 썸네일 후보를 만든다.",
        "업로드 일정과 자산을 정리한다.",
      ],
      cta: "오늘 만들 영상 주제 하나를 정하고 Creator Project에 저장해보세요.",
      notes: "초보자용 튜토리얼 영상 첫 번째 에피소드로 사용.",
      favorite: true,
    },
    {
      title: "템플릿으로 대본 시간을 줄이는 방법",
      format: "Shorts",
      tone: "빠르고 강하게",
      status: "ready",
      audience: "숏폼을 자주 만드는 크리에이터",
      goal: "대본 반복 작업을 템플릿화하는 장점 설명",
      hook: "매번 대본을 새로 쓰면 영상 제작 속도는 절대 빨라지지 않습니다.",
      outline: "반복 문제 > 템플릿 선택 > 훅 변형 > CTA 저장",
      scenes: ["빈 문서 화면", "템플릿 라이브러리 선택", "대본 초안 완성", "Prompt Board 저장"],
      cta: "자주 쓰는 대본 구조를 하나 저장해두세요.",
      notes: "템플릿 라이브러리 홍보용 짧은 영상.",
      favorite: true,
    },
    {
      title: "영상 아이디어를 업로드 계획으로 바꾸기",
      format: "Tutorial",
      tone: "문제 해결형",
      status: "idea",
      audience: "기획은 하지만 업로드까지 못 가는 사람",
      goal: "아이디어를 일정과 자산 정리까지 연결",
      hook: "아이디어가 많은데 업로드가 안 된다면, 문제는 아이디어가 아니라 연결입니다.",
      outline: "아이디어 입력 > 샷 나누기 > 썸네일 > 캘린더 > 리뷰",
      scenes: ["Creator Project", "Shot Planner", "Thumbnail Board", "YouTube Calendar"],
      cta: "이번 주 올릴 영상 하나만 캘린더에 넣어보세요.",
      notes: "대시보드 흐름 설명 영상.",
      favorite: false,
    },
  ];

  function makeId() {
    return "script_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function makeLinkedId(prefix) {
    return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function normalizeChoice(value, options, fallback) {
    const text = String(value || "").trim();
    return options.includes(text) ? text : fallback;
  }

  function normalizeScenes(value) {
    if (Array.isArray(value)) {
      return value.map((item) => String(item || "").trim()).filter(Boolean);
    }
    return String(value || "")
      .split(/\r?\n/)
      .map((item) => item.replace(/^(?:\d+[\).\s-]*|[-*]\s*)/, "").trim())
      .filter(Boolean);
  }

  function createScript(input) {
    const source = input || {};
    return {
      id: source.id || makeId(),
      title: String(source.title || "새 대본 초안").trim() || "새 대본 초안",
      format: normalizeChoice(source.format, formats, formats[0]),
      tone: normalizeChoice(source.tone, tones, tones[0]),
      status: normalizeChoice(source.status, statuses, statuses[0]),
      audience: String(source.audience || "").trim(),
      goal: String(source.goal || "").trim(),
      hook: String(source.hook || "").trim(),
      outline: String(source.outline || "").trim(),
      scenes: normalizeScenes(source.scenes),
      cta: String(source.cta || "").trim(),
      notes: String(source.notes || "").trim(),
      favorite: Boolean(source.favorite),
      createdAt: source.createdAt || new Date().toISOString(),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function updateScript(script, changes) {
    return createScript({
      ...script,
      ...changes,
      id: script.id,
      createdAt: script.createdAt,
      updatedAt: new Date().toISOString(),
    });
  }

  function searchableText(script) {
    return [
      script.title,
      script.format,
      script.tone,
      script.status,
      script.audience,
      script.goal,
      script.hook,
      script.outline,
      script.scenes.join(" "),
      script.cta,
      script.notes,
    ].join(" ").toLowerCase();
  }

  function filterScripts(scripts, filters) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const format = String(options.format || "").trim();
    const status = String(options.status || "").trim();
    const favoriteOnly = Boolean(options.favoriteOnly);

    return scripts.filter((script) => {
      if (query && !searchableText(script).includes(query)) return false;
      if (format && script.format !== format) return false;
      if (status && script.status !== status) return false;
      if (favoriteOnly && !script.favorite) return false;
      return true;
    });
  }

  function formatScript(script) {
    const lines = [
      `제목: ${script.title}`,
      `형식: ${script.format}`,
      `톤: ${script.tone}`,
      `타깃: ${script.audience}`,
      `목적: ${script.goal}`,
      "",
      `훅: ${script.hook}`,
    ];
    if (script.outline) {
      lines.push("", "개요:", script.outline);
    }
    lines.push(
      "",
      "장면:",
      ...script.scenes.map((scene, index) => `${index + 1}. ${scene}`),
      "",
      `CTA: ${script.cta}`
    );
    if (script.notes) {
      lines.push("", "메모:", script.notes);
    }
    return lines.join("\n");
  }

  function scriptToShotPlan(script) {
    const safeScript = createScript(script);
    const scenes = (safeScript.scenes.length ? safeScript.scenes : [safeScript.hook || safeScript.title]).map((sceneText, index) => {
      const sceneId = makeLinkedId("scene");
      return {
        id: sceneId,
        title: sceneText.slice(0, 60) || `장면 ${index + 1}`,
        summary: sceneText,
        location: "",
        order: index + 1,
      };
    });
    const shots = scenes.map((scene, index) => ({
      id: makeLinkedId("shot"),
      sceneId: scene.id,
      shotNumber: `${index + 1}.1`,
      title: scene.title,
      description: scene.summary,
      prompt: [safeScript.hook, scene.summary, safeScript.cta].filter(Boolean).join("\n"),
      tool: "Claude",
      model: "Script Generator draft",
      status: "idea",
      duration: "",
      assetPaths: { image: "", video: "", reference: "" },
      continuity: { character: "", outfit: "", location: "", mood: safeScript.tone, cameraStyle: "" },
      notes: safeScript.notes || "Script Generator에서 보낸 장면 초안입니다.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    return {
      version: 1,
      project: {
        title: safeScript.title,
        goal: safeScript.goal,
        format: safeScript.format,
        audience: safeScript.audience,
        continuity: { character: "", outfit: "", location: "", mood: safeScript.tone, cameraStyle: "" },
      },
      scenes,
      shots,
      updatedAt: new Date().toISOString(),
    };
  }

  function sendToShotPlanner(storage, script) {
    if (!storage) return { ok: false, message: "localStorage를 사용할 수 없습니다." };
    const incoming = scriptToShotPlan(script);
    try {
      const raw = storage.getItem(SHOT_PLANNER_KEY);
      if (!raw) {
        storage.setItem(SHOT_PLANNER_KEY, JSON.stringify(incoming));
        return { ok: true, message: "샷 플래너에 새 계획을 만들었습니다.", scenes: incoming.scenes.length, shots: incoming.shots.length };
      }
      const current = JSON.parse(raw);
      const currentScenes = Array.isArray(current.scenes) ? current.scenes : [];
      const currentShots = Array.isArray(current.shots) ? current.shots : [];
      const maxOrder = currentScenes.reduce((highest, scene) => Math.max(highest, Number(scene.order) || 0), 0);
      const scenes = incoming.scenes.map((scene, index) => ({ ...scene, order: maxOrder + index + 1 }));
      const next = {
        ...current,
        version: current.version || 1,
        project: current.project || incoming.project,
        scenes: currentScenes.concat(scenes),
        shots: currentShots.concat(incoming.shots),
        updatedAt: new Date().toISOString(),
      };
      storage.setItem(SHOT_PLANNER_KEY, JSON.stringify(next));
      return { ok: true, message: "샷 플래너에 장면을 추가했습니다.", scenes: scenes.length, shots: incoming.shots.length };
    } catch (error) {
      return { ok: false, message: "기존 샷 플랜 JSON을 읽지 못했습니다. 샷 플래너에서 먼저 백업하거나 초기화하세요.", scenes: 0, shots: 0 };
    }
  }

  function buildFromProject(project) {
    const source = project || {};
    const topic = String(source.videoTopic || "").trim() || "새 영상 주제";
    const audience = String(source.targetAudience || "").trim() || "처음 보는 시청자";
    const goal = String(source.videoGoal || "").trim() || "영상의 핵심 메시지를 쉽게 전달";
    const tone = normalizeChoice(source.tone, tones, tones[0]);
    return createScript({
      title: topic,
      format: String(source.platform || "").includes("Short") ? "Shorts" : "YouTube Long",
      tone,
      status: "draft",
      audience,
      goal,
      hook: `${audience}가 ${topic}을 바로 이해하지 못하는 이유부터 짚어줍니다.`,
      outline: "문제 제기 > 핵심 설명 > 예시 > 따라 할 행동 > 마무리",
      scenes: [
        `${topic}을 왜 지금 다뤄야 하는지 보여줍니다.`,
        "시청자가 겪는 문제를 짧게 정리합니다.",
        "해결 순서를 3단계로 나눠 설명합니다.",
        "바로 따라 할 수 있는 다음 행동을 제시합니다.",
      ],
      cta: "오늘 바로 적용할 한 가지를 정하고 작업 목록에 저장해보세요.",
      notes: source.channelName ? `${source.channelName} 프로젝트에서 생성한 초안입니다.` : "Creator Project에서 생성한 초안입니다.",
      favorite: false,
    });
  }

  function getSummary(scripts) {
    return (scripts || []).reduce(
      (summary, script) => {
        summary.total += 1;
        if (script.status === "ready") summary.ready += 1;
        if (script.favorite) summary.favorites += 1;
        return summary;
      },
      { total: 0, ready: 0, favorites: 0 }
    );
  }

  function loadProject(storage) {
    if (!storage) return {};
    try {
      return JSON.parse(storage.getItem(PROJECT_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function loadScripts(storage) {
    if (!storage) return demoScripts.map(createScript);
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return demoScripts.map(createScript);
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return demoScripts.map(createScript);
      return parsed.map(createScript);
    } catch (error) {
      return demoScripts.map(createScript);
    }
  }

  function saveScripts(storage, scripts) {
    if (!storage) return;
    storage.setItem(STORAGE_KEY, JSON.stringify((scripts || []).map(createScript)));
  }

  function exportScripts(scripts) {
    return {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      scripts: Array.isArray(scripts) ? scripts.map(createScript) : [],
    };
  }

  function parseScriptImport(input) {
    const parsed = typeof input === "string" ? JSON.parse(input) : input;
    if (Array.isArray(parsed)) return parsed.map(createScript);
    if (parsed && Array.isArray(parsed.scripts)) return parsed.scripts.map(createScript);
    throw new Error("Invalid script generator export");
  }

  return {
    STORAGE_KEY,
    PROJECT_KEY,
    SHOT_PLANNER_KEY,
    EXPORT_VERSION,
    formats,
    tones,
    statuses,
    demoScripts,
    createScript,
    updateScript,
    filterScripts,
    formatScript,
    scriptToShotPlan,
    sendToShotPlanner,
    buildFromProject,
    getSummary,
    loadProject,
    loadScripts,
    saveScripts,
    exportScripts,
    parseScriptImport,
  };
});

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.AiShotPlannerState = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  const STORAGE_KEY = "ymstudio.aiShotPlanner.v1";
  const ASSET_MANAGER_KEY = "ymstudio.creatorAssetManager.v1";
  const EXPORT_VERSION = 1;

  const statusOptions = ["idea", "prompt ready", "generating", "review", "approved", "rejected"];
  const toolOptions = ["Runway", "Kling", "Pika", "ComfyUI", "Claude", "Nano Banana", "ChatGPT", "Midjourney"];

  const demoProject = {
    title: "Creator OS 런칭 Shorts",
    goal: "로컬 크리에이터 작업 도구를 소개하는 30초 AI 영상.",
    format: "세로 9:16 Shorts",
    audience: "AI 영상 크리에이터와 1인 제작자",
    continuity: {
      character: "20대 후반 한국 여성 창업자, 짧은 검은 보브컷, 차분하고 자신 있는 표정.",
      outfit: "아이보리 블레이저, 검은 상의, 작은 실버 귀걸이.",
      location: "월넛 책상, 소프트박스 반사, 노트북 1대가 있는 작은 서울 크리에이터 스튜디오.",
      mood: "프리미엄, 집중된, 실용적인, 긍정적인 분위기.",
      cameraStyle: "깔끔한 핸드헬드 리얼리즘, 얕은 심도, 부드러운 푸시인, 왜곡된 UI 텍스트 없음.",
    },
  };

  const demoScenes = [
    createScene({
      id: "scene_hook",
      title: "훅: 흩어진 작업 흐름",
      summary: "프롬프트, 레퍼런스, 샷 메모가 여러 도구에 흩어져 생기는 혼란을 보여줌.",
      location: "월넛 책상, 작은 서울 크리에이터 스튜디오",
      order: 1,
    }),
    createScene({
      id: "scene_system",
      title: "시스템: 로컬 크리에이터 보드",
      summary: "AI 생성 작업을 정리하는 로컬 우선 샷 플래너를 공개.",
      location: "소프트박스 반사가 있는 노트북 작업대",
      order: 2,
    }),
    createScene({
      id: "scene_payoff",
      title: "결과: 바로 생성 가능한 상태",
      summary: "정리된 승인 샷 플랜과 자신감 있는 제작 흐름으로 마무리.",
      location: "같은 책상, 창업자가 더 넓게 보이는 각도",
      order: 3,
    }),
  ];

  const demoShots = [
    createShot({
      id: "shot_001",
      sceneId: "scene_hook",
      shotNumber: "1.1",
      title: "책상 위 혼란 오프닝",
      description: "노트북 주변에 프롬프트 조각, 레퍼런스 경로, 메모지가 흩어진 장면을 빠르게 위에서 보여줌.",
      prompt:
        "세로 9:16. 노트북 주변에 프롬프트 메모, 레퍼런스 썸네일, 타임라인 조각이 놓인 크리에이터 책상을 위에서 촬영. 프리미엄 리얼 조명, 빠른 푸시인, 읽히는 브랜드 텍스트 없음.",
      tool: "Runway",
      model: "Gen-3 vertical",
      status: "approved",
      duration: "3s",
      assetPaths: {
        image: "assets/references/desk-chaos.png",
        video: "exports/runway/shot_001.mp4",
        reference: "refs/studio-desk-board/",
      },
      continuity: {
        character: "창업자의 손만 보이고 같은 아이보리 블레이저 소매가 보임.",
        outfit: "아이보리 블레이저 소매.",
        location: "서울 스튜디오의 월넛 책상.",
        mood: "복잡하지만 프리미엄한 느낌.",
        cameraStyle: "위에서 내려다보는 푸시인, 선명한 그림자.",
      },
      notes: "첫 2초 시선 끌기 장면으로 사용.",
    }),
    createShot({
      id: "shot_002",
      sceneId: "scene_hook",
      shotNumber: "1.2",
      title: "도구 탭이 계속 쌓이는 장면",
      description: "추상적인 창과 생성 대기열로 노트북 화면의 복잡함을 표현.",
      prompt:
        "AI 영상 크리에이터의 노트북 화면에 여러 생성 창이 겹쳐 쌓이는 장면. 흐릿한 UI 형태만 보이고 커서 움직임, 따뜻한 스튜디오 반사, 제품 광고처럼 깔끔한 리얼리즘, 읽히는 텍스트 없음.",
      tool: "Kling",
      model: "Kling 1.6",
      status: "review",
      duration: "4s",
      assetPaths: {
        image: "assets/references/ui-clutter-frame.jpg",
        video: "exports/kling/shot_002_review.mp4",
        reference: "refs/no-readable-ui.md",
      },
      continuity: {
        character: "화면 반사에 창업자의 짧은 보브컷 실루엣이 희미하게 보임.",
        outfit: "아이보리 블레이저.",
        location: "같은 책상과 노트북 각도.",
        mood: "바쁘고 약간 긴장된 분위기.",
        cameraStyle: "가까운 매크로 글라이드, 화면 보케.",
      },
      notes: "승인 전 가짜 텍스트 깨짐이 있는지 확인.",
    }),
    createShot({
      id: "shot_003",
      sceneId: "scene_hook",
      shotNumber: "1.3",
      title: "Claude가 아이디어를 장면으로 정리",
      description: "텍스트 기획이 깔끔한 3장면 구성으로 바뀌는 장면.",
      prompt:
        "이 런칭 콘셉트를 짧은 영상 장면 3개로 바꿔줘. 명확한 훅 1개, 제품 공개 1개, 결과 장면 1개를 포함하고, 각 장면은 바로 AI 영상 생성에 쓸 수 있게 정리.",
      tool: "Claude",
      model: "Claude planning pass",
      status: "prompt ready",
      duration: "Planning",
      assetPaths: {
        image: "",
        video: "",
        reference: "docs/episode-brief.md",
      },
      continuity: {
        character: "이후 시각 프롬프트에 사용할 같은 창업자 설명.",
        outfit: "아이보리 블레이저, 검은 상의.",
        location: "서울 스튜디오.",
        mood: "정리되고 실용적인 분위기.",
        cameraStyle: "결과물에 시각 연속성 항목을 유지.",
      },
      notes: "콘셉트가 바뀌면 이 프롬프트로 장면 요약을 다시 생성.",
    }),
    createShot({
      id: "shot_004",
      sceneId: "scene_system",
      shotNumber: "2.1",
      title: "플래너 보드 공개",
      description: "노트북에 열린 로컬 샷 플래너를 제품 소개처럼 깔끔하게 공개.",
      prompt:
        "세로 클로즈업. 크리에이터 노트북에 세련된 로컬 제작 보드가 열려 있음. 장면, 샷, 프롬프트, 상태, 에셋 경로 행이 보이고, 현대적인 스튜디오 책상, 얕은 심도, 구조는 보이지만 정확한 UI 텍스트는 읽히지 않음.",
      tool: "Pika",
      model: "Pika 2.2",
      status: "generating",
      duration: "5s",
      assetPaths: {
        image: "assets/references/planner-wireframe.png",
        video: "exports/pika/shot_004_pending.mp4",
        reference: "refs/local-app-look/",
      },
      continuity: {
        character: "창업자의 손이 보드를 가리킴.",
        outfit: "아이보리 블레이저 소매와 실버 반지.",
        location: "같은 책상, 가운데 놓인 노트북.",
        mood: "안도감과 통제감.",
        cameraStyle: "키보드에서 화면으로 천천히 푸시.",
      },
      notes: "SaaS 랜딩페이지가 아니라 실제로 쓰는 도구처럼 보여야 함.",
    }),
    createShot({
      id: "shot_005",
      sceneId: "scene_system",
      shotNumber: "2.2",
      title: "캐릭터 기준 이미지 고정",
      description: "반복 등장할 창업자 인물 기준 이미지를 준비.",
      prompt:
        "20대 후반 한국 여성 창업자의 일관된 인물 기준 이미지를 생성. 짧은 검은 보브컷, 아이보리 블레이저, 검은 상의, 작은 실버 귀걸이, 차분하고 자신 있는 표정, 현대적인 서울 크리에이터 스튜디오, 실제 피부 질감, 깔끔한 소프트박스 조명.",
      tool: "Nano Banana",
      model: "Image reference draft",
      status: "approved",
      duration: "Still",
      assetPaths: {
        image: "assets/characters/founder-reference.png",
        video: "",
        reference: "refs/character-bible/founder.md",
      },
      continuity: {
        character: "공식 창업자 기준 이미지.",
        outfit: "아이보리 블레이저, 검은 상의, 실버 귀걸이.",
        location: "서울 스튜디오 인물 촬영 코너.",
        mood: "차분한 자신감.",
        cameraStyle: "85mm 인물 사진, 소프트박스 캐치라이트.",
      },
      notes: "이후 모든 인물 장면은 이 이미지를 기준으로 맞춤.",
    }),
    createShot({
      id: "shot_006",
      sceneId: "scene_system",
      shotNumber: "2.3",
      title: "ComfyUI 일관성 작업",
      description: "반복 가능한 시각 스타일을 위해 기준 이미지와 seed 메모를 정리.",
      prompt:
        "ComfyUI 워크플로우 메모: 창업자 기준 이미지를 불러오고, 짧은 검은 보브컷과 아이보리 블레이저를 유지. 깔끔한 스튜디오 조명 스타일을 적용하고, 영상 생성을 위한 표정 후보 3개를 출력. seed, sampler, negative prompt를 문서화.",
      tool: "ComfyUI",
      model: "SDXL reference workflow",
      status: "idea",
      duration: "Prep",
      assetPaths: {
        image: "assets/characters/founder-variants/",
        video: "",
        reference: "workflows/founder-consistency.json",
      },
      continuity: {
        character: "얼굴형, 머리 길이, 표정 범위를 바꾸지 않음.",
        outfit: "같은 블레이저와 귀걸이.",
        location: "중립적인 스튜디오 배경.",
        mood: "정돈되고 실용적인 분위기.",
        cameraStyle: "안정적인 인물 프레이밍.",
      },
      notes: "기준 이미지가 확정된 뒤 제작.",
    }),
    createShot({
      id: "shot_007",
      sceneId: "scene_payoff",
      shotNumber: "3.1",
      title: "승인된 플랜 몽타주",
      description: "8개 샷의 상태가 검토에서 승인으로 바뀌는 장면.",
      prompt:
        "로컬 AI 영상 샷 플랜이 정리되는 빠른 몽타주. 상태가 승인으로 바뀌고, 에셋 경로가 채워지고, 연속성 메모가 정렬됨. 배경에는 크리에이터 책상, 만족스러운 편집 리듬, 읽히는 작은 텍스트 없음.",
      tool: "Runway",
      model: "Gen-3 motion",
      status: "prompt ready",
      duration: "5s",
      assetPaths: {
        image: "assets/references/status-montage.png",
        video: "",
        reference: "refs/status-chip-motion.md",
      },
      continuity: {
        character: "창업자의 어깨가 흐릿한 전경으로 보임.",
        outfit: "아이보리 블레이저.",
        location: "같은 노트북 책상.",
        mood: "진행감과 명확함.",
        cameraStyle: "부드러운 모션 블러가 있는 빠른 컷.",
      },
      notes: "앱 화면 녹화를 레퍼런스로 재사용 가능.",
    }),
    createShot({
      id: "shot_008",
      sceneId: "scene_payoff",
      shotNumber: "3.2",
      title: "제작 준비 완료 클로징",
      description: "창업자가 노트북을 반쯤 닫고 바로 생성할 준비가 된 표정을 보여줌.",
      prompt:
        "세로 시네마틱 미디엄 클로즈업. 현대적인 서울 크리에이터 스튜디오 책상 앞의 한국 여성 창업자, 아이보리 블레이저, 노트북에는 정리된 로컬 제작 보드 빛이 보임, 차분하고 자신 있는 표정, 소프트박스 조명, 프리미엄 AI 광고 스타일, 부드러운 카메라 풀백.",
      tool: "Kling",
      model: "Kling 1.6 Pro",
      status: "rejected",
      duration: "4s",
      assetPaths: {
        image: "assets/characters/founder-reference.png",
        video: "exports/kling/shot_008_rejected.mp4",
        reference: "refs/character-bible/founder.md",
      },
      continuity: {
        character: "이전 버전에서 얼굴이 달라졌으므로 창업자 기준 이미지와 반드시 일치.",
        outfit: "아이보리 블레이저, 검은 상의, 실버 귀걸이.",
        location: "같은 서울 스튜디오 책상.",
        mood: "자신감 있는 마무리.",
        cameraStyle: "미디엄 클로즈 풀백, 얕은 심도.",
      },
      notes: "얼굴이 달라지고 손이 왜곡되어 반려.",
    }),
  ];

  function makeId(prefix) {
    return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function cleanText(value, fallback) {
    const text = String(value || "").trim();
    return text || fallback || "";
  }

  function normalizeStatus(value) {
    const status = String(value || "").trim().toLowerCase();
    return statusOptions.includes(status) ? status : "idea";
  }

  function normalizeAssetPaths(paths) {
    const source = paths || {};
    return {
      image: cleanText(source.image),
      video: cleanText(source.video),
      reference: cleanText(source.reference),
    };
  }

  function normalizeContinuity(continuity) {
    const source = continuity || {};
    return {
      character: cleanText(source.character),
      outfit: cleanText(source.outfit),
      location: cleanText(source.location),
      mood: cleanText(source.mood),
      cameraStyle: cleanText(source.cameraStyle),
    };
  }

  function createScene(input) {
    const source = input || {};
    return {
      id: source.id || makeId("scene"),
      title: cleanText(source.title, "Untitled scene"),
      summary: cleanText(source.summary),
      location: cleanText(source.location),
      order: Number.isFinite(Number(source.order)) ? Number(source.order) : 1,
    };
  }

  function createShot(input) {
    const source = input || {};
    const now = new Date().toISOString();
    return {
      id: source.id || makeId("shot"),
      sceneId: cleanText(source.sceneId),
      shotNumber: cleanText(source.shotNumber, "1.1"),
      title: cleanText(source.title, "Untitled shot"),
      description: cleanText(source.description),
      prompt: cleanText(source.prompt),
      tool: cleanText(source.tool, "Runway"),
      model: cleanText(source.model),
      status: normalizeStatus(source.status),
      duration: cleanText(source.duration),
      assetPaths: normalizeAssetPaths(source.assetPaths),
      continuity: normalizeContinuity(source.continuity),
      notes: cleanText(source.notes),
      createdAt: source.createdAt || now,
      updatedAt: source.updatedAt || now,
    };
  }

  function createProject(input) {
    const source = input || {};
    return {
      title: cleanText(source.title, demoProject.title),
      goal: cleanText(source.goal, demoProject.goal),
      format: cleanText(source.format, demoProject.format),
      audience: cleanText(source.audience, demoProject.audience),
      continuity: normalizeContinuity(source.continuity || demoProject.continuity),
    };
  }

  function createPlan(input) {
    const source = input || {};
    const scenes = Array.isArray(source.scenes) ? source.scenes.map(createScene) : demoScenes.map(createScene);
    const sceneIds = new Set(scenes.map((scene) => scene.id));
    const shots = Array.isArray(source.shots) ? source.shots.map(createShot) : demoShots.map(createShot);
    return {
      version: EXPORT_VERSION,
      project: createProject(source.project || demoProject),
      scenes,
      shots: shots.map((shot) => (sceneIds.has(shot.sceneId) ? shot : { ...shot, sceneId: scenes[0] ? scenes[0].id : "" })),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function updateShot(shot, changes) {
    return createShot({
      ...shot,
      ...changes,
      assetPaths: { ...shot.assetPaths, ...(changes && changes.assetPaths ? changes.assetPaths : {}) },
      continuity: { ...shot.continuity, ...(changes && changes.continuity ? changes.continuity : {}) },
      id: shot.id,
      createdAt: shot.createdAt,
      updatedAt: new Date().toISOString(),
    });
  }

  function updateScene(scene, changes) {
    return createScene({
      ...scene,
      ...changes,
      id: scene.id,
    });
  }

  function deleteShotWithUndo(plan, shotId) {
    const safePlan = createPlan(plan);
    const index = safePlan.shots.findIndex((shot) => shot.id === shotId);
    if (index === -1) return { plan: safePlan, deletedShot: null, deletedIndex: -1 };
    const deletedShot = safePlan.shots[index];
    const shots = safePlan.shots.filter((shot) => shot.id !== shotId);
    return {
      plan: createPlan({ ...safePlan, shots }),
      deletedShot,
      deletedIndex: index,
    };
  }

  function restoreDeletedShot(plan, deletedShot, deletedIndex) {
    if (!deletedShot) return createPlan(plan);
    const safePlan = createPlan(plan);
    const shots = safePlan.shots.slice();
    const insertAt = Math.max(0, Math.min(Number(deletedIndex) || 0, shots.length));
    shots.splice(insertAt, 0, createShot(deletedShot));
    return createPlan({ ...safePlan, shots });
  }

  function searchableShotText(shot, scene) {
    return [
      shot.shotNumber,
      shot.title,
      shot.description,
      shot.prompt,
      shot.tool,
      shot.model,
      shot.status,
      shot.duration,
      shot.notes,
      scene ? scene.title : "",
      scene ? scene.summary : "",
      shot.assetPaths.image,
      shot.assetPaths.video,
      shot.assetPaths.reference,
      shot.continuity.character,
      shot.continuity.outfit,
      shot.continuity.location,
      shot.continuity.mood,
      shot.continuity.cameraStyle,
    ]
      .join(" ")
      .toLowerCase();
  }

  function filterShots(shots, filters, scenes) {
    const options = filters || {};
    const sceneMap = new Map((scenes || []).map((scene) => [scene.id, scene]));
    const query = cleanText(options.query).toLowerCase();
    const status = cleanText(options.status).toLowerCase();
    const sceneId = cleanText(options.sceneId);
    const tool = cleanText(options.tool);

    return (shots || []).filter((shot) => {
      if (status && shot.status !== status) return false;
      if (sceneId && shot.sceneId !== sceneId) return false;
      if (tool && shot.tool !== tool) return false;
      if (query && !searchableShotText(shot, sceneMap.get(shot.sceneId)).includes(query)) return false;
      return true;
    });
  }

  function continuitySummary(plan) {
    const safePlan = createPlan(plan);
    const missing = [];
    safePlan.shots.forEach((shot) => {
      ["character", "outfit", "location", "mood", "cameraStyle"].forEach((field) => {
        if (!shot.continuity[field]) missing.push(`${shot.shotNumber} ${shot.title}: ${field}`);
      });
    });
    return {
      projectCharacter: safePlan.project.continuity.character,
      projectStyle: safePlan.project.continuity.cameraStyle,
      missing,
      isComplete: missing.length === 0,
    };
  }

  function escapeCsv(value) {
    const text = String(value || "");
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function exportToCsv(plan) {
    const safePlan = createPlan(plan);
    const sceneMap = new Map(safePlan.scenes.map((scene) => [scene.id, scene]));
    const header = [
      "Scene",
      "Shot",
      "Title",
      "Status",
      "Tool",
      "Model",
      "Duration",
      "Prompt",
      "Image Path",
      "Video Path",
      "Reference Path",
      "Continuity Notes",
    ];
    const rows = safePlan.shots.map((shot) => {
      const scene = sceneMap.get(shot.sceneId);
      const continuity = [
        `Character: ${shot.continuity.character}`,
        `Outfit: ${shot.continuity.outfit}`,
        `Location: ${shot.continuity.location}`,
        `Mood: ${shot.continuity.mood}`,
        `Camera/style: ${shot.continuity.cameraStyle}`,
      ].join(" | ");
      return [
        scene ? scene.title : "",
        shot.shotNumber,
        shot.title,
        shot.status,
        shot.tool,
        shot.model,
        shot.duration,
        shot.prompt,
        shot.assetPaths.image,
        shot.assetPaths.video,
        shot.assetPaths.reference,
        continuity,
      ].map(escapeCsv);
    });
    return [header.map(escapeCsv), ...rows].map((row) => row.join(",")).join("\n");
  }

  function exportToMarkdown(plan) {
    const safePlan = createPlan(plan);
    const lines = [
      `# ${safePlan.project.title}`,
      "",
      `Goal: ${safePlan.project.goal}`,
      `Format: ${safePlan.project.format}`,
      `Audience: ${safePlan.project.audience}`,
      "",
      "## Continuity Bible",
      "",
      `- Character: ${safePlan.project.continuity.character}`,
      `- Outfit: ${safePlan.project.continuity.outfit}`,
      `- Location: ${safePlan.project.continuity.location}`,
      `- Mood: ${safePlan.project.continuity.mood}`,
      `- Camera/style: ${safePlan.project.continuity.cameraStyle}`,
      "",
    ];

    safePlan.scenes
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach((scene) => {
        lines.push(`## Scene ${scene.order}: ${scene.title}`, "", scene.summary, "");
        if (scene.location) lines.push(`Location: ${scene.location}`, "");
        safePlan.shots
          .filter((shot) => shot.sceneId === scene.id)
          .forEach((shot) => {
            lines.push(`### ${shot.shotNumber} ${shot.title}`);
            lines.push(`- Status: ${shot.status}`);
            lines.push(`- Tool/model: ${shot.tool}${shot.model ? " / " + shot.model : ""}`);
            lines.push(`- Duration: ${shot.duration || "n/a"}`);
            lines.push(`- Prompt: ${shot.prompt}`);
            lines.push(`- Assets: image=${shot.assetPaths.image || "n/a"}; video=${shot.assetPaths.video || "n/a"}; reference=${shot.assetPaths.reference || "n/a"}`);
            lines.push(`- Continuity: ${shot.continuity.character}; ${shot.continuity.outfit}; ${shot.continuity.location}; ${shot.continuity.mood}; ${shot.continuity.cameraStyle}`);
            if (shot.notes) lines.push(`- Notes: ${shot.notes}`);
            lines.push("");
          });
      });

    return lines.join("\n").trim() + "\n";
  }

  function exportToJson(plan) {
    return JSON.stringify(createPlan(plan), null, 2) + "\n";
  }

  function parseShotPlanJson(text) {
    let parsed;
    try {
      parsed = JSON.parse(String(text || ""));
    } catch (error) {
      throw new Error("Import file is not valid JSON.");
    }

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Import file must contain a shot plan object.");
    }
    if (!Array.isArray(parsed.scenes) || !Array.isArray(parsed.shots)) {
      throw new Error("Import file must include scenes and shots arrays.");
    }
    return createPlan(parsed);
  }

  function mergeImportedPlan(currentPlan, importedPlan) {
    const base = createPlan(currentPlan);
    const incoming = createPlan(importedPlan);
    const existingSceneIds = new Set(base.scenes.map((scene) => scene.id));
    const existingShotIds = new Set(base.shots.map((shot) => shot.id));
    const maxOrder = base.scenes.reduce((highest, scene) => Math.max(highest, Number(scene.order) || 0), 0);
    const sceneIdMap = new Map();

    const scenes = incoming.scenes.map((scene, index) => {
      const id = existingSceneIds.has(scene.id) ? makeId("scene") : scene.id;
      existingSceneIds.add(id);
      sceneIdMap.set(scene.id, id);
      return createScene({ ...scene, id, order: maxOrder + index + 1 });
    });

    const shots = incoming.shots.map((shot) => {
      const id = existingShotIds.has(shot.id) ? makeId("shot") : shot.id;
      existingShotIds.add(id);
      return createShot({
        ...shot,
        id,
        sceneId: sceneIdMap.get(shot.sceneId) || (scenes[0] ? scenes[0].id : base.scenes[0] ? base.scenes[0].id : ""),
      });
    });

    return createPlan({
      ...base,
      scenes: base.scenes.concat(scenes),
      shots: base.shots.concat(shots),
    });
  }

  function importShotPlan(currentPlan, text, mode) {
    const imported = parseShotPlanJson(text);
    if (mode === "replace") {
      return {
        plan: imported,
        summary: `Replaced plan with ${imported.scenes.length} scenes and ${imported.shots.length} shots.`,
      };
    }
    const merged = mergeImportedPlan(currentPlan, imported);
    return {
      plan: merged,
      summary: `Merged ${imported.scenes.length} scenes and ${imported.shots.length} shots.`,
    };
  }

  function loadPlan(storage) {
    if (!storage) return createPlan();
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return createPlan();
      return createPlan(JSON.parse(raw));
    } catch (error) {
      return createPlan();
    }
  }

  function savePlan(storage, plan) {
    if (!storage) return;
    storage.setItem(STORAGE_KEY, JSON.stringify(createPlan(plan)));
  }

  function shotToAsset(shot, plan) {
    const safeShot = createShot(shot);
    const safePlan = createPlan(plan);
    const scene = safePlan.scenes.find((item) => item.id === safeShot.sceneId);
    return {
      id: makeId("asset"),
      title: `${safeShot.shotNumber} ${safeShot.title}`.trim(),
      type: safeShot.assetPaths.video ? "video" : safeShot.assetPaths.image ? "image" : "prompt",
      collection: scene ? scene.title : "Shot Planner",
      project: safePlan.project.title,
      sourceTool: safeShot.tool || "Claude",
      tags: ["shot-plan", safeShot.status, safeShot.tool].filter(Boolean),
      filePath: safeShot.assetPaths.video || safeShot.assetPaths.image || safeShot.assetPaths.reference || "",
      promptText: safeShot.prompt,
      resultNotes: [safeShot.description, safeShot.notes].filter(Boolean).join("\n"),
      licenseNote: "Shot Planner에서 보낸 제작 자산 후보입니다. 실제 파일 사용 전 생성 도구와 라이선스를 확인하세요.",
      status: safeShot.status === "approved" ? "approved" : "new",
      createdDate: new Date().toISOString().slice(0, 10),
    };
  }

  function sendShotToAssetManager(storage, shot, plan) {
    if (!storage) return { ok: false, message: "localStorage is not available." };
    const asset = shotToAsset(shot, plan);
    try {
      const raw = storage.getItem(ASSET_MANAGER_KEY);
      if (!raw) {
        storage.setItem(ASSET_MANAGER_KEY, JSON.stringify({ version: 1, assets: [asset] }));
        return { ok: true, message: "Asset Manager에 샷 자산을 만들었습니다.", assets: 1 };
      }
      const current = JSON.parse(raw);
      const assets = Array.isArray(current.assets) ? current.assets : [];
      const next = { version: current.version || 1, assets: [asset].concat(assets) };
      storage.setItem(ASSET_MANAGER_KEY, JSON.stringify(next));
      return { ok: true, message: "Asset Manager에 샷 자산을 추가했습니다.", assets: next.assets.length };
    } catch (error) {
      return { ok: false, message: "기존 Asset Manager JSON을 읽지 못했습니다. 먼저 백업하거나 초기화하세요.", assets: 0 };
    }
  }

  function resetDemoPlan() {
    return createPlan({ project: demoProject, scenes: demoScenes, shots: demoShots });
  }

  return {
    STORAGE_KEY,
    ASSET_MANAGER_KEY,
    EXPORT_VERSION,
    statusOptions,
    toolOptions,
    createScene,
    createShot,
    createProject,
    createPlan,
    updateShot,
    updateScene,
    deleteShotWithUndo,
    restoreDeletedShot,
    filterShots,
    continuitySummary,
    exportToCsv,
    exportToMarkdown,
    exportToJson,
    importShotPlan,
    loadPlan,
    savePlan,
    shotToAsset,
    sendShotToAssetManager,
    resetDemoPlan,
    normalizeStatus,
  };
});

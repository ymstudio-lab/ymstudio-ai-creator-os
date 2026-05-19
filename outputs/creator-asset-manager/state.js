(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.CreatorAssetManagerState = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const STORAGE_KEY = "ymstudio.creatorAssetManager.v1";
  const assetTypes = ["image", "video", "audio", "prompt", "reference", "document", "workflow"];
  const statusOptions = ["new", "reviewed", "approved", "used", "archived"];
  const toolOptions = ["Nano Banana", "Runway", "Kling", "ComfyUI", "Claude", "ChatGPT", "Midjourney", "CapCut"];

  const demoAssets = [
    {
      title: "일관된 캐릭터 기준 이미지 시트",
      type: "image",
      collection: "캐릭터 기준표",
      project: "AI Shorts Factory",
      sourceTool: "Nano Banana",
      tags: ["character", "reference", "shorts", "캐릭터"],
      filePath: "assets/characters/hero_reference_sheet.png",
      promptText: "같은 크리에이터 캐릭터를 정면, 측면, 3/4 각도 3장으로 만들어줘. 중립 조명, 흰 배경, 썸네일에 쓰기 좋은 선명한 얼굴.",
      resultNotes: "모든 Shorts 썸네일에서 캐릭터 기준 이미지로 사용.",
      licenseNote: "내부 생성 에셋. 재판매 전 사용한 모델 약관 확인 필요.",
      status: "approved",
      createdDate: "2026-05-19",
    },
    {
      title: "Runway 움직임 테스트 클립",
      type: "video",
      collection: "움직임 테스트",
      project: "AI 영상",
      sourceTool: "Runway",
      tags: ["motion", "test", "video"],
      filePath: "exports/runway/motion_test_001.mp4",
      promptText: "앱 대시보드가 켜진 크리에이터 책상을 향해 천천히 카메라가 들어가는 장면.",
      resultNotes: "카메라 움직임은 좋음. 텍스트 오버레이는 더 깨끗하게 수정 필요.",
      licenseNote: "데모 워크플로우용 생성 클립.",
      status: "reviewed",
      createdDate: "2026-05-20",
    },
    {
      title: "썸네일 표정 후보 그리드",
      type: "image",
      collection: "썸네일 실험실",
      project: "AI Shorts Factory",
      sourceTool: "Midjourney",
      tags: ["thumbnail", "expression", "ab-test"],
      filePath: "assets/thumbnails/expression_grid_v03.png",
      promptText: "크리에이터 인물 표정 후보 8개. 제목을 넣을 여백, 일관된 의상, 모바일에서 잘 보이는 단순한 배경.",
      resultNotes: "1행과 3행 후보가 좋음. 모바일 가독성을 위해 배경은 더 밝게 유지.",
      licenseNote: "생성 이미지. 사용한 도구 약관 확인 후 본인 채널 사용 가능.",
      status: "reviewed",
      createdDate: "2026-05-20",
    },
    {
      title: "Kling 제품 공개 B-roll",
      type: "video",
      collection: "움직임 테스트",
      project: "AI 영상",
      sourceTool: "Kling",
      tags: ["b-roll", "reveal", "productivity"],
      filePath: "exports/kling/product_reveal_broll_002.mp4",
      promptText: "크리에이터 워크플로우 대시보드를 책상 높이에서 부드럽게 공개하는 장면. 영화적이지만 UI 구조는 읽히게.",
      resultNotes: "배경 B-roll로 사용 가능. 최종 편집에서는 가짜 브랜드 텍스트가 보이지 않게 처리.",
      licenseNote: "채널 콘텐츠용 생성 클립. 검토 없이 원본 스톡 영상처럼 재판매 금지.",
      status: "approved",
      createdDate: "2026-05-21",
    },
    {
      title: "유튜브 런칭 체크리스트 프롬프트",
      type: "prompt",
      collection: "런칭 프롬프트",
      project: "YMSTUDIO AI Creator OS",
      sourceTool: "Claude",
      tags: ["youtube", "launch", "prompt"],
      filePath: "prompts/youtube_launch_checklist.md",
      promptText: "이 아이디어를 제목 후보, 훅, 대본 개요, 썸네일 프롬프트, 업로드 체크리스트로 바꿔줘.",
      resultNotes: "YouTube Calendar 항목마다 반복 사용 가능.",
      licenseNote: "직접 만든 프롬프트 템플릿.",
      status: "used",
      createdDate: "2026-05-21",
    },
    {
      title: "협찬 멘트 준수사항 메모",
      type: "document",
      collection: "사용 및 라이선스",
      project: "YMSTUDIO AI Creator OS",
      sourceTool: "Claude",
      tags: ["license", "sponsor", "compliance"],
      filePath: "docs/usage/sponsor_read_notes.md",
      promptText: "협찬 멘트가 들어간 영상 에셋의 고지 의무와 사용 제한을 요약해줘.",
      resultNotes: "협찬 영상 게시 전 또는 긴 영상에서 Shorts를 잘라 쓰기 전에 참고.",
      licenseNote: "내부 메모. 외부 정책 문서로 쓰기 전 법률 검토 필요.",
      status: "reviewed",
      createdDate: "2026-05-22",
    },
    {
      title: "ComfyUI 캐릭터 연속성 워크플로우",
      type: "workflow",
      collection: "제작 워크플로우",
      project: "캐릭터 기준",
      sourceTool: "ComfyUI",
      tags: ["workflow", "character", "continuity"],
      filePath: "workflows/comfyui/character_continuity_v1.json",
      promptText: "얼굴 기준 이미지 로드, 포즈 제어, 썸네일용 안전 크롭을 포함한 노드 워크플로우.",
      resultNotes: "공개 공유 전 로컬 모델 경로 문서화 필요.",
      licenseNote: "워크플로우 메타데이터는 직접 제작. 연결된 모델 라이선스는 별도 확인 필요.",
      status: "new",
      createdDate: "2026-05-22",
    },
    {
      title: "한국형 스튜디오 책상 레퍼런스 보드",
      type: "reference",
      collection: "레퍼런스 문서",
      project: "AI 영상",
      sourceTool: "ChatGPT",
      tags: ["reference", "studio", "desk"],
      filePath: "references/studio_desk_board.md",
      promptText: "따뜻한 실용 조명이 있는 작은 크리에이터 스튜디오의 시각 방향 메모를 정리해줘.",
      resultNotes: "제작 디자인 기준으로 좋음. 외부 전달 전 출처 링크를 직접 추가.",
      licenseNote: "레퍼런스 전용 기획 문서. 타인의 참고 이미지를 재사용 가능한 에셋으로 취급하지 말 것.",
      status: "reviewed",
      createdDate: "2026-05-23",
    },
    {
      title: "팟캐스트 인트로 음악 임시 파일",
      type: "audio",
      collection: "오디오 배경",
      project: "AI Shorts Factory",
      sourceTool: "CapCut",
      tags: ["audio", "intro", "placeholder"],
      filePath: "audio/placeholders/podcast_intro_08s.wav",
      promptText: "보컬 없는 짧고 따뜻한 전자음악 인트로. 크리에이터 생산성 쇼에 어울리는 분위기.",
      resultNotes: "임시 파일. 권리가 불명확하면 공개 전 교체.",
      licenseNote: "",
      status: "new",
      createdDate: "2026-05-23",
    },
  ];

  function uid(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function listFrom(value) {
    if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
    if (typeof value === "string") return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
    return [];
  }

  function normalizeAsset(asset) {
    const source = asset || {};
    return {
      id: source.id || uid("asset"),
      title: String(source.title || "Untitled asset").trim(),
      type: assetTypes.includes(source.type) ? source.type : "image",
      collection: String(source.collection || "Inbox").trim(),
      project: String(source.project || "YMSTUDIO AI Creator OS").trim(),
      sourceTool: String(source.sourceTool || source.tool || "Claude").trim(),
      tags: listFrom(source.tags),
      filePath: String(source.filePath || "").trim(),
      promptText: String(source.promptText || "").trim(),
      resultNotes: String(source.resultNotes || "").trim(),
      licenseNote: String(source.licenseNote || "").trim(),
      status: statusOptions.includes(source.status) ? source.status : "new",
      createdDate: String(source.createdDate || new Date().toISOString().slice(0, 10)).slice(0, 10),
    };
  }

  function normalizeAssets(assets) {
    return Array.isArray(assets) ? assets.map(normalizeAsset) : demoAssets.map(normalizeAsset);
  }

  function normalizeState(state) {
    return {
      version: 1,
      assets: normalizeAssets(state?.assets),
    };
  }

  function createAsset(data) {
    return normalizeAsset({ id: uid("asset"), ...data });
  }

  function addAsset(assets, data) {
    return [createAsset(data), ...normalizeAssets(assets)];
  }

  function updateStatus(assets, id, status) {
    if (!statusOptions.includes(status)) return normalizeAssets(assets);
    return normalizeAssets(assets).map((asset) => (asset.id === id ? { ...asset, status } : asset));
  }

  function deleteAsset(assets, id) {
    return normalizeAssets(assets).filter((asset) => asset.id !== id);
  }

  function deleteAssetWithUndo(assets, id) {
    const normalized = normalizeAssets(assets);
    const deletedAsset = normalized.find((asset) => asset.id === id) || null;
    return {
      assets: normalized.filter((asset) => asset.id !== id),
      deletedAsset,
    };
  }

  function restoreAsset(assets, asset) {
    if (!asset) return normalizeAssets(assets);
    const normalized = normalizeAssets(assets);
    if (normalized.some((item) => item.id === asset.id)) return normalized;
    return [normalizeAsset(asset), ...normalized];
  }

  function filterAssets(assets, filters) {
    const query = String(filters?.query || "").toLowerCase();
    return normalizeAssets(assets).filter((asset) => {
      if (filters?.type && asset.type !== filters.type) return false;
      if (filters?.status && asset.status !== filters.status) return false;
      if (filters?.collection && asset.collection !== filters.collection) return false;
      if (filters?.project && asset.project !== filters.project) return false;
      if (!query) return true;
      return [
        asset.title,
        asset.collection,
        asset.project,
        asset.sourceTool,
        asset.filePath,
        asset.promptText,
        asset.resultNotes,
        asset.licenseNote,
        ...asset.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }

  function groupByCollection(assets) {
    return normalizeAssets(assets).reduce((groups, asset) => {
      groups[asset.collection] = groups[asset.collection] || [];
      groups[asset.collection].push(asset);
      return groups;
    }, {});
  }

  function summarize(assets) {
    const normalized = normalizeAssets(assets);
    const health = normalized.map(getAssetHealth);
    return {
      total: normalized.length,
      approved: normalized.filter((asset) => asset.status === "approved").length,
      used: normalized.filter((asset) => asset.status === "used").length,
      collections: Object.keys(groupByCollection(normalized)).length,
      needsAttention: health.filter((item) => item.level !== "good").length,
      missingLicense: normalized.filter((asset) => !asset.licenseNote).length,
      missingPath: normalized.filter((asset) => !asset.filePath).length,
      byType: countBy(normalized, "type"),
      byStatus: countBy(normalized, "status"),
    };
  }

  function countBy(assets, key) {
    return normalizeAssets(assets).reduce((counts, asset) => {
      counts[asset[key]] = (counts[asset[key]] || 0) + 1;
      return counts;
    }, {});
  }

  function getAssetHealth(asset) {
    const normalized = normalizeAsset(asset);
    const issues = [];
    if (!normalized.filePath) issues.push("missing path");
    if (!normalized.licenseNote) issues.push("missing license");
    if (!normalized.resultNotes) issues.push("missing result notes");
    if (normalized.tags.length === 0) issues.push("missing tags");
    if (["image", "video", "audio", "prompt", "workflow"].includes(normalized.type) && !normalized.promptText) issues.push("missing prompt/workflow detail");
    const level = issues.length === 0 ? "good" : issues.length <= 2 ? "review" : "risk";
    const label = level === "good" ? "Healthy" : level === "review" ? "Needs review" : "At risk";
    return { level, label, issues };
  }

  function summarizeCollections(assets) {
    const groups = groupByCollection(assets);
    return Object.keys(groups)
      .sort()
      .map((collection) => {
        const items = groups[collection];
        const health = items.map(getAssetHealth);
        return {
          collection,
          count: items.length,
          approved: items.filter((asset) => asset.status === "approved").length,
          used: items.filter((asset) => asset.status === "used").length,
          needsAttention: health.filter((item) => item.level !== "good").length,
          types: countBy(items, "type"),
          latestDate: items.map((asset) => asset.createdDate).sort().at(-1) || "",
          assets: items,
        };
      });
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function generateCsv(assets) {
    const rows = [["title", "type", "collection", "project", "sourceTool", "tags", "filePath", "status", "licenseNote"]];
    normalizeAssets(assets).forEach((asset) => {
      rows.push([asset.title, asset.type, asset.collection, asset.project, asset.sourceTool, asset.tags.join("; "), asset.filePath, asset.status, asset.licenseNote]);
    });
    return rows.map((row) => row.map(csvCell).join(",")).join("\n");
  }

  function generateMarkdown(assets) {
    const groups = groupByCollection(assets);
    const lines = ["# Creator Asset Manager Export", ""];
    Object.keys(groups)
      .sort()
      .forEach((collection) => {
        lines.push(`## ${collection}`, "");
        groups[collection].forEach((asset) => {
          lines.push(`### ${asset.title}`, `- Type: ${asset.type}`, `- Project: ${asset.project}`, `- Source: ${asset.sourceTool}`, `- Status: ${asset.status}`, `- Tags: ${asset.tags.join(", ") || "none"}`, `- Path: ${asset.filePath}`, `- License: ${asset.licenseNote}`, `- Notes: ${asset.resultNotes}`, "");
        });
      });
    return lines.join("\n");
  }

  function generateJson(stateOrAssets) {
    const state = Array.isArray(stateOrAssets) ? { assets: stateOrAssets } : stateOrAssets;
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        catalog: normalizeState(state),
      },
      null,
      2
    );
  }

  function parseJsonImport(raw) {
    const parsed = JSON.parse(String(raw || ""));
    const payload = parsed.catalog || parsed;
    const assets = normalizeAssets(payload.assets);
    return { assets };
  }

  function createDemoState() {
    return normalizeState({ assets: demoAssets });
  }

  function loadState(storage) {
    try {
      const raw = storage?.getItem(STORAGE_KEY);
      if (!raw) return createDemoState();
      const parsed = JSON.parse(raw);
      return normalizeState(parsed);
    } catch {
      return createDemoState();
    }
  }

  function saveState(storage, state) {
    const normalized = normalizeState(state);
    storage?.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  return {
    STORAGE_KEY,
    assetTypes,
    statusOptions,
    toolOptions,
    demoAssets,
    normalizeAsset,
    normalizeAssets,
    normalizeState,
    createAsset,
    addAsset,
    updateStatus,
    deleteAsset,
    deleteAssetWithUndo,
    restoreAsset,
    filterAssets,
    groupByCollection,
    countBy,
    getAssetHealth,
    summarizeCollections,
    summarize,
    generateCsv,
    generateMarkdown,
    generateJson,
    parseJsonImport,
    createDemoState,
    loadState,
    saveState,
  };
});

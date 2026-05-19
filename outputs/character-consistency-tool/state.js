(function (root, factory) {
  const state = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = state;
  }
  root.CharacterConsistencyState = state;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const STORAGE_KEY = "ymstudio.characterConsistencyTool.v1";
  const PROJECT_KEY = "ymstudio.creatorProject.v1";
  const EXPORT_VERSION = 1;

  const roles = ["Main Character", "Host", "Mascot", "Product Avatar", "Supporting Character"];
  const statuses = ["draft", "testing", "locked", "archived"];

  const demoCharacters = [
    {
      name: "초보 크리에이터 진행자",
      role: "Host",
      status: "locked",
      face: "둥근 얼굴형, 부드러운 인상, 자연스러운 미소",
      hair: "짧고 정돈된 검은 머리",
      outfit: "미니멀한 검은 티셔츠와 밝은 재킷",
      silhouette: "상반신 중심, 카메라를 바라보는 안정적인 자세",
      expression: "차분하게 설명하는 표정, 과장되지 않은 놀람",
      referenceNotes: "첫 기준 이미지를 자산 매니저에 저장하고 파일명/프롬프트를 같이 기록",
      modelNotes: "같은 모델, 같은 seed 범위, 같은 해상도에서 먼저 테스트",
      positive: "consistent Korean creator host, friendly face, neat short black hair, minimal jacket, calm tutorial mood, same outfit, studio lighting",
      negative: "different person, changed hairstyle, different outfit, distorted face, extra fingers, heavy makeup, watermark",
      sceneRules: "장면마다 얼굴형, 머리, 의상, 색상, 카메라 거리, 조명을 확인",
      failureFixes: "캐릭터가 바뀌면 설명을 줄이고 얼굴형/머리/의상 3개 특징만 반복. 의상이 바뀌면 색상과 상의 형태를 고정",
      favorite: true,
    },
    {
      name: "AI 작업 도우미 아바타",
      role: "Mascot",
      status: "testing",
      face: "단순한 3D 스타일 얼굴, 큰 눈, 친근한 인상",
      hair: "머리카락 없음 또는 단순한 헬멧형 실루엣",
      outfit: "민트 포인트가 있는 흰색 후드",
      silhouette: "작고 둥근 형태, 화면 한쪽에서 안내하는 캐릭터",
      expression: "웃는 표정, 안내하는 손동작",
      referenceNotes: "썸네일과 튜토리얼 화면에서 반복 사용",
      modelNotes: "3D mascot, clean product helper 스타일을 고정",
      positive: "small friendly AI helper mascot, simple 3D style, white hoodie with mint accent, big eyes, clean silhouette",
      negative: "scary, complex armor, dark horror style, realistic human face, cluttered accessories",
      sceneRules: "크기, 후드 색상, 눈 크기, 위치를 유지",
      failureFixes: "너무 복잡해지면 장식 요소를 제거하고 흰색 후드와 큰 눈만 남김",
      favorite: false,
    },
  ];

  function makeId() {
    return "char_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function normalizeChoice(value, options, fallback) {
    const text = String(value || "").trim();
    return options.includes(text) ? text : fallback;
  }

  function createCharacter(input) {
    const source = input || {};
    return {
      id: source.id || makeId(),
      name: String(source.name || "새 캐릭터 바이블").trim() || "새 캐릭터 바이블",
      role: normalizeChoice(source.role, roles, roles[0]),
      status: normalizeChoice(source.status, statuses, statuses[0]),
      face: String(source.face || "").trim(),
      hair: String(source.hair || "").trim(),
      outfit: String(source.outfit || "").trim(),
      silhouette: String(source.silhouette || "").trim(),
      expression: String(source.expression || "").trim(),
      referenceNotes: String(source.referenceNotes || "").trim(),
      modelNotes: String(source.modelNotes || "").trim(),
      positive: String(source.positive || "").trim(),
      negative: String(source.negative || "").trim(),
      sceneRules: String(source.sceneRules || "").trim(),
      failureFixes: String(source.failureFixes || "").trim(),
      favorite: Boolean(source.favorite),
      createdAt: source.createdAt || new Date().toISOString(),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function searchableText(character) {
    return [
      character.name,
      character.role,
      character.status,
      character.face,
      character.hair,
      character.outfit,
      character.silhouette,
      character.expression,
      character.referenceNotes,
      character.modelNotes,
      character.positive,
      character.negative,
      character.sceneRules,
      character.failureFixes,
    ].join(" ").toLowerCase();
  }

  function filterCharacters(characters, filters) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const role = String(options.role || "").trim();
    const status = String(options.status || "").trim();
    const favoriteOnly = Boolean(options.favoriteOnly);
    return characters.filter((character) => {
      if (query && !searchableText(character).includes(query)) return false;
      if (role && character.role !== role) return false;
      if (status && character.status !== status) return false;
      if (favoriteOnly && !character.favorite) return false;
      return true;
    });
  }

  function loadProject(storage) {
    if (!storage) return {};
    try {
      return JSON.parse(storage.getItem(PROJECT_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function buildFromProject(project) {
    const source = project || {};
    const topic = source.videoTopic || "새 영상 프로젝트";
    const tone = source.tone || "차분하고 실전형";
    return createCharacter({
      name: `${topic} - 고정 진행 캐릭터`,
      role: "Host",
      status: "draft",
      face: "기준 이미지에서 확인한 얼굴형, 눈매, 인상을 짧게 기록",
      hair: "기준 이미지의 헤어 길이, 색상, 앞머리 방향을 고정",
      outfit: "영상 전체에서 유지할 상의 색상과 형태를 고정",
      silhouette: "상반신/전신, 카메라 거리, 자세를 장면마다 유지",
      expression: `${tone} 톤에 맞는 표정 범위만 사용`,
      referenceNotes: "첫 기준 이미지를 만든 뒤 파일명, 프롬프트, seed/model 메모를 자산 매니저에 저장",
      modelNotes: source.aiTools || "ComfyUI, ChatGPT, Claude",
      positive: `${topic}, consistent character, same face, same hairstyle, same outfit, ${tone}, clean production still`,
      negative: "different person, changed outfit, changed hairstyle, distorted face, extra fingers, watermark, low quality",
      sceneRules: "장면마다 얼굴형, 헤어, 의상, 색상, 카메라 거리, 표정 범위를 비교",
      failureFixes: "캐릭터가 바뀌면 조건을 줄이고 얼굴형/헤어/의상만 반복. 의상 오류는 색상과 상의 형태를 더 명확히 고정",
      favorite: true,
    });
  }

  function formatCharacter(character) {
    return [
      `이름: ${character.name}`,
      `역할: ${character.role}`,
      `상태: ${character.status}`,
      "",
      "고정 외형:",
      `얼굴: ${character.face}`,
      `헤어: ${character.hair}`,
      `의상: ${character.outfit}`,
      `실루엣: ${character.silhouette}`,
      `표정: ${character.expression}`,
      "",
      "Reference / Model Notes:",
      character.referenceNotes,
      character.modelNotes,
      "",
      "Positive Prompt:",
      character.positive,
      "",
      "Negative Prompt:",
      character.negative,
      "",
      "Scene Consistency Checklist:",
      character.sceneRules,
      "",
      "Failure Fixes:",
      character.failureFixes,
    ].join("\n");
  }

  function getSummary(characters) {
    return {
      total: characters.length,
      locked: characters.filter((character) => character.status === "locked").length,
      favorites: characters.filter((character) => character.favorite).length,
    };
  }

  function loadCharacters(storage) {
    if (!storage) return demoCharacters.map(createCharacter);
    try {
      const parsed = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
      const items = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.characters) ? parsed.characters : null;
      return items && items.length ? items.map(createCharacter) : demoCharacters.map(createCharacter);
    } catch (error) {
      return demoCharacters.map(createCharacter);
    }
  }

  function saveCharacters(storage, characters) {
    storage.setItem(STORAGE_KEY, JSON.stringify(characters.map(createCharacter)));
  }

  function exportCharacters(characters) {
    return {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      schema: STORAGE_KEY,
      characters: characters.map(createCharacter),
    };
  }

  function parseCharacterImport(text) {
    const parsed = JSON.parse(text);
    const items = Array.isArray(parsed) ? parsed : Array.isArray(parsed.characters) ? parsed.characters : null;
    if (!items) throw new Error("Invalid character consistency export");
    return items.map(createCharacter);
  }

  return {
    STORAGE_KEY,
    PROJECT_KEY,
    roles,
    statuses,
    demoCharacters,
    createCharacter,
    filterCharacters,
    loadProject,
    buildFromProject,
    formatCharacter,
    getSummary,
    loadCharacters,
    saveCharacters,
    exportCharacters,
    parseCharacterImport,
  };
});

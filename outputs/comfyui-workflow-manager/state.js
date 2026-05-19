(function (root, factory) {
  const state = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = state;
  }
  root.ComfyWorkflowState = state;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const STORAGE_KEY = "ymstudio.comfyWorkflowManager.v1";
  const PROJECT_KEY = "ymstudio.creatorProject.v1";
  const EXPORT_VERSION = 1;

  const types = ["Text to Image", "Image to Image", "Image to Video", "Upscale", "Character", "Thumbnail"];
  const tiers = ["저사양/API 보조", "중간 사양", "고사양 로컬", "클라우드 GPU"];
  const statuses = ["idea", "testing", "stable", "archived"];

  const demoWorkflows = [
    {
      name: "저사양 썸네일 이미지 초안",
      type: "Text to Image",
      tier: "저사양/API 보조",
      status: "stable",
      model: "SDXL 또는 클라우드 이미지 모델",
      size: "768x768",
      steps: 18,
      batch: 1,
      context: "프롬프트는 1장면씩 짧게, 긴 설명은 Creator Project에 보관",
      speed: "CPU 전용은 매우 느릴 수 있음. 저사양은 클라우드/API 보조 권장",
      positive: "clean YouTube thumbnail concept, one clear subject, readable Korean text area, high contrast, simple background",
      negative: "blurry, unreadable text, cluttered background, extra fingers, watermark",
      inputs: "영상 주제, 감정 훅, 핵심 오브젝트, 썸네일 문구",
      outputs: "썸네일 후보 이미지 1장, 프롬프트 메모",
      nodeNotes: "batch 1 유지, 해상도부터 낮추고 품질 확인 후 업스케일",
      failureFixes: "VRAM 부족: 해상도/step/batch를 먼저 낮춤. 글자 깨짐: 텍스트 영역만 비워두고 편집툴에서 추가",
      favorite: true,
    },
    {
      name: "AI 영상 장면용 기준 이미지",
      type: "Image to Video",
      tier: "중간 사양",
      status: "testing",
      model: "Flux/SDXL 이미지 + 영상 생성 도구",
      size: "1024x576",
      steps: 24,
      batch: 1,
      context: "샷 플래너의 장면 설명을 한 장면씩 가져와 사용",
      speed: "이미지는 로컬, 영상 변환은 클라우드 GPU가 안정적",
      positive: "cinematic frame, consistent character, clear camera direction, controlled motion, production still",
      negative: "flicker, distorted face, inconsistent outfit, broken hands, fast random motion",
      inputs: "샷 설명, 캐릭터 규칙, 카메라 움직임",
      outputs: "영상 생성용 기준 이미지와 프롬프트",
      nodeNotes: "캐릭터 유지가 중요하면 seed/model/LoRA 메모를 반드시 남김",
      failureFixes: "캐릭터가 바뀌면 캐릭터 설명을 줄이고 핵심 특징 3개만 반복",
      favorite: true,
    },
    {
      name: "고해상도 결과 업스케일",
      type: "Upscale",
      tier: "고사양 로컬",
      status: "idea",
      model: "Upscale model + detail pass",
      size: "원본 기준 2x",
      steps: 12,
      batch: 1,
      context: "최종 후보만 업스케일. 모든 초안을 업스케일하지 않음",
      speed: "GPU VRAM이 부족하면 타일 업스케일 또는 클라우드 사용",
      positive: "clean details, preserved face, sharp subject, natural texture",
      negative: "over sharpened, plastic skin, artifacts, text distortion",
      inputs: "최종 후보 이미지",
      outputs: "공개용 고해상도 이미지",
      nodeNotes: "업스케일 전에 파일명과 원본 프롬프트를 자산 매니저에 기록",
      failureFixes: "디테일이 과하면 strength를 낮추고 원본 보존 우선",
      favorite: false,
    },
  ];

  function makeId() {
    return "comfy_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function normalizeChoice(value, options, fallback) {
    const text = String(value || "").trim();
    return options.includes(text) ? text : fallback;
  }

  function normalizeNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : fallback;
  }

  function createWorkflow(input) {
    const source = input || {};
    return {
      id: source.id || makeId(),
      name: String(source.name || "새 ComfyUI 레시피").trim() || "새 ComfyUI 레시피",
      type: normalizeChoice(source.type, types, types[0]),
      tier: normalizeChoice(source.tier, tiers, tiers[0]),
      status: normalizeChoice(source.status, statuses, statuses[0]),
      model: String(source.model || "").trim(),
      size: String(source.size || "768x768").trim(),
      steps: normalizeNumber(source.steps, 20),
      batch: normalizeNumber(source.batch, 1),
      context: String(source.context || "").trim(),
      speed: String(source.speed || "").trim(),
      positive: String(source.positive || "").trim(),
      negative: String(source.negative || "").trim(),
      inputs: String(source.inputs || "").trim(),
      outputs: String(source.outputs || "").trim(),
      nodeNotes: String(source.nodeNotes || "").trim(),
      failureFixes: String(source.failureFixes || "").trim(),
      favorite: Boolean(source.favorite),
      createdAt: source.createdAt || new Date().toISOString(),
      updatedAt: source.updatedAt || new Date().toISOString(),
    };
  }

  function searchableText(workflow) {
    return [
      workflow.name,
      workflow.type,
      workflow.tier,
      workflow.status,
      workflow.model,
      workflow.size,
      workflow.context,
      workflow.speed,
      workflow.positive,
      workflow.negative,
      workflow.inputs,
      workflow.outputs,
      workflow.nodeNotes,
      workflow.failureFixes,
    ].join(" ").toLowerCase();
  }

  function filterWorkflows(workflows, filters) {
    const options = filters || {};
    const query = String(options.query || "").trim().toLowerCase();
    const type = String(options.type || "").trim();
    const tier = String(options.tier || "").trim();
    const favoriteOnly = Boolean(options.favoriteOnly);
    return workflows.filter((workflow) => {
      if (query && !searchableText(workflow).includes(query)) return false;
      if (type && workflow.type !== type) return false;
      if (tier && workflow.tier !== tier) return false;
      if (favoriteOnly && !workflow.favorite) return false;
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
    const tools = source.aiTools || "ComfyUI";
    const isShorts = String(source.platform || "").toLowerCase().includes("short");
    return createWorkflow({
      name: `${topic} - 기준 이미지 레시피`,
      type: isShorts ? "Image to Video" : "Text to Image",
      tier: "중간 사양",
      status: "idea",
      model: tools.includes("ComfyUI") ? "ComfyUI 기본 모델 메모 필요" : tools,
      size: isShorts ? "768x1344" : "1024x576",
      steps: 20,
      batch: 1,
      context: `타깃: ${source.targetAudience || "미정"} / 목적: ${source.videoGoal || "미정"}`,
      speed: "먼저 batch 1과 낮은 step으로 테스트한 뒤 안정되면 품질을 올립니다.",
      positive: `${topic}, ${source.tone || "clean production look"}, clear subject, controlled lighting`,
      negative: "blurry, distorted, unreadable text, watermark, low quality",
      inputs: "Creator Project 주제, 샷 플랜 장면 설명, 썸네일/대본 훅",
      outputs: "기준 이미지, 프롬프트, 실패 수정 메모",
      nodeNotes: "저사양이면 해상도와 step부터 낮춥니다.",
      failureFixes: "결과가 흔들리면 한 번에 넣는 조건을 줄이고 핵심 피사체, 배경, 카메라만 남깁니다.",
      favorite: true,
    });
  }

  function formatWorkflow(workflow) {
    return [
      `이름: ${workflow.name}`,
      `유형: ${workflow.type}`,
      `권장 환경: ${workflow.tier}`,
      `상태: ${workflow.status}`,
      `모델/도구: ${workflow.model}`,
      `해상도: ${workflow.size}`,
      `Steps: ${workflow.steps}`,
      `Batch: ${workflow.batch}`,
      "",
      "입력 규칙:",
      workflow.inputs,
      "",
      "출력:",
      workflow.outputs,
      "",
      "Positive Prompt:",
      workflow.positive,
      "",
      "Negative Prompt:",
      workflow.negative,
      "",
      "컨텍스트/속도 메모:",
      workflow.context,
      workflow.speed,
      "",
      "노드/실패 수정:",
      workflow.nodeNotes,
      workflow.failureFixes,
    ].join("\n");
  }

  function getSummary(workflows) {
    return {
      total: workflows.length,
      stable: workflows.filter((workflow) => workflow.status === "stable").length,
      favorites: workflows.filter((workflow) => workflow.favorite).length,
    };
  }

  function loadWorkflows(storage) {
    if (!storage) return demoWorkflows.map(createWorkflow);
    try {
      const parsed = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
      const items = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.workflows) ? parsed.workflows : null;
      return items && items.length ? items.map(createWorkflow) : demoWorkflows.map(createWorkflow);
    } catch (error) {
      return demoWorkflows.map(createWorkflow);
    }
  }

  function saveWorkflows(storage, workflows) {
    storage.setItem(STORAGE_KEY, JSON.stringify(workflows.map(createWorkflow)));
  }

  function exportWorkflows(workflows) {
    return {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      schema: STORAGE_KEY,
      workflows: workflows.map(createWorkflow),
    };
  }

  function parseWorkflowImport(text) {
    const parsed = JSON.parse(text);
    const items = Array.isArray(parsed) ? parsed : Array.isArray(parsed.workflows) ? parsed.workflows : null;
    if (!items) throw new Error("Invalid ComfyUI workflow export");
    return items.map(createWorkflow);
  }

  return {
    STORAGE_KEY,
    PROJECT_KEY,
    types,
    tiers,
    statuses,
    demoWorkflows,
    createWorkflow,
    filterWorkflows,
    loadProject,
    buildFromProject,
    formatWorkflow,
    getSummary,
    loadWorkflows,
    saveWorkflows,
    exportWorkflows,
    parseWorkflowImport,
  };
});

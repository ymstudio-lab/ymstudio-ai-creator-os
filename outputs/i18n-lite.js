(function () {
  const LANGUAGE_KEY = "ymstudio.creatorOS.language";

  const dictionary = {
    "Creator Prompt Board": "크리에이터 프롬프트 보드",
    "AI Shot Planner": "AI 샷 플래너",
    "API Cost Tracker": "API 비용 트래커",
    "YouTube Calendar": "유튜브 캘린더",
    "Creator Asset Manager": "크리에이터 자산 매니저",
    "Thumbnail Idea Board": "썸네일 아이디어 보드",
    "Search": "검색",
    "Tool": "도구",
    "Category": "카테고리",
    "Favorites only": "즐겨찾기만",
    "Min rating": "최소 평점",
    "Any": "전체",
    "All tools": "모든 도구",
    "All categories": "모든 카테고리",
    "All providers": "모든 제공자",
    "All projects": "모든 프로젝트",
    "All statuses": "모든 상태",
    "All formats": "모든 형식",
    "All channels": "모든 채널",
    "All types": "모든 유형",
    "All collections": "모든 컬렉션",
    "Export JSON": "JSON 내보내기",
    "Import JSON": "JSON 가져오기",
    "Export Markdown": "Markdown 내보내기",
    "Export CSV": "CSV 내보내기",
    "Reset demo": "데모 초기화",
    "Copy prompt": "프롬프트 복사",
    "Delete": "삭제",
    "Confirm delete": "삭제 확인",
    "Undo": "되돌리기",
    "Title": "제목",
    "Prompt": "프롬프트",
    "Result notes": "결과 메모",
    "Rating": "평점",
    "Episode": "에피소드",
    "Goal": "목표",
    "Format": "형식",
    "Audience": "대상",
    "Production board": "제작 보드",
    "Scenes": "장면",
    "Scene detail": "장면 상세",
    "Summary": "요약",
    "Location": "장소",
    "Status": "상태",
    "Scene": "장면",
    "Month": "월",
    "Monthly budget": "월 예산",
    "Monthly credits": "월 크레딧",
    "Warning": "경고",
    "Month cost": "이번 달 비용",
    "Credits burned": "사용한 크레딧",
    "Daily average": "하루 평균",
    "Current burn": "현재 사용량",
    "Projected month-end": "월말 예상",
    "Remaining safe budget": "남은 안전 예산",
    "Manual log": "수동 기록",
    "Add Usage": "사용량 추가",
    "Add": "추가",
    "Provider": "제공자",
    "Usage category": "사용 유형",
    "Project": "프로젝트",
    "Workflow": "작업 흐름",
    "Quantity": "수량",
    "Unit": "단위",
    "Unit cost": "단가",
    "Credits used": "사용 크레딧",
    "Notes": "메모",
    "Provider breakdown": "제공자별 요약",
    "Category breakdown": "카테고리별 요약",
    "Top workflows": "주요 작업 흐름",
    "Recommendations": "추천 조치",
    "Channel": "채널",
    "Weekly target": "주간 목표",
    "Total": "전체",
    "Scheduled": "예약됨",
    "Published": "게시됨",
    "In production": "제작 중",
    "Weekly Plan": "주간 계획",
    "Pipeline Summary": "진행 요약",
    "Content Item": "콘텐츠 항목",
    "Working title": "작업 제목",
    "Channel/project": "채널/프로젝트",
    "Niche": "주제",
    "Upload date": "업로드 날짜",
    "Script outline": "대본 개요",
    "Title variants": "제목 후보",
    "Thumbnail prompt variants": "썸네일 프롬프트 후보",
    "AI tools": "AI 도구",
    "Performance notes": "성과 메모",
    "Idea Board": "아이디어 보드",
    "Upload Calendar": "업로드 캘린더",
    "Date": "날짜",
    "Week": "주차",
    "Asset": "자산",
    "Asset Catalog": "자산 카탈로그",
    "Thumbnail hooks": "썸네일 훅",
    "Type": "유형",
    "Collection": "컬렉션",
    "Source tool/model": "출처 도구/모델",
    "Tags": "태그",
    "File path or URL text": "파일 경로 또는 URL",
    "Prompt text": "프롬프트 텍스트",
    "License / usage note": "라이선스 / 사용 메모",
    "Created date": "생성 날짜",
    "Collections": "컬렉션",
    "Language": "언어",
    "Editor": "편집기",
    "Idea Board": "아이디어 보드",
    "Image prompt": "이미지 프롬프트",
    "Open module": "모듈 열기",
    "No modules match the current filter.": "현재 필터와 일치하는 모듈이 없습니다.",
    "No content items match this view.": "현재 보기와 일치하는 콘텐츠가 없습니다.",
    "No assets match this view.": "현재 보기와 일치하는 자산이 없습니다.",
    "idea": "아이디어",
    "scripted": "대본 완료",
    "assets ready": "자산 준비",
    "editing": "편집 중",
    "scheduled": "예약됨",
    "published": "게시됨",
    "review": "검토",
    "new": "신규",
    "reviewed": "검토됨",
    "approved": "승인됨",
    "used": "사용됨",
    "archived": "보관됨",
  };

  Object.assign(dictionary, {
    "Template Library": "템플릿 라이브러리",
    "Templates": "템플릿",
    "Template": "템플릿",
    "Target module": "대상 모듈",
    "Copy template": "템플릿 복사",
    "Import to module": "모듈로 가져오기",
    "Suggest a template": "템플릿 제안하기",
  });

  const beginnerCopy = {
    "creator-os-dashboard": {
      title: "처음 쓰는 순서",
      steps: [
        "대시보드에서 필요한 모듈을 먼저 엽니다.",
        "각 모듈의 샘플 데이터를 내 작업에 맞게 바꿉니다.",
        "작업이 쌓이면 Export JSON으로 백업합니다.",
      ],
    },
    "creator-prompt-board": {
      title: "처음 쓰는 순서",
      steps: [
        "왼쪽에서 샘플 프롬프트를 고릅니다.",
        "오른쪽 내용을 내 영상 주제에 맞게 바꿉니다.",
        "복사해서 사용하는 AI 도구에 붙여넣습니다.",
      ],
    },
    "ai-shot-planner": {
      title: "처음 쓰는 순서",
      steps: [
        "장면을 먼저 고릅니다.",
        "가운데 샷 카드에서 만들 장면을 선택합니다.",
        "오른쪽 프롬프트와 연출 메모를 수정합니다.",
      ],
    },
    "api-cost-tracker": {
      title: "처음 쓰는 순서",
      steps: [
        "이번 달 예산과 크레딧 한도를 적습니다.",
        "사용한 AI 도구와 비용을 추가합니다.",
        "경고 카드가 높아지면 반복 실행을 줄입니다.",
      ],
    },
    "youtube-calendar": {
      title: "처음 쓰는 순서",
      steps: [
        "만들 콘텐츠 제목과 업로드 날짜를 적습니다.",
        "상태를 아이디어, 대본 완료, 예약 순서로 바꿉니다.",
        "주간 계획에서 빈 날짜와 제작 병목을 확인합니다.",
      ],
    },
    "creator-asset-manager": {
      title: "처음 쓰는 순서",
      steps: [
        "이미지, 영상, 프롬프트 같은 자산을 등록합니다.",
        "파일 경로와 라이선스 메모를 꼭 적습니다.",
        "승인됨 또는 사용됨 상태로 재사용 자료를 구분합니다.",
      ],
    },
    "thumbnail-idea-board": {
      title: "처음 쓰는 순서",
      steps: [
        "왼쪽에서 썸네일 후보를 고릅니다.",
        "제목, 문구, 감정 훅, 레이아웃을 내 영상에 맞게 바꿉니다.",
        "이미지 생성 프롬프트를 복사하거나 JSON으로 백업합니다.",
      ],
    },
    "template-library": {
      title: "泥섏쓬 ?곕뒗 ?쒖꽌",
      steps: [
        "필터로 필요한 영상 제작 템플릿을 찾습니다.",
        "자주 쓸 템플릿은 저장하거나 별점을 남깁니다.",
        "복사하거나 지원되는 모듈로 가져와서 실제 작업에 맞게 수정합니다.",
      ],
    },
  };

  beginnerCopy["template-library"] = {
    title: "\uCC98\uC74C \uC4F0\uB294 \uC21C\uC11C",
    steps: [
      "\uD544\uD130\uB85C \uD544\uC694\uD55C \uC601\uC0C1 \uC81C\uC791 \uD15C\uD50C\uB9BF\uC744 \uCC3E\uC2B5\uB2C8\uB2E4.",
      "\uC790\uC8FC \uC4F8 \uD15C\uD50C\uB9BF\uC740 \uC800\uC7A5\uD558\uAC70\uB098 \uBCC4\uC810\uC744 \uB0A8\uAE41\uB2C8\uB2E4.",
      "\uBCF5\uC0AC\uD558\uAC70\uB098 \uC9C0\uC6D0\uB418\uB294 \uBAA8\uB4C8\uB85C \uAC00\uC838\uC640\uC11C \uC2E4\uC81C \uC791\uC5C5\uC5D0 \uB9DE\uAC8C \uC218\uC815\uD569\uB2C8\uB2E4.",
    ],
  };

  function getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) || "ko";
  }

  function translateExact(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return text;
    return dictionary[trimmed] || text;
  }

  function translateTextNodes(root) {
    if (getLanguage() !== "ko") return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.parentElement && node.parentElement.closest(".ym-beginner-guide")) return;
      const translated = translateExact(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
    });
  }

  function translateAttributes(root) {
    if (getLanguage() !== "ko") return;
    root.querySelectorAll("input[placeholder], textarea[placeholder], [title], [aria-label]").forEach((node) => {
      ["placeholder", "title", "aria-label"].forEach((attr) => {
        if (!node.hasAttribute(attr)) return;
        const translated = translateExact(node.getAttribute(attr));
        if (translated !== node.getAttribute(attr)) node.setAttribute(attr, translated);
      });
    });
  }

  function currentAppKey() {
    const currentPath = location.pathname.replaceAll("\\", "/");
    return Object.keys(beginnerCopy).find((key) => currentPath.includes(key));
  }

  function ensureBeginnerGuide() {
    if (document.querySelector(".ym-beginner-guide")) return;
    const copy = beginnerCopy[currentAppKey()];
    if (!copy || getLanguage() !== "ko") return;
    const guide = document.createElement("aside");
    guide.className = "ym-beginner-guide";
    const title = document.createElement("strong");
    title.textContent = copy.title;
    const list = document.createElement("ol");
    copy.steps.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      list.appendChild(item);
    });
    guide.append(title, list);
    const target = document.querySelector(".hero, .top-band, .brand, .app-shell") || document.body;
    if (target === document.body) document.body.prepend(guide);
    else target.insertAdjacentElement("afterend", guide);
  }

  function ensureLanguagePicker() {
    if (document.querySelector("[data-language]")) return;
    const picker = document.createElement("label");
    picker.className = "ym-language-picker";
    const labelText = document.createElement("span");
    labelText.textContent = getLanguage() === "ko" ? "언어" : "Language";
    const select = document.createElement("select");
    select.setAttribute("data-language", "");
    [
      ["ko", "한국어"],
      ["en", "English"],
    ].forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      select.appendChild(option);
    });
    select.value = getLanguage();
    select.addEventListener("change", () => {
      localStorage.setItem(LANGUAGE_KEY, select.value);
      window.location.reload();
    });
    picker.append(labelText, select);
    document.body.prepend(picker);
  }

  function applyTranslations() {
    translateTextNodes(document.body);
    translateAttributes(document.body);
  }

  function injectStyles() {
    if (document.querySelector("[data-ym-i18n-style]")) return;
    const style = document.createElement("style");
    style.setAttribute("data-ym-i18n-style", "");
    style.textContent = `
      .ym-language-picker {
        position: fixed;
        z-index: 20;
        top: 14px;
        right: 14px;
        display: grid;
        gap: 4px;
        min-width: 132px;
        padding: 10px;
        border: 1px solid rgba(20, 25, 30, 0.15);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 12px 30px rgba(20, 25, 30, 0.12);
        color: #18201b;
        font: 700 12px/1.3 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .ym-language-picker select {
        width: 100%;
        min-height: 34px;
        border: 1px solid rgba(20, 25, 30, 0.18);
        border-radius: 6px;
        padding: 6px 8px;
        background: #fff;
        color: #18201b;
        font: inherit;
      }
      .ym-beginner-guide {
        width: min(1180px, calc(100% - 40px));
        margin: 18px auto;
        display: grid;
        grid-template-columns: 160px minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 16px 18px;
        border: 1px solid rgba(33, 110, 99, 0.18);
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 12px 32px rgba(28, 36, 30, 0.08);
        color: #18201b;
      }
      .ym-beginner-guide strong {
        font-size: 0.98rem;
      }
      .ym-beginner-guide ol {
        margin: 0;
        padding-left: 20px;
        display: grid;
        gap: 5px;
      }
      .ym-beginner-guide li {
        padding-left: 2px;
        color: #45504a;
        overflow-wrap: break-word;
        word-break: keep-all;
      }
      @media (max-width: 760px) {
        .ym-language-picker {
          position: static;
          margin: 10px 12px 0 auto;
        }
        .ym-beginner-guide {
          grid-template-columns: 1fr;
          width: min(100% - 28px, 720px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    ensureLanguagePicker();
    ensureBeginnerGuide();
    applyTranslations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

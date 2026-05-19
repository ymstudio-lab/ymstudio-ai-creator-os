# GitHub에 올리는 방법

## 1. GitHub CLI 로그인 확인

```powershell
gh auth status
```

`Logged in to github.com`와 GitHub 아이디가 보이면 준비 완료입니다.

## 2. 공개 전 점검

```powershell
cd path\to\YMStudioCreatorOS
git status --short --ignored
git add -n .
```

`reports`, `reviews`, `plan.md`, `status.json`, `tasks.json`, `PROMOTION.md`가 업로드 대상에 들어가면 안 됩니다.

## 3. 저장소 생성과 업로드

```powershell
git init
git add .
git commit -m "Initial public MVP package"
gh repo create ymstudio-ai-creator-os --public --source=. --remote=origin --push
```

이미 같은 이름의 저장소가 있으면 다른 이름을 쓰거나 기존 저장소에 push해야 합니다.

## 4. GitHub Pages로 데모 열기

1. GitHub 저장소 페이지로 이동
2. `Settings`
3. `Pages`
4. Source: `Deploy from a branch`
5. Branch: `main`
6. Folder: `/root`
7. Save

잠시 뒤 아래 주소로 열립니다.

```text
https://thdudals12345-max.github.io/ymstudio-ai-creator-os/
```

## 5. 공개 후 확인

- README 첫 화면이 이해되는지
- 루트 `index.html`이 대시보드로 이동하는지
- 한국어가 깨지지 않는지
- 대시보드에서 5개 모듈이 열리는지
- `Export JSON`이 다운로드되는지
- 저장소에 내부 운영 파일이 올라가지 않았는지

## 6. 처음 홍보 문구

짧게:

> AI 영상/콘텐츠 제작자를 위한 로컬 우선 Creator OS MVP를 공개했습니다. 프롬프트, 샷 플랜, API 비용, 유튜브 일정, 자산을 브라우저에서 바로 관리할 수 있습니다.

조금 길게:

> YMSTUDIO AI Creator OS는 AI 크리에이터가 프롬프트, 영상 샷 플랜, API 비용, 유튜브 일정, 자산을 한곳에서 관리할 수 있게 만든 로컬 우선 MVP입니다. 서버, 로그인, API 호출 없이 브라우저에서 바로 실행합니다.

주의 문구:

> 현재는 공개 데모/로컬 MVP입니다. 데이터는 브라우저 localStorage에 저장되므로 중요한 자료는 Export JSON으로 백업하세요.

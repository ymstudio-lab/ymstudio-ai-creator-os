# GitHub 공개 체크리스트

## 1. 공개 전 화면 확인

- [ ] `README.md` 첫 화면이 이해하기 쉬운지 확인
- [ ] `SECURITY.md`와 `PRIVACY.md` 확인
- [ ] `LICENSE` 확인
- [ ] `outputs/creator-os-dashboard/index.html` 직접 열기
- [ ] 대시보드에서 5개 모듈이 모두 열리는지 확인
- [ ] 한국어가 깨지지 않는지 확인
- [ ] 모듈 검색과 워크플로우 필터가 동작하는지 확인
- [ ] `Export JSON`으로 백업 파일이 만들어지는지 확인
- [ ] 스크린샷이나 문서에 개인 로컬 경로가 보이지 않는지 확인

## 2. 테스트

각 모듈 폴더에서 실행:

```powershell
node test.js
```

전체 스크린샷 검증:

```powershell
python ..\..\scripts\capture_creator_os_screenshots.py
```

위험 패턴 검사:

```powershell
rg -n "window\.prompt|fetch\(|XMLHttpRequest|sendBeacon|eval\(|new Function|document\.write|api[_-]?key|secret|password" outputs
```

검색 결과가 없으면 좋습니다.

## 3. GitHub 업로드 순서

GitHub CLI 로그인 후:

```powershell
cd path\to\YMStudioCreatorOS
git init
git add .
git commit -m "Initial public MVP package"
gh repo create ymstudio-ai-creator-os --public --source=. --remote=origin --push
```

## 4. 공개 후 확인

- [ ] GitHub README가 깨지지 않는지 확인
- [ ] 루트 `index.html`이 대시보드로 이동하는지 확인
- [ ] 저장소에 `reports`, `reviews`, 내부 큐 파일이 올라가지 않았는지 확인
- [ ] GitHub Pages를 켤 경우 대시보드와 모듈 링크가 정상인지 확인

## 5. 짧은 소개 문구

> AI 영상/콘텐츠 제작자를 위한 로컬 우선 Creator OS MVP입니다. 프롬프트, 샷 플랜, API 비용, 유튜브 일정, 자산을 브라우저에서 관리합니다.

주의 문구:

> 현재는 공개 데모/로컬 MVP입니다. 데이터는 브라우저 localStorage에 저장되므로 중요한 자료는 Export JSON으로 백업하세요.

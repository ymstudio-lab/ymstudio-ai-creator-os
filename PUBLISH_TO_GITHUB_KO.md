# GitHub 공개 전 확인 방법

이 문서는 public repo를 공개하기 전에 확인할 항목만 다룹니다. 실제 `git add`, `git commit`, `git push`, GitHub Pages 설정은 Polaris 승인 후에만 실행합니다.

## 1. GitHub 로그인 확인

```powershell
gh auth status
```

`Logged in to github.com`과 계정명이 보이면 로그인은 준비된 상태입니다.

## 2. 공개 범위 확인

```powershell
git status --short --ignored
git add -n .
```

확인 기준:

- `reports/`, `reviews/`, `plan.md`, `status.json`, `tasks.json`는 공개 대상이 아닙니다.
- 홍보/채널 운영 문서는 공개 대상이 아닙니다.
- `.env`, API 키, 토큰, 비밀번호, 계정 정보는 절대 공개 대상이 아닙니다.
- 앱 코드, README, 공개 문서, 스크린샷, 공개 데모 영상, 보안/개인정보 문서는 공개 대상입니다.

## 3. 공개 전 테스트

```powershell
node test.js
python scripts\test_creator_os_interactions.py
python scripts\test_creator_os_sample_flow.py
python scripts\capture_creator_os_screenshots.py
```

각 모듈 폴더의 `test.js`도 함께 실행합니다.

## 4. 보안 스캔

```powershell
rg -n "window\.prompt|fetch\(|XMLHttpRequest|sendBeacon|eval\(|new Function|document\.write|api[_-]?key|secret|password" outputs
rg -n -i "api[_-]?key|secret|token|oauth|password|\.env" README.md docs outputs scripts
```

정상 기준:

- 실제 자격증명이나 계정 정보가 없어야 합니다.
- 보안 문서 안의 금지 예시는 괜찮지만, 실제 값은 없어야 합니다.

## 5. GitHub Pages 확인

Polaris 승인 후 배포가 끝나면 아래 주소를 확인합니다.

```text
https://ymstudio-lab.github.io/ymstudio-ai-creator-os/
```

확인 기준:

- 루트 페이지가 Creator OS Dashboard로 이동합니다.
- Dashboard, Template Library, Script Generator가 열립니다.
- 샘플 프로젝트 버튼이 동작합니다.
- `Export JSON` 다운로드가 동작합니다.
- 모바일 폭에서 가로 스크롤이 생기지 않습니다.

## 6. 공개 설명 문구

짧은 설명:

> YMSTUDIO AI Creator OS는 AI 영상/콘텐츠 제작자를 위한 로컬 우선 브라우저 MVP입니다. 프롬프트, 샷 플랜, 비용, 일정, 자산 메모를 서버, 로그인, 외부 API 호출 없이 관리합니다.

주의 문구:

> 현재 버전은 공개 데모용 로컬 MVP입니다. 데이터는 브라우저 `localStorage`에 저장되므로 중요한 자료는 `Export JSON`으로 백업하세요.

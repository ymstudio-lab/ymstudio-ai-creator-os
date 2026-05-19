# YMSTUDIO AI Creator OS

AI 영상/콘텐츠 제작자를 위한 로컬 우선 Creator OS MVP입니다.

이 프로젝트는 브라우저에서 바로 여는 정적 웹앱 묶음입니다. 서버, 로그인, 외부 API 호출 없이 `localStorage`에 데이터를 저장합니다.

## 포함 모듈

| 모듈 | 용도 |
| --- | --- |
| Creator Prompt Board | 프롬프트 저장, 검색, 즐겨찾기, 평점 관리 |
| AI Shot Planner | AI 영상 장면, 샷, 프롬프트, 연출 메모 관리 |
| API Cost Tracker | AI 도구 사용 비용과 크레딧 수동 기록 |
| YouTube Calendar | 유튜브 콘텐츠 아이디어, 상태, 업로드 일정 관리 |
| Creator Asset Manager | 이미지, 영상, 프롬프트, 라이선스, 파일 경로 관리 |
| Creator OS Dashboard | 위 모듈을 한 화면에서 여는 로컬 런처 |

## 바로 실행하기

1. 저장소를 다운로드하거나 clone합니다.
2. 아래 파일을 브라우저로 엽니다.

```text
outputs/creator-os-dashboard/index.html
```

루트의 `index.html`을 열어도 대시보드로 이동합니다.

## 초보자 사용 순서

1. 대시보드에서 필요한 모듈을 엽니다.
2. 처음에는 각 모듈의 샘플 데이터를 그대로 둘러봅니다.
3. 내 콘텐츠 주제에 맞게 제목, 메모, 프롬프트를 바꿉니다.
4. 중요한 데이터는 각 모듈의 `Export JSON`으로 백업합니다.
5. 브라우저 캐시를 지우기 전에는 반드시 백업합니다.

## 데이터 저장 방식

- 데이터는 사용자의 브라우저 `localStorage`에 저장됩니다.
- 서버로 업로드하지 않습니다.
- 외부 API를 호출하지 않습니다.
- 다른 브라우저나 다른 PC로 자동 동기화되지 않습니다.

## 현재 상태

- 공개 데모/로컬 MVP 단계
- 기본 기능 테스트 통과
- 데스크톱/모바일 스크린샷 검증 통과
- 독립 코드 검토 통과
- 치명적인 보안 이슈 없음

## 주의

이 저장소는 아직 SaaS 제품이 아닙니다. 계정, 암호화, 클라우드 동기화, 권한 관리가 없습니다.

API 키, 비밀번호, 고객 개인정보, 민감한 계약 정보를 입력하지 마세요.

## 검증 명령

각 모듈 폴더에서:

```powershell
node test.js
```

전체 스크린샷 검증:

```powershell
python ..\..\scripts\capture_creator_os_screenshots.py
```

## 라이선스

초기 공개용 라이선스는 `LICENSE`를 확인하세요.

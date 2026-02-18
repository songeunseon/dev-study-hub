# Dev Study Hub

웹 개발 학습을 위한 올인원 플랫폼입니다. 체계적인 로드맵을 따라 학습하고, 노트를 작성하며, 진행 상황을 추적할 수 있습니다.

## Features

- **5개 학습 카테고리** — Frontend, Backend, Server, Network, Git
- **인터랙티브 로드맵** — 카테고리별 학습 경로를 시각적으로 탐색
- **학습 노트** — 세부항목별 노트 작성 및 일자별 관리
- **학습 기록** — 완료한 항목 추적, 복습 기능
- **할일 관리** — 오늘의 학습 목표 설정 및 체크
- **학습 현황** — 일간/월간 활동 차트
- **PDF 내보내기** — 노트를 PDF로 다운로드
- **테마 지원** — 라이트/다크 모드 + 6가지 컬러 테마
- **Firebase 인증** — 이메일/비밀번호 + Google 로그인

## Tech Stack

| 기술 | 설명 |
|------|------|
| [Next.js](https://nextjs.org/) 16 | App Router, Turbopack |
| [TypeScript](https://www.typescriptlang.org/) 5 | 타입 안전성 |
| [HeroUI](https://heroui.com/) | UI 컴포넌트 라이브러리 |
| [Tailwind CSS](https://tailwindcss.com/) v4 | 유틸리티 CSS |
| [Firebase](https://firebase.google.com/) | 인증 (Auth) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 다크모드/테마 |

## Getting Started

### 사전 요구사항

- Node.js 18+
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/songeunseon/dev-study-hub.git
cd dev-study-hub

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### Firebase 설정

`lib/firebase.ts`에서 Firebase 프로젝트 설정을 업데이트하세요:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ...
};
```

## Scripts

```bash
npm run dev       # 개발 서버 (Turbopack)
npm run build     # 프로덕션 빌드
npm run start     # 프로덕션 서버
npm run lint      # ESLint
npm run format    # Prettier 포맷팅
```

## Project Structure

```
app/                    # 페이지 (App Router)
  category/[slug]/      # 카테고리별 학습 페이지
  login/                # 로그인
  signup/               # 회원가입
components/             # React 컴포넌트
lib/                    # 유틸리티 & Context
types/                  # TypeScript 타입 정의
public/                 # 정적 파일 (폰트 등)
```

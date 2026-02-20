# Dev Study Hub

## Project Overview

웹 개발 학습 플랫폼. 프론트엔드, 백엔드, 서버, 네트워크, Git 5개 카테고리의 로드맵 기반 학습 + 노트 작성 + 학습 기록 관리 + PDF 내보내기를 제공한다.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **UI Library**: HeroUI (`@heroui/react`) + Tailwind CSS v4
- **Auth & DB**: Firebase Authentication (Email/Password + Google OAuth)
- **State**: React Context (`lib/study.tsx`, `lib/auth.tsx`) + localStorage 영속화
- **Theming**: next-themes + HeroUI 테마 (light/dark + 6 color themes)
- **Charts**: Recharts (미사용 중, StudyStats는 커스텀 바 차트)
- **PDF Export**: 브라우저 네이티브 print (`lib/export-pdf.ts`)

## Project Structure

```
app/                    # Next.js App Router pages
  category/[slug]/      # 카테고리별 학습 페이지 (로드맵, 노트, 학습기록 탭)
  login/                # 로그인
  signup/               # 회원가입
  reset-password/       # 비밀번호 재설정
  privacy/              # 개인정보 처리방침
  terms/                # 이용약관
components/             # React 컴포넌트
  Dashboard.tsx         # 메인 대시보드 (히어로 배너 + 카테고리 + 할일 + 통계)
  Sidebar.tsx           # 사이드바 네비게이션 (데스크탑/모바일)
  Roadmap.tsx           # 로드맵 시각화 + 세부항목 모달 (학습완료/노트작성)
  StudyStats.tsx        # 학습 현황 차트 (일간/월간)
  TodoList.tsx          # 할일 관리
  CategoryCard.tsx      # 카테고리 카드
  ThemeSelector.tsx     # 테마 선택기
  LandingPage.tsx       # 비로그인 랜딩 페이지
  Providers.tsx         # Context providers wrapper
lib/                    # 유틸리티 & 서비스
  auth.tsx              # Firebase 인증 context (로그인/회원가입/탈퇴)
  study.tsx             # 학습 데이터 context (todos, studyLogs, studyNotes + localStorage)
  firebase.ts           # Firebase 설정
  content.ts            # 카테고리별 학습 콘텐츠 (topics, subtopics)
  roadmap.ts            # 로드맵 노드/엣지 데이터
  roadmap-content.ts    # 로드맵 세부항목 학습 내용
  export-pdf.ts         # PDF 내보내기 (브라우저 print)
  theme.tsx             # 테마 context
types/index.ts          # 공통 타입 정의
hero.ts                 # HeroUI 설정
```

## Key Patterns

### Hydration-safe localStorage

localStorage는 SSR에서 사용 불가. `hydrated` 플래그 패턴 사용:

```typescript
const [hydrated, setHydrated] = useState(false);
useEffect(() => {
  const saved = localStorage.getItem(KEY);
  if (saved) setState(JSON.parse(saved));
  setHydrated(true);
}, []);
useEffect(() => {
  if (hydrated) localStorage.setItem(KEY, JSON.stringify(state));
}, [state, hydrated]);
```

### StudyCategory

`"frontend" | "backend" | "server" | "network" | "git"` — 5개 카테고리. 새 카테고리 추가 시 변경 필요 파일:

- `types/index.ts` (타입 + CATEGORIES 배열)
- `lib/content.ts` (CategoryContent)
- `lib/roadmap.ts` (RoadmapData)
- `lib/roadmap-content.ts` (노드별 학습 내용)
- `components/Dashboard.tsx` (CATEGORY_DESC)
- `components/CategoryCard.tsx` (CATEGORY_STYLES + CATEGORY_ICONS)
- `components/Sidebar.tsx` (CATEGORY_ICONS)

### Context 사용

- `useAuth()` — 인증 상태, 로그인/로그아웃/회원가입/탈퇴
- `useStudy()` — todos, studyLogs, studyNotes + CRUD 메서드

## Commands

```bash
bun dev           # 개발 서버 (Turbopack)
bun run build     # 프로덕션 빌드
bun start         # 프로덕션 서버 실행
bun run preview   # 빌드 + 실행 (배포 전 확인)
bun run lint      # ESLint 검사
bun run lint:fix  # ESLint 자동 수정
bun run format    # Prettier 포맷팅
bun run format:check  # 포맷 검사만 (CI용)
bun run typecheck # TypeScript 타입 검사
bun run check     # 전체 검증 (타입+린트+포맷)
bun run clean     # 빌드 캐시 삭제
```

## Conventions

- 한국어 UI (모든 텍스트 한국어)
- HeroUI 컴포넌트 우선 사용 (Button, Card, Modal, Input 등)
- SVG 아이콘은 인라인 (아이콘 라이브러리 미사용)
- Tailwind CSS 유틸리티 클래스 사용
- `"use client"` 지시어: 클라이언트 컴포넌트에 필수
- ESLint 9 flat config (`eslint.config.mjs`)
- `devIndicators: false` (Next.js 개발 표시 비활성화)

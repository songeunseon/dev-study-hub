import { LEARNING_CONTENT, type LearningTopic } from "./content";

const fe = LEARNING_CONTENT.frontend.topics;
const be = LEARNING_CONTENT.backend.topics;
const sv = LEARNING_CONTENT.server.topics;
const nw = LEARNING_CONTENT.network.topics;
const gt = LEARNING_CONTENT.git.topics;

/**
 * 로드맵 노드 ID → 학습 콘텐츠 매핑
 * 기존 LEARNING_CONTENT에 있는 항목은 재사용하고,
 * 없는 항목은 새로 작성합니다.
 */
export const ROADMAP_NODE_CONTENT: Record<string, LearningTopic> = {
  // ─── Frontend ───────────────────────────────────────
  "fe-internet": {
    title: "인터넷 기초",
    description:
      "웹이 동작하는 기본 원리를 이해합니다. 브라우저에 URL을 입력했을 때 어떤 과정을 거쳐 화면이 표시되는지 알아봅니다.",
    concepts: [
      "클라이언트-서버 모델과 요청-응답 사이클",
      "HTTP/HTTPS 프로토콜의 기본 구조",
      "브라우저 렌더링 과정 (DOM 파싱 → CSSOM → 렌더 트리 → 페인트)",
      "DNS 조회와 도메인 이름 해석 과정",
      "TCP/IP 기반의 데이터 전송 원리",
    ],
  },
  "fe-html": fe[0], // HTML 기초
  "fe-css": fe[1], // CSS 기초
  "fe-js": fe[2], // JavaScript 기초
  "fe-vcs": {
    title: "버전 관리",
    description:
      "코드의 변경 이력을 체계적으로 관리하고, 팀원과 효율적으로 협업하기 위한 도구입니다. Git은 현대 소프트웨어 개발의 필수 기술입니다.",
    concepts: [
      "Git 기본 명령어 (init, add, commit, push, pull)",
      "브랜치 생성과 병합 (branch, merge, rebase)",
      "GitHub / GitLab을 활용한 협업 워크플로우",
      "Pull Request와 코드 리뷰 프로세스",
      "브랜치 전략 (Git Flow, GitHub Flow, Trunk-based)",
      "충돌 해결과 cherry-pick",
    ],
  },
  "fe-pkg": {
    title: "패키지 매니저",
    description:
      "프로젝트의 외부 의존성을 설치, 관리, 업데이트하는 도구입니다. 효율적인 의존성 관리는 프로젝트의 안정성과 직결됩니다.",
    concepts: [
      "npm 기본 사용법 (install, update, uninstall, scripts)",
      "yarn과 pnpm의 특징과 차이점",
      "package.json 구조 (dependencies, devDependencies, scripts)",
      "lock 파일의 역할 (package-lock.json, yarn.lock)",
      "시맨틱 버저닝 (^, ~, 정확한 버전 지정)",
      "모노레포와 워크스페이스",
    ],
  },
  "fe-ts": fe[4], // TypeScript
  "fe-framework": fe[3], // React 기초
  "fe-state": {
    title: "상태 관리",
    description:
      "애플리케이션의 데이터 흐름을 체계적으로 관리합니다. 컴포넌트 간 상태 공유와 서버 상태 동기화를 효율적으로 처리합니다.",
    concepts: [
      "Context API를 활용한 전역 상태 공유",
      "Zustand / Jotai - 가벼운 상태 관리 라이브러리",
      "Redux Toolkit - 예측 가능한 상태 컨테이너",
      "TanStack Query - 서버 상태 관리와 캐싱",
      "상태의 분류 (클라이언트 상태 vs 서버 상태)",
      "불변성(Immutability)과 상태 업데이트 패턴",
    ],
  },
  "fe-css-arch": {
    title: "CSS 아키텍처",
    description:
      "대규모 프로젝트에서도 확장 가능하고 유지보수하기 쉬운 스타일링 전략을 선택합니다.",
    concepts: [
      "Tailwind CSS - 유틸리티 퍼스트 CSS 프레임워크",
      "CSS Modules - 컴포넌트 스코프 스타일링",
      "Styled Components - CSS-in-JS 접근법",
      "BEM 네이밍 컨벤션과 방법론",
      "디자인 토큰과 테마 시스템 구축",
      "CSS 번들 최적화 (tree-shaking, purging)",
    ],
  },
  "fe-meta": {
    title: "메타 프레임워크",
    description:
      "SSR, SSG, ISR 등을 지원하는 풀스택 프레임워크입니다. 라우팅, 데이터 패칭, 최적화를 통합적으로 제공합니다.",
    concepts: [
      "Next.js - App Router, Server Components, API Routes",
      "서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)",
      "ISR(Incremental Static Regeneration) 전략",
      "파일 기반 라우팅과 동적 라우팅",
      "Nuxt.js - Vue 기반 메타 프레임워크",
      "Astro - 콘텐츠 중심 정적 사이트 빌더",
    ],
  },
  "fe-test": {
    title: "프론트엔드 테스팅",
    description:
      "코드의 안정성을 보장하고 버그를 사전에 방지하는 테스트를 작성합니다. 컴포넌트, 훅, 사용자 인터랙션을 검증합니다.",
    concepts: [
      "Vitest / Jest - 유닛 테스트 프레임워크",
      "Testing Library - 사용자 관점의 컴포넌트 테스트",
      "Playwright / Cypress - E2E(End-to-End) 테스트",
      "테스트 전략 (유닛 → 통합 → E2E 피라미드)",
      "모킹과 스텁 (MSW를 활용한 API 모킹)",
      "테스트 커버리지 분석과 CI 연동",
    ],
  },
  "fe-perf": {
    title: "성능 최적화",
    description:
      "빠른 로딩과 부드러운 인터랙션으로 우수한 사용자 경험을 제공합니다. 측정 기반의 최적화가 핵심입니다.",
    concepts: [
      "Core Web Vitals (LCP, FID/INP, CLS)",
      "코드 스플리팅과 레이지 로딩 (React.lazy, dynamic import)",
      "이미지 최적화 (WebP, AVIF, next/image, srcset)",
      "번들 분석과 트리 셰이킹",
      "메모이제이션 (useMemo, useCallback, React.memo)",
      "가상화 (Virtualized List)와 무한 스크롤",
    ],
  },

  // ─── Backend ─────────────────────────────────────────
  "be-lang": {
    title: "서버 프로그래밍 언어",
    description:
      "서버 개발에 사용되는 주요 프로그래밍 언어를 이해하고, 프로젝트에 적합한 언어를 선택합니다.",
    concepts: [
      "JavaScript / TypeScript - Node.js 기반, 풀스택 통합",
      "Python - Django, FastAPI, 데이터 처리에 강점",
      "Java / Kotlin - Spring Boot, 엔터프라이즈 환경에 강점",
      "Go - 높은 동시성 처리, 간결한 문법",
      "언어 선택 기준 (생태계, 성능, 팀 역량, 프로젝트 요구사항)",
      "타입 시스템의 중요성 (정적 vs 동적 타입)",
    ],
  },
  "be-runtime": be[0], // Node.js 기초
  "be-db": be[2], // 데이터베이스
  "be-api": be[1], // REST API 설계
  "be-auth": be[3], // 인증과 보안
  "be-cache": {
    title: "캐싱",
    description:
      "자주 접근하는 데이터를 빠르게 제공하기 위한 캐싱 전략입니다. 적절한 캐싱은 서버 부하를 크게 줄이고 응답 속도를 개선합니다.",
    concepts: [
      "Redis - 인메모리 데이터 저장소 (String, Hash, Set, Sorted Set)",
      "캐시 전략 (Cache-Aside, Write-Through, Write-Behind)",
      "CDN 캐싱 - 정적 자산의 엣지 캐싱",
      "HTTP 캐싱 - Cache-Control, ETag, Last-Modified",
      "캐시 무효화 전략과 TTL 설정",
      "캐시 스탬피드와 핫 키 문제 해결",
    ],
  },
  "be-security": {
    title: "서버 보안",
    description:
      "서버 애플리케이션을 다양한 보안 위협으로부터 보호하는 방법을 학습합니다. 안전한 서비스 운영의 기본입니다.",
    concepts: [
      "CORS 설정 - 교차 출처 리소스 공유 정책",
      "SQL Injection 방어 - Prepared Statement, ORM 활용",
      "XSS 방어 - 입력 이스케이프, CSP 헤더",
      "CSRF 방어 - 토큰 기반 검증",
      "Rate Limiting - 요청 속도 제한으로 DDoS 방어",
      "HTTPS / TLS 설정과 보안 헤더 (HSTS, X-Frame-Options)",
    ],
  },
  "be-test": {
    title: "백엔드 테스팅",
    description:
      "서버 코드의 안정성과 정확성을 검증합니다. API 엔드포인트부터 비즈니스 로직까지 체계적으로 테스트합니다.",
    concepts: [
      "유닛 테스트 - 개별 함수와 모듈의 동작 검증",
      "통합 테스트 - DB, 외부 서비스 연동 검증",
      "API 테스트 - Postman, Supertest로 엔드포인트 검증",
      "테스트 데이터 관리 (Fixture, Factory, Seeding)",
      "모킹 전략 (DB 모킹, 외부 API 모킹)",
      "CI 환경에서의 테스트 자동화",
    ],
  },
  "be-arch": {
    title: "아키텍처 패턴",
    description:
      "확장 가능하고 유지보수하기 쉬운 서버 구조를 설계합니다. 서비스 규모와 요구사항에 맞는 아키텍처를 선택합니다.",
    concepts: [
      "MVC 패턴 - Model, View, Controller 분리",
      "마이크로서비스 아키텍처 vs 모놀리식",
      "메시지 큐 (RabbitMQ, Kafka) - 비동기 처리와 이벤트 기반",
      "WebSocket - 양방향 실시간 통신 구현",
      "CQRS와 이벤트 소싱 패턴",
      "도메인 주도 설계(DDD)의 기본 개념",
    ],
  },

  // ─── Server / Infra ──────────────────────────────────
  "sv-os": sv[0], // Linux 기초
  "sv-net": {
    title: "서버 네트워크",
    description:
      "서버 운영에 필요한 네트워크 설정과 관리 방법을 학습합니다. 안정적인 서비스 운영의 기반입니다.",
    concepts: [
      "IP 주소 / 서브넷 / 포트 번호의 이해",
      "방화벽 설정 (iptables, ufw) - 인바운드/아웃바운드 규칙",
      "SSH 접속과 키 기반 인증 (ssh-keygen, authorized_keys)",
      "리버스 프록시 (Nginx) - 로드 밸런싱, SSL 종료",
      "DNS 설정과 도메인 연결",
      "포트 포워딩과 네트워크 디버깅 (netstat, ss, curl)",
    ],
  },
  "sv-docker": sv[1], // Docker
  "sv-orch": {
    title: "컨테이너 오케스트레이션",
    description:
      "다수의 컨테이너를 자동으로 배포, 스케일링, 관리합니다. 대규모 서비스 운영에 필수적인 기술입니다.",
    concepts: [
      "Kubernetes 핵심 개념 (클러스터, 노드, 컨트롤 플레인)",
      "Pod - 컨테이너의 최소 배포 단위",
      "Service - 네트워크 접근과 로드 밸런싱",
      "Deployment - 선언적 배포와 롤링 업데이트",
      "Helm Charts - 패키지 매니저를 통한 앱 배포",
      "kubectl 기본 명령어와 리소스 관리",
    ],
  },
  "sv-cicd": sv[2], // CI/CD
  "sv-cloud": sv[3], // 클라우드 서비스
  "sv-iac": {
    title: "Infrastructure as Code",
    description:
      "인프라를 코드로 정의하고 버전 관리하여, 재현 가능하고 일관된 환경을 구축합니다.",
    concepts: [
      "Terraform - 선언적 인프라 프로비저닝 (HCL 문법)",
      "Ansible - 설정 관리와 자동화 (Playbook, Role)",
      "Pulumi - 프로그래밍 언어로 인프라 정의",
      "IaC의 장점 (버전 관리, 재현성, 자동화)",
      "상태 관리 (tfstate, 원격 백엔드)",
      "모듈화와 환경별 설정 분리",
    ],
  },
  "sv-mon": {
    title: "모니터링 & 로깅",
    description:
      "시스템의 상태를 실시간으로 관찰하고, 문제를 신속하게 진단하고 해결합니다.",
    concepts: [
      "Prometheus - 메트릭 수집과 쿼리 (PromQL)",
      "Grafana - 대시보드 시각화와 알림 설정",
      "ELK Stack - Elasticsearch, Logstash, Kibana (로그 분석)",
      "알림 설정 (PagerDuty, Slack 연동, 에스컬레이션 정책)",
      "APM (Application Performance Monitoring) - 병목 구간 추적",
      "구조화된 로깅과 로그 레벨 관리",
    ],
  },

  // ─── Network ─────────────────────────────────────────
  "nw-basic": {
    title: "네트워크 기초",
    description:
      "네트워크의 기본 개념과 구조를 이해합니다. 데이터가 어떻게 전달되는지의 근본 원리를 학습합니다.",
    concepts: [
      "네트워크 분류 - LAN, WAN, MAN의 특징과 차이",
      "토폴로지 - 스타, 링, 메시, 버스 구조의 장단점",
      "패킷 스위칭 vs 서킷 스위칭의 동작 원리",
      "대역폭(Bandwidth)과 지연 시간(Latency)의 개념",
      "클라이언트-서버 모델과 P2P 모델",
      "네트워크 장비 (허브, 스위치, 라우터, 게이트웨이)",
    ],
  },
  "nw-osi": {
    title: "OSI 7계층 모델",
    description:
      "네트워크 통신을 7개 계층으로 나눠 이해합니다. 각 계층의 역할과 프로토콜을 파악하면 네트워크 문제를 체계적으로 분석할 수 있습니다.",
    concepts: [
      "물리 계층 (L1) - 전기 신호, 케이블, 허브",
      "데이터링크 계층 (L2) - MAC 주소, ARP, 스위치, 프레임",
      "네트워크 계층 (L3) - IP 주소, 라우팅, ICMP",
      "전송 계층 (L4) - TCP/UDP, 포트 번호, 세그먼트",
      "세션/표현/응용 계층 (L5-L7) - SSL/TLS, HTTP, FTP, SMTP",
      "OSI 모델과 TCP/IP 4계층 모델의 비교",
    ],
  },
  "nw-ip": {
    title: "IP & 라우팅",
    description:
      "IP 주소 체계와 패킷이 목적지까지 전달되는 라우팅 과정을 학습합니다. 네트워크 설계의 기반이 되는 핵심 지식입니다.",
    concepts: [
      "IPv4 주소 구조 (네트워크부 + 호스트부)와 서브넷 마스크",
      "IPv6 기초 - 확장된 주소 체계와 특징",
      "CIDR 표기법 - 유연한 서브넷 분할",
      "NAT (Network Address Translation) - 사설 IP ↔ 공인 IP 변환",
      "라우팅 프로토콜 - BGP(외부), OSPF(내부)의 역할",
      "라우팅 테이블과 기본 게이트웨이",
    ],
  },
  "nw-tcp": nw[1], // TCP/IP
  "nw-http": nw[0], // HTTP 프로토콜
  "nw-dns": nw[2], // DNS
  "nw-websocket": {
    title: "실시간 통신",
    description:
      "서버와 클라이언트 간의 양방향 실시간 통신 기술을 학습합니다. 채팅, 알림, 실시간 데이터 스트리밍에 활용됩니다.",
    concepts: [
      "WebSocket - 양방향 전이중 통신 (핸드셰이크, 프레임 구조)",
      "Server-Sent Events (SSE) - 서버 → 클라이언트 단방향 스트리밍",
      "Long Polling - HTTP 기반의 유사 실시간 기법",
      "WebRTC - P2P 기반 음성/영상/데이터 통신",
      "각 기술의 사용 사례와 트레이드오프",
      "Socket.io를 활용한 실시간 애플리케이션 구축",
    ],
  },
  "nw-security": nw[3], // 네트워크 보안

  // ─── Git ────────────────────────────────────────────
  "git-basics": gt[0], // Git 기초
  "git-branch": gt[1], // 브랜치와 병합
  "git-remote": gt[2], // 원격 저장소
  "git-workflow": {
    title: "협업 워크플로우",
    description:
      "팀에서 효율적으로 협업하기 위한 Git 워크플로우를 학습합니다. PR 기반의 코드 리뷰와 브랜치 전략을 이해합니다.",
    concepts: [
      "Pull Request(PR) 작성법 - 제목, 설명, 리뷰어 지정",
      "코드 리뷰 프로세스 - Approve, Request Changes, Comment",
      "Git Flow - feature, develop, release, hotfix 브랜치 체계",
      "GitHub Flow - main + feature 브랜치 단순 전략",
      "Trunk-based Development - 짧은 생명주기 브랜치",
      "Squash Merge vs Merge Commit vs Rebase Merge",
    ],
  },
  "git-advanced": gt[3], // 고급 Git 명령어
  "git-essential": {
    title: "필수 명령어 모음",
    description:
      "개발자가 반드시 알아야 하는 Git 핵심 명령어를 정리합니다. 실무에서 매일 사용하는 명령어부터 문제 해결에 필요한 명령어까지 포함합니다.",
    concepts: [
      "git reset (--soft, --mixed, --hard) - 커밋 되돌리기",
      "git revert - 안전하게 커밋 취소 (새 커밋 생성)",
      "git log --oneline --graph --all - 히스토리 시각화",
      "git blame - 각 라인의 마지막 수정자 추적",
      "git show <commit> - 특정 커밋의 변경 내용 확인",
      "git clean -fd - 추적되지 않는 파일 정리",
      "git rm --cached - 스테이징에서만 제거 (파일 유지)",
      "git config --global - 사용자 이름, 이메일, 에디터 설정",
    ],
  },
  "git-hosting": {
    title: "Git 호스팅 플랫폼",
    description:
      "GitHub, GitLab 등 주요 호스팅 플랫폼의 기능을 활용합니다. CI/CD, 이슈 관리, 프로젝트 보드 등 개발 워크플로우를 통합적으로 관리합니다.",
    concepts: [
      "GitHub Actions - 워크플로우 YAML 작성, 자동 빌드/테스트/배포",
      "GitHub Issues - 이슈 추적, 라벨, 마일스톤 관리",
      "GitHub Projects - 칸반 보드로 프로젝트 관리",
      "GitLab CI/CD - .gitlab-ci.yml 파이프라인 설정",
      "GitHub Pages - 정적 사이트 무료 배포",
      "GitHub Releases - 버전 태그와 릴리스 노트 관리",
    ],
  },
};

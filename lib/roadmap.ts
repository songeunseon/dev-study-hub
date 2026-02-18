export interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  type: "milestone" | "topic" | "subtopic";
  children?: RoadmapNode[];
}

export interface RoadmapData {
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

export const ROADMAPS: Record<string, RoadmapData> = {
  frontend: {
    title: "프론트엔드 로드맵",
    description: "웹 프론트엔드 개발자가 되기 위한 학습 경로",
    nodes: [
      {
        id: "fe-internet",
        title: "인터넷 기초",
        type: "milestone",
        description: "웹이 동작하는 기본 원리를 이해합니다.",
        children: [
          { id: "fe-internet-1", title: "인터넷 동작 원리", type: "subtopic" },
          { id: "fe-internet-2", title: "HTTP/HTTPS", type: "subtopic" },
          {
            id: "fe-internet-3",
            title: "브라우저 동작 원리",
            type: "subtopic",
          },
          { id: "fe-internet-4", title: "DNS와 도메인", type: "subtopic" },
        ],
      },
      {
        id: "fe-html",
        title: "HTML",
        type: "milestone",
        description: "웹 페이지의 구조와 콘텐츠를 정의합니다.",
        children: [
          { id: "fe-html-1", title: "시멘틱 태그", type: "subtopic" },
          { id: "fe-html-2", title: "폼과 유효성 검사", type: "subtopic" },
          { id: "fe-html-3", title: "접근성 (a11y)", type: "subtopic" },
          { id: "fe-html-4", title: "SEO 기초", type: "subtopic" },
        ],
      },
      {
        id: "fe-css",
        title: "CSS",
        type: "milestone",
        description: "레이아웃, 스타일링, 반응형 디자인을 구현합니다.",
        children: [
          { id: "fe-css-1", title: "박스 모델", type: "subtopic" },
          { id: "fe-css-2", title: "Flexbox", type: "subtopic" },
          { id: "fe-css-3", title: "Grid", type: "subtopic" },
          { id: "fe-css-4", title: "반응형 디자인", type: "subtopic" },
          { id: "fe-css-5", title: "애니메이션", type: "subtopic" },
        ],
      },
      {
        id: "fe-js",
        title: "JavaScript",
        type: "milestone",
        description: "웹의 핵심 프로그래밍 언어를 마스터합니다.",
        children: [
          { id: "fe-js-1", title: "변수와 타입", type: "subtopic" },
          { id: "fe-js-2", title: "함수와 스코프", type: "subtopic" },
          { id: "fe-js-3", title: "DOM 조작", type: "subtopic" },
          {
            id: "fe-js-4",
            title: "비동기 (Promise, async/await)",
            type: "subtopic",
          },
          { id: "fe-js-5", title: "ES6+ 문법", type: "subtopic" },
          { id: "fe-js-6", title: "모듈 시스템", type: "subtopic" },
        ],
      },
      {
        id: "fe-vcs",
        title: "버전 관리",
        type: "topic",
        description: "코드 변경 이력을 관리하고 협업합니다.",
        children: [
          { id: "fe-vcs-1", title: "Git 기초", type: "subtopic" },
          { id: "fe-vcs-2", title: "GitHub / GitLab", type: "subtopic" },
          { id: "fe-vcs-3", title: "브랜치 전략", type: "subtopic" },
        ],
      },
      {
        id: "fe-pkg",
        title: "패키지 매니저",
        type: "topic",
        description: "의존성을 관리하고 프로젝트를 구성합니다.",
        children: [
          { id: "fe-pkg-1", title: "npm", type: "subtopic" },
          { id: "fe-pkg-2", title: "yarn / pnpm", type: "subtopic" },
          { id: "fe-pkg-3", title: "package.json 구조", type: "subtopic" },
        ],
      },
      {
        id: "fe-ts",
        title: "TypeScript",
        type: "milestone",
        description: "정적 타입으로 안정적인 코드를 작성합니다.",
        children: [
          { id: "fe-ts-1", title: "기본 타입", type: "subtopic" },
          { id: "fe-ts-2", title: "인터페이스와 타입", type: "subtopic" },
          { id: "fe-ts-3", title: "제네릭", type: "subtopic" },
          { id: "fe-ts-4", title: "유틸리티 타입", type: "subtopic" },
        ],
      },
      {
        id: "fe-framework",
        title: "프레임워크",
        type: "milestone",
        description: "컴포넌트 기반 UI 개발 프레임워크를 학습합니다.",
        children: [
          { id: "fe-fw-1", title: "React (추천)", type: "subtopic" },
          { id: "fe-fw-2", title: "Vue.js", type: "subtopic" },
          { id: "fe-fw-3", title: "Angular", type: "subtopic" },
        ],
      },
      {
        id: "fe-state",
        title: "상태 관리",
        type: "topic",
        description: "애플리케이션의 데이터 흐름을 관리합니다.",
        children: [
          { id: "fe-state-1", title: "Context API", type: "subtopic" },
          { id: "fe-state-2", title: "Zustand / Jotai", type: "subtopic" },
          { id: "fe-state-3", title: "Redux Toolkit", type: "subtopic" },
          { id: "fe-state-4", title: "TanStack Query", type: "subtopic" },
        ],
      },
      {
        id: "fe-css-arch",
        title: "CSS 아키텍처",
        type: "topic",
        description: "확장 가능한 스타일링 전략을 선택합니다.",
        children: [
          { id: "fe-cssa-1", title: "Tailwind CSS (추천)", type: "subtopic" },
          { id: "fe-cssa-2", title: "CSS Modules", type: "subtopic" },
          { id: "fe-cssa-3", title: "Styled Components", type: "subtopic" },
        ],
      },
      {
        id: "fe-meta",
        title: "메타 프레임워크",
        type: "milestone",
        description: "SSR, SSG를 지원하는 풀스택 프레임워크입니다.",
        children: [
          { id: "fe-meta-1", title: "Next.js (추천)", type: "subtopic" },
          { id: "fe-meta-2", title: "Nuxt.js", type: "subtopic" },
          { id: "fe-meta-3", title: "Astro", type: "subtopic" },
        ],
      },
      {
        id: "fe-test",
        title: "테스팅",
        type: "topic",
        description: "코드의 안정성을 보장하는 테스트를 작성합니다.",
        children: [
          { id: "fe-test-1", title: "Vitest / Jest", type: "subtopic" },
          { id: "fe-test-2", title: "Testing Library", type: "subtopic" },
          { id: "fe-test-3", title: "Playwright / Cypress", type: "subtopic" },
        ],
      },
      {
        id: "fe-perf",
        title: "성능 최적화",
        type: "topic",
        description: "빠른 사용자 경험을 제공합니다.",
        children: [
          { id: "fe-perf-1", title: "Core Web Vitals", type: "subtopic" },
          { id: "fe-perf-2", title: "코드 스플리팅", type: "subtopic" },
          { id: "fe-perf-3", title: "이미지 최적화", type: "subtopic" },
          { id: "fe-perf-4", title: "번들 분석", type: "subtopic" },
        ],
      },
    ],
  },
  backend: {
    title: "백엔드 로드맵",
    description: "서버 사이드 개발자가 되기 위한 학습 경로",
    nodes: [
      {
        id: "be-lang",
        title: "프로그래밍 언어",
        type: "milestone",
        description: "서버 개발을 위한 언어를 선택합니다.",
        children: [
          {
            id: "be-lang-1",
            title: "JavaScript / TypeScript (추천)",
            type: "subtopic",
          },
          { id: "be-lang-2", title: "Python", type: "subtopic" },
          { id: "be-lang-3", title: "Java / Kotlin", type: "subtopic" },
          { id: "be-lang-4", title: "Go", type: "subtopic" },
        ],
      },
      {
        id: "be-runtime",
        title: "런타임 & 프레임워크",
        type: "milestone",
        description: "서버 애플리케이션을 구축할 프레임워크를 학습합니다.",
        children: [
          { id: "be-rt-1", title: "Node.js + Express", type: "subtopic" },
          { id: "be-rt-2", title: "Fastify / Hono", type: "subtopic" },
          { id: "be-rt-3", title: "NestJS", type: "subtopic" },
          { id: "be-rt-4", title: "Spring Boot", type: "subtopic" },
        ],
      },
      {
        id: "be-db",
        title: "데이터베이스",
        type: "milestone",
        description: "데이터를 저장하고 관리하는 시스템을 학습합니다.",
        children: [
          {
            id: "be-db-1",
            title: "관계형 DB (PostgreSQL, MySQL)",
            type: "subtopic",
          },
          {
            id: "be-db-2",
            title: "NoSQL (MongoDB, Firebase)",
            type: "subtopic",
          },
          { id: "be-db-3", title: "ORM (Prisma, TypeORM)", type: "subtopic" },
          { id: "be-db-4", title: "SQL 기본 문법", type: "subtopic" },
          { id: "be-db-5", title: "인덱싱과 최적화", type: "subtopic" },
        ],
      },
      {
        id: "be-api",
        title: "API 설계",
        type: "milestone",
        description: "클라이언트와 통신하는 인터페이스를 설계합니다.",
        children: [
          { id: "be-api-1", title: "REST API 원칙", type: "subtopic" },
          { id: "be-api-2", title: "GraphQL", type: "subtopic" },
          { id: "be-api-3", title: "API 문서화 (Swagger)", type: "subtopic" },
          { id: "be-api-4", title: "버저닝 전략", type: "subtopic" },
          { id: "be-api-5", title: "에러 핸들링", type: "subtopic" },
        ],
      },
      {
        id: "be-auth",
        title: "인증 & 인가",
        type: "milestone",
        description: "사용자 인증과 권한 관리를 구현합니다.",
        children: [
          { id: "be-auth-1", title: "세션 vs 토큰 인증", type: "subtopic" },
          { id: "be-auth-2", title: "JWT", type: "subtopic" },
          { id: "be-auth-3", title: "OAuth 2.0", type: "subtopic" },
          { id: "be-auth-4", title: "비밀번호 해싱", type: "subtopic" },
          {
            id: "be-auth-5",
            title: "RBAC (역할 기반 접근 제어)",
            type: "subtopic",
          },
        ],
      },
      {
        id: "be-cache",
        title: "캐싱",
        type: "topic",
        description: "성능 향상을 위한 캐싱 전략을 학습합니다.",
        children: [
          { id: "be-cache-1", title: "Redis", type: "subtopic" },
          { id: "be-cache-2", title: "CDN 캐싱", type: "subtopic" },
          { id: "be-cache-3", title: "HTTP 캐싱", type: "subtopic" },
        ],
      },
      {
        id: "be-security",
        title: "보안",
        type: "topic",
        description: "서버 애플리케이션의 보안을 강화합니다.",
        children: [
          { id: "be-sec-1", title: "CORS", type: "subtopic" },
          { id: "be-sec-2", title: "SQL Injection 방어", type: "subtopic" },
          { id: "be-sec-3", title: "XSS / CSRF 방어", type: "subtopic" },
          { id: "be-sec-4", title: "Rate Limiting", type: "subtopic" },
          { id: "be-sec-5", title: "HTTPS / TLS", type: "subtopic" },
        ],
      },
      {
        id: "be-test",
        title: "테스팅",
        type: "topic",
        description: "서버 코드의 안정성을 검증합니다.",
        children: [
          { id: "be-test-1", title: "유닛 테스트", type: "subtopic" },
          { id: "be-test-2", title: "통합 테스트", type: "subtopic" },
          {
            id: "be-test-3",
            title: "API 테스트 (Postman, Supertest)",
            type: "subtopic",
          },
        ],
      },
      {
        id: "be-arch",
        title: "아키텍처 패턴",
        type: "topic",
        description: "확장 가능한 서버 구조를 설계합니다.",
        children: [
          { id: "be-arch-1", title: "MVC 패턴", type: "subtopic" },
          { id: "be-arch-2", title: "마이크로서비스", type: "subtopic" },
          {
            id: "be-arch-3",
            title: "메시지 큐 (RabbitMQ, Kafka)",
            type: "subtopic",
          },
          { id: "be-arch-4", title: "WebSocket 실시간 통신", type: "subtopic" },
        ],
      },
    ],
  },
  server: {
    title: "서버/인프라 로드맵",
    description: "DevOps와 서버 인프라 엔지니어를 위한 학습 경로",
    nodes: [
      {
        id: "sv-os",
        title: "운영체제 기초",
        type: "milestone",
        description: "서버 운영의 기반이 되는 OS를 학습합니다.",
        children: [
          { id: "sv-os-1", title: "Linux 기본 명령어", type: "subtopic" },
          { id: "sv-os-2", title: "파일 시스템 구조", type: "subtopic" },
          { id: "sv-os-3", title: "사용자/권한 관리", type: "subtopic" },
          { id: "sv-os-4", title: "프로세스 관리", type: "subtopic" },
          { id: "sv-os-5", title: "쉘 스크립트", type: "subtopic" },
        ],
      },
      {
        id: "sv-net",
        title: "네트워크 기초",
        type: "topic",
        description: "서버 네트워크 설정과 관리를 학습합니다.",
        children: [
          { id: "sv-net-1", title: "IP / 서브넷 / 포트", type: "subtopic" },
          { id: "sv-net-2", title: "방화벽 (iptables, ufw)", type: "subtopic" },
          { id: "sv-net-3", title: "SSH 접속과 키 관리", type: "subtopic" },
          { id: "sv-net-4", title: "리버스 프록시 (Nginx)", type: "subtopic" },
        ],
      },
      {
        id: "sv-docker",
        title: "컨테이너",
        type: "milestone",
        description: "애플리케이션을 컨테이너로 패키징하고 관리합니다.",
        children: [
          { id: "sv-dk-1", title: "Docker 기초", type: "subtopic" },
          { id: "sv-dk-2", title: "Dockerfile 작성", type: "subtopic" },
          { id: "sv-dk-3", title: "Docker Compose", type: "subtopic" },
          { id: "sv-dk-4", title: "이미지 최적화", type: "subtopic" },
          { id: "sv-dk-5", title: "Docker 네트워크/볼륨", type: "subtopic" },
        ],
      },
      {
        id: "sv-orch",
        title: "컨테이너 오케스트레이션",
        type: "topic",
        description: "다수의 컨테이너를 자동으로 관리합니다.",
        children: [
          { id: "sv-orch-1", title: "Kubernetes 기초", type: "subtopic" },
          {
            id: "sv-orch-2",
            title: "Pod, Service, Deployment",
            type: "subtopic",
          },
          { id: "sv-orch-3", title: "Helm Charts", type: "subtopic" },
        ],
      },
      {
        id: "sv-cicd",
        title: "CI/CD",
        type: "milestone",
        description: "자동화된 빌드, 테스트, 배포 파이프라인을 구축합니다.",
        children: [
          { id: "sv-cicd-1", title: "GitHub Actions", type: "subtopic" },
          { id: "sv-cicd-2", title: "Jenkins / GitLab CI", type: "subtopic" },
          {
            id: "sv-cicd-3",
            title: "배포 전략 (블루-그린, 카나리)",
            type: "subtopic",
          },
          {
            id: "sv-cicd-4",
            title: "환경 분리 (dev/staging/prod)",
            type: "subtopic",
          },
        ],
      },
      {
        id: "sv-cloud",
        title: "클라우드",
        type: "milestone",
        description: "클라우드 플랫폼을 활용한 인프라를 구축합니다.",
        children: [
          {
            id: "sv-cloud-1",
            title: "AWS (EC2, S3, RDS, Lambda)",
            type: "subtopic",
          },
          {
            id: "sv-cloud-2",
            title: "GCP (Cloud Run, Firebase)",
            type: "subtopic",
          },
          { id: "sv-cloud-3", title: "Azure 기초", type: "subtopic" },
          { id: "sv-cloud-4", title: "서버리스 아키텍처", type: "subtopic" },
        ],
      },
      {
        id: "sv-iac",
        title: "IaC (Infrastructure as Code)",
        type: "topic",
        description: "인프라를 코드로 정의하고 관리합니다.",
        children: [
          { id: "sv-iac-1", title: "Terraform", type: "subtopic" },
          { id: "sv-iac-2", title: "Ansible", type: "subtopic" },
          { id: "sv-iac-3", title: "Pulumi", type: "subtopic" },
        ],
      },
      {
        id: "sv-mon",
        title: "모니터링 & 로깅",
        type: "topic",
        description: "시스템 상태를 관찰하고 문제를 진단합니다.",
        children: [
          { id: "sv-mon-1", title: "Prometheus + Grafana", type: "subtopic" },
          { id: "sv-mon-2", title: "ELK Stack (로그 분석)", type: "subtopic" },
          {
            id: "sv-mon-3",
            title: "알림 설정 (PagerDuty, Slack)",
            type: "subtopic",
          },
          {
            id: "sv-mon-4",
            title: "APM (Application Monitoring)",
            type: "subtopic",
          },
        ],
      },
    ],
  },
  network: {
    title: "네트워크 로드맵",
    description: "네트워크 기초부터 보안까지의 학습 경로",
    nodes: [
      {
        id: "nw-basic",
        title: "네트워크 기초",
        type: "milestone",
        description: "네트워크의 기본 개념과 구조를 이해합니다.",
        children: [
          {
            id: "nw-basic-1",
            title: "네트워크 분류 (LAN, WAN, MAN)",
            type: "subtopic",
          },
          {
            id: "nw-basic-2",
            title: "토폴로지 (스타, 링, 메시)",
            type: "subtopic",
          },
          {
            id: "nw-basic-3",
            title: "패킷 스위칭 vs 서킷 스위칭",
            type: "subtopic",
          },
          { id: "nw-basic-4", title: "대역폭과 지연 시간", type: "subtopic" },
        ],
      },
      {
        id: "nw-osi",
        title: "OSI 모델",
        type: "milestone",
        description: "네트워크 통신의 7계층 모델을 이해합니다.",
        children: [
          { id: "nw-osi-1", title: "물리 계층 (L1)", type: "subtopic" },
          {
            id: "nw-osi-2",
            title: "데이터링크 계층 (L2) - MAC, ARP",
            type: "subtopic",
          },
          {
            id: "nw-osi-3",
            title: "네트워크 계층 (L3) - IP, 라우팅",
            type: "subtopic",
          },
          {
            id: "nw-osi-4",
            title: "전송 계층 (L4) - TCP, UDP",
            type: "subtopic",
          },
          {
            id: "nw-osi-5",
            title: "세션/표현/응용 계층 (L5-L7)",
            type: "subtopic",
          },
        ],
      },
      {
        id: "nw-ip",
        title: "IP & 라우팅",
        type: "milestone",
        description: "IP 주소 체계와 패킷 라우팅을 학습합니다.",
        children: [
          { id: "nw-ip-1", title: "IPv4 주소와 서브넷", type: "subtopic" },
          { id: "nw-ip-2", title: "IPv6 기초", type: "subtopic" },
          { id: "nw-ip-3", title: "CIDR 표기법", type: "subtopic" },
          {
            id: "nw-ip-4",
            title: "NAT (네트워크 주소 변환)",
            type: "subtopic",
          },
          {
            id: "nw-ip-5",
            title: "라우팅 프로토콜 (BGP, OSPF)",
            type: "subtopic",
          },
        ],
      },
      {
        id: "nw-tcp",
        title: "TCP / UDP",
        type: "milestone",
        description: "전송 계층 프로토콜의 동작 원리를 학습합니다.",
        children: [
          { id: "nw-tcp-1", title: "TCP 3-way Handshake", type: "subtopic" },
          { id: "nw-tcp-2", title: "흐름 제어와 혼잡 제어", type: "subtopic" },
          { id: "nw-tcp-3", title: "TCP vs UDP 차이점", type: "subtopic" },
          { id: "nw-tcp-4", title: "소켓 프로그래밍", type: "subtopic" },
        ],
      },
      {
        id: "nw-http",
        title: "HTTP",
        type: "milestone",
        description: "웹 통신의 핵심 프로토콜을 학습합니다.",
        children: [
          {
            id: "nw-http-1",
            title: "HTTP 메서드와 상태 코드",
            type: "subtopic",
          },
          { id: "nw-http-2", title: "헤더와 쿠키", type: "subtopic" },
          { id: "nw-http-3", title: "HTTP/2와 HTTP/3", type: "subtopic" },
          { id: "nw-http-4", title: "캐싱 전략", type: "subtopic" },
          { id: "nw-http-5", title: "CORS", type: "subtopic" },
        ],
      },
      {
        id: "nw-dns",
        title: "DNS",
        type: "topic",
        description: "도메인 이름 해석 시스템을 학습합니다.",
        children: [
          { id: "nw-dns-1", title: "DNS 조회 과정", type: "subtopic" },
          {
            id: "nw-dns-2",
            title: "레코드 타입 (A, CNAME, MX, TXT)",
            type: "subtopic",
          },
          { id: "nw-dns-3", title: "TTL과 캐싱", type: "subtopic" },
          { id: "nw-dns-4", title: "네임서버 설정", type: "subtopic" },
        ],
      },
      {
        id: "nw-websocket",
        title: "실시간 통신",
        type: "topic",
        description: "양방향 실시간 통신 기술을 학습합니다.",
        children: [
          { id: "nw-ws-1", title: "WebSocket", type: "subtopic" },
          {
            id: "nw-ws-2",
            title: "Server-Sent Events (SSE)",
            type: "subtopic",
          },
          { id: "nw-ws-3", title: "Long Polling", type: "subtopic" },
          { id: "nw-ws-4", title: "WebRTC 기초", type: "subtopic" },
        ],
      },
      {
        id: "nw-security",
        title: "네트워크 보안",
        type: "milestone",
        description: "안전한 네트워크 통신을 위한 보안 기술을 학습합니다.",
        children: [
          { id: "nw-sec-1", title: "HTTPS와 TLS/SSL", type: "subtopic" },
          { id: "nw-sec-2", title: "인증서와 CA", type: "subtopic" },
          {
            id: "nw-sec-3",
            title: "대칭키 / 비대칭키 암호화",
            type: "subtopic",
          },
          { id: "nw-sec-4", title: "방화벽과 IDS/IPS", type: "subtopic" },
          { id: "nw-sec-5", title: "VPN", type: "subtopic" },
          { id: "nw-sec-6", title: "DDoS, MITM 공격과 방어", type: "subtopic" },
        ],
      },
    ],
  },
  git: {
    title: "Git 로드맵",
    description: "Git 버전 관리 시스템의 기초부터 고급 활용까지의 학습 경로",
    nodes: [
      {
        id: "git-basics",
        title: "Git 기초",
        type: "milestone",
        description: "Git의 기본 개념과 필수 명령어를 익힙니다.",
        children: [
          {
            id: "git-basics-1",
            title: "git init / git clone",
            type: "subtopic",
          },
          {
            id: "git-basics-2",
            title: "git add / git commit",
            type: "subtopic",
          },
          {
            id: "git-basics-3",
            title: "git status / git log / git diff",
            type: "subtopic",
          },
          { id: "git-basics-4", title: ".gitignore 설정", type: "subtopic" },
          { id: "git-basics-5", title: "커밋 메시지 컨벤션", type: "subtopic" },
        ],
      },
      {
        id: "git-branch",
        title: "브랜치와 병합",
        type: "milestone",
        description: "브랜치를 활용한 독립적인 개발과 병합 전략을 학습합니다.",
        children: [
          {
            id: "git-branch-1",
            title: "git branch / git switch",
            type: "subtopic",
          },
          {
            id: "git-branch-2",
            title: "git merge (Fast-forward / 3-way)",
            type: "subtopic",
          },
          { id: "git-branch-3", title: "git rebase", type: "subtopic" },
          {
            id: "git-branch-4",
            title: "충돌 해결 (Conflict Resolution)",
            type: "subtopic",
          },
          { id: "git-branch-5", title: "cherry-pick", type: "subtopic" },
        ],
      },
      {
        id: "git-remote",
        title: "원격 저장소",
        type: "milestone",
        description: "GitHub, GitLab 등 원격 저장소와 연동하여 협업합니다.",
        children: [
          {
            id: "git-remote-1",
            title: "git remote / git push / git pull",
            type: "subtopic",
          },
          {
            id: "git-remote-2",
            title: "git fetch vs git pull",
            type: "subtopic",
          },
          {
            id: "git-remote-3",
            title: "Fork와 Upstream 관리",
            type: "subtopic",
          },
          {
            id: "git-remote-4",
            title: "SSH 키 / HTTPS 인증",
            type: "subtopic",
          },
        ],
      },
      {
        id: "git-workflow",
        title: "협업 워크플로우",
        type: "milestone",
        description:
          "팀에서 효율적으로 협업하기 위한 Git 워크플로우를 학습합니다.",
        children: [
          {
            id: "git-workflow-1",
            title: "Pull Request / Merge Request",
            type: "subtopic",
          },
          {
            id: "git-workflow-2",
            title: "코드 리뷰 프로세스",
            type: "subtopic",
          },
          { id: "git-workflow-3", title: "Git Flow 전략", type: "subtopic" },
          {
            id: "git-workflow-4",
            title: "GitHub Flow / Trunk-based",
            type: "subtopic",
          },
        ],
      },
      {
        id: "git-advanced",
        title: "고급 명령어",
        type: "topic",
        description: "실무에서 자주 사용하는 고급 Git 기능을 학습합니다.",
        children: [
          { id: "git-advanced-1", title: "git stash", type: "subtopic" },
          {
            id: "git-advanced-2",
            title: "git rebase -i (인터랙티브 리베이스)",
            type: "subtopic",
          },
          {
            id: "git-advanced-3",
            title: "git reflog (커밋 복구)",
            type: "subtopic",
          },
          {
            id: "git-advanced-4",
            title: "git bisect (버그 추적)",
            type: "subtopic",
          },
          {
            id: "git-advanced-5",
            title: "git tag (릴리스 태깅)",
            type: "subtopic",
          },
        ],
      },
      {
        id: "git-essential",
        title: "필수 명령어 모음",
        type: "milestone",
        description:
          "개발자가 반드시 알아야 하는 Git 핵심 명령어를 정리합니다.",
        children: [
          {
            id: "git-essential-1",
            title: "git reset / git revert",
            type: "subtopic",
          },
          {
            id: "git-essential-2",
            title: "git log --oneline --graph",
            type: "subtopic",
          },
          {
            id: "git-essential-3",
            title: "git blame / git show",
            type: "subtopic",
          },
          {
            id: "git-essential-4",
            title: "git clean / git rm",
            type: "subtopic",
          },
          { id: "git-essential-5", title: "git config 설정", type: "subtopic" },
        ],
      },
      {
        id: "git-hosting",
        title: "Git 호스팅 플랫폼",
        type: "topic",
        description:
          "GitHub, GitLab 등 주요 호스팅 플랫폼의 기능을 활용합니다.",
        children: [
          {
            id: "git-hosting-1",
            title: "GitHub Actions (CI/CD)",
            type: "subtopic",
          },
          {
            id: "git-hosting-2",
            title: "GitHub Issues / Projects",
            type: "subtopic",
          },
          { id: "git-hosting-3", title: "GitLab CI/CD", type: "subtopic" },
          { id: "git-hosting-4", title: "GitHub Pages 배포", type: "subtopic" },
        ],
      },
    ],
  },
};

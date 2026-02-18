import { StudyCategory } from "@/types";

export interface LearningTopic {
  title: string;
  description: string;
  concepts: string[];
}

export interface CategoryContent {
  intro: string;
  topics: LearningTopic[];
}

export const LEARNING_CONTENT: Record<StudyCategory, CategoryContent> = {
  frontend: {
    intro:
      "사용자가 직접 보고 상호작용하는 웹 인터페이스를 구축하는 기술을 학습합니다.",
    topics: [
      {
        title: "HTML 기초",
        description:
          "웹 페이지의 구조를 정의하는 마크업 언어입니다. 시멘틱 태그를 활용하면 접근성과 SEO를 향상시킬 수 있습니다.",
        concepts: [
          "시멘틱 태그 (header, nav, main, section, article, footer)",
          "폼 요소 (input, select, textarea, button)",
          "미디어 요소 (img, video, audio, canvas)",
          "접근성 (ARIA 속성, alt 텍스트, tabindex)",
          "메타 태그와 SEO 최적화",
        ],
      },
      {
        title: "CSS 기초",
        description:
          "웹 페이지의 스타일과 레이아웃을 제어합니다. 반응형 디자인은 다양한 디바이스에서 일관된 사용자 경험을 제공합니다.",
        concepts: [
          "박스 모델 (margin, border, padding, content)",
          "Flexbox 레이아웃 (justify-content, align-items, flex-wrap)",
          "Grid 레이아웃 (grid-template, gap, fr 단위)",
          "반응형 디자인 (media query, vw/vh, clamp)",
          "CSS 변수와 커스텀 속성",
          "애니메이션 (transition, @keyframes, transform)",
        ],
      },
      {
        title: "JavaScript 기초",
        description:
          "웹 페이지에 동적인 기능을 추가하는 프로그래밍 언어입니다. ES6+ 문법은 현대 웹 개발의 기본입니다.",
        concepts: [
          "변수와 타입 (let, const, 원시 타입, 참조 타입)",
          "함수 (화살표 함수, 클로저, 고차 함수)",
          "비동기 처리 (Promise, async/await, fetch API)",
          "DOM 조작 (querySelector, addEventListener, createElement)",
          "ES6+ 문법 (구조 분해, 스프레드, 옵셔널 체이닝)",
          "모듈 시스템 (import/export, 동적 임포트)",
        ],
      },
      {
        title: "React 기초",
        description:
          "컴포넌트 기반으로 UI를 구축하는 라이브러리입니다. 선언적 프로그래밍 방식으로 복잡한 인터페이스를 효율적으로 관리합니다.",
        concepts: [
          "JSX 문법과 컴포넌트 구조",
          "Props와 State 관리",
          "React Hooks (useState, useEffect, useMemo, useCallback)",
          "이벤트 처리와 조건부 렌더링",
          "리스트 렌더링과 Key",
          "Context API와 전역 상태 관리",
        ],
      },
      {
        title: "TypeScript",
        description:
          "JavaScript에 정적 타입을 추가한 언어입니다. 개발 단계에서 오류를 미리 잡아 안정적인 코드를 작성할 수 있습니다.",
        concepts: [
          "기본 타입 (string, number, boolean, array, tuple)",
          "인터페이스와 타입 별칭",
          "제네릭 (Generic)",
          "유니온 타입과 교차 타입",
          "타입 가드와 타입 좁히기",
          "유틸리티 타입 (Partial, Required, Pick, Omit)",
        ],
      },
    ],
  },
  backend: {
    intro:
      "서버 사이드 로직, API 설계, 데이터베이스 연동 등 서비스의 핵심 기능을 구현하는 기술을 학습합니다.",
    topics: [
      {
        title: "Node.js 기초",
        description:
          "JavaScript 런타임 환경으로, 서버 사이드 애플리케이션을 구축할 수 있습니다. 이벤트 루프 기반의 비동기 I/O가 특징입니다.",
        concepts: [
          "Node.js 아키텍처 (이벤트 루프, 싱글 스레드)",
          "모듈 시스템 (CommonJS, ES Modules)",
          "파일 시스템 (fs 모듈, 스트림)",
          "npm과 패키지 관리",
          "환경 변수와 설정 관리",
          "Express.js / Fastify 프레임워크",
        ],
      },
      {
        title: "REST API 설계",
        description:
          "HTTP 프로토콜을 기반으로 리소스를 관리하는 API 설계 원칙입니다. 일관된 엔드포인트 설계가 중요합니다.",
        concepts: [
          "HTTP 메서드 (GET, POST, PUT, PATCH, DELETE)",
          "상태 코드 (2xx, 3xx, 4xx, 5xx)",
          "RESTful 리소스 설계 원칙",
          "요청/응답 형식 (JSON, 페이지네이션)",
          "API 버저닝 전략",
          "OpenAPI(Swagger) 문서화",
        ],
      },
      {
        title: "데이터베이스",
        description:
          "데이터를 효율적으로 저장, 조회, 관리하는 시스템입니다. 서비스 요구사항에 따라 적절한 DB를 선택해야 합니다.",
        concepts: [
          "관계형 DB (MySQL, PostgreSQL) - 테이블, JOIN, 인덱스",
          "NoSQL (MongoDB, Firebase) - 문서, 컬렉션",
          "SQL 기본 문법 (SELECT, INSERT, UPDATE, DELETE)",
          "ORM (Prisma, TypeORM, Sequelize)",
          "트랜잭션과 ACID 속성",
          "인덱싱과 쿼리 최적화",
        ],
      },
      {
        title: "인증과 보안",
        description:
          "사용자 인증과 데이터 보안은 서비스의 신뢰성을 보장하는 핵심 요소입니다.",
        concepts: [
          "세션 기반 인증 vs 토큰 기반 인증",
          "JWT (JSON Web Token) 구조와 활용",
          "OAuth 2.0과 소셜 로그인",
          "비밀번호 해싱 (bcrypt, argon2)",
          "CORS 정책 설정",
          "SQL Injection, XSS 방어",
        ],
      },
    ],
  },
  server: {
    intro:
      "애플리케이션을 안정적으로 배포하고 운영하기 위한 서버 인프라 기술을 학습합니다.",
    topics: [
      {
        title: "Linux 기초",
        description:
          "대부분의 서버는 Linux 기반으로 운영됩니다. 기본 명령어와 시스템 관리를 익혀야 합니다.",
        concepts: [
          "파일 시스템 구조 (/, /etc, /var, /home)",
          "기본 명령어 (ls, cd, cp, mv, rm, chmod, chown)",
          "프로세스 관리 (ps, top, kill, systemctl)",
          "패키지 관리 (apt, yum, brew)",
          "쉘 스크립트 기초 (bash, 변수, 조건문, 반복문)",
          "SSH 접속과 키 관리",
        ],
      },
      {
        title: "Docker",
        description:
          "애플리케이션을 컨테이너로 패키징하여 어디서든 동일한 환경으로 실행할 수 있게 합니다.",
        concepts: [
          "컨테이너 vs 가상머신 차이점",
          "Dockerfile 작성 (FROM, RUN, COPY, CMD)",
          "이미지 빌드와 레지스트리 (Docker Hub)",
          "Docker Compose (다중 컨테이너 관리)",
          "볼륨과 네트워크 설정",
          "멀티스테이지 빌드 최적화",
        ],
      },
      {
        title: "CI/CD",
        description:
          "코드 변경 사항을 자동으로 테스트하고 배포하는 파이프라인을 구축합니다.",
        concepts: [
          "CI(지속적 통합)의 개념과 이점",
          "CD(지속적 배포)의 개념과 전략",
          "GitHub Actions 워크플로우 작성",
          "테스트 자동화 (유닛, 통합, E2E)",
          "환경 분리 (개발, 스테이징, 프로덕션)",
          "롤백 전략과 블루-그린 배포",
        ],
      },
      {
        title: "클라우드 서비스",
        description:
          "AWS, GCP 등 클라우드 플랫폼을 활용하여 확장 가능한 인프라를 구축합니다.",
        concepts: [
          "IaaS / PaaS / SaaS 차이점",
          "AWS 주요 서비스 (EC2, S3, RDS, Lambda)",
          "GCP 주요 서비스 (Compute Engine, Cloud Run, Firebase)",
          "서버리스 아키텍처 (Lambda, Cloud Functions)",
          "로드 밸런싱과 오토 스케일링",
          "모니터링과 로깅 (CloudWatch, Stackdriver)",
        ],
      },
    ],
  },
  network: {
    intro:
      "웹 서비스의 기반이 되는 네트워크 프로토콜과 통신 원리를 학습합니다.",
    topics: [
      {
        title: "HTTP 프로토콜",
        description:
          "웹 통신의 기본 프로토콜입니다. 요청과 응답의 구조를 이해하면 효율적인 웹 서비스를 설계할 수 있습니다.",
        concepts: [
          "HTTP/1.1 vs HTTP/2 vs HTTP/3 차이점",
          "요청 구조 (메서드, URL, 헤더, 바디)",
          "응답 구조 (상태 코드, 헤더, 바디)",
          "캐싱 (Cache-Control, ETag, Last-Modified)",
          "쿠키와 세션의 동작 원리",
          "CORS (Cross-Origin Resource Sharing)",
        ],
      },
      {
        title: "TCP/IP",
        description:
          "인터넷 통신의 기본 프로토콜 스택입니다. 데이터가 네트워크를 통해 전달되는 원리를 이해합니다.",
        concepts: [
          "OSI 7계층 모델과 TCP/IP 4계층 모델",
          "TCP 3-way Handshake (SYN, SYN-ACK, ACK)",
          "TCP vs UDP 차이점과 사용 사례",
          "IP 주소 체계 (IPv4, IPv6, 서브넷)",
          "포트 번호와 소켓 통신",
          "패킷의 구조와 라우팅",
        ],
      },
      {
        title: "DNS",
        description:
          "도메인 이름을 IP 주소로 변환하는 시스템입니다. 웹 서비스 운영에 필수적인 지식입니다.",
        concepts: [
          "DNS 조회 과정 (재귀적/반복적 쿼리)",
          "레코드 타입 (A, AAAA, CNAME, MX, TXT, NS)",
          "도메인 등록과 네임서버 설정",
          "DNS 캐싱과 TTL",
          "CDN과 DNS의 관계",
          "DNS 보안 (DNSSEC)",
        ],
      },
      {
        title: "네트워크 보안",
        description:
          "안전한 통신을 위한 보안 기술입니다. HTTPS와 TLS는 현대 웹의 필수 요소입니다.",
        concepts: [
          "HTTPS와 SSL/TLS 동작 원리",
          "대칭키 vs 비대칭키 암호화",
          "인증서 (CA, Let's Encrypt, 자체 서명)",
          "방화벽과 보안 그룹 설정",
          "VPN의 개념과 종류",
          "일반적인 네트워크 공격 (DDoS, MITM, DNS Spoofing)",
        ],
      },
    ],
  },
  git: {
    intro:
      "Git은 소스 코드의 변경 이력을 추적하고 팀 협업을 가능하게 하는 분산 버전 관리 시스템입니다. 현대 개발 워크플로우의 핵심 도구입니다.",
    topics: [
      {
        title: "Git 기초",
        description:
          "Git의 기본 개념과 필수 명령어를 익힙니다. 로컬 저장소에서의 기본적인 버전 관리 워크플로우를 이해합니다.",
        concepts: [
          "저장소 초기화 (git init) 와 클론 (git clone)",
          "스테이징과 커밋 (git add, git commit)",
          "상태 확인 (git status, git log, git diff)",
          "파일 되돌리기 (git checkout, git restore, git reset)",
          ".gitignore 파일 설정",
          "커밋 메시지 작성 규칙 (Conventional Commits)",
        ],
      },
      {
        title: "브랜치와 병합",
        description:
          "브랜치를 활용한 독립적인 개발과 병합 전략을 학습합니다. 효율적인 팀 협업의 기반이 됩니다.",
        concepts: [
          "브랜치 생성과 전환 (git branch, git switch/checkout)",
          "병합 (git merge) - Fast-forward vs 3-way merge",
          "리베이스 (git rebase) - 깨끗한 히스토리 유지",
          "충돌 해결 (Conflict Resolution) 방법",
          "브랜치 전략 (Git Flow, GitHub Flow, Trunk-based)",
          "cherry-pick - 특정 커밋만 가져오기",
        ],
      },
      {
        title: "원격 저장소",
        description:
          "GitHub, GitLab 등 원격 저장소와 연동하여 협업하는 방법을 학습합니다.",
        concepts: [
          "원격 저장소 연결 (git remote add/remove)",
          "push와 pull (git push, git pull, git fetch)",
          "Pull Request(PR) / Merge Request(MR) 워크플로우",
          "코드 리뷰 프로세스와 모범 사례",
          "Fork와 Upstream 관리",
          "SSH 키와 HTTPS 인증 설정",
        ],
      },
      {
        title: "고급 Git 명령어",
        description:
          "실무에서 자주 사용하는 고급 Git 기능을 학습합니다. 문제 상황에서의 대처 능력을 기릅니다.",
        concepts: [
          "git stash - 작업 중인 변경사항 임시 저장",
          "git rebase -i - 인터랙티브 리베이스로 커밋 정리",
          "git reflog - 삭제된 커밋 복구",
          "git bisect - 이진 탐색으로 버그 커밋 찾기",
          "git tag - 릴리스 버전 태깅",
          "git submodule / subtree - 하위 프로젝트 관리",
        ],
      },
    ],
  },
};

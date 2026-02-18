"use client";

import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import { CATEGORIES } from "@/types";
import { LEARNING_CONTENT } from "@/lib/content";

const FEATURES = [
  {
    title: "학습 로드맵",
    description:
      "프론트엔드, 백엔드, 서버, 네트워크 분야별 단계적 학습 경로를 제공합니다.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
  },
  {
    title: "기초 학습 자료",
    description: "각 분야의 핵심 개념과 이론을 체계적으로 정리하여 제공합니다.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    title: "노트 & 북마크",
    description:
      "학습 중 중요한 내용을 노트로 정리하고 유용한 링크를 저장하세요.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    title: "퀴즈 & 복습",
    description:
      "직접 만든 퀴즈로 학습 내용을 테스트하고 반복 복습할 수 있습니다.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  {
    title: "스터디 플래너",
    description: "오늘의 학습 목표를 설정하고 진행 상황을 한눈에 확인하세요.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "테마 커스터마이징",
    description:
      "5가지 색상 테마와 4가지 폰트로 나만의 학습 환경을 만들어보세요.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

const CATEGORY_DESC: Record<string, string> = {
  frontend: "HTML, CSS, JavaScript, React 등 UI 개발",
  backend: "Node.js, API, 데이터베이스, 인증/보안",
  server: "Linux, Docker, CI/CD, 클라우드",
  network: "HTTP, TCP/IP, DNS, 네트워크 보안",
};

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--heroui-primary)) 0%, hsl(var(--heroui-primary-700)) 100%)",
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Dev Study Hub에
              <br />
              오신 것을 환영합니다!
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              개발자를 위한 올인원 학습 플랫폼입니다. 로드맵을 따라 체계적으로
              학습하고, 노트와 퀴즈로 복습하세요.
            </p>
            <div className="flex gap-4">
              <Button
                as={Link}
                href="/signup"
                size="lg"
                radius="lg"
                className="flex items-center justify-center bg-white text-primary font-bold px-8 hover:bg-white/90"
              >
                시작하기
              </Button>
              <Button
                as={Link}
                href="/login"
                size="lg"
                radius="lg"
                className="flex items-center justify-center bg-white/20 backdrop-blur-sm text-primary-foreground font-semibold px-8 hover:bg-white/30"
              >
                로그인
              </Button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-20 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </section>

      {/* About */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-default-400">
            About
          </h2>
          <p className="text-xl font-bold sm:text-2xl">Dev Study Hub이란?</p>
          <p className="mt-4 text-sm leading-relaxed text-default-500">
            개발 공부를 시작하면 어디서부터, 어떤 순서로 배워야 할지 막막할 때가
            많습니다. Dev Study Hub은 프론트엔드, 백엔드, 서버, 네트워크 4가지
            핵심 분야의 학습 로드맵과 기초 자료를 제공하고, 노트 정리, 북마크
            저장, 퀴즈 복습 기능으로 효율적인 학습을 도와주는 웹
            애플리케이션입니다.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "4", label: "학습 카테고리" },
            { value: "38+", label: "로드맵 단계" },
            { value: "5", label: "테마 색상" },
            { value: "4", label: "폰트 선택" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-divider p-5"
            >
              <span className="text-2xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-default-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-default-400">
          Features
        </h2>
        <p className="mb-10 text-center text-xl font-bold sm:text-2xl">
          학습에 필요한 모든 도구
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-2xl border border-divider"
            >
              <CardBody className="gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-default-500">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-default-400">
          Categories
        </h2>
        <p className="mb-10 text-center text-xl font-bold sm:text-2xl">
          4가지 학습 카테고리
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.key}
              className="h-full rounded-2xl border border-divider"
            >
              <CardBody className="gap-2 p-6">
                <h3 className="text-lg font-bold">{cat.label}</h3>
                <p className="text-sm text-default-500">
                  {CATEGORY_DESC[cat.key]}
                </p>
                <p className="mt-auto pt-2 text-xs text-default-400">
                  {LEARNING_CONTENT[cat.key].topics.length}개 토픽 &middot;
                  로그인 후 이용 가능
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="flex flex-col items-center rounded-2xl px-6 py-14 text-center text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--heroui-primary)) 0%, hsl(var(--heroui-primary-700)) 100%)",
          }}
        >
          <h2 className="text-xl font-bold sm:text-2xl">
            지금 바로 학습을 시작하세요
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            회원가입 후 학습 진행 상황을 저장하고, 나만의 노트와 퀴즈로 체계적인
            학습을 시작해보세요.
          </p>
          <Button
            as={Link}
            href="/signup"
            size="lg"
            radius="lg"
            className="mt-8 flex items-center justify-center bg-white text-primary font-bold px-10 hover:bg-white/90"
          >
            무료로 시작하기
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-divider mt-4">
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-default-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white"
                >
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </div>
              <span className="text-sm font-bold text-default-500">
                Dev Study Hub
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-default-400 hover:text-primary hover:underline"
              >
                개인정보 처리방침
              </Link>
              <Link
                href="/terms"
                className="text-xs text-default-400 hover:text-primary hover:underline"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

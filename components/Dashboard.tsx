"use client";

import type { User } from "firebase/auth";
import Link from "next/link";
import { TodoList } from "@/components/TodoList";
import { CategoryCard } from "@/components/CategoryCard";
import { StudyStats } from "@/components/StudyStats";
import { CATEGORIES, type StudyCategory } from "@/types";
import { LEARNING_CONTENT } from "@/lib/content";

const CATEGORY_DESC: Record<StudyCategory, string> = {
  frontend: "HTML, CSS, JavaScript, React 등 UI 개발",
  backend: "Node.js, API, 데이터베이스, 인증/보안",
  server: "Linux, Docker, CI/CD, 클라우드",
  network: "HTTP, TCP/IP, DNS, 네트워크 보안",
  git: "버전 관리, 브랜치, 협업, 필수 명령어",
};

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <section className="mb-12">
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--heroui-primary)) 0%, hsl(var(--heroui-primary-700)) 100%)",
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {user.displayName}님, 환영합니다!
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              학습 계획을 체계적으로 관리하고 성장을 기록해보세요.
              <br className="hidden sm:block" />
              오늘의 학습 목표를 확인하고 시작하세요.
            </p>
            <div className="flex gap-4">
              <Link
                href="/category/frontend"
                className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                학습 시작
              </Link>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute right-20 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            학습 카테고리
          </h2>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-between gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.key}
              label={cat.label}
              slug={cat.key}
              description={CATEGORY_DESC[cat.key]}
              count={LEARNING_CONTENT[cat.key].topics.length}
            />
          ))}
        </div>
      </section>

      {/* Planner + Stats */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <TodoList />
        </div>
        <div className="lg:col-span-7">
          <StudyStats />
        </div>
      </div>
    </div>
  );
}

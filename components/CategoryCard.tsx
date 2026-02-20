"use client";

import { Card, CardBody, Progress } from "@heroui/react";
import Link from "next/link";
import type { StudyCategory } from "@/types";
import { useStudy } from "@/lib/study";
import { ROADMAPS } from "@/lib/roadmap";

interface CategoryCardProps {
  label: string;
  slug: StudyCategory;
  description: string;
  count?: number;
}

const CATEGORY_STYLES: Record<
  StudyCategory,
  {
    iconBg: string;
    iconText: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  frontend: {
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconText: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500/50",
    hoverShadow: "hover:shadow-xl hover:shadow-blue-500/10",
  },
  backend: {
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconText: "text-purple-600 dark:text-purple-400",
    hoverBorder: "hover:border-purple-500/50",
    hoverShadow: "hover:shadow-xl hover:shadow-purple-500/10",
  },
  server: {
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconText: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
    hoverShadow: "hover:shadow-xl hover:shadow-emerald-500/10",
  },
  network: {
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconText: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/50",
    hoverShadow: "hover:shadow-xl hover:shadow-amber-500/10",
  },
  git: {
    iconBg: "bg-rose-100 dark:bg-rose-900/30",
    iconText: "text-rose-600 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500/50",
    hoverShadow: "hover:shadow-xl hover:shadow-rose-500/10",
  },
};

const CATEGORY_ICONS: Record<StudyCategory, React.ReactNode> = {
  frontend: (
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
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  backend: (
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  server: (
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
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  network: (
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
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
      <circle cx="5" cy="12" r="1" />
      <line x1="12" y1="7" x2="12" y2="10" />
      <line x1="14" y1="12" x2="18" y2="12" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="10" y1="12" x2="6" y2="12" />
    </svg>
  ),
  git: (
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
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 012 2v7" />
      <path d="M6 9v12" />
    </svg>
  ),
};

const CATEGORY_COLORS: Record<
  StudyCategory,
  "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  frontend: "primary",
  backend: "secondary",
  server: "success",
  network: "warning",
  git: "danger",
};

export function CategoryCard({
  label,
  slug,
  description,
  count = 0,
}: CategoryCardProps) {
  const style = CATEGORY_STYLES[slug];
  const { studyLogs } = useStudy();

  const totalSubtopics =
    ROADMAPS[slug]?.nodes.reduce(
      (sum, node) => sum + (node.children?.length ?? 0),
      0,
    ) ?? 0;
  const completedSubtopics = studyLogs.filter(
    (l) => l.category === slug,
  ).length;
  const progressPct =
    totalSubtopics > 0
      ? Math.round((completedSubtopics / totalSubtopics) * 100)
      : 0;

  return (
    <Link href={`/category/${slug}`} className="group block h-full w-full">
      <Card
        isPressable
        className={`w-full h-full rounded-2xl border border-divider transition-all duration-200 ${style.hoverBorder} ${style.hoverShadow} hover:-translate-y-1`}
      >
        <CardBody className="gap-3 p-6">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBg} ${style.iconText} transition-transform group-hover:scale-110`}
          >
            {CATEGORY_ICONS[slug]}
          </div>
          <h3 className="text-lg font-bold">{label}</h3>
          <p className="text-sm text-default-500">{description}</p>
          {totalSubtopics > 0 && (
            <div className="mt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-default-400">
                  {completedSubtopics}/{totalSubtopics}
                </span>
                <span className="text-[10px] font-medium text-default-500">
                  {progressPct}%
                </span>
              </div>
              <Progress
                size="sm"
                radius="full"
                value={progressPct}
                color={CATEGORY_COLORS[slug]}
                className="h-1.5"
              />
            </div>
          )}
          {count > 0 && totalSubtopics === 0 && (
            <p className="text-xs text-default-400">{count}개 학습 항목</p>
          )}
        </CardBody>
      </Card>
    </Link>
  );
}

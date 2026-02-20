"use client";

import { useState, useMemo } from "react";
import { Card, CardBody, Button, Chip, Progress } from "@heroui/react";
import { useStudy } from "@/lib/study";
import { ROADMAPS } from "@/lib/roadmap";
import { CATEGORIES } from "@/types";

type PeriodType = "daily" | "monthly";

const WEEK_DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

function getMonday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
}

function formatWeekRange(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const sm = monday.getMonth() + 1;
  const sd = monday.getDate();
  const em = sunday.getMonth() + 1;
  const ed = sunday.getDate();
  return `${monday.getFullYear()}. ${sm}.${sd} – ${em}.${ed}`;
}

function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}

function countSubtopics(category: string): number {
  const roadmap = ROADMAPS[category];
  if (!roadmap) return 0;
  let count = 0;
  for (const node of roadmap.nodes) {
    count += node.children?.length ?? 0;
  }
  return count;
}

function calculateStreak(dates: string[]): {
  current: number;
  longest: number;
} {
  if (dates.length === 0) return { current: 0, longest: 0 };

  const uniqueDays = [...new Set(dates.map((d) => toDateKey(d)))].sort();
  if (uniqueDays.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let currentRun = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      currentRun++;
      longest = Math.max(longest, currentRun);
    } else {
      currentRun = 1;
    }
  }

  const today = toDateKey(new Date().toISOString());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday.toISOString());
  const lastDay = uniqueDays[uniqueDays.length - 1];

  let current = 0;
  if (lastDay === today || lastDay === yesterdayKey) {
    current = 1;
    for (let i = uniqueDays.length - 2; i >= 0; i--) {
      const prev = new Date(uniqueDays[i]);
      const curr = new Date(uniqueDays[i + 1]);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) current++;
      else break;
    }
  }

  return { current, longest: Math.max(longest, current) };
}

function DiffBadge({ diff }: { diff: number }) {
  if (diff === 0) return null;
  return (
    <span
      className={`text-[10px] font-medium ${diff > 0 ? "text-success" : "text-danger"}`}
    >
      {diff > 0 ? "+" : ""}
      {diff}
    </span>
  );
}

export function StudyStats() {
  const { studyLogs, studyNotes, todos } = useStudy();
  const [period, setPeriod] = useState<PeriodType>("daily");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentMonday = useMemo(() => {
    const monday = getMonday(new Date());
    monday.setDate(monday.getDate() + weekOffset * 7);
    return monday;
  }, [weekOffset]);

  const activityMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const log of studyLogs) {
      const key = toDateKey(log.completedAt);
      map[key] = (map[key] || 0) + 1;
    }
    for (const note of studyNotes) {
      const key = toDateKey(note.createdAt);
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  }, [studyLogs, studyNotes]);

  const dailyData = useMemo(() => {
    return WEEK_DAYS.map((day, idx) => {
      const date = new Date(currentMonday);
      date.setDate(currentMonday.getDate() + idx);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const key = `${y}-${m}-${d}`;
      return {
        label: day,
        sublabel: `${date.getMonth() + 1}/${date.getDate()}`,
        completed: activityMap[key] || 0,
      };
    });
  }, [currentMonday, activityMap]);

  const monthlyData = useMemo(() => {
    const monthMap: Record<string, number> = {};
    for (const [dateKey, count] of Object.entries(activityMap)) {
      const mk = dateKey.slice(0, 7);
      monthMap[mk] = (monthMap[mk] || 0) + count;
    }
    return MONTHS.map((month, idx) => {
      const key = `${selectedYear}-${String(idx + 1).padStart(2, "0")}`;
      return { label: month, sublabel: "", completed: monthMap[key] || 0 };
    });
  }, [selectedYear, activityMap]);

  const categoryProgress = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const total = countSubtopics(cat.key);
      const completed = studyLogs.filter((l) => l.category === cat.key).length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { ...cat, total, completed, pct };
    });
  }, [studyLogs]);

  const streak = useMemo(
    () => calculateStreak(studyLogs.map((l) => l.completedAt)),
    [studyLogs],
  );

  const weeklySummary = useMemo(() => {
    const thisMonday = getMonday(new Date());
    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(lastMonday.getDate() - 7);

    const inWeek = (iso: string, monday: Date) => {
      const d = new Date(iso);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 7);
      return d >= monday && d < sunday;
    };

    const thisLogs = studyLogs.filter((l) =>
      inWeek(l.completedAt, thisMonday),
    ).length;
    const lastLogs = studyLogs.filter((l) =>
      inWeek(l.completedAt, lastMonday),
    ).length;

    const thisNotes = studyNotes.filter((n) =>
      inWeek(n.createdAt, thisMonday),
    ).length;
    const lastNotes = studyNotes.filter((n) =>
      inWeek(n.createdAt, lastMonday),
    ).length;

    const thisTodos = todos.filter(
      (t) => t.completed && t.createdAt && inWeek(t.createdAt, thisMonday),
    ).length;
    const lastTodos = todos.filter(
      (t) => t.completed && t.createdAt && inWeek(t.createdAt, lastMonday),
    ).length;

    return {
      logs: { current: thisLogs, diff: thisLogs - lastLogs },
      notes: { current: thisNotes, diff: thisNotes - lastNotes },
      todos: { current: thisTodos, diff: thisTodos - lastTodos },
    };
  }, [studyLogs, studyNotes, todos]);

  const chartData = period === "daily" ? dailyData : monthlyData;
  const maxVal = Math.max(...chartData.map((d) => d.completed), 1);
  const totalInPeriod = chartData.reduce((sum, d) => sum + d.completed, 0);

  const todayKey = toDateKey(new Date().toISOString());
  const completedToday = activityMap[todayKey] || 0;
  const totalStudyLogs = studyLogs.length;
  const completedTodos = todos.filter((t) => t.completed).length;

  const periodLabel =
    period === "daily" ? formatWeekRange(currentMonday) : `${selectedYear}년`;

  const handlePrev = () => {
    if (period === "daily") setWeekOffset((p) => p - 1);
    else setSelectedYear((p) => p - 1);
  };

  const handleNext = () => {
    if (period === "daily") setWeekOffset((p) => p + 1);
    else setSelectedYear((p) => p + 1);
  };

  const handleToday = () => {
    if (period === "daily") setWeekOffset(0);
    else setSelectedYear(new Date().getFullYear());
  };

  const isCurrentPeriod =
    (period === "daily" && weekOffset === 0) ||
    (period === "monthly" && selectedYear === new Date().getFullYear());

  return (
    <div className="flex flex-col gap-4">
      {/* Streak + Weekly Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="rounded-2xl border border-divider col-span-2 sm:col-span-1">
          <CardBody className="p-4 flex flex-col items-center justify-center">
            <span className="mb-1">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  streak.current > 0
                    ? "hsl(24, 100%, 50%)"
                    : "hsl(var(--heroui-default-300))"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10c0 3-2.5 5-5 7-2.5-2-5-4-5-7a5 5 0 0 1 1.5-3.5C9.5 5.5 11 5 12 2Z" />
              </svg>
            </span>
            <p className="text-2xl font-bold">{streak.current}</p>
            <p className="text-[10px] text-default-500">연속 학습일</p>
            {streak.longest > 0 && (
              <p className="text-[9px] text-default-400 mt-0.5">
                최장 {streak.longest}일
              </p>
            )}
          </CardBody>
        </Card>

        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-4">
            <p className="text-[10px] font-medium text-default-500 mb-1.5">
              이번 주 학습
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-primary">
                {weeklySummary.logs.current}
              </span>
              <DiffBadge diff={weeklySummary.logs.diff} />
            </div>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-4">
            <p className="text-[10px] font-medium text-default-500 mb-1.5">
              이번 주 노트
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-secondary">
                {weeklySummary.notes.current}
              </span>
              <DiffBadge diff={weeklySummary.notes.diff} />
            </div>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-4">
            <p className="text-[10px] font-medium text-default-500 mb-1.5">
              이번 주 할일
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-success">
                {weeklySummary.todos.current}
              </span>
              <DiffBadge diff={weeklySummary.todos.diff} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Category Progress */}
      <Card className="rounded-2xl border border-divider">
        <CardBody className="p-6 gap-4">
          <h2 className="text-base font-bold flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            카테고리별 진행률
          </h2>
          <div className="flex flex-col gap-3">
            {categoryProgress.map((cat) => (
              <div key={cat.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{cat.label}</span>
                  <span className="text-xs text-default-500">
                    {cat.completed}/{cat.total} ({cat.pct}%)
                  </span>
                </div>
                <Progress
                  size="sm"
                  radius="full"
                  value={cat.pct}
                  color={
                    cat.color as
                      | "primary"
                      | "secondary"
                      | "success"
                      | "warning"
                      | "danger"
                  }
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Activity Chart */}
      <Card className="rounded-2xl border border-divider">
        <CardBody className="gap-5 p-6">
          <h2 className="text-base font-bold flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
            학습 현황
          </h2>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-divider bg-default-50 p-4">
              <p className="text-[10px] font-medium text-default-500 mb-1.5">
                오늘 활동
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">
                  {completedToday}
                </span>
                <span className="text-xs text-default-400">건</span>
              </div>
            </div>
            <div className="rounded-2xl border border-divider bg-default-50 p-4">
              <p className="text-[10px] font-medium text-default-500 mb-1.5">
                전체 학습
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{totalStudyLogs}</span>
                <span className="text-xs text-default-400">항목</span>
              </div>
            </div>
            <div className="rounded-2xl border border-divider bg-default-50 p-4">
              <p className="text-[10px] font-medium text-default-500 mb-1.5">
                할일 완료
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-success">
                  {completedTodos}
                </span>
                <span className="text-xs text-default-400">
                  / {todos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Period selector + navigation */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 rounded-xl bg-default-100 p-1">
                {(["daily", "monthly"] as PeriodType[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      period === p
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-default-500 hover:text-default-700"
                    }`}
                  >
                    {p === "daily" ? "일간" : "월간"}
                  </button>
                ))}
              </div>
              {totalInPeriod > 0 && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  radius="lg"
                  className="text-[10px]"
                >
                  {totalInPeriod}건
                </Chip>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                radius="lg"
                onPress={handlePrev}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-default-600">
                  {periodLabel}
                </span>
                {!isCurrentPeriod && (
                  <button
                    onClick={handleToday}
                    className="text-[10px] text-primary font-medium hover:underline"
                  >
                    오늘
                  </button>
                )}
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                radius="lg"
                onPress={handleNext}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Bar chart */}
          <div>
            <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-2 px-1 pt-4 border-b border-l border-divider relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-1">
                <div className="w-full border-t border-default-100" />
                <div className="w-full border-t border-default-100" />
                <div className="w-full border-t border-default-100" />
              </div>
              {chartData.map((d) => {
                const height =
                  d.completed > 0
                    ? Math.max((d.completed / maxVal) * 100, 6)
                    : 2;
                return (
                  <div
                    key={d.label}
                    className="relative flex-1 group flex flex-col items-center"
                  >
                    {d.completed > 0 && (
                      <div className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity bg-default-900 text-white text-[9px] px-1.5 py-0.5 rounded-md whitespace-nowrap pointer-events-none">
                        {d.completed}건
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        d.completed > 0
                          ? "bg-primary/60 group-hover:bg-primary"
                          : "bg-default-200"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between px-1 mt-1.5">
              {chartData.map((d) => (
                <div key={d.label} className="flex-1 text-center">
                  <span className="text-[10px] text-default-500 leading-none">
                    {d.label}
                  </span>
                  {d.sublabel && (
                    <span className="block text-[8px] text-default-400 leading-tight">
                      {d.sublabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

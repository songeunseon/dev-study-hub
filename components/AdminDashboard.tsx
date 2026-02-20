"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Spinner, Chip } from "@heroui/react";
import { getAllUsers, getUserStudyData } from "@/lib/firestore";
import type { UserProfile, StudyCategory } from "@/types";
import { CATEGORIES } from "@/types";

interface PlatformStats {
  totalUsers: number;
  activeToday: number;
  totalStudyLogs: number;
  totalNotes: number;
  categoryStats: Record<StudyCategory, number>;
  recentUsers: UserProfile[];
}

export function AdminDashboard() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const users = await getAllUsers();
      const todayKey = new Date().toISOString().slice(0, 10);

      let totalStudyLogs = 0;
      let totalNotes = 0;
      let activeToday = 0;
      const categoryStats: Record<string, number> = {};
      for (const cat of CATEGORIES) categoryStats[cat.key] = 0;

      for (const user of users) {
        const data = await getUserStudyData(user.uid);
        totalStudyLogs += data.studyLogs.length;
        totalNotes += data.studyNotes.length;

        for (const log of data.studyLogs) {
          categoryStats[log.category] = (categoryStats[log.category] || 0) + 1;
        }

        const hasActivityToday =
          data.studyLogs.some((l) => l.completedAt.startsWith(todayKey)) ||
          data.studyNotes.some((n) => n.createdAt.startsWith(todayKey));
        if (hasActivityToday) activeToday++;
      }

      const recentUsers = [...users]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 5);

      setStats({
        totalUsers: users.length,
        activeToday,
        totalStudyLogs,
        totalNotes,
        categoryStats: categoryStats as Record<StudyCategory, number>,
        recentUsers,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
            관리자 대시보드
          </h1>
          <p className="text-sm text-default-500 mt-1">
            플랫폼 전체 현황을 확인하세요
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-5">
            <p className="text-xs font-medium text-default-500 mb-2">
              전체 유저
            </p>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-5">
            <p className="text-xs font-medium text-default-500 mb-2">
              오늘 활동
            </p>
            <p className="text-3xl font-bold text-primary">
              {stats.activeToday}
            </p>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-5">
            <p className="text-xs font-medium text-default-500 mb-2">
              전체 학습
            </p>
            <p className="text-3xl font-bold text-success">
              {stats.totalStudyLogs}
            </p>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-5">
            <p className="text-xs font-medium text-default-500 mb-2">
              전체 노트
            </p>
            <p className="text-3xl font-bold text-secondary">
              {stats.totalNotes}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Category Stats + Recent Users */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Stats */}
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-6">
            <h2 className="text-lg font-bold mb-4">카테고리별 학습 현황</h2>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => {
                const count = stats.categoryStats[cat.key] || 0;
                const maxCount = Math.max(
                  ...Object.values(stats.categoryStats),
                  1,
                );
                const width = (count / maxCount) * 100;
                return (
                  <div key={cat.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{cat.label}</span>
                      <span className="text-xs text-default-500">
                        {count}건
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-default-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Recent Users */}
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-6">
            <h2 className="text-lg font-bold mb-4">최근 가입 유저</h2>
            <div className="flex flex-col gap-3">
              {stats.recentUsers.map((u) => (
                <div
                  key={u.uid}
                  className="flex items-center justify-between rounded-xl bg-default-50 p-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {u.displayName || "이름 없음"}
                    </p>
                    <p className="text-xs text-default-400 truncate">
                      {u.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={u.role === "admin" ? "primary" : "default"}
                      radius="lg"
                    >
                      {u.role === "admin" ? "관리자" : "유저"}
                    </Chip>
                    <span className="text-[10px] text-default-400">
                      {new Date(u.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
              ))}
              {stats.recentUsers.length === 0 && (
                <p className="text-sm text-default-400 text-center py-4">
                  아직 가입한 유저가 없습니다
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

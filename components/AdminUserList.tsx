"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import { getAllUsers, getUserStudyData } from "@/lib/firestore";
import type { UserProfile, Todo, StudyLog, StudyNote } from "@/types";

interface UserDetail {
  profile: UserProfile;
  todos: Todo[];
  studyLogs: StudyLog[];
  studyNotes: StudyNote[];
}

export function AdminUserList() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const modal = useDisclosure();

  useEffect(() => {
    async function load() {
      const all = await getAllUsers();
      setUsers(all.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      setLoading(false);
    }
    load();
  }, []);

  const handleUserClick = async (profile: UserProfile) => {
    setDetailLoading(true);
    modal.onOpen();
    const data = await getUserStudyData(profile.uid);
    setSelectedUser({ profile, ...data });
    setDetailLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            유저 관리
          </h1>
          <p className="text-sm text-default-500 mt-1">전체 {users.length}명</p>
        </div>
      </div>

      {/* User List */}
      <Card className="rounded-2xl border border-divider">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-divider">
                  <th className="text-left text-xs font-semibold text-default-500 px-6 py-3">
                    유저
                  </th>
                  <th className="text-left text-xs font-semibold text-default-500 px-6 py-3">
                    역할
                  </th>
                  <th className="text-left text-xs font-semibold text-default-500 px-6 py-3">
                    가입일
                  </th>
                  <th className="text-left text-xs font-semibold text-default-500 px-6 py-3">
                    최근 로그인
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.uid}
                    onClick={() => handleUserClick(u)}
                    className="border-b border-divider last:border-0 hover:bg-default-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">
                        {u.displayName || "이름 없음"}
                      </p>
                      <p className="text-xs text-default-400">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={u.role === "admin" ? "primary" : "default"}
                        radius="lg"
                      >
                        {u.role === "admin" ? "관리자" : "유저"}
                      </Chip>
                    </td>
                    <td className="px-6 py-4 text-sm text-default-600">
                      {new Date(u.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-6 py-4 text-sm text-default-600">
                      {new Date(u.lastLoginAt).toLocaleDateString("ko-KR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <p className="text-sm text-default-400 text-center py-8">
              가입한 유저가 없습니다
            </p>
          )}
        </CardBody>
      </Card>

      {/* User Detail Modal */}
      <Modal isOpen={modal.isOpen} onOpenChange={modal.onOpenChange} size="lg">
        <ModalContent className="rounded-2xl">
          {() => (
            <>
              <ModalHeader>
                <span className="text-base font-bold">유저 상세 정보</span>
              </ModalHeader>
              <ModalBody className="pb-6">
                {detailLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" color="primary" />
                  </div>
                ) : selectedUser ? (
                  <div className="flex flex-col gap-5">
                    {/* Profile */}
                    <div className="rounded-xl bg-default-50 p-4">
                      <p className="text-lg font-bold">
                        {selectedUser.profile.displayName || "이름 없음"}
                      </p>
                      <p className="text-sm text-default-500">
                        {selectedUser.profile.email}
                      </p>
                      <div className="flex gap-4 mt-3 text-xs text-default-400">
                        <span>
                          가입:{" "}
                          {new Date(
                            selectedUser.profile.createdAt,
                          ).toLocaleDateString("ko-KR")}
                        </span>
                        <span>
                          최근 로그인:{" "}
                          {new Date(
                            selectedUser.profile.lastLoginAt,
                          ).toLocaleDateString("ko-KR")}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl border border-divider p-4 text-center">
                        <p className="text-2xl font-bold text-primary">
                          {selectedUser.studyLogs.length}
                        </p>
                        <p className="text-xs text-default-500 mt-1">
                          학습 완료
                        </p>
                      </div>
                      <div className="rounded-xl border border-divider p-4 text-center">
                        <p className="text-2xl font-bold text-secondary">
                          {selectedUser.studyNotes.length}
                        </p>
                        <p className="text-xs text-default-500 mt-1">노트</p>
                      </div>
                      <div className="rounded-xl border border-divider p-4 text-center">
                        <p className="text-2xl font-bold text-success">
                          {selectedUser.todos.filter((t) => t.completed).length}
                          /{selectedUser.todos.length}
                        </p>
                        <p className="text-xs text-default-500 mt-1">
                          할일 완료
                        </p>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <p className="text-sm font-semibold mb-2">
                        최근 학습 기록
                      </p>
                      <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                        {selectedUser.studyLogs
                          .sort((a, b) =>
                            b.completedAt.localeCompare(a.completedAt),
                          )
                          .slice(0, 10)
                          .map((log) => (
                            <div
                              key={log.id}
                              className="flex items-center justify-between rounded-lg bg-default-50 px-3 py-2"
                            >
                              <div className="min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {log.subtopicTitle}
                                </p>
                                <p className="text-[10px] text-default-400">
                                  {log.nodeTitle}
                                </p>
                              </div>
                              <Chip
                                size="sm"
                                variant="flat"
                                radius="lg"
                                className="text-[10px] shrink-0"
                              >
                                {new Date(log.completedAt).toLocaleDateString(
                                  "ko-KR",
                                )}
                              </Chip>
                            </div>
                          ))}
                        {selectedUser.studyLogs.length === 0 && (
                          <p className="text-xs text-default-400 text-center py-4">
                            학습 기록이 없습니다
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

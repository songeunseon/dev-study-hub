"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useAuth } from "@/lib/auth";
import { ThemeSelector } from "./ThemeSelector";
import { CATEGORIES } from "@/types";
import type { StudyCategory } from "@/types";

const CATEGORY_ICONS: Record<StudyCategory, React.ReactNode> = {
  frontend: (
    <svg
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, userRole, signOut, deleteAccount } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const deleteModal = useDisclosure();
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isGoogleUser = user?.providerData.some(
    (p) => p.providerId === "google.com",
  );

  const handleDeleteAccount = async () => {
    setDeleteError("");
    setDeleteLoading(true);
    try {
      await deleteAccount(deletePassword || undefined);
      deleteModal.onClose();
      router.push("/");
    } catch {
      setDeleteError("회원탈퇴에 실패했습니다. 비밀번호를 확인해주세요.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Dev Study Hub
          </span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-default-400">
          Menu
        </p>
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors mb-1 ${
            isHome
              ? "bg-primary/10 text-primary"
              : "text-default-600 hover:bg-default-100"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          홈
        </Link>

        <p className="px-3 mt-5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-default-400">
          카테고리
        </p>
        {CATEGORIES.map((cat) => {
          const isActive = pathname === `/category/${cat.key}`;
          if (!user) {
            return (
              <div
                key={cat.key}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-default-300 cursor-not-allowed mb-1"
              >
                {CATEGORY_ICONS[cat.key]}
                {cat.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto opacity-40"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            );
          }
          return (
            <Link
              key={cat.key}
              href={`/category/${cat.key}`}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors mb-1 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-default-600 hover:bg-default-100"
              }`}
            >
              {CATEGORY_ICONS[cat.key]}
              {cat.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-divider px-4 py-4 flex flex-col gap-3">
        <ThemeSelector />
        {user ? (
          <Dropdown placement="top-start">
            <DropdownTrigger>
              <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 hover:bg-default-100 transition-colors">
                <Avatar
                  size="sm"
                  name={user.displayName || user.email || "U"}
                  color="primary"
                />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.displayName}
                  </p>
                  <p className="text-[10px] text-default-400 truncate">
                    {user.email}
                  </p>
                </div>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="사용자 메뉴">
              {userRole === "admin" ? (
                <DropdownItem
                  key="admin"
                  onPress={() => {
                    setMobileOpen(false);
                    router.push("/admin");
                  }}
                  startContent={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                    </svg>
                  }
                >
                  관리자 모드
                </DropdownItem>
              ) : null}
              <DropdownItem
                key="delete-account"
                className="text-danger"
                color="danger"
                onPress={deleteModal.onOpen}
              >
                회원탈퇴
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={signOut}>
                로그아웃
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              size="sm"
              radius="lg"
              fullWidth
              className="flex items-center justify-center border-divider"
              onClick={() => setMobileOpen(false)}
            >
              로그인
            </Button>
            <Button
              as={Link}
              href="/signup"
              color="primary"
              size="sm"
              radius="lg"
              fullWidth
              className="flex items-center justify-center font-semibold shadow-lg shadow-primary/20"
              onClick={() => setMobileOpen(false)}
            >
              회원가입
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-content1 border border-divider shadow-md lg:hidden"
        aria-label="메뉴 열기"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-divider bg-content1 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-content1 shadow-2xl animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-default-100"
              aria-label="메뉴 닫기"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
      >
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-base font-bold text-danger">
                  회원탈퇴
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl bg-danger/10 p-4">
                    <p className="text-sm text-danger font-medium mb-1">주의</p>
                    <p className="text-xs text-danger/80 leading-relaxed">
                      탈퇴 시 모든 데이터(노트, 북마크, 퀴즈, 학습 기록)가
                      영구적으로 삭제되며 복구할 수 없습니다.
                    </p>
                  </div>
                  {!isGoogleUser && (
                    <Input
                      label="비밀번호 확인"
                      type="password"
                      value={deletePassword}
                      onValueChange={setDeletePassword}
                      variant="flat"
                      radius="lg"
                      size="lg"
                      isRequired
                    />
                  )}
                  {isGoogleUser && (
                    <p className="text-xs text-default-500">
                      Google 계정으로 로그인하셨습니다. 탈퇴를 진행하면 Google
                      재인증 팝업이 표시됩니다.
                    </p>
                  )}
                  {deleteError && (
                    <p className="text-xs text-danger">{deleteError}</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" size="sm" radius="lg" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  radius="lg"
                  isLoading={deleteLoading}
                  onPress={handleDeleteAccount}
                >
                  탈퇴하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";

import { Button, Card, CardBody, Input } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch {
      setError("이메일을 찾을 수 없습니다. 올바른 이메일을 입력해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">비밀번호 찾기</h1>
          <p className="mt-2 text-sm text-default-500">
            가입한 이메일로 재설정 링크를 보내드립니다
          </p>
        </div>

        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-6">
            {success ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-success"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">이메일을 확인해주세요</p>
                  <p className="mt-1 text-xs text-default-500">
                    <span className="font-medium text-primary">{email}</span>
                    으로 비밀번호 재설정 링크를 발송했습니다.
                  </p>
                </div>
                <Button
                  as={Link}
                  href="/login"
                  color="primary"
                  variant="flat"
                  radius="lg"
                  size="sm"
                  className="mt-2"
                >
                  로그인으로 돌아가기
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="이메일"
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                  variant="flat"
                  radius="lg"
                  size="lg"
                  isRequired
                />
                {error && <p className="text-xs text-danger">{error}</p>}
                <Button
                  type="submit"
                  color="primary"
                  isLoading={loading}
                  fullWidth
                  radius="lg"
                  className="font-semibold shadow-lg shadow-primary/20"
                >
                  재설정 링크 보내기
                </Button>
                <p className="text-center text-sm text-default-500">
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    로그인으로 돌아가기
                  </Link>
                </p>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

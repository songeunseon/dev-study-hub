"use client";

import { Button, Card, CardBody, Input, Divider } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/");
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch {
      setError("Google 로그인에 실패했습니다.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
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
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="mt-2 text-sm text-default-500">
            Dev Study Hub에 오신 것을 환영합니다
          </p>
        </div>

        {/* Form */}
        <Card className="rounded-2xl border border-divider">
          <CardBody className="p-6">
            {/* Google Login */}
            <Button
              fullWidth
              variant="bordered"
              radius="lg"
              size="lg"
              isLoading={googleLoading}
              onPress={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 border-divider font-medium"
              startContent={
                !googleLoading ? (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.84v-.14z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                ) : undefined
              }
            >
              Google로 계속하기
            </Button>

            <div className="relative my-5">
              <Divider />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-content1 px-3 text-xs text-default-400">
                또는
              </span>
            </div>

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
              <Input
                label="비밀번호"
                type="password"
                value={password}
                onValueChange={setPassword}
                variant="flat"
                radius="lg"
                size="lg"
                isRequired
              />
              {error && <p className="text-xs text-danger">{error}</p>}
              <div className="flex justify-end">
                <Link
                  href="/reset-password"
                  className="text-xs text-default-400 hover:text-primary hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <Button
                type="submit"
                color="primary"
                isLoading={loading}
                fullWidth
                radius="lg"
                className="font-semibold shadow-lg shadow-primary/20"
              >
                로그인
              </Button>
            </form>

            <Divider className="my-5" />

            <p className="text-center text-sm text-default-500">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:underline"
              >
                회원가입
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

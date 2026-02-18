"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { ThemeSelector } from "./ThemeSelector";
import { CATEGORIES } from "@/types";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      height="4rem"
      isBordered
      classNames={{
        base: "bg-background/80 backdrop-blur-md",
        wrapper: "px-4 sm:px-6 lg:px-8",
      }}
    >
      {/* Left: Brand + Nav */}
      <NavbarContent className="gap-8">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
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
            <span className="text-xl font-bold tracking-tight">
              Dev Study Hub
            </span>
          </Link>
        </NavbarBrand>
        <div className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.key}`;
            return (
              <NavbarItem key={cat.key}>
                <Link
                  href={`/category/${cat.key}`}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-default-500 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>

      {/* Right: Theme + Auth */}
      <NavbarContent justify="end" className="gap-3">
        <NavbarItem>
          <ThemeSelector />
        </NavbarItem>
        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  size="sm"
                  name={user.displayName || user.email || "U"}
                  color="primary"
                  className="transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="사용자 메뉴" className="w-48">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  textValue="프로필"
                >
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-default-400">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={signOut}>
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-3 pl-3 border-l border-divider">
              <Link
                href="/login"
                className="text-sm font-medium hidden sm:block hover:text-primary transition-colors"
              >
                로그인
              </Link>
              <Button
                as={Link}
                href="/signup"
                color="primary"
                size="sm"
                radius="lg"
                className="flex items-center justify-center font-semibold shadow-lg shadow-primary/20"
              >
                회원가입
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="gap-2 pt-4">
        {CATEGORIES.map((cat) => {
          const isActive = pathname === `/category/${cat.key}`;
          return (
            <NavbarMenuItem key={cat.key}>
              <Link
                href={`/category/${cat.key}`}
                className={`flex w-full items-center rounded-xl px-4 py-3 text-base transition-colors ${
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground hover:bg-default-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
        <div className="mt-3 border-t border-divider pt-4">
          {!user && (
            <NavbarMenuItem>
              <Button
                as={Link}
                href="/signup"
                color="primary"
                fullWidth
                radius="lg"
                className="flex items-center justify-center font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                회원가입
              </Button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </HeroNavbar>
  );
}

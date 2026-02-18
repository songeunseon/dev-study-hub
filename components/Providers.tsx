"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { ColorThemeProvider } from "@/lib/theme";
import { StudyProvider } from "@/lib/study";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <ColorThemeProvider>
        <HeroUIProvider navigate={router.push}>
          <AuthProvider>
            <StudyProvider>{children}</StudyProvider>
          </AuthProvider>
        </HeroUIProvider>
      </ColorThemeProvider>
    </NextThemesProvider>
  );
}

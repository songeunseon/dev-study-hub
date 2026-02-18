"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ===== Color Theme ===== */

export type ColorTheme = "blue" | "violet" | "green" | "orange" | "rose";

export const COLOR_THEMES: { key: ColorTheme; label: string; css: string }[] = [
  { key: "blue", label: "블루", css: "hsl(212, 100%, 48%)" },
  { key: "violet", label: "바이올렛", css: "hsl(270, 67%, 47%)" },
  { key: "green", label: "그린", css: "hsl(152, 69%, 31%)" },
  { key: "orange", label: "오렌지", css: "hsl(24, 100%, 50%)" },
  { key: "rose", label: "로즈", css: "hsl(347, 77%, 50%)" },
];

/* ===== Font Theme ===== */

export type FontTheme =
  | "geist"
  | "noto"
  | "gothic"
  | "nanum"
  | "hippy"
  | "sans-serif";

export const FONT_THEMES: { key: FontTheme; label: string; labelEn: string }[] =
  [
    { key: "geist", label: "기본", labelEn: "Geist" },
    { key: "noto", label: "노토 산스", labelEn: "Noto Sans KR" },
    { key: "gothic", label: "고딕 A1", labelEn: "Gothic A1" },
    { key: "nanum", label: "나눔 고딕", labelEn: "Nanum Gothic" },
    { key: "hippy", label: "바른히피", labelEn: "손글씨" },
  ];

/* ===== Context ===== */

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  fontTheme: FontTheme;
  setFontTheme: (font: FontTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colorTheme: "blue",
  setColorTheme: () => {},
  fontTheme: "geist",
  setFontTheme: () => {},
});

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");
  const [fontTheme, setFontTheme] = useState<FontTheme>("geist");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem("color-theme") as ColorTheme | null;
    if (savedColor && COLOR_THEMES.some((t) => t.key === savedColor)) {
      setColorTheme(savedColor);
    }
    const savedFont = localStorage.getItem("font-theme") as FontTheme | null;
    if (savedFont && FONT_THEMES.some((f) => f.key === savedFont)) {
      setFontTheme(savedFont);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-color-theme", colorTheme);
    localStorage.setItem("color-theme", colorTheme);
  }, [colorTheme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-font", fontTheme);
    localStorage.setItem("font-theme", fontTheme);
  }, [fontTheme, mounted]);

  return (
    <ThemeContext.Provider
      value={{ colorTheme, setColorTheme, fontTheme, setFontTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useColorTheme = () => useContext(ThemeContext);

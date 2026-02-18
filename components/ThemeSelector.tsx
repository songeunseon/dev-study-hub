"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  ButtonGroup,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useColorTheme, COLOR_THEMES, FONT_THEMES } from "@/lib/theme";
import { useEffect, useState } from "react";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme, fontTheme, setFontTheme } =
    useColorTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const modes = [
    { key: "system", label: "시스템" },
    { key: "light", label: "라이트" },
    { key: "dark", label: "다크" },
  ];

  return (
    <Popover placement="top-start" offset={8}>
      <PopoverTrigger>
        <button
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-default-600 hover:bg-default-100 transition-all ${
            mounted ? "opacity-100" : "opacity-0"
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
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          테마 설정
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl p-0">
        <div className="flex flex-col gap-5 p-5">
          {/* Mode */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-default-400">
              모드
            </p>
            <ButtonGroup fullWidth size="sm" radius="lg" variant="flat">
              {modes.map((mode) => (
                <Button
                  key={mode.key}
                  onPress={() => setTheme(mode.key)}
                  color={theme === mode.key ? "primary" : "default"}
                  variant={theme === mode.key ? "solid" : "flat"}
                  className="text-xs"
                >
                  {mode.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>

          {/* Color */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-default-400">
              색상
            </p>
            <div className="flex gap-2">
              {COLOR_THEMES.map((ct) => (
                <button
                  key={ct.key}
                  onClick={() => setColorTheme(ct.key)}
                  className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl p-2 transition-all ${
                    colorTheme === ct.key
                      ? "bg-primary/10 ring-1 ring-primary/40"
                      : "hover:bg-default-100"
                  }`}
                  title={ct.label}
                >
                  <span
                    className="block h-5 w-5 rounded-full shadow-sm"
                    style={{ backgroundColor: ct.css }}
                  />
                  <span className="text-[10px] text-default-500">
                    {ct.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Font */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-default-400">
              폰트
            </p>
            <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto custom-scrollbar p-0.5">
              {FONT_THEMES.map((ft) => (
                <button
                  key={ft.key}
                  onClick={() => setFontTheme(ft.key)}
                  className={`flex items-center justify-between rounded-xl px-5 py-2.5 text-left transition-all ${
                    fontTheme === ft.key
                      ? "bg-primary/10 ring-1 ring-primary/40"
                      : "hover:bg-default-100"
                  }`}
                >
                  <span className="text-xs font-medium">{ft.label}</span>
                  <span className="text-[10px] text-default-400">
                    {ft.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_KR,
  Gothic_A1,
  Nanum_Gothic,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nanumGothic = Nanum_Gothic({
  variable: "--font-nanum-gothic",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dev Study Hub",
  description: "개발 학습을 위한 스터디 플래너",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} ${gothicA1.variable} ${nanumGothic.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="lg:ml-64 min-h-screen transition-[margin] duration-300">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

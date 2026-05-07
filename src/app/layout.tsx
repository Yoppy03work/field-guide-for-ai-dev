import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://field-guide-for-ai-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Dev Field Guide",
    template: "%s | AI Dev Field Guide",
  },
  description:
    "AIで作る、AIに任せる、AIで磨く。大学1年生〜駆け出しジュニアエンジニア向けの AI 開発フロー教材アプリ。",
  applicationName: "AI Dev Field Guide",
  authors: [{ name: "yoppy" }],
  keywords: [
    "AI 開発",
    "Claude Code",
    "Codex",
    "GitHub Copilot",
    "Antigravity",
    "Vercel",
    "Next.js",
    "GitHub 入門",
    "駆け出しエンジニア",
  ],
  openGraph: {
    type: "website",
    siteName: "AI Dev Field Guide",
    title: "AI Dev Field Guide",
    description:
      "主役はAIツール紹介でなく、開発フロー（Issue→Merge）のどこに差し込むかを駆け出し向けに解説。",
    url: SITE_URL,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "AI Dev Field Guide",
    description:
      "AIで作る、AIに任せる、AIで磨く。AI 開発フローを真似できる教材アプリ。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBFAF7] text-[#1F2937]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

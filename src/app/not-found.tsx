import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "地図にないページです | AI Dev Field Guide",
  description:
    "お探しのページは見つかりませんでした。Field Guide のいくつかのページからお進みください。",
};

const SUGGESTIONS = [
  { href: "/learn/github", label: "GitHub 入門" },
  { href: "/workflow", label: "AI 開発フロー（中心ページ）" },
  { href: "/tools", label: "ツール一覧" },
  { href: "/cases", label: "Cases / 制作ログ" },
  { href: "/about", label: "About" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center px-4 py-16 md:py-24">
      <Compass
        className="h-12 w-12 text-[#2F5D3A]"
        aria-hidden="true"
      />
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#4B5563]">
        404 / Not Found
      </p>
      <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
        地図にないページです
      </h1>
      <p className="mt-4 max-w-xl text-center text-base leading-relaxed text-[#4B5563]">
        お探しのページは見つかりませんでした。
        URL の入力ミス、または記事が移動・削除された可能性があります。
        以下のページから読み始めるのがおすすめです。
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2F5D3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        ホームに戻る
      </Link>

      <nav
        aria-label="代替の入口"
        className="mt-12 w-full rounded-md border border-[#E5E7EB] bg-white p-5"
      >
        <h2 className="text-sm font-semibold text-[#1F2937]">
          代わりに読めるページ
        </h2>
        <ul className="mt-3 space-y-1">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block rounded px-2 py-2 text-sm text-[#1F2937] hover:bg-[#F3F0EA] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
              >
                → {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const isDarkMode = document.documentElement.classList.contains('dark');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.removeItem('theme');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // 마운트되지 않았을 때 null 표시 (hydration 오류 방지)
  if (isDark === null) return null;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">📚</span>
          <span className="hidden sm:inline">스터디 자료실</span>
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            홈
          </Link>
          <Link
            href="/materials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            자료 목록
          </Link>

          {/* 다크 모드 토글 */}
          <button
            onClick={toggleDarkMode}
            className="rounded-md p-2 hover:bg-muted transition-colors"
            aria-label="다크 모드 토글"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

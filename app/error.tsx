'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션 환경에서는 에러 추적 서비스로 전송)
    console.error('페이지 에러:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-destructive">오류가 발생했습니다</h1>
        <p className="text-muted-foreground mb-2">
          페이지를 표시하는 중에 문제가 발생했습니다.
        </p>
        <p className="text-sm text-muted-foreground mb-8 break-words">
          {error.message && `오류 메시지: ${error.message}`}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 px-6 rounded-md border hover:bg-muted transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

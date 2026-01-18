import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-2">자료를 찾을 수 없습니다</h2>
          <p className="text-muted-foreground mb-8">
            요청하신 자료가 존재하지 않거나 삭제되었습니다.
          </p>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/materials"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            자료 목록으로 돌아가기
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors hover:bg-muted"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

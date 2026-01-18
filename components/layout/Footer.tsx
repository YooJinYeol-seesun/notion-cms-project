export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* 저작권 정보 */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} 스터디 자료실. 모든 권리 보유.
          </p>

          {/* 링크 (선택 사항) */}
          <nav className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              정보
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              연락처
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

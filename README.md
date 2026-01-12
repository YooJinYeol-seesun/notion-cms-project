# 스터디 자료실

Notion을 CMS로 활용한 스터디 자료 공유/열람 웹 서비스입니다.

## 프로젝트 소개

- **운영자**: Notion에서 문서/링크 업로드만 하면 자동으로 웹에 반영
- **참여자**: 웹에서 카테고리/태그/검색으로 쉽게 탐색 가능

## 주요 기능

- Notion 데이터베이스에서 자료 목록 가져오기 (최신순, 공개 상태만 노출)
- 개별 자료 상세 페이지 표시 (코드블록/이미지/콜아웃/링크 지원)
- 카테고리별 필터링
- 제목/요약/태그 기준 검색
- 반응형 디자인 (모바일/태블릿/PC)

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | Next.js 16, TypeScript |
| CMS | Notion API (@notionhq/client) |
| Styling | Tailwind CSS v4, shadcn/ui |
| Icons | Lucide React |
| Deployment | Vercel |

## 시작하기

### 사전 요구사항

- Node.js LTS
- npm 또는 pnpm
- Notion Integration Token
- Notion Database ID

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 Notion API 키와 Database ID 입력
```

### 환경 변수

```env
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

### 실행

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   └── globals.css         # 전역 스타일
├── components/             # UI 컴포넌트
├── lib/                    # 유틸리티 함수
├── docs/                   # 프로젝트 문서
│   └── PRD.md              # 제품 요구사항 문서
└── public/                 # 정적 자산
```

## 라이선스

MIT License

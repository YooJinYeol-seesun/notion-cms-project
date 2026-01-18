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
cp .env.local.example .env.local
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
│   ├── materials/          # 자료 관련 페이지
│   └── globals.css         # 전역 스타일
├── components/             # UI 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── materials/          # 자료 관련 컴포넌트
│   └── layout/             # 레이아웃 컴포넌트
├── lib/                    # 유틸리티 및 라이브러리
│   ├── utils.ts            # 공통 유틸리티
│   └── notion/             # Notion API 관련
│       ├── client.ts       # Notion 클라이언트
│       ├── repository.ts   # 데이터 레이어
│       └── mapper.ts       # 데이터 매퍼
├── services/               # 비즈니스 로직
│   └── studyMaterialService.ts
├── types/                  # TypeScript 타입 정의
│   ├── studyMaterial.ts
│   ├── dto.ts
│   └── notion.ts
├── docs/                   # 프로젝트 문서
│   ├── PRD.md              # 제품 요구사항 문서
│   └── ROADMAP.md          # 개발 로드맵
└── public/                 # 정적 자산
```

## Notion 데이터베이스 설정

프로젝트를 실행하기 전에 Notion에서 다음과 같은 데이터베이스를 생성해야 합니다.

### 필수 속성

| 속성명 | 타입 | 설명 |
|--------|------|------|
| Title (제목) | title | 자료 제목 |
| Category (카테고리) | select | 자료 카테고리 |
| Tags (태그) | multi_select | 자료 태그 |
| Published (게시일) | date | 게시 날짜 |
| Status (상태) | select | 비공개/공개 |
| Type (유형) | select | 문서/링크/영상/PDF |
| Summary (요약) | rich_text | 자료 요약 |
| Attachment (첨부파일) | files | 첨부파일 (선택) |

### Notion Integration 설정

1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지에서 새 Integration 생성
2. Integration Token 복사
3. 데이터베이스에 Integration 공유 (Share → Add connections)
4. 데이터베이스 ID 확인 (URL에서 추출)

## 개발 로드맵

자세한 개발 계획은 [ROADMAP.md](./docs/ROADMAP.md)를 참고하세요.

- **Phase 1**: 프로젝트 초기 설정 및 골격 구축 ✅
- **Phase 2**: Notion API 연동 및 데이터 레이어 구축 ✅
- **Phase 3**: 핵심 기능 개발 ✅
- **Phase 4**: 추가 기능 및 UX 개선 ✅
- **Phase 5**: 최적화 및 배포 (진행 중)

## 라이선스

MIT License

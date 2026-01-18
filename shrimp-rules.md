# Notion CMS 스터디 자료실 - AI 에이전트 개발 규칙

## 프로젝트 개요

- **프로젝트명**: Notion CMS 기반 스터디 자료실
- **목적**: Notion을 CMS로 활용하여 운영자는 Notion에서 자료를 관리하고, 사용자는 웹에서 편리하게 탐색할 수 있는 스터디 자료 공유 플랫폼
- **핵심 기술**: Next.js 16.1.1 (App Router), TypeScript 5 (strict), Tailwind CSS v4, shadcn/ui, @notionhq/client
- **배포 대상**: Vercel
- **개발 언어**: 한국어 (문서/주석), 영어 (코드)

---

## 프로젝트 구조 및 디렉토리 규칙

### 디렉토리 구조

```
.
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (글꼴, 메타데이터, 다크 모드)
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # 전역 스타일 (Tailwind v4 + CSS 변수)
│   ├── error.tsx                 # 전역 에러 바운더리
│   ├── not-found.tsx             # 404 페이지
│   ├── materials/                # 자료 관련 페이지
│   │   ├── page.tsx              # 자료 목록 페이지
│   │   ├── loading.tsx           # 목록 로딩 상태
│   │   └── [id]/
│   │       ├── page.tsx          # 자료 상세 페이지
│   │       ├── not-found.tsx     # 자료 미존재
│   │       └── loading.tsx       # 상세 로딩 상태
│   └── api/                      # (향후) API 라우트
│
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트 (자동 생성)
│   ├── materials/                # 자료 관련 컴포넌트
│   │   ├── MaterialCard.tsx      # 자료 카드 (목록에서 사용)
│   │   ├── MaterialList.tsx      # 자료 목록 (grid 레이아웃)
│   │   ├── MaterialHeader.tsx    # 자료 상세 헤더
│   │   ├── CategoryFilter.tsx    # 카테고리 필터
│   │   ├── TagFilter.tsx         # 태그 필터
│   │   ├── TypeFilter.tsx        # 자료 유형 필터
│   │   ├── SearchBar.tsx         # 검색바
│   │   ├── RelatedMaterials.tsx  # 관련 자료 추천
│   │   └── BlockRenderer.tsx     # Notion Block 렌더러
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── Header.tsx            # 헤더/네비게이션
│   │   └── Footer.tsx            # 푸터
│   └── common/                   # 공용 컴포넌트
│       └── EmptyState.tsx        # 빈 상태 표시
│
├── lib/                          # 유틸리티 및 설정
│   ├── utils.ts                  # cn() 함수 (clsx + tailwind-merge)
│   └── notion/                   # Notion 통합
│       ├── client.ts             # Notion Client 초기화
│       ├── repository.ts         # Notion API 쿼리 함수
│       ├── mapper.ts             # Notion 데이터 → DTO 변환
│       └── constants.ts          # Notion 데이터베이스 상수
│
├── services/                     # 비즈니스 로직 (Service Layer)
│   ├── studyMaterialService.ts   # 자료 서비스 (getAllMaterials, getMaterialById, etc.)
│   └── filterService.ts          # 필터링 로직
│
├── types/                        # TypeScript 타입 정의
│   ├── notion.ts                 # Notion API 응답 타입
│   ├── studyMaterial.ts          # 도메인 타입 (StudyMaterial, Category, Tag 등)
│   ├── dto.ts                    # DTO 타입 (StudyMaterialListDTO, StudyMaterialDetailDTO)
│   └── index.ts                  # 타입 export
│
├── public/                       # 정적 자산
├── docs/                         # 문서
│   ├── PRD.md                    # 제품 요구사항 문서
│   └── ROADMAP.md                # 개발 로드맵
│
├── components.json               # shadcn/ui 설정
├── tsconfig.json                 # TypeScript 설정 (경로: @/*)
├── postcss.config.mjs            # PostCSS 설정
├── tailwind.config.ts            # Tailwind 설정 (v4)
├── next.config.ts                # Next.js 설정
├── eslint.config.mjs             # ESLint 설정
├── .env.local                    # 환경 변수 (NOTION_API_KEY, NOTION_DATABASE_ID)
├── CLAUDE.md                     # 프로젝트 개발 가이드
└── shrimp-rules.md               # 이 파일 (AI 에이전트 규칙)
```

### 디렉토리별 역할

| 디렉토리 | 역할 | 생성 시기 |
|---------|------|---------|
| `app/` | Next.js 페이지 및 레이아웃 | Phase 1 |
| `components/` | React 컴포넌트 | Phase 1 (layout), Phase 3 (materials) |
| `lib/notion/` | Notion API 통합 | Phase 2 |
| `services/` | 비즈니스 로직 | Phase 2 |
| `types/` | 타입 정의 | Phase 2 |

---

## 코드 작성 표준

### TypeScript 규칙

- **strict 모드**: 필수 (`tsconfig.json` 설정됨)
- **any 타입**: 절대 금지
- **타입 어노테이션**: 함수 파라미터와 반환값은 필수로 타입 표시
- **타입 정의**: `types/` 디렉토리에 도메인별로 정의 (notion.ts, studyMaterial.ts, dto.ts)

예시:
```typescript
// ✅ 올바른 방법
function getMaterialById(id: string): Promise<StudyMaterialDetailDTO> {
  // ...
}

// ❌ 금지
function getMaterialById(id: any): any {
  // ...
}
```

### 네이밍 규칙

| 대상 | 규칙 | 예시 |
|-----|------|------|
| 변수/함수 | camelCase | `materialId`, `getMaterials()` |
| 컴포넌트 | PascalCase | `MaterialCard.tsx`, `SearchBar.tsx` |
| 파일명 | camelCase (일반), PascalCase (컴포넌트) | `lib/utils.ts`, `components/materials/MaterialCard.tsx` |
| 타입/인터페이스 | PascalCase | `StudyMaterial`, `CategoryFilter` |
| boolean 변수 | is/has/can 접두사 | `isLoading`, `hasError`, `canDelete` |
| 이벤트 핸들러 | handle + 이벤트 | `handleClick`, `handleSubmit` |
| Notion 상수 | 대문자 + 언더스코어 | `NOTION_API_KEY`, `NOTION_DATABASE_ID` |

### 컴포넌트 작성 규칙

- **RSC (React Server Component) 우선**: 기본적으로 Server Component로 작성
- **"use client" 지시어**: 인터랙티브 기능 필요시에만 사용
- **Props 타입**: 항상 명시적으로 정의 (PropTypes 아님)

예시:
```typescript
// ✅ Server Component (기본)
export default function MaterialList({ materials }: { materials: StudyMaterial[] }) {
  return <div>{/* ... */}</div>;
}

// ✅ Client Component (상호작용 필요시)
"use client";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### 파일 작성 규칙

- **들여쓰기**: 2칸
- **줄 길이**: 100자 권장 (최대 120자)
- **세미콜론**: 필수
- **따옴표**: 큰따옴표 (")
- **import 순서**: React → 외부 라이브러리 → 로컬 import
- **주석**: 한국어로 작성, 복잡한 로직에만 추가

예시:
```typescript
import React from "react";
import { Card } from "@/components/ui/card";
import { getMaterials } from "@/services/studyMaterialService";

// 자료 목록을 카테고리별로 필터링
export async function getCategorizedMaterials(category: string) {
  const materials = await getMaterials();
  return materials.filter((m) => m.category === category);
}
```

---

## 파일 상호작용 규칙 (Multi-File Coordination)

### 1. 새 페이지 생성 시

**생성 파일**: `app/new-feature/page.tsx`

**함께 수정해야 할 파일**:
- `app/layout.tsx` - 네비게이션 메뉴에 링크 추가
- `types/index.ts` - 새로운 타입 export 추가 (필요시)

### 2. 새 컴포넌트 생성 시

**생성 파일**: `components/new-component/NewComponent.tsx`

**함께 수정해야 할 파일**:
- `components/index.ts` - export 추가 (공용 컴포넌트인 경우)
- 부모 컴포넌트 또는 사용처 파일 - import 및 사용

### 3. 새 타입 정의 시

**생성/수정 파일**: `types/*.ts`

**함께 수정해야 할 파일**:
- `types/index.ts` - 모든 타입 export
- 해당 서비스 파일 - 타입 사용

### 4. 새 shadcn/ui 컴포넌트 추가 시

**추가 명령**: `npx shadcn-ui@latest add [component-name]`

**자동 생성**: `components/ui/[component-name].tsx`

**수정 필요**: 해당 컴포넌트 사용 파일에서 import

**중요**: `components.json` 변경 금지 (자동 관리됨)

### 5. 환경 변수 추가 시

**파일**: `.env.local`

**함께 수정해야 할 파일**:
- `docs/CLAUDE.md` - 환경 변수 문서 업데이트
- 사용하는 파일 (`lib/notion/client.ts` 등) - 환경 변수 사용 코드 추가

---

## Notion API 통합 규칙

### 데이터베이스 구조

**Notion Database ID**: `NOTION_DATABASE_ID` (환경 변수)

**필드 정의** (PRD 기준):
| 필드명 | 타입 | 설명 |
|-------|------|------|
| Title | title | 자료 제목 |
| Category | select | 카테고리 (Frontend/Backend/CS/DevOps/Algorithm) |
| Tags | multi_select | 태그 (자유형) |
| Published | date | 게시일 |
| Status | select | 상태 (비공개/공개) |
| Type | select | 자료 유형 (문서/링크/영상/PDF) |
| Summary | rich_text | 요약 |
| Attachment | files | 첨부파일 |
| Content | page content | 본문 |

### 공개 조건 필터

**필수 필터**: Status = 공개 AND Published 날짜 존재

모든 Notion 데이터 조회 시 이 필터를 적용해야 함.

```typescript
// ✅ 올바른 방법 (lib/notion/repository.ts)
const response = await notion.databases.query({
  database_id: NOTION_DATABASE_ID,
  filter: {
    and: [
      {
        property: "Status",
        select: { equals: "공개" },
      },
      {
        property: "Published",
        date: { is_not_empty: true },
      },
    ],
  },
});
```

### 데이터 변환 흐름

1. **Notion API 응답** → `lib/notion/repository.ts`에서 조회
2. **데이터 매핑** → `lib/notion/mapper.ts`에서 DTO로 변환
3. **서비스 레이어** → `services/studyMaterialService.ts`에서 비즈니스 로직 처리
4. **컴포넌트** → 서비스에서 받은 DTO로 렌더링

### 타입 정의 규칙

**3가지 타입 정의 필수**:

1. **Notion API 응답 타입** (`types/notion.ts`)
   ```typescript
   interface NotionPage {
     id: string;
     properties: Record<string, any>;
     // ...
   }
   ```

2. **도메인 타입** (`types/studyMaterial.ts`)
   ```typescript
   interface StudyMaterial {
     id: string;
     title: string;
     category: string;
     tags: string[];
     // ...
   }
   ```

3. **DTO 타입** (`types/dto.ts`)
   ```typescript
   interface StudyMaterialListDTO {
     id: string;
     title: string;
     // 목록에서 필요한 필드만
   }

   interface StudyMaterialDetailDTO extends StudyMaterialListDTO {
     // 상세 페이지에서 추가 필요한 필드
     content: NotionBlock[];
   }
   ```

---

## 컴포넌트 작성 규칙

### shadcn/ui 컴포넌트 사용

- **위치**: `components/ui/` (자동 생성됨)
- **import 패턴**: `import { Button } from "@/components/ui/button";`
- **스타일링**: Tailwind CSS 클래스 추가 가능
- **커스터마이징**: 필요시 컴포넌트 복사 후 수정 (라이브러리 파일 수정 금지)

### 컴포넌트 분리 원칙

- **단일 책임**: 한 컴포넌트는 하나의 기능만 담당
- **재사용성**: 3회 이상 사용될 예정이면 별도 컴포넌트로 분리
- **Props 최소화**: Props는 5개 이하 권장

### 에러 처리

**필수**: 모든 비동기 작업은 에러 처리 필요

```typescript
// ✅ 올바른 방법
try {
  const materials = await getMaterials();
  return <MaterialList materials={materials} />;
} catch (error) {
  return <ErrorMessage message="자료를 불러올 수 없습니다." />;
}
```

---

## 서비스/리포지토리 규칙

### Service Layer (`services/studyMaterialService.ts`)

**메서드 정의**:
- `getAllMaterials(filter?: FilterOptions): Promise<StudyMaterialListDTO[]>`
- `getMaterialById(id: string): Promise<StudyMaterialDetailDTO>`
- `searchMaterials(query: string): Promise<StudyMaterialListDTO[]>`
- `getRelatedMaterials(materialId: string): Promise<StudyMaterialListDTO[]>`

### Repository Layer (`lib/notion/repository.ts`)

**메서드 정의**:
- `queryDatabase(filter?: any): Promise<NotionPage[]>`
- `getPageById(id: string): Promise<NotionPage>`
- `getPageBlocks(id: string): Promise<NotionBlock[]>`

### Mapper Layer (`lib/notion/mapper.ts`)

**메서드 정의**:
- `mapToStudyMaterial(page: NotionPage): StudyMaterial`
- `mapToStudyMaterialListDTO(material: StudyMaterial): StudyMaterialListDTO`
- `mapToStudyMaterialDetailDTO(material: StudyMaterial, blocks: NotionBlock[]): StudyMaterialDetailDTO`

---

## 라우팅 규칙

### 페이지 라우팅

| URL | 파일 | 설명 |
|-----|------|------|
| `/` | `app/page.tsx` | 홈페이지 |
| `/materials` | `app/materials/page.tsx` | 자료 목록 |
| `/materials/[id]` | `app/materials/[id]/page.tsx` | 자료 상세 |

### 쿼리 파라미터 규칙

| 파라미터 | 설명 | 예시 |
|---------|------|------|
| `category` | 카테고리 필터 | `?category=Frontend` |
| `tags` | 태그 필터 (다중) | `?tags=React&tags=TypeScript` |
| `type` | 자료 유형 필터 | `?type=문서` |
| `search` | 검색어 | `?search=useState` |
| `page` | 페이지 번호 (향후) | `?page=2` |

### URL 패턴

- **카테고리 필터**: `/materials?category=Frontend`
- **복합 필터**: `/materials?category=Frontend&tags=React&type=문서`
- **검색**: `/materials?search=useState`

---

## 스타일링 규칙

### Tailwind CSS v4 사용

- **CSS 변수**: `app/globals.css`에 정의된 변수 사용 (oklch 색상)
- **유틸리티 클래스**: Tailwind 클래스 우선 사용
- **조건부 스타일**: `cn()` 함수 사용 (clsx + tailwind-merge)

예시:
```typescript
import { cn } from "@/lib/utils";

export function MaterialCard({ isSelected }: { isSelected: boolean }) {
  return (
    <div className={cn("p-4 border rounded", isSelected && "border-blue-500 bg-blue-50")}>
      {/* ... */}
    </div>
  );
}
```

### CSS 변수 (app/globals.css)

```css
:root {
  /* 라이트 모드 */
  --background: oklch(1 0 0);
  --foreground: oklch(0 0 0);
  /* ... 기타 변수 ... */
}

.dark {
  /* 다크 모드 */
  --background: oklch(0.145 0 0);
  --foreground: oklch(1 0 0);
  /* ... 기타 변수 ... */
}
```

---

## API/데이터 흐름 규칙

### Server Component에서 데이터 페칭

```typescript
// ✅ 올바른 방법 (app/materials/page.tsx)
import { StudyMaterialService } from "@/services/studyMaterialService";

export default async function MaterialsPage(props: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category as string;

  const materials = await StudyMaterialService.getAllMaterials({ category });
  return <MaterialList materials={materials} />;
}

// ❌ 금지: useEffect로 데이터 페칭
"use client";
import { useEffect, useState } from "react";
export function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    // 금지!
  }, []);
}
```

---

## 금지 사항 (Prohibitions)

### 절대 금지

1. **`any` 타입 사용**: 모든 변수/함수에 명시적 타입 필수
2. **모호한 표현**: "보통은", "대략", "상황에 따라" 금지 (문서/주석에서)
3. **불완전한 코드**: TODO, 주석 처리 코드, 임시 해결책 제출 금지
4. **설명 없는 코드**: 복잡한 로직은 한국어 주석 필수
5. **공개 조건 필터 누락**: Notion 데이터 조회 시 Status=공개 필터 필수
6. **컴포넌트 파일 편집**: `components/ui/` 내 shadcn 컴포넌트 직접 수정 금지 (커스턴 필요시 복사)
7. **환경 변수 하드코딩**: 모든 설정값은 환경 변수 사용
8. **타입 정의 생략**: 함수 파라미터/반환값은 항상 타입 명시
9. **검증 없는 외부 데이터**: 사용자 입력, API 응답은 항상 검증
10. **비동기 작업 without 에러 처리**: 모든 await 호출은 try-catch 필수

### 피해야 할 패턴

| 패턴 | 이유 | 대안 |
|------|------|------|
| `import * as ...` | 네임스페이스 오염 | 명시적 import |
| `//@ts-ignore` | 타입 안정성 무시 | 타입 수정 |
| `prop drilling` (3단계 이상) | 복잡성 증가 | Context 또는 상태 관리 |
| 인라인 스타일 | 재사용성 감소 | Tailwind 클래스 |
| 직접 DOM 조작 | React 원칙 위반 | React ref 또는 이벤트 핸들러 |

---

## AI 의사결정 가이드

### 불명확한 상황에서의 판단 기준

#### Q: 새로운 기능을 어디에 추가해야 하는가?

**우선순위**:
1. 페이지/라우트라면 → `app/` 디렉토리
2. 재사용 가능한 UI라면 → `components/` 디렉토리
3. 비즈니스 로직이라면 → `services/` 디렉토리
4. 데이터 접근이라면 → `lib/notion/` 디렉토리

#### Q: Server Component vs Client Component 중 어느 것을 선택?

**기준**:
```
┌─────────────────────────────────┐
│ Server Component 우선 (기본)      │
│ - 데이터 페칭 필요              │
│ - 보안 정보 처리                │
│ - 백엔드 리소스 직접 접근       │
└─────────────────────────────────┘
           ↓
      필요시 Client로 변경
┌─────────────────────────────────┐
│ Client Component 필요한 경우     │
│ - 사용자 입력 (onClick 등)     │
│ - useState/useEffect 필요       │
│ - 브라우저 API 필요            │
└─────────────────────────────────┘
```

#### Q: 필터링 로직은 서버와 클라이언트 중 어디?

**기준**:
- **초기 필터링** (페이지 로드 시): 서버 (SSR, ISR)
- **필터 변경 시**: URL 쿼리 파라미터 업데이트 → 서버 리페칭
- **실시간 검색**: 클라이언트 debounce → 서버 요청

#### Q: 새로운 Notion 필드를 추가해야 한다면?

**순서**:
1. Notion Database에 필드 추가
2. `types/notion.ts` 업데이트 (API 응답 타입)
3. `types/studyMaterial.ts` 업데이트 (도메인 타입)
4. `lib/notion/mapper.ts` 업데이트 (매핑 함수)
5. 필요시 DTO 타입 업데이트
6. 컴포넌트에서 사용

#### Q: 라이브러리 업그레이드 필요?

**방침**: 기존 버전 고정 유지, 필요시 팀 검토 후 진행

---

## 개발 로드맵 단계별 규칙

### Phase 1: 프로젝트 초기 설정

**주요 작업**:
- 폴더 구조 생성
- 레이아웃 및 네비게이션 구현
- shadcn/ui 초기 설정

**생성 대상 디렉토리**:
- `components/layout/` - Header, Footer
- `components/common/` - EmptyState 등

**규칙**: Phase 1 완료 후 app/ 레이아웃은 수정 최소화

### Phase 2: Notion API 연동

**주요 작업**:
- Notion 클라이언트 초기화
- 데이터 타입 정의
- Repository 및 Mapper 구현

**생성 대상**:
- `lib/notion/` 디렉토리 전체
- `types/` 디렉토리 전체
- `services/` 디렉토리

**규칙**: 공개 조건 필터 반드시 적용

### Phase 3: 핵심 기능 개발

**주요 작업**:
- 자료 목록/상세 페이지
- 필터 UI 및 로직
- Notion Block 렌더러

**생성 대상**:
- `components/materials/` - 모든 컴포넌트
- `app/materials/` - 페이지 파일들

**규칙**: RSC 우선, 클라이언트 필터링 최소화

### Phase 4: 추가 기능 & UX 개선

**주요 작업**:
- 검색 기능
- 관련 자료 추천
- 반응형 및 접근성

**기존 파일 수정**: 최대한 최소화, 새 컴포넌트 추가

### Phase 5: 최적화 & 배포

**주요 작업**:
- ISR 설정
- SEO 메타태그
- Vercel 배포

**주의**: 기능 변경 금지, 성능/배포 최적화만

---

## 테스팅 규칙

### 수동 테스트 체크리스트

- [ ] 모든 페이지가 `npm run dev`에서 에러 없이 렌더링
- [ ] TypeScript `npm run lint` 에러 없음
- [ ] 모바일(375px) / 태블릿(768px) / 데스크톱(1440px) 반응형 확인
- [ ] 다크 모드 토글 정상 동작
- [ ] 필터링/검색 동작 확인
- [ ] Notion 데이터 공개 조건 필터 적용 확인

### 자동 테스트 (향후)

- Jest 설정 (Phase 2 후반)
- 통합 테스트 (Phase 3 완료 후)
- E2E 테스트 (Vercel 배포 전)

---

## 커밋 및 PR 규칙

### 커밋 메시지 형식

```
[Phase X] Epic X.X: 간단한 설명

- 변경사항 1
- 변경사항 2
```

예시:
```
[Phase 2] Epic 2.3: Notion 데이터베이스 쿼리 함수 구현

- queryDatabase() 함수 작성 (Status=공개 필터 적용)
- 데이터 타입 검증 추가
- 에러 처리 구현
```

### PR 체크리스트

- [ ] TypeScript strict 모드 에러 없음
- [ ] ESLint 검사 통과
- [ ] 반응형 확인 (모바일/태블릿/데스크톱)
- [ ] Notion 공개 조건 필터 적용 (DB 쿼리 코드인 경우)
- [ ] 문서 업데이트 (필요시)

---

## 문서화 규칙

### README 유지

- 개발 환경 설정 방법
- 환경 변수 설정 예시
- 개발 명령어 설명

### 코드 주석

- 한국어 사용
- 복잡한 로직에만 추가 (명백한 코드는 주석 불필요)
- `// TODO:` 형식의 임시 주석 금지 (작업 완료 또는 이슈 등록)

### Notion 운영 가이드

- Database 구조 설명
- 새 자료 등록 방법
- 필드별 입력 가이드

---

## 결론

이 규칙 문서는 **AI 에이전트를 위한** 개발 지침입니다.

**목표**:
- 일관된 코드 품질 유지
- 멀티 에이전트 협업 시 혼란 방지
- 프로젝트 구조 및 의도 명확화

**원칙**:
- 명확성 > 유연성
- 구조 > 자유도
- 안정성 > 빠른 개발

**변경 시 주의**:
- 기존 규칙 수정 시 모든 관련 파일 검토 필수
- 새 규칙 추가 시 기존 규칙과의 충돌 확인
- 팀 문서(CLAUDE.md, PRD.md)와 일관성 유지

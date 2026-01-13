# Notion CMS 기반 스터디 자료실 로드맵

## 개요

### 프로젝트 비전
Notion을 CMS로 활용하여 운영자는 Notion에서 자료를 관리하고, 사용자는 웹에서 편리하게 탐색할 수 있는 스터디 자료 공유 플랫폼을 구축합니다.

### 핵심 성공 지표
- Notion API 연동 성공 및 자동 동기화
- 자료 목록/상세 페이지 정상 동작
- 카테고리/태그/검색 필터링 정상 동작
- 모바일/태블릿/PC 반응형 대응
- 페이지 로딩 속도 2초 이내 (ISR 캐싱 적용)

### 전체 타임라인
- **Phase 1**: 1주 (프로젝트 초기 설정)
- **Phase 2**: 1.5주 (Notion API 연동 및 데이터 레이어)
- **Phase 3**: 2주 (핵심 기능 개발)
- **Phase 4**: 1.5주 (추가 기능 및 UX 개선)
- **Phase 5**: 1주 (최적화 및 배포)
- **총 예상 기간**: 7주

---

## Phase 1: 프로젝트 초기 설정 및 골격 구축

### 목표
프로젝트의 기술적 기반을 마련하고, 개발 환경을 구축하며, 공통 컴포넌트 구조를 설계합니다.

### 왜 이 순서인가?
- 기술 스택 설정과 환경 구성이 완료되어야 이후 개발이 원활하게 진행됩니다.
- Notion API 연동 전에 레이아웃과 공통 UI를 먼저 구축하면 데이터 없이도 UI 테스트가 가능합니다.
- 프로젝트 구조와 폴더 규칙을 먼저 정의하면 팀원 간 협업이 원활해집니다.

### 주요 기능
- 프로젝트 초기 설정 완료
- 루트 레이아웃 및 네비게이션 바 구현
- 기본 페이지 라우팅 설정 (홈, 자료 목록, 자료 상세 skeleton)

### 기술 작업

#### Epic 1.1: 프로젝트 환경 설정
- **Story 1.1.1**: Next.js 15 프로젝트 초기화 및 TypeScript 설정
  - 설명: `create-next-app`으로 프로젝트 생성, `tsconfig.json` strict 모드 설정
  - 예상 소요시간: 1시간
  - 담당 레이어: Infrastructure

- **Story 1.1.2**: Tailwind CSS v4 및 PostCSS 설정
  - 설명: `app/globals.css`에 Tailwind 임포트, CSS 변수 설정 (라이트/다크 모드)
  - 예상 소요시간: 1시간
  - 담당 레이어: UI/Styling

- **Story 1.1.3**: shadcn/ui 초기 설정
  - 설명: `components.json` 생성, New York style, RSC 활성화
  - 예상 소요시간: 30분
  - 담당 레이어: UI/Styling

- **Story 1.1.4**: ESLint 및 Prettier 설정
  - 설명: Next.js Core Web Vitals 규칙 적용, 코드 품질 기준 설정
  - 예상 소요시간: 30분
  - 담당 레이어: Infrastructure

#### Epic 1.2: 프로젝트 구조 설계
- **Story 1.2.1**: 폴더 구조 정의
  - 설명: `app/`, `components/`, `lib/`, `services/`, `types/` 폴더 생성 및 역할 정의
  - 예상 소요시간: 1시간
  - 담당 레이어: Architecture

- **Story 1.2.2**: 경로 별칭 설정
  - 설명: `tsconfig.json`에 `@/components`, `@/lib`, `@/services`, `@/types` 별칭 추가
  - 예상 소요시간: 30분
  - 담당 레이어: Infrastructure

#### Epic 1.3: 공통 레이아웃 및 네비게이션
- **Story 1.3.1**: 루트 레이아웃 구현 (`app/layout.tsx`)
  - 설명: 글꼴, 메타데이터, 다크 모드 Provider 설정
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 1.3.2**: 네비게이션 바 컴포넌트 구현
  - 설명: 로고, 메뉴(홈, 자료 목록), 다크 모드 토글 포함
  - 필요 shadcn/ui: `Button`, `NavigationMenu`
  - 예상 소요시간: 3시간
  - 담당 레이어: UI

- **Story 1.3.3**: Footer 컴포넌트 구현
  - 설명: 저작권 정보, 링크 (선택 사항)
  - 예상 소요시간: 1시간
  - 담당 레이어: UI

#### Epic 1.4: 기본 페이지 라우팅 설정
- **Story 1.4.1**: 홈 페이지 skeleton 생성 (`app/page.tsx`)
  - 설명: 로딩 스켈레톤 UI, 임시 헤더 텍스트
  - 예상 소요시간: 1시간
  - 담당 레이어: UI

- **Story 1.4.2**: 자료 목록 페이지 skeleton 생성 (`app/materials/page.tsx`)
  - 설명: 필터/검색 영역 placeholder, 카드 skeleton
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

- **Story 1.4.3**: 자료 상세 페이지 skeleton 생성 (`app/materials/[id]/page.tsx`)
  - 설명: 제목/메타 정보 skeleton, 본문 영역 placeholder
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

### 예상 소요 기간
- **1주** (5 영업일)
- Epic 1.1 ~ 1.2: 2일
- Epic 1.3: 2일
- Epic 1.4: 1일

### 종속성
- Epic 1.1 완료 후 → Epic 1.2 시작 가능
- Epic 1.2 완료 후 → Epic 1.3, 1.4 병렬 진행 가능

### 완료 기준 (Definition of Done)
- ✅ 프로젝트가 `npm run dev`로 정상 실행됨
- ✅ 홈, 자료 목록, 자료 상세 페이지 라우팅 동작 확인
- ✅ 네비게이션 바에서 페이지 이동 가능
- ✅ 다크 모드 토글 정상 동작
- ✅ TypeScript strict 모드에서 에러 없음
- ✅ ESLint 검사 통과

### 위험요소
- **기술적 위험**: Tailwind CSS v4의 새로운 문법 (완화: 공식 문서 참조, 마이그레이션 가이드 활용)
- **일정 위험**: shadcn/ui 컴포넌트 설정 시 문제 발생 가능 (완화: 공식 CLI 도구 사용, 예제 참고)

---

## Phase 2: Notion API 연동 및 데이터 레이어 구축

### 목표
Notion API를 연동하여 데이터를 가져오고, 서비스 레이어/타입 정의를 완료합니다.

### 왜 이 순서인가?
- Notion API 연동이 완료되어야 실제 데이터를 사용한 UI 개발이 가능합니다.
- 타입 정의를 먼저 하면 서비스 레이어와 UI 개발이 타입 안정성을 보장받습니다.
- 데이터 레이어를 먼저 구축하면 이후 핵심 기능 개발이 빠르게 진행됩니다.

### 주요 기능
- Notion Integration 생성 및 API 키 발급
- Notion 데이터베이스 쿼리 함수 구현
- StudyMaterials 데이터 타입 정의
- 서비스 레이어 구현 (Repository 패턴)

### 기술 작업

#### Epic 2.1: Notion API 환경 설정
- **Story 2.1.1**: Notion Integration 생성 및 API 키 발급
  - 설명: Notion 개발자 페이지에서 integration 생성, internal integration token 발급
  - 예상 소요시간: 30분
  - 담당 레이어: Infrastructure

- **Story 2.1.2**: Notion Database 생성 및 권한 공유
  - 설명: `StudyMaterials` 데이터베이스 생성, PRD의 속성 정의 (Title, Category, Tags, Published, Status, Type, Summary, Attachment)
  - 예상 소요시간: 1시간
  - 담당 레이어: CMS Setup

- **Story 2.1.3**: 환경 변수 설정
  - 설명: `.env.local` 파일에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 추가
  - 예상 소요시간: 15분
  - 담당 레이어: Infrastructure

- **Story 2.1.4**: `@notionhq/client` 패키지 설치
  - 설명: `npm install @notionhq/client` 실행
  - 예상 소요시간: 5분
  - 담당 레이어: Infrastructure

#### Epic 2.2: 타입 정의
- **Story 2.2.1**: Notion API 응답 타입 정의
  - 설명: `types/notion.ts`에 `NotionPage`, `NotionDatabase`, `NotionBlock` 등 인터페이스 정의
  - 예상 소요시간: 2시간
  - 담당 레이어: Type Definition

- **Story 2.2.2**: StudyMaterial 도메인 타입 정의
  - 설명: `types/studyMaterial.ts`에 `StudyMaterial`, `Category`, `Tag`, `MaterialType` 등 정의
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Type Definition

- **Story 2.2.3**: DTO 타입 정의
  - 설명: `types/dto.ts`에 `StudyMaterialListDTO`, `StudyMaterialDetailDTO` 정의
  - 예상 소요시간: 1시간
  - 담당 레이어: Type Definition

#### Epic 2.3: Notion Client 및 Repository 구현
- **Story 2.3.1**: Notion Client 초기화 함수 작성
  - 설명: `lib/notion/client.ts`에서 `Client` 인스턴스 생성 및 export
  - 예상 소요시간: 30분
  - 담당 레이어: Repository

- **Story 2.3.2**: Notion 데이터베이스 쿼리 함수 구현
  - 설명: `lib/notion/repository.ts`에서 `queryDatabase()` 함수 작성 (Status = 공개 필터 적용)
  - 예상 소요시간: 2시간
  - 담당 레이어: Repository

- **Story 2.3.3**: Notion 페이지 조회 함수 구현
  - 설명: `lib/notion/repository.ts`에서 `getPageById()`, `getPageBlocks()` 함수 작성
  - 예상 소요시간: 2시간
  - 담당 레이어: Repository

- **Story 2.3.4**: Notion 데이터 → DTO 변환 함수 작성
  - 설명: `lib/notion/mapper.ts`에서 `mapToStudyMaterial()`, `mapToStudyMaterialDetail()` 함수 작성
  - 예상 소요시간: 3시간
  - 담당 레이어: Repository

#### Epic 2.4: 서비스 레이어 구현
- **Story 2.4.1**: StudyMaterialService 클래스 작성
  - 설명: `services/studyMaterialService.ts`에서 `getAllMaterials()`, `getMaterialById()`, `searchMaterials()` 메서드 구현
  - 예상 소요시간: 3시간
  - 담당 레이어: Service

- **Story 2.4.2**: 서비스 레이어 유닛 테스트 (선택 사항)
  - 설명: Jest 설정 및 기본 테스트 케이스 작성
  - 예상 소요시간: 2시간
  - 담당 레이어: Testing

### 예상 소요 기간
- **1.5주** (7.5 영업일)
- Epic 2.1: 1일
- Epic 2.2: 1일
- Epic 2.3: 2.5일
- Epic 2.4: 2일 (테스트 포함 시 3일)

### 종속성
- Epic 2.1 완료 후 → Epic 2.2, 2.3 병렬 진행 가능
- Epic 2.2, 2.3 완료 후 → Epic 2.4 시작 가능

### 완료 기준 (Definition of Done)
- ✅ Notion API 연동 테스트 성공 (데이터 조회 확인)
- ✅ `StudyMaterial` 타입이 TypeScript strict 모드에서 에러 없음
- ✅ Repository 함수가 실제 Notion 데이터베이스에서 데이터 반환
- ✅ Service 레이어가 Repository를 호출하여 DTO 반환
- ✅ 최소 3개 이상의 테스트 데이터 Notion에 등록 및 조회 확인

### 위험요소
- **기술적 위험**: Notion API 응답 구조 변경 (완화: 공식 SDK 사용, 버전 고정)
- **기술적 위험**: Notion API rate limit 제한 (완화: 캐싱 전략 수립, ISR 적용 계획)
- **일정 위험**: 타입 정의 복잡도 증가 (완화: 필수 필드 위주로 먼저 정의, 확장 가능하게 설계)

---

## Phase 3: 핵심 기능 개발

### 목표
자료 목록 페이지, 자료 상세 페이지, 카테고리/태그 필터링 기능을 완성합니다.

### 왜 이 순서인가?
- 자료 목록 페이지는 사용자 진입점이므로 최우선 개발 필요
- 상세 페이지는 목록 페이지에서 연결되므로 다음 순서로 개발
- 필터링 기능은 목록 페이지가 완성된 후 추가하는 것이 효율적

### 주요 기능
- 자료 목록 페이지 (카드형 리스트)
- 자료 상세 페이지 (Notion blocks 렌더링)
- 카테고리/태그 필터 UI
- Notion 본문 렌더링 (react-notion-x 또는 자체 구현)

### 기술 작업

#### Epic 3.1: 자료 목록 페이지 구현
- **Story 3.1.1**: 목록 페이지 데이터 fetching 로직 작성
  - 설명: `app/materials/page.tsx`에서 `StudyMaterialService.getAllMaterials()` 호출 (Server Component)
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Controller

- **Story 3.1.2**: MaterialCard 컴포넌트 작성
  - 설명: `components/materials/MaterialCard.tsx` 작성 (제목, 카테고리, 태그, 게시일, 요약 표시)
  - 필요 shadcn/ui: `Card`, `Badge`
  - 예상 소요시간: 3시간
  - 담당 레이어: UI

- **Story 3.1.3**: MaterialList 컴포넌트 작성
  - 설명: `components/materials/MaterialList.tsx` 작성 (MaterialCard 리스트 렌더링, grid 레이아웃)
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 3.1.4**: 빈 상태(Empty State) UI 작성
  - 설명: 자료가 없을 때 "등록된 자료가 없습니다" 메시지 표시
  - 예상 소요시간: 1시간
  - 담당 레이어: UI

- **Story 3.1.5**: 로딩 상태 UI 작성
  - 설명: `app/materials/loading.tsx` 작성 (Skeleton UI)
  - 필요 shadcn/ui: `Skeleton`
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

#### Epic 3.2: 자료 상세 페이지 구현
- **Story 3.2.1**: 상세 페이지 데이터 fetching 로직 작성
  - 설명: `app/materials/[id]/page.tsx`에서 `StudyMaterialService.getMaterialById()` 호출
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Controller

- **Story 3.2.2**: MaterialHeader 컴포넌트 작성
  - 설명: `components/materials/MaterialHeader.tsx` 작성 (제목, 카테고리, 태그, 게시일, Type 표시)
  - 필요 shadcn/ui: `Badge`, `Separator`
  - 예상 소요시간: 2.5시간
  - 담당 레이어: UI

- **Story 3.2.3**: Notion Block 렌더러 구현 (기본)
  - 설명: `components/notion/BlockRenderer.tsx` 작성 (paragraph, heading, list, code block 지원)
  - 예상 소요시간: 5시간
  - 담당 레이어: UI

- **Story 3.2.4**: Notion Block 렌더러 구현 (고급)
  - 설명: 이미지, 콜아웃, 링크, 인용문, 토글 블록 지원 추가
  - 필요 shadcn/ui: `Alert`, `Accordion` (토글)
  - 예상 소요시간: 4시간
  - 담당 레이어: UI

- **Story 3.2.5**: 첨부파일 다운로드 UI 작성
  - 설명: Attachment 필드가 있을 경우 다운로드 버튼 표시
  - 필요 shadcn/ui: `Button`
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

- **Story 3.2.6**: 404 에러 처리
  - 설명: `app/materials/[id]/not-found.tsx` 작성
  - 예상 소요시간: 1시간
  - 담당 레이어: UI

#### Epic 3.3: 카테고리/태그 필터링 기능
- **Story 3.3.1**: 카테고리 필터 UI 작성
  - 설명: `components/materials/CategoryFilter.tsx` 작성 (Select 또는 Button Group)
  - 필요 shadcn/ui: `Select` 또는 `ToggleGroup`
  - 예상 소요시간: 2.5시간
  - 담당 레이어: UI

- **Story 3.3.2**: 태그 필터 UI 작성
  - 설명: `components/materials/TagFilter.tsx` 작성 (multi-select)
  - 필요 shadcn/ui: `Checkbox`, `Popover`
  - 예상 소요시간: 3시간
  - 담당 레이어: UI

- **Story 3.3.3**: Type 필터 UI 작성
  - 설명: `components/materials/TypeFilter.tsx` 작성 (문서/링크/영상/PDF 선택)
  - 필요 shadcn/ui: `ToggleGroup`
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 3.3.4**: URL 쿼리 파라미터 기반 필터 로직 작성
  - 설명: `app/materials/page.tsx`에서 `searchParams`로 필터링 (category, tags, type)
  - 예상 소요시간: 3시간
  - 담당 레이어: Controller

- **Story 3.3.5**: 필터 초기화 버튼 작성
  - 설명: 모든 필터를 초기화하는 "필터 초기화" 버튼
  - 필요 shadcn/ui: `Button`
  - 예상 소요시간: 1시간
  - 담당 레이어: UI

#### Epic 3.4: 홈 페이지 구현
- **Story 3.4.1**: 최근 자료 섹션 구현
  - 설명: `app/page.tsx`에서 최신 N개 자료 표시 (MaterialCard 재사용)
  - 예상 소요시간: 2시간
  - 담당 레이어: Controller/UI

- **Story 3.4.2**: 카테고리 바로가기 버튼 구현
  - 설명: 주요 카테고리별 버튼 (클릭 시 /materials?category=XXX로 이동)
  - 필요 shadcn/ui: `Button`, `Card`
  - 예상 소요시간: 2.5시간
  - 담당 레이어: UI

- **Story 3.4.3**: 인기 태그 Top N 표시
  - 설명: 가장 많이 사용된 태그 목록 표시 (클릭 시 필터 적용)
  - 예상 소요시간: 2시간
  - 담당 레이어: Controller/UI

- **Story 3.4.4**: Hero 섹션 작성
  - 설명: 프로젝트 소개 텍스트, CTA 버튼
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

### 예상 소요 기간
- **2주** (10 영업일)
- Epic 3.1: 2일
- Epic 3.2: 3.5일
- Epic 3.3: 2.5일
- Epic 3.4: 2일

### 종속성
- Epic 3.1 완료 후 → Epic 3.2, 3.3 병렬 진행 가능
- Epic 3.1, 3.2, 3.3 완료 후 → Epic 3.4 시작 가능

### 완료 기준 (Definition of Done)
- ✅ 자료 목록 페이지에서 Notion 데이터 정상 표시
- ✅ 자료 상세 페이지에서 Notion 본문 렌더링 정상 동작
- ✅ 카테고리/태그/Type 필터링 동작 확인
- ✅ URL 쿼리 파라미터 변경 시 필터 상태 유지
- ✅ 홈 페이지 최근 자료, 카테고리 바로가기, 인기 태그 정상 표시
- ✅ 모바일/태블릿 반응형 확인
- ✅ 로딩 상태 및 에러 상태 UI 정상 동작

### 위험요소
- **기술적 위험**: Notion Block 렌더링 복잡도 (완화: 우선순위 높은 블록 타입부터 구현, 지원하지 않는 블록은 placeholder 표시)
- **기술적 위험**: 필터링 로직의 성능 이슈 (완화: 클라이언트 필터링 대신 서버 사이드 필터링, 필요시 Notion API query filter 활용)
- **일정 위험**: Notion 본문 렌더링 예상보다 시간 소요 (완화: react-notion-x 라이브러리 활용 검토, 또는 기본 블록만 먼저 지원)

---

## Phase 4: 추가 기능 및 UX 개선

### 목표
검색 기능, 관련 자료 추천, 반응형 디자인 완성, 접근성 개선을 수행합니다.

### 왜 이 순서인가?
- 핵심 기능(목록/상세/필터)이 완성된 후 검색 기능을 추가하는 것이 효율적
- 관련 자료 추천은 상세 페이지가 완성된 후 추가 가능
- 반응형 및 접근성은 전체 UI가 구현된 후 최적화 단계에서 진행

### 주요 기능
- 검색 기능 (제목/요약/태그 기준)
- 관련 자료 추천 (같은 태그 기반)
- 반응형 디자인 최종 점검
- 접근성 개선 (키보드 네비게이션, ARIA 속성)

### 기술 작업

#### Epic 4.1: 검색 기능 구현
- **Story 4.1.1**: 검색바 UI 작성
  - 설명: `components/materials/SearchBar.tsx` 작성 (입력 즉시 URL 쿼리 파라미터 업데이트)
  - 필요 shadcn/ui: `Input`, `Button`
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 4.1.2**: 검색 로직 작성
  - 설명: `services/studyMaterialService.ts`에 `searchMaterials(query)` 메서드 추가 (제목/요약/태그 검색)
  - 예상 소요시간: 2.5시간
  - 담당 레이어: Service

- **Story 4.1.3**: 검색 결과 하이라이팅
  - 설명: 검색어와 일치하는 부분을 강조 표시 (선택 사항)
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 4.1.4**: 검색 결과 없을 때 Empty State
  - 설명: "검색 결과가 없습니다" 메시지 표시
  - 예상 소요시간: 1시간
  - 담당 레이어: UI

#### Epic 4.2: 관련 자료 추천 기능
- **Story 4.2.1**: 추천 로직 작성
  - 설명: `services/studyMaterialService.ts`에 `getRelatedMaterials(materialId)` 메서드 추가 (같은 태그 기준)
  - 예상 소요시간: 2.5시간
  - 담당 레이어: Service

- **Story 4.2.2**: RelatedMaterials 컴포넌트 작성
  - 설명: `components/materials/RelatedMaterials.tsx` 작성 (MaterialCard 재사용, 가로 스크롤 또는 grid)
  - 예상 소요시간: 2.5시간
  - 담당 레이어: UI

- **Story 4.2.3**: 상세 페이지에 추천 섹션 추가
  - 설명: `app/materials/[id]/page.tsx`에 RelatedMaterials 컴포넌트 추가
  - 예상 소요시간: 1시간
  - 담당 레이어: Controller

#### Epic 4.3: 반응형 디자인 최종 점검
- **Story 4.3.1**: 모바일 레이아웃 점검 및 수정
  - 설명: 320px ~ 768px 해상도에서 UI 확인, 필요시 Tailwind 클래스 조정
  - 예상 소요시간: 3시간
  - 담당 레이어: UI

- **Story 4.3.2**: 태블릿 레이아웃 점검 및 수정
  - 설명: 768px ~ 1024px 해상도에서 UI 확인
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 4.3.3**: 데스크톱 레이아웃 점검 및 수정
  - 설명: 1024px 이상 해상도에서 UI 확인
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

#### Epic 4.4: 접근성 개선
- **Story 4.4.1**: 키보드 네비게이션 테스트 및 수정
  - 설명: Tab 키로 모든 인터랙티브 요소 접근 가능 확인, focus 스타일 추가
  - 예상 소요시간: 2.5시간
  - 담당 레이어: UI

- **Story 4.4.2**: ARIA 속성 추가
  - 설명: 버튼, 링크, 입력 필드에 적절한 ARIA 레이블 추가
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 4.4.3**: 색상 대비 확인 및 수정
  - 설명: WCAG AA 기준 색상 대비 확인, 필요시 CSS 변수 조정
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

#### Epic 4.5: 사용자 경험 개선
- **Story 4.5.1**: 페이지 전환 애니메이션 추가 (선택 사항)
  - 설명: Framer Motion 또는 CSS transition 활용
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 4.5.2**: Toast 알림 구현
  - 설명: 에러 발생 시 사용자 친화적 메시지 표시
  - 필요 shadcn/ui: `Toast`
  - 예상 소요시간: 1.5시간
  - 담당 레이어: UI

- **Story 4.5.3**: 즐겨찾기 기능 (선택 사항)
  - 설명: 로컬 스토리지 기반 즐겨찾기 추가/제거
  - 예상 소요시간: 3시간
  - 담당 레이어: UI/Service

### 예상 소요 기간
- **1.5주** (7.5 영업일)
- Epic 4.1: 2일
- Epic 4.2: 1.5일
- Epic 4.3: 1.5일
- Epic 4.4: 1.5일
- Epic 4.5: 1일 (선택 사항 포함)

### 종속성
- Phase 3 완료 후 → Epic 4.1, 4.2 병렬 진행 가능
- Epic 4.1, 4.2 완료 후 → Epic 4.3, 4.4, 4.5 병렬 진행 가능

### 완료 기준 (Definition of Done)
- ✅ 검색 기능 정상 동작 (제목/요약/태그 검색)
- ✅ 관련 자료 추천 섹션 정상 표시
- ✅ 모든 페이지 반응형 확인 (모바일/태블릿/데스크톱)
- ✅ 키보드로 모든 기능 접근 가능
- ✅ ARIA 속성 추가 완료
- ✅ 색상 대비 WCAG AA 기준 충족

### 위험요소
- **기술적 위험**: 검색 성능 이슈 (완화: 클라이언트 사이드 debounce 적용, 서버 사이드 검색 고려)
- **일정 위험**: 접근성 개선 범위 확대 (완화: 핵심 요소 위주로 먼저 적용, 추후 점진적 개선)

---

## Phase 5: 최적화 및 배포

### 목표
성능 최적화, SEO 설정, 캐싱 전략 적용, Vercel 배포를 완료합니다.

### 왜 이 순서인가?
- 모든 기능이 완성된 후 성능 최적화를 진행하는 것이 효율적
- SEO 설정은 배포 전 필수 작업
- 배포 후 모니터링을 통해 실제 사용자 환경에서 이슈 파악

### 주요 기능
- ISR (Incremental Static Regeneration) 적용
- 이미지 최적화
- SEO 메타태그 설정
- Vercel 배포

### 기술 작업

#### Epic 5.1: 성능 최적화
- **Story 5.1.1**: ISR 설정
  - 설명: `app/materials/page.tsx`, `app/materials/[id]/page.tsx`에 `revalidate` 옵션 추가 (예: 60초)
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Infrastructure

- **Story 5.1.2**: 이미지 최적화
  - 설명: Next.js `Image` 컴포넌트로 Notion 이미지 렌더링, lazy loading 적용
  - 예상 소요시간: 2시간
  - 담당 레이어: UI

- **Story 5.1.3**: 번들 크기 분석 및 최적화
  - 설명: `@next/bundle-analyzer` 설치, 불필요한 의존성 제거
  - 예상 소요시간: 2시간
  - 담당 레이어: Infrastructure

- **Story 5.1.4**: 코드 스플리팅 적용
  - 설명: 필요시 `dynamic import` 활용, 라우트 기반 코드 스플리팅 확인
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Infrastructure

#### Epic 5.2: SEO 설정
- **Story 5.2.1**: 메타태그 설정
  - 설명: `app/layout.tsx`, `app/page.tsx`, `app/materials/page.tsx`에 메타태그 추가 (title, description, OG tags)
  - 예상 소요시간: 2시간
  - 담당 레이어: Infrastructure

- **Story 5.2.2**: sitemap.xml 생성
  - 설명: `app/sitemap.ts` 작성 (모든 자료 URL 포함)
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Infrastructure

- **Story 5.2.3**: robots.txt 생성
  - 설명: `app/robots.ts` 작성
  - 예상 소요시간: 30분
  - 담당 레이어: Infrastructure

- **Story 5.2.4**: 구조화된 데이터 추가 (선택 사항)
  - 설명: JSON-LD 형식으로 Article schema 추가
  - 예상 소요시간: 2시간
  - 담당 레이어: Infrastructure

#### Epic 5.3: 에러 처리 및 로깅
- **Story 5.3.1**: 전역 에러 핸들러 작성
  - 설명: `app/error.tsx` 작성
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Infrastructure

- **Story 5.3.2**: 로깅 시스템 구축 (선택 사항)
  - 설명: Sentry 또는 Vercel Analytics 연동
  - 예상 소요시간: 2시간
  - 담당 레이어: Infrastructure

#### Epic 5.4: 배포 및 모니터링
- **Story 5.4.1**: Vercel 프로젝트 생성 및 환경 변수 설정
  - 설명: Vercel 대시보드에서 프로젝트 생성, `NOTION_API_KEY`, `NOTION_DATABASE_ID` 환경 변수 추가
  - 예상 소요시간: 1시간
  - 담당 레이어: Infrastructure

- **Story 5.4.2**: 프로덕션 배포
  - 설명: GitHub 연동, 자동 배포 설정
  - 예상 소요시간: 1시간
  - 담당 레이어: Infrastructure

- **Story 5.4.3**: 배포 후 테스트
  - 설명: 프로덕션 환경에서 모든 기능 정상 동작 확인
  - 예상 소요시간: 2시간
  - 담당 레이어: QA

- **Story 5.4.4**: 성능 측정 (Lighthouse)
  - 설명: Lighthouse 스코어 측정, 90점 이상 목표
  - 예상 소요시간: 1시간
  - 담당 레이어: QA

- **Story 5.4.5**: 도메인 연결 (선택 사항)
  - 설명: 커스텀 도메인 설정 및 SSL 인증서 확인
  - 예상 소요시간: 1시간
  - 담당 레이어: Infrastructure

#### Epic 5.5: 문서화
- **Story 5.5.1**: README.md 작성
  - 설명: 프로젝트 소개, 설치 방법, 환경 변수 설정 가이드
  - 예상 소요시간: 2시간
  - 담당 레이어: Documentation

- **Story 5.5.2**: 운영 가이드 작성
  - 설명: Notion 데이터베이스 사용 방법, 자료 등록 가이드
  - 예상 소요시간: 1.5시간
  - 담당 레이어: Documentation

### 예상 소요 기간
- **1주** (5 영업일)
- Epic 5.1: 1.5일
- Epic 5.2: 1.5일
- Epic 5.3: 0.5일
- Epic 5.4: 1일
- Epic 5.5: 0.5일

### 종속성
- Phase 4 완료 후 → Epic 5.1, 5.2, 5.3 병렬 진행 가능
- Epic 5.1, 5.2, 5.3 완료 후 → Epic 5.4 시작 가능
- Epic 5.4 완료 후 → Epic 5.5 시작 가능

### 완료 기준 (Definition of Done)
- ✅ ISR 캐싱 정상 동작 (Notion 데이터 변경 시 60초 후 반영)
- ✅ Lighthouse 성능 점수 90점 이상
- ✅ SEO 메타태그 모든 페이지 적용 완료
- ✅ sitemap.xml, robots.txt 생성 확인
- ✅ Vercel 배포 성공 및 프로덕션 환경 정상 동작
- ✅ README.md 및 운영 가이드 작성 완료

### 위험요소
- **기술적 위험**: ISR revalidate 시간 설정 오류 (완화: Vercel 문서 참고, 테스트 환경에서 검증)
- **기술적 위험**: Notion API rate limit으로 인한 빌드 실패 (완화: ISR 적용으로 빌드 시 전체 데이터 fetch 불필요, on-demand revalidation 고려)
- **일정 위험**: 배포 후 예상치 못한 에러 발생 (완화: 로깅 시스템 구축, Vercel 로그 모니터링)

---

## 타임라인 및 마일스톤

| Phase | 기간 | 시작일 | 종료일 | 주요 마일스톤 |
|-------|------|--------|--------|---------------|
| Phase 1 | 1주 | Week 1 | Week 1 | 프로젝트 초기 설정 완료, 레이아웃 구현 |
| Phase 2 | 1.5주 | Week 2 | Week 3 중반 | Notion API 연동 완료, 데이터 레이어 구축 |
| Phase 3 | 2주 | Week 3 중반 | Week 5 중반 | 핵심 기능 완성 (목록/상세/필터) |
| Phase 4 | 1.5주 | Week 5 중반 | Week 7 초반 | 검색/추천/반응형/접근성 완료 |
| Phase 5 | 1주 | Week 7 초반 | Week 7 | 최적화 및 배포 완료 |

### 주요 체크포인트
- **Week 1 종료**: 프로젝트 골격 완성, 개발 환경 준비 완료
- **Week 3 중반**: Notion 데이터 정상 조회, 타입 정의 완료
- **Week 5 중반**: MVP 기능 완성 (자료 목록/상세/필터)
- **Week 7 초반**: 검색/추천 기능 완료, 반응형 확인
- **Week 7 종료**: 프로덕션 배포 완료

---

## 기술 아키텍처 개요

### 레이어드 아키텍처
```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (app/, components/)                │
│  - Server Components (RSC)          │
│  - Client Components (UI 인터랙션) │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│          Service Layer              │
│  (services/)                        │
│  - 비즈니스 로직                    │
│  - DTO 변환                         │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│         Repository Layer            │
│  (lib/notion/)                      │
│  - Notion API 호출                  │
│  - 데이터 매핑                      │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│          External API               │
│  (Notion API)                       │
└─────────────────────────────────────┘
```

### 데이터 흐름
1. **사용자 요청** → Server Component (app/)
2. **Service Layer 호출** → `StudyMaterialService`
3. **Repository Layer 호출** → Notion API 쿼리
4. **데이터 변환** → DTO로 매핑
5. **UI 렌더링** → React Component

### 캐싱 전략
- **ISR (Incremental Static Regeneration)**: 60초 revalidate
- **Notion API 응답**: Next.js 자체 캐싱 활용
- **정적 자산**: Vercel CDN 캐싱

---

## 릴리스 계획

### v1.0.0 (MVP) - Week 7
- Notion API 연동
- 자료 목록/상세 페이지
- 카테고리/태그/Type 필터링
- 검색 기능 (기본형)
- 반응형 디자인
- Vercel 배포

### v1.1.0 (향후 계획) - 배포 후 4주
- 사용자 인증 (선택 사항)
- 댓글 기능 (선택 사항)
- 자료 북마크 기능
- 다운로드 통계
- 관리자 대시보드 (선택 사항)

### v1.2.0 (향후 계획) - 배포 후 8주
- 다국어 지원 (i18n)
- RSS 피드
- 자료 평가 기능
- 고급 검색 (날짜 범위, 다중 조건)

---

## 위험 관리

### 높은 위험도
| 위험 | 영향 | 확률 | 완화 방안 |
|------|------|------|-----------|
| Notion API rate limit 초과 | 높음 | 중간 | ISR 캐싱 적용, 필요시 on-demand revalidation |
| Notion Block 렌더링 복잡도 | 높음 | 높음 | 우선순위 블록만 지원, react-notion-x 라이브러리 검토 |

### 중간 위험도
| 위험 | 영향 | 확률 | 완화 방안 |
|------|------|------|-----------|
| 검색 성능 이슈 | 중간 | 중간 | 클라이언트 debounce, 서버 사이드 검색 |
| 타입 정의 복잡도 증가 | 중간 | 높음 | 필수 필드 위주 정의, 점진적 확장 |

### 낮은 위험도
| 위험 | 영향 | 확률 | 완화 방안 |
|------|------|------|-----------|
| shadcn/ui 컴포넌트 설정 오류 | 낮음 | 낮음 | 공식 CLI 사용, 예제 참고 |
| Vercel 배포 실패 | 낮음 | 낮음 | 배포 전 로컬 빌드 테스트 |

---

## 팀 협업 가이드

### 브랜치 전략
- `main`: 프로덕션 배포 브랜치
- `develop`: 개발 통합 브랜치
- `feature/[phase]-[epic]-[story]`: 기능 개발 브랜치
  - 예: `feature/phase2-epic2.3-notion-repository`

### 커밋 메시지 규칙
```
[Phase X] Epic X.X: Story 설명

- 변경사항 1
- 변경사항 2
```
예시:
```
[Phase 2] Epic 2.3: Notion 데이터베이스 쿼리 함수 구현

- queryDatabase() 함수 작성
- Status = 공개 필터 적용
- 타입 안정성 확보
```

### 코드 리뷰 기준
- TypeScript strict 모드 에러 없음
- ESLint 검사 통과
- 반응형 확인 (모바일/태블릿/데스크톱)
- 주석 작성 (복잡한 로직)
- 컴포넌트 분리 및 재사용성

---

## 부록

### 필요한 shadcn/ui 컴포넌트 목록
- Button
- Card
- Badge
- Input
- Select
- Checkbox
- Popover
- Separator
- Skeleton
- Alert
- Accordion
- Toast
- ToggleGroup
- NavigationMenu

### 추가 라이브러리 검토 목록
- `react-notion-x`: Notion Block 렌더링 (선택 사항)
- `@next/bundle-analyzer`: 번들 크기 분석
- `framer-motion`: 애니메이션 (선택 사항)
- `sentry`: 에러 로깅 (선택 사항)

### 참고 문서
- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 App Router 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [Tailwind CSS v4 문서](https://tailwindcss.com/)

---

## 변경 이력
- 2026-01-13: 초기 로드맵 작성

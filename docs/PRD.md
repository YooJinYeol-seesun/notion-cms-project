# PRD - Notion CMS 기반 스터디 자료실

## 1. 프로젝트 개요

- 프로젝트명: **스터디 자료실**
- 목적: **Notion을 CMS로 활용한 스터디 자료 공유/열람 웹 서비스**
- CMS 선택 이유: **Notion에서 자료 등록/수정하면 자동으로 웹에 반영**
  - 운영자는 Notion에서 문서/링크 업로드만 하면 됨
  - 참여자는 웹에서 카테고리/태그/검색으로 쉽게 탐색 가능

---

## 2. 주요 기능

1. **Notion 데이터베이스에서 자료 목록 가져오기**
   - 최신순 정렬
   - 상태(Status)가 “공개”인 자료만 노출

2. **개별 자료 상세 페이지 표시**
   - Notion 페이지 content를 웹에서 렌더링
   - 코드블록/이미지/콜아웃/링크 등 지원

3. **카테고리별 필터링**
   - 카테고리별로 자료 목록 필터
   - (예: Frontend / Backend / CS / DevOps / Algorithm 등)

4. **검색 기능**
   - 제목/요약/태그 기준 검색
   - 입력 즉시 결과 필터링

5. **반응형 디자인**
   - 모바일/태블릿/PC 대응
   - 스터디 환경(폰 열람) 고려

---

## 3. 기술 스택

- Frontend: **Next.js 15, TypeScript**
- CMS: **Notion API (@notionhq/client)**
- Styling: **Tailwind CSS, shadcn/ui**
- Icons: **Lucide React**
- Deployment: **Vercel**

---

## 4. Notion 데이터베이스 구조

Notion Database: `StudyMaterials`

- **Title**: 자료 제목 (`title`)
- **Category**: 카테고리 (`select`)
- **Tags**: 태그 (`multi_select`)
- **Published**: 게시일 (`date`)
- **Status**: 상태 (`select`) - `비공개` / `공개`
- **Type**: 자료 유형 (`select`) - `문서` / `링크` / `영상` / `PDF`
- **Summary**: 요약 (`rich_text`)
- **Attachment**: 첨부파일 (`files`) - 선택
- **Content**: 본문 (`page content`)

> 웹 노출 규칙:  
> - `Status = 공개` AND `Published 날짜 존재` 조건을 만족하는 자료만 노출

---

## 5. 화면 구성

### 5.1 홈 (/)
- 최근 업로드 자료 N개
- 카테고리 바로가기 버튼
- 태그 Top N 표시

### 5.2 자료 목록 (/materials)
- 자료 리스트 (카드형)
- 필터 UI
  - 카테고리 선택
  - 태그 선택 (multi)
  - 자료 유형(Type) 선택
- 검색바

### 5.3 자료 상세 (/materials/[id] 또는 /materials/[slug])
- 제목 / 카테고리 / 태그 / 게시일
- Notion 본문 렌더링
- 첨부파일 다운로드
- 관련 자료 추천 (같은 태그 기반)

---

## 6. MVP 범위

- Notion API 연동
- 자료 목록 및 상세 페이지
- 카테고리/태그 필터
- 검색 기능(기본형)
- 기본 스타일링 + 반응형

---

## 7. 구현 단계

1. **Notion API 패키지 설치 및 환경 설정**
   - `@notionhq/client` 설치
   - `.env.local` 세팅

2. **Notion 데이터베이스 생성 및 API 키 설정**
   - Notion integration 생성 및 토큰 발급
   - DB에 integration 공유(접근 권한 부여)

3. **자료 목록 페이지 구현**
   - Notion DB query로 목록 fetch
   - 공개 조건 필터 적용
   - 목록 UI 구성

4. **자료 상세 페이지 구현**
   - page id 기반 조회
   - Notion blocks 렌더링 적용

5. **스타일링 및 최적화**
   - Tailwind + shadcn/ui 적용
   - 모바일 반응형
   - ISR / revalidate 캐싱 적용

---

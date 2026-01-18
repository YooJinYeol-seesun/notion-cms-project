// Notion API 응답 타입 정의
// @notionhq/client의 타입을 확장하거나 래핑

import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Notion 페이지 타입
export type NotionPage = PageObjectResponse;

// Notion 데이터베이스 쿼리 결과
export interface NotionDatabaseQueryResult {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

// Notion 블록 타입 (추후 확장)
export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

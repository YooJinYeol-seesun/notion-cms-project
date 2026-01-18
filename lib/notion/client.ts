import { Client } from "@notionhq/client";

// Notion 클라이언트 초기화
// 환경 변수가 없는 경우에도 빌드가 가능하도록 처리
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY || "",
});

// Notion 데이터베이스 ID
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

// Notion API 사용 가능 여부 확인
export const isNotionConfigured = () => {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
};

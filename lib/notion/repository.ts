import { notionClient, NOTION_DATABASE_ID, isNotionConfigured } from "./client";
import { NotionPage } from "@/types/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * Notion 데이터베이스에서 공개된 자료 목록 조회
 * Status = "공개" 조건 필터 적용
 */
export async function queryPublishedMaterials(): Promise<NotionPage[]> {
  if (!isNotionConfigured()) {
    console.warn("Notion API가 설정되지 않았습니다.");
    return [];
  }

  try {
    const queryParams = {
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "공개",
        },
      },
      sorts: [
        {
          property: "Published",
          direction: "descending" as const,
        },
      ],
    };

    // @ts-expect-error - Notion SDK 타입 정의 불일치 (실제로는 동작함)
    const response = await notionClient.databases.query(queryParams);

    return response.results as NotionPage[];
  } catch (error) {
    console.error("Notion API 조회 실패:", error);
    return [];
  }
}

/**
 * Notion 페이지 ID로 개별 자료 조회
 */
export async function getPageById(pageId: string): Promise<NotionPage | null> {
  if (!isNotionConfigured()) {
    console.warn("Notion API가 설정되지 않았습니다.");
    return null;
  }

  try {
    const response = await notionClient.pages.retrieve({ page_id: pageId });
    return response as NotionPage;
  } catch (error) {
    console.error("Notion 페이지 조회 실패:", error);
    return null;
  }
}

/**
 * Notion 페이지의 블록 내용 조회
 */
export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  if (!isNotionConfigured()) {
    console.warn("Notion API가 설정되지 않았습니다.");
    return [];
  }

  try {
    const response = await notionClient.blocks.children.list({
      block_id: pageId,
    });
    return response.results as BlockObjectResponse[];
  } catch (error) {
    console.error("Notion 블록 조회 실패:", error);
    return [];
  }
}

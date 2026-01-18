import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// 자료 유형
export type MaterialType = "문서" | "링크" | "영상" | "PDF";

// 자료 상태
export type MaterialStatus = "비공개" | "공개";

// 카테고리 타입 (추후 확장 가능)
export type Category = string;

// 태그 타입
export type Tag = string;

// 스터디 자료 기본 타입
export interface StudyMaterial {
  id: string;
  title: string;
  category: Category;
  tags: Tag[];
  published: string; // ISO 8601 날짜 형식
  status: MaterialStatus;
  type: MaterialType;
  summary: string;
  attachment?: string; // 첨부파일 URL
  url?: string; // Notion 페이지 URL
}

// 스터디 자료 상세 타입 (본문 포함)
export interface StudyMaterialDetail extends StudyMaterial {
  content: BlockObjectResponse[]; // Notion blocks
}

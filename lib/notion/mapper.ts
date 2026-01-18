import { NotionPage } from "@/types/notion";
import { StudyMaterial, MaterialType, MaterialStatus } from "@/types/studyMaterial";

/**
 * Notion 페이지를 StudyMaterial 타입으로 변환
 */
export function mapToStudyMaterial(page: NotionPage): StudyMaterial | null {
  try {
    const properties = page.properties;

    // 제목 추출
    const titleProperty = properties.Title || properties.제목 || properties.title;
    const title = titleProperty?.type === "title"
      ? titleProperty.title[0]?.plain_text || "제목 없음"
      : "제목 없음";

    // 카테고리 추출
    const categoryProperty = properties.Category || properties.카테고리;
    const category = categoryProperty?.type === "select"
      ? categoryProperty.select?.name || "미분류"
      : "미분류";

    // 태그 추출
    const tagsProperty = properties.Tags || properties.태그;
    const tags = tagsProperty?.type === "multi_select"
      ? tagsProperty.multi_select.map((tag) => tag.name)
      : [];

    // 게시일 추출
    const publishedProperty = properties.Published || properties.게시일;
    const published = publishedProperty?.type === "date"
      ? publishedProperty.date?.start || new Date().toISOString()
      : new Date().toISOString();

    // 상태 추출
    const statusProperty = properties.Status || properties.상태;
    const status = (statusProperty?.type === "select"
      ? statusProperty.select?.name
      : "비공개") as MaterialStatus;

    // 자료 유형 추출
    const typeProperty = properties.Type || properties.유형;
    const type = (typeProperty?.type === "select"
      ? typeProperty.select?.name
      : "문서") as MaterialType;

    // 요약 추출
    const summaryProperty = properties.Summary || properties.요약;
    const summary = summaryProperty?.type === "rich_text"
      ? summaryProperty.rich_text[0]?.plain_text || ""
      : "";

    // 첨부파일 추출
    const attachmentProperty = properties.Attachment || properties.첨부파일;
    let attachment: string | undefined;
    if (attachmentProperty?.type === "files" && attachmentProperty.files && attachmentProperty.files.length > 0) {
      const file = attachmentProperty.files[0];
      if (file.type === "file") {
        attachment = file.file?.url;
      } else if (file.type === "external") {
        attachment = file.external?.url;
      }
    }

    return {
      id: page.id,
      title,
      category,
      tags,
      published,
      status,
      type,
      summary,
      attachment,
      url: page.url,
    };
  } catch (error) {
    console.error("Notion 페이지 매핑 실패:", error);
    return null;
  }
}

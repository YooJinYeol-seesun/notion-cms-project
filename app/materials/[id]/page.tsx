import type { Metadata } from "next";
import { StudyMaterialService } from "@/services/studyMaterialService";
import MaterialHeader from "@/components/materials/MaterialHeader";
import BlockRenderer from "@/components/notion/BlockRenderer";
import RelatedMaterials from "@/components/materials/RelatedMaterials";
import { notFound } from "next/navigation";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface MaterialDetailPageProps {
  params: Promise<{ id: string }>;
}

// ISR: 60초마다 페이지 재검증
export const revalidate = 60;

// 동적 라우트의 모든 자료 ID를 미리 생성 (정적 생성)
export async function generateStaticParams() {
  try {
    const materials = await StudyMaterialService.getAllMaterials();
    return materials.map((material) => ({
      id: material.id,
    }));
  } catch (error) {
    console.warn("정적 파라미터 생성 실패:", error);
    return [];
  }
}

// 동적 메타태그 생성
export async function generateMetadata(
  { params }: MaterialDetailPageProps
): Promise<Metadata> {
  try {
    const { id } = await params;
    const material = await StudyMaterialService.getMaterialById(id);

    if (!material) {
      return {
        title: "자료를 찾을 수 없습니다 - 스터디 자료실",
      };
    }

    return {
      title: `${material.title} - 스터디 자료실`,
      description: material.summary || material.title,
      keywords: [material.category, ...material.tags],
      openGraph: {
        title: material.title,
        description: material.summary || material.title,
        type: "article",
        publishedTime: material.published,
      },
    };
  } catch (error) {
    console.warn("메타데이터 생성 실패:", error);
    return {
      title: "스터디 자료실",
    };
  }
}

export default async function MaterialDetailPage({
  params,
}: MaterialDetailPageProps) {
  const { id } = await params;

  // 자료 상세 조회
  const material = await StudyMaterialService.getMaterialById(id);

  if (!material) {
    notFound();
  }

  // 관련 자료 조회
  const relatedMaterials = await StudyMaterialService.getRelatedMaterials(id, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 자료 헤더 */}
      <MaterialHeader material={material} />

      {/* 구분선 */}
      <div className="border-t my-8" />

      {/* 자료 본문 */}
      <div className="max-w-3xl mb-12">
        {material.content && material.content.length > 0 ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {material.content.map((block: BlockObjectResponse) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>
        ) : (
          <div className="bg-muted/50 p-8 rounded-lg text-center text-muted-foreground">
            본문이 없습니다.
          </div>
        )}
      </div>

      {/* 관련 자료 추천 */}
      <RelatedMaterials materials={relatedMaterials} />
    </div>
  );
}

import type { Metadata } from "next";
import { StudyMaterialService } from "@/services/studyMaterialService";
import MaterialList from "@/components/materials/MaterialList";
import SearchBar from "@/components/materials/SearchBar";
import CategoryFilter from "@/components/materials/CategoryFilter";
import TagFilter from "@/components/materials/TagFilter";
import TypeFilter from "@/components/materials/TypeFilter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "자료 목록 - 스터디 자료실",
  description: "등록된 모든 스터디 자료를 검색하고 카테고리별로 탐색합니다.",
  keywords: ["자료 목록", "검색", "필터", "카테고리"],
  openGraph: {
    title: "자료 목록 - 스터디 자료실",
    description: "등록된 모든 스터디 자료를 검색하고 탐색합니다.",
    type: "website",
  },
};

interface MaterialsPageProps {
  searchParams: Promise<{
    category?: string;
    tags?: string | string[];
    type?: string;
    query?: string;
  }>;
}

export default async function MaterialsPage({
  searchParams,
}: MaterialsPageProps) {
  const params = await searchParams;

  // 필터 옵션 구성
  const filterOptions = {
    category: params.category,
    tags: typeof params.tags === "string" ? [params.tags] : params.tags,
    type: params.type,
    query: params.query,
  };

  // 필터링된 자료 조회
  const materials = await StudyMaterialService.searchMaterials(filterOptions);

  // 카테고리 조회
  const categoriesMap = await StudyMaterialService.getCategoriesWithCount();
  const categories = Array.from(categoriesMap.keys());

  // 모든 태그 조회 (필터용)
  const allMaterials = await StudyMaterialService.getAllMaterials();
  const allTags = Array.from(
    new Set(allMaterials.flatMap((m) => m.tags))
  ).sort();

  // 활성화된 필터 확인
  const hasActiveFilters =
    params.category || params.tags || params.type || params.query;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">자료 목록</h1>
        <p className="mt-2 text-muted-foreground">
          스터디 자료를 검색하고 카테고리별로 탐색하세요.
        </p>
      </div>

      {/* 필터 영역 */}
      <div className="mb-8 rounded-lg border bg-card p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-4">
            <SearchBar />
          </div>
          <CategoryFilter categories={categories} />
          <TypeFilter />
          <div className="lg:col-span-2">
            <TagFilter allTags={allTags} />
          </div>
        </div>

        {/* 필터 초기화 버튼 */}
        {hasActiveFilters && (
          <div className="mt-6 pt-6 border-t">
            <Link
              href="/materials"
              className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              필터 초기화
            </Link>
          </div>
        )}
      </div>

      {/* 활성화된 필터 요약 */}
      {hasActiveFilters && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            검색 결과: <span className="font-semibold">{materials.length}개</span>의 자료
            {params.query && ` ("${params.query}")`}
          </p>
        </div>
      )}

      {/* 자료 목록 */}
      <MaterialList materials={materials} />
    </div>
  );
}

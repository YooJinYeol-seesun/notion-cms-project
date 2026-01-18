import type { Metadata } from "next";
import Link from "next/link";
import { StudyMaterialService } from "@/services/studyMaterialService";
import MaterialList from "@/components/materials/MaterialList";

// ISR: 60초마다 페이지 재검증
export const revalidate = 60;

export const metadata: Metadata = {
  title: "스터디 자료실 - Notion CMS 기반 학습 자료 공유 플랫폼",
  description:
    "Notion을 활용한 스터디 자료실입니다. 다양한 학습 자료를 카테고리별로 검색하고 탐색할 수 있습니다.",
  keywords: [
    "스터디",
    "학습자료",
    "자료공유",
    "Notion",
    "CMS",
    "교육",
    "학습",
  ],
  openGraph: {
    title: "스터디 자료실",
    description: "Notion 기반의 스터디 자료 공유 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "스터디 자료실",
    description: "Notion 기반의 스터디 자료 공유 플랫폼",
  },
};

export default async function Home() {
  // 최근 자료 조회 (상위 6개)
  const allMaterials = await StudyMaterialService.getAllMaterials();
  const recentMaterials = allMaterials.slice(0, 6);

  // 카테고리 조회
  const categoriesMap = await StudyMaterialService.getCategoriesWithCount();
  const categories = Array.from(categoriesMap.entries());

  // 인기 태그 조회 (상위 8개)
  const topTags = await StudyMaterialService.getTopTags(8);

  return (
    <div>
      {/* Hero 섹션 */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            스터디 자료실
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Notion을 CMS로 활용한 스터디 자료 공유 플랫폼입니다.
            <br />
            자료를 쉽게 검색하고 카테고리별로 탐색할 수 있습니다.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/materials"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              자료 둘러보기
            </Link>
          </div>
        </div>
      </div>

      {/* 최근 자료 섹션 */}
      {recentMaterials.length > 0 && (
        <div className="border-t py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">최근 자료</h2>
              <p className="text-muted-foreground">
                가장 최근에 등록된 자료들입니다.
              </p>
            </div>
            <MaterialList materials={recentMaterials} />
            <div className="mt-8 text-center">
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                모든 자료 보기 →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 카테고리 바로가기 섹션 */}
      {categories.length > 0 && (
        <div className="border-t py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">카테고리</h2>
              <p className="text-muted-foreground">
                관심있는 카테고리를 선택해서 자료를 탐색하세요.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map(([category, count]) => (
                <Link
                  key={category}
                  href={`/materials?category=${encodeURIComponent(category)}`}
                  className="rounded-lg border bg-card p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="font-semibold">{category}</div>
                  <div className="text-sm text-muted-foreground">
                    {count}개 자료
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 인기 태그 섹션 */}
      {topTags.length > 0 && (
        <div className="border-t py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">인기 태그</h2>
              <p className="text-muted-foreground">
                가장 많이 사용된 태그들입니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {topTags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/materials?tags=${encodeURIComponent(tag)}`}
                  className="inline-block bg-muted hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-full text-sm transition-colors"
                >
                  #{tag}
                  <span className="ml-2 text-xs">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

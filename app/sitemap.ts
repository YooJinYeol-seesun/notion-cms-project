import { MetadataRoute } from "next";
import { StudyMaterialService } from "@/services/studyMaterialService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // 기본 페이지
    const baseUrls: MetadataRoute.Sitemap = [
      {
        url: "https://example.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: "https://example.com/materials",
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 0.8,
      },
    ];

    // 모든 자료 페이지
    const materials = await StudyMaterialService.getAllMaterials();
    const materialUrls: MetadataRoute.Sitemap = materials.map((material) => ({
      url: `https://example.com/materials/${material.id}`,
      lastModified: material.published,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...baseUrls, ...materialUrls];
  } catch (error) {
    console.warn("Sitemap 생성 실패:", error);
    return [
      {
        url: "https://example.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}

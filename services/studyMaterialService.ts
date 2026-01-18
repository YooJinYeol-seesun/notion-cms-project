import { queryPublishedMaterials, getPageById, getPageBlocks } from "@/lib/notion/repository";
import { mapToStudyMaterial } from "@/lib/notion/mapper";
import { StudyMaterial, StudyMaterialDetail } from "@/types/studyMaterial";
import { FilterOptions } from "@/types/dto";

/**
 * 스터디 자료 서비스 클래스
 */
export class StudyMaterialService {
  /**
   * 모든 공개 자료 조회
   */
  static async getAllMaterials(): Promise<StudyMaterial[]> {
    const pages = await queryPublishedMaterials();
    const materials = pages
      .map((page) => mapToStudyMaterial(page))
      .filter((material): material is StudyMaterial => material !== null);
    return materials;
  }

  /**
   * ID로 자료 상세 조회
   */
  static async getMaterialById(id: string): Promise<StudyMaterialDetail | null> {
    const page = await getPageById(id);

    if (!page) {
      return null;
    }

    const material = mapToStudyMaterial(page);

    if (!material) {
      return null;
    }

    const blocks = await getPageBlocks(id);

    return {
      ...material,
      content: blocks,
    };
  }

  /**
   * 필터 옵션에 따라 자료 검색
   */
  static async searchMaterials(options: FilterOptions): Promise<StudyMaterial[]> {
    const allMaterials = await this.getAllMaterials();

    return allMaterials.filter((material) => {
      // 카테고리 필터
      if (options.category && material.category !== options.category) {
        return false;
      }

      // 태그 필터 (AND 조건)
      if (options.tags && options.tags.length > 0) {
        const hasAllTags = options.tags.every((tag) => material.tags.includes(tag));
        if (!hasAllTags) {
          return false;
        }
      }

      // 자료 유형 필터
      if (options.type && material.type !== options.type) {
        return false;
      }

      // 검색 쿼리 (제목, 요약, 태그)
      if (options.query) {
        const query = options.query.toLowerCase();
        const titleMatch = material.title.toLowerCase().includes(query);
        const summaryMatch = material.summary.toLowerCase().includes(query);
        const tagMatch = material.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!titleMatch && !summaryMatch && !tagMatch) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * 특정 자료와 같은 태그를 가진 관련 자료 조회
   */
  static async getRelatedMaterials(materialId: string, limit: number = 3): Promise<StudyMaterial[]> {
    const material = await this.getMaterialById(materialId);
    if (!material) {
      return [];
    }

    const allMaterials = await this.getAllMaterials();

    // 같은 태그를 가진 자료 필터링 (자신 제외)
    const related = allMaterials
      .filter((m) => m.id !== materialId && m.tags.some((tag) => material.tags.includes(tag)))
      .sort((a, b) => {
        // 공통 태그가 많은 순서로 정렬
        const aCommon = a.tags.filter((tag) => material.tags.includes(tag)).length;
        const bCommon = b.tags.filter((tag) => material.tags.includes(tag)).length;
        return bCommon - aCommon;
      })
      .slice(0, limit);

    return related;
  }

  /**
   * 모든 카테고리와 각 카테고리의 자료 개수 조회
   */
  static async getCategoriesWithCount(): Promise<Map<string, number>> {
    const materials = await this.getAllMaterials();
    const categoryCount = new Map<string, number>();

    materials.forEach((material) => {
      const count = categoryCount.get(material.category) || 0;
      categoryCount.set(material.category, count + 1);
    });

    // 알파벳 순 정렬
    return new Map([...categoryCount.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  }

  /**
   * 가장 많이 사용된 태그 N개 조회
   */
  static async getTopTags(limit: number = 10): Promise<Array<{ tag: string; count: number }>> {
    const materials = await this.getAllMaterials();
    const tagCount = new Map<string, number>();

    materials.forEach((material) => {
      material.tags.forEach((tag) => {
        const count = tagCount.get(tag) || 0;
        tagCount.set(tag, count + 1);
      });
    });

    return [...tagCount.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
}

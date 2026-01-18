import { StudyMaterial, StudyMaterialDetail } from "./studyMaterial";

// 자료 목록 DTO
export interface StudyMaterialListDTO {
  materials: StudyMaterial[];
  total: number;
}

// 자료 상세 DTO (StudyMaterialDetail과 동일)
export type StudyMaterialDetailDTO = StudyMaterialDetail;

// 필터 옵션 DTO
export interface FilterOptions {
  category?: string;
  tags?: string[];
  type?: string;
  query?: string; // 검색 쿼리
}

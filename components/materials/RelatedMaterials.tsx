import { StudyMaterial } from "@/types/studyMaterial";
import MaterialCard from "./MaterialCard";

interface RelatedMaterialsProps {
  materials: StudyMaterial[];
}

export default function RelatedMaterials({ materials }: RelatedMaterialsProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t pt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">관련 자료</h2>
        <p className="text-muted-foreground">
          같은 태그를 가진 다른 자료들입니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
}

import { StudyMaterial } from "@/types/studyMaterial";
import MaterialCard from "./MaterialCard";

interface MaterialListProps {
  materials: StudyMaterial[];
}

export default function MaterialList({ materials }: MaterialListProps) {
  if (materials.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="text-muted-foreground">
          등록된 자료가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}

import Link from "next/link";
import { StudyMaterial } from "@/types/studyMaterial";

interface MaterialCardProps {
  material: StudyMaterial;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Link href={`/materials/${material.id}`}>
      <div className="h-full rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
          {material.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {material.summary || "요약 없음"}
        </p>

        {/* 카테고리와 타입 배지 */}
        <div className="flex gap-2 flex-wrap mb-4">
          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium">
            {material.category}
          </span>
          <span className="inline-block bg-secondary/10 text-secondary-foreground text-xs px-2 py-1 rounded">
            {material.type}
          </span>
        </div>

        {/* 태그 */}
        {material.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-4">
            {material.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {material.tags.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{material.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 게시일 */}
        <div className="text-xs text-muted-foreground">
          {new Date(material.published).toLocaleDateString("ko-KR")}
        </div>
      </div>
    </Link>
  );
}

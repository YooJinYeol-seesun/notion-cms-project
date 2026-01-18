import { StudyMaterial } from "@/types/studyMaterial";

interface MaterialHeaderProps {
  material: StudyMaterial;
}

export default function MaterialHeader({ material }: MaterialHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded font-medium">
          {material.category}
        </span>
        <span className="inline-block bg-secondary/10 text-secondary-foreground text-sm px-3 py-1 rounded">
          {material.type}
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{material.title}</h1>

      {/* 태그 */}
      {material.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {material.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-muted text-muted-foreground text-sm px-3 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 메타 정보 */}
      <div className="flex flex-col gap-2 text-sm text-muted-foreground border-t pt-4">
        <div>
          게시일: {new Date(material.published).toLocaleDateString("ko-KR")}
        </div>
        {material.attachment && (
          <div>
            <a
              href={material.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:bg-primary/90 transition-colors"
            >
              첨부파일 다운로드
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

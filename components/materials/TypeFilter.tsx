'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const MATERIAL_TYPES = ['문서', '링크', '영상', 'PDF'];

export default function TypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedType = searchParams.get('type');

  const handleTypeChange = (type: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (type === selectedType) {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }

    const queryString = newParams.toString();
    router.push(`/materials${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">자료 유형</label>
      <div className="flex flex-wrap gap-2">
        {MATERIAL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
            aria-pressed={selectedType === type}
            aria-label={`${type} 유형 ${selectedType === type ? '선택됨' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

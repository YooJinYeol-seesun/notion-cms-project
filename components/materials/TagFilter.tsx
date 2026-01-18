'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TagFilterProps {
  allTags: string[];
}

export default function TagFilter({ allTags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTags = searchParams.getAll('tags');
  const [isOpen, setIsOpen] = useState(false);

  const handleTagChange = (tag: string) => {
    const newParams = new URLSearchParams(searchParams);

    // 기존 tags 모두 제거
    newParams.delete('tags');

    if (selectedTags.includes(tag)) {
      // 선택된 태그 제거
      selectedTags.filter((t) => t !== tag).forEach((t) => {
        newParams.append('tags', t);
      });
    } else {
      // 새로운 태그 추가
      selectedTags.forEach((t) => {
        newParams.append('tags', t);
      });
      newParams.append('tags', tag);
    }

    const queryString = newParams.toString();
    router.push(`/materials${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">태그</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 rounded-lg border bg-background text-left flex items-center justify-between hover:bg-muted transition-colors"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={selectedTags.length > 0 ? `선택된 태그: ${selectedTags.join(', ')}` : '태그 선택'}
        >
          <span className="text-sm">
            {selectedTags.length > 0
              ? `${selectedTags.length}개 선택됨`
              : '태그 선택'}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
            role="listbox"
          >
            {allTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="h-4 w-4 rounded cursor-pointer"
                  aria-label={tag}
                />
                <span className="text-sm">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-2 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => handleTagChange(tag)}
                className="hover:text-primary/80 transition-colors"
                aria-label={`${tag} 태그 제거`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

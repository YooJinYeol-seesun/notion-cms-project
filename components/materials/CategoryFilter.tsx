'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (category === selectedCategory) {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }

    const queryString = newParams.toString();
    router.push(`/materials${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">카테고리</label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
            aria-pressed={selectedCategory === category}
            aria-label={`${category} 카테고리 ${selectedCategory === category ? '선택됨' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

interface CategorySliderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySlider({ selectedCategory, onSelectCategory }: CategorySliderProps) {
  const [categories] = useLocalStorage<Category[]>('categories', []);
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      
      <div 
        ref={scrollContainer}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-4 px-8 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>🍽️</span>
          <span>Tümü</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.slug
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}
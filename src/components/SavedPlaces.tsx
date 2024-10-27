import React from 'react';
import { Bookmark, MapPin, Star } from 'lucide-react';
import type { SavedPlace } from '../types';

interface SavedPlacesProps {
  places: SavedPlace[];
  onCategoryChange: (category: string) => void;
}

export default function SavedPlaces({ places, onCategoryChange }: SavedPlacesProps) {
  const categories = [
    { id: 'want-to-go', label: 'Want to Go', icon: Bookmark },
    { id: 'visited', label: 'Visited', icon: MapPin },
    { id: 'favorite', label: 'Favorites', icon: Star },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b">
        <nav className="flex -mb-px">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="group inline-flex items-center px-6 py-4 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
            >
              <category.icon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-gray-500" />
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                {category.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        {/* Places grid will be rendered here based on selected category */}
      </div>
    </div>
  );
}
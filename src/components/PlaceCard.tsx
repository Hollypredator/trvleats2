import React from 'react';
import { Plus, Check, Star } from 'lucide-react';

interface Place {
  id: string;
  name: string;
  type: 'restaurant' | 'historical' | 'activity';
  image: string;
  rating: number;
  description: string;
  location: string;
}

interface PlaceCardProps {
  place: Place;
  onAdd: () => void;
  isAdded: boolean;
}

export default function PlaceCard({ place, onAdd, isAdded }: PlaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="relative">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onAdd}
          disabled={isAdded}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-all ${
            isAdded
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-600 hover:bg-indigo-600 hover:text-white'
          }`}
        >
          {isAdded ? (
            <Check className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
            <p className="text-sm text-gray-500">{place.description}</p>
          </div>
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {place.rating}
            </span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">{place.location}</div>
      </div>
    </div>
  );
}
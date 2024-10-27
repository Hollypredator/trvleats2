import React from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Place {
  id: string;
  name: string;
  type: 'historical' | 'restaurant';
  image: string;
  location: string;
  rating: number;
  status: 'active' | 'pending' | 'closed';
}

export default function NearbyPlaces() {
  const [places] = useLocalStorage<Place[]>('places', []);
  const activePlaces = places.filter(place => place.status === 'active');

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Yakınındaki Yerler</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePlaces.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Yakınınızda henüz mekan bulunmuyor.</p>
          </div>
        ) : (
          activePlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              <div className="h-48">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                <div className="flex items-center mt-2 text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{place.location}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {place.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">
                    Açık
                  </span>
                  <button
                    className="flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    <span className="text-sm">Yol tarifi al</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
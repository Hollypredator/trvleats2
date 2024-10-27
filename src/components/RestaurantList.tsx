import React from 'react';
import { Star, MapPin, Navigation, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  userName: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  reviews: Review[];
  location: string;
  coordinates: [number, number];
  plusCode: string;
}

interface RestaurantListProps {
  category: string;
}

export default function RestaurantList({ category }: RestaurantListProps) {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);

  const filteredRestaurants = category === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.cuisine.toLowerCase() === category);

  const getAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  if (restaurants.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <p className="text-gray-500">Henüz restoran bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredRestaurants.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Bu kategoride henüz restoran eklenmemiş.</p>
        </div>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div className="relative h-48">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
              <p className="text-gray-500 text-sm mt-1 capitalize">{restaurant.cuisine}</p>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700">{getAverageRating(restaurant.reviews)}</span>
                <span className="mx-1 text-gray-400">•</span>
                <MessageCircle className="h-4 w-4 text-gray-400" />
                <span className="ml-1 text-gray-500">{restaurant.reviews.length} değerlendirme</span>
              </div>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Plus Code: {restaurant.plusCode}</span>
              </div>
              <button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${restaurant.coordinates[0]},${restaurant.coordinates[1]}`,
                    '_blank'
                  );
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Yol Tarifi Al
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
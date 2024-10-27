import React from 'react';
import { Calendar, Clock, Share2, ThumbsUp, MapPin } from 'lucide-react';
import type { TravelRoute } from '../types';

interface TravelRoutesProps {
  routes: TravelRoute[];
}

export default function TravelRoutes({ routes }: TravelRoutesProps) {
  return (
    <div className="space-y-6">
      {routes.map((route) => (
        <div key={route.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{route.title}</h3>
                <p className="mt-2 text-gray-600">{route.description}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{route.duration} days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{route.places.length} places</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{route.likes}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                {route.places.slice(0, 3).map((place, index) => (
                  <div
                    key={place.id}
                    className="relative w-20 h-20 rounded-lg overflow-hidden"
                  >
                    <img
                      src={`https://source.unsplash.com/random/800x600?restaurant&${index}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20">
                      <div className="absolute top-2 left-2 text-white text-xs font-medium">
                        Day {place.day}
                      </div>
                    </div>
                  </div>
                ))}
                {route.places.length > 3 && (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-sm font-medium">
                      +{route.places.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
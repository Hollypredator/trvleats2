import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export default function FeaturedEvents() {
  const [events] = useLocalStorage<Event[]>('events', []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Henüz etkinlik bulunmuyor.</p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:w-48 object-cover"
                  src={event.image}
                  alt={event.title}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="mt-2 text-gray-500">{event.description}</p>
                <div className="mt-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
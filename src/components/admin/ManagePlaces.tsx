import React, { useState } from 'react';
import { Plus, MapPin, Edit2, Trash2, Star } from 'lucide-react';
import EditPlaceModal from './EditPlaceModal';

interface Place {
  id: string;
  name: string;
  type: 'historical' | 'activity';
  location: string;
  rating: number;
  status: 'active' | 'pending' | 'closed';
  image: string;
  coordinates: [number, number];
}

export default function ManagePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  const handleDeletePlace = (id: string) => {
    if (window.confirm('Bu mekanı silmek istediğinizden emin misiniz?')) {
      setPlaces(places.filter(p => p.id !== id));
    }
  };

  const handleEditPlace = (place: Place) => {
    setEditingPlace(place);
  };

  const handleSavePlaces = (updatedPlace: Place) => {
    if (editingPlace) {
      setPlaces(places.map(p => p.id === updatedPlace.id ? updatedPlace : p));
    } else {
      setPlaces([...places, { ...updatedPlace, id: Date.now().toString() }]);
    }
    setEditingPlace(null);
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mekan Yönetimi</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Mekan
        </button>
      </div>

      {places.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Henüz mekan eklenmemiş.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
          >
            İlk mekanı ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditPlace(place)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeletePlace(place.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">{place.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {place.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    place.type === 'historical' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {place.type === 'historical' ? 'Tarihi Mekan' : 'Aktivite'}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    place.status === 'active' ? 'bg-green-100 text-green-800' :
                    place.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {place.status === 'active' ? 'Aktif' :
                     place.status === 'pending' ? 'Onay Bekliyor' :
                     'Kapalı'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(editingPlace || showAddModal) && (
        <EditPlaceModal
          place={editingPlace}
          onClose={() => {
            setEditingPlace(null);
            setShowAddModal(false);
          }}
          onSave={handleSavePlaces}
        />
      )}
    </div>
  );
}
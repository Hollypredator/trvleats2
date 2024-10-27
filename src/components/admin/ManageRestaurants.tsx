import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import EditRestaurantModal from './EditRestaurantModal';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  status: 'active' | 'pending' | 'closed';
  image: string;
}

export default function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const handleDeleteRestaurant = (id: string) => {
    if (window.confirm('Bu restoranı silmek istediğinizden emin misiniz?')) {
      setRestaurants(restaurants.filter(r => r.id !== id));
    }
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
  };

  const handleSaveRestaurant = (updatedRestaurant: Restaurant) => {
    if (editingRestaurant) {
      setRestaurants(restaurants.map(r => 
        r.id === updatedRestaurant.id ? updatedRestaurant : r
      ));
    } else {
      setRestaurants([...restaurants, { ...updatedRestaurant, id: Date.now().toString() }]);
    }
    setEditingRestaurant(null);
    setShowAddModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Restoran Yönetimi</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Restoran
        </button>
      </div>

      {restaurants.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Henüz restoran eklenmemiş.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
          >
            İlk restoranı ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditRestaurant(restaurant)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">{restaurant.location}</p>
                  </div>
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{restaurant.category}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    restaurant.status === 'active' ? 'bg-green-100 text-green-800' :
                    restaurant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {restaurant.status === 'active' ? 'Aktif' :
                     restaurant.status === 'pending' ? 'Onay Bekliyor' :
                     'Kapalı'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(editingRestaurant || showAddModal) && (
        <EditRestaurantModal
          restaurant={editingRestaurant}
          onClose={() => {
            setEditingRestaurant(null);
            setShowAddModal(false);
          }}
          onSave={handleSaveRestaurant}
        />
      )}
    </div>
  );
}
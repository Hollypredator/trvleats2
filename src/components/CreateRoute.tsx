import React, { useState } from 'react';
import { Plus, Save, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationSelector from './LocationSelector';
import PlaceCard from './PlaceCard';
import Toast from './Toast';

interface Place {
  id: string;
  name: string;
  type: 'restaurant' | 'historical' | 'activity';
  image: string;
  rating: number;
  description: string;
  location: string;
}

const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Sultanahmet Köftecisi',
    type: 'restaurant',
    image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    description: 'Famous Turkish meatballs',
    location: 'Sultanahmet, Istanbul'
  },
  {
    id: '2',
    name: 'Hagia Sophia',
    type: 'historical',
    image: 'https://images.unsplash.com/photo-1545424436-fb278d50def2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    description: 'Historic mosque-church museum',
    location: 'Sultanahmet, Istanbul'
  }
];

export default function CreateRoute() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'restaurants' | 'historical'>('restaurants');
  const [showToast, setShowToast] = useState(false);
  const [routeName, setRouteName] = useState('');

  const handleAddPlace = (place: Place) => {
    setSelectedPlaces([...selectedPlaces, place]);
  };

  const handleRemovePlace = (placeId: string) => {
    setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
  };

  const handleSaveRoute = () => {
    if (!routeName.trim()) {
      alert('Lütfen rota için bir isim girin');
      return;
    }

    const newRoute = {
      id: Date.now().toString(),
      name: routeName,
      country: selectedCountry,
      city: selectedCity,
      places: selectedPlaces,
      createdAt: new Date().toISOString()
    };

    // Mevcut rotaları localStorage'dan al
    const existingRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
    
    // Yeni rotayı ekle
    localStorage.setItem('savedRoutes', JSON.stringify([...existingRoutes, newRoute]));

    // Başarı toast'ını göster
    setShowToast(true);

    // 2 saniye sonra My Routes sayfasına yönlendir
    setTimeout(() => {
      navigate('/my-routes');
    }, 2000);
  };

  const filteredPlaces = mockPlaces.filter(place => 
    (activeTab === 'restaurants' ? place.type === 'restaurant' : place.type === 'historical') &&
    (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     place.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Yeni Rota Oluştur</h1>
        
        {/* Rota İsmi Input */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rota İsmi
          </label>
          <input
            type="text"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            placeholder="Örn: İstanbul Lezzet Turu"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Location Selector */}
        <LocationSelector
          selectedCountry={selectedCountry}
          selectedCity={selectedCity}
          onCountryChange={setSelectedCountry}
          onCityChange={setSelectedCity}
        />

        {/* Tabs and Search */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('restaurants')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'restaurants'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Restoranlar
              </button>
              <button
                onClick={() => setActiveTab('historical')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'historical'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Tarihi Yerler
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mekan ara..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onAdd={() => handleAddPlace(place)}
                isAdded={selectedPlaces.some(p => p.id === place.id)}
              />
            ))}
          </div>
        </div>

        {/* Selected Places */}
        {selectedPlaces.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seçilen Yerler ({selectedPlaces.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{place.name}</h4>
                    <p className="text-sm text-gray-500">{place.location}</p>
                  </div>
                  <button
                    onClick={() => handleRemovePlace(place.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        {selectedPlaces.length > 0 && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleSaveRoute}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            >
              <Save className="h-5 w-5" />
              Rotayı Kaydet
            </button>
          </div>
        )}

        {/* Toast Bildirimi */}
        {showToast && (
          <Toast
            message="Rota başarıyla kaydedildi! My Routes sayfasına yönlendiriliyorsunuz..."
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
}
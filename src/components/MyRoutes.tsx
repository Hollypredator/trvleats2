import React from 'react';
import { MapPin, Calendar, Trash2, Share2 } from 'lucide-react';

interface SavedRoute {
  id: string;
  name: string;
  country: string;
  city: string;
  places: Array<{
    id: string;
    name: string;
    type: string;
    image: string;
  }>;
  createdAt: string;
}

export default function MyRoutes() {
  const [savedRoutes, setSavedRoutes] = React.useState<SavedRoute[]>([]);

  React.useEffect(() => {
    const routes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
    setSavedRoutes(routes);
  }, []);

  const handleDeleteRoute = (routeId: string) => {
    const confirmed = window.confirm('Bu rotayı silmek istediğinizden emin misiniz?');
    if (confirmed) {
      const updatedRoutes = savedRoutes.filter(route => route.id !== routeId);
      localStorage.setItem('savedRoutes', JSON.stringify(updatedRoutes));
      setSavedRoutes(updatedRoutes);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rotalarım</h1>

        {savedRoutes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">Henüz hiç rota oluşturmadınız.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {savedRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{route.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{route.city}, {route.country}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(route.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDeleteRoute(route.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-gray-100">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                  {route.places.map((place) => (
                    <div key={place.id} className="flex-shrink-0">
                      <div className="w-32 h-24 rounded-lg overflow-hidden">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-600 truncate">{place.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
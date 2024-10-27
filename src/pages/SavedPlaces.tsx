import React from 'react';
import { SavedPlace } from '../types';

export default function SavedPlaces() {
  const [category, setCategory] = React.useState('want-to-go');
  const [savedPlaces, setSavedPlaces] = React.useState<SavedPlace[]>([]);

  React.useEffect(() => {
    // Gerçek uygulamada API'den gelecek
    const mockSavedPlaces: SavedPlace[] = [
      {
        id: '1',
        userId: '1',
        placeId: '1',
        savedAt: new Date().toISOString(),
        category: 'want-to-go'
      }
    ];
    setSavedPlaces(mockSavedPlaces);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Kaydedilen Mekanlar</h1>
      {/* SavedPlaces component'i burada kullanılacak */}
    </div>
  );
}
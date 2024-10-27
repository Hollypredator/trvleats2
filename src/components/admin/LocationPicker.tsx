import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

interface Location {
  address: string;
  plusCode: string;
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
}

export default function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Geocoding API'si ile konum arama
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const location = {
          address: result.formatted_address,
          plusCode: result.plus_code?.global_code || '',
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng
        };

        setSelectedLocation(location);
        onLocationSelect(location);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handlePlusCodeSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Plus Code API'si ile konum arama
      const response = await fetch(
        `https://plus.codes/api?address=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const location = {
          address: data.formatted_address,
          plusCode: data.plus_code,
          latitude: data.geometry.location.lat,
          longitude: data.geometry.location.lng
        };

        setSelectedLocation(location);
        onLocationSelect(location);
      }
    } catch (error) {
      console.error('Error searching plus code:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Adres veya Plus Code girin..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          onClick={handlePlusCodeSearch}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Plus Code
        </button>
      </div>

      {selectedLocation && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Seçilen Konum:</span>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
              Plus Code: {selectedLocation.plusCode}
            </span>
          </div>
          <p className="text-sm text-gray-600">{selectedLocation.address}</p>
          <p className="text-xs text-gray-500">
            {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
}
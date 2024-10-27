import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  selectedCountry: string;
  selectedCity: string;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
}

export default function LocationSelector({
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange
}: LocationSelectorProps) {
  // Örnek veri - gerçek uygulamada API'den gelecek
  const countries = ['Türkiye', 'İtalya', 'Fransa', 'İspanya'];
  const cities = {
    'Türkiye': ['İstanbul', 'Ankara', 'İzmir', 'Antalya'],
    'İtalya': ['Roma', 'Milano', 'Venedik', 'Floransa'],
    'Fransa': ['Paris', 'Lyon', 'Marsilya', 'Nice'],
    'İspanya': ['Madrid', 'Barselona', 'Sevilla', 'Valencia']
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ülke
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              onCountryChange(e.target.value);
              onCityChange('');
            }}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Ülke seçin</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şehir
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            disabled={!selectedCountry}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Şehir seçin</option>
            {selectedCountry &&
              cities[selectedCountry as keyof typeof cities].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
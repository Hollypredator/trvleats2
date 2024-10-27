import React, { useState } from 'react';
import { X } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import LocationPicker from './LocationPicker';

interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  plusCode: string;
  population?: number;
  description?: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
  cities: City[];
  flag?: string;
}

interface EditLocationModalProps {
  type: 'country' | 'city';
  data?: Country | City | null;
  countryId?: string;
  onClose: () => void;
  onSave: (type: 'country' | 'city', data: Country | City, countryId?: string) => void;
}

const defaultCountry: Country = {
  id: '',
  name: '',
  code: '',
  cities: [],
  flag: ''
};

const defaultCity: City = {
  id: '',
  name: '',
  latitude: 0,
  longitude: 0,
  plusCode: '',
  population: 0,
  description: ''
};

export default function EditLocationModal({
  type,
  data,
  countryId,
  onClose,
  onSave
}: EditLocationModalProps) {
  const [formData, setFormData] = useState<Country | City>(
    data || (type === 'country' ? defaultCountry : defaultCity)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(type, {
      ...formData,
      id: formData.id || Date.now().toString()
    }, countryId);
  };

  const handleLocationSelect = (location: {
    address: string;
    plusCode: string;
    latitude: number;
    longitude: number;
  }) => {
    if (type === 'city') {
      setFormData({
        ...formData as City,
        latitude: location.latitude,
        longitude: location.longitude,
        plusCode: location.plusCode
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {type === 'country' ? 
              (data ? 'Ülke Düzenle' : 'Yeni Ülke Ekle') : 
              (data ? 'Şehir Düzenle' : 'Yeni Şehir Ekle')
            }
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'country' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke Adı
                </label>
                <input
                  type="text"
                  value={(formData as Country).name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke Kodu
                </label>
                <input
                  type="text"
                  value={(formData as Country).code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  maxLength={2}
                  required
                />
                <p className="mt-1 text-sm text-gray-500">2 karakterli ülke kodu (örn: TR)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bayrak
                </label>
                <FileUpload
                  onFileSelect={(file) => {
                    // Dosya yükleme işlemi burada yapılacak
                    console.log('Selected file:', file);
                  }}
                  preview={(formData as Country).flag}
                  label="Bayrak Seç"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir Adı
                </label>
                <input
                  type="text"
                  value={(formData as City).name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konum
                </label>
                <LocationPicker
                  onLocationSelect={handleLocationSelect}
                  initialLocation={type === 'city' ? {
                    address: '',
                    plusCode: (formData as City).plusCode,
                    latitude: (formData as City).latitude,
                    longitude: (formData as City).longitude
                  } : undefined}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nüfus
                </label>
                <input
                  type="number"
                  value={(formData as City).population}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    population: parseInt(e.target.value) 
                  })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={(formData as City).description}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    description: e.target.value 
                  })}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {data ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
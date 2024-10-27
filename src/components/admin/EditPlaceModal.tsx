import React, { useState } from 'react';
import { X } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import LocationPicker from './LocationPicker';

interface Place {
  id: string;
  name: string;
  type: 'historical' | 'activity';
  location: string;
  plusCode: string;
  rating: number;
  status: 'active' | 'pending' | 'closed';
  image: string;
  coordinates: [number, number];
}

interface EditPlaceModalProps {
  place?: Place | null;
  onClose: () => void;
  onSave: (place: Place) => void;
}

const defaultPlace: Place = {
  id: '',
  name: '',
  type: 'historical',
  location: '',
  plusCode: '',
  rating: 0,
  status: 'active',
  image: '',
  coordinates: [0, 0]
};

export default function EditPlaceModal({ place, onClose, onSave }: EditPlaceModalProps) {
  const [formData, setFormData] = useState<Place>(place || defaultPlace);
  const isNewPlace = !place;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Date.now().toString()
    });
  };

  const handleLocationSelect = (location: {
    address: string;
    plusCode: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData({
      ...formData,
      location: location.address,
      plusCode: location.plusCode,
      coordinates: [location.latitude, location.longitude]
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {isNewPlace ? 'Yeni Mekan Ekle' : 'Mekan Düzenle'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mekan Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tür
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Place['type'] })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="historical">Tarihi Mekan</option>
              <option value="activity">Aktivite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konum
            </label>
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              initialLocation={place ? {
                address: place.location,
                plusCode: place.plusCode,
                latitude: place.coordinates[0],
                longitude: place.coordinates[1]
              } : undefined}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resim
            </label>
            <FileUpload
              onFileSelect={(file) => {
                // Dosya yükleme işlemi burada yapılacak
                console.log('Selected file:', file);
              }}
              preview={formData.image}
              label="Resim Seç"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Puan
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durum
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Place['status'] })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="active">Aktif</option>
              <option value="pending">Onay Bekliyor</option>
              <option value="closed">Kapalı</option>
            </select>
          </div>

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
              {isNewPlace ? 'Ekle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
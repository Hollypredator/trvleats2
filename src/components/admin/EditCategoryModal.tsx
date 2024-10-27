import React, { useState } from 'react';
import { X } from 'lucide-react';
import FileUpload from '../../components/FileUpload';

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  count: number;
}

interface EditCategoryModalProps {
  category?: Category | null;
  onClose: () => void;
  onSave: (category: Category) => void;
}

export default function EditCategoryModal({ category, onClose, onSave }: EditCategoryModalProps) {
  const [formData, setFormData] = useState<Category>(
    category || {
      id: '',
      name: '',
      icon: '',
      slug: '',
      count: 0
    }
  );

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Date.now().toString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {category ? 'Kategori Düzenle' : 'Yeni Kategori'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({
                  ...formData,
                  name,
                  slug: generateSlug(name)
                });
              }}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İkon
            </label>
            <FileUpload
              onFileSelect={(file) => {
                // Dosya yükleme işlemi burada yapılacak
                console.log('Selected file:', file);
              }}
              preview={formData.icon}
              label="İkon Seç"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Otomatik oluşturulur, gerekirse düzenleyebilirsiniz
            </p>
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
              {category ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React from 'react';
import { Users, MapPin, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      id: 'users',
      icon: Users,
      title: 'Kullanıcılar',
      value: '245',
      link: 'users',
    },
    {
      id: 'places',
      icon: MapPin,
      title: 'Mekanlar',
      value: '128',
      link: 'places',
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Ayarlar',
      value: 'Sistem ayarlarını yapılandır',
      link: 'settings',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <button
                onClick={() => navigate(`/admin/${item.link}`)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
              >
                {item.id === 'settings' ? 'Düzenle' : 'Tümünü görüntüle'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, Settings, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const navigateToSection = (section: string) => {
    navigate(`/admin/${section}`);
  };

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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
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
                          <div className={`${typeof item.value === 'number' ? 'text-2xl font-semibold' : 'text-sm'} text-gray-900`}>
                            {item.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <button
                    onClick={() => navigateToSection(item.link)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                  >
                    {item.id === 'settings' ? 'Düzenle' : 'Tümünü görüntüle'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Map,
  Globe,
  Tag,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Kullanıcılar', path: '/admin/users' },
    { icon: Map, label: 'Mekanlar', path: '/admin/places' },
    { icon: Globe, label: 'Konumlar', path: '/admin/locations' },
    { icon: Tag, label: 'Kategoriler', path: '/admin/categories' },
    { icon: Calendar, label: 'Etkinlikler', path: '/admin/events' },
    { icon: Settings, label: 'Ayarlar', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-white min-h-screen shadow-sm">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
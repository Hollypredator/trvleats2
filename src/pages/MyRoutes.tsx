import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import MyRoutesComponent from '../components/MyRoutes';

export default function MyRoutes() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rotalarım</h1>
        <Link
          to="/create-route"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Rota Oluştur
        </Link>
      </div>
      <MyRoutesComponent />
    </div>
  );
}
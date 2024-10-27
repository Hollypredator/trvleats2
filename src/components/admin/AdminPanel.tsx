import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import ManageUsers from './ManageUsers';
import ManageRestaurants from './ManageRestaurants';
import ManageCategories from './ManageCategories';
import ManagePlaces from './ManagePlaces';
import ManageLocations from './ManageLocations';
import AdminDashboard from './AdminDashboard';
import AdminSettings from './AdminSettings';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/restaurants" element={<ManageRestaurants />} />
            <Route path="/categories" element={<ManageCategories />} />
            <Route path="/places" element={<ManagePlaces />} />
            <Route path="/locations" element={<ManageLocations />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
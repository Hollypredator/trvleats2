import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SavedPlaces from './pages/SavedPlaces';
import MyRoutes from './pages/MyRoutes';
import Bookmarks from './pages/Bookmarks';
import CreateRoute from './components/CreateRoute';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageRestaurants from './components/admin/ManageRestaurants';
import ManageCategories from './components/admin/ManageCategories';
import ManagePlaces from './components/admin/ManagePlaces';
import ManageLocations from './components/admin/ManageLocations';
import ManageEvents from './components/admin/ManageEvents';
import AdminSettings from './components/admin/AdminSettings';

function App() {
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="restaurants" element={<ManageRestaurants />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="places" element={<ManagePlaces />} />
        <Route path="locations" element={<ManageLocations />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Main App Routes */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="saved-places"
                element={
                  <PrivateRoute>
                    <SavedPlaces />
                  </PrivateRoute>
                }
              />
              <Route
                path="my-routes"
                element={
                  <PrivateRoute>
                    <MyRoutes />
                  </PrivateRoute>
                }
              />
              <Route
                path="create-route"
                element={
                  <PrivateRoute>
                    <CreateRoute />
                  </PrivateRoute>
                }
              />
              <Route
                path="bookmarks"
                element={
                  <PrivateRoute>
                    <Bookmarks />
                  </PrivateRoute>
                }
              />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

export default App;
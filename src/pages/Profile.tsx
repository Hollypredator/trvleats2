import React from 'react';
import UserProfile from '../components/UserProfile';

const mockUser = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  location: 'Istanbul, Turkey',
  bio: 'Food enthusiast and travel lover. Always looking for the next great adventure!',
  following: 234,
  followers: 567
};

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <UserProfile user={mockUser} />
    </div>
  );
}
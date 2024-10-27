import React from 'react';
import { MapPin, Users, Route, Bookmark, Star } from 'lucide-react';
import type { User } from '../types';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const stats = [
    { label: 'Reviews', value: '127', icon: Star },
    { label: 'Routes', value: '15', icon: Route },
    { label: 'Saved', value: '48', icon: Bookmark },
    { label: 'Following', value: user.following.toString(), icon: Users },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      <div className="relative px-6 pb-6">
        <div className="flex flex-col items-center -mt-16">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h2>
          <div className="flex items-center mt-1 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{user.location}</span>
          </div>
          {user.bio && (
            <p className="mt-4 text-center text-gray-600 max-w-md">{user.bio}</p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center">
                <stat.icon className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="mt-1 font-semibold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
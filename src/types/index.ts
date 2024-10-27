export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio?: string;
  following: number;
  followers: number;
}

export interface Review {
  id: string;
  userId: string;
  placeId: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  photos?: string[];
}

export interface TravelRoute {
  id: string;
  userId: string;
  title: string;
  description: string;
  places: RoutePlace[];
  duration: number;
  likes: number;
  shares: number;
  isPublic: boolean;
  createdAt: string;
}

export interface RoutePlace {
  id: string;
  placeId: string;
  day: number;
  order: number;
  notes?: string;
}

export interface SavedPlace {
  id: string;
  userId: string;
  placeId: string;
  savedAt: string;
  category: 'want-to-go' | 'visited' | 'favorite';
}
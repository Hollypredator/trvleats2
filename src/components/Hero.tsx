import React from 'react';
import Map from './Map';

interface Place {
  id: string;
  name: string;
  position: [number, number];
  type: 'restaurant' | 'historical';
  rating: number;
  image: string;
  description: string;
}

interface HeroProps {
  places?: Place[];
}

export default function Hero({ places = [] }: HeroProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="h-[60vh] min-h-[400px]">
        <Map places={places} />
      </div>
    </div>
  );
}
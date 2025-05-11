"use client"
import Image from 'next/image';
import React from 'react';

const LocationSection = ({locationHighlights,locationDescription}:any) => {
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="containers mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Section Title */}
        <h2 className="text-3xl font-serif text-center text-gray-900 mb-8 md:mb-10">Location</h2>
        
        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {locationHighlights.map((card:any) => (
            <div key={card._id} className="relative overflow-hidden rounded-md bg-gray-600 h-40">
              {/* Background Image with Overlay */}
              <Image 
                //fill
                fill
                src={card.image} 
                alt={card._id} 
                className="absolute w-full h-full object-cover opacity-80"
              />
              
              
              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-center items-center text-white text-center p-4">
                <p className="text-sm font-medium">{card.time}</p>
                <p className="text-sm">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Location Description */}
        <div className="max-w-4xl mx-auto text-center text-gray-700 space-y-4">
          <p className="text-sm">
{`            Located close to the Dubai Island Bridge, this development will offer excellent access to Downtown Dubai and Dubai 
            International Airport, ensuring you're just a 20-minute ride away from the heart of the city and major global gateways.
`}          </p>
          
          <p className="text-sm">
            {locationDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
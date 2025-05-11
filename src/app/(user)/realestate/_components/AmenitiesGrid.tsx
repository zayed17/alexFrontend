import * as LucideIcons from "lucide-react";
import React from "react";

const AmenitiesGrid = ({ amenitiesData }: any) => {
  // Use provided data or fallback to default amenities
  const amenities = amenitiesData

  return (
    <div className="containers mx-auto w-full !py-16 px-4 sm:px-6">
      <h2 className="mb-12 text-center font-serif text-3xl">
        Amenities to Adore
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
        {amenities.map((amenity: any) => {
          const Icon = LucideIcons[amenity.iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
          
          return (
            <div
              key={amenity._id}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-sm w-full max-w-xs h-40"
            >
              <div className="mb-4">
                {Icon ? <Icon size={30} /> : <span>❓</span>}
              </div>
              <p className="text-xs text-center font-medium uppercase tracking-wide">
                {amenity.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesGrid;

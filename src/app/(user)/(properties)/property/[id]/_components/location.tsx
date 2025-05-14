"use client";
import MapViewer from "@/components/user/MapViewer";
import Image from "next/image";

interface LocationCard {
  _id: string;
  image: string;
  time: string;
  title: string;
}

interface LocationSectionProps {
  location: LocationCard[];
  locationDescription: string;
  mapImageUrl: string;
}

const property = {
  id: "prop-001",
  name: "Elegant Villa",
  location: {
    latitude: 37.7749,
    longitude: -122.4194,
  },
};

const markers = [
  {
    id: "marker-1",
    title: "Property Location",
    position: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
];

const LocationSection = ({
  location,
  locationDescription,
  mapImageUrl,
}: LocationSectionProps) => {
  return (
    <div className="containers w-full bg-white py-12 md:py-16">
      <div className="">
        {/* Section Title */}

        <div className="rounded-3xl bg-[#F8F8F8]">
          <div className="mb-8 flex flex-col gap-8 p-8 md:flex-row">
            {/* Location Description */}
            <div className="md:w-1/2">
              <div className="mb-6 text-sm leading-relaxed text-gray-700">
                <h2 className="mb-2 text-start font-serif text-3xl text-gray-900 md:mb-10">
                  Location
                </h2>

                {locationDescription.split("\n").map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-2 gap-4 md:w-1/2">
              {location.map((card) => (
                <div
                  key={card._id}
                  className="relative h-32 overflow-hidden rounded-md bg-gray-600"
                >
                  {/* Background Image with Overlay */}
                  <Image
                    fill
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="absolute h-full w-full object-cover opacity-80"
                  />

                  {/* Card Content */}
                  <div className="relative flex h-full flex-col items-center justify-center p-4 text-center text-white">
                    <p className="text-sm font-medium">{card.time}</p>
                    <p className="text-sm">to {card.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Map Section */}
          <div className="h-85 relative mt-8 w-full overflow-hidden rounded-3xl md:h-115">
            <MapViewer
              initialCenter={{
                lat: property?.location?.latitude,
                lng: property?.location?.longitude,
              }}
              zoom={10}
              markers={markers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;

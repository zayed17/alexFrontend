"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Bed } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  bedrooms: number;
  imageUrl: string;
  href?: string;
  className?: string;
  isFirst?: boolean;
  index?: number;
}

export default function PropertyCard({
  id,
  title,
  location,
  bedrooms,
  imageUrl,
  href = "#",
  className = "",
  isFirst = false,
  index = 0,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Show button only if it's the first card or if the card is being hovered
  const showButton = isHovered || isFirst;

  return (
    <div
      className={`group overflow-hidden rounded-3xl shadow-xl transition-all hover:shadow-2xl  ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[400px]  ">
        <Link href={`/property/${id }`} className="block">
          <div className="relative h-[250px] w-full overflow-hidden rounded-t-3xl">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="mx-2 p-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{bedrooms} BEDROOMS</span>
              </div>
            </div>
          </div>
        </Link>
        {showButton && (
          <div className="mx-2 px-4 pb-4">
            <Link
              href={`/property/${id }`}
              className="inline-block w-full rounded-full bg-[#0a1a2a] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#0c2238]"
            >
              CHECK AVAILABILITY
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import PropertyGrid from "../(user)/(properties)/_components/PropertyGrid";
import LoadMoreButton from "../(user)/(properties)/_components/loadMoreButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { dummyprop } from "@/constants/images";

const PROPERTIES = [
  {
    id: "1",
    title: "Address Residence at Dubai Creek Harbour",
    location: "STARTING FROM AED 2.1 MILLION",
    bedrooms: 3,
    imageUrl: "/images/cards/cards-01.png",
    href: "/property/1",
  },
  {
    id: "2",
    title: "Alora at Dubai Creek Harbour",
    location: "STARTING FROM AED 2.5 MILLION",
    bedrooms: 2,
    imageUrl: "/images/cards/cards-02.png",
    href: "/property/2",
  },
  {
    id: "3",
    title: "Address Residence at Dubai Creek Harbour",
    location: "STARTING FROM AED 1.8 MILLION",
    bedrooms: 1,
    imageUrl: "/images/cards/cards-02.png",
    href: "/property/3",
  },
  {
    id: "4",
    title: "Alora at Dubai Creek Harbour",
    location: "STARTING FROM AED 3.2 MILLION",
    bedrooms: 3,
    imageUrl: "/images/cards/cards-03.png",
    href: "/property/4",
  },
];

export default function HomeProperties() {
  const [properties, setProperties] = useState(PROPERTIES);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more properties
    setTimeout(() => {
      setProperties([...properties, ...PROPERTIES]);
      setLoading(false);
    }, 1000);
  };


  return (
    <div className="containers md:first-letter: px-[5%] !py-18">
      <h1 className="mb-10 font-presto text-4xl !font-extrabold">
        Best investment properties right now
      </h1>

      <PropertyGrid>
        {properties.map((property, index) => (
          <div
            className={`group overflow-hidden rounded-3xl bg-white shadow-sm transition-all  hover:scale-[1.02] mx-3`}
          >
            <Link href={"href"} className="block">
              <div className="relative h-[320px] w-full overflow-hidden rounded-3xl ">
                <Image
                  src={dummyprop || "/placeholder.svg"}
                  alt={"Loading..."}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 right-0 rounded-tl-3xl bg-white px-8 py-3 text-sm font-medium">
                  <span className="text-customBlue font-presto mr-1">From </span>
                  <span className="text-customBlue text-xl font-presto">{"AED 200.000"}</span>
                </div>
              </div>

              <div className="py-5">
                <h3 className="text-2xl pb-2 font-semibold text-customBlue font-presto">{"Evergr1n House"}</h3>
                <p className="mt-2 text-sm leading-relaxed max-w-lg text-gray-800">
                  {"The district offers convenient access to Dubai’s key landmarks, including Downtown Dubai, Jumeirah Beach, City Walk, and Bur Dubai. The project is within walking distance of World Trade Centre Metro Station"}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-700" />
                  <span className="uppercase tracking-wide">{"Jumeirah Garden City, Dubai"}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </PropertyGrid>
      <LoadMoreButton onClick={handleLoadMore} loading={loading} />
    </div>
  );
}

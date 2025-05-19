"use client";

import { useState } from "react";
import PropertyGrid from "../(user)/(properties)/_components/PropertyGrid";
import LoadMoreButton from "../(user)/(properties)/_components/loadMoreButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function HomeProperties({ property }: any) {
  const [properties, setProperties] = useState(property);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const hasMoreProperties = visibleCount < properties.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 6);
      setLoading(false);
    }, 1000);
  };

  // Only show the number of properties based on visibleCount
  const visibleProperties = properties.slice(0, visibleCount);

  return (
    <div className="containers md:first-letter: !py-18 px-[5%]">
      <h1 className="mb-10 font-presto text-4xl !font-extrabold">
        Best investment properties right now
      </h1>

      <PropertyGrid>
        {visibleProperties.map((property: any, index: number) => (
          <div
            key={index}
            className={`group mx-3 overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:scale-[1.02]`}
          >
            <Link href={`property/${property._id}`} className="block">
              <div className="relative h-[320px] w-full overflow-hidden rounded-3xl">
                <Image
                  src={property.mainImage || "/placeholder.svg"}
                  alt={"Loading..."}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 right-0 rounded-tl-3xl bg-white px-8 py-3 text-sm font-medium">
                  <span className="mr-1 font-presto text-customBlue">
                    From{" "}
                  </span>
                  <span className="font-presto text-xl text-customBlue">
                    {property.price}
                  </span>
                </div>
              </div>

              <div className="py-5">
                <h3 className="pb-2 font-presto text-2xl font-semibold text-customBlue">
                  {property.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-800">
                  {property.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-700" />
                  <span className="uppercase tracking-wide">
                    {property.location.country}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </PropertyGrid>

      {/* Only show the LoadMoreButton if there are more properties to load */}
      {hasMoreProperties && (
        <LoadMoreButton onClick={handleLoadMore} loading={loading} />
      )}
    </div>
  );
}

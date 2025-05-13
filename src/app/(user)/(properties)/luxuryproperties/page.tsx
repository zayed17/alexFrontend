"use client";

import { useState } from "react";
import PropertySearch from "../_components/propertySerach";
import PropertyGrid from "../_components/PropertyGrid";
import PropertyCard from "../_components/PropertyCard";
import LoadMoreButton from "../_components/loadMoreButton";

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

export default function AffordableProperties() {
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

  const [filters, setFilters] = useState({
    propertyType: "Any",
    bedroom: "Any",
    price: "Select",
  });

  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (searchFilters: {
    propertyType: string;
    bedroom: string;
    price: string;
  }) => {
    console.log("Search with filters:", searchFilters);
    setFilters(searchFilters);
    setSearchPerformed(true);
  };

  return (
    <div className="containers !py-18">
      <h1 className="mb-6 text-3xl font-bold">Affordable Properties</h1>

      {/* Property Search Component */}
      <PropertySearch onSearch={handleSearch} initialFilters={filters} />

      {/* Search results or content */}
       <div className="!py-6 text-sm">
        {searchPerformed ? (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Search Results</h2>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Use the search filters above to find affordable properties.
          </div>
        )}
      </div>

      <PropertyGrid>
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            location={property.location}
            bedrooms={property.bedrooms}
            imageUrl={property.imageUrl}
            href={property.href}
            index={index}
            isFirst={index === 0}
          />
        ))}
      </PropertyGrid>
      <LoadMoreButton onClick={handleLoadMore} loading={loading} />
    </div>
  );
}

"use client";

import { useState } from "react";
import PropertySearch from "../_components/propertySerach";
import PropertyGrid from "../_components/PropertyGrid";
import PropertyCard from "../_components/PropertyCard";
import LoadMoreButton from "../_components/loadMoreButton";

export default function Exclusivelistings({ data }: any) {
  const [properties, setProperties] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more properties
    setTimeout(() => {
      setProperties([...properties, ...data]);
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
    <div className="containers !py-34">
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
        {properties.map((property: any, index: number) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.price}
            bedrooms={property.bedrooms}
            imageUrl={property.mainImage}
            index={index}
            isFirst={index === 0}
          />
        ))}
      </PropertyGrid>
      <LoadMoreButton onClick={handleLoadMore} loading={loading} />
    </div>
  );
}

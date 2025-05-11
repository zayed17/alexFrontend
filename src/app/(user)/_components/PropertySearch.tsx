"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface PropertySearchProps {
  onFilterChange: (filters: {
    propertyType: string;
    bedroom: string;
    price: string;
  }) => void;
  filters?: {
    propertyType: string;
    bedroom: string;
    price: string;
  };
}

export default function PropertySearch({
  onFilterChange,
  filters,
}: PropertySearchProps) {
  const [propertyType, setPropertyType] = useState(
    filters?.propertyType || "Any",
  );
  const [bedroom, setBedroom] = useState(filters?.bedroom || "Any");
  const [price, setPrice] = useState(filters?.price || "Select");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const propertyTypes = ["Any", "Apartments", "Villas"];
  const bedrooms = ["Any", "1", "2", "3", "4", "5+"];
  const prices = [
    "Select",
    "Up to 1M",
    "1M - 2M",
    "2M - 5M",
    "5M - 10M",
    "10M+",
  ];

  useEffect(() => {
    if (filters) {
      setBedroom(filters.bedroom)
      setPrice(filters.price)
      setPropertyType(filters.propertyType)
    }
  }, [filters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    function handleScroll() {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeDropdown]);

  const openDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const selectOption = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    setter(value);
    closeDropdown();
  };

  const resetFilters = () => {
    setPropertyType("Any");
    setBedroom("Any");
    setPrice("Select");
    closeDropdown();

    // Notify parent component about filter reset
    onFilterChange({
      propertyType: "Any",
      bedroom: "Any",
      price: "Select",
    });
  };

  const handleSearch = () => {
    // Apply filters by notifying parent component
    onFilterChange({
      propertyType,
      bedroom,
      price,
    });
    closeDropdown();
  };

  return (
    <div
      ref={searchBarRef}
      className="relative z-10 flex w-full flex-col bg-[#F8F8F9] shadow-lg md:flex-row"
    >
      {/* Property Type Dropdown */}
      <div className="relative flex-1 border-r border-gray-200">
        <button
          onClick={() => openDropdown("property")}
          className="flex h-full w-full cursor-pointer items-center justify-between p-4 text-left focus:outline-none"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              PROPERTY TYPE
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {propertyType}
            </p>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "property" ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === "property" && (
          <div className="absolute left-0 top-full z-20 max-h-[300px] w-full overflow-y-auto border border-gray-100 bg-white shadow-lg">
            {propertyTypes.map((type) => (
              <div
                key={type}
                className="cursor-pointer p-3 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => selectOption(setPropertyType, type)}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bedroom Dropdown */}
      <div className="relative flex-1 border-r border-gray-200">
        <button
          onClick={() => openDropdown("bedroom")}
          className="flex h-full w-full cursor-pointer items-center justify-between p-4 text-left focus:outline-none"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              BEDROOM
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">{bedroom}</p>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "bedroom" ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === "bedroom" && (
          <div className="absolute left-0 top-full z-20 max-h-[300px] w-full overflow-y-auto border border-gray-100 bg-white shadow-lg">
            {bedrooms.map((bed) => (
              <div
                key={bed}
                className="cursor-pointer p-3 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => selectOption(setBedroom, bed)}
              >
                {bed}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Dropdown */}
      <div className="relative flex-1 border-r border-gray-200">
        <button
          onClick={() => openDropdown("price")}
          className="flex h-full w-full cursor-pointer items-center justify-between p-4 text-left focus:outline-none"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              PRICE (AED)
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">{price}</p>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "price" ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === "price" && (
          <div className="absolute left-0 top-full z-20 max-h-[300px] w-full overflow-y-auto border border-gray-100 bg-white shadow-lg">
            {prices.map((priceOption) => (
              <div
                key={priceOption}
                className="cursor-pointer p-3 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => selectOption(setPrice, priceOption)}
              >
                {priceOption}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search & Reset Buttons */}
      <div className="flex flex-col items-center gap-3 space-x-2 p-5 md:flex-row lg:flex-row">
        <button
          className="w-full flex-none bg-[#0a1a2a] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#0c2238] md:w-[150px]"
          onClick={handleSearch}
        >
          SEARCH
        </button>
        <button
          className="!m-0 w-full flex-none border border-gray-300 px-6 py-3 text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-gray-800 md:w-[150px]"
          onClick={resetFilters}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function PropertySearch() {
  const [propertyType, setPropertyType] = useState("Any");
  const [bedroom, setBedroom] = useState("Any");
  const [price, setPrice] = useState("Select");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchBarRef = useRef<HTMLDivElement>(null);

  const propertyTypes = ["Any", "Apartment", "Villa", "Penthouse", "Townhouse"];
  const bedrooms = ["Any", "1", "2", "3", "4", "5+"];
  const prices = ["Select", "Up to 1M", "1M - 2M", "2M - 5M", "5M - 10M", "10M+"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
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

  const selectOption = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    closeDropdown();
  };

  const resetFilters = () => {
    setPropertyType("Any");
    setBedroom("Any");
    setPrice("Select");
    closeDropdown();
  };

  return (
    <div ref={searchBarRef} className="w-full bg-[#F8F8F9] shadow-lg flex flex-col md:flex-row relative z-10 " >
      {/* Property Type Dropdown */}
      <div className="flex-1 border-r border-gray-200 relative">
        <button
          onClick={() => openDropdown("property")}
          className="flex items-center justify-between p-4 cursor-pointer h-full w-full focus:outline-none text-left"
        >
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">PROPERTY TYPE</p>
            <p className="text-sm font-medium text-gray-800 mt-1">{propertyType}</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "property" ? "rotate-180" : ""}`} />
        </button>

        {activeDropdown === "property" && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-lg max-h-[300px] overflow-y-auto z-20">
            {propertyTypes.map((type) => (
              <div key={type} className="p-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700" onClick={() => selectOption(setPropertyType, type)}>
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bedroom Dropdown */}
      <div className="flex-1 border-r border-gray-200 relative">
        <button
          onClick={() => openDropdown("bedroom")}
          className="flex items-center justify-between p-4 cursor-pointer h-full w-full focus:outline-none text-left"
        >
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">BEDROOM</p>
            <p className="text-sm font-medium text-gray-800 mt-1">{bedroom}</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "bedroom" ? "rotate-180" : ""}`} />
        </button>

        {activeDropdown === "bedroom" && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-lg max-h-[300px] overflow-y-auto z-20">
            {bedrooms.map((bed) => (
              <div key={bed} className="p-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700" onClick={() => selectOption(setBedroom, bed)}>
                {bed}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Dropdown */}
      <div className="flex-1 border-r border-gray-200 relative">
        <button
          onClick={() => openDropdown("price")}
          className="flex items-center justify-between p-4 cursor-pointer h-full w-full focus:outline-none text-left"
        >
          <div>
            <p className="text-sm font-medium text-gray-800 mt-1">{price}</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "price" ? "rotate-180" : ""}`} />
        </button>

        {activeDropdown === "price" && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-lg max-h-[300px] overflow-y-auto z-20">
            {prices.map((priceOption) => (
              <div key={priceOption} className="p-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700" onClick={() => selectOption(setPrice, priceOption)}>
                {priceOption}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search & Reset Buttons */}
      <div className="flex flex-col md:flex-row lg:flex-row items-center space-x-2 p-5 gap-3">
        <button className="bg-[#0a1a2a] hover:bg-[#0c2238] text-white px-6 py-3 font-medium text-sm uppercase tracking-wider transition-colors flex-none w-full md:w-[150px]">
          SEARCH
        </button>
        <button
          className="!m-0 text-gray-600 hover:text-gray-800 px-6 py-3 font-medium text-sm uppercase tracking-wider transition-colors border border-gray-300  flex-none w-full md:w-[150px]"
          onClick={resetFilters}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

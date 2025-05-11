"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PropertySearch() {
  const router = useRouter()
  const [propertyType, setPropertyType] = useState("Any")
  const [bedroom, setBedroom] = useState("Any")
  const [price, setPrice] = useState("Select")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const searchBarRef = useRef<HTMLDivElement>(null)

  const propertyTypes = ["Any", "Apartments", "Villas"]
  const bedrooms = ["Any", "1", "2", "3", "4", "5+"]
  const prices = ["Select", "Up to 1M", "1M - 2M", "2M - 5M", "5M - 10M", "10M+"]

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null) 
      }
    }

    // Handle scroll to close dropdowns
    function handleScroll() {
      if (activeDropdown) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeDropdown])

  // Custom dropdown handlers
  const openDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  const selectOption = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value)
    closeDropdown()
  }

  // Handle find properties button click
  const handleFindProperties = () => {
    // Save filter values to localStorage
    const filterValues = {
      propertyType,
      bedroom,
      price,
    }

    localStorage.setItem("propertyFilters", JSON.stringify(filterValues))

    // Redirect to luxury properties page
    router.push("/luxuryproperty")
  }

  return (
    <div
      ref={searchBarRef}
      className="w-full bg-white/90 md:bg-white lg:bg-white shadow-lg flex flex-col md:flex-row relative z-10"
    >
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
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "property" ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === "property" && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-lg max-h-[300px] overflow-y-auto z-20">
            {propertyTypes.map((type) => (
              <div
                key={type}
                className="p-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                onClick={() => selectOption(setPropertyType, type)}
              >
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
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "bedroom" ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === "bedroom" && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-lg max-h-[300px] overflow-y-auto z-20">
            {bedrooms.map((bed) => (
              <div
                key={bed}
                className="p-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                onClick={() => selectOption(setBedroom, bed)}
              >
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
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE (AED)</p>
            <p className="text-sm font-medium text-gray-800 mt-1">{price}</p>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === "price" ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === "price" && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-lg max-h-[300px] overflow-y-auto z-20">
            {prices.map((priceOption) => (
              <div
                key={priceOption}
                className="p-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                onClick={() => selectOption(setPrice, priceOption)}
              >
                {priceOption}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Find Properties Button */}
      <div className="flex items-center p-5">
        <button
          onClick={handleFindProperties}
          className="bg-[#0a1a2a] hover:bg-[#0c2238] text-white p-4 font-medium text-sm uppercase tracking-wider transition-colors flex-none w-full md:w-[200px]"
        >
          FIND PROPERTIES
        </button>
      </div>
    </div>
  )
}

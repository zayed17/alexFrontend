"use client"

import { useState, useEffect } from "react"
import PropertySearch from "./PropertySearch"
import PropertyGrid from "@/components/user/propertyGrid"

// Define types in this file
export interface Property {
  _id: string
  title: string
  image?: string
  mainImage?: string
  sliderImages?: string[]
  bedrooms: number
  sellingPrice?: number
  price?: number
  propertyType: any
  // Add other properties as needed
}

interface RealEstateUIProps {
  properties: Property[]
  type?: "readyProperty" | "offPlan" | string
}

export default function RealEstateUI({ properties, type }: RealEstateUIProps) {
  // State for filters
  const [filters, setFilters] = useState({
    propertyType: "Any",
    bedroom: "Any",
    price: "Select",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFilters = localStorage.getItem("propertyFilters")

      if (savedFilters) {
        try {
          const parsedFilters = JSON.parse(savedFilters)
          setFilters(parsedFilters)

          localStorage.removeItem("propertyFilters")
        } catch (error) {
          console.error("Error parsing filters from localStorage:", error)
        }
      }
    }
  }, [])

  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)

  useEffect(() => {
    const filtered = properties.filter((property) => {

      if (filters.propertyType !== "Any" && property.propertyType?.title !== filters.propertyType) {
        return false
      }
      
      if (filters.bedroom !== "Any") {
        const bedroomFilter = filters.bedroom === "5+" ? 5 : Number.parseInt(filters.bedroom)
        if (filters.bedroom === "5+") {
          if (property.bedrooms <= 5) return false
        } else {
          if (Number(property.bedrooms) !== bedroomFilter) return false
        }
      }

      if (filters.price !== "Select") {
        const propertyPrice =  property.sellingPrice || property.price || 0
        switch (filters.price) {
          case "Up to 1M":
            if (propertyPrice > 1000000) return false
            break
          case "1M - 2M":
            if (propertyPrice < 1000000 || propertyPrice > 2000000) return false
            break
          case "2M - 5M":
            if (propertyPrice < 2000000 || propertyPrice > 5000000) return false
            break
          case "5M - 10M":
            if (propertyPrice < 5000000 || propertyPrice > 10000000) return false
            break
          case "10M+":
            if (propertyPrice < 10000000) return false
            break
        }
      }

      return true
    })

    setFilteredProperties(filtered)
  }, [filters, properties, type])

  const handleFilterChange = (newFilters: {
    propertyType: string
    bedroom: string
    price: string
  }) => {
    setFilters(newFilters)
  }

  return (
    <div className="containers">
      <section className="py-20 md:py-24">
        <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Left Column - Heading */}
          <div>
            <h1 className="font-serif text-3xl leading-tight text-gray-900 md:text-4xl lg:text-4xl">
              Buy Luxury Property for Sale in Dubai & UAE
            </h1>
          </div>

          {/* Right Column - Description */}
          <div>
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              Experience the pinnacle of luxury with buying a property in Dubai, where stunning architecture meets
              world-class amenities. Each residence seamlessly blends elegance with comfort, offering breathtaking views
              of the city skyline and pristine beaches. Buy Dubai properties and embrace a lifestyle defined by
              sophistication and unmatched beauty.
            </p>
          </div>
        </div>
      </section>

      <div className="!pb-12">
        <PropertySearch filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="">
        <PropertyGrid properties={filteredProperties} type={type} />
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { MapPin, X } from "lucide-react"
import InputGroup from "@/components/FormElements/InputGroup"

// Updated interface to match the Property Finder API response
interface LocationOption {
  id: number
  name: string
  coordinates: {
    lat: number
    lon: number
  }
  location_type: string
  path: string
  path_name: string
  url_slug: string
  level: number
}

interface LocationSelectorProps {
  control: any
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  errors: any
  initialVal: {
    country?: string
    latitude?: any
    longitude?: any
  } | null
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  control,
  register,
  setValue,
  watch,
  errors,
  initialVal,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<LocationOption[]>([])
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Set initial values when component mounts
  useEffect(() => {
    if (initialVal && initialVal.country && initialVal.latitude && initialVal.longitude) {
      // Set form values
      setValue("location", {
        country: initialVal.country,
        latitude: Number.parseFloat(initialVal.latitude),
        longitude: Number.parseFloat(initialVal.longitude),
      })

      // Display the country name in the search field
      setSearchTerm(initialVal.country)

      // Create a minimal selectedLocation object to display lat/long fields
      setSelectedLocation({
        id: 0,
        name: initialVal.country,
        coordinates: {
          lat: Number.parseFloat(initialVal.latitude),
          lon: Number.parseFloat(initialVal.longitude),
        },
        location_type: "CITY",
        path: "",
        path_name: "",
        url_slug: "",
        level: 0,
      })
    }
  }, [initialVal, setValue])

  // Debounce search to reduce API calls
  const debouncedSearch = useCallback((term: string) => {
    if (term.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    const fetchSuggestions = async () => {
      try {
        // Using the Property Finder API instead of Nominatim
        const response = await fetch(
          `https://www.propertyfinder.ae/api/pwa/locations?locale=en&filters.name=${encodeURIComponent(
            term,
          )}&pagination.limit=20`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch locations")
        }

        const responseData = await response.json()

        // Transform the API response to match our LocationOption interface
        if (responseData.data && Array.isArray(responseData.data.attributes)) {
          const transformedData: LocationOption[] = responseData.data.attributes.map((item: any) => ({
            id: item.id,
            name: item.name,
            coordinates: item.coordinates,
            location_type: item.location_type,
            path: item.path,
            path_name: item.path_name,
            url_slug: item.url_slug || "",
            level: item.level,
          }))

          setSuggestions(transformedData)
          setError(null)
        } else {
          setSuggestions([])
          setError("No locations found")
        }
      } catch (err) {
        setError("Unable to fetch locations. Please try again.")
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  // Select a location
  const handleLocationSelect = (location: LocationOption) => {
    setSelectedLocation(location)

    // Format the display name based on location type and path
    let displayName = location.name
    if (location.path_name && location.location_type !== "CITY") {
      displayName = `${location.name}, ${location.path_name}`
    }

    setSearchTerm(displayName)
    setSuggestions([])

    // Set the form values
    setValue("location", {
      country: location.name,
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lon,
      location_id: location.id,
      location_type: location.location_type,
    })
  }

  const handleClear = () => {
    setSearchTerm("")
    setSelectedLocation(null)
    setSuggestions([])
    setValue("location", null)
  }

  // Helper function to get location type label
  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case "CITY":
        return "City"
      case "COMMUNITY":
        return "Community"
      case "SUBCOMMUNITY":
        return "Subcommunity"
      case "TOWER":
        return "Building"
      default:
        return type
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <InputGroup
          type="text"
          value={searchTerm}
          handleChange={handleSearchChange}
          placeholder="Search for a location"
          className={`w-full rounded-md py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {searchTerm && (
          <button type="button" onClick={handleClear} className="absolute inset-y-0 right-0 flex items-center pr-3">
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Error Message */}
      {errors?.location?.country && (
        <div className="mt-2 text-sm text-red-500">{errors.location.country.message as string}</div>
      )}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute z-10 w-full rounded bg-gray-800">
          <div className="p-2 text-center text-white">Searching...</div>
        </div>
      )}

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 max-h-60 w-full overflow-y-auto border border-gray-600 bg-gray-800 text-white shadow-lg">
          {suggestions.map((location) => (
            <li
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className="hover:bg-gray-700 cursor-pointer px-5 py-3"
            >
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                <div>
                  <div className="font-medium">{location.name}</div>
                  {location.path_name && (
                    <div className="text-sm text-gray-400">
                      {location.path_name} • {getLocationTypeLabel(location.location_type)}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* API Error Message */}
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {/* Location Details */}
      {selectedLocation && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Latitude</label>
            <InputGroup
              placeholder="Latitude"
              type="text"
              value={selectedLocation.coordinates.lat.toString()}
              disabled
              className="w-full rounded-md py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Longitude</label>
            <InputGroup
              placeholder="Longitude"
              type="text"
              value={selectedLocation.coordinates.lon.toString()}
              disabled
              className="w-full rounded-md py-2"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationSelector

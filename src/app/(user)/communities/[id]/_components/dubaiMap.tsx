"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface MapProps {
  className?: string
  latitude?: number
  longitude?: number
  title?: string
}

export const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0a1e36" }],
  },
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
]

export default function DubaiMap({
  className = "",
  latitude = 25.2048,
  longitude = 55.2708,
  title = "Dubai Creek Harbour",
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [google, setGoogle] = useState<any>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      })

      const { Map } = await loader.importLibrary("maps")
      const googleMaps = await loader.load()

      setGoogle(googleMaps)

      const mapCenter = { lat: latitude, lng: longitude }

      const mapOptions: any = {
        center: mapCenter,
        zoom: 12,
        disableDefaultUI: true,
        styles: mapStyles,
      }

      if (mapRef.current) {
        const mapInstance = new Map(mapRef.current, mapOptions)
        setMap(mapInstance)

        // Add custom markers
        const locations = [
          {
            position: { lat: latitude, lng: longitude },
            title: title,
            icon: {
              path: googleMaps.maps.SymbolPath.CIRCLE,
              fillColor: "#0a1e36",
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8,
            },
          },
          {
            position: { lat: 25.2532, lng: 55.3657 },
            title: "Palm Jumeirah",
            icon: {
              path: googleMaps.maps.SymbolPath.CIRCLE,
              fillColor: "#0a1e36",
              fillOpacity: 0.4,
              strokeWeight: 0,
              scale: 6,
            },
          },
          // Add more locations as needed
        ]

        locations.forEach((location) => {
          new googleMaps.maps.Marker({
            position: location.position,
            map: mapInstance,
            title: location.title,
            icon: location.icon,
          })
        })
      }
    }

    initMap()
  }, [latitude, longitude, title])

  return (
    <div className={`relative w-full h-[550px] md:h-[700px] lg:h-[700px] containers !py-15 ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}


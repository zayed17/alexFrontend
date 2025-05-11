import React from "react"
import * as LucideIcons from "lucide-react"

interface AmenityProps {
  iconName: string
  title: string
  description?: string
}

interface AmenitiesSectionProps {
  amenities: Array<{
    _id?: string
    id?: string
    title: string
    iconName: string
    description?: string
  }>
}

const AmenitiesSection = ({ amenities = [] }: AmenitiesSectionProps) => {
  // Fallback/default amenities if none are passed
  const defaultAmenities: AmenityProps[] = [
    { iconName: "Sun", title: "Lagoon Beach" },
    { iconName: "Waves", title: "Adventure Water Sports" },
    { iconName: "Droplet", title: "Swimming Pools" },
    { iconName: "ToyBrick", title: "Children Play Areas" },
    { iconName: "Video", title: "Outdoor Cinema" },
    { iconName: "TreePalm", title: "Landscaped Parks" },
  ]

  const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities

  return (
    <section className="py-12 bg-white">
      <div className="containers mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">Amenities to Adore</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
          {displayAmenities.map((amenity:any, index) => {
          const Icon = LucideIcons[amenity.iconName as keyof typeof LucideIcons] as React.ComponentType<any>;

            return (
              <div
                key={amenity._id || index}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-sm w-full max-w-xs h-40"
              >
                <div className="mb-4">
                  <Icon size={30} />
                </div>
                <p className="text-xs text-center font-medium uppercase tracking-wide">
                  {amenity.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AmenitiesSection

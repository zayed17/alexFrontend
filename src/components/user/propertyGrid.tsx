import PropertyCard from "./propertyCard"

interface PropertyGridProps {
  properties: any[]
  type?: "readyProperty" | "offPlan" | string
}

export default function PropertyGrid({ properties, type }: PropertyGridProps) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No properties available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-[4%] sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-12">
      {properties.map((property, index) => (
        <PropertyCard key={property._id || index} property={property} type={type} />
      ))}
    </div>
  )
}

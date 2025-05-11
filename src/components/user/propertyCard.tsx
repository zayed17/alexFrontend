import Image from "next/image"
import { Tag, Home } from "lucide-react"
import Link from "next/link"

interface PropertyCardProps {
  property: any
  type?: "readyProperty" | "offPlan" | string
}

export default function PropertyCard({ property, type }: PropertyCardProps) {
  return (
    <div className="col-span-6 overflow-hidden rounded-sm bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full sm:h-56 md:h-64 lg:h-72">
        <Image
          src={property.image || property.mainImage || property.sliderImages?.[0]}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 50vw, 33vw"
          priority={false}
        />
      </div>

      {/* Content section */}
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="truncate font-presto text-lg font-medium text-gray-800 sm:text-xl md:text-2xl">
          {property.title}
        </h3>

        <div className="mt-3 flex flex-col space-y-3 md:flex-col md:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2 sm:flex sm:items-center sm:gap-4 sm:space-y-0">
            <div className="flex items-center text-xs font-bold sm:text-sm">
              <Tag className="mr-2 h-4 w-4 flex-shrink-0 text-gray-700" />
              <span className="truncate">
                {type=="readyProperty"? "AED" + " " + property.price : `STARTING FROM ${property.price}`}
              </span>
            </div>
            <div className="flex items-center text-xs font-bold sm:text-sm">
              <Home className="mr-2 h-4 w-4 flex-shrink-0 text-gray-700" />
              <span>{property.bedrooms} BEDROOMS</span>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <Link
              href={`/${type === "readyProperty" ? "ready-properties" : "realestate"}/${property._id}`}
              className="block bg-[#0a1e36] px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#152c47] focus:outline-none focus:ring-2 focus:ring-[#0a1e36] focus:ring-offset-2 sm:px-5"
            >
              CHECK AVAILABILITY
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

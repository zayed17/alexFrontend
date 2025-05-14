"use client"
import Image from "next/image"

interface DevelopmentSectionProps {
  title: string
  description: string
  secondDescription: string
  valueStatement: string
  images: string[]
}

const DevelopmentSection = ({
  title,
  description,
  secondDescription,
  valueStatement,
  images,
}: DevelopmentSectionProps) => {
  return (
    <div className="w-full bg-white containers">
      <div className="">
        {/* Section Title */}
        <h2 className="text-3xl font-serif text-gray-900 mb-8 md:mb-10">{title}</h2>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* Left Column - Description */}
          <div className="lg:w-[50%] space-y-4">
            <p className="text-sm leading-relaxed text-gray-700">{description}</p>
            <p className="text-sm leading-relaxed text-gray-700">{secondDescription}</p>
          </div>

          {/* Right Column - Values */}
          <div className="lg:w-[50%]  space-y-4">
            <p className="text-sm leading-relaxed text-gray-700 ">{valueStatement}</p>
          </div>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-64 md:h-80 overflow-hidden rounded-2xl shadow-md transition-transform hover:scale-[1.02] duration-300"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DevelopmentSection

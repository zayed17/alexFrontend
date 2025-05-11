import Image from "next/image";

export default function BuildingExcellence() {
  return (
    <div className="w-full bg-white">
      {/* Top Section with Title and Description */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col gap-0 md:flex-row md:gap-0 lg:gap-0">
          {/* Left Title Section */}
          <div className="w-full md:w-1/2 px-0 md:px-17 ">
            <div className="w-full md:w-[80%] lg:w-[65%]">
              <h2 className="font-presto text-2xl md:text-3xl font-light text-gray-900">
                Building Excellence for Generations
              </h2>
            </div>
          </div>

          {/* Right Description Section */}
          <div className="w-full md:w-1/2">
            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              At Satina Realty, we pride ourselves on our uncompromising
              standards. Our focus on craftsmanship and detailing is part of our
              legacy, spanning for decades. So while others may consider minor
              details to be minor, we understand how these little aspects come
              together to create an extraordinary living experience.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section with Images and Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Images Grid */}
        <div className="w-full md:w-1/2">
          <div className="relative grid grid-cols-12 gap-2 md:gap-3">
            {/* Large square image (left top) */}
            <div className="col-span-8 row-span-1">
              <div className="relative h-64 md:h-80 lg:h-96 w-full">
                <Image
                  src="/images/dubaiharbour/card-1.png"
                  alt="Luxury property exterior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Tall rectangle image (right) */}
            <div className="col-span-4 row-span-8">
              <div className="relative h-full w-full">
                <Image
                  src="/images/dubaiharbour/card-2.png"
                  alt="Property detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Small blue square (bottom left) */}
            <div className="col-span-8 row-span-1 flex justify-end">
              <div className="h-16 w-16 md:h-18 md:w-18 lg:h-18 lg:w-18 bg-[#071C35]"></div>
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-center px-4 py-8 md:px-6 md:py-12 lg:px-8 w-full md:w-1/2">
          {/* Title and Description */}
          <div className="mb-8 md:mb-12">
            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl font-light text-gray-900 font-presto">
              Building Excellence for Generations
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              At Satina Realty, we pride ourselves on our uncompromising
              standards. Our focus on craftsmanship and detailing is part of our
              legacy, spanning for decades. So while others may consider minor
              details to be minor, we understand how these little aspects come
              together to create an extraordinary living experience.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Stat 1 */}
            <div className="pb-2 md:pb-4">
              <h3 className="mb-1 text-2xl md:text-3xl font-presto text-gray-900">
                1000+
              </h3>
              <p className="mb-2 md:mb-4 text-xs text-gray-600">
                Created an extraordinary experience
              </p>
              <div className="border-t border-[##071C35] w-50 md:w-50 lg:w-50"></div>
            </div>

            {/* Stat 2 */}
            <div className="pb-2 md:pb-4">
              <h3 className="mb-1 text-2xl md:text-3xl font-presto text-gray-900">
                1000+
              </h3>
              <p className="mb-2 md:mb-4 text-xs text-gray-600">
                Created an extraordinary experience
              </p>
              <div className="border-t border-[##071C35] w-50 md:w-50 lg:w-50"></div>
            </div>

            {/* Stat 3 */}
            <div className="pb-2 md:pb-4">
              <h3 className="mb-1 text-2xl md:text-3xl font-presto text-gray-900">
                1000+
              </h3>
              <p className="mb-2 md:mb-4 text-xs text-gray-600">
                Created an extraordinary experience
              </p>
              <div className="border-t border-[##071C35] w-50 md:w-50 lg:w-50"></div>
            </div>

            {/* Stat 4 */}
            <div className="pb-2 md:pb-4">
              <h3 className="mb-1 text-2xl md:text-3xl font-presto text-gray-900">
                1000+
              </h3>
              <p className="mb-2 md:mb-4 text-xs text-gray-600">
                Created an extraordinary experience
              </p>
              <div className="border-t border-[##071C35] w-50 md:w-50 lg:w-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
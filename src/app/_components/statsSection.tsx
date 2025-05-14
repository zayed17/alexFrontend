"use client"
import Image from "next/image"
import { ArrowUp } from "lucide-react"
import { stock } from "@/constants/images"

// Define types for our property statistics
interface PropertyStat {
  id: string
  oldValue: number
  oldYear: number
  newValue: number
  newYear: number
  percentageIncrease: number
  description: string
}

export default function DubaiPropertyStats() {
  // Array of property statistics data
  const propertyStats: PropertyStat[] = [
    {
      id: "apartments",
      oldValue: 666,
      oldYear: 2023,
      newValue: 856,
      newYear: 2024,
      percentageIncrease: 28.5,
      description: "apartments",
    },
    {
      id: "land-plots",
      oldValue: 115,
      oldYear: 2023,
      newValue: 209,
      newYear: 2024,
      percentageIncrease: 81.7,
      description: "land plots",
    },
  ]

  return (
    <section className="mx-auto my-12 max-w-[110rem] px-[5%]">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Stats Card */}
        <div className="w-full overflow-hidden rounded-[40px] shadow-lg lg:w-1/2">
          {/* Blue stats section */}
          <div className="bg-[#091c33] p-8 px-18">
            {/* Map through the property stats array */}
            {propertyStats.map((stat) => (
              <div key={stat.id} className="mb-10 pt-3">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <h3 className="mb-1 text-4xl font-bold text-white md:text-4xl font-presto">{stat.oldValue}</h3>
                    <p className="text-sm text-gray-300">USD/ sq. m ({stat.oldYear})</p>
                  </div>

                  <div className="flex items-center rounded-full bg-[#0c2e4e] px-3 py-1">
                    <ArrowUp className="mr-1 h-4 w-4 text-green-400" />
                    <span className="font-medium text-green-400">{stat.percentageIncrease}%</span>
                  </div>

                  <div className="text-center">
                    <h3 className="mb-1 text-4xl font-bold text-white md:text-4xl font-presto">{stat.newValue}</h3>
                    <p className="text-sm text-gray-300">USD/ sq. m ({stat.newYear})</p>
                  </div>
                </div>
                <p className="my-5 text-xs text-center text-gray-400">
                  * Price increase per sq. m for {stat.description}, according to Property Monitor*
                </p>
              </div>
            ))}
          </div>

          {/* White text section */}
          <div className="bg-white px-12 py-10">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl font-presto">
              Apartment prices soared by <span className="text-green-500 font-presto">25.3%</span> in 2024
            </h2>

            <p className="mb-4 text-gray-800">
              Apartment bought for 1,000,000 in 2024 now costs 1,250,000. That's a 25.3% increase in value. That's not
              all. Land plots are up 81.6% for the same period.
            </p>

            <p className="text-gray-800">
              Dubai Islands is also great for rental. With short-term rental ROI expected to hit 15%. Which means that
              it will take you 6.6 years to recoup your initial investment. Long term rental ROI is projected to be 8% -
              which outperforms Europe and United states. And you don't pay income tax in Dubai. So whatever you decide
              to do with your property - it will be profitable!
            </p>
          </div>
        </div>

        {/* Image Card */}
        <div className="relative h-[600px] w-full overflow-hidden rounded-[40px] shadow-lg lg:h-auto lg:w-1/2">
          <Image
            src={stock || "/placeholder.svg"}
            alt="Dubai Islands modern skyscrapers with waterfront view"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}

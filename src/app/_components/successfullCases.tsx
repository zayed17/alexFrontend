"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { success1 } from "@/constants/images"

interface SuccessfulCase {
  id: number
  image: any
  roi: string
  period: string
  propertyType: string
  location: string
  area: string
  purchasePrice: number
  investorPaid: number
  currentPrice: number
  percentageGain: number
}

export default function SuccessfulCases() {
  const cases: SuccessfulCase[] = [
    {
      id: 1,
      image: success1,
      roi: "50%",
      period: "8 months",
      propertyType: "2 bedroom apartment",
      location: "W Residences",
      area: "Downtown, Dubai",
      purchasePrice: 583000,
      investorPaid: 204000,
      currentPrice: 685000,
      percentageGain: 17.5,
    },
    {
      id: 2,
      image: success1,
      roi: "50%",
      period: "8 months",
      propertyType: "2 bedroom apartment",
      location: "W Residences",
      area: "Downtown, Dubai",
      purchasePrice: 583000,
      investorPaid: 204000,
      currentPrice: 685000,
      percentageGain: 17.5,
    },
    {
      id: 3,
      image: success1,
      roi: "50%",
      period: "8 months",
      propertyType: "2 bedroom apartment",
      location: "W Residences",
      area: "Downtown, Dubai",
      purchasePrice: 583000,
      investorPaid: 204000,
      currentPrice: 685000,
      percentageGain: 17.5,
    },
    {
      id: 4,
      image: success1,
      roi: "45%",
      period: "10 months",
      propertyType: "3 bedroom penthouse",
      location: "Marina Heights",
      area: "Dubai Marina, Dubai",
      purchasePrice: 750000,
      investorPaid: 300000,
      currentPrice: 875000,
      percentageGain: 16.7,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update visible cards on window resize
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    // Set initial value
    updateVisibleCards()

    // Add event listener
    window.addEventListener("resize", updateVisibleCards)

    // Clean up
    return () => window.removeEventListener("resize", updateVisibleCards)
  }, [])

  const maxIndex = Math.max(0, cases.length - visibleCards)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString()}`
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="px-4 sm:px-6 md:px-8 mx-auto containers max-w-[110rem]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-0">Successful Cases</h2>
          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 sm:p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous case"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 sm:p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next case"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {cases.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3 mb-4 sm:mb-0"
                style={{ flex: `0 0 ${100 / visibleCards}%` }}
              >
                <div className="bg-white rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden shadow-sm h-full">
                  <div className="relative h-40 sm:h-48 md:h-56 w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.propertyType} in ${item.location}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 font-presto">
                      {item.roi} ROI in {item.period}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-2">
                      {item.propertyType} in {item.location}, {item.area}
                    </p>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p>Purchase price from developer: {formatCurrency(item.purchasePrice)}</p>
                      <p>Paid by investor: {formatCurrency(item.investorPaid)}</p>
                      <p>
                        Apartment price today: {formatCurrency(item.currentPrice)} (+{item.percentageGain}%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile pagination indicator */}
        <div className="flex justify-center mt-4 sm:hidden">
          {cases.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

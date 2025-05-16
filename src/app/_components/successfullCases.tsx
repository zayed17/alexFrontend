"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { success1 } from "@/constants/images";

interface SuccessfulCase {
  id: number;
  image: any;
  roi: string;
  period: string;
  propertyType: string;
  location: string;
  area: string;
  purchasePrice: number;
  investorPaid: number;
  currentPrice: number;
  percentageGain: number;
}

export default function SuccessfulCases({ successfulCases }: any) {
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update visible cards on window resize
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    // Set initial value
    updateVisibleCards();

    // Add event listener
    window.addEventListener("resize", updateVisibleCards);

    // Clean up
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, cases.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };


  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="containers mx-auto max-w-[110rem] px-4 sm:px-6 md:px-8">
        <div className="mb-6 flex flex-col items-start justify-between sm:mb-8 sm:flex-row sm:items-center">
          <h2 className="mb-4 font-serif text-2xl sm:mb-0 sm:text-3xl md:text-4xl">
            Successful Cases
          </h2>
          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:p-3"
              aria-label="Previous case"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex || successfulCases?.length < 3}
              className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:p-3"
              aria-label="Next case"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {successfulCases.map((item:any) => (
              <div
                key={item._id}
                className="mb-4 w-full flex-shrink-0 px-2 sm:mb-0 sm:w-1/2 sm:px-3 lg:w-1/3"
                style={{ flex: `0 0 ${100 / visibleCards}%` }}
              >
                <div className="h-full overflow-hidden rounded-[20px] bg-white shadow-sm sm:rounded-[30px] md:rounded-[40px]">
                  <div className="relative h-40 w-full sm:h-48 md:h-56">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`${item.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
                    <h3 className="mb-2 font-presto text-xl font-bold sm:mb-4 sm:text-2xl">
                      {item.title}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm">
                      {item.features.map((val: any, index: number) => (
                        <>
                          <p>{val}</p>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile pagination indicator */}
        <div className="mt-4 flex justify-center sm:hidden">
          {cases.map((_, index) => (
            <button
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

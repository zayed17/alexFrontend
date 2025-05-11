"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const SuccessfulCases = ({ successfulCases }:any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCases, setVisibleCases] = useState<any>([]);

  // Process case descriptions (split by \n)
  useEffect(() => {
    if (successfulCases && successfulCases.length > 0) {
      // Set initial visible cases
      updateVisibleCases(0);
    }
  }, [successfulCases]);

  // Update visible cases based on current index
  const updateVisibleCases = (startIndex:number) => {
    if (successfulCases && successfulCases.length > 0) {
      const endIndex = Math.min(startIndex + 3, successfulCases.length);
      setVisibleCases(successfulCases.slice(startIndex, endIndex));
    }
  };

  // Handle navigation
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = Math.max(0, currentIndex - 3);
      setCurrentIndex(newIndex);
      updateVisibleCases(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < successfulCases.length) {
      const newIndex = currentIndex + 3;
      setCurrentIndex(newIndex);
      updateVisibleCases(newIndex);
    }
  };

  // Process case details from description
  const processCaseDetails = (description:string) => {
    if (!description) return [];
    const lines = description.split("\n");
    return lines;
  };

  // Check if we have cases to display
  if (!successfulCases || successfulCases.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#F5F6F7] py-12 md:py-16 px-0 md:px-5 lg:px-5">
      <div className="mx-auto containers px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium text-gray-900 font-presto">
            Successful Cases
          </h2>
          <div className="flex gap-2">
            <button 
              className="rounded-full border border-gray-300 p-2"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={currentIndex === 0 ? "#D1D5DB" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              className="rounded-full border border-gray-300 p-2"
              onClick={handleNext}
              disabled={currentIndex + 3 >= successfulCases.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={currentIndex + 3 >= successfulCases.length ? "#D1D5DB" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        {visibleCases.length > 0 && (
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6">
              {/* First card - top left */}
              {visibleCases[0] && (
                <div className="col-span-8 flex overflow-hidden bg-white">
                  <div className="w-2/5">
                    <div className="relative h-48 w-full">
                      <Image
                        src={visibleCases[0].caseImages || "/placeholder.svg"}
                        alt={visibleCases[0].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="w-3/5 p-6">
                    <h3 className="mb-2 text-lg font-medium text-gray-900 font-presto">
                      {visibleCases[0].title}
                    </h3>
                    {processCaseDetails(visibleCases[0].description).map((line, index) => (
                      <p 
                        key={index} 
                        className={index === 0 ? "mb-3 text-sm text-gray-800" : "mb-1 text-xs text-gray-600"}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Third card - right side (full height) */}
              {visibleCases[2] && (
                <div className="col-span-4 row-span-2 overflow-hidden bg-white">
                  <div className="relative h-48 w-full">
                    <Image
                      src={visibleCases[2].caseImages || "/placeholder.svg"}
                      alt={visibleCases[2].title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-medium text-gray-900 font-presto">
                      {visibleCases[2].title}
                    </h3>
                    {processCaseDetails(visibleCases[2].description).map((line, index) => (
                      <p 
                        key={index} 
                        className={index === 0 ? "mb-3 text-sm text-gray-800" : "mb-1 text-xs text-gray-600"}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Second card - bottom left */}
              {visibleCases[1] && (
                <div className="col-span-8 flex overflow-hidden bg-white">
                  <div className="w-3/5 p-6">
                    <h3 className="mb-2 text-lg font-medium text-gray-900 font-presto">
                      {visibleCases[1].title}
                    </h3>
                    {processCaseDetails(visibleCases[1].description).map((line, index) => (
                      <p 
                        key={index} 
                        className={index === 0 ? "mb-3 text-sm text-gray-800" : "mb-1 text-xs text-gray-600"}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="w-2/5">
                    <div className="relative h-48 w-full">
                      <Image
                        src={visibleCases[1].caseImages || "/placeholder.svg"}
                        alt={visibleCases[1].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tablet layout */}
        {visibleCases.length > 0 && (
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6">
              {/* First card */}
              {visibleCases[0] && (
                <div className="flex overflow-hidden bg-white">
                  <div className="w-2/5">
                    <div className="relative h-40 w-full">
                      <Image
                        src={visibleCases[0].caseImages || "/placeholder.svg"}
                        alt={visibleCases[0].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="w-3/5 p-4">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {visibleCases[0].title}
                    </h3>
                    {processCaseDetails(visibleCases[0].description).map((line, index) => (
                      <p 
                        key={index} 
                        className={index === 0 ? "mb-2 text-sm" : "mb-1 text-xs text-gray-600"}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Second card */}
              {visibleCases[1] && (
                <div className="flex overflow-hidden bg-white">
                  <div className="w-3/5 p-4">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {visibleCases[1].title}
                    </h3>
                    {processCaseDetails(visibleCases[1].description).map((line, index) => (
                      <p 
                        key={index} 
                        className={index === 0 ? "mb-2 text-sm" : "mb-1 text-xs text-gray-600"}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="w-2/5">
                    <div className="relative h-40 w-full">
                      <Image
                        src={visibleCases[1].caseImages || "/placeholder.svg"}
                        alt={visibleCases[1].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Third card */}
              {visibleCases[2] && (
                <div className="col-span-2 flex overflow-hidden bg-white">
                  <div className="w-2/5">
                    <div className="relative h-40 w-full">
                      <Image
                        src={visibleCases[2].caseImages || "/placeholder.svg"}
                        alt={visibleCases[2].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="w-3/5 p-4">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      {visibleCases[2].title}
                    </h3>
                    {processCaseDetails(visibleCases[2].description).map((line, index) => (
                      <p 
                        key={index} 
                        className={index === 0 ? "mb-2 text-sm" : "mb-1 text-xs text-gray-600"}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile layout - Fully Responsive Grid */}
        {visibleCases.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
            {visibleCases.map((item:any) => (
              <div
                key={item._id}
                className="flex flex-col overflow-hidden bg-white shadow-md"
              >
                {/* Image on Top */}
                <div className="relative h-48 w-full">
                  <Image
                    src={item.caseImages || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Text Content Below */}
                <div className="flex flex-grow flex-col p-4">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  {processCaseDetails(item.description).map((line:any, index:number) => (
                    <p 
                      key={index} 
                      className={index === 0 ? "mb-2 text-sm text-gray-800" : "mb-1 text-xs text-gray-600"}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessfulCases;
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RealEstateLanding({ propertyData }: any) {
  const [showBanner, setShowBanner] = useState(false);
  const [animationClass, setAnimationClass] = useState("opacity-0 scale-95");

  useEffect(() => {
    let timeout: any;
    if (showBanner) {
      timeout = setTimeout(() => {
        setAnimationClass(
          "opacity-100 scale-100 transition-all duration-300 ease-in-out",
        );
      }, 10);
    } else {
      setAnimationClass(
        "opacity-0 scale-95 transition-all duration-300 ease-in-out",
      );
    }

    return () => clearTimeout(timeout);
  }, [showBanner]);

  const downloadWithFetch = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };


  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="relative h-96 w-full md:h-[550px] lg:h-[600px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={propertyData.mainImage}
            alt={`${propertyData.title}`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />{" "}
          {/* Darker overlay */}
        </div>

        <div className="relative z-20 flex h-full flex-col items-center">
          <div className="mx-auto max-w-4xl px-4 pt-16 text-center md:pt-24 lg:pt-32">
            <h1 className="mb-1 text-3xl font-light text-white sm:text-4xl md:text-5xl">
              {propertyData.title}
            </h1>
            {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white">in {propertyData.location}</h2> */}
          </div>

          {/* Pricing info at the bottom of the image */}
          <div className="absolute bottom-0 left-0 right-0 w-full bg-black/30 py-4 md:py-6 lg:py-8">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 md:flex md:grid-cols-4 md:justify-between md:gap-0">
              <div className="flex flex-col items-center">
                <p className="mb-1 text-xs text-white/80 sm:text-sm">
                  Price Starting from
                </p>
                <p className="text-lg font-medium text-white sm:text-xl md:text-2xl">
                  {propertyData.price}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="mb-1 text-xs text-white/80 sm:text-sm">
                  Payment Plan
                </p>
                <p className="text-lg font-medium text-white sm:text-xl md:text-2xl">
                  {propertyData.paymentPlan}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="mb-1 text-xs text-white/80 sm:text-sm">
                  Area from(sq. ft.)
                </p>
                <p className="text-lg font-medium text-white sm:text-xl md:text-2xl">
                  {propertyData.areaSize}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="mb-1 text-xs text-white/80 sm:text-sm">
                  Handover
                </p>
                <p className="text-lg font-medium text-white sm:text-xl md:text-2xl">
                  {propertyData.handover}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="w-full bg-white py-4 md:py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 justify-between gap-4 text-start sm:grid-cols-3 md:grid-cols-5 md:gap-3">
            <div className="flex flex-col items-start py-2">
              <p className="font-presto text-lg !font-extrabold text-gray-800 sm:text-xl">
                {propertyData.paymentStructure}
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">
                Payment Structure
              </p>
            </div>
            <div className="flex flex-col items-start justify-center py-2">
              <p className="font-presto text-lg font-medium text-gray-800 sm:text-xl">
                {propertyData.downPayment}
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">Down Payment</p>
            </div>
            <div className="flex flex-col items-start py-2">
              <p className="font-presto text-lg font-medium text-gray-800 sm:text-xl">
                {propertyData.developer}
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">Developer</p>
            </div>
            <div className="flex flex-col items-start py-2">
              <p className="font-presto text-lg font-medium text-gray-800 sm:text-xl">
                {propertyData.bedrooms}
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">Bedrooms</p>
            </div>
            <div className="col-span-2 flex flex-col items-start py-2 sm:col-span-1">
              <p className="font-presto text-lg font-medium text-gray-800 sm:text-xl">
                {propertyData.unit}
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">
                Number of Units
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Plus Button */}
      <div className="fixed !bottom-22 right-4 z-40 sm:bottom-6 sm:right-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 sm:h-12 sm:w-12"
          onClick={() => setShowBanner(!showBanner)}
        >
          {showBanner ? (
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
          <span className="sr-only">{showBanner ? "Close" : "Open"}</span>
        </Button>
      </div>

      {/* Download Banner with Smooth Animation */}
      {showBanner && (
        <div
          className={`fixed bottom-34 md:bottom-22 lg:bottom-22 right-4 z-40 origin-bottom-right transform sm:right-6 md:right-20 ${animationClass}`}
        >
          <div className="rounded-3xl bg-gray-800 p-2 shadow-lg sm:p-3 md:p-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              {propertyData?.downloads?.brochure && (
                <Button
                  className="whitespace-nowrap rounded-full  bg-white px-3 py-1 text-xs !hover:bg-white text-gray-800 hover:bg-white  sm:px-4 sm:py-2 md:px-6"
                  onClick={() =>
                    downloadWithFetch(propertyData.downloads.brochure,'brochure.pdf')
                  }
                >
                  DOWNLOAD BROCHURE
                </Button>
              )}
              {propertyData?.downloads?.floorPlan && (
                <Button
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs !hover:bg-white text-gray-800 hover:bg-white sm:px-4 sm:py-2 md:px-6"
                  onClick={() =>
                    downloadWithFetch(propertyData.downloads.floorPlan,'floorPlan.pdf')
                  }
                >
                  DOWNLOAD FLOOR PLAN
                </Button>
              )}
              {propertyData?.downloads?.masterPlan && (
                <Button
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs !hover:bg-white text-gray-800 hover:bg-white sm:px-4 sm:py-2 md:px-6"
                  onClick={() =>
                    downloadWithFetch(propertyData.downloads.masterPlan,'masterPlan.pdf')
                  }
                >
                  DOWNLOAD MASTER PLAN
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

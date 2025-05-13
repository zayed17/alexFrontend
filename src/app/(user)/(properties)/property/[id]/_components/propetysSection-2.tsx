"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PropertySection2({ propertyData }: any) {
  return (
    <div className="containers">
      <div className="!py-20   w-full  ">
        {/* Main Container with Rounded Corners */}
        <div className="flex flex-col overflow-hidden bg-white md:flex-row">
          {/* Image Section */}
          <div className="relative h-64 w-full md:h-auto md:w-1/2">
            <Image
              src={
                propertyData.mainImage ||
                "/placeholder.svg?height=600&width=800"
              }
              alt={`${propertyData.title}`}
              fill
              priority
              className="rounded-3xl object-cover"
            />
          </div>

          {/* Text and Button Section */}
          <div className="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-8 lg:p-10">
            {/* Title */}
            <h1 className="mb-4 font-presto text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              {propertyData.title ||
                "Refined collection of luxurious Properties"}
            </h1>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
              {propertyData.description ||
                "DIFC Heights Tower is an upcoming residential project located in DIFC. The developer of the complex is DIFC Developments."}
            </p>

            {/* Amenities List */}
            <ul className="mb-8 space-y-2 text-sm text-gray-600 md:text-base">
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-gray-600"></span>
                Internal Kids Play Area
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-gray-600"></span>
                State-of-the-Art Gymnasium
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-gray-600"></span>
                Swimming Pools
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-gray-600"></span>
                Co-working Space
              </li>
            </ul>

            {/* Check Availability Button */}
            <div className="mt-auto flex justify-start">
              <Button className="rounded-full bg-[#0a1e3b] px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-[#152c4e]">
                CHECK AVAILABILITY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

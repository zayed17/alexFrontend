"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyLanding({ propertyData }: any) {
  return (
    <div className="containers w-full">
      {/* Main Container with Rounded Corners */}
      <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
        {/* Hero Section */}
        <div className="relative h-96 w-full md:h-[500px] lg:h-[500px]">
          <div className="absolute inset-0 z-0">
            <Image
              src={propertyData.mainImage || "/placeholder.svg"}
              alt={`${propertyData.title}`}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-20 flex h-full flex-col items-center">
            <div className="mx-auto max-w-4xl px-4 pt-16 text-center md:pt-24 lg:pt-32">
              <h1 className="mb-1 text-3xl font-light text-white sm:text-4xl md:text-5xl max-w-lg">
                {propertyData.title}
              </h1>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-4">
              <Button className="rounded-full bg-[#9b8e6e] px-6 py-2 text-white hover:bg-[#8a7d5d]">
                CHECK AVAILABILITY
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white bg-transparent px-6 py-2 text-white hover:bg-white/10"
              >
                EXPLORE UNITS
              </Button>
            </div>

            {/* Pricing Info at the Bottom of Hero */}
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
                    Area from (sq. ft.)
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
        <div className="w-full rounded-b-3xl bg-white py-4 md:py-6">
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative grid grid-cols-2 justify-between gap-4 text-center sm:grid-cols-3 md:grid-cols-5 md:gap-3">
              <div className="flex flex-col items-center py-2">
                <p className="text-lg font-extrabold text-gray-800 sm:text-xl">
                  {propertyData.paymentStructure}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Payment Structure
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <p className="text-lg font-medium text-gray-800 sm:text-xl">
                  {propertyData.downPayment}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">Down Payment</p>
              </div>
              <div className="flex flex-col items-center py-2">
                <p className="text-lg font-medium text-gray-800 sm:text-xl">
                  {propertyData.developer}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">Developer</p>
              </div>
              <div className="flex flex-col items-center py-2">
                <p className="text-lg font-medium text-gray-800 sm:text-xl">
                  {propertyData.bedrooms}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">Bedrooms</p>
              </div>
              <div className="col-span-2 flex flex-col items-center py-2 sm:col-span-1">
                <p className="text-lg font-medium text-gray-800 sm:text-xl">
                  {propertyData.unit}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Number of Units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import PropertyHeader from "./property-header";



export default function PropertyListing({
  property 
}: {
  property?: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBookNow = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Booking request submitted!");
    }, 1500);
  };

  const handleScheduleViewing = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Viewing scheduled!");
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(amount);
  };



  return (
    <div className="w-full">

      <PropertyHeader
        location={property?.location?.country}
        features={property?.features}
        price={property?.price}
        onBookNow={() => alert("Custom booking handler")}
      />


      <div className="bg-[#071C350A]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 py-4 sm:grid-cols-3">
          <div className="border-custom-border border-b p-4 sm:p-6 text-center sm:border-0 sm:border-r">
            <div className="text-xs sm:text-sm text-gray-500">Area (sq. ft.)</div>
            <div className="font-presto text-base sm:text-lg font-medium">
              {Number(property?.areaSize).toLocaleString()} Sq. ft.
            </div>
          </div>
          <div className="border-custom-border border-b p-4 sm:p-6 text-center sm:border-0 sm:border-r">
            <div className="text-xs sm:text-sm text-gray-500">Furnished</div>
            <div className="font-presto text-base sm:text-lg font-medium">
              {property.isFurnished ? "Fully Furnished" : "Non Furnished"}
            </div>
          </div>
          <div className="p-4 sm:p-6 text-center">
            <div className="text-xs sm:text-sm text-gray-500">Bed & Bath</div>
            <div className="font-presto text-base sm:text-lg font-medium">
              {property.bedrooms} Bed & {property.bathrooms} Bath
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 md:px-8">
        <h2 className="mb-4 sm:mb-6 text-center font-presto text-xl sm:text-2xl font-semibold">
          Property Details
        </h2>
        <p className="mb-6 sm:mb-8 text-center text-sm sm:text-base text-gray-700">
         {property.description}
        </p>
        <p className="text-center text-sm sm:text-base text-gray-700">
          {property?.locationBenefits?.join(". ")}
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 sm:px-6 py-6 md:px-8">
        <div className="text-center">
          <div className="mb-2 text-xs sm:text-sm text-gray-500">Property Status</div>
          <div className="font-presto text-base sm:text-lg font-medium">
            {property.propertyStatus}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-xs sm:text-sm text-gray-500">
            Selling Price (Incl. VAT)
          </div>
          <div className="font-presto text-base sm:text-lg font-medium">
               AED {Number(property.sellingPrice)?.toLocaleString("en-AE")}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-xs sm:text-sm text-gray-500">
            Land Registration Fee
          </div>
          <div className="font-presto text-base sm:text-lg font-medium">
               AED {Number(property?.landFee)?.toLocaleString("en-AE")}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-xs sm:text-sm text-gray-500">OQOOD Amount</div>
          <div className="font-presto text-base sm:text-lg font-medium">
               AED {Number(property?.oqoodAmount)?.toLocaleString("en-AE")}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-xs sm:text-sm text-gray-500">
            Applicable Fees to DLP
          </div>
          <div className="font-presto text-base sm:text-lg font-medium">
               AED {Number(property?.dlpAmount)?.toLocaleString("en-AE")}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-xs sm:text-sm text-gray-500">Property Usage</div>
          <div className="font-presto text-base sm:text-lg font-medium">
            {property.propertyUsage}
          </div>
        </div>
      </div>

      {/* Schedule Viewing Button */}
      {/* <div className="mb-6 sm:mb-8 flex justify-center px-4 sm:px-6 py-4 sm:py-6 md:px-8">
        <button
          onClick={handleScheduleViewing}
          disabled={isLoading}
          className="w-full sm:w-auto bg-gray-900 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-gray-800 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "PROCESSING..." : "SCHEDULE YOUR PROPERTY VIEWING"}
        </button>
      </div> */}
    </div>
  );
}
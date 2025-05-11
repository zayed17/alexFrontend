"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function PropertyHeader({
  location,
  features,
  price,  
  onBookNow,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBookNow = () => {
    setIsLoading(true);
    if (onBookNow) {
      onBookNow();
    } else {
      setTimeout(() => {
        setIsLoading(false);
        alert("Booking request submitted!");
      }, 1500);
    }
  };


  return (
    <div className="bg-[#0a1e33]">
      <div className="relative containers flex flex-col  !text-white md:flex-row md:items-center md:justify-between !py-8">
        <div className="space-y-1 ">
          <div className="text-sm ">
            {location}
          </div>
          <h1 className="text-xl font-light tracking-wide !text-white font-presto">
            {features.replaceAll(',', ' |')}
          </h1>
        </div>
        <div className="mt-4 flex w-full items-center justify-between md:mt-0 md:w-auto md:justify-end">
          <div className="text-2xl font-bold md:mr-4 md:text-2xl font-presto">
            AED {Number(price)?.toLocaleString("en-AE")}
          </div>
          <Button
            onClick={handleBookNow}
            disabled={isLoading}
            className="h-auto rounded-none bg-white px-6 py-2 text-s font-medium uppercase text-black hover:bg-gray-100"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

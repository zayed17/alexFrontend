"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function UltraLuxuryVillas({ data }: any) {
  const { secondaryImage, mainBrochure, description,propertyType ,propertyTitle} = data;
  const downloadWithFetch = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div className="w-full bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-4 md:flex-row">
        {/* Left side content */}
        <div className="flex w-full flex-col space-y-6 md:w-1/2">
          <h2 className="text-3xl font-light text-gray-900 md:text-4xl">
            Ultra-Luxury {propertyType} at {propertyTitle}
          </h2>

          <div className="max-w-xl break-words text-sm leading-relaxed text-gray-700">
            {description.split("\n").map((line: any, index: number) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="pt-4">
            <Button
              onClick={() => downloadWithFetch(mainBrochure, "brochure.pdf")}
              className="rounded-none bg-gray-900 px-8 py-2 text-xs uppercase tracking-wider text-white hover:bg-gray-800"
            >
              Download Brochure
            </Button>
          </div>
        </div>

        {/* Right side image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={secondaryImage}
              alt="Luxury villas waterfront view"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

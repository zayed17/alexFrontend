"use client";
import Image from "next/image";
import Link from "next/link";
import { Square, Download } from "lucide-react";
import type { Property } from "@/lib/types";

export default function PropertyFloor({ floor }: any) {
  if (!floor || floor.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No floors available at this time.</p>
      </div>
    );
  }

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
    <div className="grid grid-cols-1 gap-4 px-[4%] sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-12">
      {floor.map((data: any) => (
        <div
          key={data._id}
          className="col-span-6 overflow-hidden rounded-sm bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative h-48 w-full sm:h-56 md:h-64 lg:h-72">
            <Image
              src={data.image || "/placeholder.svg"}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>

          <div className="p-3 sm:p-4 md:p-5">
            <h3 className="truncate font-presto text-lg font-medium text-gray-800 sm:text-xl md:text-2xl">
              {data.title}
            </h3>

            <div className="mt-3 flex flex-col space-y-3 md:flex-col md:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="space-y-2 sm:flex sm:items-center sm:gap-4 sm:space-y-0">
                <div className="flex items-center text-xs font-bold sm:text-sm">
                  <Square className="mr-2 h-4 w-4 flex-shrink-0 text-gray-700" />
                  <span className="truncate">
                    TOTAL SQUARE : {data.totalSquareFeet.toLocaleString()} SQ.
                    FT
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto">
                <button
                 onClick={() =>
                  downloadWithFetch(data.brochure,'brochure.pdf')
                }
                  className="flex cursor-pointer items-center justify-center bg-[#0a1e36] px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#152c47] focus:outline-none focus:ring-2 focus:ring-[#0a1e36] focus:ring-offset-2 sm:px-5"
                >
                  <Download className="mr-2 h-4 w-4 text-white" />
                  DOWNLOAD BROCHURE
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ); 
}

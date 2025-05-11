"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useWindowWidth } from "@/helpers/dynamicWidth";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import MainHeading from "@/components/Heading/heading";
import Link from "next/link";

interface PropertyLocation {
  country: string;
  latitude: string;
  longitude: string;
}

interface SliderImage {
  [key: string]: string;
}

interface Property {
  title: string;
  description: string;
  location: PropertyLocation;
  sliderImages?: SliderImage[];
  mainImage?: string;
  _id: string;
  price?: string;
  sellingPrice?: string;
}

interface CommunitySliderProps {
  properties: Property[];
  heading?: string;
}

const CommunitySlider: React.FC<CommunitySliderProps> = ({ 
  properties, 
  heading = "Top-5 Best Investment Properties Right Now" 
}) => {
  const width = useWindowWidth();
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Responsive slides per view based on screen width
  useEffect(() => {
    if (width < 640) {
      setSlidesPerView(1);
    } else if (width < 1024) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  }, [width]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, width, slidesPerView]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Get property image based on available data
  const getPropertyImage = (property: Property): any => {
    if (property.sliderImages && property.sliderImages.length > 0) {
      // Return first image from sliderImages if available
      return property.sliderImages[0];
    } else if (property.mainImage) {
      // Return mainImage if available
      return property.mainImage;
    }
    // Fallback image
    return "/images/placeholder-property.jpg";
  };

  // Format location string
  const formatLocation = (location: PropertyLocation): string => {
    return `${location.country}`;
  };

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 md:px-0 lg:px-0 sm:pl-[5%] md:pl-[7%] lg:pl-[7%]">
      <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <MainHeading
          text={heading}
          className="!text-2xl sm:!text-3xl md:!text-3xl lg:!text-4xl font-bold text-[#071C35] max-w-full sm:max-w-[70%]"
        />
        <div className="z-10 mt-4 sm:mt-6 md:mt-10 lg:mt-10 sm:mr-[5%] md:mr-[7%] flex items-center gap-3 sm:gap-4">
          <button
            onClick={scrollPrev}
            className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-gray-400 text-gray-900 transition hover:bg-gray-200"
          >
            <ArrowLeft size={16} className="sm:hidden" color="#071C35" />
            <ArrowLeft size={20} className="hidden sm:block" color="#071C35" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-gray-400 text-gray-900 transition hover:bg-gray-200"
          >
            <ArrowRight size={16} className="sm:hidden" color="#071C35" />
            <ArrowRight size={20} className="hidden sm:block" color="#071C35" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {properties.map((property) => (
            <div
              key={property._id}
              className="relative min-w-0 flex-shrink-0 flex-grow-0 pr-3 sm:pr-4 md:pr-5 lg:pr-6 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-24px)]"
            >
              <Link href={property?.mainImage ? `/realestate/${property._id}` : `/ready-properties/${property._id}`} >
              <div className="relative overflow-hidden shadow-lg">
                <Image
                  src={getPropertyImage(property)}
                  alt={property.title}
                  width={800}
                  height={540}
                  style={{ 
                    objectFit: "cover", 
                    height: "200px", 
                    width: "100%" 
                  }}
                  className="transition-transform duration-300 hover:scale-105 sm:h-[240px] md:h-[280px] lg:h-[300px]"
                />
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-0 bg-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 shadow-md">
                    <p className="text-sm sm:text-base">
                      From{" "}
                      <span className="text-base sm:text-lg font-semibold text-[#071C35] font-presto">
                        {property.price || property.sellingPrice}
                      </span>
                      {" AED"}
                    </p>
                  </div>
              </div>
              <div className="mt-2 sm:mt-3 md:mt-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#071C35] uppercase font-presto">
                  {property.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 line-clamp-3">
                  {property.description}
                </p>
                <div className="flex items-center mt-2 sm:mt-3 md:mt-4 text-[#071C35] text-xs sm:text-sm md:text-base font-medium">
                  <MapPin size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">{formatLocation(property.location)}</span>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySlider;
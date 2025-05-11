"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SliderImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images1: SliderImage[];
  images2: SliderImage[];
  title?: string;
  subtitle?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const PropertyShowcase: React.FC<ImageSliderProps> = ({
  images1 = [],
  images2 = [],
  title,
  subtitle,
  className = "",
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % images1.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images1.length]);

  // Auto-play functionality for second slider
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex2((prevIndex) => (prevIndex + 1) % images2.length);
    }, autoPlayInterval + 2000); // Offset timing to create staggered effect

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images2.length]);

  const goToSlide1 = (index: number) => {
    setCurrentIndex1(index);
  };

  const goToSlide2 = (index: number) => {
    setCurrentIndex2(index);
  };

  return (
    <div className={`mx-auto w-full  py-8 md:py-16 ${className}`}>
     

      {/* Two image sliders side by side */}
      <div className="flex flex-col gap-8 sm:flex-row">
        {/* First Slider */}
        <div className="relative w-full sm:w-1/2">
          <div className="relative h-64 overflow-hidden  md:h-96 lg:h-[500px]">
            {images1.length > 0 ? (
              <Image
                src={images1[currentIndex1]?.src || "/api/placeholder/800/600"}
                alt={images1[currentIndex1]?.alt || "Property view"}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
                style={{ objectFit: "cover" }}
                className="transition-all duration-500"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>

          {/* Indicator dots for first slider */}
          {images1.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images1.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide1(index)}
                  className={`h-3 w-3  transition-all duration-300 ease-in-out ${
                    index === currentIndex1
                      ? "w-6 bg-black"
                      : "bg-white border border-gray-300 hover:bg-gray-200"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Second Slider */}
        <div className="relative w-full sm:w-1/2">
          <div className="relative h-64 overflow-hidden  md:h-96 lg:h-[500px]">
            {images2.length > 0 ? (
              <Image
                src={images2[currentIndex2]?.src || "/api/placeholder/800/600"}
                alt={images2[currentIndex2]?.alt || "Property view"}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
                style={{ objectFit: "cover" }}
                className="transition-all duration-500"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>

          {/* Indicator dots for second slider */}
          {images2.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images2.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide2(index)}
                  className={`h-3 w-3  transition-all duration-300 ease-in-out ${
                    index === currentIndex2
                      ? "w-6 bg-black"
                      : "bg-white border border-gray-300 hover:bg-gray-200"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyShowcase;
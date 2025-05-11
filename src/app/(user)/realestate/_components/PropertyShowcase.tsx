"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images1: string[];
  images2: string[];
  title?: string;
  subtitle?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const PropertyShowcase: React.FC<ImageSliderProps> = ({
  images1,
  images2,
  title,
  subtitle,
  className = "",
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  // Create shuffled arrays of indices to display images in non-sequential order
  const [shuffledIndices1, setShuffledIndices1] = useState<number[]>([]);
  const [shuffledIndices2, setShuffledIndices2] = useState<number[]>([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  // Shuffle function to randomize array order
  const shuffleArray = (array: number[]): number[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initialize shuffled indices on component mount
  useEffect(() => {
    if (images1.length > 0) {
      const indices = Array.from({ length: images1.length }, (_, i) => i);
      setShuffledIndices1(shuffleArray(indices));
    }
    
    if (images2.length > 0) {
      const indices = Array.from({ length: images2.length }, (_, i) => i);
      setShuffledIndices2(shuffleArray(indices));
    }
  }, [images1.length, images2.length]);

  useEffect(() => {
    if (!autoPlay || shuffledIndices1.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % shuffledIndices1.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, shuffledIndices1.length]);

  // Auto-play functionality for second slider
  useEffect(() => {
    if (!autoPlay || shuffledIndices2.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex2((prevIndex) => (prevIndex + 1) % shuffledIndices2.length);
    }, autoPlayInterval + 2000); // Offset timing to create staggered effect

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, shuffledIndices2.length]);

  const goToSlide1 = (index: number) => {
    setCurrentIndex1(index);
  };

  const goToSlide2 = (index: number) => {
    setCurrentIndex2(index);
  };

  // Get the actual image index from shuffled array
  const getImageIndex1 = () => shuffledIndices1[currentIndex1] ?? 0;
  const getImageIndex2 = () => shuffledIndices2[currentIndex2] ?? 0;

  return (
    <div className={`mx-auto w-full py-8 md:py-16 ${className}`}>
      {/* Two image sliders side by side */}
      <div className="flex flex-col gap-8 sm:flex-row">
        {/* First Slider */}
        <div className="relative w-full sm:w-1/2">
          <div className="relative h-64 overflow-hidden md:h-96 lg:h-[500px]">
            {images1.length > 0 && shuffledIndices1.length > 0 ? (
              <Image
                src={images1[getImageIndex1()] || "/api/placeholder/800/600"}
                alt={images1[getImageIndex1()] || "Property view"}
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
          {shuffledIndices1.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {shuffledIndices1.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide1(index)}
                  className={`h-3 w-3 transition-all duration-300 ease-in-out ${
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
          <div className="relative h-64 overflow-hidden md:h-96 lg:h-[500px]">
            {images2.length > 0 && shuffledIndices2.length > 0 ? (
              <Image
                src={images2[getImageIndex2()] || "/api/placeholder/800/600"}
                alt={images2[getImageIndex2()] || "Property view"}
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
          {shuffledIndices2.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {shuffledIndices2.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide2(index)}
                  className={`h-3 w-3 transition-all duration-300 ease-in-out ${
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
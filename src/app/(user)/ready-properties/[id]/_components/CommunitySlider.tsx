"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunitySlider({ sliderImages: slides ,downloads}: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideInterval = useRef<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [animationClass, setAnimationClass] = useState("opacity-0 scale-95");

  
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

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [startAutoSlide]);

  const resetAutoSlideTimer = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    startAutoSlide();
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
    resetAutoSlideTimer();
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
    resetAutoSlideTimer();
  };

  const goToSlide = (index: any) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
    resetAutoSlideTimer();
  };

  return (
    <div className="w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[3/2] md:aspect-21/9">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide: any, index: any) => (
            <div key={index} className="relative h-full min-w-full">
              <Image
                src={slide}
                alt={slide}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            onClick={prevSlide}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>

          <Button
            onClick={nextSlide}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_: any, index: any) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index ? "w-6 bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

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

      {showBanner && (
        <div
          className={`fixed bottom-34 md:bottom-22 lg:bottom-22 right-4 z-40 origin-bottom-right transform sm:right-6 md:right-20 ${animationClass}`}
        >
          <div className="rounded-3xl bg-gray-800 p-2 shadow-lg sm:p-3 md:p-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              {downloads?.brochure && (
                <Button
                  className="!hover:bg-white whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs text-gray-800 hover:bg-white sm:px-4 sm:py-2 md:px-6"
                  onClick={() =>
                    downloadWithFetch(downloads?.brochure,'brochure.pdf')
                  }
                >
                  DOWNLOAD BROCHURE
                </Button>
              )}
              {downloads?.floorPlan && (
                <Button
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs text-gray-800 hover:bg-white sm:px-4 sm:py-2 md:px-6"
                  onClick={() =>
                    downloadWithFetch(downloads?.floorPlan,'floorPlan-brochure.pdf')
                  }>
                  DOWNLOAD FLOOR PLAN
                </Button>
              )}
              {downloads?.masterPlan && (
                <Button
                  className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs text-gray-800 hover:bg-white sm:px-4 sm:py-2 md:px-6"
                  onClick={() =>
                    downloadWithFetch(downloads?.masterPlan,'masterPlan-brochure.pdf')
                  }>
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

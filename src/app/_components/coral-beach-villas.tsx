"use client";

import { ArrowLeft, ArrowRight, Eye, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, type FC } from "react";
import * as LucideIcons from "lucide-react";

// Define interfaces for property data from API
interface Amenity {
  _id: string;
  title: string;
  image: string;
  alt?: string;
  createdAt?: string;
}

interface Property {
  _id: string;
  title: string;
  description: string;
  propertyType?: {
    _id: string;
    title: string;
    description: string;
  };
  amenities: any;
  // Add any other fields from the API that you need
}

interface PropertySliderProps {
  properties: Property[];
}

const PropertySlider: FC<PropertySliderProps> = ({ properties = [] }) => {
  // State for current property index and animation
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visibleChars, setVisibleChars] = useState<number[]>([]);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  // Animation states for smooth transitions
  const [backgroundFade, setBackgroundFade] = useState<number>(1);
  const [contentFade, setContentFade] = useState<number>(1);
  const [amenitiesScale, setAmenitiesScale] = useState<number>(1);
  const [taglineFade, setTaglineFade] = useState<number>(1);

  // Reference for auto-rotation timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with all characters visible
  useEffect(() => {
    if (properties.length === 0) return;

    const currentTitle = properties[currentIndex]?.title || "";
    setVisibleChars(Array.from({ length: currentTitle.length }, (_, i) => i));

    // Set up automatic rotation
    startAutoRotation();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [properties]);

  // If no properties, don't render
  if (!properties || properties.length === 0) {
    return null;
  }

  // Start auto rotation timer
  const startAutoRotation = () => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, 8000); // Longer interval for detailed property view
  };

  // Reset timer when manually changing slides
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      startAutoRotation();
    }
  };

  // Animation for text reveal when switching properties
  const animatePropertyChange = (dir: "next" | "previous") => {
    if (isAnimating || properties.length <= 1) return;

    setIsAnimating(true);
    setDirection(dir);

    // Save previous index before changing
    setPrevIndex(currentIndex);

    // Set overlay to cover current text
    setOverlayOpacity(1);

    // Start background fade out
    setBackgroundFade(0);

    // Fade out content and amenities with staggered timing
    setContentFade(0);
    setAmenitiesScale(0.95);
    setTaglineFade(0);

    // Calculate next index
    const newIndex =
      dir === "next"
        ? (currentIndex + 1) % properties.length
        : currentIndex === 0
          ? properties.length - 1
          : currentIndex - 1;

    // After overlay covers text, change content
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setVisibleChars([]);

      // Start revealing the text character by character
      setTimeout(() => {
        setOverlayOpacity(0);

        // Start fading in new background
        setBackgroundFade(1);

        // Staggered content animations
        setTimeout(() => {
          setContentFade(1);

          setTimeout(() => {
            setAmenitiesScale(1);

            setTimeout(() => {
              setTaglineFade(1);
            }, 150);
          }, 150);
        }, 150);

        const chars = properties[newIndex].title.split("");
        const totalDuration = 800; // ms
        const charInterval = totalDuration / chars.length;

        // Reveal each character with a delay
        chars.forEach((_, index) => {
          setTimeout(() => {
            setVisibleChars((prev) => [...prev, index]);

            // Animation complete when all characters are visible
            if (index === chars.length - 1) {
              setTimeout(() => {
                setIsAnimating(false);
              }, 200);
            }
          }, index * charInterval);
        });
      }, 400);
    }, 400);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    resetTimer();
    animatePropertyChange("previous");
  };

  const handleNext = () => {
    if (isAnimating) return;
    resetTimer();
    animatePropertyChange("next");
  };

  // Current property data
  const currentProperty = properties[currentIndex];
  const prevProperty = properties[prevIndex];

  // Default background image if not provided in API
  const defaultBgImage = "/images/homepage/sec-5-bg.jpg";

  return (
    <div className="flex flex-col">
      {/* Property Navigation Header */}
      <div className="relative flex flex-col items-center justify-between overflow-hidden bg-white px-6 py-6 md:py-20 lg:flex-row lg:px-16 lg:py-20">
        {/* Background Image */}
        <div className="absolute bottom-0 left-0 top-30 h-full w-full md:left-0 md:top-28 md:w-full lg:left-1/4 lg:top-22 lg:w-3/4">
          <Image
            src="/images/homepage/sec-4-bg-img.png"
            alt="Dubai Skyline"
            layout="fill"
            objectFit="cover"
            className="opacity-5 lg:opacity-5"
            priority
          />
        </div>

        {/* Left Section - Property Title with Animation */}
        <div className="z-10 max-w-lg text-center lg:text-left">
          <div className="perspective-1000 relative min-h-20 overflow-hidden">
            <Link
              href={`/properties/${currentProperty._id}`}
              className="block cursor-pointer transition-opacity hover:opacity-90"
            >
              <h2 className="font-presto text-2xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-4xl">
                {"Newly Launched Luxury Properties in Dubai & UAE"}
              </h2>
            </Link>
          </div>
        </div>

        {/* Right Section - Navigation Buttons */}
        <div className="z-10 mt-6 flex items-center gap-4 lg:mt-0">
          <button
            onClick={handlePrevious}
            disabled={isAnimating || properties.length <= 1}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 text-gray-900 transition-all hover:bg-gray-200 hover:shadow-md ${
              isAnimating || properties.length <= 1
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-105"
            }`}
            aria-label="Previous property"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            disabled={isAnimating || properties.length <= 1}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 text-gray-900 transition-all hover:bg-gray-200 hover:shadow-md ${
              isAnimating || properties.length <= 1
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-105"
            }`}
            aria-label="Next property"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="relative min-h-[34rem] w-full overflow-hidden">
        {/* Background Image with Overlay - Layer 1 (Current) */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{ opacity: backgroundFade }}
        >
          <Image
            src={defaultBgImage || "/placeholder.svg"} // Replace with property image when available
            alt={currentProperty.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(7, 28, 53, 0.94), rgba(7, 28, 53, 0.65),rgba(7, 28, 53, 0.3))",
            }}
          ></div>
        </div>

        {/* Background Image with Overlay - Layer 2 (Previous - for smooth transition) */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{ opacity: isAnimating ? 1 - backgroundFade : 0 }}
        >
          <Image
            src={defaultBgImage || "/placeholder.svg"} // Replace with property image when available
            alt={prevProperty?.title || ""}
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(7, 28, 53, 0.94), rgba(7, 28, 53, 0.65),rgba(7, 28, 53, 0.3))",
            }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-4 !pb-5 md:p-8 lg:p-16 lg:py-25">
          <div className="flex h-full flex-col md:flex-col lg:md:flex-row">
            {/* Left Side - Content */}
            <div
              className="flex flex-col justify-center transition-all duration-700 md:pr-8 lg:w-1/2"
              style={{
                opacity: contentFade,
                transform: `translateY(${contentFade < 1 ? "20px" : "0"})`,
              }}
            >
              <div className="max-w-xl">
                <h1 className="mb-4 font-serif text-4xl font-light text-white md:text-5xl">
                  {currentProperty.title}
                </h1>
                <p className="mb-8 max-w-xl break-words text-sm leading-relaxed text-white/90 md:text-base">
                  {currentProperty.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-4">
                  <Link
                    href={`/realestate/${currentProperty._id}`}
                    className="flex items-center gap-2 bg-white px-2 py-3 text-blue-950 transition-colors hover:bg-white/90 md:px-6 lg:px-6"
                  >
                    <Eye size={18} />
                    <span className="text-sm font-medium">VIEW PROJECT</span>
                  </Link>
                  <button className="flex items-center gap-2 bg-white px-2 py-3 text-blue-950 transition-colors hover:bg-white/90 md:px-6 lg:px-6">
                    <Phone size={18} />
                    <span className="text-sm font-medium">INSTANT CALL</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Amenities Grid */}
            <div
              className="mt-8 flex items-center justify-center transition-all duration-500 md:mt-8 md:w-full lg:mt-0 lg:w-1/2"
              style={{
                opacity: amenitiesScale === 1 ? 1 : 0.5,
                transform: `scale(${amenitiesScale})`,
              }}
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                {currentProperty.amenities &&
                  currentProperty.amenities
                    .slice(0, 6)
                    .map((amenity: any, index: any) => {
                      const Icon = LucideIcons[
                        amenity.iconName as keyof typeof LucideIcons
                      ] as React.ComponentType<any>;

                      return (
                        <div
                          key={amenity._id}
                          className="flex h-30 w-30 flex-col items-center justify-center bg-white/10 p-4 text-center backdrop-blur-sm transition-all duration-300 md:h-32 md:w-32 lg:h-32 lg:w-32"
                          style={{
                            transitionDelay: `${index * 50}ms`,
                            transform: `translateY(${
                              amenitiesScale === 1
                                ? "0"
                                : direction === "next"
                                  ? "20px"
                                  : "-20px"
                            })`,
                          }}
                        >
                          <div className="mb-2 flex h-10 w-10 items-center justify-center">
                            {Icon ? (
                              <Icon size={30} className="text-gray-300" />
                            ) : (
                              <span className="text-xl text-gray-300">❓</span>
                            )}
                          </div>
                          <span className="text-center text-xs font-medium uppercase tracking-wider text-white">
                            {amenity.title.split("\n").map((line:any, i:any) => (
                              <span key={i}>
                                {line}
                                {i < amenity.title.split("\n").length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        {/* <div className="bottom-0 left-0 top-[948px] z-1 h-[112px] w-[613px]">
          <style jsx>{`
            .Blending-text {
              mix-blend-mode: soft-light;
            }
          `}</style>
          <h1 className="Blending-text font-serif text-3xl uppercase leading-tight tracking-wider text-white/50 md:text-4xl lg:text-4xl">
            Blending Recreation
            <br />
            {`With Nature's Beauty`}
          </h1>
        </div> */}
      </div>
    </div>
  );
};

export default PropertySlider;

"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { banner1 } from "@/constants/images"

interface PropertyImage {
  id: string
  src: string
  alt: string
}

export default function PropertySlider() {
  // Sample property images - would come from your CMS or API in production
  const propertyImages: PropertyImage[] = [
    {
      id: "1",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eqoXI9NMz9UvmShR7eLum0LZiwR4j8.png",
      alt: "Aerial view of luxury residential building with curved pool",
    },
    {
      id: "2",
      src: "/luxury-apartment-exterior.png",
      alt: "Luxury apartment exterior view",
    },
    {
      id: "3",
      src: "/modern-apartment-living-room.png",
      alt: "Modern apartment interior living room",
    },
    {
      id: "4",
      src: "/placeholder.svg?key=6xu09",
      alt: "Luxury apartment bedroom with ocean view",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const goToSlide = (index: number) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex(index)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? propertyImages.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === propertyImages.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentIndex])

  return (
    <div className="relative mx-auto !my-12 max-w-[110rem] containers overflow-hidden ">
      {/* Main image slider */}
      <div className="relative h-[500px] w-full  md:h-[600px]">
        {propertyImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 h-full w-full transition-opacity  duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={banner1 || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover rounded-3xl"
              sizes="(max-width: 768px) 100vw, 1100px"
              priority={index === 0}
            />
          </div>
        ))}


        {/* Navigation arrows */}
        <div className="absolute bottom-8 right-[34%] md:right-[47%] flex space-x-4">
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7 text-gray-700" />
          </button>
        </div>
      </div>

    </div>
  )
}

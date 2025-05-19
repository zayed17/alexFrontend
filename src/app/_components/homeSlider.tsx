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

export default function PropertyGallerySlider({sliderImages}:any) {


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
    const newIndex = currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === sliderImages.length - 1 ? 0 : currentIndex + 1
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
    <div className="relative mx-auto my-12 max-w-[110rem] containers overflow-hidden ">
      {/* Main image slider */}
      <div className="relative h-[500px] w-full  md:h-[600px]">
        {sliderImages.map((image:any, index:number) => (
          <div
            key={image.id}
            className={`absolute inset-0 h-full w-full transition-opacity  duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={"loading..."}
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

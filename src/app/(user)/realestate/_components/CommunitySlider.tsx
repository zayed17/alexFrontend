"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunitySlider({slides}:any) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideInterval = useRef<any>(null)

  // Sample images - replace with your actual images


  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  useEffect(() => {
    startAutoSlide()
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current)
    }
  }, [startAutoSlide])

  const resetAutoSlideTimer = () => {
    if (slideInterval.current) clearInterval(slideInterval.current)
    startAutoSlide()
  }

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
    resetAutoSlideTimer()
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
    resetAutoSlideTimer()
  }

  const goToSlide = (index:any) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
    resetAutoSlideTimer()
  }

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden aspect-[16/9] sm:aspect-[3/2] md:aspect-[3/1]">
        {/* Slider */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide:any, index:any) => (
            <div key={index} className="min-w-full relative h-full">
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
            className="bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full h-10 w-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          
          <Button 
            onClick={nextSlide}
            variant="ghost" 
            size="icon"
            className="bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full h-10 w-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_:any, index:any) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
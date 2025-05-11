"use client"

import { useState, useEffect, useRef } from "react"
import Button from "@/components/common/button"
import Image from "next/image"

interface WaterfrontSectionProps {
  name: string
  title?: string
  description?: string
  images?: string[]
}

export default function WaterfrontSection({
  name = "waterfront",
  title = "The Future of Waterfront Living",
  description = "",
  images = ["/images/dubaiharbour/sec-3.png", "/images/dubaiharbour/sec-1.png", "/images/dubaiharbour/sec-1.png"],
}: WaterfrontSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  // Split description into paragraphs if it contains newlines
  const paragraphs = description.split("\n").filter((p) => p.trim() !== "")

  // Default paragraphs if none are provided
  const defaultParagraphs = [
    "Dubai Creek Harbour offers a tranquil lifestyle with wellness facilities, lively retail hubs, and stunning views of the marina and Dubai skyline. Enjoy outdoor dining, yoga at sunrise, or a leisurely stroll along the promenade.",
    "Relax by the infinity pool with Burj Khalifa views or explore the area on a bike. Whether you're seeking a dream home or a solid investment, Dubai Creek Harbour offers exceptional value.",
  ]

  // Use provided paragraphs or default ones
  const displayParagraphs = paragraphs.length > 0 ? paragraphs : defaultParagraphs

  // Make sure we have at least one image
  const slideImages = images.length > 0 ? images : ["/images/dubaiharbour/sec-3.png"]

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      nextSlide()
    }, 3000)
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
    setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
    resetAutoSlideTimer()
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
    resetAutoSlideTimer()
  }

  return (
    <section className="containers mx-auto px-4 py-16 md:py-24 ">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Image Slider Section (Left Side) */}
        <div className="flex justify-center md:justify-center">
          <div className="relative w-full max-w-md bg-white p-4 shadow-2xl lg:max-w-lg">
            {/* Custom slider (replacing Swiper) */}
            <div className="relative overflow-hidden aspect-square w-full shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slideImages.map((src:any, index:number) => (
                  <div key={index} className="min-w-full relative h-full">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`${title} view ${index + 1}`}
                      fill
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Custom Dots indicator styled like CommunitySlider */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {slideImages.map((_:any, index:number) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all ${
                      currentSlide === index ? "bg-white w-6 h-2" : "bg-white/50 w-2 h-2"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section (Right Side) */}
        <div className="flex max-w-lg flex-col space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">{name}</p>
            <h2 className="font-serif text-3xl leading-tight text-gray-900 md:text-4xl">{title}</h2>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
            {displayParagraphs.map((paragraph:any, index:number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-auto">
            <Button label="Register Interest" />
          </div>
        </div>
      </div>
    </section>
  )
}


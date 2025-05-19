"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface YoutubeVideoSliderProps {
  youtubeUrls: string[]
}

export default function YoutubeVideoSlider({ youtubeUrls }: YoutubeVideoSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ""
  }

  // Get YouTube thumbnail URL from video ID
  const getYoutubeThumbnail = (url: string): string => {
    const videoId = getYoutubeVideoId(url)
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  // Generate a simple title from the video ID
  const generateVideoTitle = (url: string): string => {
    const videoId = getYoutubeVideoId(url)
    // Convert the video ID to a more readable format
    // This is just a placeholder since we don't have actual titles
    return `Click to view more...`
  }

  // Handle scroll buttons
  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return

    const scrollAmount = sliderRef.current.clientWidth * 0.8
    const scrollPosition =
      direction === "left" ? sliderRef.current.scrollLeft - scrollAmount : sliderRef.current.scrollLeft + scrollAmount

    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }

  // Check if we can scroll in either direction
  const checkScrollability = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  // Add scroll event listener
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    slider.addEventListener("scroll", checkScrollability)
    window.addEventListener("resize", checkScrollability)

    // Initial check
    checkScrollability()

    return () => {
      slider.removeEventListener("scroll", checkScrollability)
      window.removeEventListener("resize", checkScrollability)
    }
  }, [])

  // Handle click on video
  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank")
  }

  // Get current date in the format "DD MMM YYYY"
  const getCurrentDate = (): string => {
    const date = new Date()
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section className="mx-auto !my-18 max-w-[110rem] containers ">
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute border border-gray-5 -left-5 md:-left-12 top-[35%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity disabled:cursor-not-allowed`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 " />
        </button>

        {/* Video slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {youtubeUrls.map((url, index) => (
            <div
              key={index}
              className="flex min-w-[270px] cursor-pointer flex-col transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => handleVideoClick(url)}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={getYoutubeThumbnail(url) || "/placeholder.svg"}
                  alt={`YouTube video ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="270px"
                />
              </div>
              <div className="pt-3">
                <h3 className="mb-1 line-clamp-2 text-sm font-medium font-presto">{generateVideoTitle(url)}</h3>
                <p className="text-xs text-gray-500">{getCurrentDate()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute border border-gray-5 -right-5 md:-right-12 top-[35%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity disabled:cursor-not-allowed `}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 " />
        </button>
      </div>
    </section>
  )
}

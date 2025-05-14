"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface VideoItem {
  id: string
  youtubeUrl: string
  title: string
  date: string
}

export default function YoutubeVideoSlider() {
  // This would come from your backend in production
  const dummyVideos: VideoItem[] = [
    {
      id: "1",
      youtubeUrl: "https://youtu.be/lpZlX0xRY8M",
      title: "100 Million Dubai Real Estate Portfolio! Best Projects and Investment Strategies",
      date: "27 Feb 2025",
    },
    {
      id: "2",
      youtubeUrl: "https://youtu.be/lpZlX0xRY8M",
      title: "Factors To Consider In 2025 Dubai Explained!",
      date: "22 Jan 2025",
    },
    {
      id: "3",
      youtubeUrl: "https://youtu.be/lpZlX0xRY8M",
      title: "Top 5 Communities To Invest In Dubai 2025",
      date: "15 Mar 2025",
    },
    {
      id: "4",
      youtubeUrl: "https://youtu.be/lpZlX0xRY8M",
      title: "100 Million Dubai Real Estate Portfolio! Best Projects and Investment Strategies",
      date: "03 Apr 2025",
    },
    {
      id: "5",
      youtubeUrl: "https://youtu.be/lpZlX0xRY8M",
      title: "Dubai Property Market Forecast 2025: What Investors Need To Know",
      date: "19 Feb 2025",
    },
    {
      id: "6",
      youtubeUrl: "https://youtu.be/lpZlX0xRY8M",
      title: "Dubai Property Market Forecast 2025: What Investors Need To Know",
      date: "19 Feb 2025",
    },
]

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

  return (
    <section className="mx-auto my-16 max-w-[110rem] px-[5%] ">
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute border border-gray-5 -left-5 md:-left-12 top-[35%] z-10 flex h-10 w-10   -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity disabled:cursor-not-allowed`}
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
          {dummyVideos.map((video) => (
            <div
              key={video.id}
              className="flex min-w-[270px] cursor-pointer flex-col transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => handleVideoClick(video.youtubeUrl)}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={getYoutubeThumbnail(video.youtubeUrl) || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="270px"
                />
              </div>
              <div className="pt-3">
                <h3 className="mb-1 line-clamp-2 text-sm font-medium font-presto">{video.title}</h3>
                <p className="text-xs text-gray-500">{video.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute border border-gray-5 -right-5 md:-right-12 top-[35%] z-10 flex h-10 w-10   -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-opacity disabled:cursor-not-allowed `}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 " />
        </button>
      </div>
    </section>
  )
}

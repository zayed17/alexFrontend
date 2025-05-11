"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { axiosInstance } from "@/lib/axios"
import { getEmbedUrl, getYoutubeThumbnail } from "@/lib/utils"

export default function Home() {
  // State for modal
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Define types for media items
  interface MediaItem {
    _id: string
    youtubeUrl: string
    videoType: "video" | "shorts"
    title: string
    description: string
    agentId?: {
      _id: string
      name: string
    }
    createdAt: string
    updatedAt: string
    thumbnailUrl?: string // Add thumbnail URL
  }

  // State for videos and shorts
  const [videos, setVideos] = useState<MediaItem[]>([])
  const [shorts, setShorts] = useState<MediaItem[]>([])

  // Fetch data on component mount
  useEffect(() => {
    const fetchMediaData = async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.get("/media-center")
        const mediaData: MediaItem[] = response.data

        // Process media data to add thumbnail URLs
        const processedMediaData = mediaData.map((item) => ({
          ...item,
          thumbnailUrl: getYoutubeThumbnail(item.youtubeUrl),
        }))

        // Separate videos and shorts
        const videosData = processedMediaData.filter((item) => item.videoType === "video")
        const shortsData = processedMediaData.filter((item) => item.videoType === "shorts")

        setVideos(videosData)
        setShorts(shortsData)
      } catch (error) {
        console.error("Error fetching media data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMediaData()
  }, [])

  // Add search event listener
  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail && customEvent.detail.query !== undefined) {
        setSearchQuery(customEvent.detail.query)
      }
    }

    window.addEventListener("app:search", handleSearch)
    return () => {
      window.removeEventListener("app:search", handleSearch)
    }
  }, [])

  // Refs for slider navigation
  const reelsSliderRef = useRef<HTMLDivElement | null>(null)
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false)
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Filter media items based on search query
  const filterMediaItems = (items: MediaItem[], query: string) => {
    if (!query) return items

    const searchTerm = query.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.agentId?.name && item.agentId.name.toLowerCase().includes(searchTerm)),
    )
  }

  // Filter videos and shorts based on search query
  const filteredVideos = filterMediaItems(videos, searchQuery)
  const filteredShorts = filterMediaItems(shorts, searchQuery)

  // Get the first 3 videos for the top row
  const topRowVideos = filteredVideos.slice(0, 3)
  // Get the remaining videos for the bottom section
  const remainingVideos = filteredVideos.slice(3)

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false)
    setSelectedVideo(null)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  // Click outside modal to close
  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  // Handle slider scroll
  const scrollSlider = (direction: "left" | "right") => {
    if (!reelsSliderRef.current) return

    const scrollAmount = 360 // Scrolls about 2 cards at a time
    const currentScroll = reelsSliderRef.current.scrollLeft

    if (direction === "left") {
      reelsSliderRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      })
    } else {
      reelsSliderRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }

    // Check scroll position after animation completes
    setTimeout(checkScrollPosition, 300)
  }

  // Function to check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (!reelsSliderRef.current) return

    // Show left arrow if not at the start
    setShowLeftArrow(reelsSliderRef.current.scrollLeft > 10)

    // Show right arrow if not at the end
    const isAtEnd =
      reelsSliderRef.current.scrollLeft + reelsSliderRef.current.clientWidth >= reelsSliderRef.current.scrollWidth - 10

    setShowRightArrow(!isAtEnd)
  }

  // Monitor scroll position to show/hide arrows
  useEffect(() => {
    const slider = reelsSliderRef.current
    if (!slider) return

    // Initial check
    checkScrollPosition()

    // Add scroll event listener
    slider.addEventListener("scroll", checkScrollPosition)

    // Check arrow visibility whenever shorts content changes
    if (shorts.length > 0) {
      setTimeout(checkScrollPosition, 100)
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScrollPosition)
      }
    }
  }, [shorts])

  // Recheck arrow visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add ESC key handler for modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [showModal])

  // Handle video click to open modal
  const handleVideoClick = (video: MediaItem) => {
    setSelectedVideo(video)
    setShowModal(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  return (
    <div className="mx-auto py-6">
      {/* Top row - Featured Videos */}
      <div className="mb-12">
        <h2 className="mb-6 font-presto text-2xl font-bold">Featured Properties</h2>
        {searchQuery && filteredVideos.length === 0 && filteredShorts.length === 0 && (
          <div className="my-8 text-center">
            <h3 className="text-xl font-medium">{`No results found for "${searchQuery}"`}</h3>
            <p className="mt-2 text-gray-500">Try a different search term or browse all videos</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-video rounded-lg bg-gray-200"></div>
                  <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="mt-1 h-3 w-1/2 rounded bg-gray-200"></div>
                </div>
              ))
            : topRowVideos.map((video) => (
                <div key={video._id} className="group cursor-pointer overflow-hidden">
                  <Link href={`media-center/${video._id}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={video.thumbnailUrl || "/images/dubaiInvestment/img-6.png" || "/placeholder.svg"}
                        alt={video.title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60"></div>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 opacity-0 shadow-lg transition duration-300 group-hover:opacity-90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-black"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </Link>
                  <div className="p-3">
                    <h3 className="line-clamp-2 font-medium">{video.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{formatDate(video.createdAt)}</p>
                    {video.agentId && <p className="mt-1 text-xs text-gray-600">Agent: {video.agentId.name}</p>}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {searchQuery && filteredShorts.length === 0 && filteredVideos.length > 0 && (
        <div className="my-4 text-gray-500">
          <p>{`No shorts found matching "${searchQuery}"`}</p>
        </div>
      )}

      {filteredShorts.length > 0 && (
        <div className="my-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center font-presto text-2xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                viewBox="0 0 24 24"
                fill="#E53E3E"
                stroke="none"
              >
                <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 2.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z" />
              </svg>
              Property Shorts
            </h2>
            <Link
              href="/media-center/shorts"
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-200 hover:text-red-800"
            >
              View all
            </Link>
          </div>

          {/* Shorts slider with navigation arrows */}
          <div className="relative">
            {/* Left arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scrollSlider("left")}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/70 p-2 text-white shadow-lg transition hover:bg-black/90"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Shorts container */}
            <div
              ref={reelsSliderRef}
              className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4 pt-1"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-none animate-pulse rounded-xl bg-gray-200 shadow"
                      style={{ width: "180px", height: "320px" }}
                    ></div>
                  ))
                : filteredShorts.map((short) => (
                    <div
                      key={short._id}
                      className="flex-none cursor-pointer"
                      style={{ width: "180px" }}
                      onClick={() => handleVideoClick(short)}
                    >
                      <div
                        className="relative overflow-hidden rounded-xl bg-gray-100 shadow-md"
                        style={{ height: "320px" }}
                      >
                        <Image
                          src={short.thumbnailUrl || "/images/dubaiInvestment/img-5.png" || "/placeholder.svg"}
                          alt={short.title}
                          width={180}
                          height={320}
                          className="h-full w-full object-cover"
                        />

                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity hover:opacity-100">
                          <div className="rounded-full bg-white/70 p-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>

                        {/* Video title and info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <h3 className="line-clamp-2 text-sm font-medium text-white">{short.title}</h3>
                          {short.agentId && <p className="mt-1 text-xs text-gray-200">Agent: {short.agentId.name}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Right arrow */}
            {showRightArrow && (
              <button
                onClick={() => scrollSlider("right")}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/70 p-2 text-white shadow-lg transition hover:bg-black/90"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom section - More Videos */}
      {remainingVideos.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-presto text-2xl font-bold">More Properties</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remainingVideos.map((video) => (
              <div
                key={video._id}
                className="group cursor-pointer overflow-hidden"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnailUrl || "/images/dubaiInvestment/img-6.png"}
                    alt={video.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 opacity-0 shadow-lg transition duration-300 group-hover:opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-black"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 font-medium">{video.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{formatDate(video.createdAt)}</p>
                  {video.agentId && <p className="mt-1 text-xs text-gray-600">Agent: {video.agentId.name}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex  items-center justify-center bg-black/90 p-4"
          onClick={handleModalBackdropClick}
        >
          <div
            className={`relative rounded-lg bg-black shadow-xl ${selectedVideo.videoType === "shorts" ? "h-[80vh] max-h-[700px] w-[360px]" : "w-full max-w-4xl"}`}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video content */}
            <div className="w-full h-full">
              <div
                className={`relative ${selectedVideo.videoType === "shorts" ? "h-full w-full" : "aspect-video w-full"} overflow-hidden rounded-t-lg`}
              >
                <iframe
                  src={`${getEmbedUrl(selectedVideo.youtubeUrl)}?autoplay=1${selectedVideo.videoType === "shorts" ? "&loop=1" : ""}`}
                  title={selectedVideo.title}
                  className="absolute h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video info - Only show for regular videos or at the bottom for shorts */}
              {selectedVideo.videoType !== "shorts" && (
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{formatDate(selectedVideo.createdAt)}</p>
                  {selectedVideo.agentId && (
                    <p className="mt-1 text-sm text-gray-600">Agent: {selectedVideo.agentId.name}</p>
                  )}
                </div>
              )}

              {/* Shorts info overlay at the bottom */}
              {selectedVideo.videoType === "shorts" && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                  <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
                  {selectedVideo.agentId && (
                    <p className="mt-1 text-sm text-gray-200">Agent: {selectedVideo.agentId.name}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for hiding scrollbars */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

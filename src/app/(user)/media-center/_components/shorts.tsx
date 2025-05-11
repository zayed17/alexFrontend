"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getYoutubeThumbnail, getYoutubeVideoId } from "@/lib/utils"

// Define the types for the shorts data
interface Agent {
  _id: string
  name: string
}

interface Short {
  _id: string
  youtubeUrl: string
  title: string
  description: string
  thumbnailUrl: string
  createdAt: string
  agentId?: Agent
}

interface ShortsPageProps {
  shorts: Short[]
  isLoading?: boolean
}

export default function ShortsPage({ shorts, isLoading = false }: ShortsPageProps) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedShort, setSelectedShort] = useState<Short | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const getEmbedUrl = (url: string) => {
    const videoId = getYoutubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

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

  // Filter shorts based on search query
  const filterShorts = (items: Short[], query: string) => {
    if (!query) return items

    const searchTerm = query.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.agentId?.name && item.agentId.name.toLowerCase().includes(searchTerm)),
    )
  }

  const processedMediaData = shorts.map((item) => ({
    ...item,
    thumbnailUrl: getYoutubeThumbnail(item.youtubeUrl),
  }))

  // Filter shorts based on search query
  const filteredShorts = filterShorts(processedMediaData, searchQuery)

  const handleShortClick = (short: Short) => {
    setSelectedShort(short)
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedShort(null)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className="mx-auto py-6">
      <h1 className="mb-8 flex items-center font-presto text-3xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3 h-7 w-7"
          viewBox="0 0 24 24"
          fill="#E53E3E"
          stroke="none"
        >
          <path d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 2.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z" />
        </svg>
        Property Shorts
      </h1>

      {searchQuery && filteredShorts.length === 0 && (
        <div className="my-8 text-center">
          <h3 className="text-xl font-medium">{`No results found for "locationImages_${searchQuery}"`}</h3>
          <p className="mt-2 text-gray-500">Try a different search term or browse all shorts</p>
        </div>
      )}

      {/* Shorts Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex-none animate-pulse rounded-xl bg-gray-200 shadow"
                style={{ height: "320px" }}
              ></div>
            ))
          : filteredShorts.map((short) => (
              <div
                key={short._id}
                className="flex-none cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => handleShortClick(short)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-md" style={{ height: "320px" }}>
                  <Image
                    src={short.thumbnailUrl || "/images/dubaiInvestment/img-5.png"}
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

      {/* Shorts Modal */}
      {showModal && selectedShort && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="relative h-[80vh] max-h-[700px] w-[360px] rounded-lg bg-black shadow-xl">
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
            <div className="h-full w-full">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <iframe
                  src={`${getEmbedUrl(selectedShort.youtubeUrl)}?autoplay=1&loop=1`}
                  title={selectedShort.title}
                  className="absolute h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Shorts info overlay at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                <h3 className="text-lg font-medium">{selectedShort.title}</h3>
                {selectedShort.agentId && (
                  <p className="mt-1 text-sm text-gray-200">Agent: {selectedShort.agentId.name}</p>
                )}
                <p className="mt-2 text-xs text-gray-300">{formatDate(selectedShort.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { YouTubeEmbed } from "@next/third-parties/google"

interface ShortVideoPlayerProps {
  videoId: string
  onClose: () => void
}

export function ShortVideoPlayer({ videoId, onClose }: ShortVideoPlayerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Prevent scrolling when shorts are open
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative max-w-md w-full h-[80vh] bg-black">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2">
          <X size={24} />
        </button>
        <div className="w-full h-full">
          <YouTubeEmbed videoid={videoId}  params="rel=0&loop=1&autoplay=1" />
        </div>
      </div>
    </div>
  )
}


"use client"

import Image from "next/image"
import Link from "next/link"
import { formatDate, truncateText } from "@/lib/utils"
import { MediaItem } from "@/lib/types"
import { extractYoutubeId } from "@/api/api"

interface RelatedVideosProps {
  videos: MediaItem[]
  title?: string
}

export function RelatedVideos({ videos = [], title = "More from this channel" }: RelatedVideosProps) {
  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {videos?.map((video) => {
          const videoId = extractYoutubeId(video.youtubeUrl)
          // Generate a thumbnail URL from YouTube video ID
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

          return (
            <Link key={video._id} href={`/media-center/${video._id}`} className="flex gap-3">
              <div className="relative w-32 h-20 flex-shrink-0">
                <Image
                  src={thumbnailUrl || "/placeholder.svg?height=80&width=128&query=video thumbnail"}
                  alt={video.title}
                  fill
                  className="object-cover rounded"
                  sizes="128px"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium line-clamp-2">{truncateText(video.title, 60)}</h4>
                <p className="text-xs text-gray-500 mt-1">{formatDate(video.createdAt)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

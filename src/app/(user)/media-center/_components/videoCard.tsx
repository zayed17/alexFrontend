import Image from "next/image"
import Link from "next/link"
import type { VideoItem } from "@/types/youtube"
import { formatDate, truncateText } from "@/lib/utils"

interface VideoCardProps {
  video: VideoItem
}

export function VideoCard({ video }: VideoCardProps) {
  const { id, snippet } = video
  const videoId = typeof id === "string" ? id : (id as any).videoId

  return (
    <Link href={`/media-center/video/${videoId}`} className="block">
      <div className="relative overflow-hidden group">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={snippet.thumbnails.high.url || "/placeholder.svg"}
            alt={snippet.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 10vw"
          />
        </div>
        <div className="p-2">
          <h3 className="font-medium text-sm mt-2 line-clamp-2">{truncateText(snippet.title, 60)}</h3>
          <p className="text-xs text-gray-500 mt-1">{formatDate(snippet.publishedAt)}</p>
        </div>
      </div>
    </Link>
  )
}


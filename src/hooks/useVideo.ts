"use client"

import { useState, useEffect } from "react"
import type { VideoItem, ShortVideo } from "@/types/youtube"
import { getAllMediaItems } from "@/api/api"

interface UseVideosOptions {
  category: "latest" | "trending" | "mr-one-shots" | "resale" | "shorts"
  maxResults?: number
  initialQuery?: string
}

export function useVideos({ category, maxResults = 10, initialQuery = "" }: UseVideosOptions) {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [shorts, setShorts] = useState<ShortVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState(initialQuery)

  const fetchVideos = async (searchQuery = "") => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        category,
        maxResults: maxResults.toString(),
      })

      if (searchQuery) {
        params.append("query", searchQuery)
      }

      const data = await getAllMediaItems("shorts")


      if (category === "shorts") {
        // Transform the data for shorts  
        const shortsData: ShortVideo[] = data.items.map((item:any) => ({
          id: typeof item._id === "string" ? item._id : (item.id as any).videoId,
          title: item.title,
          thumbnailUrl: '',
        }))

        setShorts(shortsData)
      } else {
        setVideos(data.items)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchVideos(query)
  }, [category, maxResults])

  // Search function
  const search = (searchQuery: string) => {
    setQuery(searchQuery)
    fetchVideos(searchQuery)
  }

  return {
    videos,
    shorts,
    isLoading,
    error,
    search,
    query,
  }
}
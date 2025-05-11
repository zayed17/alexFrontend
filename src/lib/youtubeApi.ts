import type { VideoDetails } from "@/types/youtube"
import { VideoListResponse } from "./types"

// Use the environment variable for the API key
const API_KEY = process.env.YOUTUBE_API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"

// Function to fetch videos from YouTube API
export async function fetchVideos(params: Record<string, string>): Promise<VideoListResponse> {
  const queryParams = new URLSearchParams({
    ...params,
    key: API_KEY || "",
  })

  const response = await fetch(`${BASE_URL}/${params.endpoint}?${queryParams}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`)
  }

  return response.json()
}

// Helper functions for specific video types
export async function fetchLatestVideos(maxResults = 10): Promise<VideoListResponse> {
  return fetchVideos({
    endpoint: "search",
    part: "snippet",
    maxResults: maxResults.toString(),
    order: "date",
    type: "video",
  })
}

export async function fetchTrendingVideos(maxResults = 10): Promise<VideoListResponse> {
  return fetchVideos({
    endpoint: "videos",
    part: "snippet",
    chart: "mostPopular",
    maxResults: maxResults.toString(),
  })
}

export async function fetchMrOneShotsVideos(playlistId: string, maxResults = 10): Promise<VideoListResponse> {
  return fetchVideos({
    endpoint: "playlistItems",
    part: "snippet",
    playlistId,
    maxResults: maxResults.toString(),
  })
}

export async function fetchResaleVideos(
  query = "dubai real estate resale",
  maxResults = 10,
): Promise<VideoListResponse> {
  return fetchVideos({
    endpoint: "search",
    part: "snippet",
    q: query,
    type: "video",
    maxResults: maxResults.toString(),
  })
}

export async function fetchVideoDetails(videoId: string): Promise<VideoDetails> {
  const response = await fetch(`${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch video details")
  }

  const data = await response.json()
  return data.items[0]
}

export async function fetchShortVideos(maxResults = 10): Promise<VideoListResponse> {
  return fetchVideos({
    endpoint: "search",
    part: "snippet",
    videoDuration: "short",
    type: "video",
    maxResults: maxResults.toString(),
  })
}

export function getYouTubeVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}


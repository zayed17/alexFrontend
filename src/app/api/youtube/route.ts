import { fetchLatestVideos, fetchMrOneShotsVideos, fetchResaleVideos, fetchShortVideos, fetchTrendingVideos } from "@/lib/youtubeApi"
import { type NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || "latest"
  const maxResults = Number.parseInt(searchParams.get("maxResults") || "10")
  const query = searchParams.get("query") || ""

  try {
    let data

    switch (category) {
      case "latest":
        data = await fetchLatestVideos(maxResults)
        break
      case "trending":
        data = await fetchTrendingVideos(maxResults)
        break
      case "mr-one-shots":
        // Use a default playlist ID or get it from environment variables
        const playlistId = process.env.MR_ONE_SHOTS_PLAYLIST_ID || "PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d"
        data = await fetchMrOneShotsVideos(playlistId, maxResults)
        break
      case "resale":
        data = await fetchResaleVideos(query || "dubai real estate resale", maxResults)
        break
      case "shorts":
        data = await fetchShortVideos(maxResults)
        break
      default:
        data = await fetchLatestVideos(maxResults)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}


export interface VideoItem {
    id: string
    snippet: {
      title: string
      description: string
      thumbnails: {
        default: Thumbnail
        medium: Thumbnail
        high: Thumbnail
        standard?: Thumbnail
        maxres?: Thumbnail
      }
      channelTitle: string
      publishedAt: string
    }
  }
  
  export interface Thumbnail {
    url: string
    width: number
    height: number
  }

  export interface ShortVideo {
    id: string
    title: string
    thumbnailUrl: string
    overlayText?: string
  }
  
  export interface VideoCategory {
    id: string
    name: string
  }
  
  export interface VideoDetails extends VideoItem {
    statistics: {
      viewCount: string
      likeCount: string
      commentCount: string
    }
    contentDetails: {
      duration: string
    }
  }
  
  
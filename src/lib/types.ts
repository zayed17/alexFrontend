export interface Property {
  _id?: string;
  id: string;
  title: string;
  price: string;
  bedroomRange: string;
  image: string;
}

export interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoThumbnails {
  default: VideoThumbnail;
  medium: VideoThumbnail;
  high: VideoThumbnail;
  standard?: VideoThumbnail;
  maxres?: VideoThumbnail;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: VideoThumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId?: string;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount?: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoDetails {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  statistics?: VideoStatistics;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string | VideoId;
  snippet: VideoSnippet;
}

export interface VideoListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem[];
}

export interface Agent {
  _id: string;
  name: string;
  title: string;
  imageUrl: string;
}

export interface MediaItem {
  _id: string;
  youtubeUrl: string;
  videoType: "video" | "shorts";
  title: string;
  description: string;
  agentId: Agent | string;
  createdAt: string;
  updatedAt: string;
}

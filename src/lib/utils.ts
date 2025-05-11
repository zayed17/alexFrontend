import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "Today";
  if (diffDays <= 7) return `${diffDays} days ago`;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function extractPropertyDetails(description: string): {
  keyFeatures: string[];
  areaHighlights: string[];
  generalDescription: string[];
} {
  const keyFeaturesRegex = /Key Features:(.*?)(?=Area Highlights:|$)/;
  const areaHighlightsRegex = /Area Highlights:(.*?)(?=\n\n|$)/;

  const keyFeaturesMatch = description.match(keyFeaturesRegex);
  const areaHighlightsMatch = description.match(areaHighlightsRegex);

  // Extract key features as bullet points
  const keyFeatures = keyFeaturesMatch
    ? keyFeaturesMatch[1]
        .trim()
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  // Extract area highlights as bullet points
  const areaHighlights = areaHighlightsMatch
    ? areaHighlightsMatch[1]
        .trim()
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  // Get the general description (everything not in the sections above)
  const sectionsText =
    (keyFeaturesMatch?.[0] || "") + (areaHighlightsMatch?.[0] || "");
  const generalDescriptionText = description.replace(sectionsText, "").trim();
  const generalDescription = generalDescriptionText
    .split("\n\n")
    .filter(Boolean);

  return {
    keyFeatures,
    areaHighlights,
    generalDescription,
  };
}

export const getYoutubeVideoId = (url: string) => {
  let videoId = "";

  if (url.includes("youtube.com/watch")) {
    videoId = new URLSearchParams(new URL(url).search).get("v") || "";
  } else if (url.includes("youtube.com/shorts")) {
    videoId = url.split("/shorts/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  } else if (url.includes("youtube.com/embed")) {
    videoId = url.split("/embed/")[1]?.split("?")[0] || "";
  }

  return videoId;
};

export const getYoutubeThumbnail = (youtubeUrl: string) => {
  const videoId = getYoutubeVideoId(youtubeUrl);

  if (!videoId) return "/images/dubaiInvestment/img-6.png"; // Fallback image

  // Return high quality thumbnail (or maxresdefault if available)
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const getEmbedUrl = (url: string) => {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

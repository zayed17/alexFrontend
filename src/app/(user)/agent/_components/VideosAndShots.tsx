"use client";

import React, { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface VideoData {
  _id: string;
  youtubeUrl: string;
  videoType: 'video' | 'shorts';
  description: string;
  agentId: string | { name: string };
  createdAt?: string;
}

interface AgentVideosProps {
  agentVideos: VideoData[];
}

export default function AgentVideos({ agentVideos }: AgentVideosProps) {
  const videosRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  // Filter videos and shorts
  const videos = agentVideos?.filter(video => video.videoType === 'video') || [];
  const shorts = agentVideos?.filter(video => video.videoType === 'shorts') || [];

  // Function to get embed URL from YouTube URL
  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/shorts')) {
      // Extract the ID from shorts URL
      const videoId = url.split('shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be')) {
      // Extract the ID from youtu.be URL
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtube.com/watch')) {
      // Extract the ID from watch URL
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Return original if format not recognized
  };

  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Handle video click
  const handleVideoClick = (video: VideoData) => {
    if (video.videoType === 'video') {
      router.push(`/media-center/${video._id}`);
    } else {
      setSelectedVideo(video);
      setShowModal(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  // Handle modal backdrop click
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Get thumbnail from YouTube URL
  const getYouTubeThumbnail = (url: string): string => {
    let videoId = '';
    
    if (url.includes('youtube.com/shorts')) {
      videoId = url.split('shorts/')[1].split('?')[0];
    } else if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch')) {
      videoId = new URL(url).searchParams.get('v') || '';
    }
    
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholder.jpg';
  };

  return (
    <div className="containers mx-auto px-4 !py-6">
      <Head>
        <title>Dubai Real Estate Videos and Reels</title>
        <meta
          name="description"
          content="Dubai Real Estate Investment Videos and Reels"
        />
      </Head>

      <main>
        {/* Videos Section */}
        {videos.length > 0 && (
          <section className="mb-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="!text-2xl sm:!text-3xl md:!text-3xl font-bold font-presto">Videos and Shots</h2>
            </div>
            
            <div
              ref={videosRef}
              className="hide-scrollbar flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative mb-2 h-40 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                    <Image
                      src={getYouTubeThumbnail(video.youtubeUrl)}
                      alt={video.description}
                      width={280}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="line-clamp-2 h-10 text-sm font-medium">
                    {video.description}
                  </h3>
                  <p className="text-xs text-gray-500">{formatDate(video.createdAt)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reels Section */}
        {shorts.length > 0 && (
          <section>
            <div
              ref={reelsRef}
              className="hide-scrollbar flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {shorts.map((reel) => (
                <div
                  key={reel._id}
                  className="min-w-[160px] max-w-[160px] flex-shrink-0 cursor-pointer"
                  onClick={() => handleVideoClick(reel)}
                >
                  <div className="relative mb-2 h-80 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                    <Image
                      src={getYouTubeThumbnail(reel.youtubeUrl)}
                      alt={reel.description}
                      width={160}
                      height={256}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="text-sm font-bold  truncate overflow-hidden whitespace-nowrap">{reel.description}</h4>
                      <p className="text-xs">
                        {typeof reel.agentId === 'object' && reel.agentId?.name ? reel.agentId.name : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modal for Shorts */}
      {showModal && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleModalBackdropClick}
        >
          <div
            className={`relative rounded-lg bg-black shadow-xl ${selectedVideo.videoType === "shorts" ? "h-[80vh] max-h-[700px] w-[360px]" : "w-full max-w-4xl"}`}
          >
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
            <div className="w-full h-full">
              <div
                className={`relative ${selectedVideo.videoType === "shorts" ? "h-full w-full" : "aspect-video w-full"} overflow-hidden rounded-t-lg`}
              >
                <iframe
                  src={`${getEmbedUrl(selectedVideo.youtubeUrl)}?autoplay=1${selectedVideo.videoType === "shorts" ? "&loop=1" : ""}`}
                  title={selectedVideo.description}
                  className="absolute h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {/* Video info - Only show for regular videos or at the bottom for shorts */}
              {selectedVideo.videoType !== "shorts" && (
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-medium">{selectedVideo.description}</h3>
                  <p className="mt-2 text-sm text-gray-500">{formatDate(selectedVideo.createdAt)}</p>
                  {selectedVideo.agentId && typeof selectedVideo.agentId === 'object' && (
                    <p className="mt-1 text-sm text-gray-600">Agent: {selectedVideo.agentId.name}</p>
                  )}
                </div>
              )}
              {/* Shorts info overlay at the bottom */}
              {selectedVideo.videoType === "shorts" && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                  <h3 className="text-lg font-medium  truncate overflow-hidden whitespace-nowrap ">{selectedVideo.description}</h3>
                  {selectedVideo.agentId && typeof selectedVideo.agentId === 'object' && (
                    <p className="mt-1 text-sm text-gray-200">Agent: {selectedVideo.agentId.name}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
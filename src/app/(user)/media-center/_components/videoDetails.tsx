"use client";

import { VideoPlayer } from "./videoPlayer";
import { ExpertProfile } from "./expertProfile";
import { RelatedVideos } from "./relatedVideos";
import { useState } from "react";

export default function VideoPage({
  videoDetails,
  videoId,
  relatedVideosData,
}: any) {
  const agent =
    typeof videoDetails.agentId === "object"
      ? videoDetails.agentId
      : { name: "Real Estate Expert", title: "Senior Sales Advisor" };

  const [showForm, setShowForm] = useState<any>(false);

  const handleOpenModal = () => {
    setShowForm(Date.now());
  };

  return (
    <div className="container mx-auto py-8 pl-4">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <VideoPlayer
            openModal={showForm}
            videoId={videoId}
            videoDetails={videoDetails}
            name={
              typeof agent === "object" ? agent?.name : "Real Estate Expert"
            }
            phone={
              typeof agent === "object" ? agent?.phone : "Real Estate Expert"
            }
            title={
              typeof agent === "object"
                ? agent?.role || "Senior Sales Advisor"
                : "Senior Sales Advisor"
            }
          />
        </div>

        <div className="w-full lg:w-1/4">
          <ExpertProfile
            handleOpenModal={handleOpenModal}
            id={typeof agent === "object" ? agent?._id : "Real Estate Expert"}
            name={
              typeof agent === "object" ? agent?.name : "Real Estate Expert"
            }
            title={
              typeof agent === "object"
                ? agent?.role || "Senior Sales Advisor"
                : "Senior Sales Advisor"
            }
            imageUrl={
              typeof agent === "object" ? agent?.profileImage || "" : ""
            }
          />

          <RelatedVideos videos={relatedVideosData} />
        </div>
      </div>
    </div>
  );
}

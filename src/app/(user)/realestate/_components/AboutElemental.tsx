"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getEmbedUrl } from "@/lib/utils";

const AboutElemental = ({ data, youtubeVideo, about }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-12 text-center font-presto text-3xl font-bold">
        {data.heading}
      </h2>

      <div className="max break-words text-sm leading-relaxed text-gray-700">
        {about.split("\n").map((line: any, index: number) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <div className="relative mt-12 h-80 w-full overflow-hidden rounded-lg sm:h-96 lg:h-[400px]">
        {!isPlaying ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={data.imageSrc}
                alt="Elemental balcony view of Dubai skyline"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Video play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayVideo}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700"
                aria-label="Play video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-8 w-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full rounded-lg"
            src={`${getEmbedUrl(youtubeVideo)}?autoplay=1`}
            title="Elemental 22 Promotional Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default AboutElemental;

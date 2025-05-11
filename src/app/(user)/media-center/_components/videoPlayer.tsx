"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { formatDate, extractPropertyDetails } from "@/lib/utils";
import type { MediaItem } from "@/lib/types";
import Image from "next/image";

interface VideoPlayerProps {
  openModal: number;
  videoId: string;
  videoDetails?: MediaItem;
  phone?: string;
  name?: string;
  title?: string;
}

export function VideoPlayer({
  openModal,
  videoId,
  videoDetails,
  name,
  phone,
  title,
}: VideoPlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (openModal) {
      setShowForm(true);
    }
    setIsClient(true);
  }, [openModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: formData.email ? "" : "Email is required",
      phone: formData.phone ? "" : "Phone is required",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Submit form logic would go here
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowForm(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 1500);
  };

  if (!isClient) {
    return <div className="aspect-video animate-pulse bg-gray-200" />;
  }

  const { keyFeatures, areaHighlights, generalDescription } =
    videoDetails?.description
      ? extractPropertyDetails(videoDetails.description)
      : { keyFeatures: [], areaHighlights: [], generalDescription: [] };

  return (
    <div>
      <div className="aspect-video overflow-hidden rounded-lg">
        <YouTubeEmbed
          videoid={videoId}
          height={900}
          width={900}
          params="rel=0"
        />
      </div>

      {videoDetails && (
        <>
          {/* Agent info box between video and details */}
          <div className="mt-4 ">
            <div className="flex flex-col w-full items-start justify-between sm:flex-row sm:items-center">
              <div  style={{ width: 'calc(100% - 17px)' }}>
                <h1 className="text-xl font-medium">{videoDetails?.title}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(videoDetails?.createdAt)}
                </p>
                <div className="mt-6 flex justify-between border border-gray-200  p-4">
                  <div className="flex-shrink-0">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-500">{title}</p>
                  </div>
                  <div className="mt-3 flex gap-2 sm:mt-0">
                    <a
                      href={`https://wa.me/${phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2  bg-green-600 px-4 py-2 text-sm text-white"
                    >
                      <div className="flex items-center">
                        <div className="relative h-6 w-6">
                          <Image
                            src="/images/common/whatsapp.png"
                            alt="WhatsApp"
                            layout="fill"
                            objectFit="cover"
                            priority
                          />
                        </div>
                        <span className="ml-1 font-medium text-white">
                          Whatsapp
                        </span>
                      </div>
                    </a>
                    <button
                      onClick={() => setShowForm(true)}
                      className=" bg-[#071C35] px-4 py-2 text-sm text-white"
                    >
                      CONNECT WITH EXPERT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-4 text-xl font-medium">Property Details</h2>
            <p className="text-sm">{generalDescription[0] || ""}</p>

            {keyFeatures.length > 0 && (
              <>
                <h3 className="mb-2 mt-6 font-medium">Key Features:</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {keyFeatures.map((feature, index) => (
                    <li className="text-[#071C35]" key={index}>{feature.replace(/^[•-]\s*/, "")}</li>
                  ))}
                </ul>
              </>
            )}

            {areaHighlights.length > 0 && (
              <>
                <h3 className="mb-2 mt-6 font-medium">Area Highlights:</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {areaHighlights.map((highlight, index) => (
                    <li className="text-[#071C35]" key={index}>{highlight.replace(/^[•-]\s*/, "")}</li>
                  ))}
                </ul>
              </>
            )}

            {generalDescription.slice(1).map((paragraph, index) => (
              <p key={index} className="mt-4 text-sm">
                {paragraph}
              </p>
            ))}
          </div>
        </>
      )}

      {/* Modal for "Connect with Expert" */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-medium text-blue-950">
              Request a Consultation
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950`}
                  placeholder="Your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950`}
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950"
                  placeholder="Tell us about your investment goals"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#071C35] px-4 py-2 text-sm text-white transition-colors duration-300 disabled:bg-blue-950/70"
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

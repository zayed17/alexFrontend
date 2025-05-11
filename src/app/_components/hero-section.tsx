"use client"

import Image from "next/image"
import PropertySearch from "./property-search"

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Optimized Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/homepage/hero.png"
          alt="Hero Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          priority
        />
        <div className="absolute inset-0 bg-blue-900/30" />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen flex items-center md:items-end lg:items-end justify-center px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-22">
        {/* Search Form */}
        <div className="w-full max-w-6xl z-10">
          <PropertySearch />
        </div>
      </div>
    </div>
  )
}

"use client"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useWindowWidth } from "@/helpers/dynamicWidth"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Define the Community interface based on the API response
interface Community {
  _id: string
  title: string
  mainImage: string
}

interface CommunitySliderProps {
  communities?: Community[]
}

const CommunitySliderBottom = ({ communities = [] }: CommunitySliderProps) => {
  const width = useWindowWidth()
  const [slidesToShow, setSlidesToShow] = useState(2)

    const router = useRouter();

  useEffect(() => {
    if (width < 640) {
      setSlidesToShow(1)
    } else if (width < 1024) {
      setSlidesToShow(1.5)
    } else if (width < 1280) {
      setSlidesToShow(2)
    } else {
      setSlidesToShow(2.5)
    }
  }, [width])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi, width, slidesToShow])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (!communities || communities.length === 0) {
    return null
  }

  return (
    <div className="mx-auto w-full py-8 md:py-12 lg:py-20 px-4 mg:pr-0 lg:pr-0 sm:px-6 md:pl-[10%]">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-center md:items-start lg:items-start sm:items-center justify-between">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-presto">
          Most Desirable <br className="hidden sm:block" /> Communities in Dubai
        </h2>
        <div className="z-10 mt-4 sm:mt-0 sm:mr-[5%] md:mr-[7%] flex items-center gap-3 md:gap-4">
          <button
            onClick={scrollPrev}
            className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-gray-400 text-gray-900 transition hover:bg-gray-200"
            aria-label="Previous slide"
          >
            <ArrowLeft size={width < 640 ? 16 : 20} color="#071C35" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-gray-400 text-gray-900 transition hover:bg-gray-200"
            aria-label="Next slide"
          >
            <ArrowRight size={width < 640 ? 16 : 20} color="#071C35" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {communities.map((community,index) => (
            <div
              key={index}
              className="relative cursor-pointer min-w-0 flex-shrink-0 flex-grow-0 mr-3 sm:mr-4 md:mr-6"
              onClick={()=> router.push(`/communities/${community._id}`)}
              style={{
                width: `calc(${100 / slidesToShow}% - ${width < 640 ? 12 : width < 1024 ? 16 : 24}px)`,
              }}
            >
              <div className="overflow-hidden rounded-sm">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={community.mainImage || "/placeholder.svg"}
                    alt={community.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-11/12 ml-2 sm:ml-3 md:ml-5 bg-[#071C35] mb-2 sm:mb-3 md:mb-5 p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-white">{community.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommunitySliderBottom

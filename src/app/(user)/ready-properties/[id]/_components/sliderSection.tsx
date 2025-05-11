"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectCube } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-cube"

export default function SliderSection({ sliderImages }: { sliderImages: string[] }) {
  const swiperRefs = useRef<(SwiperType | null)[]>([])

  const animationDuration = 900
  const pauseBetweenSliders = 300
  const fullCycleDuration = 5000

  useEffect(() => {
    const animateSliders = () => {
      swiperRefs.current.forEach((swiper) => {
        swiper?.autoplay?.stop()
      })

      const sequence = async () => {
        while (true) {
          for (let i = 0; i < swiperRefs.current.length; i++) {
            swiperRefs.current[i]?.slideNext(animationDuration)
            await new Promise((resolve) => setTimeout(resolve, animationDuration + pauseBetweenSliders))
          }

          await new Promise((resolve) =>
            setTimeout(resolve, fullCycleDuration - swiperRefs.current.length * (animationDuration + pauseBetweenSliders)),
          )
        }
      }

      sequence()
    }

    const timer = setTimeout(() => {
      animateSliders()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const sliderStartIndexes = sliderImages.slice(0, 3).map((_, i) => i)

  return (
    <section className="py-16 md:py-16">
      <div className="mb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {sliderStartIndexes.map((startIndex, sliderIndex) => {
            const imagesForThisSlider = [
              ...sliderImages.slice(startIndex),
              ...sliderImages.slice(0, startIndex),
            ]

            return (
              <div
                key={sliderIndex}
                className="relative w-full shadow-lg overflow-hidden transition-all duration-500"
              >
                <Swiper
                  modules={[Pagination, Autoplay, EffectCube]}
                  spaceBetween={0}
                  slidesPerView={1}
                  effect="cube"
                  speed={animationDuration}
                  loop
                  allowTouchMove={false}
                  className="h-full w-full"
                  onSwiper={(swiper) => {
                    swiperRefs.current[sliderIndex] = swiper
                  }}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                >
                  {imagesForThisSlider.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={src || "/placeholder.svg"}
                          alt={`Slider ${sliderIndex + 1} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={sliderIndex === 0 && index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

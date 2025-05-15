import { life1, life2 } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";

interface LifestyleCard {
  id: string;
  title: string;
  description: string;
  image: any;
  alt: string;
}

const lifestyleCards: LifestyleCard[] = [
  {
    id: "seaside-serenity",
    title: "Spectacular Seaside Serenity",
    description:
      "Wake up to the sound of the waves and embrace the rhythm of island life.",
    image: life1,
    alt: "Aerial view of Dubai Islands marina with luxury yachts and high-rise buildings",
  },
  {
    id: "world-of-choice",
    title: "A World of Choice",
    description:
      "Five distinct island vibes — from city energy to a tranquil beachfront escape.",
    image: life2,
    alt: "Dubai Islands beachfront properties with palm trees and modern architecture",
  },
];

const amenities = [
  "Luxury hotels",
  "Elite spas and wellness centers",
  "Golf courses",
  "1,300-berth marina, surf park, and beach clubs",
];

export default function DubaiLifestyle() {
  return (
    <section className="bg-[#F5F6F7]" aria-labelledby="lifestyle-heading">
      <div className="mx-auto max-w-[110rem] containers  py-20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left content area */}
          <div className="space-y-6 lg:col-span-5">
            <h2
              id="lifestyle-heading"
              className="font-presto text-3xl font-bold leading-tight text-[#071C35] md:text-4xl"
            >
              Live the life you have always dreamed of
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Welcome the sunrise with open arms on the beach. End your day
                surrounded by friends at the golf club. Dubai Islands awaits all
                who seek:
              </p>

              <ul className="mt-4 space-y-1">
                {amenities.map((amenity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-sm">•</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                className="mt-2 bg-[#071C35] px-6 py-4 text-xs md:text-base font-medium rounded-full uppercase text-white transition-colors duration-300 "
              >
                SUBMIT A REQUEST
              </button>
            </div>
          </div>

          {/* Right cards area */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {lifestyleCards.map((card) => (
                <article
                  key={card.id}
                  className="group relative h-72 overflow-hidden rounded-[40px] md:h-80 lg:h-[29rem]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={card.id === "seaside-serenity"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="absolute left-0 z-10 w-full p-10">
                    <p className="max-w-50 text-sm text-gray-100 opacity-90 md:text-base">
                      {card.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 z-10 w-full p-10">
                    <h3 className="mb-2 max-w-40 font-presto text-xl font-bold leading-10 text-gray-100 md:text-[33px]">
                      {card.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

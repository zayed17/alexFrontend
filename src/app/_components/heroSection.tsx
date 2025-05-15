import Image from "next/image";
import { agentImage, whiteBanner } from "@/constants/images";

export default function RealEstateLanding() {
  return (
    <main className="min-h-screen  w-full">
      {/* Hero Section */}
      <section className="relative mx-auto w-full overflow-hidden  flex flex-col h-auto sm:h-[130vh] md:h-[93vh] lap:h-[86vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={whiteBanner || "/placeholder.svg"}
            alt="Dubai Cityscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/90 via-white/90 to-white/10"></div>
        </div>

        <div className="containers relative z-20 mx-auto flex flex-col h-full max-w-[110rem] px-4">
          <div className="flex flex-col h-full md:hidden">
            <div className="text-center pt-30 md:pt-10 pb-6">
              <h3 className="mb-1 font-presto text-xl font-semibold italic text-[#877455]">
                Alexey Andrienko
              </h3>
              <p className="mb-6 mt-2 text-base ">Real Estate Expert in Dubai</p>

              <h1 className="mb-4 font-presto text-2xl sm:text-3xl font-normal !leading-none !tracking-[-0.04rem] text-[#071C35]">
                Invest in Dubai Islands Luxury Real Estate
              </h1>

              <h2 className="max-w-md mx-auto pt-3 font-presto text-lg sm:text-xl leading-snug">
                Choose From 20+ Waterfront Projects with 15% ROI Potential
              </h2>
            </div>
            
            <div className="flex-grow"></div>
            
            <div className="flex justify-center w-full mt-auto">
              <Image
                src={agentImage || "/placeholder.svg"}
                alt="Real Estate Expert"
                width={798}
                height={750}
                className="z-20 scale-x-[-1] ml-10 md:ml-0 object-contain w-full max-w-[100%] sm:max-w-[80%]"
                priority
              />
            </div>
          </div>

          {/* Desktop Layout - Hidden on mobile */}
          <div className="hidden md:grid h-full grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Left Column - Text */}
            <div className="col-span-1 self-center justify-self-start">
              <h3 className="mb-1 font-presto text-xl font-semibold italic text-[#877455] md:text-[40px]">
                Alexey Andrienko
              </h3>
              <p className="mb-10 mt-3 text-xl">Real Estate Expert in Dubai</p>

              <h1 className="mb-6 !min-w-[37rem] font-presto text-3xl font-normal !leading-none !tracking-[-0.04rem] text-[#071C35] md:text-4xl lg:text-[50px]">
                Invest in Dubai Islands Luxury Real Estate
              </h1>

              <h2 className="max-w-md pt-6 font-presto text-xl leading-snug md:text-[27px] font-semibold text-[#04080e]">
                Choose From 20+ Waterfront Projects with 15% ROI Potential
              </h2>
            </div>

            {/* Middle Column - Person Image */}
            <div className="col-span-1 flex w-full items-end justify-start justify-self-start">
              <Image
                src={agentImage || "/placeholder.svg"}
                alt="Real Estate Expert"
                width={798}
                height={750}
                className="z-20 -ml-30 !max-w-[153rem] scale-x-[-1] object-contain md:-ml-20"
                priority
              />
            </div>

            {/* Right Column - Stats Box */}
            <div className="col-span-1 ml-16 hidden w-full self-center justify-self-start lg:block">
              <div className="relative">
                <div className="relative bg-transparent p-6">
                  <div className="absolute bottom-0 left-0 top-0 w-[2.5px] bg-[#877455]"></div>

                  <div className="absolute left-0 top-0 h-[2.5px] w-1/4 bg-[#877455]"></div>

                  <div className="absolute bottom-0 left-0 h-[2.5px] w-1/4 bg-[#877455]"></div>

                  <p className="w-full py-4 text-[17px] leading-relaxed text-gray-800">
                    Demand for Dubai Islands property is soaring. Apartment
                    prices rocketed 25.3% in 2024, offering great resale and
                    rental opportunities. Book the best unit while stock lasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1a33] py-4 sm:py-6 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="mx-auto max-w-3xl text-xs sm:text-sm md:text-base">
            My clients earn up to 15% ROI on invested capital yearly from
            rentals,
            <br className="hidden md:block" />
            and up to 40% on invested capital yearly from property resales
          </p>
        </div>
      </footer>
    </main>
  );
}
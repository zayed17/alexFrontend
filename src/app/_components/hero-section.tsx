import Image from "next/image";
import { agentImage, whiteBanner } from "@/constants/images";

export default function RealEstateLanding() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative mx-auto md:h-[93vh] lap:h-[86vh] w-full overflow-hidden px-[5%]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 ">
          <Image
            src={whiteBanner}
            alt="Dubai Cityscape"
            fill
            className="object-cover"
            priority
          />
          {/* White overlay gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/90 via-white/90 to-white/90"></div>
        </div>

        {/* Left Content */}
        <div className="container relative z-20 mx-auto flex h-full flex-col justify-center px-4  max-w-[110rem]">
          <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Left Column - Text */}
            <div className="col-span-1 self-center justify-self-start">
              <h3 className="mb-1 font-presto text-xl font-semibold italic text-[#877455] md:text-[40px]">
                Alexey Andrienko
              </h3>
              <p className="mb-10 mt-3 text-xl">Real Estate Expert in Dubai</p>

              <h1 className="mb-6 !min-w-[37rem] font-presto text-3xl font-normal !leading-none !tracking-[-0.04rem] text-[#071C35] md:text-4xl lg:text-[50px]">
                Invest in Dubai Islands Luxury Real Estate
              </h1>

              <h2 className="max-w-md pt-6 font-presto text-xl leading-snug md:text-[27px]">
                Choose From 20+ Waterfront Projects with 15% ROI Potential
              </h2>
            </div>

            {/* Middle Column - Person Image */}
            <div className="col-span-1 flex w-full items-end justify-start justify-self-start">
              <Image
                src={agentImage}
                alt="Real Estate Expert"
                width={798}
                height={750}
                className="z-20 -ml-20 !max-w-[153rem] scale-x-[-1] object-contain"
                priority
              />
            </div>

            {/* Right Column - Stats Box */}
            <div className="col-span-1 hidden self-center justify-self-start lg:block ml-16 w-full">
              <div className="relative">
                <div className="relative bg-transparent p-6">
                  {/* Left border - full height */}
                  <div className="absolute bottom-0 left-0 top-0 w-[2.5px] bg-[#877455]"></div>

                  {/* Top border - 1/4 width */}
                  <div className="absolute left-0 top-0 h-[2.5px] w-1/4 bg-[#877455]"></div>

                  {/* Bottom border - 1/4 width */}
                  <div className="absolute bottom-0 left-0 h-[2.5px] w-1/4 bg-[#877455]"></div>

                  <p className="text-[17px] leading-relaxed text-gray-800 w-full py-4">
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
      <footer className="bg-[#0a1a33] py-6 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="mx-auto max-w-3xl text-sm md:text-base">
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

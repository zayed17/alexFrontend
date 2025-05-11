import Image from "next/image";
import Link from "next/link";

const RealEstateSection = () => {
  return (
    <section className="w-full py-16">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* Left Side - Image with Text Overlay (Flush with left screen edge) */}
        <div className="relative">
          <div className="relative mt-15 h-[300px] overflow-hidden lg:h-[400px]">
            <Image
              src="/images/homepage/section-2-img-1.png"
              alt="Luxury Real Estate"
              width={700}
              height={500}
              className="h-full w-full object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-start bg-gradient-to-l from-white via-white/45 to-transparent p-8 md:justify-start lg:justify-end">
              <div className="max-w-[300px]">
                <h2 className="font-presto text-3xl font-medium leading-tight text-white md:text-[35px] md:text-white lg:text-gray-900">
                  Your Gateway to <br /> Exceptional Dubai <br /> Real Estate
                </h2>
                <Link href={"/luxuryproperty"}>
                  <button className="mt-6 flex items-center bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800">
                    DISCOVER MORE <span className="ml-2">→</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Description Text with proper padding matching image */}
          <div className="mt-8 flex justify-center space-y-4 md:justify-center lg:justify-end">
            <div className="w-[80%] md:w-[80%] lg:w-[75%]">
              <p className="text-sm leading-relaxed text-gray-700">
                Discover unparalleled real estate opportunities in the heart of
                Dubai with mrProperties, your trusted partner in finding your
                dream home or making lucrative investments. As a leading real
                estate broker, we take pride in our exceptional track record,
                having successfully facilitated property transactions exceeding
                a remarkable 300 million.
              </p>

              <p className="text-sm leading-relaxed text-gray-700">
                Embark on your real estate journey with mrProperties and unlock
                the door to extraordinary living spaces and lucrative
                investments. Explore our website to find your ideal property or
                get in touch with our team for personalized assistance. Your
                dream property in Dubai awaits!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Black & White Image with gap on right */}
        <div className="flex h-full justify-center pr-0 md:pr-4 lg:pr-8">
          <Image
            src="/images/homepage/section-2-img-2.png"
            alt="Dubai Tower"
            width={900}
            height={800}
            className="h-[100%] w-full object-cover grayscale md:w-[70%] lg:w-[70%]"
          />
        </div>
      </div>
    </section>
  );
};

export default RealEstateSection;

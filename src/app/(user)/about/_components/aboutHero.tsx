import Image from "next/image"

export default function AboutHeader() {
  return (
    <div className="relative w-full  h-[300px] md:h-[300px] overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <Image
          src="/images/contact/contact-bg.png"
          alt="Coastal property with palm trees"
          fill
          priority
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0  bg-black/40"></div>
      </div>

      {/* Text Content - Centered */}
      <div className="relative containers  h-full flex flex-col justify-center items-start  p-6 md:p-12 text-white">
        <h1 className="text-2xl md:text-4xl text-white font-presto font-light mb-2">About M R One Properties</h1>
        <p className="text-xs sm:text-sm md:text-base font-light max-w-2xl">
          Reach out to us to find yours. Start building your dream together. Your satisfaction is our priority.
        </p>
      </div>
    </div>
  )
}
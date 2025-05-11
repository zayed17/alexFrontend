"use client"
import Image from "next/image"

export default function DubaiInvestmentLanding({name,role,yearlyPercentage,profileImage}:any) {
  return (
    <div className="relative w-full h-full  overflow-hidden ">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071c35fe] to-[#071c35c8] !opacity-100">
          <Image
           src="/images/dubaiInvestment/img-1.png"
            alt="Dubai Skyline"
            className="w-full h-full object-cover opacity-50"
            width={1920}
            height={1080}
            priority
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-[30rem] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 ">
        {/* Left Content */}
        <div className="max-w-md lg:max-w-lg text-left mt-16 lg:mt-0">
          <p className="text-white text-sm lg:text-base font-light leading-relaxed mb-4">
            In a city of endless possibilities,
            <br />
            let me guide you to the home that defines your future.
          </p>

          <h1 className="text-white text-3xl lg:text-5xl font-bold leading-tight mb-4 font-presto">
            Invest in Dubai and
            <br />
            earn up to {yearlyPercentage}% annually
          </h1>

          <p className="text-white text-sm lg:text-base italic font-light mb-6 font-presto">
            Find out your investment profitability
            <br />
            in just 5 minutes!
          </p>

          <button className="bg-[#877455] hover:bg-[#877458] text-white uppercase text-xs lg:text-sm font-semibold py-3 px-6 rounded-sm transition duration-300">
            GET YOUR PERSONALIZED CALCULATION
          </button>
        </div>

        {/* Right Profile Section */}
        <div className="relative mt-10 lg:mt-0 flex-1 flex justify-end items-center h-full">
          <Image
           src={profileImage}
            alt={profileImage}
            className=" object-contain object-right"
            width={400}
            height={500}
          />
          <div className="absolute bottom-45 right-0 md:right-75 lg:right-75  text-white">
            <h2 className="text-[#877455] text-xl lg:text-2xl italic font-presto font-medium">{name}</h2>
            <p className="text-white text-xs lg:text-sm font-light">{role}</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute right-33 bottom-[0px] text-white opacity-20 text-5xl lg:text-6xl italic font-serif">
        {name}
        </div>
      </div>
    </div>
  )
}


import { aboutAgent } from "@/constants/images";
import Image from "next/image";
import React from "react";

export default function AboutAget() {
  return (
    <div className="w-full bg-white pt-20  max-w-[110rem] mx-auto flex items-center">
      <div className="containers mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-30 items-center">
          {/* Left side - Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-[40px] overflow-hidden w-full ">
              <Image
                src={aboutAgent}
                alt="Dubai Islands Beachfront"
                className="object-cover"
                width={798}
                height={750}
                priority
              />
            </div>
            
            {/* Stats box */}
            <div className="absolute -bottom-10 -right-10 md:right-0 lg:-right-16 bg-white rounded-[40px] shadow-lg px-12 py-6 max-w-xl">
              <ul className=" list-none">
                <li className="flex items-start">
                  <span className="text-[#071C35] mr-2 font-bold">•</span>
                  <span>120+ successful transactions in 2 years</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#071C35] mr-2 font-bold">•</span>
                  <span>$55M+ in assets under management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#071C35] mr-2 font-bold">•</span>
                  <span>9 years of experience in the Dubai market</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="w-full lg:w-1/2 pt-16 lg:pt-0">
            <p className="text-[gray-800] mb-4">
              My name is Alexey Andrienko,<br />
              and I help investors secure the best deals in the UAE.
            </p>
            
            <h1 className="text-3xl md:text-[40px] font-serif text-[#0a2540] leading-tight mb-6">
              Welcome to Dubai Islands — a place where dreams take shape!
            </h1>
            
            <p className="text-[gray-800] mb-8">
              I don't just sell real estate — I build an investment strategy tailored to you,<br />
              ensuring your money works for maximum profitability.
            </p>
            
            <button className="bg-[#071C35] text-white text-sm px-8 py-3 rounded-full font-medium hover:bg-[#0a3060] transition-colors">
              SUBMIT A REQUEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
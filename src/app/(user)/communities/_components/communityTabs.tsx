"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { communityBanner } from "@/constants/images";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Location {
  _id: string;
  title: string;
  heading: string;
  mainImage: string;
  totalBedrooms: number;
}

interface ExpoLivingProps {
  locations: Location[];
}

const ExpoLiving: React.FC<ExpoLivingProps> = ({ locations }) => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setActiveLocation(locations[0]);
    }
  }, [locations]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!activeLocation) {
    return null;
  }

  return (
    <section className="relative mx-auto w-full overflow-hidden bg-transparent py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:pl-[10%]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#071c35fe] to-[#071c35c8] !opacity-500"></div>
        <Image
          src={communityBanner}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-1 pt-18" >
        {/* Mobile Dropdown Selector */}
        <div className="lg:hidden mb-6">
          <motion.div 
            className="relative mt-20"
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={toggleMobileMenu}
              className="flex w-full items-center justify-between rounded-lg bg-white/10 backdrop-blur-sm p-3 text-white border border-white/20 shadow-lg"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="font-medium truncate">{activeLocation.title}</span>
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div 
                  className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-lg bg-[#071c35] border border-white/20 shadow-lg z-50"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-2">
                    {locations.map((location:any, index:number) => (
                      <motion.button
                        key={location._id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveLocation(location);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                          activeLocation._id === location._id
                            ? "bg-white/20 text-white font-medium"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {location.title}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop Navigation Panel - Hidden on Mobile */}
        <div className="hidden lg:block lg:col-span-3">
          <nav className="flex flex-col space-y-3 py-6 pr-4 bg-transparent">
            {locations.map((location:any, index:number) => (
              <button
                key={location._id}
                onClick={() => setActiveLocation(location)}
                className={`px-2 py-2 text-left text-sm uppercase transition-colors duration-200 hover:text-yellow-400 ${
                  activeLocation._id === location._id
                    ? "border-b border-white text-white font-medium"
                    : "text-white text-opacity-80"
                }`}
              >
                {location.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center justify-center lg:col-span-9">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            {/* Animated Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 sm:mb-6 lg:mb-8"
              >
                <h1 className="font-presto text-2xl sm:text-3xl md:text-[36px] font-light text-white text-center lg:text-left">
                  {activeLocation.title}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Animated Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.mainImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-48 sm:h-52 md:h-64 lg:h-80 overflow-hidden rounded-lg shadow-xl"
              >
                <Image
                  src={activeLocation.mainImage}
                  alt={activeLocation.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-105"
                  priority
                />
                
                {/* Overlay for mobile only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden"></div>
              </motion.div>
            </AnimatePresence>

            {/* Animated Text - Special positioning for mobile */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation._id + "-details"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 sm:mt-8 lg:mt-10 text-white text-center lg:text-left"
              >
                <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
                  <p className="mb-1 text-xs sm:text-sm uppercase tracking-wider">
                    {activeLocation.heading}
                  </p>
                  <p className="text-base sm:text-lg font-semibold">
                    {activeLocation.totalBedrooms > 0 
                      ? `Total ${activeLocation.totalBedrooms} Bedrooms Available` 
                      : "Bedrooms Information Coming Soon"}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Button - Floating button for mobile */}
            <div className="flex justify-center lg:justify-end mt-6 sm:mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/communities/${activeLocation._id}`}>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition border border-white/30 hover:bg-white hover:text-black shadow-lg">
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpoLiving;
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { mainLogo, mainLogoBlack } from "@/constants/images";
import { usePathname } from "next/navigation";
import { getCommunityNames, getProperty } from "@/api/api";

// Type definitions
interface CommunityData {
  _id: string;
  title: string;
  heading: string;
}

interface PropertyData {
  _id: string;
  title: string;
}

interface FeaturedCommunity {
  id: string;
  name: string;
  heading: string;
}

interface FeaturedProperty {
  id: string;
  name: string;
}

interface NavLink {
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("EN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [communityData, setCommunityData] = useState<CommunityData[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyData[]>([]);

  const pathname = usePathname();

  // Fetch community data
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await getCommunityNames();
        setCommunityData(data);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    fetchCommunities();
  }, []);

  // Fetch property data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperty();
        setPropertyData(data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchProperties();
  }, []);

  // Transform API data to match the needed format
  const featuredCommunities = useMemo<FeaturedCommunity[]>(() => {
    return communityData.map((community) => ({
      id: community._id,
      name: community.title,
      heading: community.heading,
    }));
  }, [communityData]);

  // Transform property data from API
  const featuredProperties = useMemo<FeaturedProperty[]>(() => {
    if (!propertyData || propertyData.length === 0) {
      return [];
    }
    return propertyData.map((property) => ({
      id: property._id,
      name: property.title,
    }));
  }, [propertyData]);

  // Instead of checking specific IDs, check if the pathname starts with a specific pattern
  const isWhiteBackgroundPage = (path: string) => {
    const staticWhitePages = [
      "/dubaiharbour",
      "/contact",
      "/Incompleteproperties",
      "/ready-properties",
      "/about",
      "/careers",
      "/luxuryproperty",
      "/media-center",
      "/media-center",
    ];

    // Check for exact matches with static pages
    if (staticWhitePages.includes(path)) {
      return true;
    }

    // Check for dynamic routes
    if (
      path.startsWith("/communities/") ||
      path.startsWith("/realestate/") ||
      path.startsWith("/ready-properties/") ||
      path.startsWith("/media-center") ||
      path.startsWith("/agent")
    ) {
      return true;
    }

    return false;
  };

  // Then use this function instead of the array check

  const showWhiteBackground = scrolled || isWhiteBackgroundPage(pathname || "");

  // Updated navigation links
  const navLinks: NavLink[] = [
    { href: "/affordableproperties", label: "Affordable Properties" },
    { href: "/luxuryproperties ", label: "Luxury Properties " },
    { href: "/exclusivelistings", label: "Exclusive Listings" },
    { href: "/contact", label: "Contact Us" },
  ];

  const middleIndex = Math.floor(navLinks.length / 2 - 1);

  // Existing scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to disable/enable body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLanguageToggle = (lang: string) => {
    setLanguage(lang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed z-50 w-full px-[5%] transition-all duration-300 ${
        showWhiteBackground ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between md:h-20">
        {/* Left side - Language selector */}
        <div className="flex items-center">
          {/* Desktop Language Toggle */}
          <div className="hidden items-center md:flex"></div>
        </div>

        {/* Center Logo for Mobile */}
        <div className="md:hidden">
          <Link href="/">
            <Image
              src={showWhiteBackground ? mainLogoBlack : mainLogo}
              alt="MR ONE Properties"
              width={90}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center space-x-8 md:flex md:space-x-2 lg:space-x-8">
          {navLinks.map((link, index) => {
            if (index === middleIndex) {
              return (
                <React.Fragment key={`fragment-${index}`}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium uppercase tracking-wider md:text-[10px] lg:text-sm ${
                      showWhiteBackground ? "text-black" : "text-black"
                    } transition-colors duration-200 hover:text-[#877455]`}
                  >
                    {link.label}
                  </Link>
                  <Link href="/" className="px-4" key="logo">
                    <Image
                      src={showWhiteBackground ? mainLogo : mainLogo}
                      alt="MR ONE Properties"
                      className="h-auto w-39"
                    />
                  </Link>
                </React.Fragment>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider md:text-[10px] lg:text-sm ${
                  showWhiteBackground ? "text-black" : "text-black"
                } transition-colors duration-200 hover:text-[#877455]`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side - Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="p-2 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-6 w-6 ${
                showWhiteBackground ? "text-black" : "text-white"
              } transition-colors duration-200 hover:text-gray-500`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[85%] transform bg-white/20 shadow-lg backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          {/* Fixed Header for Mobile Menu */}
          <div className="sticky left-0 right-0 top-0 z-10 mb-4 rounded-lg px-2 py-2">
            <div className="flex items-center justify-between">
              <div className="flex justify-center">
                <Image
                  src={mainLogo || "/placeholder.svg"}
                  alt="MR ONE Properties"
                  width={120}
                  height={120}
                  className="w-auto"
                />
              </div>
              {/* Close Button */}
              <button onClick={toggleMobileMenu} className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="mobile-custom-scrollbar flex-1 overflow-y-auto">
            {/* Custom scrollbar styles - Updated for mobile */}
            <style jsx global>{`
              /* Mobile tiny scrollbar */
              .mobile-custom-scrollbar::-webkit-scrollbar {
                width: 1px;
              }

              .mobile-custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
                border-radius: 10px;
              }

              .mobile-custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }

              .mobile-custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
              }

              /* For Firefox - mobile */
              .mobile-custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(255, 255, 255, 0.1)
                  rgba(255, 255, 255, 0.02);
              }
            `}</style>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-3 px-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className="transform text-base font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:translate-x-2 hover:text-[#877455]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}
    </header>
  );
};

export default Navbar;

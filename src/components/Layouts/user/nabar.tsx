"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { mainLogo, mainLogoBlack } from "@/constants/images";
import ukFlag from "/public/images/icon/uk.svg";
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
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    return communityData.map(community => ({
      id: community._id,
      name: community.title,
      heading: community.heading
    }));
  }, [communityData]);
  
  // Transform property data from API
  const featuredProperties = useMemo<FeaturedProperty[]>(() => {
    if (!propertyData || propertyData.length === 0) {
      return [];
    }
    return propertyData.map(property => ({
      id: property._id,
      name: property.title
    }));
  }, [propertyData]);

  // Filter communities and properties based on search query
  const filteredCommunities = useMemo<FeaturedCommunity[]>(() => {
    if (!searchQuery) return featuredCommunities;
    
    return featuredCommunities
      .filter(community => 
        community.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        // Prioritize exact matches and matches at the beginning
        const aStartsWithQuery = a.name.toLowerCase().startsWith(searchQuery.toLowerCase());
        const bStartsWithQuery = b.name.toLowerCase().startsWith(searchQuery.toLowerCase());
        
        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;
        return 0;
      });
  }, [searchQuery, featuredCommunities]);

  const filteredProperties = useMemo<FeaturedProperty[]>(() => {
    if (!searchQuery) return featuredProperties;
    
    return featuredProperties
      .filter(property => 
        property.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        // Prioritize exact matches and matches at the beginning
        const aStartsWithQuery = a.name.toLowerCase().startsWith(searchQuery.toLowerCase());
        const bStartsWithQuery = b.name.toLowerCase().startsWith(searchQuery.toLowerCase());
        
        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;
        return 0;
      });
  }, [searchQuery, featuredProperties]);

  // Instead of checking specific IDs, check if the pathname starts with a specific pattern
const isWhiteBackgroundPage = (path: string) => {
  const staticWhitePages = [
    "/dubaiharbour",
    "/contact",
    "/Incompleteproperties",
    '/ready-properties',
    '/about',
    '/careers',
    '/luxuryproperty',
    '/media-center',
    '/media-center',
  ];
  
  // Check for exact matches with static pages
  if (staticWhitePages.includes(path)) {
    return true;
  }
  
  // Check for dynamic routes
  if (path.startsWith('/communities/') || path.startsWith('/realestate/') || path.startsWith('/ready-properties/') || path.startsWith('/media-center') || path.startsWith('/agent')) {
    return true;
  }
  
  return false;
};

// Then use this function instead of the array check
const showWhiteBackground = scrolled || isWhiteBackgroundPage(pathname || "");

  const navLinks: NavLink[] = [
    { href: "/about", label: "About" },
    { href: "/communities", label: "Communities" },
    { href: "/luxuryproperty", label: "Properties" },
    { href: "/ready-properties", label: "Ready Properties" },
    { href: "/media-center", label: "Media Centre" },
    { href: "/careers", label: "Careers" },
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

  // New effect to disable/enable body scrolling when mobile menu is open
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

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById("desktop-search-input");
        if (searchInput) searchInput.focus();
      }, 50);
    } else {
      // Clear search when closing
      setSearchQuery("");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    // Clear search when toggling mobile menu
    setSearchQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    // Keep search open to show results
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Determine whether to show the white background based on scroll OR page


  // Highlight matching text in search results
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? 
        <span key={i} className="font-bold text-yellow-400">{part}</span> : 
        part
    );
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
          <div className="hidden items-center md:flex">
            {/* <div
              className={`relative flex h-9 w-20 items-center rounded-full px-1 py-1 text-xs ${
                showWhiteBackground ? "bg-gray-200" : "bg-gray-600 bg-opacity-50"
              }`}
            >
              <div
                className={`absolute top-1/2 h-[80%] w-[44%] -translate-y-1/2 rounded-full transition-transform duration-300 ease-in-out ${
                  language === "EN"
                    ? "translate-x-[108%] bg-gray-400"
                    : "translate-x-[8%] bg-gray-400"
                } ${showWhiteBackground ? "bg-[#c1c1c1c0]" : "bg-gray-400"}`}
              ></div>
              <button
                onClick={() => handleLanguageToggle("AR")}
                className={`text-xsm relative z-10 w-1/2 text-center ${
                  language === "AR"
                    ? showWhiteBackground
                      ? "font-semibold text-black"
                      : "font-semibold text-white"
                    : showWhiteBackground
                      ? "text-gray-600"
                      : "text-gray-300"
                }`}
              >
                AR
              </button>
              <button
                onClick={() => handleLanguageToggle("EN")}
                className={`text-xsm relative z-10 flex w-1/2 items-center justify-center ${
                  language === "EN"
                    ? showWhiteBackground
                      ? "font-semibold text-black"
                      : "font-semibold text-white"
                    : showWhiteBackground
                      ? "text-gray-600"
                      : "text-gray-300"
                }`}
              >
                <Image
                  src={ukFlag}
                  alt="English"
                  width={13}
                  height={12}
                  className="mr-1"
                />
                EN
              </button>
            </div> */}
          </div>

          {/* Mobile Language Toggle */}
          {/* <div className="md:hidden">
            <select
              className="appearance-none rounded-full border border-gray-300 bg-transparent px-2 py-1 text-xs text-black"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="AR">AR</option>
              <option value="EN">EN</option>
            </select>
          </div> */}
        </div>

        {/* Center Logo for Mobile */}
        <div className="md:hidden">
          <Link href="/">
            <Image
              src={showWhiteBackground ? mainLogoBlack : mainLogo}
              alt="MR ONE Properties"
              width={80}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center space-x-8 md:space-x-2 lg:space-x-8 md:flex">
          {navLinks.map((link, index) => {
            if (index === middleIndex) {
              return (
                <React.Fragment key={`fragment-${index}`}>
                  <Link
                    href={link.href}
                    className={`text-sm md:text-[10px] lg:text-sm font-medium uppercase tracking-wider ${
                      showWhiteBackground ? "text-black" : "text-black"
                    } transition-colors duration-200 hover:text-yellow-300`}
                  >
                    {link.label}
                  </Link>
                  <Link href="/" className="px-4" key="logo">
                    <Image
                      src={showWhiteBackground ? mainLogoBlack : mainLogo}
                      alt="MR ONE Properties"
                      className="w-28 h-auto"
                    />
                  </Link>
                </React.Fragment>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm md:text-[10px] lg:text-sm font-medium uppercase tracking-wider ${
                  showWhiteBackground ? "text-black" : "text-black"
                } transition-colors duration-200 hover:text-yellow-300`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side - Search and Mobile Menu */}
        <div className="flex items-center space-x-2">
          <div
            className={`relative hidden items-center md:flex ${
              showWhiteBackground ? "bg-[#e5e5e5]" : "bg-[#ffffff52]"
            } rounded-full`}
          >
            <button onClick={toggleSearch} className="p-2">
              {/* Toggle between search and close icon */}
              {isSearchOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-5 w-5 ${
                    showWhiteBackground ? "text-black" : "!text-white"
                  } transition-colors duration-200 hover:text-gray-500`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-5 w-5 ${
                    showWhiteBackground ? "text-black" : "!text-white"
                  } transition-colors duration-200 hover:text-gray-500`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </button>

            {/* Enhanced Search Dropdown */}
            <div
              className={`absolute right-0 top-12 overflow-hidden rounded-md bg-white/90 backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out md:top-14 ${
                isSearchOpen
                  ? "max-h-96 w-96 opacity-100"
                  : "max-h-0 w-0 opacity-0"
              }`}
            >
              <form onSubmit={handleSearchSubmit} className="border-b">
                <div className="relative">
                  <input
                    id="desktop-search-input"
                    type="text"
                    name="search"
                    autoComplete="off"
                    placeholder="Search properties, locations..."
                    className="w-full border-none px-4 py-3 pr-10 text-sm focus:outline-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              
              <div className="max-h-80 overflow-y-auto desktop-custom-scrollbar">
                {/* Communities Section */}
                <div className="p-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                    Communities
                  </h3>
                  {filteredCommunities.length > 0 ? (
                    <div className="space-y-0">
                      {filteredCommunities.map((community) => (
                        <Link
                          key={community.id}
                          href={`/communities/${community.id}`}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <span className="text-sm font-medium">
                            {highlightMatch(community.name, searchQuery)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 py-2">
                      No communities match your search
                    </div>
                  )}
                  <Link
                    href="/communities"
                    className="mt-2 flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    View all communities
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 h-3 w-3"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {/* Properties Section */}
                <div className="p-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                    Properties
                  </h3>
                  {filteredProperties.length > 0 ? (
                    <div className="space-y-0">
                      {filteredProperties.map((property) => (
                        <Link
                          key={property.id}
                          href={`/realestate/${property.id}`}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <span className="text-sm font-medium">
                            {highlightMatch(property.name, searchQuery)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 py-2">
                      No properties match your search
                    </div>
                  )}
                  <Link
                    href="/luxuryproperty"
                    className="mt-2 flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    View all properties
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 h-3 w-3"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
        className={`fixed inset-y-0 right-0 z-50 w-[85%] transform bg-white/20 backdrop-blur-xl shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          {/* Fixed Header for Mobile Menu */}
          <div className="sticky top-0 left-0 right-0 z-10 py-2  mb-4  px-2 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-center">
                <Image
                  src={mainLogo}
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
          <div className="flex-1 overflow-y-auto mobile-custom-scrollbar">
            {/* Enhanced Mobile Search Section */}
            <div className="mb-0 mt-2 px-2">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search properties, locations..."
                    className="w-full rounded-full border border-gray-400/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Custom scrollbar styles - Updated for both mobile and desktop */}
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
                  scrollbar-color: rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.02);
                }
                
                /* Desktop scrollbar */
                .desktop-custom-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                
                .desktop-custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(240, 240, 240, 0.3);
                  border-radius: 10px;
                }
                
                .desktop-custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(180, 180, 180, 0.5);
                  border-radius: 10px;
                }
                
                .desktop-custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(150, 150, 150, 0.7);
                }
                
                /* For Firefox - desktop */
                .desktop-custom-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: rgba(180, 180, 180, 0.5) rgba(240, 240, 240, 0.3);
                }
              `}</style>

              {/* Communities Section - with updated mobile scrollbar */}
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold uppercase text-white">
                  Communities
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto mobile-custom-scrollbar pr-1">
                  {filteredCommunities.length > 0 ? (
                    filteredCommunities.map((community) => (
                      <Link
                        key={community.id}
                        href={`/communities/${community.id}`}
                        className="flex items-center justify-between rounded-md p-2 hover:bg-white/10"
                        onClick={toggleMobileMenu}
                      >
                        <span className="text-sm font-medium text-white">
                          {highlightMatch(community.name, searchQuery)}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 py-2">
                      No communities match your search
                    </div>
                  )}
                </div>
                <Link
                  href="/communities"
                  className="mt-2 flex items-center text-xs font-medium text-yellow-400 hover:text-yellow-300"
                  onClick={toggleMobileMenu}
                >
                  View all communities
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 h-3 w-3"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              {/* Properties Section - with updated mobile scrollbar */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase text-white">
                  Properties
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto mobile-custom-scrollbar pr-1">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <Link
                        key={property.id}
                        href={`/realestate/${property.id}`}
                        className="flex items-center justify-between rounded-md p-2 hover:bg-white/10"
                        onClick={toggleMobileMenu}
                      >
                        <span className="text-sm font-medium text-white">
                          {highlightMatch(property.name, searchQuery)}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-gray-300 py-2">
                      No properties match your search
                    </div>
                  )}
                </div>
                <Link
                  href="/luxuryproperty"
                  className="mt-2 flex items-center text-xs font-medium text-yellow-400 hover:text-yellow-300"
                  onClick={toggleMobileMenu}
                >
                  View all properties
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 h-3 w-3"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-3 px-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className="transform text-base font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:translate-x-2 hover:text-yellow-500"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
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
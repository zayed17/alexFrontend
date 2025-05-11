"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

// Define interfaces for the API data
interface Property {
  _id: string;
  title: string;
  propertyType?: {
    _id: string;
    title: string;
  };
}

interface Community {
  _id: string;
  title: string;
}

interface FooterProps {
  communities?: Community[];
  properties?: Property[];
  socialMedia?: any;
}

const Footer = ({
  communities = [],
  properties = [],
  socialMedia = [],
}: FooterProps) => {

  const [openSections, setOpenSections] = useState<number[]>([]);
  const [apartmentProperties, setApartmentProperties] = useState<Property[]>(
    [],
  );
  const [villaProperties, setVillaProperties] = useState<Property[]>([]);
  useEffect(() => {
    if (properties && properties.length > 0) {
      const apartments = properties.filter(
        (property) =>
          property.propertyType?.title?.toLowerCase() === "apartments",
      );
      setApartmentProperties(apartments);

      const villas = properties.filter(
        (property) => property.propertyType?.title?.toLowerCase() === "villas",
      );
      setVillaProperties(villas);
    }
  }, [properties]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const aboutLinks = [
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
    { name: "CAREERS", href: "/careers" },
  ];
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="h-4 w-4 fill-gray-600 hover:fill-gray-600"
          >
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-4 w-4 fill-gray-600 hover:fill-gray-600"
          >
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-4 w-4 fill-gray-600 hover:fill-gray-600"
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
          </svg>
        );
      case "twitter":
      case "x":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4 fill-gray-600 hover:fill-gray-600"
          >
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="h-4 w-4 fill-gray-600 hover:fill-gray-600"
          >
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4 fill-gray-600 hover:fill-gray-600"
          >
            <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192C2.8 212.5 0 233.9 0 256s2.8 43.5 8.1 64H131.2c-2.1-20.6-3.2-42-3.2-64s1.1-43.4 3.2-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
          </svg>
        );
    }
  };
  const socialLinks = socialMedia.map((social: any) => ({
    name: social.platform,
    href: social.url,
    icon: getSocialIcon(social.platform),
  }));
  // Create link objects from API data
  const communitiesLinks = communities.map((community) => ({
    name: community.title.toUpperCase(),
    href: `/communities/${community._id}`,
  }));

  const apartmentsLinks = apartmentProperties.map((property:any) => ({
    name: property.title.toUpperCase(),
    href: property?.mainImage ?  `/realestate/${property._id}` : `/ready-properties/${property._id}`,
  }));

  const villasLinks = villaProperties.map((property:any) => ({
    name: property.title.toUpperCase(),
    href: property?.mainImage ?  `/realestate/${property._id}` : `/ready-properties/${property._id}`,
  }));

  // Footer sections data
  const footerSections = [
    { title: "Communities", links: communitiesLinks, hasViewToggle: true },
    { title: "Apartments", links: apartmentsLinks, hasViewToggle: false },
    { title: "Villas", links: villasLinks, hasViewToggle: false },
    { title: "About", links: aboutLinks, hasViewToggle: false },
  ];

  return (
    <footer className="border-t border-gray-100 px-4 pb-8 pt-10 text-[#444444] sm:px-[5%] sm:pt-16">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="mb-8 sm:mb-12">
          {/* Desktop View: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="mb-6 font-presto text-lg font-normal text-[#071C35] sm:text-xl">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.slice(0, 5).map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-xs text-[#444444] hover:text-gray-900"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile View: Accordion Layout */}
          <div className="md:hidden">
            {footerSections.map((section, index) => (
              <div key={index} className="border-b border-gray-100 py-4">
                <button
                  className="flex w-full items-center justify-between"
                  onClick={() => toggleSection(index)}
                  aria-expanded={openSections.includes(index)}
                >
                  <h3 className="font-presto text-lg font-normal text-[#071C35]">
                    {section.title}
                  </h3>
                  <span
                    className="text-gray-600 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: openSections.includes(index)
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openSections.includes(index) ? "500px" : "0",
                    opacity: openSections.includes(index) ? "1" : "0",
                  }}
                >
                  <ul className="mt-4 space-y-3 pb-2">
                    {section.links.slice(0, 5).map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="text-xs text-[#444444] hover:text-gray-900"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-100 pt-6 sm:pt-8">
          <div className="flex flex-col space-y-6 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Social Media - Only show available platforms */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center space-x-4 lg:order-2">
                {socialLinks.map((social:any, index:number) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="rounded-full bg-gray-3 p-2"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            )}

            {/* Terms & Privacy */}
            <div className="text-center text-xs text-[#444444] lg:order-3 lg:text-right">
                Terms & Conditions
              <span className="mx-2">|</span>
                Privacy & Cookies
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-gray-500 lg:order-1 lg:text-left">
              Copyright © mr1properties {new Date().getFullYear()}. All Right
              Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PropertyExpertContact = ({ data }:any) => {

  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row lg:gap-12">
          {/* Left Content Section */}
          <div className="w-full space-y-4 md:w-1/2">
            <div className="text-sm font-medium uppercase tracking-wider text-gray-500">
              {data.heading}
            </div>

            <h2 className="font-serif text-2xl leading-tight text-gray-900 sm:text-3xl">
              {data.subheading}
            </h2>

            {/* Contact Information */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-3 bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Email</span>
                  <span className="text-sm">{data.expert.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-3 bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Phone</span>
                  <span className="text-sm">{data.expert.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div>
                <Link href={`/agent/${data.expert.id}`}>
                <button
                  className="bg-gray-900 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-gray-800 focus:outline-none"
                >
                  {data.callToAction}
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="mt-8 flex w-full flex-col items-center md:mt-0 md:w-1/2 md:items-end">
            <div className="relative flex h-64 w-48 items-center justify-center md:h-72 md:w-52 lg:h-80 lg:w-64">
              <div className="h-full w-full overflow-hidden rounded-full">
                <Image
                //add fill
                  fill
                  src={data.expert.photo}
                  alt="Business professional"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4 text-center ">
              <h3 className="text-xl font-medium text-gray-900">
                {data.expert.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{data.expert.title}</p>
              <p className="mt-0.5 text-sm text-gray-600">
                {data.expert.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyExpertContact;

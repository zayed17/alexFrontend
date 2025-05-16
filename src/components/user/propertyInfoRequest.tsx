"use client";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PropertyInfoRequest = ({
  id,
  title,
  description,
  contactName,
  contactPosition,
  contactPhone,
  imageSrc,
  agentId
}: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axiosInstance
      .post("/contact", {...formData, propertyId: id})
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        toast.success("Your request has been sent successfully!");
        setFormData({ name: "", email: "", phone: "" });
      })
      .catch((error) => {
        console.error("There was an error submitting the form:", error);
        toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row lg:gap-12">
          {/* Form Section */}
          <div className="w-full space-y-4 md:w-1/2">
            <div className="text-sm font-medium uppercase tracking-wider text-gray-500">
              LOOK FOR THE RIGHT PROPERTY?
            </div>

            <h2 className="font-serif text-2xl leading-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">{description}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-300 p-3 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-300 p-3 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+971 000 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-300 p-3 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-gray-900 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-gray-800 focus:outline-none"
                >
                  REQUEST INFORMATION
                </button>
              </div>
            </form>
          </div>

          {/* Profile Section with exact Figma specifications */}
          <div className="mt-8 flex w-full flex-col items-center md:mt-0 md:w-1/2 md:items-end">
            <div className="relative flex h-64 w-48 items-center justify-center md:h-72 md:w-52 lg:h-80 lg:w-64">
              {/* Using a div with large border radius to match the 139px radius spec while maintaining responsiveness */}
              <div className="h-full w-full overflow-hidden rounded-full">
                <Image
                  //add fill
                  fill
                  src={imageSrc}
                  alt="Business professional"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className=" mt-4 text-center md:text-center">
              <h3 className="text-xl font-medium text-gray-900">
                {contactName}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{contactPosition}</p>
              <p className="mt-0.5 text-sm text-gray-600">{contactPhone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoRequest;

"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { agentImage, whiteBanner } from "@/constants/images";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

const ContactFooter: React.FC = () => {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

<<<<<<< HEAD
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted", { name, phoneNumber })
    // You can add your API call or other logic here
  }
=======
  const  handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      phone:phoneNumber,
    };
     await axiosInstance.post("/contact", formData);
    toast.success("Your message has been sent successfully!");

    setName("");
    setPhoneNumber("");
  };
>>>>>>> badee301573accb9b7a199cb0e27d3a592452e47

  return (
    <footer className="relative overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={whiteBanner || "/placeholder.svg"}
          alt="Dubai Skyline"
          fill
          className="object-cover"
          style={{ filter: "brightness(0.3)" }}
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto min-h-[36rem] max-w-[110rem] px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="hidden lg:flex lg:justify-start">
            <Image
              src={agentImage || "/placeholder.svg"}
              alt="Real Estate Agent"
              width={798}
              height={750}
              className="mt-26 ml-20 max-w-[80%] scale-x-[-1] object-contain md:max-w-[100%]"
            />
          </div>

          {/* Contact Form */}
          <div className="mx-auto w-full max-w-md text-white py-10 lg:max-w-none lg:py-0 lg:mx-0">
            <h2 className="mb-8 font-presto text-2xl md:text-3xl leading-snug text-white text-center lg:text-left">
              I will help you to buy the <br />
              <span className="font-semibold">Best Property in Dubai</span>
            </h2>

            {/* Contact Info */}
            <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 justify-center lg:justify-start">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Mail className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Email</p>
                  <p className="text-sm">info@alexeypavlenko.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Phone className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Phone</p>
                  <p className="text-sm">+971 50 723 9887</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mx-auto lg:mx-0 max-w-[486px] space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-full bg-white px-6 text-black py-3 text-sm outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="tel"
                placeholder="+971   Phone number"
                className="w-full rounded-full bg-white px-6 py-3 text-black text-sm outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <div className="flex flex-col space-y-3">
                <button
                  type="submit"
                  className="w-full rounded-full bg-gray-400 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-500"
                >
                  REQUEST INFORMATION
                </button>

                <a
                  href="https://wa.me/971507239887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full bg-green-500 px-16 py-3 text-sm font-medium text-white transition hover:bg-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M16.001 3.2a12.8 12.8 0 0 0-11.21 19.25L3 29l6.8-1.78A12.8 12.8 0 1 0 16.001 3.2zm0 23.2a10.4 10.4 0 0 1-5.295-1.47l-.379-.22-4.03 1.05 1.1-3.927-.246-.4A10.4 10.4 0 1 1 16.001 26.4zm5.666-7.893c-.31-.154-1.82-.9-2.102-1s-.485-.154-.69.154-.79 1-1 1.207-.37.231-.68.077a8.356 8.356 0 0 1-2.47-1.52 9.274 9.274 0 0 1-1.71-2.13c-.18-.308-.02-.474.134-.628.139-.138.31-.359.47-.539.154-.18.205-.308.308-.513s.051-.385-.026-.538c-.077-.154-.69-1.65-.945-2.26-.246-.59-.497-.513-.69-.523s-.385-.01-.59-.01a1.133 1.133 0 0 0-.825.385 3.44 3.44 0 0 0-1.07 2.57 5.998 5.998 0 0 0 1.26 3.108c.154.205 2.28 3.49 5.525 4.893a18.86 18.86 0 0 0 1.91.7c.8.26 1.53.2 2.107.123.643-.092 1.98-.807 2.26-1.587.277-.78.277-1.448.195-1.587-.082-.139-.277-.205-.59-.359z" />
                  </svg>
                  WHATSAPP
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom White Bar */}
      <div className="bg-white py-6 shadow-inner">
        <div className="mx-auto flex max-w-[110rem] flex-col items-center justify-between gap-4 px-4 text-sm text-gray-600 sm:flex-row">
          <div className="text-center sm:text-left">Copyright © Alexeypavlenko 2025. All Right Reserved.</div>

          <div className="flex items-center">
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 transition hover:text-black" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 transition hover:text-black" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 transition hover:text-black" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 transition hover:text-black" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5 transition hover:text-black" />
              </Link>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-black">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-black">
              Privacy & Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ContactFooter

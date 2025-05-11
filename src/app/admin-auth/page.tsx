import Signin from "@/components/Auth/SignIn";
import type { Metadata } from "next";
import Image from "next/image";
import { mainLogo, mainLogoBlack } from "@/constants/images";

export const metadata: Metadata = {
  title: "MR ONE Admin | Sign In",
};

export default function SignIn() {
  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-xl shadow-xl dark:bg-gray-900">
      <div className="flex flex-wrap items-stretch">
        {/* Left side - Luxury Dubai Image */}
        <div className="relative hidden w-full xl:block xl:w-1/2">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 to-transparent"></div>
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="MR ONE Real Estate Dubai"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            priority
            unoptimized={true}
          />
          <div className="relative z-20 flex h-full flex-col justify-between p-12">
            <div className="mb-auto">
              <Image
                src={mainLogo}
                alt="MR ONE"
                width={180}
                height={60}
                className="mb-4"
              />
            </div>
            <div className="mb-6">
              <h1 className="mb-3 text-3xl font-bold text-white">
                MR ONE
                <br /> Real Estate Portal
              </h1>
              <p className="max-w-xs text-white/80">
                {"Managing exclusive properties across Dubai's most prestigious locations"}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div
          className="w-full bg-white dark:bg-gray-900 xl:w-1/2"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='800' viewBox='0 0 1440 800' fill='none'%3E%3Cpath d='M0,800h1440V750h-60v-80h-40v40h-60v-120h-40v80h-30v-160h-40v100h-30v-240h-100v180h-60v60h-80v-140h-40v80h-60v-40h-100v100h-40v-180h-80v80h-40v-40h-80v120h-40v-80h-80v40h-60v-100h-40v60h-80v80h-40v-160h-80v80h-40V800z' fill='rgba(0,0,0,0.02)'/%3E%3C/svg%3E\")",
          }}
        >
          <div className="w-full p-8 sm:p-12 lg:p-16">
            {/* Logo for mobile */}
            <div className="mb-10 flex justify-center xl:hidden">
              <Image
                src={mainLogoBlack}
                alt="MR ONE"
                width={160}
                height={50}
                className="dark:hidden"
              />
              <Image
                src={mainLogo}
                alt="MR ONE"
                width={160}
                height={50}
                className="hidden dark:block"
              />
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Portal
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Sign in to manage your premium properties
              </p>
            </div>

            <Signin />

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                MR ONE © {new Date().getFullYear()} | All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
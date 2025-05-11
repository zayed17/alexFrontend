import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CategoryNav } from "./_components/categoryNav"
import { SearchBar } from "./_components/mainSearchMedia"


export const metadata: Metadata = {
  title: "Dubai Real Estate Videos",
  description: "Discover the best real estate opportunities in Dubai",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <main className=" bg-white pt-30">
          <div className="containers mx-auto px-4 py-30">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-auto md:sticky md:top-22 md:self-start">
                <CategoryNav />
              </div>

              <div className="flex-1">
                <div className=" z-10 bg-white pt-2 ">
                  <SearchBar
                   />
                </div>

                {children}
              </div>
            </div>
          </div>
        </main>
  )
}


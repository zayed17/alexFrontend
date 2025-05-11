"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { name: "LATEST VIDEOS", path: "/media-center" },
  { name: "MR ONE SHOTS", path: "/media-center/shorts" },
]

export function CategoryNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-1 w-full">
      {categories.map((category) => (
        <Link
          key={category.path}
          href={category.path}
          className={cn(
            "block px-4 py-3 text-sm font-medium border border-gray-200",
            pathname === category.path ? "bg-[#071C35] text-white" : "bg-white text-gray-800 hover:bg-gray-100",
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}


"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")

  // Initialize query from URL on component mount
  useEffect(() => {
    const searchQuery = searchParams.get("q")
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Update URL with search query
      const params = new URLSearchParams(searchParams.toString())
      params.set("q", query.trim())

      // Navigate to the current path with search params
      router.push(`${window.location.pathname}?${params.toString()}`)

      // Dispatch custom event for components that need to listen
      const searchEvent = new CustomEvent("app:search", {
        detail: { query: query.trim() },
      })
      window.dispatchEvent(searchEvent)

      // Call onSearch prop if provided
      if (onSearch) {
        onSearch(query.trim())
      }
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Type to search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </button>
    </form>
  )
}

export default SearchBar;
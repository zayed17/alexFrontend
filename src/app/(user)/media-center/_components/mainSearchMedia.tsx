"use client"

import type React from "react"
import { useState } from "react"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
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

  const clearSearch = () => {
    setQuery("")
    // Dispatch event to clear search
    const searchEvent = new CustomEvent("app:search", {
      detail: { query: "" },
    })
    window.dispatchEvent(searchEvent)

    // Call onSearch prop if provided
    if (onSearch) {
      onSearch("")
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
      {query ? (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      ) : null}
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={18} />
      </button>
    </form>
  )
}

"use client"

import { useState } from 'react'

interface LoadMoreButtonProps {
  onClick: () => void
  loading?: boolean
  className?: string
}

export default function LoadMoreButton({ 
  onClick, 
  loading = false, 
  className = "" 
}: LoadMoreButtonProps) {
  return (
    <div className="flex items-center justify-center w-full my-12 ">
      <div className="flex-grow h-px bg-gray-300 max-w-xs"></div>
      <button
        onClick={onClick}
        disabled={loading}
        className={`
          relative
          px-8 py-2
          text-sm font-medium tracking-wider
          text-gray-500 uppercase
          border border-gray-300 rounded-full
          hover:bg-gray-50 hover:text-gray-700
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-gray-200
          disabled:opacity-70 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          "LOAD MORE"
        )}
      </button>
      <div className="flex-grow h-px bg-gray-300 max-w-xs"></div>
    </div>
  )
}
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface SearchControlsProps {
  search: string;
  setSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchControls({ search, setSearch, placeholder = "Search..." }: SearchControlsProps) {
  return (
    <div className="relative w-full max-w-md mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-stroke bg-white py-2 pl-10 pr-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (size: number) => void;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
}

export function PaginationControls({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
}: PaginationControlsProps) {
  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 mt-4 sm:flex-row">
      <div className="text-sm text-gray-500 dark:text-gray-300">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-1">
        <button
          className="flex items-center gap-1 rounded-lg border border-stroke bg-white px-3 py-1 text-sm shadow-sm disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
              currentPage === pageNum
                ? "bg-primary text-white"
                : "border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        <button
          className="flex items-center gap-1 rounded-lg border border-stroke bg-white px-3 py-1 text-sm shadow-sm disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500 dark:text-gray-300">Show</span>
        <select
          className="rounded-lg border border-stroke bg-white py-1 pl-2 pr-8 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
"use client";

import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "use-debounce";

interface UseClientSidePaginationProps<T> {
  data: T[];
  searchKeys: (keyof T)[];
  initialPage?: number;
  initialItemsPerPage?: number;
  initialSearch?: string;
}

export function useClientSidePagination<T>({
  data,
  searchKeys,
  initialPage = 1,
  initialItemsPerPage = 10,
  initialSearch = "",
}: UseClientSidePaginationProps<T>) {
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, itemsPerPage]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const searchTerm = debouncedSearch.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(searchTerm);
      })
    );
  }, [data, debouncedSearch, searchKeys]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
    totalItems: filteredData.length,
    startItem: (currentPage - 1) * itemsPerPage + 1,
    endItem: Math.min(currentPage * itemsPerPage, filteredData.length),
  };
}
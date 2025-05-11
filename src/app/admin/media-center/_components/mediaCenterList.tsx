"use client";

import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon } from "@/components/Tables/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { PaginationControls, SearchControls } from "@/app/_components/SearchAndPagination";

export default function MediaList({ data }: any) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this media ?")) {
      setIsDeleting(true);
      setDeletingId(id);

      try {
        await axiosInstance.delete(`/media-center/${id}`);
        toast.success("Property type deleted successfully!");
        router.refresh(); 
      } catch (error) {
        console.error("Error deleting media :", error);
        toast.error("Failed to delete media .");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/media-center/edit-media-center/${id}`);
  };



  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
    totalItems,
    startItem,
    endItem,
  } = useClientSidePagination({
    data,
    searchKeys: ["title","youtubeUrl","videoType"],
  });

  return (
    <div className="space-y-6">
    <SearchControls 
      search={search}
      setSearch={setSearch}
      placeholder="Search amenities..."
    /> 
    <div className="mt-10 rounded-[10px] border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="xl:pl-7.5">Title</TableHead>
            <TableHead className="xl:pl-7.5">Url</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-5 text-center text-gray-500">
                No Media found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData?.map((item: any) => (
              <TableRow
                key={item._id}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="xl:pl-7.5">
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {item.title}
                  </p>
                </TableCell>
                <TableCell className="xl:pl-7.5">
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {item.youtubeUrl}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-dark dark:text-white">{item.agentId?.name || "N/A"}</p>
                </TableCell>
                <TableCell>
                  <p className="text-dark dark:text-white">{item.videoType}</p>
                </TableCell>

                {/* Action Buttons */}
                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      className="hover:text-primary"
                      aria-label="Edit"
                      onClick={() => handleEdit(item._id)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="hover:text-primary"
                      aria-label="Delete"
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting && deletingId === item._id}
                    >
                      {isDeleting && deletingId === item._id ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        <TrashIcon />
                      )}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    <PaginationControls
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startItem={startItem}
        endItem={endItem}
      />
    </div>
  );
}

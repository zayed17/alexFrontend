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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { PaginationControls, SearchControls } from "@/app/_components/SearchAndPagination";

export default function AgentList({ data }: { data: any[] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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
    searchKeys: ["name", "email", "phone"],
  });

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      setIsDeleting(true);
      setDeletingId(id);

      try {
        await axiosInstance.delete(`/agent/${id}`);
        toast.success("Agent deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Error deleting agent:", error);
        toast.error("Failed to delete agent.");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/agent/edit-agent/${id}`);
  };

  return (
    <div className="space-y-6">
      <SearchControls 
        search={search}
        setSearch={setSearch}
        placeholder="Search agents by name, email or phone..."
      />
      
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[120px] xl:pl-7.5">Profile</TableHead>
              <TableHead className="min-w-[180px]">Name</TableHead>
              <TableHead className="min-w-[200px]">Email</TableHead>
              <TableHead className="min-w-[150px]">Phone</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!paginatedData || paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-5 text-center text-gray-500">
                  No agents found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((agent: any) => (
                <TableRow
                  key={agent._id}
                  className="border-[#eee] dark:border-dark-3"
                >
                  {/* Profile Image */}
                  <TableCell className="min-w-[120px] xl:pl-7.5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={agent.profileImage || "/images/placeholder.jpg"}
                        className="aspect-square h-[50px] w-[50px] rounded-full object-cover"
                        width={50}
                        height={50}
                        alt={`Profile of ${agent.name}`}
                      />
                    </div>
                  </TableCell>

                  {/* Name */}
                  <TableCell className="min-w-[180px]">
                    <p className="text-sm font-medium text-dark dark:text-white">
                      {agent.name}
                    </p>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="min-w-[200px]">
                    <p className="text-dark dark:text-white">{agent.email}</p>
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="min-w-[150px]">
                    <p className="text-dark dark:text-white">{agent.phone}</p>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="xl:pr-7.5">
                    <div className="flex items-center justify-end gap-x-3.5">
                      <button
                        className="hover:text-primary"
                        aria-label="Edit"
                        onClick={() => handleEdit(agent._id)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="hover:text-primary"
                        aria-label="Delete"
                        onClick={() => handleDelete(agent._id)}
                        disabled={isDeleting && deletingId === agent._id}
                      >
                        {isDeleting && deletingId === agent._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
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
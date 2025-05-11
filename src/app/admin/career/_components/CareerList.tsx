"use client"

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
import { Loader2 } from "lucide-react";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { PaginationControls ,SearchControls} from "@/app/_components/SearchAndPagination";

export default function CareerList({ data }:any) {
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
    searchKeys: ["role", "responsibilities","requirements" ,"qualifications"],
  });


  const handleDelete = async (id:any) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      setIsDeleting(true);
      setDeletingId(id);
      
      try {
        await axiosInstance.delete(`/career/${id}`);
        toast.success("Career deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Error deleting career:", error);
        toast.error("Failed to delete career.");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };
  
  const handleEdit = (id:any) => {
    router.push(`/admin/career/edit-career/${id}`);
  };

  return (
    <div className="space-y-6">
    <SearchControls 
      search={search}
      setSearch={setSearch}
      placeholder="Search careers..."
    /> 
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Role</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Responsibilities</TableHead>
            <TableHead>Requirements</TableHead>
            <TableHead>Qualifications</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {!paginatedData || paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-5 text-gray-500">
                No careers found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item:any) => (
              <TableRow key={item._id} className="border-[#eee] dark:border-dark-3">
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <p className="text-sm font-medium text-dark dark:text-white">{item.role}</p>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">{item.experienceFrom} - {item.experienceTo}</p>
                </TableCell>

                <TableCell>
                  <ul className="list-disc list-inside">
                    {item.responsibilities.map((responsibility:string, index:number) => (
                      <li key={index} className="text-dark dark:text-white">{responsibility}</li>
                    ))}
                  </ul>
                </TableCell>

                <TableCell>
                  <ul className="list-disc list-inside">
                    {item.requirements.map((requirement:string, index:number) => (
                      <li key={index} className="text-dark dark:text-white">{requirement}</li>
                    ))}
                  </ul>
                </TableCell>

                <TableCell>
                  <ul className="list-disc list-inside">
                    {item.qualifications.map((qualification:string, index:number) => (
                      <li key={index} className="text-dark dark:text-white">{qualification}</li>
                    ))}
                  </ul>
                </TableCell>

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
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import {
  PaginationControls,
  SearchControls,
} from "@/app/_components/SearchAndPagination";

interface JobApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobId: {
    role:string
  };
  message?: string;
  resume: string;
  createdAt: string;
}

interface JobApplicationListProps {
  data: JobApplication[];
}

export default function JobApplicationList({ data }: JobApplicationListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setIsDeleting(true);
      setDeletingId(id);

      try {
        await axiosInstance.delete(`/job-application/${id}`);
        toast.success("Application deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Error deleting application:", error);
        toast.error("Failed to delete application.");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <SearchControls
        search={search}
        setSearch={setSearch}
        placeholder="Search datas..."
      />
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[120px] xl:pl-7.5">
                Applicant
              </TableHead>
              <TableHead className="min-w-[150px]">Contact Info</TableHead>
              <TableHead>Applied For</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!paginatedData || paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-5 text-center text-gray-500"
                >
                  No job applications found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow
                  key={item._id}
                  className="border-[#eee] dark:border-dark-3"
                >
                  {/* Applicant Name */}
                  <TableCell className="min-w-[120px] xl:pl-7.5">
                    <p className="text-sm font-medium text-dark dark:text-white">
                      {item.name}
                    </p>
                  </TableCell>

                  {/* Contact Info */}
                  <TableCell className="min-w-[150px]">
                    <div className="flex flex-col">
                      <span className="text-dark dark:text-white">
                        {item.email}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.phone}
                      </span>
                    </div>
                  </TableCell>

                  {/* Job Title */}
                  <TableCell>
                    <p className="text-dark dark:text-white">
                      {item.jobId?.role || "N/A"}
                    </p>
                  </TableCell>

                  {/* Message */}
                  <TableCell>
                    <p className="text-dark dark:text-white">
                      {item.message
                        ? item.message.length > 30
                          ? `${item.message.slice(0, 30)}...`
                          : item.message
                        : "No message"}
                    </p>
                  </TableCell>

                  {/* Resume */}
                  <TableCell>
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() =>
                        downloadFile(item.resume, `${item.name}-resume.pdf`)
                      }
                    >
                      Download
                    </button>
                  </TableCell>

                  {/* Date Applied */}
                  <TableCell>
                    <p className="text-dark dark:text-white">
                      {formatDate(item.createdAt)}
                    </p>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="xl:pr-7.5">
                    <div className="flex justify-center">


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

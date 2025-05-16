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
import { useState, useMemo } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { PaginationControls, SearchControls } from "@/app/_components/SearchAndPagination";
import { Tabs } from "@/components/ui/tabs";


const TABS = ["All", "Luxury", "Affordable", "Exclusive"];

export default function PropertyList({ data }: any) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState("All");

  const filteredData = useMemo(() => {
    switch (activeTab) {
      case "Luxury":
        return data.filter((item: any) => item.isLuxury);
      case "Affordable":
        return data.filter((item: any) => item.isAffordable);
      case "Exclusive":
        return data.filter((item: any) => item.isExclusive);
      case "All":
      default:
        return data;
    }
  }, [activeTab, data]);
  

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
    data: filteredData,
    searchKeys: ["title", "bedrooms", "price", "developer"],
  });

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setIsDeleting(true);
      setDeletingId(id);

      try {
        await axiosInstance.delete(`/property/${id}`);
        toast.success("Property deleted successfully!");
        router.refresh();
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error("Failed to delete property.");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/property/edit-property/${id}`);
  };

  return (
    <div className="space-y-6">

      <SearchControls
        search={search}
        setSearch={setSearch}
        placeholder="Search Properties..."
      />

      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[155px] xl:pl-7.5">Title</TableHead>
              <TableHead className="min-w-[155px]">Main Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!paginatedData || paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-5 text-center text-gray-500">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item: any) => (
                <TableRow
                  key={item._id}
                  className="border-[#eee] dark:border-dark-3"
                >
                  <TableCell>
                    <p className="text-sm font-medium text-dark dark:text-white">
                      {item.title}
                    </p>
                  </TableCell>

                  <TableCell className="min-w-[155px] xl:pl-7.5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`${item.mainImage}` || "/images/placeholder.jpg"}
                        className="aspect-[6/5] h-[50px] w-[60px] rounded-[5px] object-cover"
                        width={60}
                        height={50}
                        alt={`Main Image of ${item.title}`}
                      />
                    </div>
                  </TableCell>

                  <TableCell className="min-w-[155px]">
                    <p className="text-dark dark:text-white">{item.price}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-dark dark:text-white">{item.bedrooms}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-dark dark:text-white">{item.developer}</p>
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

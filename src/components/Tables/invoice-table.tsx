import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { getInvoiceTableData } from "./fetch";
import {  PreviewIcon, EditIcon, } from "./icons"; 
import Image from "next/image";

export async function InvoiceTable() {
  const data = await getInvoiceTableData();

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Invoice Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item:any) => (
            <TableRow key={item._id} className="border-[#eee] dark:border-dark-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    className="aspect-[6/5] w-[60px] h-[50px] rounded-[5px] object-cover"
                    width={60}
                    height={50}
                    alt={item.alt || `Image of ${item.name}`}
                  />
                </div>
              </TableCell>

              <TableCell>
                <p className="text-sm font-medium text-dark dark:text-white">
                  {item.name}
                </p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.date).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              <TableCell>
                <div
                  className={cn(
                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]": item.status === "Paid",
                      "bg-[#D34053]/[0.08] text-[#D34053]": item.status === "Unpaid",
                      "bg-[#FFA70B]/[0.08] text-[#FFA70B]": item.status === "Pending",
                    }
                  )}
                >
                  {item.status}
                </div>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary" aria-label="View Invoice">
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary" aria-label="Edit Invoice">
                    <EditIcon />
                  </button>

                  <button className="hover:text-primary" aria-label="Delete Invoice">
                    <TrashIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

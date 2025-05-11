import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CareerList from "./_components/CareerList";
import { getCareer } from "@/api/api";

export default async function CareerPage() {
  const careers = await getCareer()
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/career/add-career" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Career
            </span>
          </Button>
        </Link>
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <CareerList data={careers}/>
        </Suspense>
      </div>
    </div>
  );
};





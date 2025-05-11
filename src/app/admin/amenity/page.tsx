import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import AmenityList from "./_components/AmenityList";
import { getAmenities } from "@/api/api";

export default async function AmenityPage() {
  const amenities = await getAmenities();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/amenity/add-amenity" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Amenities
            </span>
          </Button>
        </Link>
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <AmenityList data={amenities} />
        </Suspense>
      </div>
    </div>
  );
}

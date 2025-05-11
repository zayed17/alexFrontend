import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getReadyProperty } from "@/api/api";
import ReadyPropertyList from "./_components/ReadyPropertyList";

export default async function PropertyPage() {
  const property = await getReadyProperty();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/ready-property/add-ready-property" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Ready Property
            </span>
          </Button>
        </Link>
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <ReadyPropertyList data={property}/>
        </Suspense>
      </div>
    </div>
  );
};





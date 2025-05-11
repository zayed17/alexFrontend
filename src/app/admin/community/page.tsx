import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommunityList from "./_components/CommunityList";
import { getCommunity } from "@/api/api";

export default async function CommunityPage() {
  const community = await getCommunity();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/community/add-community" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Community
            </span>
          </Button>
        </Link>
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <CommunityList data={community}/>
        </Suspense>
      </div>
    </div>
  );
};





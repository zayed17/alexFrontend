import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import AgentList from "./_components/AgentList";
import { getAgents } from "@/api/api";

export default async function AmenityPage() {
  const agents = await getAgents();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/agent/add-agent" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Agent
            </span>
          </Button>
        </Link>
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <AgentList data={agents} />
        </Suspense>
      </div>
    </div>
  );
}

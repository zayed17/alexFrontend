import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense } from "react";
import ClientRequestList from "./_components/ClientRequestList";
import { getClientRequestData } from "@/api/api";

export default async function ClientRequest() {
  const clientRequestData = await getClientRequestData();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <ClientRequestList data={clientRequestData}/>
        </Suspense>
      </div>
    </div>
  );
};






import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense } from "react";
import { getJobApplication } from "@/api/api";
import JobApplicationList from "./_components/JobApplicationList";

export default async function Page() {
  const jobApplication = await getJobApplication();
  
  return (
    <div className="space-y-6">
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <JobApplicationList data={jobApplication}/>
        </Suspense>
      </div>
    </div>
  );
};





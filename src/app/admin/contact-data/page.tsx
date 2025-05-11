import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense } from "react";
import ContactDataList from "./_components/ContactDataList";
import { getContactData } from "@/api/api";

export default async function ContactPage() {
  const contactData = await getContactData();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <ContactDataList data={contactData}/>
        </Suspense>
      </div>
    </div>
  );
};






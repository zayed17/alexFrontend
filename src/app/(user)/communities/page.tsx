
import React from "react";
import ExpoLiving from "./_components/communityTabs";
import { getCommunityNames } from "@/api/api";
import WhatsAppWidget from "@/components/user/whatsapp-button";

export const revalidate = 1;

async function Page() {
  const communityData = await getCommunityNames();

  if (!communityData) {
    return <div>Loading...</div>;
  }
  if (communityData.length === 0) {
    return <div>No communities found.</div>;
  }

  
  return (
    <>
      <main >
        <ExpoLiving locations={communityData} />
      </main>
    </>
  );
}

export default Page;
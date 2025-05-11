import CommunityForm from "../../_components/CommunityForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAmenities, getCommunityById } from "@/api/api";

export const metadata: Metadata = {
  title: "Edit Community",
};

export default async function EditCommunityPage({ params }: any) {
  const { id } = params;

  const community = await getCommunityById(id);
  const amenitiesData = await getAmenities();

  

  if (!community) {
    return notFound();
  }

  return (
    <>
      <CommunityForm community={community} amenitiesData={amenitiesData} />
    </>
  );
}

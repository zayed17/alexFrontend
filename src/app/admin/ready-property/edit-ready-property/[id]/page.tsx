import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAmenities,
  getCommunityNames,
  getReadyPropertyById,
  getPropertyTypes,
  getAgents,
} from "@/api/api";
import ReadyPropertyForm from "../../_components/ReadyPropertyForm";

export const metadata: Metadata = {
  title: "Edit Property",
};

export default async function EditCommunityPage({ params }: any) {
  const { id } = params;

  const property = await getReadyPropertyById(id);
  const amenitiesData = await getAmenities();
  const propertyTypes = await getPropertyTypes();
  const communityData = await getCommunityNames();
  const agentData = await getAgents();

  if (!property) {
    return notFound();
  }

  return (
    <>
      <ReadyPropertyForm
        property={property}
        amenitiesData={amenitiesData}
        propertyTypes={propertyTypes}
        communityData={communityData}
        agentData={agentData}
      />
    </>
  );
}

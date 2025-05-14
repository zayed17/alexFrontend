import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAgents, getAmenities, getCommunityNames, getPropertyById, getPropertyTypes } from "@/api/api";
import PropertyForm from "../../_components/PropertyForm";

export const metadata: Metadata = {
  title: "Edit Property",
};

export default async function EditCommunityPage({ params }: any) {
  const { id } = params;

  const property = await getPropertyById(id);
  const amenitiesData = await getAmenities();
  const propertyTypes = await getPropertyTypes();
  const communityData = await getCommunityNames();
  const agentData = await getAgents()

  if (!property) {
    return notFound();
  }

  return (
    <>
      <PropertyForm
        property={property}
        amenitiesData={amenitiesData}
      />
    </>
  );
}

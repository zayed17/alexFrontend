import PropertyForm from "../_components/PropertyForm";
import type { Metadata } from "next";
import { getAgents, getAmenities, getCommunity, getCommunityNames, getPropertyTypes } from "@/api/api";

export const metadata: Metadata = {
  title: "Add Property",
};

export default async function AddPropertyPage() {

  const amenitiesData = await getAmenities()
  const propertyTypes = await getPropertyTypes()
  const communityData = await getCommunityNames()
  const agentData = await getAgents()

  return (
    <>
      <PropertyForm amenitiesData={amenitiesData} propertyTypes={propertyTypes} communityData={communityData} agentData={agentData} />
    </>
  );
}
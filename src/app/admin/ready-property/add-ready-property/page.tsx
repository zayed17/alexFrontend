import type { Metadata } from "next";
import { getAgents, getAmenities, getCommunity, getCommunityNames, getPropertyTypes } from "@/api/api";
import ReadyPropertyForm from "../_components/ReadyPropertyForm";

export const metadata: Metadata = {
  title: "Add Ready Property",
};

export default async function AddPropertyPage() {

  const amenitiesData = await getAmenities()
  const propertyTypes = await getPropertyTypes()
  const communityData = await getCommunityNames()
  const agentData = await getAgents()

  return (
    <>
      <ReadyPropertyForm amenitiesData={amenitiesData} agentData={agentData} propertyTypes={propertyTypes} communityData={communityData} />
    </>
  );
}
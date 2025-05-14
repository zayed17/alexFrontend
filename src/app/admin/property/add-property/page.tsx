import PropertyForm from "../_components/PropertyForm";
import type { Metadata } from "next";
import { getAgents, getAmenities, getCommunity, getCommunityNames, getPropertyTypes } from "@/api/api";

export const metadata: Metadata = {
  title: "Add Property",
};

export default async function AddPropertyPage() {

  const amenitiesData = [{iconName:"fsdfds",_id:"fasdfas"}]

  return (
    <>
      <PropertyForm amenitiesData={amenitiesData} />
    </>
  );
}
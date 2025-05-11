import CommunityForm from "../_components/CommunityForm";
import type { Metadata } from "next";
import { getAmenities } from "@/api/api";

export const metadata: Metadata = {
  title: "Add Community",
};

export default async function AddCommunityPage() {

  const amenitiesData = await getAmenities()

  return (
    <>
      <CommunityForm amenitiesData={amenitiesData} />
    </>
  );
}
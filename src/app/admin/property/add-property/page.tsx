import { getAmenities } from "@/api/api";
import PropertyForm from "../_components/PropertyForm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Property",
};

export default async function AddPropertyPage() {

const amenitiesData = await getAmenities();
if (!amenitiesData) {
    return notFound();
  }

  return (
    <>
      <PropertyForm amenitiesData={amenitiesData} />
    </>
  );
}
import AmenityForm from "../../_components/AmenityForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAmenityById } from "@/api/api";

export const metadata: Metadata = {
  title: "Edit Amenity",
};

export default async function EditAmenityPage({ params }:any) {
  const { id } = params;
  
  // Fetch amenity by ID
  const amenity = await getAmenityById(id);
  
  if (!amenity) {
    return notFound();
  }
  
  return (
    <>
      <AmenityForm amenity={amenity} />
    </>
  );
}

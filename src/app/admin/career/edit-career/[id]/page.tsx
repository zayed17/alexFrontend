import CareerForm from "../../_components/CareerForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCareerById } from "@/api/api";

export const metadata: Metadata = {
  title: "Edit Career",
};

export default async function EditCareerPage({ params }:any) {
  const { id } = params;
  
  // Fetch career by ID
  const career = await getCareerById(id);
  
  if (!career) {
    return notFound();
  }
  
  return (
    <>
      <CareerForm career={career} />
    </>
  );
}

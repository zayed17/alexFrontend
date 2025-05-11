import CareerForm from "../_components/CareerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Career",
};

export default function AddCareerPage() {
  return (
    <>
      <CareerForm />
    </>
  );
}
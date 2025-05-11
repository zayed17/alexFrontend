import AmenityForm from "../_components/AmenityForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Amenity",
};

export default function AddAmenityPage() {
  return (
    <>
      <AmenityForm />
    </>
  );
}
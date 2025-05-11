  import { PropertyTypeForm } from "../../_components/propertyTypeForm";
import { getPropertyTypeById } from "@/api/api";
import { notFound } from "next/navigation";

export default async function EditPropertyTypePage({ params }: any) {
  const { id } = params;

  const propertyType = await getPropertyTypeById(id);

  if (!propertyType) {
    return notFound();
  }

  return (
    <>
      <PropertyTypeForm propertyType={propertyType} />
    </>
  );
}

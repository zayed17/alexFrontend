import PropertyTypeList from "./_components/PropertyTypeList";
import { getPropertyTypes } from "@/api/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function PropertyTypePage() {
  const propertyTypes = await getPropertyTypes();

  return (
    <>
      <div className="flex justify-end">
        <Link href="/admin/property-type/add" passHref>
          <Button variant="default" size="sm" className="text-white" asChild>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Property Types
            </span>
          </Button>
        </Link>
      </div>
      <PropertyTypeList data={propertyTypes} />
    </>
  );
}

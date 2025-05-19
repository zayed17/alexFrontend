import { getProperties, PropertyType } from "@/api/api";
import Exclusivelistings from "../_components/exclusivelistings";

export default async function Page() {
  const property = await getProperties(PropertyType.Exclusive);
  
  return (
   <section>
    <Exclusivelistings data={property} />
   </section>
  );
}
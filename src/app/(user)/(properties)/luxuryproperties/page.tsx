import { getProperties, PropertyType } from "@/api/api";
import Luxuryproperties from "../_components/luxuryproperties";

export default async function Page() {

    const property = await getProperties(PropertyType.Luxury);
  
  return (
   <section>
    <Luxuryproperties data={property} />
   </section>
  );
}
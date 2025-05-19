import { getProperties, PropertyType } from "@/api/api";
import AffordableProperties from "../_components/affordableproperties";

export default async function Page() {

  const property = await getProperties(PropertyType.Affordable);

  return (
   <section>
    <AffordableProperties affordableProperties={property} />
   </section>
  );
}
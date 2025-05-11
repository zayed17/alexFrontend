import { getAllMediaItems } from "@/api/api";
import ShortsPage from "../_components/shorts";

export default async function Page() {
  const shorts = await getAllMediaItems("shorts");
  return (
    <section>
      <ShortsPage shorts={shorts} />
    </section>
  );
}

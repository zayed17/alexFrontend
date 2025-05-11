import { MediaCenterForm } from "../_components/mediaCenterForm";
import { getAgents } from "@/api/api";

export default async function AddPropertyTypePage() {

  const agentData = await getAgents()

  return (
    <>
      <MediaCenterForm agentData={agentData} />
    </>
  );
}

import { notFound } from "next/navigation";
import { MediaCenterForm } from "../../_components/mediaCenterForm";
import { getAgents, getMediaById } from "@/api/api";

export default async function EditMediaCenterPage({ params }:any) {
  const { id } = params;
  
  // Fetch property type by ID
  const mediaData = await getMediaById(id);
  const agentData = await getAgents();
  
  if (!mediaData) {
    return notFound();
  }
  
  return (
    <>
      <MediaCenterForm mediaItem={mediaData} agentData={agentData} />
    </>
  );
}
import AgentForm from "../../_components/AgentForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAgentById } from "@/api/api";

export const metadata: Metadata = {
  title: "Edit Agent",
};

export default async function EditAgentPage({ params }:any) {
  const { id } = params;
  

  const agent = await getAgentById(id);
  
  if (!agent) {
    return notFound();
  }
  
  return (
    <>
      <AgentForm agent={agent} />
    </>
  );
}


import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAgentById } from "@/api/api";
import AgentForm from "./_components/AgentForm";

export const metadata: Metadata = {
  title: "Edit Agent",
};

export default async function EditAgentPage() {  

  const agent = await getAgentById("682618279b1916e002f96cf7");
  if (!agent) {
    return notFound();
  }
  
  return (
    <>
      <AgentForm agent={agent} />
    </>
  );
}
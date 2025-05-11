import AgentForm from "../_components/AgentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Agent",
};

export default async function AddAgentPage() {


  return (
    <>
      <AgentForm />
    </>
  );
}
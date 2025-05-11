import React from "react";
import AboutHeader from "./_components/aboutHero";
import BuildingExcellence from "./_components/BuildingExcellence";
import MeetTheTeam from "./_components/teamMember";
import VisionMissionSection from "./_components/visionSection";
import InfoCardsGrid from "./_components/InfoCardsGrid";
import { getAgents } from "@/api/api";

export const revalidate = 1;

async function page() {
  const agentData = await getAgents();

  console.log("agentData", agentData);

  return (
    <>
      <main className="pt-18">
        <AboutHeader />
        <BuildingExcellence />
        <MeetTheTeam agents={agentData} />
        <VisionMissionSection />
        <InfoCardsGrid />
      </main>
    </>
  );
}

export default page;

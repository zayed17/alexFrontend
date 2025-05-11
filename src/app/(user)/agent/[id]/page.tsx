import React from "react";
import DubaiInvestmentLanding from "../_components/DubaiInvestmentLanding";
import DubaiRealEstate from "../_components/DubaiRealEstate";
import SuccessfulCases from "../_components/SuccessfulCases";
import ReasonsToInvest from "../_components/InvestmentReasons";
import CommunitySlider from "../_components/CommunitySlider";
import VideosAndShots from "../_components/VideosAndShots";
import ContactExpert from "../_components/ContactExpert";
import { getAgentByIdForUser, getAgents } from "@/api/api";

export const revalidate = 1;


export async function generateStaticParams() {
  const agent = await getAgents();

  return agent.map((property: any) => ({
    id: property._id,
  }));
}


async function Page({ params }: any) {
  const { agent, agentVideos,properties } = await getAgentByIdForUser(params.id);

  const {
    roiPercentage,
    profileImage,
    role,
    yearlyPercentage,
    successfulCases,
    phone,
    name,
    _id,
    expertiseAreas,
  } = agent;
  return (
    <main className="pt-20">
      <DubaiInvestmentLanding
        name={name}
        role={role}
        yearlyPercentage={yearlyPercentage}
        profileImage={profileImage}
        roiPercentage={roiPercentage}
      />
      <DubaiRealEstate expertiseAreas={expertiseAreas} id={_id} />
      <SuccessfulCases successfulCases={successfulCases} />
      <ReasonsToInvest />
      <VideosAndShots agentVideos={agentVideos} />
      <CommunitySlider properties={properties} />
      <ContactExpert id={_id} />
    </main>
  );
}

export default Page;

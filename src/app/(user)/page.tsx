import CommunitySlider from "@/components/user/communitySlider";
import { getHomePageData } from "@/api/api";
import HeroSection from "../_components/heroSection";
import RealEstateSection from "../_components/RealEstateSection";
import PropertySlider from "../_components/successfullCases";
import AboutAget from "../_components/aboutAgent";
import SuccessfulCases from "../_components/successfullCases";
import DubaiPropertyStats from "../_components/statsSection";
import YoutubeVideoSlider from "../_components/youtubeSlider";
import PropertyGallerySlider from "../_components/homeSlider";
import ReasonsToInvest from "../_components/9reasons";
import DubaiLifestyle from "../_components/dubaiLifeStyle";
import HomeProperties from "../_components/homeProperties";

export default async function Page() {
  const {properties,agentProfiles} = await getHomePageData();
  console.log(agentProfiles,properties);

  return (
    <>
      <main>
        <div>
          <HeroSection agent={{agentName:agentProfiles.agentName,agentRole:agentProfiles.agentRole}} />
        </div>
        <AboutAget />
        <SuccessfulCases successfulCases={agentProfiles.successfulCases} />
        <DubaiPropertyStats />
        <YoutubeVideoSlider youtubeUrls={agentProfiles.youtubeUrls} />
        <PropertyGallerySlider sliderImages={agentProfiles.sliderImages} />
        <ReasonsToInvest />
        <DubaiLifestyle />
        <HomeProperties property={properties} />
      </main>
    </>
  );
}

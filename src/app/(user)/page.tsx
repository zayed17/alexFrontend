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
import AffordableProperties from "./(properties)/affordableproperties/page";
import HomeProperties from "../_components/homeProperties";

export default async function Page() {
  const homePageData = await getHomePageData();


  return (
    <>
      <main>
        <div >
          <HeroSection />
        </div>
        <AboutAget />
        <SuccessfulCases />
        <DubaiPropertyStats />
        <YoutubeVideoSlider />
        <PropertyGallerySlider />
        <ReasonsToInvest />
        <DubaiLifestyle />
        <HomeProperties />
      </main>
    </>
  );
}

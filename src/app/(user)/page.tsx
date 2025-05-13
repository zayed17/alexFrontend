import CommunitySlider from "@/components/user/communitySlider";
import { getHomePageData } from "@/api/api";
import HeroSection from "../_components/heroSection";
import RealEstateSection from "../_components/RealEstateSection";
import PropertySlider from "../_components/coral-beach-villas";
import AboutAget from "../_components/aboutAgent";

export default async function Page() {
  const homePageData = await getHomePageData();

  const communities = homePageData?.community || [];
  const properties = homePageData?.properties || [];

  return (
    <>
      <main>
        <div>
          <HeroSection />
        </div>
        <AboutAget />
        <PropertySlider properties={properties} />
        <CommunitySlider communities={communities} />
      </main>
    </>
  );
}

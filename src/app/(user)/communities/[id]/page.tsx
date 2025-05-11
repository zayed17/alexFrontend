import { getCommunityNames, getUserCommunityById } from "@/api/api";
import DubaiCreekHarbour from "./_components/DubaiCreekHarbour";
import AmenitiesSection from "./_components/amenitiesSection";
import WaterfrontSection from "./_components/waterfrontSection";
import PropertyGrid from "@/components/user/propertyGrid";
import DubaiMap from "./_components/dubaiMap";
import FAQAccordion from "@/components/user/FAQAccordion";
import MapViewer from "@/components/user/MapViewer";

export const revalidate = 1;

export async function generateStaticParams() {
  const communities = await getCommunityNames();

  return communities.map((community: any) => ({
    id: community._id,
  }));
}

async function CommunityDetails({ params }: any) {
  const { id } = params;
  const communityData = await getUserCommunityById(id);

  // Extract community and property data from the API response
  const community = communityData.community || {};
  const properties = communityData.property || [];

  // Extract FAQs from the community data
  const faqItems =
    community.faqs?.map((faq: any) => ({
      id: faq._id,
      question: faq.question || "FAQ Question",
      answer: faq.answer || "FAQ Answer",
    })) || [];

  // Extract location data for the map
  const location = community.location || {
    latitude: "25.2048",
    longitude: "55.2708",
    country: "United Arab Emirates",
  };

  const markers = [
    {
      lat: location?.latitude || 25.1412,
      lng: location?.longitude || 55.1852,
      title: "Dubai Location",
    },
  ];

  return (
    <>
      <main>
        <DubaiCreekHarbour
          title={community.title || "Dubai Creek Harbour"}
          description={community.description || ""}
          mainImage={community.mainImage || "/images/dubaiharbour/sec-1.png"}
        />
        <AmenitiesSection amenities={community.amenities || []} />
        <WaterfrontSection
          name={community.title || "The Future of Waterfront Living"}
          title={community.secondaryTitle || "The Future of Waterfront Living"}
          description={community.secondaryDescription || ""}
          images={
            community.secondaryImages || ["/images/dubaiharbour/sec-3.png"]
          }
        />
        <div className="containers !pt-10">
          <div className="">
            <h1 className="px-[4%] !pb-8 font-presto text-2xl font-extrabold md:text-3xl">
              Properties in {community.title || "Dubai Creek Harbour"}
            </h1>
          </div>
          <PropertyGrid
            properties={properties.map((prop: any) => ({
              _id: prop._id || prop.id,
              title: prop.title || "Property",
              price: prop.price || "AED 1,850,000",
              bedroomRange: prop.bedrooms || "1-2",
              image: prop.mainImage || "/images/dubaiharbour/card-1.png",
            }))}
          />
        </div>
        <div
          className={`containers relative h-[550px] w-full !py-15 md:h-[700px] lg:h-[700px]`}
        >
          <div>
            <MapViewer
              initialCenter={{
                lat: Number(location.latitude) || 25.2048,
                lng: Number(location.longitude) || 55.2708,
              }}
              zoom={10}
              markers={markers}
            />
          </div>
        </div>
        <div>
          <FAQAccordion
            title={"FAQs"}
            faqItems={
              faqItems.length > 0
                ? faqItems
                : [
                    {
                      id: 1,
                      question: "What types of properties are available?",
                      answer:
                        "We offer a wide range of properties, including residential apartments, villas, commercial spaces, and plots in prime locations.",
                    },
                  ]
            }
          />
        </div>
      </main>
    </>
  );
}

export default CommunityDetails;

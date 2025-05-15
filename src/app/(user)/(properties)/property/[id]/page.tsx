"use client";
import AmenitiesGrid from "./_components/aminitysGrid";
import PropertyLanding from "./_components/propertyHerow";
import PropertySection2 from "./_components/propetysSection-2";
import PropertyPayment from "./_components/propertyPayment";
import PropertyInfoRequest from "./_components/PropertyExpertContact";
import PropertySlider from "./_components/propertySlider";
import EnhancedFAQ from "./_components/faqSection";
import LocationSection from "./_components/location";
import ProjectMaterials from "./_components/ProjectMaterials";
import DevelopmentSection from "./_components/development-section";

// Sample data for PropertyLanding
const propertyData = {
  title: "Freehold Apartments",
  location: "in Jumeirah Garden City",
  mainImage: "/images/dubaiharbour/sec-1.png",
  price: "AED 1.85M",
  paymentPlan: "70/30",
  areaSize: "4,016 Sq. ft.",
  handover: "Q3 2028",
  paymentStructure: "70/30",
  downPayment: "20%",
  developer: "Nakheet Properties",
  bedrooms: "1-4",
  unit: "296",
  downloads: {
    brochure: "/downloads/brochure.pdf",
    floorPlan: "/downloads/floor-plan.pdf",
    masterPlan: "/downloads/master-plan.pdf",
  },
};

// Sample data for PropertySection2
const samplePropertyData = {
  mainImage: "/images/dubaiharbour/sec-1.png",
  title: "Refined collection of luxurious Properties",
  description:
    "DIFC Heights Tower is an upcoming residential project located in DIFC. The developer of the complex is DIFC Developments.",
};

const sampleAmenities = [
  {
    _id: "1",
    title: "Kids Play Area",
    iconName: "ToyBrick", // Lucide icon for a playful/kids theme
  },
  {
    _id: "2",
    title: "Gymnasium",
    iconName: "Dumbbell", // Lucide icon for fitness
  },
  {
    _id: "3",
    title: "Swimming Pools",
    iconName: "Swimming", // Lucide icon for swimming
  },
  {
    _id: "4",
    title: "Co-working Space",
    iconName: "Briefcase", // Lucide icon for work/business
  },
  {
    _id: "5",
    title: "Beach Access",
    iconName: "Sunset", // Lucide icon for beach/relaxation
  },
  {
    _id: "6",
    title: "Spa & Wellness",
    iconName: "Heart", // Lucide icon for wellness
  },
];

const propertyInfoRequestData = {
  id: "PROP123",
  title: "Find Your Dream Property",
  description:
    "Submit your details, and our expert will help you find the perfect property tailored to your needs.",
  contactName: "Jane Smith",
  contactPosition: "Property Advisor",
  contactPhone: "+971 987 654 321",
  imageSrc: "/images/advisor-photo.jpg",
  agentId: "AGENT456",
};

const sliderData = [
  "/images/dubaiharbour/sec-1.png",
  "/images/dubaiharbour/sec-1.png",
  "/images/dubaiharbour/sec-1.png",
];

const locationData = [
  {
    _id: "1",
    image: "/placeholder.svg?height=300&width=400",
    time: "22 Minutes",
    title: "Downtown Dubai",
  },
  {
    _id: "2",
    image: "/placeholder.svg?height=300&width=400",
    time: "22 Minutes",
    title: "DXB Airport",
  },
  {
    _id: "3",
    image: "/placeholder.svg?height=300&width=400",
    time: "22 Minutes",
    title: "DWC Airport",
  },
  {
    _id: "4",
    image: "/placeholder.svg?height=300&width=400",
    time: "22 Minutes",
    title: "Dubai Marina",
  },
];

// Dummy location description
const locationDescription = `Located in the heart of Dubai, this development offers the perfect balance of convenience, accessibility, and luxury living. This vibrant complex is situated in a prime area, close to major landmarks, amenities, and transportation hubs.\n\nAl Muteena Street is nestled in a thriving community, with easy access to major city attractions and essential services. The neighborhood features high-end residential options, from spacious apartments to luxurious villas. Residents and visitors can enjoy a variety of amenities, including shopping centers, restaurants, cafes, parks, and recreational facilities.`;

// Map image URL
const mapImageUrl = "/placeholder.svg?height=600&width=1200";

const projectMaterials = [
  {
    id: "1",
    title: "Download Brochure",
    image: "/images/dubaiharbour/sec-1.png",
    downloadUrl: "/brochure.pdf",
  },
  {
    id: "2",
    title: "Download Price List",
    image: "/images/dubaiharbour/sec-1.png",
    downloadUrl: "/price-list.pdf",
  },
  {
    id: "3",
    title: "Download Payment Plan",
    image: "/images/dubaiharbour/sec-1.png",
    downloadUrl: "/payment-plan.pdf",
  },
];

const developmentTitle = "DIFC Developments";
const developmentDescription =
  "Dubai International Financial Centre (DIFC), the leading global financial centre in the Middle East, Africa, and South Asia (MEASA) region, today announced that sales of residential spaces in Heights Tower, a new mixed-use live-work-play destination reimagining urban luxury living, will commence from 16 April 2025.";
const secondDescription =
  "Heights Tower, a project by DIFC Developments occupies the final plot within the original DIFC district. It will provide an exclusive address within the Centre's ever-growing international community.";
const valueStatement =
  "Rooted in our mission and vision, our values of define our actions, sh Resilience, Ownership, Customer satisfaction, Innovation, and Sustainability ape our identity, and guide us on our journey to seek the extraordinary.";
const developmentImages = ["/images/dubaiharbour/sec-1.png", "/images/dubaiharbour/sec-1.png"];

export default function Page() {
  return (
    <div className="pt-18">
      <PropertyLanding propertyData={propertyData} />
      <PropertySection2 propertyData={samplePropertyData} />
      <AmenitiesGrid amenitiesData={sampleAmenities} />
      <PropertyPayment />

      <div className="w-full bg-gray-50 py-12 md:py-16">
        <div className="containers mx-auto">
          <PropertyInfoRequest
            id={propertyInfoRequestData.id}
            title={propertyInfoRequestData.title}
            description={propertyInfoRequestData.description}
            contactName={propertyInfoRequestData.contactName}
            contactPosition={propertyInfoRequestData.contactPosition}
            contactPhone={propertyInfoRequestData.contactPhone}
            imageSrc={propertyInfoRequestData.imageSrc}
            agentId={propertyInfoRequestData.agentId}
          />
        </div>
      </div>
      <PropertySlider  />
      <LocationSection
        location={locationData}
        locationDescription={locationDescription}
        mapImageUrl={mapImageUrl}
      />
      <ProjectMaterials materials={projectMaterials} />

      <div className="containers w-full py-12 md:py-16">
        <div className="mx-auto rounded-3xl bg-gray-50 p-12">
          <PropertyInfoRequest
            id={propertyInfoRequestData.id}
            title={propertyInfoRequestData.title}
            description={propertyInfoRequestData.description}
            contactName={propertyInfoRequestData.contactName}
            contactPosition={propertyInfoRequestData.contactPosition}
            contactPhone={propertyInfoRequestData.contactPhone}
            imageSrc={propertyInfoRequestData.imageSrc}
            agentId={propertyInfoRequestData.agentId}
          />
        </div>
      </div>

      <div>
        <DevelopmentSection
          title={developmentTitle}
          description={developmentDescription}
          secondDescription={secondDescription}
          valueStatement={valueStatement}
          images={developmentImages}
        />
      </div>

      <EnhancedFAQ />
    </div>
  );
}

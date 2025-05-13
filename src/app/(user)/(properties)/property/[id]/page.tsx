"use client";
import AmenitiesGrid from "./_components/aminitysGrid";
import PropertyLanding from "./_components/propertyHerow";
import PropertySection2 from "./_components/propetysSection-2";
import PropertyPayment from "./_components/propertyPayment";
import PropertyInfoRequest from "./_components/PropertyExpertContact";
import PropertySlider from "./_components/propertySlider";
import EnhancedFAQ from "./_components/faqSection";

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
  "/images/dubaiharbour/sec-1.png",];

export default function Page() {
  return (
    <div className="pt-18">
      <PropertyLanding propertyData={propertyData} />
      <PropertySection2 propertyData={samplePropertyData} />
      <AmenitiesGrid amenitiesData={sampleAmenities} />
      <PropertyPayment />
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
      <PropertySlider slides={sliderData} />
      <EnhancedFAQ/>
    </div>
  );
}

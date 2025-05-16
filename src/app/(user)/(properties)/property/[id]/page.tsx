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
import { getPropertyById, getPropertyTypeById } from "@/api/api";
import { agentImage } from "@/constants/images";

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


export default async function Page({ params }: any) {
  const { id } = params;

  const property = await getPropertyById(id);

  const samplePropertyData = {
    mainImage: property.secondaryImage,
    title: property.title,
    description: property.description,
    features: property.features,
  };

  const projectMaterials = [
    {
      id: "1",
      title: "Download Brochure",
      image: property.brochure.image,
      downloadUrl: property.brochure.url,
    },
    {
      id: "2",
      title: "Download Price List",
      image: property.priceList.image,
      downloadUrl: property.priceList.url,
    },
    {
      id: "3",
      title: "Download Payment Plan",
      image: property.payment.image,
      downloadUrl: property.payment.image,
    },
  ];

  const sliderData = property.sliderImages;

  const propertyInfoRequestData = {
    id: property._id,
    title: "Find Your Dream Property",
    description:
      "Submit your details, and our expert will help you find the perfect property tailored to your needs.",
    contactName: "Hakeem Ajmal Khan",
    contactPosition: "Senior Sales Advisor of Hotspot Properties",
    contactPhone: "+971 987 654 321",
    imageSrc: agentImage,
    agentId: "+971544337766",
  };

  const locationData = property.locationHighlights;

  const locationDescription = property.locationDescription;

  const propertyData = {
    title: property.title,
    location: "in Jumeirah Garden City",
    mainImage: property.mainImage,
    price: property.price,
    paymentPlan: property.paymentPlan,
    areaSize: property.area,
    handover: property.handover,
    paymentStructure: property.paymentStructure,
    downPayment: property.downPayment,
    developer: property.developer,
    bedrooms: property.bedrooms,
    unit: property.unit,
    downloads: {
      brochure: "/downloads/brochure.pdf",
      floorPlan: "/downloads/floor-plan.pdf",
      masterPlan: "/downloads/master-plan.pdf",
    },
  };

  const developmentTitle = "DIFC Developments";
  const developmentDescription = property.development.title1;
  const secondDescription = property.development.title2;
  const valueStatement = property.development.title3;
  const developmentImages = [
    property.development.image1,
    property.development.image2,
  ];

  const paymentDetails = {
    mainImage: property.mainImage,

    description:
      "Get free advice from our financial experts to maximize your profits and minimize risks. Take the first step toward owning your dream home in one of Dubai's most sought-after destinations.",
    bookingPercentage: property.bookingPercentage,
    constructionPercentage: property.constructionPercentage,
    handoverPercentage: property.handOverPercentage,
    paymentPlan: property.paymentPlan,
  };

  return (
    <div className="pt-18">
      <PropertyLanding propertyData={propertyData} />
      <PropertySection2 propertyData={samplePropertyData} />
      <AmenitiesGrid amenitiesData={property?.amenities} />
      <PropertyPayment paymentDetails={paymentDetails} />

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
        longitude={property.location.longitude}
        latitude={property.location.latitude}
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

      <EnhancedFAQ faqs={property.faqs} />
    </div>
  );
}

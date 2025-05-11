
import React from "react";
import RealEstateLanding from "../_components/real-estate-landing";
import UltraLuxuryVillas from "../_components/UltraLuxuryVillas";
import AmenitiesGrid from "../_components/AmenitiesGrid";
import PropertyInfoRequest from "@/components/user/propertyInfoRequest";
import LocationSection from "../_components/LocationSection";
import MapViewer from "@/components/user/MapViewer";
import PaymentPlan from "../_components/paymentPlan";
import PropertyShowcase from "../_components/PropertyShowcase";
import AboutElemental from "../_components/AboutElemental";
import PropertyExpertContact from "../_components/PropertyExpertContact";
import FAQAccordion from "@/components/user/FAQAccordion";
import CommunitySlider from "../_components/CommunitySlider";
import { getProperty, getPropertyById } from "@/api/api";
import { notFound } from "next/navigation";
import PropertyFloor from "@/components/user/PropertyFloor";
import { getYoutubeThumbnail } from "@/lib/utils";
import CommunitySliderBottom from "@/components/user/communitySlider";

export const revalidate = 1;


export async function generateStaticParams() {
  const properties = await getProperty();

  return properties.map((property: any) => ({
    id: property._id,
  }));
}


export default async function Page({ params }: any) {
  const property = await getPropertyById(params.id);

  if (!property) {
    return notFound();
  }

  const {
    sliderImages,
    secondaryImage,
    mainBrochure,
    description,
    faqs,
    locationHighlights,
    locationDescription,
    youtubeVideo,
    about,
    floorPlans,
    amenities,
  } = property;


  const Data = {
    title:
      "Get Project materials and info on Available Units from the Property Manager",
    description:
      "Fill in the form below to get the latest updates and materials.",
    id: property?.agentId?._id,
    contactName: property?.agentId?.name,
    contactPosition: property?.agentId?.role,
    contactPhone: property?.agentId?.phone,
    imageSrc: property?.agentId?.profileImage,
  };

  const markers = [
    {
      lat: property?.location?.latitude || 25.1412,
      lng: property?.location?.longitude || 55.1852,
      title: "Dubai Location",
    },
  ];

  const paymentPlanSteps = [
    { title: property.downPayment, subtitle: "Down Payment " },
    { title: property.installments, subtitle: " Installments" },
    { title: property.completion, subtitle: "Completion" },
  ];
  property?.agentId?.name;

  const aboutElementalData = {
    heading: "About Elemental",
    imageSrc: getYoutubeThumbnail(property.youtubeVideo),
  };

  const propertyExpertData = {
    heading: "LOOK FOR THE RIGHT PROPERTY?",
    subheading: "Our Expert will help you to buy the Best Property in Dubai",
    expert: {
      id: property?.agentId?._id,
      name: property?.agentId?.name,
      title: property?.agentId?.role,
      phone: property?.agentId?.phone,
      email: property?.agentId?.email,
      photo: property?.agentId?.profileImage,
    },
    callToAction: "REQUEST A FREE CALL BACK",
  };

  return (
    <>
      <main className="pt-18">
        <RealEstateLanding propertyData={property} />
        <UltraLuxuryVillas
          data={{ secondaryImage, mainBrochure, description,propertyTitle:property?.title,propertyType:property?.propertyType?.title }}
        />
        <CommunitySlider slides={sliderImages.slice(0, 4)} />
        <AmenitiesGrid amenitiesData={amenities} />
        <PropertyInfoRequest {...Data} />
        <LocationSection
          location={locationHighlights}
          locationDescription={locationDescription}
        />
        <MapViewer
          initialCenter={{
            lat: property?.location?.latitude,
            lng: property?.location?.longitude,
          }}
          zoom={10}
          markers={markers}
        />
        <div className="containers">
          <h1 className="!pb-8 text-center font-presto text-2xl font-extrabold md:text-3xl">
            Floor Plans of Elemental 22
          </h1>
          <PropertyFloor floor={floorPlans} />
        </div>
        <PropertyShowcase
          images1={sliderImages}
          images2={sliderImages}
          title="Our Properties"
          subtitle="Modern Living Spaces"
          autoPlay={true}
        />

        <PaymentPlan
          heading={`Attractive ${property.paymentPlan} Payment Plan`}
          subheading="Financial Information"
          steps={paymentPlanSteps}
        />

        <AboutElemental
          youtubeVideo={youtubeVideo}
          data={aboutElementalData}
          about={about}
        />
        <PropertyExpertContact data={propertyExpertData} />
        <div>
          <FAQAccordion title="FAQs" faqItems={faqs} />;
        </div>
        <CommunitySliderBottom communities={[]} />
     
      </main>
    </>
  );
}

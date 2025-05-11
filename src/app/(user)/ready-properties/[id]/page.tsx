import React from "react";
import AmenitiesGrid from "./_components/AmenitiesGrid";
import PropertyInfoRequest from "@/components/user/propertyInfoRequest";
import LocationSection from "./_components/LocationSection";
import MapViewer from "@/components/user/MapViewer";
import FAQAccordion from "@/components/user/FAQAccordion";
import CommunitySlider from "./_components/CommunitySlider";
import CommunitySliders from "@/components/user/communitySlider";
import PropertyListing from "./_components/property-listing";
import SliderSection from "./_components/sliderSection";
import { getReadyProperty, getReadyPropertyById } from "@/api/api";

export const revalidate = 1;


export async function generateStaticParams() {
  const properties = await getReadyProperty();

  return properties.map((property: any) => ({
    id: property._id,
  }));
}


export default async function Page({ params }: any) {
  const property = await getReadyPropertyById(params.id)
  const {
    _id,
    amenities,
    faqs,
    locationHighlights,
    locationDescription,
    about,
    sliderImages,
    downloads,
    floorPlans,
    location: { country, latitude, longitude }
  } = property;

  
  const propertyExpertData = {
    title:
    "Get Project materials and info on Available Units from the Property Manager",
  description:
    "Fill in the form below to get the latest updates and materials.",
  contactName: property?.agentId?.name,
  contactPosition:property?.agentId?.role,
  contactPhone: property?.agentId?.phone,
  imageSrc:  property?.agentId?.profileImage,
  id: _id,
  agentId: property?.agentId?._id,
  };

const markers = [{ lat: Number(latitude), lng:  Number(longitude), title:country }];

  return (
    <>
      <main className="pt-18">
        <CommunitySlider sliderImages={sliderImages} downloads={downloads} />
        <PropertyListing property={property} />
        <SliderSection sliderImages={sliderImages}/>
        <AmenitiesGrid amenities={amenities} />
        <LocationSection locationDescription={locationDescription} locationHighlights={locationHighlights}/>
        <MapViewer
          initialCenter={{ lat: Number(latitude), lng: Number(longitude) }}
          zoom={10}
          markers={markers}
        />
        <div>
          <FAQAccordion title="FAQs" faqItems={faqs} />
        </div>
        <PropertyInfoRequest {...propertyExpertData} />
        <CommunitySliders />

      
      </main>
    </>
  );
}

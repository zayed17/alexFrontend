import React from "react";
import LuxuryProperties from "../_components/luxuryProperty";
import FAQAccordion from "@/components/user/FAQAccordion";
import RealEstateUI from "../_components/realEstate";
import { getReadyProperty } from "@/api/api";

export const revalidate = 1;

async function page() {
  const properties = await getReadyProperty();

  const realEstateFAQs = [
    {
      id: 1,
      question: "What types of properties are available?",
      answer:
        "We offer a wide range of properties, including residential apartments, villas, commercial spaces, and plots in prime locations.",
    },
    {
      id: 2,
      question: "How can I apply for a home loan?",
      answer:
        "You can apply for a home loan by visiting your preferred bank or financial institution. We also have partnered banks that offer competitive rates.",
    },
    {
      id: 3,
      question: "What documents are needed to buy a property?",
      answer:
        "You will need ID proof, address proof, income proof, and a sale agreement. Our legal team will assist you in verifying all necessary documents.",
    },
    {
      id: 4,
      question: "Do you offer site visits?",
      answer:
        "Yes, we provide guided site visits so you can explore properties before making a decision. Contact our sales team to schedule a visit.",
    },
    {
      id: 5,
      question: "What are the additional costs apart from the property price?",
      answer:
        "Additional costs may include registration fees, stamp duty, legal fees, and maintenance charges, depending on the property location and type.",
    },
    {
      id: 6,
      question: "Can I buy property as an investment?",
      answer:
        "Absolutely! Real estate is a great investment option with high returns. Our experts can guide you on the best investment properties.",
    },
  ];

  return (
    <>
      <main className="pt-18">
        <LuxuryProperties
          imageSrc="/images/dubaiharbour/sec-1.png"
          imageAlt="Dubai Creek Harbour panoramic view with a resident enjoying the sunset from a luxury apartment balcony"
        />
        <div>
          <RealEstateUI properties={properties} type={"readyProperty"} />
        </div>
        <div>
          <FAQAccordion title="FAQs" faqItems={realEstateFAQs as any} />;
        </div>

      </main>
    </>
  );
}

export default page;

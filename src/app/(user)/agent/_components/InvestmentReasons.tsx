// components/ReasonsToInvest.js
import React from "react";

const reasons = [
  {
    number: "01",
    title: "Profit of up to 15% annually – higher than in Europe and the USA",
    description:
      "Dubai is one of the few markets where you can achieve up to 15% ROI due to high demand, price growth during construction, and profitable rental opportunities.",
  },
  {
    number: "02",
    title: "Access to Exclusive Deals Others Don’t Know About",
    description:
      "I secure the best properties directly from developers and investors: resale opportunities, off-market deals, and apartments with the highest growth potential.",
  },
  {
    number: "03",
    title: "Only Facts, Only Numbers – Honest Market Analysis",
    description:
      "I don’t sell “what’s profitable for the broker” – I analyze price growth, development plans, and developer reputations to ensure you make a smart and profitable investment.",
  },
  {
    number: "04",
    title: "Full Support – From Purchase to Profit",
    description: [
      "I review contracts and protect you from hidden terms",
      "I assist with payments and document processing",
      "I ensure quality control upon project handover",
      "I manage rental or resale for maximum returns",
    ],
  },
  {
    number: "05",
    title: "80% of Investors Come Back by Referral",
    description:
      "More than 80% of my clients are referred by investors who are already profiting from my strategies. That means that my client made profitable deals.",
  },
  {
    number: "06",
    title: "I Handle the Entire Deal Without Your Presence in the UAE",
    description:
      "I assist with opening a bank account, managing payments, and handling all documentation – making the process seamless, even if you’re not in Dubai.",
  },
  {
    number: "07",
    title: "I Tailor the Strategy to Your Capital and Goals",
    description: [
      "Off-plan properties – price growth of up to 50% before completion",
      "Ready properties – instant rental income and passive earnings",
      "Resale deals – discounted purchases with high margins",
    ],
  },
  {
    number: "08",
    title: "I’m Not a Broker – I’m an Investor Myself",
    description:
      "I personally invest in Dubai real estate, hold a UAE Golden Visa, and know which properties truly bring the highest returns.",
  },
  {
    number: "09",
    title: "Find Out How Much You’ll Earn – Calculation in 5 Minutes",
    description:
      "Want to see the numbers? Request a personalized calculation and get a strategy with exact profitability metrics.",
  },
];

const ReasonsToInvest = () => {
  return (
    <div className="mx-auto containers px-4 !py-12">
      {/* Title */}
      <h2 className="mb-8  text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 font-presto">
        9 Reasons to Invest in Dubai With Me
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col">
            {/* Number */}
            <span className="mb-3 font-presto text-4xl md:text-5xl lg:text-5xl font-bold text-gray-300 border-b ">
              <h2 className="font-bold text-gray-300 font-presto mb-4 ">{reason.number}</h2>
            </span>
            {/* Title */}
            <h3 className="mb-2  text-sm md:text-lg lg:text-lg font-semibold text-gray-800 font-presto">
              {reason.title}
            </h3>
            {/* Description */}
            {Array.isArray(reason.description) ? (
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {reason.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className=" text-gray-600 text-xs md:text-sm lg:text-sm">{reason.description}</p>
                  
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToInvest;

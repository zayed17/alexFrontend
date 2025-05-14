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
      "I secure the best properties directly from developers and investors – resale opportunities, off-market deals, and apartments with the highest growth potential.",
  },
  {
    number: "03",
    title: "Only Facts, Only Numbers – Honest Market Analysis",
    description:
      "I don’t sell “what’s profitable for the broker.” I analyze price growth, development plans, and developer reputations to ensure you make a smart and profitable investment.",
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
    title: "80% of Investors Come by Referral",
    description:
      "More than 80% of my clients are referred by investors who are already profiting from my strategies. That means that my client made profitable deals.",
  },
  {
    number: "06",
    title: "I Handle the Entire Deal Without Your Presence in the UAE",
    description:
      "I assist with opening a bank account, managing payments, and handling all documentation – making the process seamless, even if you’re not in Dubai.",
  },
];


const ReasonsToInvest = () => {
  return (
    <div className="containers mx-auto !py-12 px-4">
      {/* Title */}
      <div className="mb-8 flex justify-between border-b border-[#DDDDDD] items-center ">
        <p className="mb-10   font-presto text-2xl font-bold text-[#071C35] md:text-3xl lg:text-[40px]">
          6 Reasons to Invest in Dubai With Me
        </p>
        <button className="rounded-full mb-10 bg-[#071C35] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0a3060]">
          SUBMIT A REQUEST
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col">
            {/* Number */}
            <span className="mb-3 font-presto text-4xl font-bold text-gray-300 md:text-5xl lg:text-5xl">
              <h2 className="mb-4 font-presto font-bold text-[#877455]">
                {reason.number}
              </h2>
            </span>
            {/* Title */}
            <h3 className="mb-2 font-presto text-sm font-semibold text-gray-800 md:text-lg lg:text-lg">
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
              <p className="text-xs text-gray-600 md:text-sm lg:text-sm">
                {reason.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToInvest;

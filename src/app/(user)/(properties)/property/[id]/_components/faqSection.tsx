"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  ChevronDown, ChevronUp } from "lucide-react";

// FAQ Item Type
type FAQItemType = {
  question: string;
  answer: string;
};

// Default FAQ Items
const defaultFAQs: FAQItemType[] = [
  {
    question: "What taxes do I have to pay?",
    answer:
      "When you purchase a property, you pay a one-time fee of 4% of its price to the Dubai Land Department (DLD). You do not pay any taxes on profits when you decide to sell the property. The entire return on the property's appreciation is yours!",
  },
  {
    question: "How can I pay for the property?",
    answer:
      "Several payment options are available for purchasing a property in DG Villas project. You can pay in cash, use cryptocurrencies, credit cards, or make a bank transfer. In Dubai, there is no limit on the amount of cash, and there is no need to declare the source of the funds. Important: the payment goes directly to the construction company and not through the real estate agent!",
  },
  {
    question:
      "If I invest in the project, will I be the owner of the property?",
    answer:
      "Yes, definitely. When you purchase the property, you become the owner of the property and the land forever until you decide to sell it. In 2006, the government approved full ownership for all foreigners in 33 free trade zones in Dubai. After completing the registration of the property at the Dubai Land Department (DLD), you will receive a deed of ownership of the property directly to your email address.",
  },
  {
    question: "Is there a service charge?",
    answer:
      "Yes, there is an annual service charge that covers maintenance of common areas, security, and building facilities. The service charge for this project is approximately AED 15-20 per sq.ft. per year, which is competitive for luxury developments in Dubai.",
  },
  {
    question: "Can I rent out my property?",
    answer:
      "Absolutely! Dubai has a thriving rental market with high returns. You can rent out your property either long-term or as a holiday home. We can recommend property management companies that will handle everything from finding tenants to maintenance.",
  },
];

export default function EnhancedFAQ({ faqs = defaultFAQs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="containers">
      <div className="mx-auto w-full !py-18">
        <div className="mb-12 text-start">
          <h2 className="mb-4 font-presto text-4xl font-light text-gray-700 dark:text-gray-200">
            Luxury Properties In Dubai - FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`overflow-hidden border-b border-gray-200 ${
                openIndex === index ? " hadow-md" : "bg-white"
              }`}
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                    openIndex === index ? "text-black" : "text-black"
                  }`}
                >
                  {openIndex === index ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="  !px-6 pb-2  text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

interface FAQItem {
  _id: number | string
  question: string
  answer: string
}

interface FAQAccordionProps {
  title?: string
  faqItems: FAQItem[]
}

export default function FAQAccordion({ title = "FAQs", faqItems }: FAQAccordionProps) {
  const [openItemId, setOpenItemId] = useState<number | string | null>(null)

  const toggleItem = (id: number | string) => {
    setOpenItemId(openItemId === id ? null : id)
  }

  return (
    <div className="w-full py-8 sm:py-12 md:py-16">
      <div className="containers mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-presto text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center sm:text-start">
          {title}
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item,index) => (
            <div key={index} className="w-full rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="bg-gray-100 w-full p-4 sm:p-5 md:p-6 flex justify-between items-center text-left text-gray-900 font-medium hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-xl"
                aria-expanded={openItemId === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-base sm:text-lg font-extrabold pr-4">{item.question}</span>
                <div className="rounded-full p-1 sm:p-2 flex-shrink-0 flex items-center justify-center bg-gray-200">
                  {openItemId === index ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  )}
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  openItemId === index
                    ? "max-h-96 opacity-100 p-4 sm:p-5 bg-gray-50 mt-1 sm:mt-2 rounded-xl shadow-sm"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


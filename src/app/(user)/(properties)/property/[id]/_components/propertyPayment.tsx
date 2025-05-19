"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"

function PropertyPayment({paymentDetails}:any) {
  // Dummy data for the payment details


  return (
    <div className="containers">
      <div className="mt-8 w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={paymentDetails.mainImage}
              alt="Luxury property view"
              fill
              className="object-cover opacity-40"
            />  
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-12 md:px-12 md:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">Attractive {paymentDetails.paymentPlan} Payment Plan</h2>
              <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-white/90 md:text-base">
                {paymentDetails.description}
              </p>

              {/* Payment Percentages */}
              <div className="mb-8 grid grid-cols-3 gap-4 text-center text-white">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold md:text-3xl">{paymentDetails.bookingPercentage}</p>
                  <p className="text-xs md:text-sm">On Booking</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold md:text-3xl">{paymentDetails.constructionPercentage}</p>
                  <p className="text-xs md:text-sm">On Construction</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold md:text-3xl">{paymentDetails.handoverPercentage}</p>
                  <p className="text-xs md:text-sm">On Handover</p>
                </div>
              </div>

              {/* CTA Button */}
              <Button className="rounded-full bg-[#9b8e6e] px-8 py-2 text-sm uppercase text-white hover:bg-[#8a7d5d] md:px-10 md:py-2.5 md:text-base">
                REQUEST INFORMATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPayment

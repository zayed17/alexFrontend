"use client";

import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .regex(/^[0-9+\s()-]+$/, {
      message: "Please enter a valid phone number",
    }),
  message: z.string().optional(),
});

// TypeScript type for form data
type FormData = z.infer<typeof formSchema>;

// TypeScript type for form errors
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function DubaiRealEstate({ expertiseAreas,id }: any) {

  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for this field as user types
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate the form data against the schema
      const validatedData = formSchema.parse(formData);


      e.preventDefault();
      axiosInstance
        .post("/client-request", {...formData,agentId:id})
        .then((response) => {
          console.log("Data submitted successfully:", response.data);
          toast.success("Your request has been sent successfully!");
        })
        .catch((error) => {
          console.error("There was an error submitting the form:", error);
          toast.error("Failed to send message. Please try again.");
        });
      try {

        setErrors({});
        setShowForm(false);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (apiError) {
        console.error("API error:", apiError);
        alert("Failed to submit form. Please try again later.");
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        validationError.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header banner with navy blue top border */}
      <div className="w-full bg-gray-100 px-4 py-12 text-center">
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-800 md:text-base">
          My clients earn up to 15% ROI on invested capital yearly from rentals,
          <br className="hidden md:block" />
          and up to 40% on invested capital yearly from property resales
        </p>
      </div>

      <div className="relative block md:hidden">
        <div className="relative h-[50vh] w-full overflow-hidden">
          <Image
            src="/images/dubaiharbour/card-2.png"
            alt="Dubai Luxury Property"
            className="object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="mb-1 font-presto text-2xl leading-tight text-white">
              Transforming Dreams into Addresses in Dubai
            </h1>
            <p className="mb-4 text-sm">
              Premium properties with up to 40% ROI on capital investment
            </p>
          </div>
        </div>

        {/* Mobile stats section */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-100 py-4">
          <div className="px-2 text-center">
            <div className="text-lg font-bold text-blue-950">120+</div>
            <div className="text-xs text-gray-700">Transactions</div>
          </div>
          <div className="px-2 text-center">
            <div className="text-lg font-bold text-blue-950">$85M+</div>
            <div className="text-xs text-gray-700">Assets Managed</div>
          </div>
          <div className="px-2 text-center">
            <div className="text-lg font-bold text-blue-950">9 yrs</div>
            <div className="text-xs text-gray-700">Experience</div>
          </div>
        </div>
      </div>

      {/* Main content section - Only visible on md and larger screens */}
      <div className="containers mx-auto hidden flex-col items-center gap-8 !py-12 px-4 md:flex lg:flex-row lg:gap-16">
        {/* Left column - Text content */}
        <div className="w-full space-y-5 lg:w-1/2">
          <p className="text-sm text-gray-700 md:text-base">
            My name is Alexey Andrienko, and I help investors secure the best
            deals in the UAE.
          </p>

          <h1 className="font-presto text-xl font-medium leading-tight text-blue-950 md:text-2xl">
            Transforming Dreams into Addresses -
            <br />
            Your Trusted Real Estate Partner in Dubai
          </h1>

          <p className="text-sm text-gray-700 md:text-base">
            {`I don't just sell real estate – I build an investment strategy
            tailored to you, ensuring your money works for maximum
            profitability.`}
          </p>

          <ul className="list-none space-y-1 pt-2 font-presto">
            {expertiseAreas?.map((value: any, index: number) => {
              return (
                <li
                  key={index}
                  className="flex items-start text-sm md:text-base"
                >
                  <span className="mr-2 text-gray-800">•</span>
                  <span>{value}</span>
                </li>
              );
            })}
          </ul>

          <p className="pt-3 font-presto text-sm text-gray-700 md:text-base">
            {`Submit a request for a personal consultation, and let's discuss
            which properties will bring you the best ROI.`}
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-2 bg-[#071C35] px-6 py-2 text-xs font-medium uppercase text-white transition-colors duration-300 md:text-sm"
          >
            SUBMIT A REQUEST
          </button>
        </div>

        {/* Right column - Image */}
        <div className="flex w-[614px] justify-end">
          <Image
            src="/images/dubaiharbour/card-2.png"
            alt="Dubai Luxury Property"
            className="!h-125"
            width={414}
            height={758}
          />
        </div>
      </div>

      {/* Mobile content section - Additional info for mobile */}
      <div className="px-4 py-8 md:hidden">
        <h2 className="mb-4 font-presto text-xl font-medium text-blue-950">
          Your Trusted Real Estate Partner
        </h2>

        <p className="mb-4 text-sm text-gray-700">
          My name is Alexey Andrienko, and I help investors secure the best
          deals in the UAE. I build an investment strategy tailored to you,
          ensuring your money works for maximum profitability.
        </p>

        <p className="mb-6 font-presto text-sm text-gray-700">
          {`Let's discuss which properties will bring you the best ROI.`}
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="w-fit bg-[#071C35] px-6 py-3 text-sm font-medium uppercase text-white transition-colors duration-300"
        >
          SUBMIT A REQUEST
        </button>
      </div>

      {/* Contact form modal with Zod validation */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-medium text-blue-950">
              Request a Consultation
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950`}
                  placeholder="Your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 w-full rounded-md border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950`}
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-950"
                  placeholder="Tell us about your investment goals"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#071C35] px-4 py-2 text-sm text-white transition-colors duration-300 disabled:bg-blue-950/70"
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

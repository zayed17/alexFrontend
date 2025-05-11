"use client";
import React, { useState } from "react";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface ContactExpertProps {
  data?: {
    email?: string;
    phone?: string;
    expertImage?: string;
  };
  id:string
}

const ContactExpert: React.FC<ContactExpertProps> = ({
  data = {
    email: "info@premiumproperties.com",
    phone: "+971 50 723 9887",
    expertImage: "/images/dubaiInvestment/img-4.png",
  },
  id
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Simple validation
    const newErrors: Record<string, string> = {};
    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (formData.phone.length < 6) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(newErrors).length === 0) {
      axiosInstance
        .post("/client-request", {...formData,agentId:id})
        .then((response) => {
          console.log("Data submitted successfully:", response.data);
          toast.success("Your request has been sent successfully!");
          setFormData({ name: "", phone: "" });
        })
        .catch((error) => {
          console.error("There was an error submitting the form:", error);
          toast.error("Failed to send message. Please try again.");
        });
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds
      setFormData({ name: "", phone: "" });
      setIsSuccess(false);
    } else {
      setErrors(newErrors);
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    // Simple validation before opening WhatsApp
    const newErrors: Record<string, string> = {};
    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (formData.phone.length < 6) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(newErrors).length === 0) {
      const phone = data.phone || "+971 50 723 9887";
      const message = `Hello, I'm ${formData.name} and I'm interested in buying property in Dubai. Please contact me at ${formData.phone}.`;
      const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative h-fit w-full">
      {/* Background container with image and gradient */}
      <div className="inset-0 overflow-hidden bg-gray-100">
        <div className="inset-0 right-1/2 z-0">
          <Image
            src={"/images/dubaiInvestment/img-3.png"}
            alt="Dubai Skyline"
            layout="fill"
            objectFit="cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 z-10 bg-white/80"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
            <div className="relative flex items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src={data.expertImage || "/images/dubaiInvestment/img-4.png"}
                  alt="Dubai Property Expert"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority
                />
              </div>
            </div>

            {/* Right section with form */}
            <div className="flex flex-col justify-center px-6 py-12">
              <div className="w-full max-w-md">
                <p className="mb-2 text-sm uppercase tracking-wide text-gray-600">
                  LOOK FOR THE RIGHT PROPERTY?
                </p>
                <h1 className="mb-8 font-serif text-2xl text-slate-800 md:text-4xl lg:text-4xl">
                  Our Expert will help you to buy the Best Property in Dubai
                </h1>

                <div className="my-6 flex flex-col justify-between space-y-4 md:flex-row lg:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-3 bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Email</span>
                      <span className="text-sm">{data.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-3 bg-white md:flex lg:flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Phone</span>
                      <span className="text-sm">{data.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`w-full border p-3 ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md bg-white focus:outline-none`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full border p-3 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md bg-white focus:outline-none`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#AAAAAA] px-4 py-3 text-white transition duration-200 hover:bg-gray-800 disabled:opacity-70"
                    >
                      {isSubmitting
                        ? "Sending..."
                        : isSuccess
                          ? "Sent!"
                          : "REQUEST INFORMATION"}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex flex-1 items-center justify-center gap-2 bg-green-500 px-4 py-3 text-white transition duration-200 hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WHATSAPP
                    </button>
                  </div>
                </form>

                {isSuccess && (
                  <div className="mt-4 rounded-md bg-green-100 p-3 text-green-700">
                    Thank you! Our expert will contact you shortly.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactExpert;

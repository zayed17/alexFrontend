"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "@/components/common/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

export const revalidate = 1

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Please select your country"),
  interest: z.string().min(1, "Please select your interest"),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      interest: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (form.formState.isValid) {
      axiosInstance
        .post("/contact", values)
        .then((response) => {
          console.log("Data submitted successfully:", response.data);
          toast.success("Your message has been sent successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("There was an error submitting the form:", error);
          toast.error("Failed to send message. Please try again.");
        });
    } else {
      toast.error("Please fill out the form correctly.");
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center pb-8 sm:pb-12 md:pb-17">
      {/* Background Image with Text on Top */}
      <div
        className="bg-fill relative flex h-[300px] w-full flex-col items-center justify-center bg-cover bg-no-repeat px-4 sm:h-[400px] sm:px-6 md:h-[500px]"
        style={{ backgroundImage: 'url("/images/contact/contact-bg.png")' }}
      >
        <div className="relative text-center font-presto sm:bottom-15 sm:right-30 sm:text-center md:right-0 md:text-left lg:right-30">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            {`Let's Get In Touch`}
          </h2>
          <p className="text-base text-white sm:text-lg">
            {`Reach out to us today and let's start building your dream together.
              Your satisfaction is our priority.`}
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative z-10 mx-4 -mt-12 grid w-full max-w-5xl grid-cols-1 bg-white shadow-lg sm:mx-6 sm:-mt-24 sm:shadow-xl md:mx-auto md:-mt-50 md:grid-cols-2 md:shadow-2xl">
        {/* Left Side Form */}
        <div className="border-b border-gray-200 p-6 sm:p-8 md:border-b-0 md:border-r md:p-18">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="rounded-none border-gray-300 focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        className="rounded-none border-gray-300 focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        type="tel"
                        {...field}
                        className="rounded-none border-gray-300 focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-300 focus:ring-0">
                          <SelectValue placeholder="Country of Residence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="cursor-pointer border-none bg-white">
                        <SelectItem value="uae">
                          United Arab Emirates
                        </SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-300 focus:ring-0">
                          <SelectValue placeholder="Your Interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="cursor-pointer border-none bg-white">
                        <SelectItem value="buy">Buy Property</SelectItem>
                        <SelectItem value="rent">Rent Property</SelectItem>
                        <SelectItem value="invest">Investment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button label="SUBMIT" className="w-full" />

              {/* Terms & Privacy Policy Links */}
              <div className="mt-3 text-center text-[10px] text-gray-600 sm:mt-4">
                {`By contacting us, you agree to the`}{" "}
                <Link href="/terms" className="font-extrabold underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-extrabold underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </form>
          </Form>
        </div>

        {/* Right Side Contact Info */}
        <div className="flex flex-col justify-center bg-white p-6 sm:p-8 md:p-18">
          <div>
            <h3 className="font-presto text-base font-medium sm:text-lg">
              {`You're in good company`}{" "}
            </h3>
            <p className="mb-3 text-[12px] text-gray-600 sm:text-[13px]">
              35,000 teams are using Grammarly to improve their communication.
            </p>
            <h3 className="font-presto text-base font-medium sm:text-lg">
              {`Looking for support?`}
            </h3>
            <p className="mb-1 text-[12px] text-gray-600 sm:text-[13px]">
              {`We're here to help! Get in touch if you have technical issues or
              sales questions.`}
            </p>
            <Link
              href="#"
              className="text-[11px] text-[#2E90FA] hover:underline sm:text-[12px]"
            >
              Contact Support
            </Link>
          </div>

          <div className="my-5 border border-gray-200 sm:my-7" />

          <div className="mt-2 sm:mt-3">
            <h4 className="font-presto text-sm font-medium">Email</h4>
            <p className="text-xs text-gray-600 sm:text-sm">
              info@properties.com
            </p>
            <h4 className="mt-2 font-presto text-sm font-medium">Phone</h4>
            <p className="text-xs text-gray-600 sm:text-sm">+971 50 123 4567</p>
          </div>
        </div>
      </div>
    </section>
  );
}

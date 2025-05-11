import { z } from "zod";

export const amenitySchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type AmenityFormData = z.infer<typeof amenitySchema>;



export const propertyTypeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type PropertyTypeFormValues = z.infer<typeof propertyTypeSchema>;


const locationSchema = z.object({
  country: z.string().min(1, "Please select a location"),
  latitude: z.number().optional(),
  longitude: z.number().optional()

});

export const communitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
  amenities: z.array(z.string()).optional(),
  secondaryTitle: z.string().min(1, "Secondary title is required"),
  secondaryDescription: z.string().min(1, "Secondary description is required"),
  location: locationSchema,
  mainImage: z.any().optional(), 
  secondaryImage: z.any().optional(), 
  faqs: z.array(
    z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ).optional(), 
});

export type CommunityFormData = z.infer<typeof communitySchema>;


export const careerSchema = z
  .object({
    role: z.string().min(1, "Role is required"),
    experienceFrom: z.number().min(0, "Experience from is required"),
    experienceTo: z.number().min(0, "Experience to is required"),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    requirements: z.array(z.string()).min(1, "At least one requirement is required"),
    qualifications: z.array(z.string()).min(1, "At least one qualification is required"),
  })
  .refine((data) => data.experienceFrom < data.experienceTo, {
    message: "Experience From must be less than Experience To",
    path: ["experienceFrom"],
  });

export type CareerFormData = z.infer<typeof careerSchema>;



export const socialMediaSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Please enter a valid URL"),
});

export type SocialMediaFormData = z.infer<typeof socialMediaSchema>;


export const jobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  resume: z.any(),
  message: z.string().optional(),
});

export type JobApplicationForm = z.infer<typeof jobApplicationSchema>;

export const MediaCenterFormSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
});

export type MediaCenterFormValues = z.infer<typeof MediaCenterFormSchema>;


const successfulCaseSchema = z.object({
  title: z.string().min(1, "Case title is required"),
  description: z.string().min(1, "Case description is required"),
  caseImages: z.union([z.string().min(1, "Case image is required"), z.instanceof(File)]),
});

export const agentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,}[-\s.]?[0-9]{3,}$/, "Invalid phone number format"),
  profileImage: z.union([z.string().min(1, "Agent image is required"), z.instanceof(File)]),
  roiPercentage: z.string().optional(),
  yearlyPercentage: z.string().optional(),
  expertiseAreas: z.array(z.string().min(1, "Expertise area cannot be empty")).optional(),
  successfulCases: z.array(successfulCaseSchema).optional(),
});

export type AgentFormData = z.infer<typeof agentSchema>;
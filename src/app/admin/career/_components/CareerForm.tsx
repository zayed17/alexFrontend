"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useRouter } from "next/navigation";
import { CareerFormData, careerSchema } from "@/validation/validationSchema";
import DynamicPointInput from "./DynamicPointInput";

const CareerForm = ({ career = null }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const router = useRouter();
  const isEditMode = !!career;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      role: career?.role || "",
      experienceFrom: career?.experienceFrom,
      experienceTo: career?.experienceTo,
      responsibilities: career?.responsibilities || [],
      requirements: career?.requirements || [],
      qualifications: career?.qualifications || [],
    },
  });

  useEffect(() => {
    setIsMounted(true);
    if (isEditMode && career) {
      setResponsibilities(career.responsibilities || []);
      setRequirements(career.requirements || []);
      setQualifications(career.qualifications || []);
    }
  }, [isEditMode, career]);

  const onSubmit = async (data: CareerFormData) => {
    setIsSubmitting(true);
    try {
      const formDataToSend = {
        ...data,
        experienceFrom: Number(data.experienceFrom),
        experienceTo: Number(data.experienceTo),
        responsibilities,
        requirements,
        qualifications,
      };

      if (isEditMode) {
        await axiosInstance.put(`/career/${career._id}`, formDataToSend);
        toast.success("Career updated successfully!");
      } else {
        await axiosInstance.post("/career", formDataToSend);
        toast.success("Career added successfully!");
      }
      router.push("/admin/career");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update career. Please try again."
          : "Failed to add career. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <ShowcaseSection>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Role"
              placeholder="Enter role"
              type="text"
              name="role"
              value={watch("role")}
              handleChange={() => {}}
              register={register}
              error={errors.role?.message}
            />
            <div className="grid grid-cols-2 gap-6">
              <InputGroup
                label="Experience From"
                placeholder="Enter experience from"
                type="number"
                name="experienceFrom"
                value={watch("experienceFrom")}
                handleChange={() => {}}
                register={register}
                error={errors.experienceFrom?.message}
              />
              <InputGroup
                label="Experience To"
                placeholder="Enter experience to"
                type="number"
                name="experienceTo"
                value={watch("experienceTo")}
                handleChange={() => {}}
                register={register}
                error={errors.experienceTo?.message}
              />
            </div>
          </div>

          <div>
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Responsibilities
            </label>
            <DynamicPointInput
              points={responsibilities}
              setPoints={setResponsibilities}
              error={errors.responsibilities?.message}
              setValue={setValue}
              fieldName="responsibilities" 
            />
          </div>

          <div>
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Requirements
            </label>
            <DynamicPointInput
              points={requirements}
              setPoints={setRequirements}
              error={errors.requirements?.message}
              setValue={setValue}
              fieldName="requirements" 
            />
          </div>

          <div>
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Qualifications
            </label>
            <DynamicPointInput
              points={qualifications}
              setPoints={setQualifications}
              error={errors.qualifications?.message}
              setValue={setValue}
              fieldName="qualifications" 
            />
          </div>

          <div className="mt-10 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/career")}
              className="w-1/2 py-6 text-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 py-6 text-lg text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Updating..." : "Submitting..."}
                </>
              ) : isEditMode ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </ShowcaseSection>
    </div>
  );
};

export default CareerForm;

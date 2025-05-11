"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PropertyTypeFormValues, propertyTypeSchema } from "@/validation/validationSchema";


export function PropertyTypeForm({ propertyType = null }:any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEditMode = !!propertyType;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PropertyTypeFormValues>({
    resolver: zodResolver(propertyTypeSchema),
    defaultValues: {
      title: propertyType?.title || "",
      description: propertyType?.description || "",
    },
  });


  useEffect(() => {
    if (propertyType) {
      reset({
        title: propertyType.title,
        description: propertyType.description,
      });
    }
  }, [propertyType, reset]);

  const onSubmit = async (data: PropertyTypeFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await axiosInstance.put(`/property-type/${propertyType._id}`, data);
        toast.success("Property type updated successfully!");
      } else {
        await axiosInstance.post("/property-type", data);
        toast.success("Property type added successfully!");
      }
      router.push("/admin/property-type");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(isEditMode ? "Failed to update property type." : "Failed to add property type.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ShowcaseSection className="!p-6.5">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Title"
          type="text"
          placeholder="Enter property type title"
          className="mb-4.5"
          name="title"
          value={watch("title")}
          error={errors.title?.message}
          register={register}
        />

        <InputGroup
          label="Description"
          type="text"
          placeholder="Enter property type description"
          className="mb-4.5"
          name="description"
          value={watch("description")}
          error={errors.description?.message}
          register={register}
        />
        
        <div className="flex gap-4 mt-10">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/property-type")}
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
            ) : (
              isEditMode ? "Update" : "Submit"
            )}
          </Button>
        </div>
      </form>
    </ShowcaseSection>
  );
}

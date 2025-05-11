"use client"

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
import { AmenityFormData, amenitySchema } from "@/validation/validationSchema";
import * as LucideIcons from "lucide-react";
import { ICON_OPTIONS } from "@/utils/iconsOptions";

type LucideIconNames = keyof typeof LucideIcons;

const AmenityForm = ({ amenity = null }: any) => {
  const [selectedIcon, setSelectedIcon] = useState(amenity?.iconName || "");
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEditMode = !!amenity;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AmenityFormData>({
    resolver: zodResolver(amenitySchema),
    defaultValues: {
      title: amenity?.title || "",
    },
  });

  useEffect(() => {
    if (!search.trim()) {
      setSelectedIcon("");
    }
  }, [search]);

  const filteredIcons = search.trim()
    ? ICON_OPTIONS.filter(
        ({ label, iconName }) =>
          (label.toLowerCase().includes(search.toLowerCase()) ||
            iconName.toLowerCase().includes(search.toLowerCase())) &&
          !!LucideIcons[iconName as LucideIconNames]
      )
    : ICON_OPTIONS.filter(({ iconName }) => !!LucideIcons[iconName as LucideIconNames]);

  const onSubmit = async (data: AmenityFormData) => {
    if (!selectedIcon) {
      toast.error("Please select an icon");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: data.title,
        iconName: selectedIcon,
      };

      if (isEditMode) {
        await axiosInstance.put(`/amenities/${amenity._id}`, payload);
        toast.success("Amenities updated successfully!");
      } else {
        await axiosInstance.post("/amenities", payload);
        toast.success("Amenities added successfully!");
      }

      router.push("/admin/amenity");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update amenity. Please try again."
          : "Failed to add amenity. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <ShowcaseSection>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputGroup
            label="Title"
            placeholder="Enter title"
            type="text"
            name="title"
            value={watch("title")}
            handleChange={() => {}}
            register={register}
            error={errors.title?.message}
          />

          <div className="space-y-2">
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Search and Select Icon *
            </label>

            <input
              type="text"
              placeholder="Search icon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border px-4 py-2 text-sm shadow-sm dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />

            {filteredIcons.length > 0 && (
              <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto pt-2">
                {filteredIcons.map(({ iconName, label }) => {
                  const Icon = LucideIcons[iconName as LucideIconNames] as React.ComponentType<any>; // Cast to React.ComponentType
                  return (
                    <div
                      key={iconName}
                      onClick={() => setSelectedIcon(iconName)}
                      className={`cursor-pointer rounded border p-4 text-center shadow-sm transition-all ${
                        selectedIcon === iconName
                          ? "border-blue-500 bg-blue-50 dark:bg-gray-700"
                          : "hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800"
                      }`}
                    >
                      <Icon
                        className={`mx-auto mb-1 h-6 w-6 ${
                          selectedIcon === iconName
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-10 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/amenity")}
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

export default AmenityForm;

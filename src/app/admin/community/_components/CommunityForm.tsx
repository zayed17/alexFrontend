"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { XCircle, Loader2, Plus } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useRouter } from "next/navigation";
import {
  CommunityFormData,
  communitySchema,
} from "@/validation/validationSchema";
import Image from "next/image";
import FAQInput from "./FAQInput";
import TextArea from "@/components/FormElements/InputGroup/text-area";
import LocationSelector from "./locationSelect";
import * as LucideIcons from "lucide-react";

const CommunityForm = ({ community = null, amenitiesData = [] }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);
  const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
  const [selectedSecondaryFiles, setSelectedSecondaryFiles] = useState<File[]>(
    [],
  );
  const [removedSecondaryImages, setRemovedSecondaryImages] = useState<
    string[]
  >([]);
  const [existingSecondaryImages, setExistingSecondaryImages] = useState<
    string[]
  >([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<
    { _id?: string; question: string; answer: string }[]
  >([]);
  const [removedFaqIds, setRemovedFaqIds] = useState<string[]>([]);

  const router = useRouter();
  const isEditMode = !!community;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    control,
  } = useForm<CommunityFormData>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      title: community?.title || "",
      heading: community?.heading || "",
      description: community?.description || "",
      amenities: community?.amenities || [],
      secondaryTitle: community?.secondaryTitle || "",
      secondaryDescription: community?.secondaryDescription || "",
      location: {
        country: community?.location?.country || "",
        latitude: community?.location?.latitude,
        longitude: community?.location?.longitude,
      },
      faqs: community?.faqs || [],
    },
  });

  useEffect(() => {
    setIsMounted(true);
    if (isEditMode && community?.mainImage) {
      setMainPreview(`${community?.mainImage}`);
    }

    if (
      isEditMode &&
      community?.secondaryImages &&
      Array.isArray(community.secondaryImages)
    ) {
      const previews = community.secondaryImages.map(
        (image: string) => `${image}`,
      );
      setSecondaryPreviews(previews);
    }

    if (
      isEditMode &&
      community?.amenities &&
      Array.isArray(community.amenities)
    ) {
      setExistingSecondaryImages(
        community.secondaryImages.map((image: any) =>
          typeof image === "string" ? image : image.filename || image,
        ),
      );

      const amenityIds = community.amenities.map((amenity: any) => {
        if (amenity && typeof amenity === "object" && amenity._id) {
          return String(amenity._id);
        }
        return String(amenity);
      });

      setSelectedAmenities(amenityIds);
      setValue("amenities", amenityIds);
    }
    if (isEditMode && community?.faqs) {
      setFaqs(community.faqs);
    }
  }, [isEditMode, community, setValue]);

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities((prev) => {
      const newSelection = prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId];

      setValue("amenities", newSelection);
      return newSelection;
    });
  };

  const handleSecondaryImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    let hasError = false;

    Array.from(files).forEach((file) => {
      if (file.size > 15 * 1024 * 1024) {
        setImageError("Image size should be less than 15MB");
        hasError = true;
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please upload valid images (JPEG, PNG, GIF, WEBP)");
        hasError = true;
        return;
      }

      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (!hasError) {
      setSelectedSecondaryFiles((prev) => [...prev, ...newFiles]);
      setSecondaryPreviews((prev) => [...prev, ...newPreviews]);
      setImageError(null);
    }
  };

  const onSubmit = async (data: CommunityFormData) => {
    if (selectedAmenities.length === 0) {
      toast.error("At least one Amenities should be selected");
      return;
    }
    if (isEditMode) {
      const hasMainImage = mainPreview !== null;
      const hasSecondaryImages = secondaryPreviews.length > 0;

      if (!hasMainImage || !hasSecondaryImages) {
        toast.error("Main image and at least one secondary image are required");
        return;
      }
    } else {
      // For new communities
      if (!selectedMainFile || selectedSecondaryFiles.length === 0) {
        toast.error("Main image and at least one secondary image are required");
        return;
      }
    }

    if (faqs.length === 0) {
      toast.error("At least one FAQ is required");
      return;
    }

    setIsSubmitting(true);
    setImageError(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
      formDataToSend.append("heading", data.heading);
      formDataToSend.append("description", data.description);
      formDataToSend.append("secondaryTitle", data.secondaryTitle);
      formDataToSend.append("secondaryDescription", data.secondaryDescription);
      formDataToSend.append("country", data.location.country);
      if (
        "latitude" in data.location &&
        typeof data.location.latitude === "number"
      ) {
        formDataToSend.append("latitude", data.location.latitude.toString());
      }
      if (
        "longitude" in data.location &&
        typeof data.location.longitude === "number"
      ) {
        formDataToSend.append("longitude", data.location.longitude.toString());
      }
      if (data.amenities) {
        data.amenities.forEach((amenityId) => {
          formDataToSend.append("amenities[]", amenityId);
        });
      }

      if (selectedMainFile) {
        formDataToSend.append("mainImage", selectedMainFile);
      }
      if (isEditMode) {
        existingSecondaryImages.forEach((filename) => {
          formDataToSend.append("existingSecondaryImages", filename);
        });

        removedSecondaryImages.forEach((filename) => {
          formDataToSend.append("removedSecondaryImages", filename);
        });
      }

      selectedSecondaryFiles.forEach((file) => {
        formDataToSend.append("secondaryImages", file);
      });

      faqs.forEach((faq, index) => {
        if (faq._id) {
          formDataToSend.append(`faqs[${index}][_id]`, faq._id);
        }
        formDataToSend.append(`faqs[${index}][question]`, faq.question);
        formDataToSend.append(`faqs[${index}][answer]`, faq.answer);
      });

      if (removedFaqIds.length > 0) {
        removedFaqIds.forEach((id) => {
          formDataToSend.append("removedFaqIds", id);
        });
      }

      if (isEditMode) {
        await axiosInstance.put(`/community/${community._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Community updated successfully!");
      } else {
        await axiosInstance.post("/community", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Community added successfully!");
      }
      router.push("/admin/community");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update community. Please try again."
          : "Failed to add community. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isMainImage: boolean,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setImageError("Image size should be less than 15MB");
        return;
      }
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please upload a valid image (JPEG, PNG, GIF, WEBP)");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      if (isMainImage) {
        setMainPreview(imageUrl);
        setSelectedMainFile(file);
      }
      setImageError(null);
    }
  };

  const removeImage = (isMainImage: boolean, index?: number) => {
    if (isMainImage) {
      setMainPreview(null);
      setSelectedMainFile(null);
    } else if (typeof index === "number") {
      if (index < existingSecondaryImages.length) {
        const imageToRemove = existingSecondaryImages[index];
        setRemovedSecondaryImages((prev) => [...prev, imageToRemove]);
      }

      setSecondaryPreviews((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });

      setSelectedSecondaryFiles((prev) => {
        const updated = [...prev];
        if (index >= existingSecondaryImages.length) {
          updated.splice(index - existingSecondaryImages.length, 1);
        }
        return updated;
      });

      if (index < existingSecondaryImages.length) {
        setExistingSecondaryImages((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
      }
    }
    setImageError(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      {/* Section 1: Basic Information */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <InputGroup
              label="Heading"
              placeholder="Enter heading"
              type="text"
              name="heading"
              value={watch("heading")}
              handleChange={() => {}}
              register={register}
              error={errors.heading?.message}
            />
          </div>
          <TextArea
            label="Description"
            placeholder="Enter description"
            type="text"
            name="description"
            value={watch("description")}
            handleChange={() => {}}
            register={register}
            error={errors.description?.message}
          />
        </ShowcaseSection>
        {/* Section 2: Amenities */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-gray-5">Amenities</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {amenitiesData.map((amenity: any) => {
              const Icon = LucideIcons[
                amenity.iconName as keyof typeof LucideIcons
              ] as React.ComponentType<any>;

              return (
                <div
                  key={amenity._id}
                  className="relative flex flex-col items-center justify-center rounded-lg border border-gray-500 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                >
                  {/* Checkbox top-right */}
                  <Checkbox
                    id={amenity._id}
                    className="absolute right-2 top-2"
                    checked={selectedAmenities.includes(amenity._id)}
                    onCheckedChange={() => handleAmenityChange(amenity._id)}
                  />

                  {/* Icon */}
                  <div className="mb-3">
                    {Icon ? (
                      <Icon
                        size={36}
                        className="text-gray-700 dark:text-gray-500"
                      />
                    ) : (
                      <span className="text-gray-500">❓</span>
                    )}
                  </div>

                  {/* Title */}
                  <label
                    htmlFor={amenity._id}
                    className="text-center text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    {amenity.title}
                  </label>
                </div>
              );
            })}
          </div>

          {/* Error message */}
          {errors.amenities && (
            <p className="mt-2 text-sm text-red-500">
              {errors.amenities.message}
            </p>
          )}
        </ShowcaseSection>

        {/* Section 3: Secondary Information and Images */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Secondary Information and Images
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <InputGroup
              label="Secondary Title"
              placeholder="Enter secondary title"
              type="text"
              name="secondaryTitle"
              value={watch("secondaryTitle")}
              handleChange={() => {}}
              register={register}
              error={errors.secondaryTitle?.message}
            />
            <TextArea
              label="Secondary Description"
              placeholder="Enter secondary description"
              type="text"
              name="secondaryDescription"
              value={watch("secondaryDescription")}
              handleChange={() => {}}
              register={register}
              error={errors.secondaryDescription?.message}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-body-sm font-medium text-dark dark:text-white">
                Upload Main Image{isEditMode ? "" : " *"}
                {!isEditMode && (
                  <span className="ml-1 select-none text-red">*</span>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, true)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {imageError && (
                <p className="mt-1 text-xs text-red-500">{imageError}</p>
              )}
              {mainPreview && (
                <div className="relative mt-4 h-40 w-40">
                  <Image
                    src={mainPreview}
                    alt="Main Preview"
                    fill
                    className="rounded-md object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(true)}
                    className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
                  >
                    <XCircle className="h-6 w-6 text-gray-800" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-body-sm font-medium text-dark dark:text-white">
                Upload Secondary Images{isEditMode ? "" : " *"}
                {!isEditMode && (
                  <span className="ml-1 select-none text-red">*</span>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSecondaryImagesChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {imageError && (
                <p className="mt-1 text-xs text-red-500">{imageError}</p>
              )}

              {/* Display multiple secondary image previews */}
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                {secondaryPreviews.map((preview, index) => (
                  <div key={index} className="relative h-40 w-40">
                    <Image
                      src={preview}
                      alt={`Secondary Preview ${index + 1}`}
                      fill
                      className="rounded-md object-cover shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(false, index)}
                      className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
                    >
                      <XCircle className="h-6 w-6 text-gray-800" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Section 4: Location Information */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Location Information
          </h2>
          <LocationSelector
            control={control}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            initialVal={community?.location || ""}
          />{" "}
        </ShowcaseSection>

        {/* Section 5: FAQs */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FAQInput
              onFAQChange={(updatedFaqs, removedIds) => {
                setFaqs(updatedFaqs);
                if (removedIds) {
                  setRemovedFaqIds(removedIds);
                }
              }}
              initialFaqs={community?.faqs || []}
            />
          </div>
        </ShowcaseSection>

        {/* Form Submission Buttons */}
        <div className="mt-10 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/community")}
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
    </div>
  );
};

export default CommunityForm;

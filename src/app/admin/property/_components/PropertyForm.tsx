"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputGroup from "@/components/FormElements/InputGroup";
import TextArea from "@/components/FormElements/InputGroup/text-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { XCircle, Loader2, Plus } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FAQInput from "./FAQInput";
import DynamicPointInput from "../../career/_components/DynamicPointInput";
import LocationSelector from "../../community/_components/locationSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as LucideIcons from "lucide-react";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
  paymentPlan: z.string().min(1, "Payment plan is required"),
  completion: z.string().min(1, "Completion date is required"),
  installments: z.string().min(1, "Installments information is required"),
  paymentStructure: z
    .string()
    .min(1, "payment Structure information is required"),
  downPayment: z.string().min(1, "Down payment information is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  handover: z.string().min(1, "Handover date is required"),
  areaSize: z.string().min(1, "Area size is required"),
  developer: z.string().min(1, "Developer information is required"),
  unit: z.string().min(1, "Unit information is required"),
  propertyType: z.string().min(1, "Property type is required"),
  agentId: z.string().min(1, "Please select an agent"),
  description: z.string().min(1, "Description is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  locationDescription: z.string().min(1, "Location description is required"),
  location: z.object({
    country: z.string().min(1, "Please select a location"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  youtubeVideo: z.string().min(1, "Youtube video url is required"),
  about: z.string().min(1, "About is required"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface LocationHighlight {
  _id?: string;
  title: string;
  time: string;
  image: string;
}

interface PropertyFormProps {
  property?: any;
  propertyTypes?: any[];
  amenitiesData?: any[];
  communityData?: any[];
  agentData?: any[];
}

const PropertyForm = ({
  property = null,
  propertyTypes = [],
  amenitiesData = [],
  communityData = [],
  agentData = [],
}: PropertyFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Image states
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);

  const [secondaryImagePreview, setSecondaryImagePreview] = useState<
    string | null
  >(null);
  const [selectedSecondaryImage, setSelectedSecondaryImage] =
    useState<File | null>(null);

  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [selectedSliderImages, setSelectedSliderImages] = useState<File[]>([]);
  const [existingSliderImages, setExistingSliderImages] = useState<string[]>(
    [],
  );
  const [removedSliderImages, setRemovedSliderImages] = useState<string[]>([]);

  // Downloads states
  const [selectedBrochure, setSelectedBrochure] = useState<File | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<File | null>(null);
  const [selectedMasterPlan, setSelectedMasterPlan] = useState<File | null>(
    null,
  );

  // Complex data states
  const [locationHighlights, setLocationHighlights] = useState<any>([]);
  const [floorPlans, setFloorPlans] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<
    { _id?: string; question: string; answer: string }[]
  >([]);
  const [removedFaqIds, setRemovedFaqIds] = useState<string[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");

  const router = useRouter();
  const isEditMode = !!property;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    control,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || "",
      price: property?.price || "",
      paymentPlan: property?.paymentPlan || "",
      completion: property?.completion || "",
      installments: property?.installments || "",
      downPayment: property?.downPayment || "",
      paymentStructure: property?.paymentStructure || "",
      bedrooms: property?.bedrooms || "",
      handover: property?.handover || "",
      areaSize: property?.areaSize || "",
      developer: property?.developer || "",
      unit: property?.unit || "",
      propertyType: property?.propertyType?._id || "",
      agentId:
        typeof property?.agentId === "object"
          ? property?.agentId?._id
          : property?.agentId || "",
      description: property?.description || "",
      amenities:
        property?.amenities?.map((amenity: any) =>
          typeof amenity === "object" ? amenity._id : amenity,
        ) || [],
      locationDescription: property?.locationDescription || "",
      location: {
        country: property?.location?.country || "",
        latitude: property?.location?.latitude,
        longitude: property?.location?.longitude,
      },
      youtubeVideo: property?.youtubeVideo || "",
      about: property?.about || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);

    if (isEditMode) {
      // Set image previews
      if (property?.mainImage) {
        setMainImagePreview(`${property.mainImage}`);
      }

      if (property?.secondaryImage) {
        setSecondaryImagePreview(`${property.secondaryImage}`);
      }

      // Set slider images
      if (property?.sliderImages && Array.isArray(property.sliderImages)) {
        const sliderImgPreviews = property.sliderImages.map((image: any) => {
          // Handle if image is an array or string
          if (Array.isArray(image)) {
            return image[0];
          }
          return `${image}`;
        });
        setSliderImages(sliderImgPreviews);
        setExistingSliderImages(property.sliderImages);
      }
      // Set amenities
      if (property?.amenities && Array.isArray(property.amenities)) {
        const amenityIds = property.amenities.map((amenity: any) => {
          if (amenity && typeof amenity === "object" && amenity._id) {
            return String(amenity._id);
          }
          return String(amenity);
        });

        setSelectedAmenities(amenityIds);
        setValue("amenities", amenityIds);
      }

      // Set property type
      if (property?.propertyType) {
        const propertyTypeId =
          typeof property.propertyType === "object"
            ? property.propertyType._id
            : property.propertyType;

        setSelectedPropertyType(propertyTypeId);
        setValue("propertyType", propertyTypeId);
      }
      if (property?.communityId) {
        const communityId =
          typeof property.communityId === "object"
            ? property.communityId._id
            : property.communityId;
        setSelectedCommunity(communityId);
      }

      // Set location highlights
      if (
        property?.locationHighlights &&
        Array.isArray(property.locationHighlights)
      ) {
        setLocationHighlights(property.locationHighlights);
      }

      // Set floor plans
      if (property?.floorPlans && Array.isArray(property.floorPlans)) {
        setFloorPlans(property.floorPlans);
      }

      // Set FAQs
      if (property?.faqs && Array.isArray(property.faqs)) {
        setFaqs(property.faqs);
      }
    }
  }, [isEditMode, property, setValue]);

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities((prev) => {
      const newSelection = prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId];

      setValue("amenities", newSelection);
      return newSelection;
    });
  };

  const handlePropertyTypeChange = (propertyTypeId: string) => {
    setSelectedPropertyType(propertyTypeId);
    setValue("propertyType", propertyTypeId);
  };
  const handleCommunityChange = (communityId: string) => {
    setSelectedCommunity(communityId);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "secondary" | "profile" | "slider",
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Common image validation
    const validateImage = (file: File): boolean => {
      if (file.size > 15 * 1024 * 1024) {
        setImageError("Image size should be less than 15MB");
        return false;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please upload a valid image (JPEG, PNG, GIF, WEBP)");
        return false;
      }

      setImageError(null);
      return true;
    };

    const file = files[0];
    if (!validateImage(file)) return;

    switch (type) {
      case "main":
        setMainImagePreview(URL.createObjectURL(file));
        setSelectedMainImage(file);
        break;
      case "secondary":
        setSecondaryImagePreview(URL.createObjectURL(file));
        setSelectedSecondaryImage(file);
        break;
      case "slider":
        const newFiles: File[] = [];
        const newPreviews: string[] = [];

        Array.from(files).forEach((file) => {
          if (validateImage(file)) {
            newFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
          }
        });

        setSelectedSliderImages((prev) => [...prev, ...newFiles]);
        setSliderImages((prev) => [...prev, ...newPreviews]);
        break;
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "brochure" | "floorPlan" | "masterPlan",
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size should be less than 15MB");
      return;
    }

    switch (type) {
      case "brochure":
        setSelectedBrochure(file);
        break;
      case "floorPlan":
        setSelectedFloorPlan(file);
        break;
      case "masterPlan":
        setSelectedMasterPlan(file);
        break;
    }
  };

  const removeImage = (
    type: "main" | "secondary" | "profile" | "slider",
    index?: number,
  ) => {
    switch (type) {
      case "main":
        setMainImagePreview(null);
        setSelectedMainImage(null);
        break;
      case "secondary":
        setSecondaryImagePreview(null);
        setSelectedSecondaryImage(null);
        break;
      case "slider":
        if (typeof index === "number") {
          if (index < existingSliderImages.length) {
            const imageToRemove = existingSliderImages[index];
            setRemovedSliderImages((prev) => [...prev, imageToRemove]);
            setExistingSliderImages((prev) => {
              const updated = [...prev];
              updated.splice(index, 1);
              return updated;
            });
          }

          setSliderImages((prev) => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
          });

          if (index >= existingSliderImages.length) {
            setSelectedSliderImages((prev) => {
              const updated = [...prev];
              updated.splice(index - existingSliderImages.length, 1);
              return updated;
            });
          }
        }
        break;
    }
  };

  const handleAddLocationHighlight = () => {
    setLocationHighlights([
      ...locationHighlights,
      { title: "", time: "", image: "" },
    ]);
  };

  const handleRemoveLocationHighlight = (index: number) => {
    setLocationHighlights(
      locationHighlights.filter((_: any, i: any) => i !== index),
    );
  };

  const handleUpdateLocationHighlight = (
    index: number,
    field: keyof LocationHighlight,
    value: string,
  ) => {
    const updatedHighlights = [...locationHighlights];
    updatedHighlights[index] = { ...updatedHighlights[index], [field]: value };
    setLocationHighlights(updatedHighlights);
  };

  const handleAgentChange = (value: string) => {
    setValue("agentId", value);
  };

  const handleLocationImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Image size should be less than 15MB");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, GIF, WEBP)");
      return;
    }

    // Create file preview URL and update the location highlights
    const imageUrl = URL.createObjectURL(file);
    const updatedHighlights = [...locationHighlights];
    updatedHighlights[index] = {
      ...updatedHighlights[index],
      image: imageUrl,
      imageFile: file, // Store the file object for form submission
    };
    setLocationHighlights(updatedHighlights);
  };

  const handleAddFloorPlan = () => {
    setFloorPlans([
      ...floorPlans,
      { title: "", totalSquareFeet: "", image: "", brochureLink: "" },
    ]);
  };

  const handleRemoveFloorPlan = (index: number) => {
    setFloorPlans(floorPlans.filter((_, i) => i !== index));
  };

  const handleUpdateFloorPlan = (index: number, field: any, value: string) => {
    const updatedPlans = [...floorPlans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    setFloorPlans(updatedPlans);
  };

  const handleFloorPlanImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Image size should be less than 15MB");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, GIF, WEBP)");
      return;
    }

    // Create file preview URL and update the floor plans
    const imageUrl = URL.createObjectURL(file);
    const updatedPlans = [...floorPlans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      image: imageUrl,
      imageFile: file, // Store the file object for form submission
    };
    setFloorPlans(updatedPlans);
  };

  const handleFloorPlanBrochureChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size should be less than 15MB");
      return;
    }

    const updatedPlans = [...floorPlans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      brochureLink: file.name,
      brochureFile: file, // Store the file object for form submission
    };
    setFloorPlans(updatedPlans);
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (selectedCommunity.length === 0) {
      toast.error("At least one community should be selected");
      return;
    }
    if (selectedAmenities.length === 0) {
      toast.error("At least one amenity should be selected");
      return;
    }
    if (!isEditMode && !selectedMainImage) {
      toast.error("Main image is required");
      return;
    }
    if (!isEditMode && !selectedSecondaryImage) {
      toast.error("Secondary image is required");
      return;
    }
    if (!isEditMode && sliderImages.length === 0) {
      toast.error("At least one slider image is required");
      return;
    }

    if (!selectedPropertyType) {
      toast.error("Property type must be selected");
      return;
    }

    if (locationHighlights.length > 0) {
      const locationHighlightsValid = locationHighlights.every(
        (highlight: any) =>
          highlight.title.trim() !== "" &&
          highlight.time.trim() !== "" &&
          (highlight.image ? true : false),
      );

      if (!locationHighlightsValid) {
        toast.error(
          "All location highlights must have title, travel time, and valid image (max 5MB)",
        );
        return;
      }
    }

    if (floorPlans.length > 0) {
      const floorPlansValid = floorPlans.every((plan) =>
        plan.title.trim() !== "" &&
        plan.totalSquareFeet.trim() !== "" &&
        plan.image
          ? true
          : false && plan.brochureLink
            ? true
            : false,
      );

      if (!floorPlansValid) {
        toast.error(
          "All floor plans must have title, total square feet, valid image (max 5MB), and valid brochure (max 10MB)",
        );
        return;
      }
    }
    if (!(selectedBrochure || selectedFloorPlan || selectedMasterPlan)) {
      if (
        !(
          property?.downloads?.brochure ||
          property?.downloads?.floorPlan ||
          property?.downloads?.masterPlan
        )
      ) {
        toast.error("Upload at least one Download");
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

      // Add basic fields
      formDataToSend.append("title", data.title);
      formDataToSend.append("price", data.price);
      formDataToSend.append("paymentPlan", data.paymentPlan);
      formDataToSend.append("completion", data.completion);
      formDataToSend.append("installments", data.installments);
      formDataToSend.append("downPayment", data.downPayment);
      formDataToSend.append("paymentStructure", data.paymentStructure);
      formDataToSend.append("bedrooms", data.bedrooms);
      formDataToSend.append("handover", data.handover);
      formDataToSend.append("areaSize", data.areaSize);
      formDataToSend.append("developer", data.developer);
      formDataToSend.append("unit", data.unit);
      formDataToSend.append("propertyType", selectedPropertyType);
      formDataToSend.append("community", selectedCommunity);
      formDataToSend.append("description", data.description);
      formDataToSend.append("locationDescription", data.locationDescription);
      formDataToSend.append("country", data.location.country);
      formDataToSend.append("about", data.about);
      formDataToSend.append("agentId", data.agentId);
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
      formDataToSend.append("youtubeVideo", data.youtubeVideo || "");

      // Add amenities
      selectedAmenities.forEach((amenityId) => {
        formDataToSend.append("amenities[]", amenityId);
      });

      // Add images
      if (selectedMainImage) {
        formDataToSend.append("mainImage", selectedMainImage);
      }

      if (selectedSecondaryImage) {
        formDataToSend.append("secondaryImage", selectedSecondaryImage);
      }

      if (isEditMode) {
        if (existingSliderImages.length > 0) {
          const normalizedImages = existingSliderImages
            .flat()
            .filter((img) => typeof img === "string");
          formDataToSend.append(
            "existingSliderImages",
            JSON.stringify(normalizedImages),
          );
        }

        selectedSliderImages.forEach((file) => {
          formDataToSend.append("sliderImages", file);
        });
      } else {
        selectedSliderImages.forEach((file) => {
          formDataToSend.append("sliderImages", file);
        });
      }

      // Add download files
      if (selectedBrochure) {
        formDataToSend.append("brochure", selectedBrochure);
      }

      if (selectedFloorPlan) {
        formDataToSend.append("floorPlan", selectedFloorPlan);
      }

      if (selectedMasterPlan) {
        formDataToSend.append("masterPlan", selectedMasterPlan);
      }

      // Add location highlights
      formDataToSend.append(
        "locationHighlights",
        JSON.stringify(
          locationHighlights.map(
            ({ imageFile, ...highlight }: any) => highlight,
          ),
        ),
      );

      // Add location highlight images
      locationHighlights.forEach((highlight: any, index: number) => {
        if (highlight.imageFile) {
          formDataToSend.append(`locationImages_${index}`, highlight.imageFile);
        }
      });

      // Add floor plans
      formDataToSend.append(
        "floorPlans",
        JSON.stringify(
          floorPlans.map(({ imageFile, brochureFile, ...plan }) => plan),
        ),
      );

      // Add floor plan images and brochures
      floorPlans.forEach((plan, index) => {
        if (plan.imageFile) {
          formDataToSend.append(`floorPlanImages_${index}`, plan.imageFile);
        }
        if (plan.brochureFile) {
          formDataToSend.append(
            `floorPlanBrochure_${index}`,
            plan.brochureFile,
          );
        }
      });

      // Add FAQs
      faqs.forEach((faq, index) => {
        if (faq._id) {
          formDataToSend.append(`faqs[${index}][_id]`, faq._id);
        }
        formDataToSend.append(`faqs[${index}][question]`, faq.question);
        formDataToSend.append(`faqs[${index}][answer]`, faq.answer);
      });

      // Add removed FAQ IDs if in edit mode
      if (isEditMode && removedFaqIds.length > 0) {
        removedFaqIds.forEach((id) => {
          formDataToSend.append("removedFaqIds", id);
        });
      }

      if (isEditMode) {
        // Update existing property
        await axiosInstance.put(`/property/${property._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Property updated successfully!");
      } else {
        // Create new property
        await axiosInstance.post("/property", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Property added successfully!");
      }

      // Redirect to properties list page
      router.push("/admin/property");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update property. Please try again."
          : "Failed to add property. Please try again.",
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <select
              className="col-span-full w-full rounded-md border border-gray-300 px-3 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={selectedCommunity}
              onChange={(e) => handleCommunityChange(e.target.value)}
            >
              <option value="">Select Community</option>
              {communityData.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.title}
                </option>
              ))}
            </select>

            <InputGroup
              label="Title"
              placeholder="Enter property title"
              type="text"
              name="title"
              value={watch("title")}
              handleChange={() => {}}
              register={register}
              error={errors.title?.message}
            />
          </div>
          <div>
            <div className="mb-4.5">

                <>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Select Agent
                  </label>
                  <Select
                    value={watch("agentId") || ""}
                    onValueChange={handleAgentChange}
                  >
                    <SelectTrigger
                      className={`dark:border-form-strokedark dark:bg-form-input w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:text-white dark:focus:border-primary ${
                        errors.agentId ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agentData.map((agent: any) => (
                        <SelectItem key={agent._id} value={agent._id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.agentId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.agentId.message}
                    </p>
                  )}
                </>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Price"
              placeholder="Enter property price"
              type="text"
              name="price"
              value={watch("price")}
              handleChange={() => {}}
              register={register}
              error={errors.price?.message}
            />
            <InputGroup
              label="Payment Plan"
              placeholder="Enter payment plan details"
              type="text"
              name="paymentPlan"
              value={watch("paymentPlan")}
              handleChange={() => {}}
              register={register}
              error={errors.paymentPlan?.message}
            />
            <InputGroup
              label="Payment Structure"
              placeholder="Enter payment Structure details"
              type="text"
              name="paymentStructure"
              value={watch("paymentStructure")}
              handleChange={() => {}}
              register={register}
              error={errors.paymentStructure?.message}
            />
            <InputGroup
              label="Completion"
              placeholder="Enter completion date/status"
              type="text"
              name="completion"
              value={watch("completion")}
              handleChange={() => {}}
              register={register}
              error={errors.completion?.message}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Installments"
              placeholder="Enter installments details"
              type="text"
              name="installments"
              value={watch("installments")}
              handleChange={() => {}}
              register={register}
              error={errors.installments?.message}
            />
            <InputGroup
              label="Down Payment"
              placeholder="Enter down payment details"
              type="text"
              name="downPayment"
              value={watch("downPayment")}
              handleChange={() => {}}
              register={register}
              error={errors.downPayment?.message}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <InputGroup
              label="Bedrooms"
              placeholder="Enter number of bedrooms"
              type="text"
              name="bedrooms"
              value={watch("bedrooms")}
              handleChange={() => {}}
              register={register}
              error={errors.bedrooms?.message}
            />
            <InputGroup
              label="Handover"
              placeholder="Enter handover date"
              type="text"
              name="handover"
              value={watch("handover")}
              handleChange={() => {}}
              register={register}
              error={errors.handover?.message}
            />
            <InputGroup
              label="Area Size"
              placeholder="Enter area size"
              type="text"
              name="areaSize"
              value={watch("areaSize")}
              handleChange={() => {}}
              register={register}
              error={errors.areaSize?.message}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <InputGroup
              label="Developer"
              placeholder="Enter developer name"
              type="text"
              name="developer"
              value={watch("developer")}
              handleChange={() => {}}
              register={register}
              error={errors.developer?.message}
            />
            <InputGroup
              label="Unit"
              placeholder="Enter unit details"
              type="text"
              name="unit"
              value={watch("unit")}
              handleChange={() => {}}
              register={register}
              error={errors.unit?.message}
            />
            <div className="space-y-2">
              <label className="text-body-sm font-medium text-dark dark:text-white">
                Property Type{" "}
                <span className="ml-1 select-none text-red">*</span>
              </label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={selectedPropertyType}
                onChange={(e) => handlePropertyTypeChange(e.target.value)}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.title}
                  </option>
                ))}
              </select>

              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.propertyType.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <TextArea
              type="text"
              label="Description"
              placeholder="Enter property description"
              name="description"
              value={watch("description")}
              handleChange={() => {}}
              register={register}
              error={errors.description?.message}
            />
          </div>
        </ShowcaseSection>

        {/* Property Images */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Property Images
          </h2>

          {/* Main Image */}
          <div className="mb-6">
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
              Main Image <span className="ml-1 select-none text-red">*</span>
            </label>
            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "main")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {mainImagePreview && (
                <div className="relative w-full max-w-[200px]">
                  <Image
                    src={mainImagePreview}
                    alt="Main Image Preview"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
            {imageError && (
              <p className="mt-1 text-sm text-red-500">{imageError}</p>
            )}
          </div>

          {/* Secondary Image */}
          <div className="mb-6">
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
              Secondary Image
            </label>
            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "secondary")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {secondaryImagePreview && (
                <div className="relative w-full max-w-[200px]">
                  <Image
                    src={secondaryImagePreview}
                    alt="Secondary Image Preview"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Slider Images */}
          <div className="mb-6">
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
              Slider Images
            </label>
            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange(e, "slider")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {sliderImages.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Slider Image ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                    {sliderImages.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage("slider", index)}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                      >
                        <XCircle size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Amenities */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-gray-5">Amenities</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {amenitiesData.map((amenity) => {
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

        {/* Location */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Location</h2>
          <LocationSelector
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
            watch={watch}
            initialVal={property?.location}
          />
          <div className="mt-4">
            <TextArea
              type="text"
              label="Location Description"
              placeholder="Enter location description"
              name="locationDescription"
              value={watch("locationDescription")}
              handleChange={() => {}}
              register={register}
              error={errors.locationDescription?.message}
            />
          </div>

          {/* Location Highlights */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                Location Highlights
              </h3>
              <Button
                type="button"
                onClick={handleAddLocationHighlight}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus size={16} /> Add Highlight
              </Button>
            </div>

            {locationHighlights.map((highlight: any, index: number) => (
              <div
                key={index}
                className="mb-4 rounded-lg border border-gray-700 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-md font-medium text-white">
                    Highlight {index + 1}
                  </h4>
                  <Button
                    type="button"
                    onClick={() => handleRemoveLocationHighlight(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <XCircle size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputGroup
                    label="Title"
                    placeholder="Enter highlight title"
                    type="text"
                    name={`locationHighlight-${index}-title`}
                    value={highlight.title}
                    handleChange={(e) =>
                      handleUpdateLocationHighlight(
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                    register={() => {}}
                  />
                  <InputGroup
                    label="Travel Time"
                    placeholder="Enter travel time"
                    type="text"
                    name={`locationHighlight-${index}-time`}
                    value={highlight.time}
                    handleChange={(e) =>
                      handleUpdateLocationHighlight(
                        index,
                        "time",
                        e.target.value,
                      )
                    }
                    register={() => {}}
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLocationImageChange(index, e)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {highlight.image && (
                    <div className="mt-2">
                      <Image
                        src={highlight.image}
                        alt={`Location Highlight ${index + 1}`}
                        width={100}
                        height={75}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        {/* Floor Plans */}
        <ShowcaseSection>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Floor Plans</h2>
            <Button
              type="button"
              onClick={handleAddFloorPlan}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Add Floor Plan
            </Button>
          </div>

          {floorPlans.map((plan, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg border border-gray-700 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-md font-medium text-white">
                  Floor Plan {index + 1}
                </h4>
                <Button
                  type="button"
                  onClick={() => handleRemoveFloorPlan(index)}
                  variant="destructive"
                  size="sm"
                >
                  <XCircle size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputGroup
                  label="Title"
                  placeholder="Enter floor plan title"
                  type="text"
                  name={`floorPlan-${index}-title`}
                  value={plan.title}
                  handleChange={(e) =>
                    handleUpdateFloorPlan(index, "title", e.target.value)
                  }
                  register={() => {}}
                />
                <InputGroup
                  label="Total Square Feet"
                  placeholder="Enter total square feet"
                  type="text"
                  name={`floorPlan-${index}-totalSquareFeet`}
                  value={plan.totalSquareFeet}
                  handleChange={(e) =>
                    handleUpdateFloorPlan(
                      index,
                      "totalSquareFeet",
                      e.target.value,
                    )
                  }
                  register={() => {}}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFloorPlanImageChange(index, e)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {plan.image && (
                    <div className="mt-2">
                      <Image
                        src={plan.image}
                        alt={`Floor Plan ${index + 1}`}
                        width={100}
                        height={75}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Brochure
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFloorPlanBrochureChange(index, e)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {plan.brochureLink && (
                    <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                      Current file: {plan.brochureLink}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ShowcaseSection>

        {/* Downloads */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Downloads</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Brochure
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "brochure")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {property?.downloads?.brochure && (
                <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                  Current file: {property.downloads.brochure}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Floor Plan
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "floorPlan")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {property?.downloads?.floorPlan && (
                <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                  Current file: {property.downloads.floorPlan}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Master Plan
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "masterPlan")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {property?.downloads?.masterPlan && (
                <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                  Current file: {property.downloads.masterPlan}
                </p>
              )}
            </div>
          </div>
        </ShowcaseSection>

        {/* Media */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Media</h2>
          <div className="grid grid-cols-1 gap-6">
            <InputGroup
              label="YouTube Video URL"
              placeholder="Enter YouTube video URL"
              type="text"
              name="youtubeVideo"
              value={watch("youtubeVideo")}
              handleChange={() => {}}
              register={register}
              error={errors.youtubeVideo?.message}
            />
          </div>

          <TextArea
            label="About your property"
            placeholder="Enter About details"
            type="text"
            name="about"
            value={watch("about")}
            handleChange={() => {}}
            register={register}
            error={errors.about?.message}
          />
        </ShowcaseSection>

        {/* FAQs */}
        <ShowcaseSection>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">FAQs</h2>
            <Button
              type="button"
              onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Add FAQ
            </Button>
          </div>

          <FAQInput
            onFAQChange={(updatedFaqs, removedIds) => {
              setFaqs(updatedFaqs);
              if (removedIds) {
                setRemovedFaqIds(removedIds);
              }
            }}
            initialFaqs={property?.faqs || []}
          />
        </ShowcaseSection>

        <div className="mt-10 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/property")}
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
              <>{isEditMode ? "Update Property" : "Add Property"}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;

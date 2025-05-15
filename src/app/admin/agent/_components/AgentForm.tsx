"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/components/ui/button";
import { XCircle, Loader2, Plus } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TextArea from "@/components/FormElements/InputGroup/text-area";
import { z } from "zod";

// Define schema to match backend model
const agentSchema = z.object({
  agentName: z.string().min(1, "Agent name is required"),
  agentRole: z.string().min(1, "Agent role is required"),
  successfulCases: z
    .array(
      z.object({
        image: z.any().optional(),
        title: z.string().min(1, "Case title is required"),
        features: z
          .array(z.string())
          .min(1, "At least one feature is required"),
      }),
    )
    .optional(),
  sliderImages: z.array(z.any()).optional(),
  youtubeUrls: z
    .array(z.string().url("Please enter a valid YouTube URL"))
    .optional(),
});

type AgentFormData = z.infer<typeof agentSchema>;

const AgentForm = ({ agent = null }: { agent?: any }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sliderImagePreviews, setSliderImagePreviews] = useState<any[]>([]);
  const [selectedSliderFiles, setSelectedSliderFiles] = useState<any[]>([]);
  const [imageError, setImageError] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [youtubeUrlInput, setYoutubeUrlInput] = useState("");

  const router = useRouter();
  const isEditMode = !!agent;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      agentName: "",
      agentRole: "",
      successfulCases: [],
      sliderImages: [],
      youtubeUrls: [],
    },
  });

  useEffect(() => {
    setIsMounted(true);

    if (isEditMode && agent) {
      reset({
        agentName: agent.agentName || "",
        agentRole: agent.agentRole || "",
        successfulCases:
          agent.successfulCases?.map((caseItem: any) => ({
            image: caseItem.image || "",
            title: caseItem.title || "",
            features: caseItem.features || [],
          })) || [],
        sliderImages: agent.sliderImages || [],
        youtubeUrls: agent.youtubeUrls || [],
      });

      if (agent.sliderImages && agent.sliderImages.length > 0) {
        setSliderImagePreviews(agent.sliderImages);
      }
    }
  }, [isEditMode, agent, reset]);

  const onSubmit = async (data: AgentFormData) => {
    setIsSubmitting(true);
    setImageError(null);

    try {
      const formData = new FormData();

      // Basic fields
      formData.append("agentName", data.agentName);
      formData.append("agentRole", data.agentRole);

      // Slider images
      selectedSliderFiles.forEach((file) => {
        formData.append("sliderImages", file); // Multiple files with same field name
      });

      // YouTube URLs
      if (data.youtubeUrls && data.youtubeUrls.length > 0) {
        formData.append("youtubeUrls", JSON.stringify(data.youtubeUrls));
      }

      // Handle existing slider images in edit mode
      if (isEditMode && agent?.sliderImages?.length) {
        agent.sliderImages.forEach((image: string) => {
          if (
            typeof image === "string" &&
            !selectedSliderFiles.some((f) =>
              typeof f === "string" ? f === image : f.name === image,
            )
          ) {
            formData.append("existingSliderImages", image);
          }
        });
      }

      // Successful cases with proper indexing
      const successfulCasesMetadata = data.successfulCases?.map(
        (caseItem: any, index: number) => {
          // If it's a new File, append to formData with correct field name
          if (caseItem.image instanceof File) {
            formData.append(`caseImages_${index}`, caseItem.image); // Use indexed field name
            return {
              title: caseItem.title,
              features: caseItem.features,
              image: "", // Will be replaced by backend
              isNewImage: true,
            };
          } else if (caseItem.image) {
            // Existing image in edit mode
            return {
              title: caseItem.title,
              features: caseItem.features,
              image: caseItem.image,
              isNewImage: false,
            };
          } else {
            // Case with no image
            return {
              title: caseItem.title,
              features: caseItem.features,
              image: "",
              isNewImage: false,
            };
          }
        },
      );

      formData.append(
        "successfulCases",
        JSON.stringify(successfulCasesMetadata),
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (isEditMode) {
        await axiosInstance.put(`/agent/${agent._id}`, formData, config);
        toast.success("Agent profile updated successfully!");
      } else {
        await axiosInstance.post("/agent", formData, config);
        toast.success("Agent profile added successfully!");
      }

      router.push("/admin/agent");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update agent profile."
          : "Failed to add agent profile.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSliderImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      // Validate files
      for (const file of newFiles) {
        if (file.size > 15 * 1024 * 1024) {
          setImageError("Image size should be less than 15MB");
          return;
        }
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
          setImageError("Please upload valid images (JPEG, PNG, GIF, WEBP)");
          return;
        }
      }

      setSliderImagePreviews([...sliderImagePreviews, ...newPreviews]);
      setSelectedSliderFiles([...selectedSliderFiles, ...newFiles]);
      setValue("sliderImages", [
        ...(watch("sliderImages") as any[]),
        ...newFiles,
      ]);
      setImageError(null);
    }
  };

  const removeSliderImage = (index: number) => {
    const updatedPreviews = [...sliderImagePreviews];
    updatedPreviews.splice(index, 1);

    const updatedFiles = [...selectedSliderFiles];
    updatedFiles.splice(index, 1);

    const updatedImages = [...(watch("sliderImages") as any[])];
    updatedImages.splice(index, 1);

    setSliderImagePreviews(updatedPreviews);
    setSelectedSliderFiles(updatedFiles);
    setValue("sliderImages", updatedImages);
  };

  const addYoutubeUrl = () => {
    if (youtubeUrlInput.trim()) {
      setValue("youtubeUrls", [
        ...(watch("youtubeUrls") as any[]),
        youtubeUrlInput.trim(),
      ]);
      setYoutubeUrlInput("");
    }
  };

  const removeYoutubeUrl = (index: number) => {
    const updatedUrls = [...(watch("youtubeUrls") as any[])];
    updatedUrls.splice(index, 1);
    setValue("youtubeUrls", updatedUrls);
  };

  const addSuccessfulCase = () => {
    setValue("successfulCases", [
      ...(watch("successfulCases") as any[]),
      { title: "", image: "", features: [] },
    ]);
  };

  const updateSuccessfulCase = (
    index: number,
    field: string,
    value: string | string[],
  ) => {
    const updatedCases = [...(watch("successfulCases") as any[])];
    updatedCases[index] = { ...updatedCases[index], [field]: value };
    setValue("successfulCases", updatedCases);
  };

  const removeSuccessfulCase = (index: number) => {
    const updatedCases = [...(watch("successfulCases") as any[])];
    updatedCases.splice(index, 1);
    setValue("successfulCases", updatedCases);
  };

  const handleCaseImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    caseIndex: number,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error("Image size should be less than 15MB");
        return;
      }
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, GIF, WEBP)");
        return;
      }

      const updatedCases = [...(watch("successfulCases") as any[])];
      updatedCases[caseIndex] = {
        ...updatedCases[caseIndex],
        image: file,
      };
      setValue("successfulCases", updatedCases);
    }
  };

  const removeCaseImage = (caseIndex: number) => {
    const updatedCases = [...(watch("successfulCases") as any[])];
    updatedCases[caseIndex] = {
      ...updatedCases[caseIndex],
      image: "",
    };
    setValue("successfulCases", updatedCases);
  };

  const addFeature = (caseIndex: number) => {
    if (featureInput.trim()) {
      const updatedCases = [...(watch("successfulCases") as any[])];
      if (!updatedCases[caseIndex].features) {
        updatedCases[caseIndex].features = [];
      }
      updatedCases[caseIndex].features.push(featureInput.trim());
      setValue("successfulCases", updatedCases);
      setFeatureInput("");
    }
  };

  const removeFeature = (caseIndex: number, featureIndex: number) => {
    const updatedCases = [...(watch("successfulCases") as any[])];
    updatedCases[caseIndex].features.splice(featureIndex, 1);
    setValue("successfulCases", updatedCases);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Section */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Agent Name"
              placeholder="Enter agent name"
              type="text"
              name="agentName"
              value={watch("agentName")}
              register={register}
              error={errors.agentName?.message}
            />
            <InputGroup
              label="Agent Role"
              placeholder="Enter agent role"
              type="text"
              name="agentRole"
              value={watch("agentRole")}
              register={register}
              error={errors.agentRole?.message}
            />
          </div>
        </ShowcaseSection>

        {/* Slider Images Section */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Slider Images
          </h2>
          <div className="mt-6 space-y-2">
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Upload Slider Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleSliderImageChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {imageError && (
              <p className="mt-1 text-xs text-red-500">{imageError}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-4">
              {sliderImagePreviews.map((preview, index) => (
                <div key={index} className="relative h-40 w-40">
                  <Image
                    src={preview}
                    fill
                    alt={`Slider Image ${index + 1}`}
                    className="rounded-md object-cover shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeSliderImage(index)}
                    className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
                  >
                    <XCircle className="h-6 w-6 text-gray-800" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseSection>

        {/* YouTube URLs Section */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            YouTube URLs
          </h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={youtubeUrlInput}
                onChange={(e) => setYoutubeUrlInput(e.target.value)}
                placeholder="Enter YouTube URL"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <Button
                type="button"
                onClick={addYoutubeUrl}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.youtubeUrls && (
              <p className="text-sm text-red-500">
                {/* If it's a Zod array error, check _errors array */}
                {(errors.youtubeUrls as any)?._errors?.[0] ??
                  (Array.isArray(errors.youtubeUrls) &&
                    errors.youtubeUrls[0]?.message)}
              </p>
            )}

            <div className="space-y-2">
              {watch("youtubeUrls")?.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-gray-300 p-2 dark:border-gray-600"
                >
                  <span className="truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => removeYoutubeUrl(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseSection>

        {/* Successful Cases Section */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Successful Cases
          </h2>
          <div className="space-y-6">
            {watch("successfulCases")?.map((caseItem, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Case {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeSuccessfulCase(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputGroup
                    label="Title"
                    placeholder="Enter case title"
                    type="text"
                    name={`successfulCases.${index}.title`}
                    value={caseItem.title}
                    handleChange={(e) =>
                      updateSuccessfulCase(index, "title", e.target.value)
                    }
                    register={register}
                    error={errors.successfulCases?.[index]?.title?.message}
                  />

                  {/* Case Image Upload */}
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium text-dark dark:text-white">
                      Case Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCaseImageChange(e, index)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {caseItem.image && (
                      <div className="relative mt-4 h-40 w-40">
                        <Image
                          src={
                            typeof caseItem.image === "string"
                              ? caseItem.image
                              : URL.createObjectURL(caseItem.image)
                          }
                          fill
                          alt={`Case ${index + 1} Preview`}
                          className="rounded-md object-cover shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeCaseImage(index)}
                          className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
                        >
                          <XCircle className="h-6 w-6 text-gray-800" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Section */}
                <div className="mt-4">
                  <label className="text-body-sm font-medium text-dark dark:text-white">
                    Features
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Add feature"
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <Button
                      type="button"
                      onClick={() => addFeature(index)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {caseItem.features?.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index, featureIndex)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addSuccessfulCase}
              variant="outline"
              className="mt-4"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Successful Case
            </Button>
          </div>
        </ShowcaseSection>

        {/* Form Submission Buttons */}
        <div className="mt-10 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/agent-profile")}
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

export default AgentForm;

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
import { AgentFormData, agentSchema } from "@/validation/validationSchema";

const AgentForm = ({ agent = null }: { agent?: any }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<any>(null);
  const [imageError, setImageError] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expertiseInput, setExpertiseInput] = useState("");

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
      name: "",
      role: "",
      profileImage: "",
      email: "",
      phone: "",
      roiPercentage: "",
      yearlyPercentage: "",
      expertiseAreas: [],
      successfulCases: [],
    },
  });

  useEffect(() => {
    setIsMounted(true);

    if (isEditMode && agent) {
      reset({
        name: agent.name || "",
        role: agent.role || "",
        profileImage: agent.profileImage || "",
        email: agent.email || "",
        phone: agent.phone || "",
        roiPercentage: agent.roiPercentage || "",
        yearlyPercentage: agent.yearlyPercentage || "",
        expertiseAreas: agent.expertiseAreas || [],
        successfulCases: agent.successfulCases.map((caseItem: any) => ({
          title: caseItem.title,
          description: caseItem.description,
          caseImages: caseItem.caseImages,
        })),
      });

      if (agent.profileImage) {
        setImagePreview(agent.profileImage);
      }
    }
  }, [isEditMode, agent, reset]);
  const onSubmit = async (data: AgentFormData) => {
    setIsSubmitting(true);
    setImageError(null);

    try {
      const formData = new FormData();

      // Basic fields
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("roiPercentage", data.roiPercentage as any);
      formData.append("yearlyPercentage", data.yearlyPercentage as any);
      formData.append("expertiseAreas", JSON.stringify(data.expertiseAreas));

      // Profile image logic
      if (selectedImageFile) {
        formData.append("profileImage", selectedImageFile);
      } else if (isEditMode && imagePreview) {
        formData.append("existingProfileImage", imagePreview);
      }

      // Track case images with proper indexing
      const successfulCasesMetadata = data.successfulCases?.map(
        (caseItem: any, index: number) => {
          // If it's a new File, append to formData with consistent field name
          if (caseItem.caseImages instanceof File) {
            formData.append("caseImages", caseItem.caseImages); // Use same field name for all
            return {
              title: caseItem.title,
              description: caseItem.description,
              caseImages: "", // Will be replaced by backend
              isNewImage: true,
              originalIndex: index, // Track original position
            };
          } else {
            return {
              title: caseItem.title,
              description: caseItem.description,
              caseImages: caseItem.caseImages || "",
              isNewImage: false,
              originalIndex: index,
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
        toast.success("Agent updated successfully!");
      } else {
        await axiosInstance.post("/agent", formData, config);
        toast.success("Agent added successfully!");
      }

      router.push("/admin/agent");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode ? "Failed to update agent." : "Failed to add agent.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setImagePreview(imageUrl);
      setSelectedImageFile(file);
      setValue("profileImage", file);
      setImageError(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedImageFile(null);
    setValue("profileImage", "");
    setImageError(null);
  };

  const addExpertiseArea = () => {
    if (
      expertiseInput.trim() &&
      !watch("expertiseAreas")?.includes(expertiseInput.trim())
    ) {
      setValue("expertiseAreas", [
        ...(watch("expertiseAreas") as any[]),
        expertiseInput.trim(),
      ]);
      setExpertiseInput("");
    }
  };

  const removeExpertiseArea = (index: number) => {
    const updatedAreas = [...(watch("expertiseAreas") as any[])];
    updatedAreas.splice(index, 1);
    setValue("expertiseAreas", updatedAreas);
  };

  const addSuccessfulCase = () => {
    setValue("successfulCases", [
      ...(watch("successfulCases") as any[]),
      { title: "", description: "", caseImages: "" },
    ]);
  };

  const updateSuccessfulCase = (
    index: number,
    field: string,
    value: string,
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
        caseImages: file,
      };
      setValue("successfulCases", updatedCases);
    }
  };

  const removeCaseImage = (caseIndex: number) => {
    const updatedCases = [...(watch("successfulCases") as any[])];
    updatedCases[caseIndex] = {
      ...updatedCases[caseIndex],
      caseImages: "",
    };
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
              label="Name"
              placeholder="Enter agent name"
              type="text"
              name="name"
              value={watch("name")}
              register={register}
              error={errors.name?.message}
            />
            <InputGroup
              label="Role"
              placeholder="Enter agent role"
              type="text"
              name="role"
              value={watch("role")}
              register={register}
              error={errors.role?.message}
            />
            <InputGroup
              label="Email"
              placeholder="Enter agent email"
              type="email"
              name="email"
              value={watch("email")}
              register={register}
              error={errors.email?.message}
            />
            <InputGroup
              label="Phone"
              placeholder="Enter agent phone number"
              type="tel"
              name="phone"
              value={watch("phone")}
              register={register}
              error={errors.phone?.message}
            />
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Upload Agent Image{isEditMode ? "" : " *"}
              {!isEditMode && (
                <span className="ml-1 select-none text-red">*</span>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {imageError && (
              <p className="mt-1 text-xs text-red-500">{imageError}</p>
            )}
            {(imagePreview || watch("profileImage")) && (
              <div className="relative mt-4 inline-block h-40 w-40">
                <Image
                  src={
                    imagePreview ||
                    (typeof watch("profileImage") === "string"
                      ? watch("profileImage")
                      : "")
                  }
                  fill
                  alt="Agent Preview"
                  className="rounded-md object-cover shadow-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-200"
                >
                  <XCircle className="h-6 w-6 text-gray-800" />
                </button>
              </div>
            )}
            {errors.profileImage && (
              <p className="mt-1 text-xs text-red-500">
                {typeof errors.profileImage === "string"
                  ? errors.profileImage
                  : errors.profileImage.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 py-6 text-lg text-white"
        >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Submitting..."}
              </>
            ) : isEditMode ? (
              "Update basic information"
            ) : (
              "Submit basic information"
            )}
          </Button>
        </ShowcaseSection>

        {/* Expertise Areas Section */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Expertise Areas
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="ROI Percentage"
              placeholder="Enter ROI percentage"
              type="text"
              name="roiPercentage"
              value={watch("roiPercentage")}
              register={register}
              error={errors.roiPercentage?.message}
            />
            <InputGroup
              label="Yearly Percentage"
              placeholder="Enter yearly percentage"
              type="text"
              name="yearlyPercentage"
              value={watch("yearlyPercentage")}
              register={register}
              error={errors.yearlyPercentage?.message}
            />

            <label htmlFor="" className="col-span-full">
              Add Expertise
            </label>
            <div className="col-span-full">
              <input
                type="text"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                placeholder="Add expertise area"
                className="w-[91%] flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <Button
                type="button"
                onClick={addExpertiseArea}
                className="ml-5 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.expertiseAreas && (
              <p className="text-xs text-red-500">
                {errors.expertiseAreas.message}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {watch("expertiseAreas")?.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700"
                >
                  {area}
                  <button
                    type="button"
                    onClick={() => removeExpertiseArea(index)}
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
                    {caseItem.caseImages && (
                      <div className="relative mt-4 h-40 w-40">
                        <Image
                          src={
                            typeof caseItem.caseImages === "string"
                              ? caseItem.caseImages
                              : URL.createObjectURL(caseItem.caseImages)
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
                    {errors.successfulCases?.[index]?.caseImages?.message && (
                      <p className="text-xs text-red-500">
                        {errors.successfulCases[index]?.caseImages?.message}
                      </p>
                    )}
                  </div>
                </div>
                <TextArea
                  label="Description"
                  placeholder="Enter case description"
                  type="text"
                  name={`successfulCases.${index}.description`}
                  value={caseItem.description}
                  handleChange={(e: any) =>
                    updateSuccessfulCase(index, "description", e.target.value)
                  }
                  register={register}
                  error={errors.successfulCases?.[index]?.description?.message}
                />
              </div>
            ))}
            {errors.successfulCases && (
              <p className="text-xs text-red-500">
                {errors.successfulCases.message}
              </p>
            )}
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
            onClick={() => router.push("/admin/agent")}
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

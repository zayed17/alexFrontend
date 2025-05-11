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
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import TextArea from "@/components/FormElements/InputGroup/text-area";

// Define the validation schema
const mediaCenterSchema = z.object({
  youtubeUrl: z.string().url("Please enter a valid YouTube URL"),
  videoType: z.enum(["video", "shorts"], {
    required_error: "Please select a video type",
  }),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  agentId: z.string().min(1, "Please select an agent"),
});

type MediaCenterFormValues = z.infer<typeof mediaCenterSchema>;

export function MediaCenterForm({ mediaItem = null, agentData }: any) {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEditMode = !!mediaItem;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<MediaCenterFormValues>({
    resolver: zodResolver(mediaCenterSchema),
    defaultValues: {
      youtubeUrl: mediaItem?.youtubeUrl || "",
      videoType: mediaItem?.videoType || "video",
      title: mediaItem?.title || "",
      description: mediaItem?.description || "",
      agentId: typeof mediaItem?.agentId === 'object' ? mediaItem?.agentId?._id : mediaItem?.agentId || "",
    },
  });

  useEffect(() => {
    if (mediaItem) {
      reset({
        youtubeUrl: mediaItem.youtubeUrl || "",
        videoType: mediaItem.videoType || "video",
        title: mediaItem.title || "",
        description: mediaItem.description || "",
        agentId: typeof mediaItem?.agentId === 'object' ? mediaItem?.agentId?._id : mediaItem?.agentId || "",
      });
      
    }
  }, [mediaItem, reset, setValue]);


  const onSubmit = async (data: MediaCenterFormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        youtubeUrl: data.youtubeUrl,
        videoType: data.videoType,
        title: data.title,
        description: data.description,
        agentId:data.agentId,
      };

      if (isEditMode) {
        await axiosInstance.put(
          `/media-center/${mediaItem._id}`,
          submissionData,
        );
        toast.success("Media item updated successfully!");
      } else {
        await axiosInstance.post("/media-center", submissionData);
        toast.success("Media item added successfully!");
      }
      router.push("/admin/media-center");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isEditMode
          ? "Failed to update media item."
          : "Failed to add media item.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoTypeChange = (value: string) => {
    setValue("videoType", value as "video" | "shorts");
  };

  const handleAgentChange = (value: string) => {
    setValue("agentId", value);
  };


  return (
    <ShowcaseSection className="!p-6.5">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-grow">
            <InputGroup
              label="Title"
              type="text"
              placeholder="Enter Video Title"
              className="mb-5"
              name="title"
              value={watch("title")}
              error={errors.title?.message}
              register={register}
            />
          </div>
        <div className="mb-4.5 flex flex-col gap-4 md:flex-row">
          <div className="flex-grow">
            <InputGroup
              label="YouTube URL"
              type="text"
              placeholder="Enter YouTube video URL"
              className="mb-0"
              name="youtubeUrl"
              value={watch("youtubeUrl")}
              error={errors.youtubeUrl?.message}
              register={register}
            />
          </div>
          <div className="w-full md:w-32">
            <label className="mb-2.5 block text-black dark:text-white">
              Video Type
            </label>
            <Select
              value={watch("videoType")}
              onValueChange={handleVideoTypeChange}
            >
              <SelectTrigger
                className={`dark:border-form-strokedark dark:bg-form-input w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:text-white dark:focus:border-primary ${
                  errors.videoType ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="shorts">Shorts</SelectItem>
              </SelectContent>
            </Select>
            {errors.videoType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.videoType.message}
              </p>
            )}
          </div>
        </div>

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
                  {agentData.map((agent:any) => (
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

        <TextArea
          label="Video Description"
          type="textarea"
          placeholder="Enter video description"
          className="mb-4.5"
          name="description"
          value={watch("description")}
          error={errors.description?.message}
          register={register}
        />

        <div className="mt-10 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/media-center")}
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
  );
}

"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import InputGroup from "@/components/FormElements/InputGroup";
import { axiosInstance } from "@/lib/axios";
import { SocialMediaFormData, socialMediaSchema } from "@/validation/validationSchema";

const socialMediaPlatforms = ["YouTube", "LinkedIn", "Twitter", "Facebook", "Instagram"];

const AddEditSocialMediaModal = ({ isOpen, onClose, editData }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: { platform: "", url: "" }, 
  });

  useEffect(() => {
    if (editData) {
      reset(editData); 
    } else {
      reset({ platform: "", url: "" }); 
    }
  }, [editData, reset]);

  const onSubmit = async (data: SocialMediaFormData) => {
    setIsSubmitting(true);

    try {
      if (editData) {
        await axiosInstance.put(`/social-media/${editData._id}`, data);
        toast.success("Social media link updated successfully!");
      } else {
        await axiosInstance.post("/social-media", data);
        toast.success("Social media link added successfully!");
      }

      onClose();
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        editData
          ? "Failed to update social media link."
          : "Failed to add social media link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Social Media Link" : "Add Social Media Link"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Platform *
            </label>
            <select
              {...register("platform")}
              className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setValue("platform", e.target.value)}
            >
              <option value="">Select a platform</option>
              {socialMediaPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            {errors.platform && (
              <p className="mt-1 text-sm text-red-500">
                {errors.platform.message}
              </p>
            )}
          </div>

          <InputGroup
            label="URL"
            placeholder="Enter URL"
            type="text"
            name="url"
            register={register}
            error={errors.url?.message}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editData ? "Updating..." : "Submitting..."}
                </>
              ) : editData ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditSocialMediaModal;
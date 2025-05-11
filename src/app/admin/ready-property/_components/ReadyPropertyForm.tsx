"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import InputGroup from "@/components/FormElements/InputGroup"
import TextArea from "@/components/FormElements/InputGroup/text-area"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { XCircle, Loader2, Plus } from "lucide-react"
import { axiosInstance } from "@/lib/axios"
import { toast } from "react-hot-toast"
import { ShowcaseSection } from "@/components/Layouts/showcase-section"
import { useRouter } from "next/navigation"
import Image from "next/image"
import FAQInput from "./FAQInput"
import LocationSelector from "../../community/_components/locationSelect"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as LucideIcons from "lucide-react"

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
  features: z.string().min(1, "Features is required"),
  areaSize: z.string().min(1, "Area size is required"),
  oqoodAmount: z.string().min(1, "OQOOD Amount is required"),
  propertyStatus: z.string().min(1, "Property Status is required"),
  sellingPrice: z.string().min(1, "Selling price is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  landFee: z.string().min(1, "landFee date is required"),
  dlpAmount: z.string().min(1, "dlpAmount information is required"),
  propertyUsage: z.string().min(1, "Unit information is required"),
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
})

type ReadyPropertyFormData = z.infer<typeof propertySchema>

interface PropertyFormProps {
  property?: any
  propertyTypes?: any[]
  amenitiesData?: any[]
  communityData?: any[]
  agentData?: any[]
}

const ReadyPropertyForm = ({
  property = null,
  propertyTypes = [],
  amenitiesData = [],
  communityData = [],
  agentData = [],
}: PropertyFormProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const [sliderImages, setSliderImages] = useState<string[]>([])
  const [selectedSliderImages, setSelectedSliderImages] = useState<File[]>([])
  const [existingSliderImages, setExistingSliderImages] = useState<string[]>([])
  const [removedSliderImages, setRemovedSliderImages] = useState<string[]>([])

  // Downloads states
  const [selectedBrochure, setSelectedBrochure] = useState<File | null>(null)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<File | null>(null)
  const [selectedMasterPlan, setSelectedMasterPlan] = useState<File | null>(null)

  // Complex data states
  const [locationHighlights, setLocationHighlights] = useState<any>([])
  const [faqs, setFaqs] = useState<{ _id?: string; question: string; answer: string }[]>([])
  const [removedFaqIds, setRemovedFaqIds] = useState<string[]>([])

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("")
  const [selectedCommunity, setSelectedCommunity] = useState<string>("")

  // Add state for furnished checkbox
  const [isFurnished, setIsFurnished] = useState<boolean>(property?.isFurnished || false)

  const router = useRouter()
  const isEditMode = !!property

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<ReadyPropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || "",
      price: property?.price || "",
      features: property?.features || "",
      propertyStatus: property?.propertyStatus || "",
      sellingPrice: property?.sellingPrice || "",
      bedrooms: property?.bedrooms || "",
      landFee: property?.landFee || "",
      areaSize: property?.areaSize || "",
      oqoodAmount: property?.oqoodAmount || "",
      dlpAmount: property?.dlpAmount || "",
      propertyUsage: property?.propertyUsage || "",
      propertyType: property?.propertyType?._id || "",
      agentId: typeof property?.agentId === "object" ? property?.agentId?._id : property?.agentId || "",
      description: property?.description || "",
      amenities:
        property?.amenities?.map((amenity: any) => (typeof amenity === "object" ? amenity._id : amenity)) || [],
      locationDescription: property?.locationDescription || "",
      location: {
        country: property?.location?.country || "",
        latitude: property?.location?.latitude,
        longitude: property?.location?.longitude,
      },
    },
  })

  // Add these handler functions
  const handleAgentChange = (value: string) => {
    setValue("agentId", value)
  }

  useEffect(() => {
    setIsMounted(true)

    if (isEditMode) {
      // Set slider images
      if (property?.sliderImages && Array.isArray(property.sliderImages)) {
        const sliderImgPreviews = property.sliderImages.map((image: any) => {
          // Handle if image is an array or string
          if (Array.isArray(image)) {
            return image[0]
          }
          return `${image}`
        })
        setSliderImages(sliderImgPreviews)
        setExistingSliderImages(property.sliderImages)
      }
      // Set amenities
      if (property?.amenities && Array.isArray(property.amenities)) {
        const amenityIds = property.amenities.map((amenity: any) => {
          if (amenity && typeof amenity === "object" && amenity._id) {
            return String(amenity._id)
          }
          return String(amenity)
        })

        setSelectedAmenities(amenityIds)
        setValue("amenities", amenityIds)
      }

      // Set property type
      if (property?.propertyType) {
        const propertyTypeId =
          typeof property.propertyType === "object" ? property.propertyType._id : property.propertyType

        setSelectedPropertyType(propertyTypeId)
        setValue("propertyType", propertyTypeId)
      }
      if (property?.communityId) {
        const communityId = typeof property.communityId === "object" ? property.communityId._id : property.communityId
        setSelectedCommunity(communityId)
      }

      // Set location highlights
      if (property?.locationHighlights && Array.isArray(property.locationHighlights)) {
        setLocationHighlights(property.locationHighlights)
      }

      // Set FAQs
      if (property?.faqs && Array.isArray(property.faqs)) {
        setFaqs(property.faqs)
      }

      // Set furnished status
      if (property?.isFurnished !== undefined) {
        setIsFurnished(property.isFurnished)
      }
    }
  }, [isEditMode, property, setValue])

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities((prev) => {
      const newSelection = prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId]

      setValue("amenities", newSelection)
      return newSelection
    })
  }

  const handlePropertyTypeChange = (propertyTypeId: string) => {
    setSelectedPropertyType(propertyTypeId)
    setValue("propertyType", propertyTypeId)
  }
  const handleCommunityChange = (communityId: string) => {
    setSelectedCommunity(communityId)
  }

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "secondary" | "profile" | "slider",
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    // Common image validation
    const validateImage = (file: File): boolean => {
      if (file.size > 15 * 1024 * 1024) {
        setImageError("Image size should be less than 15MB")
        return false
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
      if (!validTypes.includes(file.type)) {
        setImageError("Please upload a valid image (JPEG, PNG, GIF, WEBP)")
        return false
      }

      setImageError(null)
      return true
    }

    const file = files[0]
    if (!validateImage(file)) return

    switch (type) {
      case "slider":
        const newFiles: File[] = []
        const newPreviews: string[] = []

        Array.from(files).forEach((file) => {
          if (validateImage(file)) {
            newFiles.push(file)
            newPreviews.push(URL.createObjectURL(file))
          }
        })

        setSelectedSliderImages((prev) => [...prev, ...newFiles])
        setSliderImages((prev) => [...prev, ...newPreviews])
        break
    }
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "brochure" | "floorPlan" | "masterPlan",
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size should be less than 15MB")
      return
    }

    switch (type) {
      case "brochure":
        setSelectedBrochure(file)
        break
      case "floorPlan":
        setSelectedFloorPlan(file)
        break
      case "masterPlan":
        setSelectedMasterPlan(file)
        break
    }
  }

  const removeImage = (type: "main" | "secondary" | "profile" | "slider", index?: number) => {
    switch (type) {
      case "slider":
        if (typeof index === "number") {
          if (index < existingSliderImages.length) {
            const imageToRemove = existingSliderImages[index]
            setRemovedSliderImages((prev) => [...prev, imageToRemove])
            setExistingSliderImages((prev) => {
              const updated = [...prev]
              updated.splice(index, 1)
              return updated
            })
          }

          setSliderImages((prev) => {
            const updated = [...prev]
            updated.splice(index, 1)
            return updated
          })

          if (index >= existingSliderImages.length) {
            setSelectedSliderImages((prev) => {
              const updated = [...prev]
              updated.splice(index - existingSliderImages.length, 1)
              return updated
            })
          }
        }
        break
    }
  }

  const handleAddLocationHighlight = () => {
    setLocationHighlights([...locationHighlights, { title: "", time: "", image: "" }])
  }

  const handleRemoveLocationHighlight = (index: number) => {
    setLocationHighlights(locationHighlights.filter((_: any, i: number) => i !== index))
  }

  const handleUpdateLocationHighlight = (index: number, field: any, value: string) => {
    const updatedHighlights = [...locationHighlights]
    updatedHighlights[index] = { ...updatedHighlights[index], [field]: value }
    setLocationHighlights(updatedHighlights)
  }

  const handleLocationImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Image size should be less than 15MB")
      return
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, GIF, WEBP)")
      return
    }

    // Create file preview URL and update the location highlights
    const imageUrl = URL.createObjectURL(file)
    const updatedHighlights = [...locationHighlights]
    updatedHighlights[index] = {
      ...updatedHighlights[index],
      image: imageUrl,
      imageFile: file, // Store the file object for form submission
    }
    setLocationHighlights(updatedHighlights)
  }

  const onSubmit = async (data: ReadyPropertyFormData) => {
    if (selectedCommunity.length === 0) {
      toast.error("At least one community should be selected")
      return
    }
    if (selectedAmenities.length === 0) {
      toast.error("At least one amenity should be selected")
      return
    }
    if (!isEditMode && sliderImages.length === 0) {
      toast.error("At least one slider image is required")
      return
    }

    if (!selectedPropertyType) {
      toast.error("Property type must be selected")
      return
    }

    if (locationHighlights.length > 0) {
      const locationHighlightsValid = locationHighlights.every(
        (highlight: any) =>
          highlight.title.trim() !== "" && highlight.time.trim() !== "" && (highlight.image ? true : false),
      )

      if (!locationHighlightsValid) {
        toast.error("All location highlights must have title, travel time, and valid image (max 5MB)")
        return
      }
    }
    if (!(selectedBrochure || selectedFloorPlan || selectedMasterPlan)) {
      if (!(property?.downloads?.brochure || property?.downloads?.floorPlan || property?.downloads?.masterPlan)) {
        toast.error("Upload at least one Download")
        return
      }
    }
    if (faqs?.length === 0) {
      toast.error("At least one FAQ is required")
      return
    }

    setIsSubmitting(true)
    setImageError(null)

    try {
      const formDataToSend = new FormData()

      // Add basic fields
      formDataToSend.append("title", data.title)
      formDataToSend.append("price", data.price)
      formDataToSend.append("features", data.features)
      formDataToSend.append("sellingPrice", data.sellingPrice)
      formDataToSend.append("bedrooms", data.bedrooms)
      formDataToSend.append("landFee", data.landFee)
      formDataToSend.append("areaSize", data.areaSize)
      formDataToSend.append("oqoodAmount", data.oqoodAmount)
      formDataToSend.append("dlpAmount", data.dlpAmount)
      formDataToSend.append("propertyUsage", data.propertyUsage)
      formDataToSend.append("propertyType", selectedPropertyType)
      formDataToSend.append("agentId", data.agentId as any)
      formDataToSend.append("communityId", selectedCommunity)
      formDataToSend.append("description", data.description)
      formDataToSend.append("locationDescription", data.locationDescription)
      formDataToSend.append("country", data.location.country)

      if ("latitude" in data.location && typeof data.location.latitude === "number") {
        formDataToSend.append("latitude", data.location.latitude.toString())
      }
      if ("longitude" in data.location && typeof data.location.longitude === "number") {
        formDataToSend.append("longitude", data.location.longitude.toString())
      }

      // Add isFurnished value from checkbox
      formDataToSend.append("isFurnished", isFurnished.toString())

      // Add amenities
      selectedAmenities.forEach((amenityId) => {
        formDataToSend.append("amenities[]", amenityId)
      })

      if (isEditMode) {
        if (existingSliderImages.length > 0) {
          const normalizedImages = existingSliderImages.flat().filter((img) => typeof img === "string")
          formDataToSend.append("existingSliderImages", JSON.stringify(normalizedImages))
        }

        selectedSliderImages.forEach((file) => {
          formDataToSend.append("sliderImages", file)
        })
      } else {
        selectedSliderImages.forEach((file) => {
          formDataToSend.append("sliderImages", file)
        })
      }

      // Add download files
      if (selectedBrochure) {
        formDataToSend.append("brochure", selectedBrochure)
      }

      if (selectedFloorPlan) {
        formDataToSend.append("floorPlan", selectedFloorPlan)
      }

      if (selectedMasterPlan) {
        formDataToSend.append("masterPlan", selectedMasterPlan)
      }

      // Add location highlights
      formDataToSend.append(
        "locationHighlights",
        JSON.stringify(locationHighlights.map(({ imageFile, ...highlight }: any) => highlight)),
      )

      // Add location highlight images
      locationHighlights.forEach((highlight: any, index: number) => {
        if (highlight.imageFile) {
          formDataToSend.append(`locationImages_${index}`, highlight.imageFile)
        }
      })

      // Add FAQs
      faqs?.forEach((faq, index) => {
        if (faq._id) {
          formDataToSend.append(`faqs[${index}][_id]`, faq._id)
        }
        formDataToSend.append(`faqs[${index}][question]`, faq.question)
        formDataToSend.append(`faqs[${index}][answer]`, faq.answer)
      })

      // Add removed FAQ IDs if in edit mode
      if (isEditMode && removedFaqIds.length > 0) {
        removedFaqIds.forEach((id) => {
          formDataToSend.append("removedFaqIds", id)
        })
      }

      if (isEditMode) {
        await axiosInstance.put(`/ready-property/${property._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Property updated successfully!")
      } else {
        await axiosInstance.post("/ready-property", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Property added successfully!")
      }

      router.push("/admin/ready-property")
      router.refresh()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(
        isEditMode ? "Failed to update property. Please try again." : "Failed to add property. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

            <div className="col-span-full">
              <>
                <label className="mb-2.5 block text-black dark:text-white">Select Agent</label>
                <Select value={watch("agentId") || ""} onValueChange={handleAgentChange}>
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
                {errors.agentId && <p className="mt-1 text-sm text-red-500">{errors.agentId.message}</p>}
              </>
            </div>
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
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Features"
              placeholder="Enter Features"
              type="text"
              name="features"
              value={watch("features")}
              handleChange={() => {}}
              register={register}
              error={errors.features?.message}
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

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputGroup
              label="Property status"
              placeholder="Enter Property status"
              type="text"
              name="propertyStatus"
              value={watch("propertyStatus")}
              handleChange={() => {}}
              register={register}
              error={errors.propertyStatus?.message}
            />
            <InputGroup
              label="Selling price"
              placeholder="Enter Selling price details"
              type="text"
              name="sellingPrice"
              value={watch("sellingPrice")}
              handleChange={() => {}}
              register={register}
              error={errors.sellingPrice?.message}
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
              label="Land fee"
              placeholder="Enter Land fee"
              type="text"
              name="landFee"
              value={watch("landFee")}
              handleChange={() => {}}
              register={register}
              error={errors.landFee?.message}
            />
            <InputGroup
              label="OQOOD Amount"
              placeholder="Enter OQOOD amount"
              type="text"
              name="oqoodAmount"
              value={watch("oqoodAmount")}
              handleChange={() => {}}
              register={register}
              error={errors.oqoodAmount?.message}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <InputGroup
              label="dlpAmount"
              placeholder="Enter dlpAmount name"
              type="text"
              name="dlpAmount"
              value={watch("dlpAmount")}
              handleChange={() => {}}
              register={register}
              error={errors.dlpAmount?.message}
            />
            <InputGroup
              label="Unit"
              placeholder="Enter propertyUsage details"
              type="text"
              name="propertyUsage"
              value={watch("propertyUsage")}
              handleChange={() => {}}
              register={register}
              error={errors.propertyUsage?.message}
            />
            <div className="space-y-2">
              <label className="text-body-sm font-medium text-dark dark:text-white">
                Property Type <span className="ml-1 select-none text-red">*</span>
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

              {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType.message}</p>}
            </div>
          </div>

          {/* Add Furnished Checkbox */}
          <div className="mt-6 flex items-center space-x-2">
            <Checkbox
              id="isFurnished"
              checked={isFurnished}
              onCheckedChange={(checked) => setIsFurnished(checked === true)}
            />
            <label htmlFor="isFurnished" className="text-sm font-medium leading-none text-white cursor-pointer">
              Fully Furnished
            </label>
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
          <h2 className="mb-4 text-xl font-semibold text-white">Property Images</h2>

          {/* Slider Images */}
          <div className="mb-6">
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Slider Images</label>
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
                      src={image || "/placeholder.svg"}
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

        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-gray-5">Amenities</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {amenitiesData.map((amenity) => {
              const Icon = LucideIcons[amenity.iconName as keyof typeof LucideIcons] as React.ComponentType<any>

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
                      <Icon size={36} className="text-gray-700 dark:text-gray-500" />
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
              )
            })}
          </div>

          {/* Error message */}
          {errors.amenities && <p className="mt-2 text-sm text-red-500">{errors.amenities.message}</p>}
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
              <h3 className="text-lg font-medium text-white">Location Highlights</h3>
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
              <div key={index} className="mb-4 rounded-lg border border-gray-700 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-md font-medium text-white">Highlight {index + 1}</h4>
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
                    handleChange={(e) => handleUpdateLocationHighlight(index, "title", e.target.value)}
                    register={() => {}}
                  />
                  <InputGroup
                    label="Travel Time"
                    placeholder="Enter travel time"
                    type="text"
                    name={`locationHighlight-${index}-time`}
                    value={highlight.time}
                    handleChange={(e) => handleUpdateLocationHighlight(index, "time", e.target.value)}
                    register={() => {}}
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLocationImageChange(index, e)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {highlight.image && (
                    <div className="mt-2">
                      <Image
                        src={highlight.image || "/placeholder.svg"}
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

        {/* Downloads */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Downloads</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Brochure</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "brochure")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {property?.downloads.brochure && (
                <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                  Current file: {property.downloads.brochure}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Floor Plan</label>
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
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Master Plan</label>
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
              setFaqs(updatedFaqs)
              if (removedIds) {
                setRemovedFaqIds(removedIds)
              }
            }}
            initialFaqs={property?.faqs || []}
          />
        </ShowcaseSection>

        <div className="mt-10 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/ready-property")}
            className="w-1/2 py-6 text-lg"
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting} className="w-1/2 py-6 text-lg text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Submitting..."}
              </>
            ) : (
              <>{isEditMode ? "Update Ready Property" : "Add Ready Property"}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReadyPropertyForm

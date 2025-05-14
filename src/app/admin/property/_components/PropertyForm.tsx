"use client"
import { useState, useEffect } from "react"
import type React from "react"

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
import * as LucideIcons from "lucide-react"
import FeatureInput from "./features"

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.string().min(1, "Price is required"),
  paymentPlan: z.string().min(1, "Payment plan is required"),
  handover: z.string().min(1, "Handover date is required"),
  paymentStructure: z.string().min(1, "Payment Structure information is required"),
  downPayment: z.string().min(1, "Down payment information is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  area: z.string().min(1, "Area size is required"),
  developer: z.string().min(1, "Developer information is required"),
  unit: z.string().min(1, "Unit information is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  paymentDescription: z.string().min(1, "Payment description is required"),
  bookingPercentage: z.string().min(1, "Booking percentage is required"),
  constructionPercentage: z.string().min(1, "Construction percentage is required"),
  handOverPercentage: z.string().min(1, "Handover percentage is required"),
  locationDescription: z.string().min(1, "Location description is required"),
  location: z.object({
    country: z.string().min(1, "Please select a location"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  isAffordable: z.boolean().optional(),
  isLuxury: z.boolean().optional(),
  isExclusive: z.boolean().optional(),
  development: z.object({
    title1: z.string().min(1, "Development title 1 is required"),
    title2: z.string().min(1, "Development title 2 is required"),
    title3: z.string().min(1, "Development title 3 is required"),
  }),
})

type PropertyFormData = z.infer<typeof propertySchema>

interface LocationHighlight {
  _id?: string
  title: string
  time: string
  image: string
}

interface PropertyFormProps {
  property?: any
  amenitiesData?: any[]
}

const PropertyForm = ({ property = null, amenitiesData = [] }: PropertyFormProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  // Image states
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null)
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null)

  const [secondaryImagePreview, setSecondaryImagePreview] = useState<string | null>(null)
  const [selectedSecondaryImage, setSelectedSecondaryImage] = useState<File | null>(null)

  const [sliderImages, setSliderImages] = useState<string[]>([])
  const [selectedSliderImages, setSelectedSliderImages] = useState<File[]>([])
  const [existingSliderImages, setExistingSliderImages] = useState<string[]>([])
  const [removedSliderImages, setRemovedSliderImages] = useState<string[]>([])

  // Document states
  const [brochureFile, setBrochureFile] = useState<File | null>(null)
  const [brochureImageFile, setBrochureImageFile] = useState<File | null>(null)
  const [brochureImagePreview, setBrochureImagePreview] = useState<string | null>(null)

  const [priceListFile, setPriceListFile] = useState<File | null>(null)
  const [priceListImageFile, setPriceListImageFile] = useState<File | null>(null)
  const [priceListImagePreview, setPriceListImagePreview] = useState<string | null>(null)

  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [paymentImageFile, setPaymentImageFile] = useState<File | null>(null)
  const [paymentImagePreview, setPaymentImagePreview] = useState<string | null>(null)
// console.log(priceListFile,  brochureImageFile, paymentImageFile, "checking this",paymentFile, "checking this")
  // Development images
  const [developmentImage1File, setDevelopmentImage1File] = useState<File | null>(null)
  const [developmentImage1Preview, setDevelopmentImage1Preview] = useState<string | null>(null)
  const [developmentImage2File, setDevelopmentImage2File] = useState<File | null>(null)
  const [developmentImage2Preview, setDevelopmentImage2Preview] = useState<string | null>(null)

  // Complex data states
  const [locationHighlights, setLocationHighlights] = useState<any>([])
  const [faqs, setFaqs] = useState<{ _id?: string; question: string; answer: string }[]>([])
  const [removedFaqIds, setRemovedFaqIds] = useState<string[]>([])

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])

  const router = useRouter()
  const isEditMode = !!property



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
      handover: property?.handover || "",
      paymentStructure: property?.paymentStructure || "",
      downPayment: property?.downPayment || "",
      bedrooms: property?.bedrooms || "",
      area: property?.area || "",
      developer: property?.developer || "",
      unit: property?.unit || "",
      description: property?.description || "",
      features: property?.features?.map((feature: any) => (typeof feature === "object" ? feature._id : feature)) || [],
      amenities:
        property?.amenities?.map((amenity: any) => (typeof amenity === "object" ? amenity._id : amenity)) || [],
      paymentDescription: property?.paymentDescription || "",
      bookingPercentage: property?.bookingPercentage || "",
      constructionPercentage: property?.constructionPercentage || "",
      handOverPercentage: property?.handOverPercentage || "",
      locationDescription: property?.locationDescription || "",
      location: {
        country: property?.location?.country || "",
        latitude: property?.location?.latitude,
        longitude: property?.location?.longitude,
      },
      isAffordable: property?.isAffordable || false,
      isLuxury: property?.isLuxury || false,
      isExclusive: property?.isExclusive || false,
      development: {
        title1: property?.development?.title1 || "",
        title2: property?.development?.title2 || "",
        title3: property?.development?.title3 || "",
      },
    },
  })

  useEffect(() => {
    setIsMounted(true)

    if (isEditMode) {
      if (property?.mainImage) {
        setMainImagePreview(`${property.mainImage}`)
      }

      if (property?.secondaryImage) {
        setSecondaryImagePreview(`${property.secondaryImage}`)
      }

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

      // Set document previews
      if (property?.brochure?.image) {
        setBrochureImagePreview(`${property.brochure.image}`)
      }

      if (property?.priceList?.image) {
        setPriceListImagePreview(`${property.priceList.image}`)
      }

      if (property?.payment?.image) {
        setPaymentImagePreview(`${property.payment.image}`)
      }

      // Set development images
      if (property?.development?.image1) {
        setDevelopmentImage1Preview(`${property.development.image1}`)
      }

      if (property?.development?.image2) {
        setDevelopmentImage2Preview(`${property.development.image2}`)
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

      // Set features
      if (property?.features && Array.isArray(property.features)) {
        const featureValues = property.features.map((feature: any) => {
          if (feature && typeof feature === "object" && feature.title) {
            return feature.title
          }
          return String(feature)
        })
        setFeatures(featureValues)
      }

      // Set property type

      // Set location highlights
      if (property?.locationHighlights && Array.isArray(property.locationHighlights)) {
        setLocationHighlights(property.locationHighlights)
      }

      // Set FAQs
      if (property?.faqs && Array.isArray(property.faqs)) {
        setFaqs(property.faqs)
      }

      // Set boolean values
      if (property?.isAffordable !== undefined) {
        setValue("isAffordable", property.isAffordable)
      }

      if (property?.isLuxury !== undefined) {
        setValue("isLuxury", property.isLuxury)
      }

      if (property?.isExclusive !== undefined) {
        setValue("isExclusive", property.isExclusive)
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

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type:
      | "main"
      | "secondary"
      | "slider"
      | "brochureImage"
      | "priceListImage"
      | "paymentImage"
      | "developmentImage1"
      | "developmentImage2",
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
      case "main":
        setMainImagePreview(URL.createObjectURL(file))
        setSelectedMainImage(file)
        break
      case "secondary":
        setSecondaryImagePreview(URL.createObjectURL(file))
        setSelectedSecondaryImage(file)
        break
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
      case "brochureImage":
        setBrochureImagePreview(URL.createObjectURL(file))
        setBrochureImageFile(file)
        break
      case "priceListImage":
        setPriceListImagePreview(URL.createObjectURL(file))
        setPriceListImageFile(file)
        break
      case "paymentImage":
        setPaymentImagePreview(URL.createObjectURL(file))
        setPaymentImageFile(file)
        break
      case "developmentImage1":
        setDevelopmentImage1Preview(URL.createObjectURL(file))
        setDevelopmentImage1File(file)
        break
      case "developmentImage2":
        setDevelopmentImage2Preview(URL.createObjectURL(file))
        setDevelopmentImage2File(file)
        break
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "brochure" | "priceList" | "payment") => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size should be less than 15MB")
      return
    }

    switch (type) {
      case "brochure":
        setBrochureFile(file)
        break
      case "priceList":
        setPriceListFile(file)
        break
      case "payment":
        setPaymentFile(file)
        break
    }
  }

  const removeImage = (
    type:
      | "main"
      | "secondary"
      | "slider"
      | "brochureImage"
      | "priceListImage"
      | "paymentImage"
      | "developmentImage1"
      | "developmentImage2",
    index?: number,
  ) => {
    switch (type) {
      case "main":
        setMainImagePreview(null)
        setSelectedMainImage(null)
        break
      case "secondary":
        setSecondaryImagePreview(null)
        setSelectedSecondaryImage(null)
        break
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
      case "brochureImage":
        setBrochureImagePreview(null)
        setBrochureImageFile(null)
        break
      case "priceListImage":
        setPriceListImagePreview(null)
        setPriceListImageFile(null)
        break
      case "paymentImage":
        setPaymentImagePreview(null)
        setPaymentImageFile(null)
        break
      case "developmentImage1":
        setDevelopmentImage1Preview(null)
        setDevelopmentImage1File(null)
        break
      case "developmentImage2":
        setDevelopmentImage2Preview(null)
        setDevelopmentImage2File(null)
        break
    }
  }

  const handleAddLocationHighlight = () => {
    setLocationHighlights([...locationHighlights, { title: "", time: "", image: "" }])
  }

  const handleRemoveLocationHighlight = (index: number) => {
    setLocationHighlights(locationHighlights.filter((_: any, i: any) => i !== index))
  }

  const handleUpdateLocationHighlight = (index: number, field: keyof LocationHighlight, value: string) => {
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

  const handleCheckboxChange = (field: "isAffordable" | "isLuxury" | "isExclusive") => {
    setValue(field, !watch(field))
  }

  // console.log("Form data:", data);
console.log("Validation errors:", errors);
console.log("Selected amenities:", selectedAmenities);
console.log("Features:", features);

  const onSubmit = async (data: any) => {
    console.log(data, "checking this ")
    console.log("Validation errors:", errors); // Log all validation errors

    if (selectedAmenities.length === 0) {
      toast.error("At least one amenity should be selected")
      return
    }
    if (features.length === 0) {
      toast.error("At least one feature is required")
      return
    }

    if (!isEditMode && !selectedMainImage) {
      toast.error("Main image is required")
      return
    }
    if (!isEditMode && !selectedSecondaryImage) {
      toast.error("Secondary image is required")
      return
    }
    if (!isEditMode && sliderImages.length === 0) {
      toast.error("At least one slider image is required")
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

    if (faqs.length === 0) {
      toast.error("At least one FAQ is required")
      return
    }

    // Validate development section
    if (!data.development.title1 || !data.development.title2 || !data.development.title3) {
      toast.error("All development titles are required")
      return
    }

    if (!isEditMode && (!developmentImage1Preview || !developmentImage2Preview)) {
      toast.error("Both development images are required")
      return
    }

    setIsSubmitting(true)
    setImageError(null)

    try {
      const formDataToSend = new FormData()

      // Add basic fields
      formDataToSend.append("title", data.title)
      formDataToSend.append("price", data.price)
      formDataToSend.append("paymentPlan", data.paymentPlan)
      formDataToSend.append("handover", data.handover)
      formDataToSend.append("paymentStructure", data.paymentStructure)
      formDataToSend.append("downPayment", data.downPayment)
      formDataToSend.append("bedrooms", data.bedrooms)
      formDataToSend.append("area", data.area)
      formDataToSend.append("developer", data.developer)
      formDataToSend.append("unit", data.unit)
      formDataToSend.append("description", data.description)
      formDataToSend.append("locationDescription", data.locationDescription)
      formDataToSend.append("country", data.location.country)
      formDataToSend.append("paymentDescription", data.paymentDescription)
      formDataToSend.append("bookingPercentage", data.bookingPercentage)
      formDataToSend.append("constructionPercentage", data.constructionPercentage)
      formDataToSend.append("handOverPercentage", data.handOverPercentage)
      formDataToSend.append("isAffordable", data.isAffordable ? "true" : "false")
      formDataToSend.append("isLuxury", data.isLuxury ? "true" : "false")
      formDataToSend.append("isExclusive", data.isExclusive ? "true" : "false")

      // Development titles
      formDataToSend.append("development[title1]", data.development.title1)
      formDataToSend.append("development[title2]", data.development.title2)
      formDataToSend.append("development[title3]", data.development.title3)

      if ("latitude" in data.location && typeof data.location.latitude === "number") {
        formDataToSend.append("latitude", data.location.latitude.toString())
      }
      if ("longitude" in data.location && typeof data.location.longitude === "number") {
        formDataToSend.append("longitude", data.location.longitude.toString())
      }

      // Add amenities and features
      selectedAmenities.forEach((amenityId) => {
        formDataToSend.append("amenities[]", amenityId)
      })

      // Add features
      features.forEach((feature) => {
        formDataToSend.append("features[]", feature)
      })

      // Add images
      if (selectedMainImage) {
        formDataToSend.append("mainImage", selectedMainImage)
      }

      if (selectedSecondaryImage) {
        formDataToSend.append("secondaryImage", selectedSecondaryImage)
      }

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

      // Add document files and images
      if (brochureFile) {
        formDataToSend.append("brochure[url]", brochureFile)
      }
      if (brochureImageFile) {
        formDataToSend.append("brochure[image]", brochureImageFile)
      }

      if (priceListFile) {
        formDataToSend.append("priceList[url]", priceListFile)
      }
      if (priceListImageFile) {
        formDataToSend.append("priceList[image]", priceListImageFile)
      }

      if (paymentFile) {
        formDataToSend.append("payment[url]", paymentFile)
      }
      if (paymentImageFile) {
        formDataToSend.append("payment[image]", paymentImageFile)
      }

      // Add development images
      if (developmentImage1File) {
        formDataToSend.append("development[image1]", developmentImage1File)
      }
      if (developmentImage2File) {
        formDataToSend.append("development[image2]", developmentImage2File)
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
      faqs.forEach((faq, index) => {
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
        // Update existing property
        await axiosInstance.put(`/property/${property._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Property updated successfully!")
      } else {
        // Create new property
        await axiosInstance.post("/property", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Property added successfully!")
      }

      // Redirect to properties list page
      router.push("/admin/property")
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
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
              label="Booking Percentage"
              placeholder="Enter booking percentage"
              type="text"
              name="bookingPercentage"
              value={watch("bookingPercentage")}
              handleChange={() => {}}
              register={register}
              error={errors.bookingPercentage?.message}
            />
            <InputGroup
              label="Construction Percentage"
              placeholder="Enter construction percentage"
              type="text"
              name="constructionPercentage"
              value={watch("constructionPercentage")}
              handleChange={() => {}}
              register={register}
              error={errors.constructionPercentage?.message}
            />
            <InputGroup
              label="Handover Percentage"
              placeholder="Enter handover percentage"
              type="text"
              name="handOverPercentage"
              value={watch("handOverPercentage")}
              handleChange={() => {}}
              register={register}
              error={errors.handOverPercentage?.message}
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
              label="Area"
              placeholder="Enter area size"
              type="text"
              name="area"
              value={watch("area")}
              handleChange={() => {}}
              register={register}
              error={errors.area?.message}
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

          <div className="mt-4">
            <TextArea
              type="text"
              label="Payment Description"
              placeholder="Enter payment description"
              name="paymentDescription"
              value={watch("paymentDescription")}
              handleChange={() => {}}
              register={register}
              error={errors.paymentDescription?.message}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAffordable"
                checked={watch("isAffordable")}
                onCheckedChange={() => handleCheckboxChange("isAffordable")}
              />
              <label
                htmlFor="isAffordable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
              >
                Is Affordable
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isLuxury"
                checked={watch("isLuxury")}
                onCheckedChange={() => handleCheckboxChange("isLuxury")}
              />
              <label
                htmlFor="isLuxury"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
              >
                Is Luxury
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isExclusive"
                checked={watch("isExclusive")}
                onCheckedChange={() => handleCheckboxChange("isExclusive")}
              />
              <label
                htmlFor="isExclusive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
              >
                Is Exclusive
              </label>
            </div>
          </div>
        </ShowcaseSection>

        {/* Property Images */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Property Images</h2>

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
                    src={mainImagePreview || "/placeholder.svg"}
                    alt="Main Image Preview"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("main")}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}
            </div>
            {imageError && <p className="mt-1 text-sm text-red-500">{imageError}</p>}
          </div>

          {/* Secondary Image */}
          <div className="mb-6">
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
              Secondary Image <span className="ml-1 select-none text-red">*</span>
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
                    src={secondaryImagePreview || "/placeholder.svg"}
                    alt="Secondary Image Preview"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("secondary")}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Slider Images */}
          <div className="mb-6">
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
              Slider Images <span className="ml-1 select-none text-red">*</span>
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
                      src={image || "/placeholder.svg"}
                      alt={`Slider Image ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("slider", index)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Amenities */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Amenities</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {amenitiesData.map((amenity) => {
              const Icon = LucideIcons[amenity.iconName as keyof typeof LucideIcons] as React.ComponentType<any>

              return (
                <div
                  key={amenity._id}
                  className="relative flex flex-col items-center justify-center rounded-lg border border-gray-500 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                >
                  <Checkbox
                    id={`amenity-${amenity._id}`}
                    className="absolute right-2 top-2"
                    checked={selectedAmenities.includes(amenity._id)}
                    onCheckedChange={() => handleAmenityChange(amenity._id)}
                  />

                  <div className="mb-3">
                    {Icon ? (
                      <Icon size={36} className="text-gray-700 dark:text-gray-500" />
                    ) : (
                      <span className="text-gray-500">❓</span>
                    )}
                  </div>

                  <label
                    htmlFor={`amenity-${amenity._id}`}
                    className="text-center text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    {amenity.title}
                  </label>
                </div>
              )
            })}
          </div>

          {errors.amenities && <p className="mt-2 text-sm text-red-500">{errors.amenities.message}</p>}
        </ShowcaseSection>

        {/* Features */}
        <ShowcaseSection>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Features</h2>
          </div>

          <FeatureInput
            onFeatureChange={(updatedFeatures:any) => {
              setFeatures(updatedFeatures)
              setValue("features", updatedFeatures)
            }}
            initialFeatures={features}
          />

          {errors.features && <p className="mt-2 text-sm text-red-500">{errors.features.message}</p>}
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

        {/* Documents */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Documents</h2>

          {/* Brochure */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-white">Brochure</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Brochure File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "brochure")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {property?.brochure?.url && (
                  <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                    Current file: {property.brochure.url}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Brochure Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "brochureImage")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {brochureImagePreview && (
                  <div className="relative mt-2 w-full max-w-[200px]">
                    <Image
                      src={brochureImagePreview || "/placeholder.svg"}
                      alt="Brochure Image Preview"
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("brochureImage")}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price List */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-white">Price List</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Price List File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "priceList")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {property?.priceList?.url && (
                  <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                    Current file: {property.priceList.url}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                  Price List Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "priceListImage")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {priceListImagePreview && (
                  <div className="relative mt-2 w-full max-w-[200px]">
                    <Image
                      src={priceListImagePreview || "/placeholder.svg"}
                      alt="Price List Image Preview"
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("priceListImage")}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-white">Payment</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Payment File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "payment")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {property?.payment?.url && (
                  <p className="mt-2 max-w-xl overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-300">
                    Current file: {property.payment.url}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">Payment Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "paymentImage")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {paymentImagePreview && (
                  <div className="relative mt-2 w-full max-w-[200px]">
                    <Image
                      src={paymentImagePreview || "/placeholder.svg"}
                      alt="Payment Image Preview"
                      width={200}
                      height={150}
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("paymentImage")}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Development */}
        <ShowcaseSection>
          <h2 className="mb-4 text-xl font-semibold text-white">Development</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <InputGroup
                label="Title 1"
                placeholder="Enter development title 1"
                type="text"
                name="development.title1"
                value={watch("development.title1")}
                handleChange={() => {}}
                register={register}
                error={errors.development?.title1?.message}
              />
            </div>
            <div>
              <InputGroup
                label="Title 2"
                placeholder="Enter development title 2"
                type="text"
                name="development.title2"
                value={watch("development.title2")}
                handleChange={() => {}}
                register={register}
                error={errors.development?.title2?.message}
              />
            </div>
          </div>

          <div className="mt-4">
            <InputGroup
              label="Title 3"
              placeholder="Enter development title 3"
              type="text"
              name="development.title3"
              value={watch("development.title3")}
              handleChange={() => {}}
              register={register}
              error={errors.development?.title3?.message}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Development Image 1
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "developmentImage1")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {developmentImage1Preview && (
                <div className="relative mt-2 w-full max-w-[200px]">
                  <Image
                    src={developmentImage1Preview || "/placeholder.svg"}
                    alt="Development Image 1 Preview"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("developmentImage1")}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Development Image 2
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "developmentImage2")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {developmentImage2Preview && (
                <div className="relative mt-2 w-full max-w-[200px]">
                  <Image
                    src={developmentImage2Preview || "/placeholder.svg"}
                    alt="Development Image 2 Preview"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("developmentImage2")}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
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
            onClick={() => router.push("/admin/property")}
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
              <>{isEditMode ? "Update Property" : "Add Property"}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm

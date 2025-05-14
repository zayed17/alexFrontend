"use client"

import React from "react"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import InputGroup from "@/components/FormElements/InputGroup"

interface FeatureInputProps {
  onFeatureChange: (updatedFeatures: string[]) => void
  initialFeatures?: string[]
}

const FeatureInput: React.FC<FeatureInputProps> = ({ onFeatureChange, initialFeatures = [] }) => {
  const [features, setFeatures] = React.useState<string[]>(initialFeatures)

  React.useEffect(() => {
    if (initialFeatures.length > 0) {
      setFeatures(initialFeatures)
    }
  }, [initialFeatures])

  const handleAddFeature = () => {
    const updatedFeatures = [...features, ""]
    setFeatures(updatedFeatures)
    onFeatureChange(updatedFeatures)
  }

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
    onFeatureChange(updatedFeatures)
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
    onFeatureChange(updatedFeatures)
  }

  return (
    <div className="space-y-4">
      {features.length === 0 && (
        <p className="text-center text-gray-400">No features added yet. Click "Add Feature" to add one.</p>
      )}

      {features.map((feature, index) => (
        <div key={index} className="rounded-lg border border-gray-700 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-md font-medium text-white">Feature {index + 1}</h4>
            <Button type="button" onClick={() => handleRemoveFeature(index)} variant="destructive" size="sm">
              <XCircle size={16} />
            </Button>
          </div>

          <InputGroup
            label="Feature"
            placeholder="Enter feature"
            type="text"
            name={`feature-${index}`}
            value={feature}
            handleChange={(e) => handleFeatureChange(index, e.target.value)}
            register={() => {}}
          />
        </div>
      ))}

      <div className="flex justify-center">
        <Button type="button" onClick={handleAddFeature} variant="outline" className="flex items-center gap-2">
          <span>Add Feature</span>
        </Button>
      </div>
    </div>
  )
}

export default FeatureInput

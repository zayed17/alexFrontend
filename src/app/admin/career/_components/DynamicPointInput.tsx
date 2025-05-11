import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import InputGroup from "@/components/FormElements/InputGroup";
import { UseFormSetValue } from "react-hook-form";

type DynamicPointInputProps = {
  points: string[];
  setPoints: (points: string[]) => void;
  setValue: UseFormSetValue<any>;
  fieldName: string;  
  error?: string;
};

const DynamicPointInput: React.FC<DynamicPointInputProps> = ({ 
  points, 
  setPoints, 
  setValue, 
  fieldName,
  error 
}) => {
  const [newPoint, setNewPoint] = useState("");

  const addPoint = () => {
    if (newPoint.trim()) {
      const updatedPoints = [...points.filter(Boolean), newPoint.trim()];
      setPoints(updatedPoints);
      setValue(fieldName, updatedPoints);  
      setNewPoint("");
    }
  };

  const removePoint = (index: number) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setPoints(updatedPoints);
    setValue(fieldName, updatedPoints);  
  };

  useEffect(() => {
    setValue(fieldName, points);  
  }, [points, setValue, fieldName]);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex-1">
          <InputGroup
            placeholder="Enter a point"
            type="text"
            value={newPoint}
            handleChange={(e) => setNewPoint(e.target.value)}
            className="w-full"
            error={error} 
          />
        </div>
        <Button type="button" onClick={addPoint} className="shrink-0 sm:w-auto w-full py-6 mt-3">
          Add
        </Button>
      </div>

      <ul className="space-y-2">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <span className="flex-1 break-words">{point}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => removePoint(index)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicPointInput;

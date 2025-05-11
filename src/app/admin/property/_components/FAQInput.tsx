import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import InputGroup from "@/components/FormElements/InputGroup";

interface FAQ {
  _id?: string; // Added _id for existing FAQs
  question: string;
  answer: string;
}

interface FAQInputProps {
  onFAQChange: (faqs: FAQ[], removedFaqIds?: string[]) => void;
  initialFaqs?: FAQ[];
}

const FAQInput = ({ onFAQChange, initialFaqs = [] }: FAQInputProps) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [removedFaqIds, setRemovedFaqIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqs(initialFaqs);
    }
  }, [initialFaqs]);

  const handleAddFAQ = () => {
    if (currentQuestion.trim() && currentAnswer.trim()) {
      const newFAQ: FAQ = {
        question: currentQuestion,
        answer: currentAnswer,
      };
      const updatedFAQs = [...faqs, newFAQ];
      setFaqs(updatedFAQs);
      onFAQChange(updatedFAQs, removedFaqIds);
      setCurrentQuestion("");
      setCurrentAnswer("");
      setError(null);
    } else {
      setError("Both question and answer are required");
    }
  };

  const handleRemoveFAQ = (index: number) => {
    const faqToRemove = faqs[index];
    const updatedFAQs = faqs.filter((_, i) => i !== index);

    if (faqToRemove._id) {
      setRemovedFaqIds([...removedFaqIds, faqToRemove._id]);
    }

    setFaqs(updatedFAQs);
    onFAQChange(
      updatedFAQs,
      faqToRemove._id ? [...removedFaqIds, faqToRemove._id] : removedFaqIds,
    );

    if (updatedFAQs.length === 0) {
      setError("At least one FAQ is required");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <InputGroup
          label="Question"
          placeholder="Enter question"
          type="text"
          value={currentQuestion}
          handleChange={(e) => setCurrentQuestion(e.target.value)}
        />
        <InputGroup
          label="Answer"
          placeholder="Enter answer"
          type="text"
          value={currentAnswer}
          handleChange={(e) => setCurrentAnswer(e.target.value)}
        />
        <Button type="button" onClick={handleAddFAQ}>
          Add FAQ
        </Button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded border border-gray-600 p-3"
        >
          <div>
            <p className="font-medium text-white">
              {index + 1}. Question: {faq.question}
            </p>
            <p className="text-sm text-white">Answer: {faq.answer}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleRemoveFAQ(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FAQInput;

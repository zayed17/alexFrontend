"use client";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { Suspense, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialMediaList from "./_components/SocialMediaList";
import AddEditSocialMediaModal from "./_components/AddEditSocialMediaModal"; // Import the modal component
import { getSocialMedia } from "@/api/api";
const socialMedia = await getSocialMedia();

export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null); // State to hold data for editing

  const handleOpenModal = (data = null) => {
    setEditData(data); // Set edit data if editing
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null); 
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="default"
          size="sm"
          className="text-white"
          onClick={() => handleOpenModal()} 
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add Social Media
          </span>
        </Button>
      </div>
      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <SocialMediaList data={socialMedia} onEdit={handleOpenModal} /> 
        </Suspense>
      </div>

      <AddEditSocialMediaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={editData} 
      />
    </div>
  );
}
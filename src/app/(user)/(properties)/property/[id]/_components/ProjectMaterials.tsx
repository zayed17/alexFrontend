"use client";
import Image from "next/image";
import { Download } from "lucide-react";

interface MaterialItem {
  id: string;
  title: string;
  image: string;
  downloadUrl: string;
}

interface ProjectMaterialsProps {
  materials: MaterialItem[];
}

const ProjectMaterials = ({ materials }: ProjectMaterialsProps) => {
  return (
    <div className="containers w-full bg-white">
      <div className="mx-auto">
        {/* Section Title */}
        <h2 className="mb-8 font-serif text-3xl text-gray-900 md:mb-10">
          Project Materials
        </h2>

        {/* Materials Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title and Download Link */}
              <div className="flex items-center justify-between bg-[#F8F8F8] p-4">
                <div className="flex flex-col">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <span className="mr-1 text-sm cursor-pointer underline">Download</span>
                </div>
                <a
                  href={item.downloadUrl}
                  download
                  className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
                >
                  <Download size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectMaterials;

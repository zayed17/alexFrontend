"use client";

import Image from "next/image";
import { useState } from "react";

interface ExpertProfileProps {
  handleOpenModal:any;
  id: string;
  name: string;
  title: string;
  imageUrl: string;
}

export function ExpertProfile({
  handleOpenModal,
  id,
  name,
  title,
  imageUrl,
}: ExpertProfileProps) {
  const handleOpen = () => {
    handleOpenModal();
  };
  return (
    <div className="bg-gray-100 p-6 text-center h-90 mt-10 md:mt-0">
      <div className="relative mx-auto mb-4 h-36 mt-5 w-36">
        <Image
          src={imageUrl || "/placeholder.svg?height=96&width=96&query=person"}
          alt={name}
          fill
          className="rounded-full object-contain"
          sizes="96px"
        />
      </div>
      <h3 className="font-presto font-bold text-[#17183B]">{name}</h3>
      <p className="mt-1 text-sm text-gray-500">{title}</p>
        <button onClick={handleOpen} className="mt-2 bg-[#071C35] px-6 py-2 text-xs font-medium uppercase text-white transition-colors duration-300 md:text-sm">
          CONNECT WITH EXPERT
        </button>
    </div>
  );
}

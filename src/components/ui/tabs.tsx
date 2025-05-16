// components/ui/Tabs.tsx
"use client";

import React from "react";


interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-4 flex gap-4 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
       <button
       key={tab}
       onClick={() => onTabChange(tab)}
       className={`pb-2 px-4 font-medium text-sm transition-colors ${
         activeTab === tab
           ? "border-b-2 border-primary text-primary"
           : "text-gray-500 hover:text-primary"
       }`}
     >
       {tab}
     </button>
     
      ))}
    </div>
  );
};

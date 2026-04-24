"use client";

import { useState, ReactNode } from "react";

interface HekimTabsProps {
  pendingCards: ReactNode;
  activeCards: ReactNode;
  completedCards: ReactNode;
  pendingCount: number;
  activeCount: number;
  completedCount: number;
}

export function HekimTabs({
  pendingCards,
  activeCards,
  completedCards,
  pendingCount,
  activeCount,
  completedCount,
}: HekimTabsProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "active" | "completed">("pending");

  const tabs = [
    { key: "pending" as const, label: "Bekleyen", count: pendingCount, color: "bg-[#fef08a]" },
    { key: "active" as const, label: "Aktif", count: activeCount, color: "bg-[#bbf7d0]" },
    { key: "completed" as const, label: "Tamamlanan", count: completedCount, color: "bg-[#e0e7ff]" },
  ];

  return (
    <div className="space-y-4">
      {/* TAB BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-4 sm:px-6 py-3 font-black uppercase text-sm sm:text-base border-4 border-black rounded-xl
              transition-all
              ${activeTab === tab.key
                ? `${tab.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1`
                : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              }
            `}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div>
        {activeTab === "pending" && pendingCards}
        {activeTab === "active" && activeCards}
        {activeTab === "completed" && completedCards}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import TabButton from "./TabButton";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("today");
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-8 font-nunito_sans">
      <div>
        <h1 className="text-3xl font-normal">Energy Dashboard</h1>
      </div>
      <div className="flex md:flex-row font-light flex-col justify-between items-start mt-6">
        <ul className="flex justify-between w-80 bg-color-white bg-opacity-15 py-1.5 rounded-3xl items-center text-sm">
          <TabButton
            label="Today"
            active={activeTab === "today"}
            onClick={() => handleClick("today")}
          />
          <TabButton
            label="Month"
            active={activeTab === "month"}
            onClick={() => handleClick("month")}
          />
          <TabButton
            label="Year"
            active={activeTab === "year"}
            onClick={() => handleClick("year")}
          />
        </ul>
        <div className="md:self-auto self-end md:py-0 py-4">
          <span className="text-md md:text-xl">
            {activeTab === "today" &&
              `${currentDate
                .getDate()
                .toString()
                .padStart(2, "0")}, ${currentMonth} ${currentYear}`}
            {activeTab === "month" && `${currentMonth} ${currentYear}`}
            {activeTab === "year" && `${currentYear}`}
          </span>
        </div>
      </div>
    </div>
  );
}

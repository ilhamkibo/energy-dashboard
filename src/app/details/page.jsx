"use client";
import CustomCard from "@/components/Card";
import { LineChart } from "@/components/Chart/LineChart";
import Navbar from "@/components/Navbar";
import TabButton from "@/components/Navbar/TabButton";
import { getLogResponse } from "@/libs/api-libs";
import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("today");

  const fetchApi = async (req, query) => {
    const logValues = await getLogResponse(req, query);
    console.log("🚀 ~ asdasdasdasdas ~ logValues:", logValues);
  };

  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar fetchApi={fetchApi} />
      <div className="mt-2  md:mt-9">
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
        </div>
        <div className="grid lg:grid-cols-2 gap-3 grid-cols-1 font-nunito_sans">
          <CustomCard title="Bar Cuy" Component={LineChart} />
          <CustomCard title="Bar Cuy" Component={LineChart} />
        </div>
      </div>
    </div>
  );
}

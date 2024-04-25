"use client";
import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import { LineChart } from "@/components/Chart/LineChart";
import Navbar from "@/components/Navbar";
import TabButton from "@/components/Navbar/TabButton";
import { getLogResponse } from "@/libs/api-libs";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("volt");
  const [activeTab2, setActiveTab2] = useState("today");
  const [dataLog, setDataLog] = useState({});

  const fetchApi = async (req, query) => {
    const logValues = await getLogResponse(req, query);
    setDataLog(logValues);
    return logValues;
  };

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar fetchApi={fetchApi} option={activeTab} congo={setActiveTab2} />
      <div className="mt-2  md:mt-9 font-nunito_sans">
        <div className="flex font-light flex-row flex-wrap gap-x-4 items-start mt-6 ">
          <button className="py-2" onClick={() => handleClick("volt")}>
            <span className={`${activeTab == "volt" ? "border-b-2" : ""}`}>
              Voltage
            </span>
          </button>
          <button className="py-2" onClick={() => handleClick("current")}>
            <span className={`${activeTab == "current" ? "border-b-2" : ""}`}>
              Current
            </span>
          </button>
          <button className="py-2" onClick={() => handleClick("watt")}>
            <span className={`${activeTab == "watt" ? "border-b-2" : ""}`}>
              Watt
            </span>
          </button>
          <button className="py-2" onClick={() => handleClick("kva")}>
            <span className={`${activeTab == "kva" ? "border-b-2" : ""}`}>
              Volt-Amps
            </span>
          </button>
          <button className="py-2" onClick={() => handleClick("frequency")}>
            <span className={`${activeTab == "frequency" ? "border-b-2" : ""}`}>
              Frequency
            </span>
          </button>
          <button className="py-2" onClick={() => handleClick("temp")}>
            <span className={`${activeTab == "temp" ? "border-b-2" : ""}`}>
              Temperature
            </span>
          </button>
        </div>
        {activeTab2 == "today" ? (
          <CustomCard
            title="DETAILS"
            Component={LineChart}
            height={450}
            payload={dataLog}
            description={`${activeTab.toUpperCase()} - ${activeTab2.toUpperCase()}`}
          />
        ) : (
          <CustomCard
            title="DETAILS"
            Component={BarChart}
            height={450}
            payload={dataLog}
            description={`${activeTab.toUpperCase()} - ${activeTab2.toUpperCase()}`}
          />
        )}
        <div className="grid lg:grid-cols-2 gap-3 grid-cols-1 font-nunito_sans"></div>
      </div>
    </div>
  );
}

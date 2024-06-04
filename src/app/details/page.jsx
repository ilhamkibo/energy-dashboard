"use client";
import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import { LineChart } from "@/components/Chart/LineChart";
import Navbar from "@/components/Navbar";
import { getLogResponse } from "@/libs/api-libs";
import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("volt");
  const [activeTab2, setActiveTab2] = useState("today");
  const [dataLog, setDataLog] = useState({});
  const [selectedDevice, setSelectedDevice] = useState("0");
  const [selectedDeviceOption, setSelectedDeviceOption] = useState("volt1");

  const handleChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedDeviceOption(event.target.value);
  };

  const fetchApi = async (req, query) => {
    console.log("🚀 ~ fetchApi ~ req, query:", req, query);
    const logValues = await getLogResponse(req, query);
    setDataLog(logValues);
    return logValues;
  };

  const handleClick = (tab) => {
    if (tab == "volt") {
      setSelectedDeviceOption("volt1");
    } else if (tab == "current") {
      setSelectedDeviceOption("amp1");
    }
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar
        fetchApi={fetchApi}
        option={activeTab}
        option2={setActiveTab2}
        option3={selectedDevice}
        option4={selectedDeviceOption}
      />
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
          <div>
            <select
              className="bg-color-white border border-color-primary text-sm text-color-dark rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 px-2.5 py-1 mt-1"
              value={selectedDevice}
              onChange={handleChange}
            >
              <option value="0">Device</option>
              <option value="1">1</option>
              <option value="2">2</option>
              {activeTab != "temp" && <option value="3">3</option>}
              <option value="all">All</option>
            </select>
          </div>
          {selectedDevice === "all" &&
            (activeTab === "volt" || activeTab === "current") && (
              <div>
                <select
                  className="bg-color-white border border-color-primary text-sm text-color-dark rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 px-2.5 py-1 mt-1"
                  value={selectedDeviceOption}
                  onChange={handleChange2}
                >
                  {activeTab === "volt" ? (
                    <>
                      <option value="volt1">Volt 1</option>
                      <option value="volt2">Volt 2</option>
                      <option value="volt3">Volt 3</option>
                    </>
                  ) : (
                    <>
                      <option value="amp1">Current 1</option>
                      <option value="amp2">Current 2</option>
                      <option value="amp3">Current 3</option>
                    </>
                  )}
                </select>
              </div>
            )}
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
        {/* <div className="grid lg:grid-cols-2 gap-3 grid-cols-1 font-nunito_sans"></div> */}
      </div>
    </div>
  );
}

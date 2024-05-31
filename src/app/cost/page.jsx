"use client";

import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import Navbar from "@/components/Navbar";
import { getLogResponse } from "@/libs/api-libs";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [dataLog, setDataLog] = useState({});
  const [selectedDevice, setSelectedDevice] = useState("0");

  const fetchApi = async (req, query) => {
    const logValues = await getLogResponse(req, query);
    console.log("🚀 ~ fetchApi ~ logValues:", req, query);
    setDataLog(logValues);
    return logValues;
  };

  const handleChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar fetchApi={fetchApi} option3={selectedDevice} />
      <div className="mt-2  md:mt-9 font-nunito_sans">
        <div className="flex font-light flex-row flex-wrap gap-x-4 items-start mt-6 ">
          <div>
            <select
              className="bg-color-white border border-color-primary text-sm text-color-dark rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 px-2.5 py-1 mt-1"
              value={selectedDevice}
              onChange={handleChange}
            >
              <option value="0">Device</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <CustomCard
          title="COST"
          height={450}
          Component={BarChart}
          payload={dataLog}
        />
      </div>
    </div>
  );
}

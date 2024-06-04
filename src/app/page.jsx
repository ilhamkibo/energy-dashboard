"use client";

import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import { DonutChart } from "@/components/Chart/DonutChart";
import { LineChart } from "@/components/Chart/LineChart";
import Navbar from "@/components/Navbar";
import { getLogResponse } from "@/libs/api-libs";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataLog, setDataLog] = useState({});
  const [activeTab2, setActiveTab2] = useState("today");

  const fetchApi = async (req, query) => {
    console.log("🚀 ~ Home ~ activeTab2:", activeTab2);
    const logValues = await getLogResponse(req, query);
    setDataLog(logValues);
    return logValues;
  };

  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar fetchApi={fetchApi} option2={setActiveTab2} />
      <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-2 mt-2 pb-4 md:mt-9 font-nunito_sans">
        <div className="xl:w-[30%]">
          <CustomCard
            title="Power Usage in Kwh"
            Component={DonutChart}
            height={270}
            payload={dataLog}
          />
        </div>
        <div className="xl:w-[30%]">
          <CustomCard
            title="Cost Predicted"
            height={270}
            Component={BarChart}
          />
        </div>
        <div className="xl:w-[30%]">
          <CustomCard
            title="Average Temperature"
            height={270}
            Component={LineChart}
          />
        </div>
        <div className="xl:w-[30%]">
          <CustomCard
            title="Average Frequency"
            Component={DonutChart}
            height={270}
            payload={dataLog}
          />
        </div>
        <div className="xl:w-[30%]">
          <CustomCard
            title="Power Usage in KVA"
            height={270}
            Component={BarChart}
          />
        </div>
      </div>
    </div>
  );
}

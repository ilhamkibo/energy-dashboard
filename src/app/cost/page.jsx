"use client";

import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import Navbar from "@/components/Navbar";
import { getLogResponse } from "@/libs/api-libs";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [dataLog, setDataLog] = useState({});

  const fetchApi = async (req, query) => {
    const logValues = await getLogResponse(req, query);
    console.log("🚀 ~ fetchApi ~ logValues:", req, query);
    setDataLog(logValues);
    return logValues;
  };

  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar fetchApi={fetchApi} />
      <div className="mt-2  md:mt-9 font-nunito_sans">
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

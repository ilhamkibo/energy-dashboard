import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Home() {
  return (
    <div className="flex-1 px-4 md:px-6 min-h-screen bg-gradient-to-tr from-color-bgPrime to-color-bgSecond">
      <Navbar />
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 grid-cols-1 mt-2 md:mt-9 font-nunito_sans">
        <CustomCard title="Donut" Component={BarChart} />
      </div>
    </div>
  );
}

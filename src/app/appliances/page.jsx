import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import React from "react";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 grid-cols-1 mt-2 md:mt-9 font-nunito_sans">
      <CustomCard title="Donut" Chart={BarChart} />
    </div>
  );
}

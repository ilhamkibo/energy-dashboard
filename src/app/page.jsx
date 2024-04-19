import CustomCard from "@/components/Card";
import { BarChart } from "@/components/Chart/BarChart";
import { DonutChart } from "@/components/Chart/DonutChart";
import { LineChart } from "@/components/Chart/LineChart";

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 grid-cols-1 mt-2 md:mt-9 font-nunito_sans">
      <CustomCard title="aeng aeng" Chart={DonutChart} />
      <CustomCard title="aeng aeng" Chart={LineChart} />
      <CustomCard title="aeng aeng" Chart={BarChart} />
    </div>
  );
}

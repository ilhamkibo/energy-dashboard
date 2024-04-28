"use client";
import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { usePathname } from "next/navigation";

export default function Navbar({ fetchApi, option = "volt", congo }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(
    pathname.toString() == "/details" ? "today" : "kw_hour"
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentMonth = currentTime.toLocaleString("default", { month: "long" });
  const currentYear = currentTime.getFullYear();

  // Update waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClick = (tab) => {
    setActiveTab(tab);
    if (congo) {
      congo(tab);
    }
  };

  useEffect(() => {
    if (fetchApi) {
      if (pathname.toString() == "/details") {
        fetchApi(option, `date=${activeTab}`);
      } else {
        fetchApi(activeTab);
      }
    }
  }, [activeTab, option]);

  return (
    <div className="mt-8 font-nunito_sans">
      <div className="flex items-center">
        <h1 className="text-3xl font-normal mr-2">Energy Dashboard</h1>
      </div>
      {pathname !== "/" ? (
        <div className="flex md:flex-row font-light flex-col justify-between items-start mt-6">
          <ul className="flex justify-between w-80 bg-color-white bg-opacity-15 py-1.5 rounded-3xl items-center text-sm">
            <TabButton
              label="Today"
              active={activeTab === "today" || activeTab === "kw_hour"}
              onClick={() =>
                pathname.toString() == "/details"
                  ? handleClick("today")
                  : handleClick("kw_hour")
              }
            />
            <TabButton
              label="Month"
              active={activeTab === "month" || activeTab === "kw_day"}
              onClick={() =>
                pathname.toString() == "/details"
                  ? handleClick("month")
                  : handleClick("kw_day")
              }
            />
            <TabButton
              label="Year"
              active={activeTab === "year" || activeTab === "kw_month"}
              onClick={() =>
                pathname.toString() == "/details"
                  ? handleClick("year")
                  : handleClick("kw_month")
              }
            />
          </ul>
          <div className="md:self-auto self-end md:py-0 py-4">
            <span className="text-md md:text-xl">
              {activeTab === "today" &&
                `${currentTime
                  .getDate()
                  .toString()
                  .padStart(2, "0")}, ${currentMonth} ${currentYear}`}
              {activeTab === "month" && `${currentMonth} ${currentYear}`}
              {activeTab === "year" && `${currentYear}`}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row font-light flex-col justify-between items-start mt-6">
          <time dateTime={currentTime.toISOString()} suppressHydrationWarning>
            {currentTime.toLocaleTimeString()}
          </time>
        </div>
      )}
    </div>
  );
}

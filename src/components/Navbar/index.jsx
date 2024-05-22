"use client";
import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Navbar({ fetchApi, option = "volt", congo }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(
    pathname.toString() == "/details" ? "today" : "kw_hour"
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentMonth = currentTime.toLocaleString("default", { month: "long" });
  const currentYear = currentTime.getFullYear();
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    const dayStart = startDate.getDate().toString().padStart(2, "0");
    const monthStart = (startDate.getMonth() + 1).toString().padStart(2, "0"); // Bulan dimulai dari 0
    const yearStart = startDate.getFullYear();
    const formattedStartDate = `${yearStart}-${monthStart}-${dayStart}`;

    // Pastikan endDate tidak null sebelum mencoba mengakses propertinya
    const dayEnd = endDate ? endDate.getDate().toString().padStart(2, "0") : "";
    const monthEnd = endDate
      ? (endDate.getMonth() + 1).toString().padStart(2, "0")
      : ""; // Bulan dimulai dari 0
    const yearEnd = endDate ? endDate.getFullYear() : "";
    const formattedEndDate = endDate ? `${yearEnd}-${monthEnd}-${dayEnd}` : "";

    if (fetchApi) {
      if (pathname.toString() == "/details") {
        if (activeTab === "custom") {
          // Dapatkan tanggal, bulan, dan tahun dari objek Date

          if (endDate) {
            fetchApi(
              option,
              `startDate=${formattedStartDate}&endDate=${formattedEndDate}`
            );
          }
        } else {
          fetchApi(option, `date=${activeTab}`);
        }
      } else {
        if (activeTab === "custom") {
          if (endDate) {
            fetchApi(
              "kw_custom",
              `startDate=${formattedStartDate}&endDate=${formattedEndDate}`
            );
          }
        } else {
          fetchApi(activeTab);
        }
      }
    }
  }, [activeTab, option, endDate]);

  return (
    <div className="mt-8 font-nunito_sans">
      <div className="flex items-center">
        <h1 className="text-3xl font-normal mr-2">Energy Dashboard</h1>
      </div>
      {pathname !== "/monitoring" ? (
        <div className="flex md:flex-row font-light flex-col justify-between items-start mt-6">
          <ul className="flex justify-between w-80 bg-color-white bg-opacity-15 py-1.5 rounded-3xl items-center text-sm">
            <TabButton
              label="Today"
              active={activeTab === "today" || activeTab === "kw_hour"}
              onClick={() => {
                if (pathname.toString() === "/details") {
                  handleClick("today");
                } else {
                  handleClick("kw_hour");
                }
                setShowCustomDate(false);
              }}
            />
            <TabButton
              label="Month"
              active={activeTab === "month" || activeTab === "kw_day"}
              onClick={() => {
                if (pathname.toString() === "/details") {
                  handleClick("month");
                } else {
                  handleClick("kw_day");
                }
                setShowCustomDate(false);
              }}
            />
            <TabButton
              label="Year"
              active={activeTab === "year" || activeTab === "kw_month"}
              onClick={() => {
                if (pathname.toString() === "/details") {
                  handleClick("year");
                } else {
                  handleClick("kw_month");
                }
                setShowCustomDate(false);
              }}
            />
            <TabButton
              label="Custom"
              active={activeTab === "custom" || activeTab === "kw_custom"}
              onClick={() => {
                // Menampilkan tampilan tanggal kustom ketika tombol "Custom" diklik
                setShowCustomDate(true);
                handleClick("custom");
              }}
            />
          </ul>
          {showCustomDate ? (
            <div className="text-color-dark md:self-auto self-end md:py-0 py-4 md:mx-1">
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
              />
            </div>
          ) : (
            <div className="md:self-auto self-end md:py-0 py-4 md:mx-1">
              <span className="text-md md:text-xl">
                {(activeTab === "today" || activeTab === "kw_hour") &&
                  `${currentTime
                    .getDate()
                    .toString()
                    .padStart(2, "0")}, ${currentMonth} ${currentYear}`}
                {(activeTab === "month" || activeTab === "kw_day") &&
                  `${currentMonth} ${currentYear}`}
                {(activeTab === "year" || activeTab === "kw_month") &&
                  `${currentYear}`}
              </span>
            </div>
          )}
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

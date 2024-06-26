"use client";
import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Navbar({
  fetchApi,
  option = "volt",
  option2,
  option3 = "0",
  option4 = "volt1",
}) {
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
    if (option2) {
      option2(tab);
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
            if (option3 == "all" && (option == "volt" || option == "current")) {
              fetchApi(
                option,
                `startDate=${formattedStartDate}&endDate=${formattedEndDate}&device=${option4}`
              );
            } else {
              fetchApi(
                option,
                `startDate=${formattedStartDate}&endDate=${formattedEndDate}&device=${
                  option3 == 0 ? "1" : option3
                }`
              );
            }
          }
        } else {
          if (option3 == "all" && (option == "volt" || option == "current")) {
            fetchApi(option, `date=${activeTab}&device=${option4}`);
          } else {
            fetchApi(
              option,
              `date=${activeTab}&device=${option3 == 0 ? "1" : option3}`
            );
          }
        }
      } else if (pathname.toString() == "/cost") {
        if (activeTab === "custom") {
          if (endDate) {
            fetchApi(
              "kw_custom",
              `startDate=${formattedStartDate}&endDate=${formattedEndDate}&device=${
                option3 == 0 ? "1" : option3
              }`
            );
          }
        } else {
          fetchApi(activeTab, `device=${option3 == 0 ? "1" : option3}`);
        }
      } else {
        if (activeTab === "custom") {
          if (endDate) {
            fetchApi(
              "kw_custom",
              `startDate=${formattedStartDate}&endDate=${formattedEndDate}&device=${
                option3 == 0 ? "1" : option3
              }`
            );
          }
        } else {
          fetchApi("dashboard", `date=${activeTab}`);
        }
      }
    }
  }, [activeTab, option, endDate, option3, option4]);

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
                if (pathname.toString() === "/cost") {
                  handleClick("kw_hour");
                } else {
                  handleClick("today");
                }
                setShowCustomDate(false);
              }}
            />
            <TabButton
              label="Month"
              active={activeTab === "month" || activeTab === "kw_day"}
              onClick={() => {
                if (pathname.toString() === "/cost") {
                  handleClick("kw_day");
                } else {
                  handleClick("month");
                }
                setShowCustomDate(false);
              }}
            />
            <TabButton
              label="Year"
              active={activeTab === "year" || activeTab === "kw_month"}
              onClick={() => {
                if (pathname.toString() === "/cost") {
                  handleClick("kw_month");
                } else {
                  handleClick("year");
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

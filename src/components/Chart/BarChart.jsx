"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { usePathname } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(72, 223, 186, 1)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 1)",
    },
  ],
};

export function BarChart({ height, payload }) {
  const pathname = usePathname();
  let options = {
    responsive: true,
    // indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          offset: true,
        },
      },
      y: {
        border: {
          dash: [4, 10],
        },
        grid: {
          color: "#fff",
          offset: true,
        },
        ticks: {
          // Use a callback function to customize the tick values
          callback: function (value) {
            if (pathname === "/cost") {
              return `Rp. ${value}`; // Add "Rp." to the value
            } else {
              return value; // Add "Rp." to the value
            }
          },
        },
      },
    },
  };

  let newData;

  if (!payload || !payload.data) {
    // Handle case where payload or payload.data is undefined
    return <Bar options={options} height={height} data={data} />;
  }

  // Pastikan payload memiliki data yang dibutuhkan

  if (
    payload.label[0] == "Volt 1" ||
    payload.label[0] == "Current 1" ||
    payload.label[0] == "Device 1"
  ) {
    // Ekstrak tanggal dan nilai volt rata-rata dari payload
    const labels = payload.data.map((entry) => entry.timestamp); // Ambil tanggal sebagai label
    const dataset1Data = payload.data.map((entry) => entry.value1); // Ambil nilai avg_volt1 untuk dataset 1
    const dataset2Data = payload.data.map((entry) => entry.value2); // Ambil nilai avg_volt2 untuk dataset 2
    const dataset3Data = payload.data.map((entry) => entry.value3); // Ambil nilai avg_volt3 untuk dataset 3

    // Buat data baru berdasarkan data yang ada di payload
    if (payload.label.length === 2) {
      newData = {
        labels: labels,
        datasets: [
          {
            label: payload.label[0],
            data: dataset1Data,
            borderColor: "rgb(72, 223, 186)",
            backgroundColor: "rgba(72, 223, 186, 0.8)",
            pointRadius: 1,
            barThickness: 50,
          },
          {
            label: payload.label[1],
            data: dataset2Data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.8)",
            pointRadius: 1,
            barThickness: 50,
          },
        ],
      };
    } else {
      newData = {
        labels: labels,
        datasets: [
          {
            label: payload.label[0],
            data: dataset1Data,
            borderColor: "rgb(72, 223, 186)",
            backgroundColor: "rgba(72, 223, 186, 0.8)",
            pointRadius: 1,
            barThickness: 50,
          },
          {
            label: payload.label[1],
            data: dataset2Data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.8)",
            pointRadius: 1,
            barThickness: 50,
          },
          {
            label: payload.label[2],
            data: dataset3Data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.8)",
            pointRadius: 1,
            barThickness: 50,
          },
        ],
      };
    }
  } else {
    // Ekstrak tanggal dan nilai volt rata-rata dari payload
    const labels = payload.data.map((entry) => entry.timestamp); // Ambil tanggal sebagai label
    const dataset1Data = payload.data.map((entry) => entry.value); // Ambil nilai avg_volt1 untuk dataset 1

    // Buat data baru berdasarkan data yang ada di payload
    newData = {
      labels: labels,
      datasets: [
        {
          label: payload.label[0],
          data: dataset1Data,
          borderColor: "rgb(72, 223, 186)",
          backgroundColor: "rgba(72, 223, 186, 0.8)",
          pointRadius: 1,
          barThickness: 50,
        },
      ],
    };
  }

  return <Bar options={options} height={height} data={newData} />;
}

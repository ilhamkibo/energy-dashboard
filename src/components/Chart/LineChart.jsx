"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  maintainAspectRatio: false,
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function LineChart({ height, payload }) {
  if (!payload || !payload.data) {
    // Handle case where payload or payload.data is undefined
    return <Line options={options} height={height} data={data} />;
  }

  // Pastikan payload memiliki data yang dibutuhkan
  let newData;
  console.log("payload: ", payload);
  if (payload.label[0] == "Volt 1" || payload.label[0] == "Current 1") {
    // Ekstrak tanggal dan nilai volt rata-rata dari payload
    const labels = payload.data.map((entry) => entry.timestamp); // Ambil tanggal sebagai label
    const dataset1Data = payload.data.map((entry) => entry.value1); // Ambil nilai avg_volt1 untuk dataset 1
    const dataset2Data = payload.data.map((entry) => entry.value2); // Ambil nilai avg_volt2 untuk dataset 2
    const dataset3Data = payload.data.map((entry) => entry.value3); // Ambil nilai avg_volt3 untuk dataset 3

    // Buat data baru berdasarkan data yang ada di payload
    newData = {
      labels: labels,
      datasets: [
        {
          label: payload.label[0],
          data: dataset1Data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointRadius: 1,
        },
        {
          label: payload.label[1],
          data: dataset2Data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          pointRadius: 1,
        },
        {
          label: payload.label[2],
          data: dataset3Data,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          pointRadius: 1,
        },
      ],
    };
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
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointRadius: 1,
        },
      ],
    };
  }

  return <Line options={options} height={height} data={newData} />;
}

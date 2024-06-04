"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  cutout: "70%", // Adjust this value for doughnut thickness (e.g., '70%' for thinner, '50%' for thicker)
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Doughnut Chart",
    },
  },
  maintainAspectRatio: false,
};

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function DonutChart({ height, payload }) {
  // Ekstrak tanggal dan nilai volt rata-rata dari payload
  const labels = payload.label; // Ambil tanggal sebagai label
  // const dataset1Data = [
  //   payload.data[0].value1,
  //   payload.data[0].value2,
  //   payload.data[0].value3,
  // ];
  const dataset1Data = [1, 8, 5];

  // Custom plugin to add text in the center of the doughnut chart
  const centerTextPlugin = {
    id: "centerTextPlugin",
    beforeDraw: (chart) => {
      const {
        ctx,
        chartArea: { top, width, height },
      } = chart;
      ctx.save();
      ctx.fillStyle = "white"; // Text color
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "20px Arial"; // Font size and family

      // Calculate the center of the chart
      const centerX = width / 2;
      const centerY = top + height / 2;

      // Optional: Adjust the Y-coordinate for perfect centering if needed
      const text = `Lesgo ${dataset1Data[0]}`; // Text to display in the center
      ctx.fillText(text, centerX, centerY);
      ctx.restore();
    },
  };

  const newData = {
    labels: labels,
    datasets: [
      {
        label: "Power usage:",
        data: [3, 7, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        pointRadius: 1,
      },
    ],
  };

  if (!payload || !payload.data) {
    // Handle case where payload or payload.data is undefined
    return (
      <Doughnut
        plugins={[centerTextPlugin]}
        options={options}
        height={height}
        data={data}
      />
    );
  }

  return (
    <Doughnut
      data={newData}
      plugins={[centerTextPlugin]}
      height={height}
      options={options}
    />
  );
}

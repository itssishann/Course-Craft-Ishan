import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaUserGraduate, FaRupeeSign } from "react-icons/fa";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  const generateColorPalette = () => {
    const colors = [
      "#ECF5FF", "#7EC0D9", "#06D6A0", "#FFD166", "#EF476F",
      "#F37290", "#FFD60A", "#E7C009", "#9E8006", "#251400",
    ];
    return courses.map((_, index) => colors[index % colors.length]);
  };

  const chartData = courses.length
    ? {
        labels: courses.map((course) => course.courseName),
        datasets: [
          {
            label: currChart === "students" ? "Total Students" : "Total Income",
            data:
              currChart === "students"
                ? courses.map((course) => course.totalStudentsEnrolled)
                : courses.map((course) => course.totalAmountGenerated),
            backgroundColor: generateColorPalette(),
            borderColor: "#ffffff",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      }
    : null;

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#F1F2FF",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#000814",
        titleColor: "#F1F2FF",
        bodyColor: "#F1F2FF",
        borderColor: "#2C333F",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
      datalabels: {
        color: "#ffffff",
        anchor: "end",
        align: "top",
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value) => value.toLocaleString(),
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutBounce",
    },
    scales: {
      y: {
        ticks: {
          color: "#F1F2FF",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "#2C333F",
        },
      },
      x: {
        ticks: {
          color: "#F1F2FF",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "#2C333F",
        },
      },
    },
  };

  return (
    <div className="flex flex-col rounded-2xl bg-richblack-800 p-6 shadow-xl">
      {/* Chart Option Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setCurrChart("students")}
          className={`transition-all py-2 px-4 rounded-xl flex items-center gap-2 ${
            currChart === "students"
              ? "bg-richblue-500 text-white shadow-md"
              : "bg-richblack-700 text-richblack-100"
          }`}
        >
          <FaUserGraduate />
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`transition-all py-2 px-4 rounded-xl flex items-center gap-2 ${
            currChart === "income"
              ? "bg-yellow-500 text-black shadow-md"
              : "bg-richblack-700 text-richblack-100"
          }`}
        >
          <FaRupeeSign />
          Income
        </button>
      </div>

      {/* Chart Display */}
      {chartData ? (
        <motion.div
          className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Bar data={chartData} options={options} />
        </motion.div>
      ) : (
        <p className="text-richblack-100 text-center">No data available to display</p>
      )}
    </div>
  );
}

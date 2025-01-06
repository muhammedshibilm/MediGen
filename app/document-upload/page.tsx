"use client";

import SideBar from "@/components/Sidebar";
import { Pie, Bar } from "react-chartjs-2";
import { FileText } from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function DocumentUpload() {
  // Pie chart data
  const diseaseData = {
    labels: ["Cancer", "Diabetes", "Heart Disease"],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ["#003060", "#055C9D", "#68BBE3"],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data
  const medicationData = {
    labels: ["Metformin", "Lisinopril", "Atorvastatin"],
    datasets: [
      {
        label: "Medication Usage",
        data: [20, 30, 50],
        backgroundColor: ["#003060", "#055C9D", "#68BBE3"],
      },
    ],
  };

  return (
    <div className="container  mx-auto p-4">
      <SideBar />

      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Upload Medical Document</h1>
        <div className="h-72 rounded-lg bg-gray-500 mt-6 w-[70%] self-center"></div>
        <div className="flex justify-center space-x-4 mt-4">
          <label
            htmlFor="file-upload"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Upload Document
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          <button className="bg-violet-500 text-white px-4 py-2 rounded flex items-center space-x-2">
            <FileText size={18} />
            <span>Preview PDF</span>
          </button>
        </div>
        <p className="font-semibold text-center mt-6">Supported  .pdf,.doc,.docx</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Disease Distribution */}
        <div className=" p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Disease Distribution</h2>
          <Pie data={diseaseData} />
        </div>

        {/* Medication Usage */}
        <div className=" p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Medication Usage</h2>
          <Bar data={medicationData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* BMI */}
        <div className=" p-6 rounded shadow text-center">
          <h3 className="text-sm font-medium">BMI</h3>
          <p className="text-3xl font-bold text-red-500">22.5</p>
        </div>

        {/* Heart Rate */}
        <div className=" p-6 rounded shadow text-center">
          <h3 className="text-sm font-medium">Heart Rate</h3>
          <p className="text-3xl font-bold text-green-500">75</p>
        </div>

        {/* Activity Level */}
        <div className="p-6 rounded shadow text-center">
          <h3 className="text-sm font-medium">Activity Level</h3>
          <p className="text-3xl font-bold text-blue-500">60</p>
        </div>
      </div>

      {/* Download Report */}
      <div className="text-center mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded shadow">
          Download Report
        </button>
      </div>
    </div>
  );
}

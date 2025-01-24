"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
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
import SideBar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ChartData {
  labels: string[];
  data: number[];
}

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage(e.target.files[0].name);
    } else {
      setFile(null);
      setMessage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("files", file); 

    try {
      const UPLOAD_URL = "http://localhost:8000/uploads/";
      const res = await fetch("/api/upload-document", {
        method: "POST",
        body: JSON.stringify({ file: file.name }),
      });

      if (!res.ok) {
          toast.error("File Upload Failed")
      }
      if (res.ok) {
        
        const res = await fetch(UPLOAD_URL,{
          method: "POST",
          body: formData
        });

       
        if (!res.ok) {
          toast.error("File upload failed")

        }
        if (res.ok) {
          toast.success("File Upload Sucess")
          window.location.reload()
        }

      }

      
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("An error occurred while uploading the file");
    }
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("http://localhost:8000/analyze/");
        if (!res.ok) {
          setError("No analysis data found");
        }

        const data: ChartData = await res.json();
        setChartData({
          labels: data.labels,
          datasets: [
            {
              data: data.data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Chart Data Fetch Error:", error);
        toast.error("Failed to load chart data");
      }
    };

    fetchChartData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <SideBar />
        <form method="post" onSubmit={handleUpload}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Upload Medical Document</h1>
            <label
              htmlFor="file-upload"
              className="self-center w-[70%] h-72 mb-6"
            >
              <div className="w-full h-full rounded-lg bg-gray-500 mt-6 cursor-pointer flex flex-col justify-center items-center">
                {message ? (
                  <p>{message}</p>
                ) : (
                  <>
                    <p>Drag file here to upload or link</p>
                    <span className="underline text-blue-500 cursor-pointer">
                      Choose your file
                    </span>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded flex items-center space-x-2"
                type="submit"
                disabled={!file}
              >
                <span>Upload File</span>
              </button>
              <button
                className="bg-violet-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                type="button"
              >
                <FileText size={18} />
                <span>Preview PDF</span>
              </button>
            </div>
            <p className="font-semibold text-center mt-6">
              Supported .pdf only
            </p>
          </div>
        </form>
      </div>
      <div
        className={`my-10 container mx-auto flex  h-[800px] justify-center  items-center text-white ${
          error ? "hidden" : "flex"
        }`}
      >
        {chartData ? (
          <Pie
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Diet Composition Analysis",
                  color: "white",
                  font: {
                    size: 18,
                    weight: "bold",
                  },
                  padding: {
                    top: 10,
                    bottom: 20,
                  },
                },
                legend: {
                  labels: {
                    color: "white",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-center">Loading chart data...</p>
        )}
      </div>
      <div>{error && <p className="text-center">{error}</p>}</div>
      <Footer />
    </>
  );
}

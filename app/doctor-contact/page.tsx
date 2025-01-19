"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import DoctorCards from "@/components/Doctorcards";
import ActiveDocCard from "@/components/Activedoccard";
import Image from "next/image";
import { toast } from "sonner";

export default function DoctorContact() {
  const [data, setData] = useState({
    name: "",
    medicalcon: "",
    preferdate: "",
    doctor: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    medicalcon: false,
    preferdate: false,
    doctor: false,
  });

  const [ticketUrl, setTicketUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pngUrl, setPngUrl] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: !data.name,
      medicalcon: !data.medicalcon,
      preferdate: !data.preferdate,
      doctor: !data.doctor,
    };

    setErrors(newErrors);

    if (newErrors.name) toast.error("Patient's name is required.");
    if (newErrors.medicalcon) toast.error("Medical concern is required.");
    if (newErrors.preferdate) toast.error("Preferred date/time is required.");
    if (newErrors.doctor) toast.error("Doctor selection is required.");

    return !Object.values(newErrors).some((error) => error);
  };

  const handleAppointment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/doctact-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const svgContent = await response.text();
        setTicketUrl(`data:image/svg+xml;base64,${btoa(svgContent)}`);
       
        const res = await fetch("/api/doctor-contact",{
          method: "POST",
          body: JSON.stringify(data)
        });
         if (res.ok) {
          toast.success("Appointment ticket generated successfully!");
         }
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.detail || "Failed to generate ticket.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!ticketUrl) return;

    const svgElement = document.createElement("img");
    svgElement.src = ticketUrl;

    svgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const scale = 2; // Increase resolution
        canvas.width = svgElement.width * scale;
        canvas.height = svgElement.height * scale;
        ctx.scale(scale, scale);

        ctx.drawImage(svgElement, 0, 0);

        const pngUrl = canvas.toDataURL("image/png", 1);
        setPngUrl(pngUrl);

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "appointment-ticket.png";
        downloadLink.click();
      }
    };

    svgElement.onerror = () => {
      toast.error("Failed to load the ticket for download.");
    };
  };

  return (
    <div>
      <SideBar />
      <div className="container mx-auto">
        <div className="mt-16 px-20 w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl py-5 font-bold">Contact a Doctor</h1>
          <input
            className="w-full border-2 border-white bg-transparent rounded-lg p-2"
            placeholder="Search for doctors by specialization or name..."
            type="search"
            name="search"
            id="search"
          />
        </div>
        <div className="flex flex-wrap justify-around items-center pt-16">
          <DoctorCards />
          <DoctorCards />
          <DoctorCards />
          <DoctorCards />
        </div>

        <div className="flex flex-wrap justify-around gap-10 pt-24">
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
        </div>

        <div className="mt-16 px-20 w-full flex flex-col justify-center items-center space-y-7">
          <h1 className="text-4xl py-5 font-bold">Schedule Appointment</h1>
          <input
            className={`w-full border-2 ${
              errors.name ? "border-red-500" : "border-white"
            } bg-[#232839] rounded-lg p-2`}
            placeholder="Patient's Name"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />

          <select
            name="doctor"
            className={`w-full border-2 ${
              errors.doctor ? "border-red-500" : "border-white"
            } bg-[#232839] rounded-lg p-2`}
            value={data.doctor}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose Doctor
            </option>
            <option value="Dr. Sarah Thompson - Cardiologist">
              Dr. Sarah Thompson - Cardiologist
            </option>
            <option value="Dr. Olivia Patel - Orthopedic Surgeon">
              Dr. Olivia Patel - Orthopedic Surgeon
            </option>
            <option value="Dr. James Lee - Dermatologist">
              Dr. James Lee - Dermatologist
            </option>
            <option value="Dr. Emily Nguyen - Pediatrician">
              Dr. Emily Nguyen - Pediatrician
            </option>
            <option value="Dr. Michael Brown - Neurologist">
              Dr. Michael Brown - Neurologist
            </option>
          </select>

          <input
            className={`w-full border-2 ${
              errors.medicalcon ? "border-red-500" : "border-white"
            } bg-[#232839] rounded-lg p-2`}
            placeholder="Medical Concern"
            type="text"
            name="medicalcon"
            value={data.medicalcon}
            onChange={handleChange}
            required
          />

          <input
            className={`w-full border-2 ${
              errors.preferdate ? "border-red-500" : "border-white"
            } bg-[#232839] rounded-lg p-2`}
            placeholder="Preferred Date/Time"
            type="datetime-local"
            name="preferdate"
            value={data.preferdate}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            required
          />

          <Button
            onClick={handleAppointment}
            className="mt-4 bg-custom-yellow text-custom-gray py-5 hover:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Generating Ticket..." : "Schedule Appointment"}
          </Button>
        </div>

        {ticketUrl && (
          <div className="mt-8 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Your Ticket:</h2>
            <Image
              src={ticketUrl}
              alt="Appointment Ticket"
              className="rounded-lg shadow-lg"
              width={300}
              height={400}
            />
            <Button
              className="mt-4 bg-custom-yellow text-custom-gray py-5 hover:bg-gray-300"
              onClick={handleDownload}
            >
              Download as PNG
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

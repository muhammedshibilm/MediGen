"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import ActiveDocCard from "@/components/Activedoccard";
import DoctorCards from "@/components/Doctorcards";

export default function DoctorContact() {
  const [data, setData] = useState({
    name: "",
    contactinfo: "",
    medicalcon: "",
    preferdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAppointment = async () => {
    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to book appointment.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "appointment-ticket.png";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error booking appointment:", error.message);
      alert(error.message);
    }
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
          <ActiveDocCard />
          <ActiveDocCard />
        </div>

        <div className="mt-16 px-20 w-full flex flex-col justify-center items-center space-y-7">
          <h1 className="text-4xl py-5 font-bold">Schedule Appointment</h1>
          <input
            className="w-full border-2 border-white bg-[#232839] rounded-lg p-2"
            placeholder="Patient's Name"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-white bg-[#232839] rounded-lg p-2"
            placeholder="Contact Information"
            type="text"
            name="contactinfo"
            value={data.contactinfo}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-white bg-[#232839] rounded-lg p-2"
            placeholder="Medical Concern"
            type="text"
            name="medicalcon"
            value={data.medicalcon}
            onChange={handleChange}
          />
          <input
            className="w-full border-2 border-white bg-[#232839] rounded-lg p-2   "
            placeholder="Preferred Date/Time"
            type="datetime-local"
            name="preferdate"
            value={data.preferdate}
            onChange={handleChange}
            
          />
          <Button
            onClick={handleAppointment}
            className="mt-4 bg-custom-yellow text-custom-gray py-5 hover:bg-gray-300"
          >
            Schedule Appointment
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

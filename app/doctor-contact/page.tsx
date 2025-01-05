import ActiveDocCard from "@/components/Activedoccard";
import DoctorCards from "@/components/Doctorcards";
import { Footer } from "@/components/Footer";
import SideBar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Contact",
  description: "This is the Doctor Contact page ",
};

export default function DoctorContact() {
  return (
    <div>
      <SideBar />
      <div className="container mx-auto">
        <div className="mt-16 px-20 w-full flex flex-col justify-center items-center">
          <h1 className=" text-4xl py-5 font-bold">Contact a Doctor</h1>
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

        <div className="flex flex-wrap justify-around  gap-10 pt-24">
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
          <ActiveDocCard />
        </div>

        <div className="bg-transparent pt-28 flex flex-col gap-7  rounded-lg p-10 px-72 ">
          <h1 className="text-3xl font-bold text-center">Book Appoinment</h1>
          <input className="bg-transparent p-3 border border-blue-500 rounded-lg" type="text" name="" id="" placeholder="Patient's Name" />
          <input className="bg-transparent p-3 border border-blue-500 rounded-lg" type="text" name="" id="" placeholder="Contact Information" />
          <input className="bg-transparent p-3 border border-blue-500 rounded-lg" type="text" name="" id="" placeholder="Medical Concern" />
          <input className="bg-transparent p-3 border border-blue-500 rounded-lg" type="text" name="" id="" placeholder="Preferred Date/Time" />
           <Button className="py-6 w-fit self-end bg-blue-600 hover:bg-gray-300">Schedule Appointment</Button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

import Image from "next/image";
import doctor1 from "@/public/images/docimg1.png"
import { Button } from "./ui/button";
export default function DoctorCards() {
  return (
    
      <div className="bg-card-gradient  rounded-lg shadow-sm shadow-gray-500 p-6 px-10 m-4 text-black flex justify-center items-center  w-fit space-x-6 ">
        <div className="space-y-2">
            <h1 className="text-white">Sarah Thompson</h1>
            <p className="text-[#D6E0FF] ">Specialty: Cardiology</p>
            <p className="text-[#D6E0FF]">Rating: 4.8/5, Price: $150/hr</p>
            <Button className="  border bg-custom-yellow text-custom-gray hover:bg-gray-300">Check</Button>
        </div>
        <Image src={doctor1} alt="doctor image" className="w-28 h-28 rounded-lg"/>
      </div>
  );
}
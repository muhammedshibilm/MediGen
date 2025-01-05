import Image from "next/image";
import doctor1 from "@/public/images/docimg1.png"
import { Button } from "./ui/button";
export default function DoctorCards() {
  return (
    
      <div className="bg-white rounded-lg shadow-lg p-6 px-10 m-4 text-black flex justify-center items-center  w-fit space-x-6 ">
        <div className="space-y-2">
            <h1>Sarah Thompson</h1>
            <p className="text-gray-500">Specialty: Cardiology</p>
            <p className="text-gray-500">Rating: 4.8/5, Price: $150/hr</p>
            <Button className="bg-transparent text-blue-500 border border-blue-600 hover:bg-gray-300">Check</Button>
        </div>
        <Image src={doctor1} alt="doctor image" className="w-28 h-28 rounded-lg"/>
      </div>
  );
}
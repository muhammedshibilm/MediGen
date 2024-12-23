import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Doctor Contact",
    description: "This is the Doctor Contact page ",
  };
  
export default function DoctorContact(){
    return(
        <div>
            <Navbar/>
            its contact page
        </div>
    );
}
import SideBar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Doctor Contact",
    description: "This is the Doctor Contact page ",
  };
  
export default function DoctorContact(){
    return(
        <div>
            <SideBar/>
            its contact page
        </div>
    );
}
import SideBar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload",
    description: "This is the Document Upload page ",
  };
  

export default function DocumentUpload(){
    return(
        <div>
            <SideBar/>
            its document upload page 
        </div>
    );
}
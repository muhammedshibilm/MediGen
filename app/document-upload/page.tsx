import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload",
    description: "This is the Document Upload page ",
  };
  

export default function DocumentUpload(){
    return(
        <div>
            <Navbar/>
            its document upload page 
        </div>
    );
}
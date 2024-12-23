import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat",
    description: "This is the Chat page ",
  };
  
export default function Chat(){
    return(
        <div>
            <Navbar/>
            its chat page
        </div>
    );
}
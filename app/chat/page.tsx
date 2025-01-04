import SideBar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat",
    description: "This is the Chat page ",
  };
  
export default function Chat(){
    return(
        <div>
            <SideBar/>
            its chat page
        </div>
    );
}
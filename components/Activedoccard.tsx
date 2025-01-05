import Image from "next/image";
import docimg from "@/public/images/docimg2.jpg";

export default function ActiveDocCard(){
    return(
        <div className="w-fit flex space-x-1">
            <Image src={docimg} alt="docimg" className="w-14 h-14 rounded-full"/>
            <div className="bg-green-500 rounded-full w-4 h-4 relative z-50 -left-4 top-9"></div>
            <div className="space-y-2">
                <h1>Dr. Sarah Thompson <span className="text-gray-500 pl-5">Cardiologist</span></h1>
                <p className="text-gray-500">Available: Mon-Fri 9am-5pm</p>
            </div>
        </div>
    )
}
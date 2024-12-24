import Loading from "@/app/loading";
import Image from "next/image";
import { Suspense } from "react";
import img from "@/public/images/tipimg1.jpg";
import { Button } from "./ui/button";

export const Cards = () =>{
    return(
        <div className="cards bg-[#DACAA4] w-[312px] h-[420px] rounded-lg mx-2 flex-shrink-0 flex flex-col justify-center items-center border shadow-lg shadow-gray-600">
            <Suspense fallback={<Loading/>}>
                <Image src={img} alt="health tips one" width={260} height={300} className="rounded-lg"/>
            </Suspense>
            <div className="px-6 py-3">
              <h1 className=" text-black font-bold text-lg">Vaccine updates</h1>
              <p className="text-gray-500 font-normal">New vaccines for this flu season are now available.</p>

            </div>
            <Button className="border-2 border-blue-700 py-5 px-20 bg-white text-black font-semibold"> Read More </Button>
        </div>
    );
}
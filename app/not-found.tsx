import { Button } from "@/components/ui/button";
import notfound from "@/public/images/404.svg";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata={
    title: "404",
    description: "Its a 404 page"
}

export default function NotFound (){
    return(
      <div className="h-screen flex flex-col justify-center items-center"> 
          <Image src={notfound} alt="not found" className=""/>
          <Button className="bg-blue-600 mt-10"><Link href={"/"} className="flex gap-2"><Home/> Go Back</Link></Button>
      </div>
    );
}
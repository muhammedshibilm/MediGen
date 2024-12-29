"use client";

import { Navbar } from "@/components/navbar";
import Image from "next/image";
import heroicon from "@/public/images/heroicon.jpg";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Cards } from "@/components/Cards";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative w-screen h-screen">
        <Image
          src={heroicon}
          alt="heroicon"
          className="w-screen h-full object-cover contrast-50"
        />
        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start left-20 z-40 text-white text-center">
          <h1 className="text-5xl font-semibold mb-4 text-start leading-tight">
            Empowering Your Health Journey with <br /> AI
          </h1>
          <p className="text-xl">
            Connecting you to top healthcare providers with ease.
          </p>
          <Button className="px-6 py-5 mt-5 bg-violet-700  text-md">
            Start Chatting Now
          </Button>
        </div>
      </div>
      <div className="container mt-10 mx-auto">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="font-semibold text-xl text-center">
            Ready to Transform Your Health?
          </h2>
          <Button className="px-6 py-5 bg-gray-600">Get Started</Button>
          <p className="font-light">
            Follow us on Instagram for daily health tips and inspiration!
          </p>
          <Button className="px-6 py-5 bg-pink-600">
            <Instagram size={24} /> Instagram
          </Button>
        </div>

        {/* Health News */}
        <h2 className="text-center my-10 text-xl">Health News</h2>
        <div className="health-tips flex  overflow-x-auto gap-4">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
    

      </div>
    </>
  );
}

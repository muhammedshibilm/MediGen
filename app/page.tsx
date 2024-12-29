"use client";

import { Navbar } from "@/components/navbar";
import Image from "next/image";
import heroicon from "@/public/images/heroicon.jpg";
import { Button } from "@/components/ui/button";
import { Download, Instagram } from "lucide-react";
import { Cards } from "@/components/Cards";
import statisticsone from "@/public/images/statisticsone.svg";
import statisticstwo from "@/public/images/statisticstwo.svg"

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
          <Cards styletype="healthnews" colored/>
          <Cards  styletype="healthnews" colored />
          <Cards styletype="healthnews" colored/>
          <Cards styletype="healthnews" colored />
          <Cards styletype="healthnews" colored/>
        </div>

        {/* health Tips */}
        <div className="mt-5">
          <form className="space-y-2">
            <input type="checkbox" name="all" id="all" />
            <label htmlFor="all" className="ml-2">
              {" "}
              All Topics
            </label>
            <br />
            <input type="checkbox" name="Nutrition" id="Nutrition" />
            <label htmlFor="Nutrition" className="ml-2">
              Nutrition
            </label>
            <br />
            <input type="checkbox" name="Exercise" id="Exercise" />
            <label htmlFor="Exercise" className="ml-2">
              {" "}
              Exercise
            </label>
            <br />
            <input type="checkbox" name="Mental Helath" id="Mental Health" />
            <label htmlFor="Mental Health" className="ml-2">
              {" "}
              Mental Health
            </label>
          </form>
          <h2 className="text-center my-10 text-xl">Health Tips</h2>
          <div className="health-tips flex  overflow-x-auto gap-4">
            <Cards styletype="healthtips" flexcol={true} />
            <Cards styletype="healthtips"  flexcol={true} />
            <Cards styletype="healthtips"  flexcol={true}/>
            <Cards styletype="healthtips"  flexcol={true}/>
            <Cards styletype="healthtips" flexcol={true}  />
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mt-5">
          <h2 className="text-center my-10 text-xl">Key Statistics</h2>
          <div className="flex  justify-around">
            <Image src={statisticsone} alt="Pateneit served"/>
            <Image src={statisticstwo} alt="Verified Doctors" />
          </div>
        </div>


        {/* Weekly Exercise Plan */}
        <h2 className="text-center my-10 text-xl">Weekly Exercise Plan</h2>
        <div className="health-tips flex  overflow-x-auto gap-4 ">
          <Cards styletype="weekelyplan" />
          <Cards styletype="weekelyplan" />
          <Cards styletype="weekelyplan" />
          <Cards styletype="weekelyplan" />
          <Cards styletype="weekelyplan" />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
           <Button className="bg-blue-800">View Full Plan</Button> <Button className="bg-white text-black"><Download/> Download PDF</Button>
        </div>


        {/* Featured Doctors */}
        <h2 className="text-center my-10 text-xl">Featured Doctors</h2>
        <div className="health-tips  flex overflow-x-auto gap-4">
          <Cards styletype="featureddoctor" />
          <Cards styletype="featureddoctor" />
          <Cards styletype="featureddoctor" />
          <Cards styletype="featureddoctor" />
          <Cards styletype="featureddoctor" />
        </div>
      </div>
    </>
  );
}

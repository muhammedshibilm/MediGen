"use client";

import Image from "next/image";
import heroicon from "@/public/images/heroicon.jpg";
import { Button } from "@/components/ui/button";
import { Download, Instagram } from "lucide-react";
import { Cards } from "@/components/Cards";
import statisticsone from "@/public/images/statisticsone.svg";
import statisticstwo from "@/public/images/statisticstwo.svg";
import { Footer } from "@/components/Footer";
import SideBar from "@/components/Sidebar";
import data from "@/data/homedata.json";
import Link from "next/link";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import NewsTips from "@/components/TipsCard";

export default function Page() {
  const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (delay = 0) => ({
      x: 0,
      opacity: 1,
      transition: { ease: "easeOut", duration: 0.8, delay },
    }),
  };

  const parentVarient = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <SideBar />
      <div className="relative w-screen h-screen">
        <Image
          src={heroicon}
          alt="heroicon"
          className="w-screen h-full object-cover contrast-50"
        />
        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start left-20 z-40 text-white">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-4xl md:text-5xl font-semibold mb-4 text-start leading-tight"
          >
            Empowering Your Health Journey with <br /> AI
          </motion.h1>

          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0.3} // Delayed for a staggered effect
            className="text-lg text-start md:text-xl text-white"
          >
            Connecting you to top healthcare providers with ease.
          </motion.p>

          <motion.span
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0.6} // More delay for smooth staggered entry
          >
            <Link href={"/chat"}>
              <Button className="px-6 py-5 mt-5 bg-custom-yellow text-custom-gray text-md hover:text-white">
                Start Chatting Now
              </Button>
            </Link>
          </motion.span>
        </div>
      </div>
      <div className="container mt-10 mx-auto">
        <motion.div
          variants={parentVarient}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-6"
        >
          <motion.h2
            variants={childVariants}
            className="font-semibold text-xl text-center"
          >
            Ready to Transform Your Health?
          </motion.h2>
          <motion.span variants={childVariants}>
            <Button className="px-6 py-5 bg-gray-600  hover:text-white">
              Get Started
            </Button>
          </motion.span>
          <motion.p variants={childVariants} className="font-light">
            Follow us on Instagram for daily health tips and inspiration!
          </motion.p>
          <motion.span>
            <Button className="px-6 py-5 bg-pink-600  hover:text-white">
              <Instagram size={24} /> Instagram
            </Button>
          </motion.span>
        </motion.div>

        <div> 



        </div>
      
        <motion.div 
        variants={childVariants}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{once: true}}
        className="mt-5">
          <h2 className="text-center my-10 text-xl">Key Statistics</h2>
          <motion.div
           
          className="flex  justify-around">
            <Image src={statisticsone} alt="Pateneit served" />
            <Image src={statisticstwo} alt="Verified Doctors" />
          </motion.div>
        </motion.div>



        {/* Weekly Exercise Plan */}
        <h2 className="text-center my-10 text-xl">Weekly Exercise Plan</h2>
        <div className="health-tips flex  overflow-x-auto gap-4 ">
          <Cards styletype="weekelyplan" data={data.weekelyplan} />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <Button className="bg-blue-800  hover:text-white">
            View Full Plan
          </Button>{" "}
          <Button className="bg-white text-black  hover:text-white">
            <Download /> Download PDF
          </Button>
        </div>



        {/* Featured Doctors */}
        <h2 className="text-center my-10 text-xl">Featured Doctors</h2>
        <div className="health-tips  flex overflow-x-auto gap-4">
          <Cards styletype="featureddoctor" data={data.featureddoctor} />
        </div>
      </div>

      {/* Footer  */}
      <Footer />
    </>
  );
}
